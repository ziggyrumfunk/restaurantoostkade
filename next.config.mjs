import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Permanent redirects run before the next-intl middleware. Its own
  // redirects are temporary (307), which kept old paths such as /events in
  // Google's results, and www served a full duplicate of the site.
  async redirects() {
    const moved = [
      ['/events', '/private-dining'],
      ['/menu', '/menukaart'],
      ['/drinks', '/dranken'],
      ['/reservations', '/reserveren'],
      ['/impressions', '/sfeer'],
      ['/speisekarte', '/de/speisekarte'],
      ['/getraenke', '/de/getraenke'],
      ['/reservierung', '/de/reservierung'],
      ['/kontakt', '/de/kontakt'],
      ['/impressionen', '/de/impressionen'],
      ['/en/events', '/en/private-dining'],
      ['/de/events', '/de/private-dining'],
      ['/nl', '/'],
      ['/nl/:path*', '/:path*'],
    ];
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.restaurantoostkade.nl' }],
        destination: 'https://restaurantoostkade.nl/:path*',
        permanent: true,
      },
      ...moved.map(([source, destination]) => ({ source, destination, permanent: true })),
    ];
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

export default withNextIntl(nextConfig);
