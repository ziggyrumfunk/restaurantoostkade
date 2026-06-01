import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { PageHeader } from '@/components/PageHeader';
import { LUNCH } from '@/lib/menuData';
import styles from './lunch.module.css';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Lunch' });
  return {
    title: t('title'),
    description: t('lead'),
    alternates: {
      canonical: locale === 'nl' ? '/lunch' : '/en/lunch',
      languages: { nl: '/lunch', en: '/en/lunch' },
    },
  };
}

// Pick a representative excerpt from the full lunch menu — we don't want to
// re-list everything (that lives on /menu).
const EXCERPT_SECTIONS = ['Flatbreads', 'Rustic Bread', 'Salads'];

export default async function LunchPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Lunch');
  const excerpt = LUNCH.filter((s) => EXCERPT_SECTIONS.includes(s.title));
  return (
    <>
      <PageHeader eyebrow="Business lunch" title={t('title')} lead={t('lead')} />

      {/* Business lunch hero */}
      <section className={`section ${styles.business}`}>
        <div className={`container ${styles.grid}`}>
          <div className={`${styles.copy} reveal`}>
            <span className="eyebrow">€29 — €49</span>
            <h2 className={`${styles.h2} handwritten`}>{t('businessTitle')}</h2>
            <p className="lead">{t('businessBody')}</p>
            <ul className={styles.priceList}>
              <li><strong>{t('twoCourse')}</strong><span className={styles.dots} aria-hidden /><span className={styles.price}>€29</span></li>
              <li><strong>{t('threeCourse')}</strong><span className={styles.dots} aria-hidden /><span className={styles.price}>€38</span></li>
              <li><strong>{t('fourCourse')}</strong><span className={styles.dots} aria-hidden /><span className={styles.price}>€49</span></li>
              <li className={styles.wine}><em>{t('winePairing')}</em></li>
            </ul>
            <Link href="/reservations" className="btn">{t('reserveCta')}</Link>
          </div>
          <div className={`${styles.media} reveal`}>
            <Image
              src="/lunch-hero.jpg"
              alt=""
              width={2048}
              height={1416}
              sizes="(max-width: 900px) 100vw, 50vw"
              className={styles.img}
            />
          </div>
        </div>
      </section>

      {/* Casual lunch intro with photo */}
      <section className={`section ${styles.casual}`}>
        <div className={`container ${styles.casualGrid}`}>
          <div className={`${styles.casualMedia} reveal`}>
            <Image
              src="/lunch-casual.jpg"
              alt=""
              width={1365}
              height={2048}
              sizes="(max-width: 900px) 100vw, 40vw"
              className={styles.img}
            />
          </div>
          <div className={`${styles.casualInner} reveal`}>
            <span className="eyebrow">{t('casualTitle')}</span>
            <h2 className={`${styles.h2} handwritten`}>{t('casualHeading')}</h2>
            <p className="lead">{t('casualBody')}</p>
            <Link href="/menu" className="btn btn-ghost">{t('viewMenu')}</Link>
          </div>
        </div>
      </section>

      {/* Menu excerpt: flatbreads, rustic breads, salads */}
      <section className={`section ${styles.excerpt}`}>
        <div className={`container ${styles.excerptHead}`}>
          <span className="eyebrow">{t('excerptEyebrow')}</span>
          <h2 className={`${styles.h2} handwritten`}>{t('excerptTitle')}</h2>
        </div>

        <div className={`container ${styles.excerptGrid}`}>
          {excerpt.map((s) => (
            <div key={s.title} className={`${styles.excerptCol} reveal`}>
              <h3 className={`${styles.excerptTitle} handwritten`}>{s.title}</h3>
              <ul className={styles.items}>
                {s.items.map((d) => (
                  <li key={d.name} className={styles.item}>
                    <div className={styles.itemHead}>
                      <span className={styles.name}>{d.name}</span>
                      <span className={styles.dots} aria-hidden />
                      <span className={styles.price}>€{d.price}</span>
                    </div>
                    {d.desc && <p className={styles.desc}>{d.desc}</p>}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className={`container ${styles.excerptFoot}`}>
          <Link href="/menu" className="btn">{t('viewFullMenu')}</Link>
        </div>
      </section>

      {/* Image strip — staff & atmosphere */}
      <section className={styles.stripSection}>
        <div className={`container ${styles.stripGrid}`}>
          <div className={styles.stripTile}>
            <Image src="/lunch-flatbread.jpg" alt="" width={2048} height={1365} sizes="33vw" className={styles.img} />
          </div>
          <div className={`${styles.stripTile} ${styles.tileTall}`}>
            <Image src="/lunch-staff.jpg" alt="" width={2048} height={1365} sizes="33vw" className={styles.img} />
          </div>
          <div className={styles.stripTile}>
            <Image src="/events-interior-1.jpg" alt="" width={2048} height={1365} sizes="33vw" className={styles.img} />
          </div>
        </div>
      </section>
    </>
  );
}
