import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { PageHeader } from '@/components/PageHeader';
import { CtaStrip } from '@/components/CtaStrip';
import styles from './impressions.module.css';

type Item =
  | { kind: 'photo'; src: string; w: number; h: number }
  | { kind: 'video'; src: string; w: number; h: number; poster: string };

// Everything on the wall, in flow order. CSS columns turn this into a masonry
// layout (top to bottom, then next column), so videos are spaced out through
// the list to spread the motion across the page.
const WALL: Item[] = [
  { kind: 'video', src: '/impressions/general.mp4', w: 540, h: 960, poster: '/impressions/general.jpg' },
  { kind: 'photo', src: '/menu-juli/oostkade-menu-juli-13.jpg', w: 1365, h: 2048 },
  { kind: 'photo', src: '/impressions/photo-2.jpg', w: 2048, h: 1365 },
  { kind: 'photo', src: '/menu-juli/oostkade-menu-juli-03.jpg', w: 1365, h: 2048 },
  { kind: 'photo', src: '/impressions/photo-6.jpg', w: 1600, h: 1066 },
  { kind: 'photo', src: '/menu-juli/oostkade-menu-juli-16.jpg', w: 1365, h: 2048 },
  { kind: 'photo', src: '/impressions/photo-1.jpg', w: 1365, h: 2048 },
  { kind: 'photo', src: '/menu-juli/oostkade-menu-juli-05.jpg', w: 2048, h: 1365 },
  { kind: 'photo', src: '/impressions/photo-4.jpg', w: 2048, h: 1365 },
  { kind: 'video', src: '/impressions/tuna-tartare.mp4', w: 540, h: 960, poster: '/impressions/tuna-tartare.jpg' },
  { kind: 'photo', src: '/menu-juli/oostkade-menu-juli-01.jpg', w: 1365, h: 2048 },
  { kind: 'photo', src: '/impressions/photo-7.jpg', w: 2048, h: 1365 },
  { kind: 'photo', src: '/menu-juli/oostkade-menu-juli-14.jpg', w: 1365, h: 2048 },
  { kind: 'photo', src: '/impressions/photo-10.jpg', w: 1365, h: 2048 },
  { kind: 'photo', src: '/menu-juli/oostkade-menu-juli-07.jpg', w: 2048, h: 1365 },
  { kind: 'photo', src: '/impressions/photo-5.jpg', w: 2048, h: 1365 },
  { kind: 'photo', src: '/menu-juli/oostkade-menu-juli-02.jpg', w: 1365, h: 2048 },
  { kind: 'photo', src: '/impressions/photo-11.jpg', w: 1600, h: 1066 },
  { kind: 'photo', src: '/menu-juli/oostkade-menu-juli-06.jpg', w: 1365, h: 2048 },
  { kind: 'video', src: '/impressions/dorade.mp4', w: 540, h: 960, poster: '/impressions/dorade.jpg' },
  { kind: 'photo', src: '/impressions/photo-3.jpg', w: 1365, h: 2048 },
  { kind: 'photo', src: '/menu-juli/oostkade-menu-juli-15.jpg', w: 1365, h: 2048 },
  { kind: 'photo', src: '/impressions/photo-9.jpg', w: 2048, h: 1365 },
  { kind: 'photo', src: '/menu-juli/oostkade-menu-juli-04.jpg', w: 1365, h: 2048 },
  { kind: 'photo', src: '/impressions/photo-8.jpg', w: 2048, h: 1365 },
  { kind: 'photo', src: '/menu-juli/oostkade-menu-juli-12.jpg', w: 1365, h: 2048 },
  { kind: 'photo', src: '/menu-juli/oostkade-menu-juli-09.jpg', w: 1365, h: 2048 },
  { kind: 'photo', src: '/menu-juli/oostkade-menu-juli-17.jpg', w: 2048, h: 1365 },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'ImpressionsPage' });
  return {
    title: t('title'),
    description: t('lead'),
    alternates: {
      canonical: locale === 'nl' ? '/sfeer' : '/en/impressions',
      languages: { nl: '/sfeer', en: '/en/impressions' },
    },
  };
}

export default async function ImpressionsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('ImpressionsPage');
  return (
    <>
      <PageHeader eyebrow={t('eyebrow')} title={t('title')} lead={t('lead')} />

      <section className={`section ${styles.wallSection}`}>
        <div className={`container ${styles.wall}`}>
          {WALL.map((m) => (
            <div key={m.src} className={`${styles.item} reveal`}>
              {m.kind === 'photo' ? (
                <Image
                  src={m.src}
                  alt=""
                  width={m.w}
                  height={m.h}
                  sizes="(max-width: 720px) 50vw, (max-width: 1100px) 50vw, 33vw"
                  className={styles.media}
                />
              ) : (
                <video
                  className={styles.media}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  poster={m.poster}
                  width={m.w}
                  height={m.h}
                >
                  <source src={m.src} type="video/mp4" />
                </video>
              )}
            </div>
          ))}
        </div>
      </section>

      <CtaStrip />
    </>
  );
}
