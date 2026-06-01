import { getTranslations, setRequestLocale } from 'next-intl/server';
import { PageHeader } from '@/components/PageHeader';
import styles from './reservations.module.css';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Reservations' });
  return {
    title: t('title'),
    description: t('lead'),
    alternates: {
      canonical: locale === 'nl' ? '/reserveren' : '/en/reservations',
      languages: { nl: '/reserveren', en: '/en/reservations' },
    },
  };
}

export default async function ReservationsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Reservations');
  const tc = await getTranslations('Contact');
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as const;
  return (
    <>
      <PageHeader eyebrow="Oostkade" title={t('title')} lead={t('lead')} />
      <section className={`section ${styles.section}`}>
        <div className={`container ${styles.grid}`}>
          <div className={styles.widgetCard}>
            <div className={styles.arrow} aria-hidden="true">
              <svg viewBox="0 0 64 64" fill="none">
                <path
                  d="M8 32c14 0 28 8 40 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M48 56l4-2 -8-6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>Zenchef</span>
            </div>
            <span className="eyebrow">{t('widgetTitle')}</span>
            <h2 className={`${styles.h2} handwritten`}>{t('widgetTitle')}</h2>
            <p>{t('widgetBody')}</p>
          </div>

          <aside className={styles.aside}>
            <h3 className={styles.asideTitle}>{t('groupsTitle')}</h3>
            <p>{t('groupsBody')}</p>
            <div className={styles.contactLinks}>
              <a className="btn btn-ghost" href="tel:+31186617170">0186-617170</a>
              <a
                className={styles.emailLink}
                href="mailto:info@restaurantoostkade.nl"
              >
                info@restaurantoostkade.nl
              </a>
            </div>

            <h3 className={styles.asideTitle}>{t('hoursTitle')}</h3>
            <ul className={styles.asideHours}>
              {days.map((d) => (
                <li key={d}>
                  <span>{tc(`hours${d}`)}</span>
                  <span>{tc(`hours${d}Time`)}</span>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>
    </>
  );
}
