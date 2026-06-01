'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './LoadingSplash.module.css';

const SESSION_KEY = 'oostkade_splash_seen';

export function LoadingSplash() {
  // Default true on the server so SSR markup matches the first paint on the
  // client (avoiding hydration mismatch). We hide it right after mount if the
  // user has already seen it this session.
  const [visible, setVisible] = useState(true);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    // Only show once per browser session.
    const seen =
      typeof window !== 'undefined' && window.sessionStorage.getItem(SESSION_KEY) === '1';
    if (seen) {
      setVisible(false);
      return;
    }

    // Mark seen immediately so navigating between pages doesn't re-show it.
    window.sessionStorage.setItem(SESSION_KEY, '1');

    // Hold for ~900ms, then fade out, then unmount.
    const hold = window.setTimeout(() => setLeaving(true), 900);
    const unmount = window.setTimeout(() => setVisible(false), 1500);
    return () => {
      window.clearTimeout(hold);
      window.clearTimeout(unmount);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`${styles.splash} ${leaving ? styles.leaving : ''}`}
      aria-hidden="true"
      role="presentation"
    >
      <div className={styles.inner}>
        <Image
          src="/logo-white.svg"
          alt=""
          width={220}
          height={220}
          className={styles.logo}
          priority
        />
      </div>
    </div>
  );
}
