import type { CSSProperties, ReactNode } from 'react';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { pageMetadata } from '@/lib/seo';
import { KERST_MENU } from '@/lib/kerstData';
import { ReserveButton } from '@/components/ReserveButton';
import styles from './kerst.module.css';

const EMAIL = 'info@restaurantoostkade.nl';

const HERO_IMAGE = { url: '/kerst/oostkade-kerst-sfeer-01.webp', width: 856, height: 842 };
const MENU_IMAGE = { url: '/kerst/oostkade-kerst-ober-01.webp', width: 707, height: 871 };
const STRIP = [
  { url: '/kerst/oostkade-kerst-03.jpg', alt: 'img3Alt' },
  { url: '/kerst/oostkade-kerst-04.jpg', alt: 'img4Alt' },
  { url: '/kerst/oostkade-kerst-05.jpg', alt: 'img5Alt' },
] as const;
const BOOKING_IMAGE = '/events-interior-1.jpg';

/** Fixed spots for the gold sparkles in the hero: [left %, top %, size px, delay s]. */
const SPARKLES = [
  [8, 14, 10, 0], [22, 8, 6, 1.4], [38, 18, 8, 2.6], [54, 9, 5, 0.8], [70, 16, 9, 2],
  [86, 10, 6, 3.1], [14, 78, 7, 1.1], [31, 88, 5, 2.3], [62, 84, 8, 0.4], [80, 74, 6, 1.8],
  [92, 46, 7, 2.9], [4, 46, 5, 3.4],
] as const;

/** Four-point star, the page's one ornament. */
function Star({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M12 0c.7 6.6 4.9 10.9 12 12-7.1 1.1-11.3 5.4-12 12-.7-6.6-4.9-10.9-12-12C7.1 10.9 11.3 6.6 12 0z" />
    </svg>
  );
}

function Ornament() {
  return (
    <span className={styles.ornament} aria-hidden="true">
      <span className={styles.rule} />
      <Star className={styles.star} />
      <span className={styles.rule} />
    </span>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Kerst' });
  return pageMetadata({
    route: '/kerst',
    locale,
    title: t('metaTitle'),
    description: t('metaDescription'),
    image: { url: '/kerst/oostkade-kerst-04.jpg', width: 2048, height: 1365, alt: t('img4Alt') },
  });
}

export default async function KerstPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Kerst');
  const mail = (chunks: ReactNode) => <a href={`mailto:${EMAIL}`}>{chunks}</a>;

  return (
    <>
      {/* Hero: deep green with gold, next to a warm evening photo */}
      <section className={styles.hero}>
        <div className={styles.heroText}>
          <div className={styles.sparkles} aria-hidden="true">
            {SPARKLES.map(([left, top, size, delay], i) => (
              <Star
                key={i}
                className={styles.sparkle}
                style={{ left: `${left}%`, top: `${top}%`, width: size, height: size, animationDelay: `${delay}s` }}
              />
            ))}
          </div>
          <div className={styles.heroInner}>
            <span className={styles.eyebrow}>{t('eyebrow')}</span>
            <h1 className={`${styles.heroTitle} handwritten`}>{t('title')}</h1>
            <Ornament />
            <p className={styles.heroLead}>{t('lead')}</p>
            <p className={styles.heroPrice}>{t('heroPrice')}</p>
            <div className={styles.actions}>
              <ReserveButton className="btn">{t('reserveCta')}</ReserveButton>
              <a className="btn btn-ghost" href="#menukaart">{t('menuCta')}</a>
            </div>
          </div>
        </div>
        <div className={styles.heroMedia}>
          <Image
            src={HERO_IMAGE.url}
            alt={t('img1Alt')}
            fill
            priority
            sizes="(max-width: 900px) 100vw, 50vw"
            className={styles.heroImg}
          />
        </div>
      </section>

      {/* The menu, set like a printed card on green */}
      <section id="menukaart" className={styles.menuSection}>
        <div className={`container ${styles.menuGrid}`}>
          <div className={styles.menuMedia}>
            <div className={`${styles.frame} reveal`}>
              <Image
                src={MENU_IMAGE.url}
                alt={t('img2Alt')}
                width={MENU_IMAGE.width}
                height={MENU_IMAGE.height}
                sizes="(max-width: 900px) 100vw, 40vw"
              />
            </div>
          </div>

          <article className={`${styles.card} reveal`}>
            <header className={styles.cardHeader}>
              <Star className={styles.cardStar} />
              <h2 className={`${styles.cardTitle} handwritten`}>{t('title')}</h2>
              <p className={styles.cardSub}>{t('cardSub')}</p>
            </header>

            <ol className={styles.courses}>
              {KERST_MENU.map((course, i) => (
                <li key={i} className={styles.course}>
                  <h3 className={styles.courseLabel}>
                    {course.course ? t('course', { n: course.course }) : t('amuse')}
                  </h3>
                  {course.dishes.map((dish, j) => (
                    <div key={dish.name} className={styles.dish}>
                      {j > 0 && <span className={styles.or}>{t('or')}</span>}
                      <span className={styles.dishName}>{dish.name}</span>
                      {dish.desc && <span className={styles.dishDesc}>{dish.desc}</span>}
                    </div>
                  ))}
                  {i < KERST_MENU.length - 1 && <Ornament />}
                </li>
              ))}
            </ol>

            <footer className={styles.cardFooter}>
              <p className={styles.cardPrice}>{t('priceRestaurant')}</p>
              <p className={styles.cardPriceAlt}>{t('priceIglo')}</p>
              <p className={styles.allergy}>{t('allergy')}</p>
            </footer>
          </article>
        </div>
      </section>

      {/* Three warm details */}
      <section className={styles.strip} aria-label={t('stripLabel')}>
        {STRIP.map((img) => (
          <div key={img.url} className={`${styles.frame} ${styles.stripItem} reveal`}>
            <Image src={img.url} alt={t(img.alt)} fill sizes="(max-width: 760px) 100vw, 33vw" />
          </div>
        ))}
      </section>

      {/* Booking, pinned dark over the bar at night */}
      <section className={styles.booking}>
        <Image src={BOOKING_IMAGE} alt="" fill sizes="100vw" className={styles.bookingImg} />
        <div className={`container ${styles.bookingInner} reveal`}>
          <Star className={styles.bookingStar} />
          <h2 className="handwritten">{t('bookingTitle')}</h2>
          <p>{t.rich('bookingBody', { mail })}</p>
          <div className={styles.actions}>
            <ReserveButton className="btn">{t('reserveCta')}</ReserveButton>
            <a className="btn btn-ghost" href={`mailto:${EMAIL}`}>{t('mailCta')}</a>
          </div>
        </div>
      </section>
    </>
  );
}
