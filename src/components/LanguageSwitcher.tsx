'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { useParams } from 'next/navigation';
import styles from './LanguageSwitcher.module.css';

export function LanguageSwitcher({ inline = false }: { inline?: boolean }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  const switchTo = (next: 'nl' | 'en') => {
    if (next === locale) return;
    // @ts-expect-error params type is unknown at runtime; next-intl re-types pathname segments
    router.replace({ pathname, params }, { locale: next });
  };

  return (
    <div className={`${styles.switch} ${inline ? styles.inline : ''}`} role="group" aria-label="Language">
      <button
        type="button"
        className={`${styles.lang} ${locale === 'nl' ? styles.active : ''}`}
        onClick={() => switchTo('nl')}
        aria-pressed={locale === 'nl'}
      >
        NL
      </button>
      <span className={styles.sep} aria-hidden>/</span>
      <button
        type="button"
        className={`${styles.lang} ${locale === 'en' ? styles.active : ''}`}
        onClick={() => switchTo('en')}
        aria-pressed={locale === 'en'}
      >
        EN
      </button>
    </div>
  );
}
