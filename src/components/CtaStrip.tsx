import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import styles from './CtaStrip.module.css';

// Backdrop tiles — darkened photo collage behind the headline.
const BACKDROP = [
  { src: '/hero/terras-1.jpg',   cls: 'tile1' as const },
  { src: '/hero/interior-1.jpg', cls: 'tile2' as const },
  { src: '/hero/food-2.jpg',     cls: 'tile3' as const },
  { src: '/hero/drinks-1.jpg',   cls: 'tile4' as const },
];

export function CtaStrip() {
  const t = useTranslations('Home');
  return (
    <section className={`dark-section ${styles.strip}`}>
      <div className={styles.backdrop} aria-hidden="true">
        {BACKDROP.map((b) => (
          <div key={b.src} className={`${styles.tile} ${styles[b.cls]}`}>
            <Image
              src={b.src}
              alt=""
              fill
              sizes="50vw"
              className={styles.img}
            />
          </div>
        ))}
        <div className={styles.scrim} />
      </div>
      <div className={`container ${styles.inner}`}>
        <div className={styles.copy}>
          <span className={`eyebrow ${styles.eyebrow}`}>Oostkade</span>
          <h2 className={`${styles.title} handwritten`}>{t('ctaStripTitle')}</h2>
          <p className={styles.body}>{t('ctaStripBody')}</p>
        </div>
        <Link href="/reservations" className={`btn btn-light ${styles.cta}`}>
          {t('ctaStripButton')}
        </Link>
      </div>
    </section>
  );
}
