import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { PageHeader } from '@/components/PageHeader';
import styles from './events.module.css';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Events' });
  return {
    title: t('title'),
    description: t('lead'),
    alternates: {
      canonical: locale === 'nl' ? '/private-dining' : '/en/private-dining',
      languages: { nl: '/private-dining', en: '/en/private-dining' },
    },
  };
}

export default async function EventsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Events');
  const cards = [
    { title: t('capacityTitle'), body: t('capacityBody') },
    { title: t('cateringTitle'), body: t('cateringBody') },
    { title: t('menusTitle'), body: t('menusBody') },
  ];
  return (
    <>
      <PageHeader eyebrow="Private dining" title={t('title')} lead={t('lead')} />

      {/* Intro paragraph + main hero photo */}
      <section className={styles.intro}>
        <div className={`container ${styles.introGrid}`}>
          <div className={`${styles.introCopy} reveal`}>
            <span className="eyebrow">Oostkade</span>
            <h2 className={`${styles.h2} handwritten`}>{t('introTitle')}</h2>
            <p className="lead">{t('introBody')}</p>
          </div>
          <div className={`${styles.introMedia} reveal`}>
            <Image
              src="/events-hero.jpg"
              alt=""
              width={2048}
              height={1365}
              sizes="(max-width: 900px) 100vw, 50vw"
              className={styles.img}
            />
          </div>
        </div>
      </section>

      {/* Three feature cards with sub-images */}
      <section className={styles.cardsSection}>
        <div className={`container ${styles.cards}`}>
          {cards.map((c, i) => (
            <div key={c.title} className={`${styles.card} reveal`}>
              <div className={styles.cardImg}>
                <Image
                  src={
                    i === 0
                      ? '/events-interior-1.jpg'
                      : i === 1
                      ? '/events-food-1.jpg'
                      : '/events-food-2.jpg'
                  }
                  alt=""
                  width={2048}
                  height={1365}
                  sizes="(max-width: 900px) 100vw, 33vw"
                  className={styles.img}
                />
              </div>
              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>{c.title}</h3>
                <p>{c.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Wide image strip — terrace and interior to set the scene */}
      <section className={styles.stripSection}>
        <div className={`container ${styles.stripGrid}`}>
          <div className={`${styles.stripTile} ${styles.tileWide}`}>
            <Image src="/events-terras.jpg" alt="" width={2048} height={1365} sizes="66vw" className={styles.img} />
          </div>
          <div className={styles.stripTile}>
            <Image src="/events-interior-2.jpg" alt="" width={2048} height={1365} sizes="33vw" className={styles.img} />
          </div>
          <div className={styles.stripTile}>
            <Image src="/events-staff.jpg" alt="" width={2048} height={1365} sizes="33vw" className={styles.img} />
          </div>
          <div className={`${styles.stripTile} ${styles.tileWide}`}>
            <Image src="/events-food-2.jpg" alt="" width={2048} height={1365} sizes="66vw" className={styles.img} />
          </div>
        </div>
      </section>

      {/* Plan-your-event prompt before the form */}
      <section className={styles.planSection}>
        <div className={`container ${styles.planInner}`}>
          <span className="eyebrow">{t('inquireTitle')}</span>
          <h2 className={`${styles.h2} handwritten`}>{t('planTitle')}</h2>
          <p className="lead">{t('planBody')}</p>
        </div>
      </section>

      {/* Dark CTA section — email + phone */}
      <section className={`dark-section ${styles.formSection}`}>
        <div className={`container ${styles.ctaWrap}`}>
          <div className={styles.ctaCopy}>
            <span className="eyebrow">{t('inquireTitle')}</span>
            <h2 className={`${styles.formH2} handwritten`}>{t('inquireBody')}</h2>
          </div>
          <div className={styles.ctaButtons}>
            <a
              className={`btn btn-light ${styles.primaryCta}`}
              href={`mailto:info@restaurantoostkade.nl?subject=${encodeURIComponent(
                t('emailSubject')
              )}&body=${encodeURIComponent(t('emailBody'))}`}
            >
              {t('emailCta')}
            </a>
            <a className={styles.callLink} href="tel:+31186617170">
              {t('callCta')} →
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
