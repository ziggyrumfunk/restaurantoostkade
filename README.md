# Restaurant Oostkade — Website

Next.js 15 (App Router) + TypeScript + CSS Modules + next-intl + Supabase. Deployed on Vercel.

## Stack

- **Next.js 15** with App Router, React 19, TypeScript
- **next-intl** for Dutch (default at `/`) and English (at `/en`)
- **CSS Modules** with design tokens in `src/app/globals.css`
- **next/image** with AVIF + WebP responsive output
- **Supabase** for event inquiry storage (reservations now via Zenchef widget)
- **Google Fonts**: Outfit (body + headings) + Italiana (script/editorial)

## Local development (Windows / PowerShell)

```powershell
# First time setup — installs deps, copies .env.local.example if needed,
# then starts the dev server at http://localhost:3000.
.\scripts\dev.ps1
```

Manual equivalents:

```powershell
npm install
copy .env.local.example .env.local   # edit with your Supabase keys
npm run dev
```

## Production preview

```powershell
.\scripts\build.ps1
.\scripts\preview.ps1
```

## Environment variables

Copy `.env.local.example` to `.env.local` and fill in:

- `NEXT_PUBLIC_SUPABASE_URL` — your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — publishable key (safe in browser)
- `SUPABASE_SERVICE_ROLE_KEY` — secret key (server only, never expose to client)
- `NEXT_PUBLIC_SITE_URL` — `http://localhost:3000` locally, `https://restaurantoostkade.nl` in prod
- `NOTIFICATION_EMAIL` (optional) — used by API routes when emailing inquiries

## Supabase setup

The site shares an existing Supabase project. Tables and the storage bucket are namespaced with `oostkade_` / `oostkade-` so they coexist with other sites in the same project.

1. In your existing Supabase project, open the SQL editor and run `supabase/schema.sql`. This creates `public.oostkade_event_inquiries`.
2. (Optional) Create a public storage bucket called `oostkade-assets` if you want to serve images from Supabase Storage. The site currently uses `public/` for all images, so this is optional.

## Pages

| Route NL              | Route EN                | File                                          |
|-----------------------|-------------------------|-----------------------------------------------|
| `/`                   | `/en`                   | `src/app/[locale]/page.tsx`                   |
| `/menukaart`          | `/en/menu`              | `src/app/[locale]/menu/page.tsx`              |
| `/dranken`            | `/en/drinks`            | `src/app/[locale]/drinks/page.tsx`            |
| `/lunch`              | `/en/lunch`             | `src/app/[locale]/lunch/page.tsx`             |
| `/private-dining`     | `/en/private-dining`    | `src/app/[locale]/events/page.tsx`            |
| `/reserveren`         | `/en/reservations`      | `src/app/[locale]/reservations/page.tsx`      |
| `/contact`            | `/en/contact`           | `src/app/[locale]/contact/page.tsx`           |

UI copy lives in `messages/nl.json` and `messages/en.json`. Menu items and drinks lists live in `src/lib/menuData.ts` and `src/lib/drinksData.ts` — edit there to update prices or dishes.

## Reservations (Zenchef)

The reservations page is informational only. Bookings happen via the Zenchef floating widget that you'll embed via their script tag. The page tells visitors to use the bottom-right widget and shows opening hours + phone for groups of 8+.

To embed the Zenchef widget once you're ready, add the script to the global layout (`src/app/[locale]/layout.tsx`) inside the `<body>`. Zenchef will give you a snippet like `<script src="https://book.zenchef.com/widget/..." />`.

## SEO

- Per-page `generateMetadata` with title, description, canonical URL and language alternates
- OpenGraph + Twitter Card via the locale layout
- Restaurant schema.org JSON-LD in `src/components/JsonLd.tsx` (hours, address, geo, menu, ratings)
- `robots.ts` + `sitemap.ts` auto-generate `/robots.txt` and `/sitemap.xml`
- `src/app/icon.png` provides the favicon

When the production URL is final, double-check `NEXT_PUBLIC_SITE_URL=https://restaurantoostkade.nl` in your Vercel env vars — JSON-LD and OpenGraph URLs derive from it.

## Performance

- All images go through `next/image` for AVIF/WebP + responsive sizes
- Source images compressed: hero/* @ 1400px, impressions/* @ 1600px, content/* @ 2000px, quality 82
- Videos in `public/impressions/` are 540×960 H.264 @ ~CRF 28, no audio
- Fonts loaded via `next/font/google` with `display: swap` (zero CLS)
- Loading splash uses sessionStorage to show only once per visit

## Deploying to Vercel

1. Push the repo to GitHub.
2. In Vercel, click **Import Project** and select the repo.
3. Framework preset: **Next.js** (auto-detected).
4. Add these environment variables in **Project Settings → Environment Variables**:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `NEXT_PUBLIC_SITE_URL=https://restaurantoostkade.nl`
5. Deploy.
6. Once live, add the production domain (`restaurantoostkade.nl`) under **Domains**.
7. Submit `https://restaurantoostkade.nl/sitemap.xml` to Google Search Console.

## Updating content

- **Menu prices / dishes** → `src/lib/menuData.ts`
- **Drinks list** → `src/lib/drinksData.ts`
- **Copy and translations** → `messages/nl.json` and `messages/en.json`
- **Reviews** → `src/components/Reviews.tsx` + review body translations in messages files
- **Photos** → drop into `public/hero/`, `public/impressions/` etc. After dropping, run a compression pass with `mogrify -resize "1400x>" -quality 82 -strip -interlace JPEG <file>`

## Form submissions

The Events inquiry form (`/private-dining`) posts to `/api/inquiries` and writes to `public.oostkade_event_inquiries` in Supabase via the service-role key. Includes a honeypot field for bot protection. Check the table in the Supabase dashboard to read incoming inquiries.
