import type { Metadata } from 'next';
import { routing } from '@/i18n/routing';

type Route = keyof typeof routing.pathnames;
type Locale = (typeof routing.locales)[number];

const SITE_NAME = 'Restaurant Oostkade';
const OG_LOCALE: Record<Locale, string> = { nl: 'nl_NL', en: 'en_US', de: 'de_DE' };
const OG_IMAGE = { url: '/og.jpg', width: 1200, height: 630, alt: SITE_NAME };

function toLocale(locale: string): Locale {
  return (routing.locales as readonly string[]).includes(locale)
    ? (locale as Locale)
    : routing.defaultLocale;
}

/** Public path of a route in one language: ('/menu', 'de') -> '/de/speisekarte'. */
export function localizedPath(route: Route, locale: Locale): string {
  const entry = routing.pathnames[route];
  const path = typeof entry === 'string' ? entry : entry[locale];
  if (locale === routing.defaultLocale) return path;
  return path === '/' ? `/${locale}` : `/${locale}${path}`;
}

/**
 * Canonical + hreflang for a page. Each language version must canonicalize to
 * itself: Google ignores hreflang on a page whose canonical points elsewhere.
 */
export function pageAlternates(route: Route, locale: string) {
  return {
    canonical: localizedPath(route, toLocale(locale)),
    languages: {
      nl: localizedPath(route, 'nl'),
      en: localizedPath(route, 'en'),
      de: localizedPath(route, 'de'),
      'x-default': localizedPath(route, routing.defaultLocale),
    },
  };
}

/**
 * Metadata for an inner page. Sets its own Open Graph and Twitter fields:
 * without them Next.js inherits the layout's, and every shared link would
 * preview as the homepage.
 */
export function pageMetadata({
  route,
  locale,
  title,
  description,
}: {
  route: Route;
  locale: string;
  title: string;
  description: string;
}): Metadata {
  const alternates = pageAlternates(route, locale);
  const shareTitle = `${title} | ${SITE_NAME}`;
  return {
    title,
    description,
    alternates,
    openGraph: {
      title: shareTitle,
      description,
      url: alternates.canonical,
      siteName: SITE_NAME,
      locale: OG_LOCALE[toLocale(locale)],
      type: 'website',
      images: [OG_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title: shareTitle,
      description,
      images: [OG_IMAGE.url],
    },
  };
}
