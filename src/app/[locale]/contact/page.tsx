import { getTranslations, setRequestLocale } from 'next-intl/server';
import { PageHeader } from '@/components/PageHeader';
import styles from './contact.module.css';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Contact' });
  return {
    title: t('title'),
    description: `Restaurant Oostkade — ${t('address')}. ${t('phone')}. ${t('email')}.`,
    alternates: {
      canonical: '/contact',
      languages: { nl: '/contact', en: '/en/contact' },
    },
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Contact');
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as const;
  return (
    <>
      <PageHeader
        eyebrow="Oostkade"
        title={t('title')}
        backdrop={[
          '/hero/terras-1.jpg',
          '/hero/interior-1.jpg',
          '/hero/terras-2.jpg',
          '/hero/interior-2.jpg',
          '/hero/terras-3.jpg',
          '/impressions/photo-3.jpg',
        ]}
      />
      <section className="section">
        <div className={`container ${styles.grid}`}>
          <div className={styles.info}>
            <div className={styles.block}>
              <span className="eyebrow">{t('addressLabel')}</span>
              <p>{t('address')}</p>
              <a
                className="link-arrow"
                href="https://maps.google.com/?q=Oostkade+24+Oud-Beijerland"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('directionsCta')}
                <svg viewBox="0 0 16 16" fill="none" aria-hidden>
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
            <div className={styles.block}>
              <span className="eyebrow">{t('phoneLabel')}</span>
              <p><a href="tel:+31186617170">{t('phone')}</a></p>
            </div>
            <div className={styles.block}>
              <span className="eyebrow">{t('emailLabel')}</span>
              <p><a href={`mailto:${t('email')}`}>{t('email')}</a></p>
            </div>
            <div className={styles.block}>
              <span className="eyebrow">{t('hoursLabel')}</span>
              <ul className={styles.hoursList}>
                {days.map((d) => (
                  <li key={d}>
                    <span>{t(`hours${d}`)}</span>
                    <span>{t(`hours${d}Time`)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className={styles.mapWrap}>
            <iframe
              title="Restaurant Oostkade op Google Maps"
              src="https://www.google.com/maps?q=Oostkade+24,+Oud-Beijerland&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </section>
    </>
  );
}
