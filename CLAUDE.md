# Restaurant Oostkade website

Live marketing site for Restaurant Oostkade (restaurantoostkade.nl), a hospitality client. App code lives at this top level. Trilingual: Dutch at `/`, English at `/en`, German at `/de`.

## Run and deploy
- Dev server: `npm run dev` from this folder, then open http://localhost:3000 (first-time setup: `.\scripts\dev.ps1`)
- Check before pushing: `npm run build` and `npm run lint`
- Deployed on Vercel from GitHub repo `ziggyrumfunk/restaurantoostkade`, branch `main`

## Stack
- Next.js 15 (App Router), React 19, TypeScript, CSS Modules, next-intl
- Table reservations use the external Zenchef widget (SDK script in `src/app/[locale]/layout.tsx`); the reservations page is informational only
- Event inquiries have no form: the events page shows email and phone links directly. Supabase (`src/lib/supabase.ts`, `supabase/schema.sql`, table `oostkade_event_inquiries`) and Resend are installed but currently unused by any code path

## Where things live
- Pages: `src/app/[locale]/`; per-language route names are defined in `src/i18n/routing.ts`
- Menu prices and dishes: `src/lib/menuData.ts`; drinks list: `src/lib/drinksData.ts`
- All UI copy and translations: `messages/nl.json`, `messages/en.json`, `messages/de.json` (keep all three in sync)
- Web-ready images and videos: `public/`

## Gotchas
- The README is stale: it says NL/EN only (code has German) and still documents an inquiry form and `/api/inquiries` route that were removed
- `.env.local` holds secrets (Supabase keys, Resend key, site URL, notification emails); names are in `.env.local.example`, never expose or commit values
- The Supabase project is shared with other client sites; everything is prefixed `oostkade_` or `oostkade-`
- `website assets/` is 600+ MB of raw photos, videos, and menu PDFs, gitignored on purpose: do not move, process, or commit it
- New photos need a compression pass before going into `public/` (see README, Updating content)
