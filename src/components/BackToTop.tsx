'use client';

import { useEffect, useState } from 'react';
import styles from './BackToTop.module.css';

/**
 * Floating "back to top" pill. Appears after the user scrolls past a threshold
 * and parks in the bottom-left so it doesn't collide with the Zenchef booking
 * widget in the bottom-right.
 */
export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() =>
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
      className={`${styles.btn} ${visible ? styles.visible : ''}`}
    >
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
        <path
          d="M12 5v14M5 12l7-7 7 7"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
