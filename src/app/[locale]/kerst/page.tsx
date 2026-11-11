import type { ReactNode } from 'react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { pageMetadata } from '@/lib/seo';
import { KERST_MENU } from '@/lib/kerstData';
import { PageHeader } from '@/components/PageHeader';
import { ReserveButton } from '@/components/ReserveButton';
import { Link } from '@/i18n/routing';
import styles from './kerst.module.css';

const EMAIL = 'info@restaurantoostkade.nl';

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
  const b = (chunks: ReactNode) => <strong>{chunks}</strong>;
  const mail = (chunks: ReactNode) => <a href={`mailto:${EMAIL}`}>{chunks}</a>;

  return (
    <>
      <PageHeader
        eyebrow={t('eyebrow')}
        title={t('title')}
        lead={t('lead')}
        backdrop={[
          '/menu-juli/oostkade-menu-juli-06.jpg',
          '/iglo/oostkade-iglo-terras-02.jpg',
          '/menu-juli/oostkade-menu-juli-03.jpg',
          '/menu-juli/oostkade-menu-juli-13.jpg',
          '/menu-juli/oostkade-menu-juli-07.jpg',
          '/menu-juli/oostkade-menu-juli-15.jpg',
        ]}
      />

      <section className="section">
        <div className={`container ${styles.wrap}`}>
          <dl className={styles.prices}>
            <div>
              <dt>{t('restaurantLabel')}</dt>
              <dd>{t('restaurantPrice')}</dd>
            </div>
            <div>
              <dt>{t('igloLabel')}</dt>
              <dd>{t('igloPrice')}</dd>
              <dd className={styles.priceNote}>{t('igloNote')}</dd>
            </div>
          </dl>

          <div className={styles.actions}>
            <ReserveButton className="btn">{t('reserveCta')}</ReserveButton>
            <a className="btn btn-ghost" href={`mailto:${EMAIL}`}>{t('mailCta')}</a>
          </div>

          <ol className={styles.menu}>
            {KERST_MENU.map((course, i) => (
              <li key={i} className={styles.course}>
                <h2 className={styles.courseTitle}>
                  {course.course ? t('course', { n: course.course }) : t('amuse')}
                </h2>
                <ul className={styles.dishes}>
                  {course.dishes.map((dish, j) => (
                    <li key={dish.name}>
                      {j > 0 && <span className={styles.or}>{t('or')}</span>}
                      <span className={styles.dish}>{dish.name}</span>
                      {dish.desc && <span className={styles.desc}>{dish.desc}</span>}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>

          <p className={styles.allergy}>{t('allergy')}</p>

          <div className={styles.notice}>
            <p>{t.rich('howTo', { b, mail })}</p>
            <p>{t.rich('deposit', { b })}</p>
            <p>
              <Link href="/iglo">{t('igloLink')}</Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
