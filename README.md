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

Deploys to Vercel with no extra configuration. This directory is itself the
git repository root, so the Vercel project's **Root Directory** stays at the
default (`.`) — do not set it to `sitepilot/`.

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

Live at **https://www.forerunnersites.com** (Vercel project
`forerunner-sites`, connected to the GitHub repo `LawsonBick/Forerunnersites`
with `main` as the production branch). Pushing to `main` deploys to
production. To deploy from this directory instead:

```bash
vercel deploy --prod --yes
```

`site.url` is the canonical production origin and every canonical tag,
`sitemap.xml`, `robots.txt`, Open Graph URL, and structured-data `@id` is
built from it. `NEXT_PUBLIC_SITE_URL` exists only as an override if the
domain ever changes.

**`site.url` must match the primary domain set in Vercel.** Vercel currently
makes `www.forerunnersites.com` primary and 308s the bare apex to it, so the
canonical is the www host. Host canonicalisation is owned by Vercel alone:
`next.config.ts` deliberately contains no apex/www rule, because an app-level
rule pointing the opposite way to Vercel's would bounce requests between the
two hosts forever. If you ever prefer the bare apex, change the primary
domain in Vercel **first**, then update `site.url`. The one host rule the app
does own is `forerunner-sites.vercel.app` → canonical, since Vercel serves
that alias without redirecting and it would otherwise duplicate the site.

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
