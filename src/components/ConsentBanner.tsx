'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  CONSENT_OPEN_EVENT,
  getStoredConsent,
  storeConsent,
  type Consent,
} from '@/lib/consent';
import styles from './ConsentBanner.module.css';

// Wait a moment after load so the banner appears after the intro splash.
const SHOW_DELAY = 1200;

/**
 * Small cookie-consent card, bottom-left. Shown until the visitor makes a
 * choice; the footer's cookie-preferences button reopens it. Non-modal on
 * purpose — it must not block reading or booking.
 */
export function ConsentBanner() {
  const t = useTranslations('Consent');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let timer: number | undefined;
    if (getStoredConsent() === null) {
      timer = window.setTimeout(() => setVisible(true), SHOW_DELAY);
    }
    const onOpen = () => setVisible(true);
    window.addEventListener(CONSENT_OPEN_EVENT, onOpen);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener(CONSENT_OPEN_EVENT, onOpen);
    };
  }, []);

  if (!visible) return null;

  const choose = (value: Consent) => {
    storeConsent(value);
    setVisible(false);
  };

  return (
    <div className={styles.banner} role="region" aria-label={t('label')}>
      <p className={styles.body}>{t('body')}</p>
      <div className={styles.actions}>
        <button type="button" className={`btn ${styles.btn}`} onClick={() => choose('accepted')}>
          {t('accept')}
        </button>
        <button type="button" className={styles.decline} onClick={() => choose('declined')}>
          {t('decline')}
        </button>
      </div>
    </div>
  );
}
