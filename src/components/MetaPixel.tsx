'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import {
  CONSENT_CHANGED_EVENT,
  getStoredConsent,
  type Consent,
} from '@/lib/consent';

// Set NEXT_PUBLIC_META_PIXEL_ID (Vercel env + .env.local) to activate.
// Empty or missing = the pixel never loads and this component does nothing.
const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? '';

type Fbq = {
  (...args: unknown[]): void;
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[];
  push: unknown;
  loaded: boolean;
  version: string;
};

declare global {
  interface Window {
    fbq?: Fbq;
    _fbq?: Fbq;
  }
}

/** The standard fbevents.js bootstrap, minus the parts we gate on consent. */
function loadPixel() {
  if (window.fbq) return;
  const fbq = function (...args: unknown[]) {
    if (fbq.callMethod) {
      fbq.callMethod(...args);
    } else {
      fbq.queue.push(args);
    }
  } as Fbq;
  fbq.queue = [];
  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = '2.0';
  window.fbq = fbq;
  window._fbq = fbq;

  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://connect.facebook.net/en_US/fbevents.js';
  document.head.appendChild(script);

  fbq('init', PIXEL_ID);
  fbq('track', 'PageView');
}

/**
 * Meta (Facebook) Pixel, consent-gated. Loads only after the visitor accepts
 * marketing cookies via the ConsentBanner; declining later revokes it.
 * Tracks PageView on every route change, and InitiateCheckout when the
 * Zenchef reservation widget is opened.
 */
export function MetaPixel() {
  const pathname = usePathname();
  const firstPageView = useRef(true);
  const bookingTracked = useRef(false);

  // Load or revoke based on consent, now and whenever the choice changes.
  useEffect(() => {
    if (!PIXEL_ID) return;

    const apply = (consent: Consent | null) => {
      if (consent === 'accepted') {
        window.fbq?.('consent', 'grant');
        loadPixel();
      } else if (consent === 'declined' && window.fbq) {
        window.fbq('consent', 'revoke');
      }
    };

    apply(getStoredConsent());
    const onChange = (e: Event) => apply((e as CustomEvent<Consent>).detail);
    window.addEventListener(CONSENT_CHANGED_EVENT, onChange);
    return () => window.removeEventListener(CONSENT_CHANGED_EVENT, onChange);
  }, []);

  // PageView on client-side navigation (initial load is tracked by loadPixel).
  useEffect(() => {
    if (!PIXEL_ID) return;
    if (firstPageView.current) {
      firstPageView.current = false;
      return;
    }
    bookingTracked.current = false;
    window.fbq?.('track', 'PageView');
  }, [pathname]);

  // Clicking into the Zenchef widget counts as reservation intent. The whole
  // widget (including its floating launcher button) is an iframe, so clicks
  // on it never reach our document. But when focus moves into an iframe the
  // window fires a blur with that iframe as the active element — the
  // standard way to detect iframe clicks. Once per page view is enough.
  useEffect(() => {
    if (!PIXEL_ID) return;
    const onBlur = () => {
      if (bookingTracked.current || !window.fbq) return;
      const el = document.activeElement;
      if (
        el instanceof HTMLIFrameElement &&
        /zenchef|zc[-_]/i.test(`${el.className} ${el.id} ${el.src ?? ''}`)
      ) {
        bookingTracked.current = true;
        window.fbq('track', 'InitiateCheckout');
      }
    };
    window.addEventListener('blur', onBlur);
    return () => window.removeEventListener('blur', onBlur);
  }, []);

  return null;
}
