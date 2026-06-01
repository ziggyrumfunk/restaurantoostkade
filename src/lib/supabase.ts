import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/**
 * Browser & RSC-safe client. Reads with anon key, RLS protects writes.
 */
export const supabase =
  url && anon ? createClient(url, anon, { auth: { persistSession: false } }) : null;

/**
 * Server-only client with service role. NEVER import this in a client component.
 */
export function supabaseAdmin() {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) return null;
  return createClient(url, serviceKey, { auth: { persistSession: false } });
}

/**
 * Build a public Supabase Storage URL.
 *   storagePublicUrl('oostkade-assets', 'hero/oostkade-haven.jpg')
 */
export function storagePublicUrl(bucket: string, path: string) {
  if (!url) return '';
  return `${url}/storage/v1/object/public/${bucket}/${path}`;
}
