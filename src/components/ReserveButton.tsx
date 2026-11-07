'use client';

// Zenchef's own booking page. Used when their script is blocked (ad blockers,
// strict privacy settings) and the widget can't open on our page.
const BOOKING_URL = 'https://bookings.zenchef.com/results?rid=371789';

declare global {
  interface Window {
    ZenchefWidget?: { openWith?: (params: { day?: string }) => void };
  }
}

/**
 * Opens the Zenchef booking widget directly. The Zenchef script opens it for
 * any click whose target carries data-zc-action="open", so children must be
 * plain text: a nested element would become the click target instead.
 *
 * With `day` (YYYY-MM-DD) the widget opens on that date, or on today once that
 * date has passed.
 */
export function ReserveButton({
  className,
  children,
  onClick,
  day,
}: {
  className?: string;
  children: string;
  onClick?: () => void;
  day?: string;
}) {
  return (
    <a
      href={BOOKING_URL}
      target="_blank"
      rel="noopener"
      data-zc-action={day ? undefined : 'open'}
      className={className}
      onClick={(e) => {
        onClick?.();
        if (!window.ZenchefWidget) return;
        e.preventDefault();
        if (day) {
          const today = new Date().toISOString().slice(0, 10);
          window.ZenchefWidget.openWith?.({ day: day > today ? day : today });
        }
      }}
    >
      {children}
    </a>
  );
}
