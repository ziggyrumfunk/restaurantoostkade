import { getTranslations, setRequestLocale } from 'next-intl/server';
import { pageMetadata } from '@/lib/seo';
import { PageHeader } from '@/components/PageHeader';
import { MenuList } from '@/components/MenuList';
import { Link } from '@/i18n/routing';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Menu' });
  return pageMetadata({
    route: '/menu',
    locale,
    title: t('title'),
    description: t('metaDescription'),
  });
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
          '/menu-juli/oostkade-menu-juli-01.jpg',
          '/menu-juli/oostkade-menu-juli-13.jpg',
          '/menu-juli/oostkade-menu-juli-03.jpg',
          '/menu-juli/oostkade-menu-juli-15.jpg',
          '/menu-juli/oostkade-menu-juli-14.jpg',
          '/menu-juli/oostkade-menu-juli-17.jpg',
        ]}
      />
      <div className="container" style={{ paddingTop: 'var(--space-6)' }}>
        <p className="lead">
          {t('kerstNote')}{' '}
          <Link href="/kerst" style={{ color: 'var(--color-ink)', textDecoration: 'underline' }}>
            {t('kerstLink')}
          </Link>
        </p>
      </div>
      <MenuList />
    </>
  );
}
