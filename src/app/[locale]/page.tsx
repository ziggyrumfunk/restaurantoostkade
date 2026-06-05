import { setRequestLocale } from 'next-intl/server';
import { Hero } from '@/components/Hero';
import { IntroSplit } from '@/components/IntroSplit';
import { InstagramCta } from '@/components/InstagramCta';
import { Highlights } from '@/components/Highlights';
import { Impressions } from '@/components/Impressions';
import { Reviews } from '@/components/Reviews';
import { CtaStrip } from '@/components/CtaStrip';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <Hero />
      <IntroSplit />
      <InstagramCta />
      <Highlights />
      <Impressions />
      <Reviews />
      <CtaStrip />
    </>
  );
}
