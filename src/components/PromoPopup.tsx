'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import { CONSENT_CHANGED_EVENT, getStoredConsent } from '@/lib/consent';
import { IGLO_IMAGE } from '@/lib/igloData';
import styles from './PromoPopup.module.css';

const SESSION_KEY = 'oostkade_iglo_2026_seen';

// Iglo Experience announcement: stops after the igloos' last day, 28 Feb 2027.
// To reuse this popup for another promo, change the text in messages/*.json,
// swap the image and links below, and update this date. To remove it entirely,
// delete the <PromoPopup /> line in src/app/[locale]/layout.tsx.
const PROMO_END = new Date('2027-03-01T00:00:00');

// Wait a moment so the popup appears just after the intro splash.
const SHOW_DELAY = 1600;

export function PromoPopup() {
  const t = useTranslations('Promo');
  const pathname = usePathname();
  const onPromoPage = pathname === '/iglo';
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

  // Decide whether to show: only within the promo window, once per session, and
  // never on the page it promotes (being there counts as having seen it). Waits
  // for the cookie choice: both modals lock body scroll, and restoring out of
  // order would leave the page unscrollable.
  useEffect(() => {
    if (new Date() >= PROMO_END) return;
    if (window.sessionStorage.getItem(SESSION_KEY) === '1') return;
    if (onPromoPage) {
      window.sessionStorage.setItem(SESSION_KEY, '1');
      return;
    }

    let timer: number | undefined;
    const schedule = () => {
      timer = window.setTimeout(() => {
        setVisible(true);
        window.sessionStorage.setItem(SESSION_KEY, '1');
      }, SHOW_DELAY);
    };

    if (getStoredConsent() !== null) {
      schedule();
      return () => window.clearTimeout(timer);
    }
    window.addEventListener(CONSENT_CHANGED_EVENT, schedule, { once: true });
    return () => {
      window.removeEventListener(CONSENT_CHANGED_EVENT, schedule);
      window.clearTimeout(timer);
    };
  }, [onPromoPage]);

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
    document.documentElement.classList.add('zc-hidden');

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
      document.documentElement.classList.remove('zc-hidden');
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

        <Image
          src={IGLO_IMAGE.url}
          alt={t('imageAlt')}
          width={IGLO_IMAGE.width}
          height={IGLO_IMAGE.height}
          sizes="(max-width: 640px) 100vw, 600px"
          className={styles.image}
        />

        <div className={styles.content}>
          <span className={styles.eyebrow}>{t('date')}</span>
          <h2 id="promo-title" className={styles.title}>{t('title')}</h2>
          <p className={styles.body}>
            {t.rich('body', {
              mail: (chunks) => <a href="mailto:info@restaurantoostkade.nl">{chunks}</a>,
            })}
          </p>
          <p className={styles.deposit}>{t('deposit')}</p>
          <div className={styles.actions}>
            <Link href="/iglo" className="btn" onClick={handleClose}>
              {t('more')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
