# Forerunner Sites — agency website

A production Next.js site for Forerunner Sites, an Austin, TX web design and
development studio. Built with the App Router, TypeScript, and Tailwind CSS 4.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run lint       # eslint
```

Deploys to Vercel with no extra configuration (set the project's
**Root Directory** to `sitepilot/` if the repo root is the parent folder).

## Where to edit things

| What | Where |
| --- | --- |
| Business details (name, email, phone, scheduling URL, socials, GA id, availability line) | `src/config/site.ts` — every placeholder is marked `TODO` |
| Case studies (copy, palettes, screenshots) | `src/content/projects.ts` |
| Services copy | `src/content/services.ts` |
| Packages, comparison table, pricing FAQ | `src/content/pricing.ts` |
| Process steps and "why us" list | `src/content/process.ts` |
| Design tokens (colors, fonts, radii, shadows, easing) | `src/app/globals.css` (`@theme` block) |
| Page layouts | `src/app/**/page.tsx` |
| Shared components | `src/components/` |

## Deployment

Live at **https://forerunner-sites.vercel.app** (Vercel project
`forerunner-sites`). Redeploy from this directory with:

```bash
vercel deploy --prod --yes
```

`site.url` is the canonical production origin, **https://forerunnersites.com**,
and every canonical tag, `sitemap.xml`, `robots.txt`, Open Graph URL, and
structured-data `@id` is built from it. That domain must be attached to the
Vercel project (Project → Settings → Domains, then point DNS at Vercel) for
those URLs to resolve. Once it is, the `forerunner-sites.vercel.app` alias
redirects to it automatically: `next.config.ts` enables that redirect only
when Vercel reports the custom domain as the production URL, so deploying
before DNS is ready cannot lock you out. `NEXT_PUBLIC_SITE_URL` exists only
as an override if the domain ever changes.

Preview deployments are served with `noindex` and a `Disallow: /` robots
file, so branch previews never compete with the live site in search.

See `SEO-AUDIT.md` for the search strategy, the keyword-to-page map, and
the launch checklist of items that still need your input.

## Contact form delivery

`src/app/api/contact/route.ts` emails inquiries to `site.email` through
Resend. Until `RESEND_API_KEY` is set the endpoint returns 503 and the form
shows its error state, which points the visitor at the email address — it
never silently swallows a lead.

To turn delivery on:

1. Create a free account at [resend.com](https://resend.com) **using the same
   address as `site.email`**, so the sandbox sender can reach your inbox.
2. Create an API key at resend.com/api-keys.
3. Add it to Vercel and redeploy:

   ```bash
   vercel env add RESEND_API_KEY production
   vercel deploy --prod --yes
   ```

Mail sends from Resend's shared `onboarding@resend.dev` sender by default,
which only delivers to the account owner's address. Once you verify your own
domain in Resend, set `CONTACT_FROM` (e.g. `Forerunner Sites
<inquiries@yourdomain.com>`) to send from your brand and lift that limit.
Every inquiry sets `reply_to` to the sender, so replying goes straight to
the prospect.

For local testing, put the key in `.env.local` (already gitignored).

## Before launch

0. **Attach the domain.** Add forerunnersites.com in Vercel and point DNS at
   it. Every canonical URL already assumes this domain.
1. **`src/config/site.ts`** — fill in the remaining `TODO` values: phone,
   scheduling URL, social profiles, and the Google Business Profile URL.
   Add the Search Console verification token to
   `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` in Vercel (or verify via DNS).
2. **`RESEND_API_KEY`** — see "Contact form delivery" above. Until this is
   set, the live form cannot accept inquiries.
3. **About photo** — drop a portrait at `public/about/portrait.jpg` and swap
   the placeholder block in `src/app/about/page.tsx` (comment marks the spot).
4. **Google Analytics** — set `googleAnalyticsId` in the config to enable GA4
   (scripts render only when an id is present).

## Portfolio screenshots

`public/work/*.jpg` are captures of the three live client sites. To refresh
them, re-capture at these viewport sizes and overwrite the files:

- `{slug}-desktop.jpg` — 1600×1000 viewport @2x
- `{slug}-tall.jpg` — 1600×2400 viewport @1.5x
- `{slug}-mobile.jpg` — 430×932 viewport @2x (mobile user agent)

Slugs: `manuels`, `trz`, `cleanz`. Alt text lives in `src/content/projects.ts`.
