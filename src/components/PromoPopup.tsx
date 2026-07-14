'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import styles from './PromoPopup.module.css';

const SESSION_KEY = 'oostkade_nieuwe_kaart_2026_seen';

// New menu announcement runs for three weeks: stop after Monday 3 August 2026.
// To reuse this popup for another promo, change the text in messages/*.json,
// swap the images below, and update this date. To remove it entirely, delete
// the <PromoPopup /> line in src/app/[locale]/layout.tsx.
const PROMO_END = new Date('2026-08-04T00:00:00');

// 3x3 collage of dishes from the new menu (public/menu-juli/).
const COLLAGE = [
  '/menu-juli/oostkade-menu-juli-13.jpg', // ceviche met aardbei
  '/menu-juli/oostkade-menu-juli-01.jpg', // mosselen
  '/menu-juli/oostkade-menu-juli-02.jpg', // flatbread (lunch)
  '/menu-juli/oostkade-menu-juli-03.jpg', // gamba's
  '/menu-juli/oostkade-menu-juli-15.jpg', // truffelpasta
  '/menu-juli/oostkade-menu-juli-06.jpg', // rode biet
  '/menu-juli/oostkade-menu-juli-14.jpg', // rundvlees
  '/menu-juli/oostkade-menu-juli-05.jpg', // tonijntartaar
  '/menu-juli/oostkade-menu-juli-17.jpg', // teriyakikip
];

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

        <div className={styles.media} role="img" aria-label={t('imageAlt')}>
          {COLLAGE.map((src) => (
            <div key={src} className={styles.tile}>
              <Image
                src={src}
                alt=""
                fill
                sizes="(max-width: 760px) 31vw, 140px"
                className={styles.image}
              />
            </div>
          ))}
        </div>

        <div className={styles.content}>
          <span className={styles.eyebrow}>{t('date')}</span>
          <h2 id="promo-title" className={styles.title}>{t('title')}</h2>
          <p className={styles.body}>{t('body')}</p>
          <Link href="/menu" className="btn" onClick={handleClose}>
            {t('cta')}
          </Link>
        </div>
      </div>
    </div>
  );
}
