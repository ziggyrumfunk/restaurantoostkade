import type { ReactNode } from 'react';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { pageMetadata } from '@/lib/seo';
import { IGLO_FIRST_DAY, IGLO_IMAGE, IGLO_MENUS } from '@/lib/igloData';
import { PageHeader } from '@/components/PageHeader';
import { ReserveButton } from '@/components/ReserveButton';
import styles from './iglo.module.css';

const EMAIL = 'info@restaurantoostkade.nl';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Iglo' });
  return pageMetadata({
    route: '/iglo',
    locale,
    title: t('title'),
    description: t('metaDescription'),
    image: IGLO_IMAGE,
  });
}

export default async function IgloPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Iglo');
  const mail = (chunks: ReactNode) => <a href={`mailto:${EMAIL}`}>{chunks}</a>;

  return (
    <>
      <PageHeader eyebrow="Iglo Experience" title={t('title')} lead={t('lead')}>
        <div className={styles.actions}>
          <ReserveButton className="btn" day={IGLO_FIRST_DAY}>{t('reserveCta')}</ReserveButton>
          <a className="btn btn-ghost" href={`mailto:${EMAIL}`}>{t('mailCta')}</a>
        </div>
      </PageHeader>

      <div className="container">
        <Image
          src={IGLO_IMAGE.url}
          alt={t('imageAlt')}
          width={IGLO_IMAGE.width}
          height={IGLO_IMAGE.height}
          sizes="(max-width: 1280px) 100vw, 1200px"
          className={styles.bannerImg}
          priority
        />
      </div>

      <section className="section">
        <div className={`container ${styles.introGrid}`}>
          <div className={`${styles.copy} reveal`}>
            <p className="lead">{t('intro')}</p>
            <h2 className={`${styles.h2} handwritten`}>{t('formatTitle')}</h2>
            <p>{t('formatBody')}</p>
          </div>
          <ul className={`${styles.prices} reveal`}>
            {IGLO_MENUS.map((menu) => (
              <li key={menu.id}>
                <strong>{t(`${menu.id}Title`)}</strong>
                <span className={styles.dots} aria-hidden="true" />
                <span className={styles.price}>{t(`${menu.id}Price`)}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={`section ${styles.menus}`}>
        <div className="container">
          <h2 className={`${styles.h2} ${styles.menusTitle} handwritten`}>{t('menusTitle')}</h2>
          <div className={styles.menuGrid}>
            {IGLO_MENUS.map((menu) => (
              <article key={menu.id} className={`${styles.menu} reveal`}>
                <h3 className={styles.menuTitle}>{t(`${menu.id}Title`)}</h3>
                <p className={styles.menuPrice}>{t(`${menu.id}Price`)}</p>
                {menu.groups.map((group, i) => {
                  const parts = [
                    group.course ? t('course', { n: group.course }) : null,
                    group.label ? t(group.label) : null,
                  ].filter(Boolean);
                  return (
                    <div key={i} className={styles.group}>
                      {parts.length > 0 && <h4 className={styles.groupTitle}>{parts.join(': ')}</h4>}
                      <ul className={styles.dishes}>
                        {group.dishes.map((dish) => (
                          <li key={dish.name}>
                            <span className={styles.dish}>{dish.name}</span>
                            {dish.desc && <span className={styles.desc}>{dish.desc}</span>}
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </article>
            ))}
          </div>
          <p className={styles.allergy}>{t('allergy')}</p>
        </div>
      </section>

      <section className="section">
        <div className={`container ${styles.infoGrid}`}>
          <div className="reveal">
            <h2 className={`${styles.h2} handwritten`}>{t('goodToKnowTitle')}</h2>
            <ul className={styles.facts}>
              {(['fact1', 'fact2', 'fact3', 'fact4', 'fact5'] as const).map((key) => (
                <li key={key}>{t(key)}</li>
              ))}
            </ul>
          </div>
          <div className="reveal">
            <h2 className={`${styles.h2} handwritten`}>{t('extrasTitle')}</h2>
            <p>{t('extrasBody')}</p>
          </div>
        </div>
      </section>

      <section className={`section ${styles.bookingSection}`}>
        <div className={`container ${styles.booking} reveal`}>
          <h2 className={`${styles.h2} handwritten`}>{t('bookingTitle')}</h2>
          <p>{t.rich('bookingBody', { mail })}</p>
          <div className={styles.actions}>
            <ReserveButton className="btn" day={IGLO_FIRST_DAY}>{t('reserveCta')}</ReserveButton>
            <a className="btn btn-ghost" href={`mailto:${EMAIL}`}>{t('mailCta')}</a>
          </div>
        </div>
      </section>
    </>
  );
}
