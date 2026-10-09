import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['nl', 'en', 'de'],
  defaultLocale: 'nl',
  localePrefix: {
    mode: 'as-needed', // / -> nl, /en -> en, /de -> de
  },
  // The URL alone decides the language. With detection on, phones set to
  // English were redirected away from Dutch pages, including ad landings.
  // Visitors switch language with the language switcher.
  localeDetection: false,
  pathnames: {
    '/': '/',
    '/menu': {
      nl: '/menukaart',
      en: '/menu',
      de: '/speisekarte',
    },
    '/drinks': {
      nl: '/dranken',
      en: '/drinks',
      de: '/getraenke',
    },
    '/lunch': {
      nl: '/lunch',
      en: '/lunch',
      de: '/lunch',
    },
    '/impressions': {
      nl: '/sfeer',
      en: '/impressions',
      de: '/impressionen',
    },
    '/events': {
      nl: '/private-dining',
      en: '/private-dining',
      de: '/private-dining',
    },
    '/reservations': {
      nl: '/reserveren',
      en: '/reservations',
      de: '/reservierung',
    },
    '/contact': {
      nl: '/contact',
      en: '/contact',
      de: '/kontakt',
    },
  },
});

export type Pathnames = keyof typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number];

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
