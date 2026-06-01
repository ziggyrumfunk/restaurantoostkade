'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { DINNER, LUNCH, type MenuSection } from '@/lib/menuData';
import styles from './MenuList.module.css';

type Mode = 'dinner' | 'lunch';

function HeartIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" className={styles.heart}>
      <path
        fill="currentColor"
        d="M12 21.4s-7.2-4.4-9.4-9C1.1 9 2.6 5 6.2 4c2.1-.6 4.3.5 5.4 2.3a4 4 0 0 1 5.3-2.2c3.7.9 5.3 5 3.7 8.3-2.1 4.6-8.6 9-8.6 9z"
      />
    </svg>
  );
}

function Section({ section }: { section: MenuSection }) {
  if (section.callout) {
    return (
      <div className={styles.callout}>
        <h2 className={`${styles.colTitle} handwritten`}>{section.title}</h2>
        <p className={styles.calloutTitle}>{section.callout.title}</p>
        <p className={styles.calloutBody}>{section.callout.body}</p>
      </div>
    );
  }
  return (
    <div className={styles.col}>
      <h2 className={`${styles.colTitle} handwritten`}>{section.title}</h2>
      <ul className={styles.items}>
        {section.items.map((d) => (
          <li key={d.name} className={styles.item}>
            <div className={styles.itemHead}>
              <span className={styles.name}>{d.name}</span>
              <span className={styles.dots} aria-hidden />
              <span className={styles.price}>{d.price}</span>
            </div>
            {d.desc && <p className={styles.desc}>{d.desc}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function MenuList() {
  const t = useTranslations('Menu');
  const [mode, setMode] = useState<Mode>('dinner');
  const sections = mode === 'dinner' ? DINNER : LUNCH;

  return (
    <section className={`section ${styles.section}`}>
      <div className={`container ${styles.tabsWrap}`}>
        <div role="tablist" aria-label={t('title')} className={styles.tabs}>
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'dinner'}
            className={`${styles.tab} ${mode === 'dinner' ? styles.tabActive : ''}`}
            onClick={() => setMode('dinner')}
          >
            {t('tabDinner')}
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'lunch'}
            className={`${styles.tab} ${mode === 'lunch' ? styles.tabActive : ''}`}
            onClick={() => setMode('lunch')}
          >
            {t('tabLunch')}
          </button>
        </div>
      </div>

      <div className={`container ${styles.frame}`}>
        <div className={styles.grid}>
          {sections.map((s) => (
            <Section key={`${mode}-${s.title}`} section={s} />
          ))}
        </div>

        <div className={styles.legendRow}>
          <p className={styles.note}>{t('note')}</p>
          <a href="https://www.restaurantoostkade.nl" className={styles.url}>
            WWW.RESTAURANTOOSTKADE.NL
          </a>
        </div>
      </div>
    </section>
  );
}
