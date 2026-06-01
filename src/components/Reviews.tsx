import { useTranslations } from 'next-intl';
import styles from './Reviews.module.css';

const REVIEWS = [
  { key: 'hugo',     author: 'Hugo van der Heide',  meta: '★ Google' },
  { key: 'jvb',      author: 'J van Bloois',        meta: 'Local Guide · Google' },
  { key: 'petra',    author: 'petra160871',         meta: '★ Google' },
  { key: 'susanne',  author: 'Susanne Preuß',       meta: 'Local Guide · Google' },
  { key: 'rob',      author: 'Rob Smit',            meta: 'Local Guide · Google' },
  { key: 'ate',      author: 'Ate Tuitman',         meta: 'Local Guide · Google' },
  { key: 'arie',     author: 'Arie Blokland',       meta: 'Local Guide · Google' },
  { key: 'martijn',  author: 'Martijn Schipper',    meta: '★ Google' },
  { key: 'lieke',    author: 'Lieke Hermans',       meta: 'Local Guide · Google' },
  { key: 'rosalie',  author: 'Rosalie van der Horst', meta: '★ Google' },
] as const;

function Stars() {
  return (
    <span className={styles.stars} aria-label="5 out of 5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
          <path
            d="M12 2.5l2.95 6.32 6.86.74-5.17 4.78 1.5 6.84L12 17.77l-6.14 3.41 1.5-6.84L2.19 9.56l6.86-.74L12 2.5z"
            fill="currentColor"
          />
        </svg>
      ))}
    </span>
  );
}

export function Reviews() {
  const t = useTranslations('Reviews');
  // We render the row twice back-to-back so the CSS marquee can loop seamlessly.
  return (
    <section className={`section ${styles.section}`}>
      <div className={`container ${styles.head} heading-spray`}>
        <span className="eyebrow">{t('eyebrow')}</span>
        <h2 className={`${styles.title} handwritten`}>{t('title')}</h2>
      </div>

      <div className={styles.viewport}>
        <div className={styles.track}>
          {[...REVIEWS, ...REVIEWS].map((r, i) => (
            <article key={`${r.key}-${i}`} className={styles.card} aria-hidden={i >= REVIEWS.length || undefined}>
              <Stars />
              <p className={styles.quote}>“{t(`${r.key}.body`)}”</p>
              <div className={styles.byline}>
                <span className={styles.author}>{r.author}</span>
                <span className={styles.meta}>{r.meta}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
