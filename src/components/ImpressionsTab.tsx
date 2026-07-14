'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import styles from './ImpressionsTab.module.css';

/**
 * Floating vertical tab on the left edge, lower half of the viewport. Links
 * to the impressions page (which is deliberately not in the main navigation).
 * Hidden on that page itself. Sits well above the back-to-top pill
 * (bottom-left) and away from the Zenchef widget (bottom-right).
 */
export function ImpressionsTab() {
  const t = useTranslations('ImpressionsPage');
  const pathname = usePathname();
  if (pathname === '/impressions') return null;

  return (
    <Link href="/impressions" className={styles.tab}>
      <svg
        viewBox="0 0 24 24"
        width="13"
        height="13"
        aria-hidden="true"
        className={styles.icon}
      >
        <path d="M8 5.5v13l11-6.5z" fill="currentColor" />
      </svg>
      <span>{t('tab')}</span>
    </Link>
  );
}
