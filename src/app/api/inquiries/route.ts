import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { supabaseAdmin } from '@/lib/supabase';

export const runtime = 'nodejs';

type InquiryPayload = {
  name?: string;
  email?: string;
  phone?: string;
  date?: string;
  guests?: string | number;
  type?: string;
  message?: string;
};

const NOTIFY_EMAIL =
  process.env.NOTIFICATION_EMAIL ?? 'info@restaurantoostkade.nl';
const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL ?? 'Oostkade Website <onboarding@resend.dev>';

function escapeHtml(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function row(label: string, value?: string | number | null) {
  if (value === undefined || value === null || value === '') return '';
  const v = escapeHtml(String(value));
  return `
    <tr>
      <td style="padding:8px 12px;border-bottom:1px solid #eadfc8;color:#7c6f5d;
                 font-size:12px;text-transform:uppercase;letter-spacing:0.08em;
                 vertical-align:top;width:140px;">${label}</td>
      <td style="padding:8px 12px;border-bottom:1px solid #eadfc8;color:#1a1612;
                 font-size:14px;line-height:1.5;">${v}</td>
    </tr>`;
}

function buildHtml(body: InquiryPayload) {
  const message = body.message ? escapeHtml(body.message).replace(/\n/g, '<br>') : '';
  return `<!DOCTYPE html>
<html>
<body style="margin:0;padding:24px;background:#f6efe1;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;color:#1a1612;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0"
         style="max-width:560px;margin:0 auto;background:#fbf6ea;
                border:1px solid #d4bd9a;border-radius:8px;overflow:hidden;">
    <tr>
      <td style="padding:24px 28px;border-bottom:1px solid #d4bd9a;background:#15110b;color:#f6efe1;">
        <div style="font-size:11px;letter-spacing:0.22em;text-transform:uppercase;color:#b18a4f;margin-bottom:4px;">Restaurant Oostkade</div>
        <h1 style="margin:0;font-size:22px;font-weight:500;">Nieuwe event aanvraag</h1>
      </td>
    </tr>
    <tr>
      <td style="padding:20px 28px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
          ${row('Naam', body.name)}
          ${row('E-mail', body.email)}
          ${row('Telefoon', body.phone)}
          ${row('Datum', body.date)}
          ${row('Aantal gasten', body.guests)}
          ${row('Type event', body.type)}
        </table>
        ${
          message
            ? `<div style="margin-top:20px;">
                 <div style="font-size:12px;text-transform:uppercase;letter-spacing:0.08em;color:#7c6f5d;margin-bottom:8px;">Bericht</div>
                 <div style="padding:14px 16px;background:#f6efe1;border:1px solid #eadfc8;
                             border-radius:6px;font-size:14px;line-height:1.6;color:#1a1612;">
                   ${message}
                 </div>
               </div>`
            : ''
        }
        <p style="margin:28px 0 0;font-size:12px;color:#7c6f5d;">
          Ingediend via restaurantoostkade.nl. Antwoord direct op deze e-mail om
          contact op te nemen met de aanvrager.
        </p>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function buildText(body: InquiryPayload) {
  const lines = [
    'Nieuwe event aanvraag — Restaurant Oostkade',
    '',
    `Naam:          ${body.name ?? '-'}`,
    `E-mail:        ${body.email ?? '-'}`,
    `Telefoon:      ${body.phone ?? '-'}`,
    `Datum:         ${body.date ?? '-'}`,
    `Aantal gasten: ${body.guests ?? '-'}`,
    `Type event:    ${body.type ?? '-'}`,
    '',
    'Bericht:',
    body.message ?? '(geen bericht)',
    '',
    '— Ingediend via restaurantoostkade.nl',
  ];
  return lines.join('\n');
}

/**
 * Fire-and-forget email notification. Failures are logged but never block the
 * happy-path response — the Supabase row is the source of truth.
 */
async function notifyByEmail(body: InquiryPayload) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn('[inquiries] RESEND_API_KEY not set, skipping email notification.');
    return;
  }
  try {
    const resend = new Resend(apiKey);
    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: NOTIFY_EMAIL,
      // Reply directly hits the inquirer so the team's reply lands in their inbox.
      replyTo: body.email,
      subject: `Event aanvraag — ${body.name ?? 'Oostkade'}`,
      html: buildHtml(body),
      text: buildText(body),
    });
    if (result.error) {
      console.error('[inquiries] Resend returned error:', result.error);
    }
  } catch (err) {
    console.error('[inquiries] Email notification failed:', err);
  }
}

export async function POST(request: Request) {
  let body: InquiryPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
  }

  if (!body.name || !body.email) {
    return NextResponse.json({ error: 'missing_fields' }, { status: 422 });
  }

  // 1) Save to Supabase (source of truth — survives email outages).
  const db = supabaseAdmin();
  if (db) {
    const { error } = await db.from('oostkade_event_inquiries').insert({
      name: body.name,
      email: body.email,
      phone: body.phone ?? null,
      date: body.date ?? null,
      guests: body.guests ? Number(body.guests) : null,
      event_type: body.type ?? null,
      message: body.message ?? null,
    });
    if (error) {
      console.error('[inquiries] Supabase insert error:', error);
      // We still try to email so the team isn't left in the dark.
    }
  } else {
    console.warn('[inquiries] Supabase not configured. Payload:', body);
  }

  // 2) Notify the team by email. Doesn't block the response if it fails.
  await notifyByEmail(body);

  return NextResponse.json({ ok: true });
}
