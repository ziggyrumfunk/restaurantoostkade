import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://restaurantoostkade.nl';

const ROUTES = ['/', '/menu', '/drinks', '/lunch', '/events', '/reservations', '/contact'] as const;

const dutchPathFor: Record<(typeof ROUTES)[number], string> = {
  '/': '/',
  '/menu': '/menukaart',
  '/drinks': '/dranken',
  '/lunch': '/lunch',
  '/events': '/private-dining',
  '/reservations': '/reserveren',
  '/contact': '/contact',
};

const englishPathFor: Record<(typeof ROUTES)[number], string> = {
  '/': '/',
  '/menu': '/menu',
  '/drinks': '/drinks',
  '/lunch': '/lunch',
  '/events': '/private-dining',
  '/reservations': '/reservations',
  '/contact': '/contact',
};

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  for (const route of ROUTES) {
    const nlPath = dutchPathFor[route] === '/' ? '/' : dutchPathFor[route];
    const enPath = englishPathFor[route] === '/' ? '/en' : `/en${englishPathFor[route]}`;
    entries.push({
      url: `${SITE}${nlPath}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: route === '/' ? 1 : 0.7,
      alternates: {
        languages: {
          nl: `${SITE}${nlPath}`,
          en: `${SITE}${enPath}`,
        },
      },
    });
  }
  // Also list the english versions explicitly so they're indexable
  for (const route of ROUTES) {
    const enPath = englishPathFor[route] === '/' ? '/en' : `/en${englishPathFor[route]}`;
    entries.push({
      url: `${SITE}${enPath}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    });
  }
  // Silence unused-variable warning for routing import (kept for future use)
  void routing;
  return entries;
}
