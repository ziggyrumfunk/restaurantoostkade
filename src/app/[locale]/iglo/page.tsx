import type { ReactNode } from 'react';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { pageMetadata } from '@/lib/seo';
import {
  IGLO_CLOSE_IMAGE,
  IGLO_FACADE_IMAGE,
  IGLO_FIRST_DAY,
  IGLO_IMAGE,
  IGLO_MENUS,
  IGLO_TABLE_SPREAD,
} from '@/lib/igloData';
import { ReserveButton } from '@/components/ReserveButton';
import styles from './iglo.module.css';

const EMAIL = 'info@restaurantoostkade.nl';

const GLANCE = ['When', 'Days', 'Group', 'Price'] as const;
const FACTS = ['factParty', 'factWeekend', 'factDeposit', 'factMenu'] as const;
const EXTRAS = ['extraBirthday', 'extraRomantic', 'extraFountain'] as const;

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
      <div className={styles.hero}>
        <Image
          src={IGLO_IMAGE.url}
          alt={t('imageAlt')}
          width={IGLO_IMAGE.width}
          height={IGLO_IMAGE.height}
          sizes="100vw"
          className={styles.heroImg}
          priority
        />
      </div>

      <header className={`container ${styles.heading}`}>
        <div className={styles.headingText}>
          <h1 className="handwritten">{t('title')}</h1>
          <p className={styles.headingLead}>{t('lead')}</p>
        </div>
        <div className={styles.actions}>
          <ReserveButton className="btn" day={IGLO_FIRST_DAY}>{t('reserveCta')}</ReserveButton>
          <a className="btn btn-ghost" href={`mailto:${EMAIL}`}>{t('mailCta')}</a>
        </div>
      </header>

      <div className="container">
        <dl className={styles.glance}>
          {GLANCE.map((key) => (
            <div key={key}>
              <dt>{t(`glance${key}Label`)}</dt>
              <dd>{t(`glance${key}`)}</dd>
            </div>
          ))}
        </dl>
      </div>

      <section className="section">
        <div className={`container ${styles.intro}`}>
          <div className={`${styles.introText} reveal`}>
            <p className={styles.introLead}>{t('intro')}</p>
            <h2 className={styles.h3}>{t('formatTitle')}</h2>
            <p>{t('formatBody')}</p>
          </div>
          <div className={`${styles.frame} ${styles.facade} reveal`}>
            <Image
              src={IGLO_FACADE_IMAGE}
              alt={t('facadeAlt')}
              fill
              sizes="(max-width: 900px) 100vw, 640px"
            />
          </div>
        </div>
        <div className={`container ${styles.closeWrap}`}>
          <div className={`${styles.frame} reveal`}>
            <Image
              src={IGLO_CLOSE_IMAGE.url}
              alt={t('closeAlt')}
              width={IGLO_CLOSE_IMAGE.width}
              height={IGLO_CLOSE_IMAGE.height}
              sizes="(max-width: 1280px) 100vw, 1200px"
            />
          </div>
        </div>
      </section>

      <section id="menus" className={styles.menus}>
        <div className="container">
          <h2 className={`${styles.menusTitle} handwritten`}>{t('menusTitle')}</h2>
          {IGLO_MENUS.map((menu) => (
            <article key={menu.id} className={styles.menu}>
              <div className={styles.menuMedia}>
                <div className={`${styles.frame} ${styles.menuFrame} reveal`}>
                  <Image
                    src={menu.image}
                    alt={t(`${menu.id}ImageAlt`)}
                    fill
                    sizes="(max-width: 900px) 100vw, 520px"
                  />
                </div>
              </div>

              <div className={styles.menuBody}>
                <header className={styles.menuHeader}>
                  <h3 className={styles.menuTitle}>{t(`${menu.id}Title`)}</h3>
                  <p className={styles.menuPrice}>{t(`${menu.id}Price`)}</p>
                  <p className={styles.menuTime}>{t(menu.time)}</p>
                </header>

                {menu.groups.map((group, i) => {
                  const parts = [
                    group.course ? t('course', { n: group.course }) : null,
                    group.label ? t(group.label) : null,
                  ].filter(Boolean);
                  return (
                    <div key={i} className={styles.group}>
                      <h4 className={styles.groupTitle}>{parts.join(': ')}</h4>
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

                <ReserveButton className={`btn btn-ghost ${styles.menuCta}`} day={IGLO_FIRST_DAY}>
                  {t('reserveCta')}
                </ReserveButton>
              </div>
            </article>
          ))}
          <p className={styles.allergy}>{t('allergy')}</p>
        </div>
      </section>

      <section className={`section ${styles.practical}`}>
        <div className={`container ${styles.practicalGrid}`}>
          <div className="reveal">
            <h2 className={`${styles.practicalTitle} handwritten`}>{t('goodToKnowTitle')}</h2>
            <ul className={styles.facts}>
              {FACTS.map((key) => (
                <li key={key}>{t(key)}</li>
              ))}
            </ul>
          </div>
          <div className="reveal">
            <h2 className={`${styles.practicalTitle} handwritten`}>{t('extrasTitle')}</h2>
            <ul className={styles.extras}>
              {EXTRAS.map((key) => (
                <li key={key}>
                  <div>
                    <strong>{t(key)}</strong>
                    <span>{t(`${key}Desc`)}</span>
                  </div>
                  <span className={styles.extraPrice}>{t(`${key}Price`)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className={styles.booking}>
        <Image src={IGLO_TABLE_SPREAD} alt="" fill sizes="100vw" className={styles.bookingImg} />
        <div className={`container ${styles.bookingInner} reveal`}>
          <h2 className="handwritten">{t('bookingTitle')}</h2>
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
