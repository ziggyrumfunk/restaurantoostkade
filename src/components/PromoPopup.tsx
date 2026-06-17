'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import styles from './PromoPopup.module.css';

const SESSION_KEY = 'oostkade_vaderdag_promo_seen';

// Stop showing automatically after Father's Day (Sunday 21 June 2026).
// To reuse this popup for another promo, change the text in messages/*.json,
// swap the image, and update this date. To remove it entirely, delete the
// <PromoPopup /> line in src/app/[locale]/layout.tsx.
const PROMO_END = new Date('2026-06-22T00:00:00');

// Wait a moment after load so the popup appears just after the intro splash.
const SHOW_DELAY = 1600;

export function PromoPopup() {
  const t = useTranslations('Promo');
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const closeRef = useRef<HTMLButtonElement | null>(null);

  const handleClose = () => {
    setLeaving(true);
    window.setTimeout(() => {
      setVisible(false);
      setLeaving(false);
    }, 300);
  };

  // Decide whether to show: only within the promo window, once per session.
  useEffect(() => {
    if (new Date() >= PROMO_END) return;
    if (window.sessionStorage.getItem(SESSION_KEY) === '1') return;

    const timer = window.setTimeout(() => {
      setVisible(true);
      window.sessionStorage.setItem(SESSION_KEY, '1');
    }, SHOW_DELAY);
    return () => window.clearTimeout(timer);
  }, []);

  // While open: focus the close button, lock body scroll, close on Escape.
  useEffect(() => {
    if (!visible) return;
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    document.addEventListener('keydown', onKey);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      className={`${styles.overlay} ${leaving ? styles.leaving : ''}`}
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="promo-title"
    >
      <div className={styles.card} onClick={(e) => e.stopPropagation()}>
        <button
          ref={closeRef}
          type="button"
          className={styles.close}
          onClick={handleClose}
          aria-label={t('close')}
        >
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        <div className={styles.media}>
          <Image
            src="/promo-vaderdag.jpg"
            alt={t('imageAlt')}
            fill
            sizes="(max-width: 760px) 92vw, 360px"
            className={styles.image}
          />
        </div>

        <div className={styles.content}>
          <span className={styles.eyebrow}>{t('date')}</span>
          <h2 id="promo-title" className={styles.title}>{t('title')}</h2>
          <p className={styles.body}>{t('body')}</p>
          <Link href="/reservations" className="btn" onClick={handleClose}>
            {t('cta')}
          </Link>
        </div>
      </div>
    </div>
  );
}
