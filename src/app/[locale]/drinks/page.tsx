import { getTranslations, setRequestLocale } from 'next-intl/server';
import { PageHeader } from '@/components/PageHeader';
import { DrinksList } from '@/components/DrinksList';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Drinks' });
  return {
    title: t('title'),
    description: t('lead'),
    alternates: {
      canonical: locale === 'nl' ? '/dranken' : '/en/drinks',
      languages: { nl: '/dranken', en: '/en/drinks' },
    },
  };
}

export default async function DrinksPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Drinks');
  return (
    <>
      <PageHeader
        eyebrow="Oostkade"
        title={t('title')}
        lead={t('lead')}
        backdrop={[
          '/hero/drinks-1.jpg',
          '/hero/drinks-2.jpg',
          '/impressions/photo-8.jpg',
          '/hero/food-7.jpg',
          '/impressions/photo-4.jpg',
          '/hero/food-center.jpg',
        ]}
      />
      <DrinksList />
    </>
  );
}
