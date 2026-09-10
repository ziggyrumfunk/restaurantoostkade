// Shared cookie-consent state. The banner writes the choice, the Meta pixel
// reads it. Marketing cookies (the pixel) load ONLY after 'accepted'.

export const CONSENT_KEY = 'oostkade_cookie_consent';

// Fired on window whenever the visitor makes or changes a choice.
export const CONSENT_CHANGED_EVENT = 'oostkade-consent-changed';

// Fired on window to reopen the banner (footer "cookie preferences" button).
export const CONSENT_OPEN_EVENT = 'oostkade-consent-open';

export type Consent = 'accepted' | 'declined';

export function getStoredConsent(): Consent | null {
  try {
    const v = window.localStorage.getItem(CONSENT_KEY);
    return v === 'accepted' || v === 'declined' ? v : null;
  } catch {
    return null;
  }
}

export function storeConsent(value: Consent) {
  try {
    window.localStorage.setItem(CONSENT_KEY, value);
  } catch {
    // Storage blocked (private mode etc.) — the choice still applies for
    // this page view via the event below.
  }
  window.dispatchEvent(new CustomEvent(CONSENT_CHANGED_EVENT, { detail: value }));
}
