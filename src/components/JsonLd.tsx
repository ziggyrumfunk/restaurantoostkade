import { getTranslations } from 'next-intl/server';

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://restaurantoostkade.nl';

export async function JsonLd() {
  const t = await getTranslations('Meta');
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    '@id': `${SITE}/#restaurant`,
    name: 'Restaurant Oostkade',
    alternateName: 'Oostkade',
    image: [`${SITE}/og.jpg`, `${SITE}/menu-juli/oostkade-menu-juli-07.jpg`],
    logo: `${SITE}/logo-dark.png`,
    url: SITE,
    telephone: '+31-186-617170',
    email: 'info@restaurantoostkade.nl',
    priceRange: '€€',
    servesCuisine: ['European', 'Asian fusion', 'Modern'],
    acceptsReservations: `${SITE}/reserveren`,
    description: t('defaultDescription'),
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Oostkade 24',
      addressLocality: 'Oud-Beijerland',
      postalCode: '3261 KL',
      addressRegion: 'Zuid-Holland',
      addressCountry: 'NL',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 51.8231,
      longitude: 4.4144,
    },
    hasMap: 'https://maps.google.com/?q=Oostkade+24+Oud-Beijerland',
    areaServed: [
      { '@type': 'AdministrativeArea', name: 'Hoeksche Waard' },
      { '@type': 'City', name: 'Oud-Beijerland' },
      { '@type': 'City', name: 'Spijkenisse' },
      { '@type': 'City', name: 'Barendrecht' },
      { '@type': 'City', name: 'Numansdorp' },
      { '@type': 'City', name: 'Klaaswaal' },
    ],
    keywords:
      'restaurant Hoeksche Waard, restaurant Oud-Beijerland, uit eten Hoeksche Waard, lunch Oud-Beijerland, terras aan de haven, private dining Hoeksche Waard',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Tuesday', 'Wednesday', 'Sunday'],
        opens: '12:00',
        closes: '23:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Thursday', 'Friday', 'Saturday'],
        opens: '12:00',
        closes: '00:00',
      },
    ],
    menu: `${SITE}/menukaart`,
    hasMenu: [
      { '@type': 'Menu', name: 'Diner', url: `${SITE}/menukaart` },
      { '@type': 'Menu', name: 'Lunch', url: `${SITE}/menukaart` },
      { '@type': 'Menu', name: 'Drinks', url: `${SITE}/dranken` },
    ],
    sameAs: [
      'https://www.instagram.com/restaurantoostkade',
      'https://www.facebook.com/Oostkade/',
    ],
    // No aggregateRating: Google forbids self-declared ratings for a
    // business's own page and copying reviews from other sites into markup.
  };
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
