'use client';

import { useEffect, useState } from 'react';
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
 * navigation). Homepage only, and only once the visitor has scrolled down to
 * the "Ons verhaal" section (#ons-verhaal) — it covers text on content-heavy
 * pages, so everywhere else it stays hidden.
 */
export function ImpressionsTab() {
  const t = useTranslations('ImpressionsPage');
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!isHome) return;

    const onScroll = () => {
      const story = document.getElementById('ons-verhaal');
      if (!story) {
        // Fallback if the section ever gets renamed: plain scroll threshold.
        setVisible(window.scrollY > 600);
        return;
      }
      // Show once the section has risen into the upper half of the viewport,
      // and keep showing for the rest of the page. Scrolling back up to the
      // hero hides it again.
      setVisible(story.getBoundingClientRect().top < window.innerHeight * 0.55);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isHome]);

  if (!isHome) return null;

  return (
    <Link
      href="/impressions"
      className={`${styles.card} ${visible ? styles.visible : ''}`}
      tabIndex={visible ? undefined : -1}
      aria-hidden={visible ? undefined : true}
    >
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
