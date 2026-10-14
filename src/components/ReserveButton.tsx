'use client';

// Zenchef's own booking page. Used when their script is blocked (ad blockers,
// strict privacy settings) and the widget can't open on our page.
const BOOKING_URL = 'https://bookings.zenchef.com/results?rid=371789';

declare global {
  interface Window {
    ZenchefWidget?: unknown;
  }
}

/**
 * Opens the Zenchef booking widget directly. The Zenchef script opens it for
 * any click whose target carries data-zc-action="open", so children must be
 * plain text: a nested element would become the click target instead.
 */
export function ReserveButton({
  className,
  children,
  onClick,
}: {
  className?: string;
  children: string;
  onClick?: () => void;
}) {
  return (
    <a
      href={BOOKING_URL}
      target="_blank"
      rel="noopener"
      data-zc-action="open"
      className={className}
      onClick={(e) => {
        onClick?.();
        if (window.ZenchefWidget) e.preventDefault();
      }}
    >
      {children}
    </a>
  );
}
