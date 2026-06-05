import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['nl', 'en', 'de'],
  defaultLocale: 'nl',
  localePrefix: {
    mode: 'as-needed', // / -> nl, /en -> en, /de -> de
  },
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
