'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import styles from './ImpressionsTab.module.css';

// Mini collage on the floating card: one terrace shot, three dishes.
const THUMBS = [
  '/hero/terras-1.jpg',
  '/menu-juli/oostkade-menu-juli-03.jpg',
  '/menu-juli/oostkade-menu-juli-16.jpg',
  '/menu-juli/oostkade-menu-juli-13.jpg',
];

/**
 * Floating photo-collage card on the left side, lower half of the viewport.
 * Links to the impressions page (which is deliberately not in the main
 * navigation). Hidden on that page itself. Sits well above the back-to-top
 * pill (bottom-left) and away from the Zenchef widget (bottom-right).
 */
export function ImpressionsTab() {
  const t = useTranslations('ImpressionsPage');
  const pathname = usePathname();
  if (pathname === '/impressions') return null;

  return (
    <Link href="/impressions" className={styles.card}>
      <span className={styles.collage} aria-hidden="true">
        {THUMBS.map((src) => (
          <span key={src} className={styles.thumb}>
            <Image
              src={src}
              alt=""
              fill
              sizes="80px"
              className={styles.thumbImg}
            />
          </span>
        ))}
        <span className={styles.play}>
          <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
            <path d="M8 5.5v13l11-6.5z" fill="currentColor" />
          </svg>
        </span>
      </span>
      <span className={styles.label}>{t('tab')}</span>
    </Link>
  );
}
