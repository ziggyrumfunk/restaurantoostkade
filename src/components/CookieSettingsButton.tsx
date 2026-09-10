'use client';

import { useTranslations } from 'next-intl';
import { CONSENT_OPEN_EVENT } from '@/lib/consent';

/** Footer link that reopens the cookie-consent banner. */
export function CookieSettingsButton({ className }: { className?: string }) {
  const t = useTranslations('Consent');
  return (
    <button
      type="button"
      className={className}
      onClick={() => window.dispatchEvent(new Event(CONSENT_OPEN_EVENT))}
    >
      {t('settings')}
    </button>
  );
}
