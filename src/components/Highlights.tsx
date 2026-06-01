import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import styles from './Highlights.module.css';

export function Highlights() {
  const t = useTranslations('Home');
  const cards = [
    {
      href: '/lunch',
      title: t('highlight1Title'),
      body: t('highlight1Body'),
      cta: t('highlight1Cta'),
      img: '/placeholder-lunch.jpg',
    },
    {
      href: '/events',
      title: t('highlight2Title'),
      body: t('highlight2Body'),
      cta: t('highlight2Cta'),
      img: '/placeholder-events.jpg',
    },
    {
      href: '/contact',
      title: t('highlight3Title'),
      body: t('highlight3Body'),
      cta: t('highlight3Cta'),
      img: '/placeholder-terrace.jpg',
    },
  ] as const;

  return (
    <section className={`section ${styles.section}`}>
      <div className={`container ${styles.head} heading-spray`}>
        <span className="eyebrow">Highlights</span>
        <h2 className="handwritten">{t('highlightsTitle')}</h2>
      </div>
      <div className={`container ${styles.grid}`}>
        {cards.map((c) => (
          <Link href={c.href} key={c.href} className={`${styles.card} reveal`}>
            <div className={styles.imgWrap}>
              <Image
                src={c.img}
                alt=""
                fill
                sizes="(max-width: 900px) 100vw, 33vw"
                className={styles.img}
              />
            </div>
            <div className={styles.cardBody}>
              <h3 className={styles.cardTitle}>{c.title}</h3>
              <p>{c.body}</p>
              <span className="link-arrow">
                {c.cta}
                <svg viewBox="0 0 16 16" fill="none" aria-hidden>
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
