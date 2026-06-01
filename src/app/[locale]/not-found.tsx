import { Link } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';

export default async function LocaleNotFound() {
  const t = await getTranslations('Nav');
  return (
    <main style={{ minHeight: '70vh', display: 'grid', placeItems: 'center', padding: '4rem 1rem', textAlign: 'center' }}>
      <div>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>404</h1>
        <Link href="/" className="btn">{t('home')}</Link>
      </div>
    </main>
  );
}
