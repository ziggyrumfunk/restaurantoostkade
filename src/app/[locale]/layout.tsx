import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { Outfit, Italiana } from 'next/font/google';
import { routing } from '@/i18n/routing';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Reveal } from '@/components/Reveal';
import { JsonLd } from '@/components/JsonLd';
import { LoadingSplash } from '@/components/LoadingSplash';

// Outfit is a modern geometric sans, close in feel to Glacial Indifference.
// To use the exact Glacial Indifference: drop .woff2 files in public/fonts/
// and swap this import for next/font/local localFont().
const sans = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-sans',
});

// Italiana: editorial-luxury serif, single weight. Modern, refined, not feathery.
const script = Italiana({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
  variable: '--font-script',
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Meta' });
  return {
    title: {
      default: t('defaultTitle'),
      template: `%s | ${t('siteName')}`,
    },
    description: t('defaultDescription'),
    keywords: [
      'Restaurant Oostkade',
      'Oud-Beijerland',
      'haven',
      'private dining',
      'business lunch',
      'wereldse keuken',
      'Aziatische keuken',
      'lunch',
      'diner',
      'catering',
      'evenementen',
    ],
    authors: [{ name: 'Restaurant Oostkade' }],
    creator: 'Restaurant Oostkade',
    openGraph: {
      title: t('defaultTitle'),
      description: t('defaultDescription'),
      siteName: t('siteName'),
      locale: locale === 'nl' ? 'nl_NL' : 'en_US',
      type: 'website',
      url: locale === 'nl' ? '/' : '/en',
      images: [
        {
          url: '/og.jpg',
          width: 1200,
          height: 630,
          alt: t('siteName'),
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('defaultTitle'),
      description: t('defaultDescription'),
      images: ['/og.jpg'],
    },
    alternates: {
      canonical: locale === 'nl' ? '/' : '/en',
      languages: {
        nl: '/',
        en: '/en',
        'x-default': '/',
      },
    },
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: 'any' },
        { url: '/logo-white.svg', type: 'image/svg+xml' },
      ],
      apple: '/logo-white.svg',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!(routing.locales as readonly string[]).includes(locale)) {
    notFound();
  }
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${sans.variable} ${script.variable}`}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <LoadingSplash />
          <a href="#main" className="skip-link">Skip to content</a>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <Reveal />
        </NextIntlClientProvider>
        <JsonLd />
      </body>
    </html>
  );
}
