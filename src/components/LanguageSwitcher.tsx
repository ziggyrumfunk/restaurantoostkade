'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { useParams } from 'next/navigation';
import styles from './LanguageSwitcher.module.css';

const LANGS = ['nl', 'en', 'de'] as const;
type Lang = (typeof LANGS)[number];

export function LanguageSwitcher({ inline = false }: { inline?: boolean }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  const switchTo = (next: Lang) => {
    if (next === locale) return;
    // @ts-expect-error params type is unknown at runtime; next-intl re-types pathname segments
    router.replace({ pathname, params }, { locale: next });
  };

  return (
    <div className={`${styles.switch} ${inline ? styles.inline : ''}`} role="group" aria-label="Language">
      {LANGS.map((lang, i) => (
        <span key={lang} className={styles.group}>
          <button
            type="button"
            className={`${styles.lang} ${locale === lang ? styles.active : ''}`}
            onClick={() => switchTo(lang)}
            aria-pressed={locale === lang}
          >
            {lang.toUpperCase()}
          </button>
          {i < LANGS.length - 1 && <span className={styles.sep} aria-hidden>/</span>}
        </span>
      ))}
    </div>
  );
}
