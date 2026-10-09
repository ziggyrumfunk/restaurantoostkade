import type { Metadata, Viewport } from 'next';
import './globals.css';

// Base for every relative URL in metadata (canonical, hreflang, og:image).
// The fallback must be the production domain: NEXT_PUBLIC_SITE_URL is not set
// on Vercel, and a localhost fallback put localhost URLs on the live site.
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://restaurantoostkade.nl'),
  // Google Search Console ownership check. Removing it unverifies the property.
  verification: { google: '3lpgbLGhohsBmDu0uE5bADwyh8M4xbz7gFr9c17JHu4' },
};

export const viewport: Viewport = {
  themeColor: '#f7f3ec',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // The actual <html> tag is rendered by the [locale] layout so we can set lang.
  return children;
}
