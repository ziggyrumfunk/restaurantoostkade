'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  CONSENT_OPEN_EVENT,
  getStoredConsent,
  storeConsent,
  type Consent,
} from '@/lib/consent';
import styles from './ConsentBanner.module.css';

// Small delay so the modal appears just as the intro splash clears.
const SHOW_DELAY = 600;

/**
 * Blocking cookie-consent modal: first-time visitors must pick Accept or
 * Decline before using the site (both equally easy — required in the EU).
 * Reopened via the footer's cookie button; in that case a choice already
 * exists, so Escape / clicking outside closes it without changes.
 */
export function ConsentBanner() {
  const t = useTranslations('Consent');
  const [visible, setVisible] = useState(false);
  const acceptRef = useRef<HTMLButtonElement | null>(null);
  // Whether the visitor already made a choice earlier (footer reopen).
  const hasChoice = useRef(false);

  useEffect(() => {
    let timer: number | undefined;
    if (getStoredConsent() === null) {
      timer = window.setTimeout(() => setVisible(true), SHOW_DELAY);
    }
    const onOpen = () => {
      hasChoice.current = getStoredConsent() !== null;
      setVisible(true);
    };
    window.addEventListener(CONSENT_OPEN_EVENT, onOpen);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener(CONSENT_OPEN_EVENT, onOpen);
    };
  }, []);

  // While open: focus Accept, lock body scroll, Escape closes only when a
  // choice already exists.
  useEffect(() => {
    if (!visible) return;
    acceptRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && hasChoice.current) setVisible(false);
    };
    document.addEventListener('keydown', onKey);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [visible]);

  if (!visible) return null;

  const choose = (value: Consent) => {
    storeConsent(value);
    hasChoice.current = true;
    setVisible(false);
  };

  return (
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-labelledby="consent-title"
      onClick={() => {
        if (hasChoice.current) setVisible(false);
      }}
    >
      <div className={styles.card} onClick={(e) => e.stopPropagation()}>
        <span className={styles.eyebrow} id="consent-title">{t('label')}</span>
        <p className={styles.body}>{t('body')}</p>
        <div className={styles.actions}>
          <button
            ref={acceptRef}
            type="button"
            className={`btn ${styles.btn}`}
            onClick={() => choose('accepted')}
          >
            {t('accept')}
          </button>
          <button
            type="button"
            className={`btn btn-ghost ${styles.btn}`}
            onClick={() => choose('declined')}
          >
            {t('decline')}
          </button>
        </div>
      </div>
    </div>
  );
}
