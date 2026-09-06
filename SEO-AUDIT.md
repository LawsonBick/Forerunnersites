# SEO audit and strategy — Forerunner Sites

Working document for search, local discovery, performance, accessibility,
and lead generation on www.forerunnersites.com. Written 2026-09-06 against the
Next.js 16 App Router codebase in this directory. Update it when pages,
positioning, or targets change.

---

## 1. Target audience and positioning

**What the business is.** A one-person web design and development studio in
Austin, Texas, run by Lawson Bickerstaff. Every site is hand-coded (no
themes, no page builders) and sold as a one-time project: Launch ($500,
one page, about a week), Growth ($1,500, up to five pages, 2–3 weeks), and
Custom (from $3,000). Post-launch support is separate.

**Who it is for.** Owner-led local and service businesses whose website has
a concrete job: restaurants, home and exterior services, automotive,
professional practices, and growing local brands. The three published case
studies (Manuel's, TRZ Shine & Detail, CleanZ ATX) are all Austin-area
businesses in exactly those categories.

**Geography.** Austin, TX is home and where most work happens. The pricing
FAQ states the process works remotely for clients elsewhere, so the site
targets Austin explicitly and does not exclude remote work, but it does not
claim any other service area. West Austin, Lakeway, and Lake Travis appear
only as client locations, not as studio service areas.

**Differentiators to lead with.** Owner does strategy, design, and code
(no hand-offs); transparent published pricing; fast turnaround at the entry
tier; performance and local-SEO foundations included; client owns the
domain, code, and accounts.

**Conversion.** The one conversion is a delivered project inquiry through
the contact form (email as the fallback). There is no phone number or
scheduling link yet; both are wired up and render automatically once added
to `src/config/site.ts`.

---

## 2. Keyword-to-page map

One primary intent per page. Secondary phrases are natural variants that
belong on the same page; they are not separate targets.

| Page | Primary intent | Secondary / supporting | Notes |
| --- | --- | --- | --- |
| `/` | **web design Austin** / Austin web design company | web designer Austin TX, website design and development Austin, small business website Austin, branded searches | Title now leads with the service and city. The hero H1 ("Get found. Get chosen.") is deliberately kept as the brand line; the intro paragraph carries the keywords. |
| `/services` | **web design services Austin** | custom website design Austin, website development Austin, local SEO for Austin businesses, website redesign Austin, website performance optimization | Each service now has a stable anchor (`/services#local-seo-foundations`) that case studies link to. |
| `/pricing` | **website design pricing** / how much does a website cost for a small business | web design packages, one-page website cost, $500 website, website design cost Austin | FAQPage schema mirrors the visible questions exactly. |
| `/work` | **Austin web design portfolio** | small business website examples, restaurant website design Austin, web design case studies | Project names are h2s under the page h1. |
| `/work/manuels` | **restaurant website design Austin** | restaurant website with online ordering and reservations, Resy website integration | Case study pages are the strongest long-tail assets on the site. |
| `/work/trz-detail` | **auto detailing website design** | mobile detailing website, car detailing booking website | |
| `/work/cleanz-atx` | **home services website design** / exterior cleaning website | window cleaning website, pressure washing website, quote form website | |
| `/about` | **Forerunner Sites** (branded) | Lawson Bickerstaff web designer, owner-led web studio Austin | Person schema links the founder to the organization. |
| `/contact` | **hire a web designer in Austin** / get a website quote | start a website project, website proposal | ContactPage schema. Page is now static. |
| `/privacy` | none (legal) | | Indexed, low priority in sitemap. |

**Branded variants to own:** Forerunner Sites, Forerunner Sites Austin,
forerunnersites, forerunner web design, fore runner sites. All resolve
naturally to the homepage; no separate pages.

**Deliberately not created.** Per-neighborhood location pages (West
Austin, Lakeway, Round Rock…) and per-industry service pages. The repository
does not contain enough distinct, real information to make them useful, and
near-duplicate pages would compete with the pages above. See §7 for the
content that would earn them.

---

## 3. Condition before this audit

The site was already in better shape than most: App Router with server
rendering everywhere, `next/image` with explicit dimensions, `next/font`
with `display: swap`, per-page titles, canonicals, an OG image, a generated
robots.txt and sitemap, ProfessionalService / Service / FAQPage JSON-LD, a
skip link, `aria-current`, labelled landmarks, and an accessible form with
honeypot and error summary. Content is visible without JavaScript because
reveal animations are gated on a `js` class.

Highest-impact problems found:

1. **Canonical origin was the Vercel URL.** `site.url` fell back to
   `https://forerunner-sites.vercel.app`, so every canonical, sitemap entry,
   `og:url`, and schema `@id` pointed at a staging-style hostname.
2. **No preview safeguards.** Branch previews rendered identical, indexable
   metadata and an identical robots.txt.
3. **Page-level `openGraph` silently discarded layout defaults.** Next.js
   replaces the whole nested object; the case-study pages set only
   `images`, losing `siteName`, `locale`, and `type`. No page set `og:url`.
4. **Sitemap `<lastmod>` was the build clock**, stamping every URL "now" on
   every deploy, which search engines learn to ignore.
5. **Structured data had no `@id`s, no `WebSite`, no `WebPage`, no
   `BreadcrumbList`, no logo, and no founder entity**; the three blocks were
   inline and inconsistent.
6. **Heading hierarchy skipped levels** on `/work` (h1 → h3) and `/pricing`
   (h1 → h3), and the home "Selected work" section had no h2.
7. **Titles were thin** ("About", "Work", "Pricing") and several
   descriptions ran long.
8. **The contact page rendered per request** just to read `?package=`.
9. **`ink-faint` (#8a8578) failed WCAG AA** at 3.5:1 and was the form
   placeholder colour.
10. No web manifest, no apple-touch-icon, and no lowercase-URL handling.
11. **`forerunner-sites.vercel.app` served the whole site unredirected**,
    duplicating the real domain. (The apex is redirected to www by Vercel,
    but this alias is not.)

---

## 4. Changes implemented

### Technical SEO
- `src/config/site.ts`: canonical production origin is now
  `https://www.forerunnersites.com` (override via `NEXT_PUBLIC_SITE_URL` only).
  Added `contentUpdated`, `googleSiteVerification` (from env), and a
  `googleBusinessProfileUrl` slot.
- `src/lib/seo.ts`: `buildMetadata()` gives every page a complete, consistent
  set of title, description, canonical, Open Graph (with `og:url`), and
  Twitter fields; `isPreviewDeployment`; `absoluteUrl()`.
- `src/app/layout.tsx`: robots `noindex, nofollow` on Vercel preview
  deployments; explicit `max-image-preview:large` etc. in production;
  Search Console `verification` when the env var is set.
- `src/app/robots.ts`: `Disallow: /` on previews; production allows all but
  `/api/`; references the sitemap on the canonical origin.
- `src/app/sitemap.ts`: canonical URLs only; `<lastmod>` from
  `site.contentUpdated` and each project's `updated` date.
- `next.config.ts`: `forerunner-sites.vercel.app` → canonical redirect,
  active only once Vercel reports a custom domain as production;
  `poweredByHeader: false`; AVIF + WebP image formats; one-week cache
  headers for `/work/*` media. **Deliberately contains no apex/www rule** —
  see the note below.
**Host canonicalisation has exactly one owner: Vercel.** The project's domain
settings make `www.forerunnersites.com` primary and 308 the bare apex to it.
An app-level redirect pointing the other way would send every request
bouncing between the two hosts until the browser gave up, so `next.config.ts`
has no apex/www rule at all and `site.url` is set to the www host to match.
Change one and you must change the other, Vercel first.

- `src/proxy.ts`: 308 redirect for any path containing uppercase letters.
  Trailing slashes are already normalised by Next.js. **Trade-off:** a
  proxy runs on every page request (assets excluded), which on Vercel adds
  a small function invocation ahead of the CDN cache. Uppercase URL
  variants are rare and a 404 is not a duplicate-content problem, so if
  TTFB ever matters more than this nicety, deleting the one file removes
  it with no other changes.
- `src/app/manifest.ts`, `src/app/apple-icon.png`, `public/icons/*`,
  `public/logo.png`: manifest, touch icon, and a 512px logo for schema.
- `src/app/contact/page.tsx`: now fully static; the form reads `?package=`
  on the client.

### Structured data
- `src/lib/schema.ts` + `src/components/json-ld.tsx`: all JSON-LD goes
  through one builder module and one component. Root layout emits a graph
  of `ProfessionalService` (with logo, address, `areaServed`, founder,
  `priceRange`, `knowsAbout`, and an `OfferCatalog` built from the visible
  packages), `Person` (founder), and `WebSite`, all with stable `@id`s.
  Every page emits its own `WebPage` (typed `AboutPage`, `ContactPage`,
  `CollectionPage`, `ItemPage` where appropriate) that references the site
  and organisation. Services emit one `Service` each; pricing emits the
  `FAQPage`; case studies emit `BreadcrumbList` and a `CreativeWork` about
  the real client organisation.
- Nothing in the graph is asserted that is not on the page or committed in
  the repo. No ratings, reviews, addresses, or opening hours.

### On-page
- Unique titles (≤ 60 chars with the site name) and descriptions
  (140–160 chars) on every route; case studies carry their own in
  `content/projects.ts` under `seo`.
- H1s on `/services`, `/pricing`, `/work`, and `/about` now name the topic
  while keeping the existing voice. Home and contact H1s are unchanged.
- Heading hierarchy fixed: `ProjectShowcase` accepts a heading level (h2 on
  `/work`, h3 under a new h2 on the home page); `/pricing` gains an h2
  above the package cards.
- Visible breadcrumbs on case-study pages (replacing the "← All work"
  link), with matching schema.
- Service anchors on `/services`; case-study "Services delivered" tags
  deep-link to them; new proof and pricing links on the services and
  pricing pages with descriptive anchor text.
- External links announce "(opens in a new tab)" to screen readers.

### Performance and accessibility
- `ink-faint` darkened to `#706b5f` (≥ 4.65:1 on every background it
  appears on).
- Contact page is static HTML now (was dynamic per request).
- AVIF served ahead of WebP for every `next/image`.
- Portfolio video/poster get a week of edge caching.
- Conversion tracking: the form fires GA4's standard `generate_lead` event
  on a delivered inquiry (only when a measurement ID is configured).

---

## 5. Verification performed

See the final report in the session for exact output. Checks run locally:
`tsc --noEmit`, ESLint, `next build`, then a production server crawl of
every route asserting title, description, canonical, `og:url`, robots,
one h1, valid JSON-LD, and 200/404/308 status codes; sitemap and robots
validation; internal-link crawl; external client-site reachability.

---

## 6. Items requiring the owner's input

Nothing below has been invented; each renders automatically once filled in.

| Item | Where | Why it matters |
| --- | --- | --- |
| **Decide apex vs www, if you dislike the current choice** | Vercel → Settings → Domains | The site is live on `www.forerunnersites.com`, with the bare apex 308ing to it, and `site.url` matches. Changing to the bare apex means flipping the primary domain in Vercel **first**, then updating `site.url`. Doing only one of the two breaks the site (see the host canonicalisation note in §4). |
| Google Search Console verification token | `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` env var (or verify via DNS) | Submit the sitemap, monitor indexing and queries. |
| GA4 measurement ID | `site.googleAnalyticsId` | Enables analytics and the `generate_lead` key event. |
| Phone number | `site.phone` | Renders in footer/contact and in schema `telephone`; adds a second conversion path. |
| Scheduling link (Calendly etc.) | `site.schedulingUrl` | Third conversion path; shown on contact and in the form's success state. |
| Social profile URLs | `site.social.*` | Rendered in footer and schema `sameAs`. |
| Google Business Profile URL | `site.googleBusinessProfileUrl` | Added to `sameAs`, tying the listing to the site. |
| Resend API key | `RESEND_API_KEY` | The form cannot deliver until this is set. |
| Confirm whether remote clients should be targeted | copy on `/services` or `/pricing` | The FAQ says remote works; if that is a real growth channel it deserves a sentence on the services page. |
| Client permission for testimonials | content | No testimonials exist in the repo; they would be a strong trust signal if real quotes can be obtained. |

---

## 7. Suggested future content, ranked by commercial value

Each of these should only be written when there is enough real material
to make it genuinely useful; none exist yet.

1. **"Restaurant website design in Austin" service page.** The Manuel's case
   study, the menu/reservation/ordering expertise, and the owner's
   restaurant background are real, specific, and differentiated. Highest
   intent match with existing proof.
2. **"How much does a small business website cost in Austin?"** — an honest
   article built from the pricing page and FAQ, aimed at the largest
   pre-purchase query in this market.
3. **"Home services website: what actually generates quotes"** using the
   CleanZ build (quote flow, itemised pricing, review placement).
4. **Website redesign checklist** for owners with an outdated site; supports
   the redesign service and the "modernize an outdated website" form goal.
5. **"Squarespace / Wix vs a custom-coded site"** for Austin businesses; the
   no-page-builders position is a real differentiator and a common search.
6. **Location pages** (West Austin, Lakeway) only if the studio genuinely
   markets to those areas and can say something specific about each; two
   of three clients are there, which is a start but not yet a page.
7. **Testimonials/reviews section** once real client quotes exist; add
   `Review` schema only for reviews displayed on the page.
