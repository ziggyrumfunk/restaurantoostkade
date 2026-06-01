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
    image: [`${SITE}/og.jpg`, `${SITE}/logo-white.svg`],
    logo: `${SITE}/logo-white.svg`,
    url: SITE,
    telephone: '+31-186-617170',
    email: 'info@restaurantoostkade.nl',
    priceRange: '€€',
    servesCuisine: ['European', 'Asian fusion', 'Modern'],
    acceptsReservations: 'True',
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
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Tuesday', 'Wednesday', 'Thursday', 'Sunday'],
        opens: '12:00',
        closes: '22:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Friday', 'Saturday'],
        opens: '12:00',
        closes: '23:00',
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
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '10',
      bestRating: '5',
      worstRating: '1',
    },
  };
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
