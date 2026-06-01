'use client';

import { useEffect, useState } from 'react';
import styles from './ThemeToggle.module.css';

type Theme = 'light' | 'dark';
const STORAGE_KEY = 'oostkade_theme';

function getInitial(): Theme {
  if (typeof window === 'undefined') return 'light';
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === 'light' || stored === 'dark') return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function ThemeToggle() {
  // Read the initial theme synchronously so the icon matches what the inline
  // pre-paint script already set on <html>. Falls back to 'light' for SSR.
  const [theme, setTheme] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTheme(getInitial());
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem(STORAGE_KEY, theme);
  }, [theme, mounted]);

  // Follow system changes if the user hasn't picked manually (cleared storage).
  useEffect(() => {
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = (e: MediaQueryListEvent) => {
      if (window.localStorage.getItem(STORAGE_KEY)) return;
      setTheme(e.matches ? 'dark' : 'light');
    };
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  return (
    <button
      type="button"
      onClick={() => setTheme((t) => (t === 'light' ? 'dark' : 'light'))}
      className={styles.btn}
      aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
      title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
    >
      {/* Sun (shown in light mode → click to go dark) */}
      <svg
        viewBox="0 0 24 24"
        width="18"
        height="18"
        aria-hidden="true"
        className={`${styles.icon} ${styles.sun}`}
      >
        <circle cx="12" cy="12" r="4" fill="currentColor" />
        <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
          <line x1="12" y1="3"  x2="12" y2="5" />
          <line x1="12" y1="19" x2="12" y2="21" />
          <line x1="3"  y1="12" x2="5"  y2="12" />
          <line x1="19" y1="12" x2="21" y2="12" />
          <line x1="5.6" y1="5.6" x2="7" y2="7" />
          <line x1="17" y1="17" x2="18.4" y2="18.4" />
          <line x1="5.6" y1="18.4" x2="7" y2="17" />
          <line x1="17" y1="7"   x2="18.4" y2="5.6" />
        </g>
      </svg>
      {/* Moon (shown in dark mode → click to go light) */}
      <svg
        viewBox="0 0 24 24"
        width="18"
        height="18"
        aria-hidden="true"
        className={`${styles.icon} ${styles.moon}`}
      >
        <path
          d="M20 14.5A7.5 7.5 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"
          fill="currentColor"
        />
      </svg>
    </button>
  );
}
