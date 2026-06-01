import { getTranslations, setRequestLocale } from 'next-intl/server';
import { PageHeader } from '@/components/PageHeader';
import { MenuList } from '@/components/MenuList';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Menu' });
  return {
    title: t('title'),
    description: t('lead'),
    alternates: {
      canonical: locale === 'nl' ? '/menukaart' : '/en/menu',
      languages: { nl: '/menukaart', en: '/en/menu' },
    },
  };
}

export default async function MenuPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Menu');
  return (
    <>
      <PageHeader
        eyebrow="Oostkade"
        title={t('title')}
        lead={t('lead')}
        backdrop={[
          '/hero/food-1.jpg',
          '/hero/food-2.jpg',
          '/hero/food-3.jpg',
          '/hero/food-4.jpg',
          '/hero/food-5.jpg',
          '/hero/food-center.jpg',
        ]}
      />
      <MenuList />
    </>
  );
}
