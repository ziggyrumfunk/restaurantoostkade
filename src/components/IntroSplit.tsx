import Image from 'next/image';
import { useTranslations } from 'next-intl';
import styles from './IntroSplit.module.css';

export function IntroSplit() {
  const t = useTranslations('Home');
  return (
    <section className={`section ${styles.split}`}>
      <div className={`container ${styles.grid}`}>
        <div className={`${styles.copy} reveal`}>
          <span className="eyebrow">Oostkade 24</span>
          <div className={styles.headingWrap}>
            <h2 className={`${styles.title} handwritten`}>{t('introTitle')}</h2>
            <span className="ornament-divider" aria-hidden="true" />
          </div>
          <p className="lead">{t('introBody')}</p>
        </div>
        <div className={`${styles.media} reveal`}>
          {/* width/height match the real file (2048x1365) so next/image renders
              at the correct aspect ratio with no cropping. */}
          <Image
            src="/intro-staff.jpg"
            alt=""
            width={2048}
            height={1365}
            sizes="(max-width: 900px) 100vw, 50vw"
            className={styles.img}
            priority={false}
          />
          <div className={styles.stamp}>
            <span>Sinds</span>
            <strong>2022</strong>
          </div>
        </div>
      </div>
    </section>
  );
}
