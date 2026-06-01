import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['nl', 'en'],
  defaultLocale: 'nl',
  localePrefix: {
    mode: 'as-needed', // / -> nl, /en -> en
  },
  pathnames: {
    '/': '/',
    '/menu': {
      nl: '/menukaart',
      en: '/menu',
    },
    '/drinks': {
      nl: '/dranken',
      en: '/drinks',
    },
    '/lunch': {
      nl: '/lunch',
      en: '/lunch',
    },
    '/events': {
      nl: '/private-dining',
      en: '/private-dining',
    },
    '/reservations': {
      nl: '/reserveren',
      en: '/reservations',
    },
    '/contact': {
      nl: '/contact',
      en: '/contact',
    },
  },
});

export type Pathnames = keyof typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number];

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
