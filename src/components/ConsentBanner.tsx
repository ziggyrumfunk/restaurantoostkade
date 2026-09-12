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
 * Blocking cookie-consent modal, two layers. Main view: explanation with a
 * big Accept-all button and a modest Settings link. Settings view: flip
 * switches per cookie category (necessary always on, marketing optional)
 * with a Save button — so declining stays genuinely possible, as EU rules
 * require. First-time visitors must choose before using the site; reopening
 * via the footer (choice already stored) can be dismissed with Escape or a
 * click outside.
 */
export function ConsentBanner() {
  const t = useTranslations('Consent');
  const [visible, setVisible] = useState(false);
  const [view, setView] = useState<'main' | 'settings'>('main');
  const [marketingOn, setMarketingOn] = useState(false);
  const acceptRef = useRef<HTMLButtonElement | null>(null);
  // Whether the visitor already made a choice earlier (footer reopen).
  const hasChoice = useRef(false);

  useEffect(() => {
    let timer: number | undefined;
    if (getStoredConsent() === null) {
      timer = window.setTimeout(() => setVisible(true), SHOW_DELAY);
    }
    const onOpen = () => {
      const stored = getStoredConsent();
      hasChoice.current = stored !== null;
      setMarketingOn(stored === 'accepted');
      // Coming from the footer means adjusting an earlier choice — open the
      // switches directly instead of the intro text.
      setView(stored !== null ? 'settings' : 'main');
      setVisible(true);
    };
    window.addEventListener(CONSENT_OPEN_EVENT, onOpen);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener(CONSENT_OPEN_EVENT, onOpen);
    };
  }, []);

  // While open: focus the primary button, lock body scroll, Escape closes
  // only when a choice already exists.
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

  const finish = (value: Consent) => {
    storeConsent(value);
    hasChoice.current = true;
    setVisible(false);
    setView('main');
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

        {view === 'main' ? (
          <>
            <p className={styles.body}>{t('body')}</p>
            <div className={styles.actions}>
              <button
                ref={acceptRef}
                type="button"
                className={`btn ${styles.btn}`}
                onClick={() => finish('accepted')}
              >
                {t('accept')}
              </button>
              <button
                type="button"
                className={styles.linkBtn}
                onClick={() => {
                  setMarketingOn(getStoredConsent() === 'accepted');
                  setView('settings');
                }}
              >
                {t('openSettings')}
              </button>
            </div>
          </>
        ) : (
          <>
            <div className={styles.rows}>
              <div className={styles.row}>
                <div className={styles.rowText}>
                  <span className={styles.rowTitle}>{t('necessaryTitle')}</span>
                  <span className={styles.rowDesc}>{t('necessaryDesc')}</span>
                </div>
                <div className={styles.rowControl}>
                  <span className={styles.alwaysOn}>{t('alwaysOn')}</span>
                  <label className={styles.switch}>
                    <input type="checkbox" checked disabled readOnly />
                    <span className={styles.track} aria-hidden="true" />
                  </label>
                </div>
              </div>

              <div className={styles.row}>
                <div className={styles.rowText}>
                  <span className={styles.rowTitle}>{t('marketingTitle')}</span>
                  <span className={styles.rowDesc}>{t('marketingDesc')}</span>
                </div>
                <div className={styles.rowControl}>
                  <label className={styles.switch}>
                    <input
                      type="checkbox"
                      checked={marketingOn}
                      onChange={(e) => setMarketingOn(e.target.checked)}
                      aria-label={t('marketingTitle')}
                    />
                    <span className={styles.track} aria-hidden="true" />
                  </label>
                </div>
              </div>
            </div>

            <div className={styles.actions}>
              <button
                type="button"
                className={`btn ${styles.btn}`}
                onClick={() => finish(marketingOn ? 'accepted' : 'declined')}
              >
                {t('save')}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
