/**
 * ─────────────────────────────────────────────────────────────────────
 *  SITE CONFIGURATION — the one place to edit business details.
 *
 *  Every value marked `TODO` is a placeholder. Update it here and it
 *  propagates everywhere: navigation, footer, contact page, metadata,
 *  structured data, sitemap, and the privacy policy.
 *
 *  Values set to `null` are treated as "not provided yet" and the UI
 *  simply omits them — nothing fake is ever rendered.
 * ─────────────────────────────────────────────────────────────────────
 */

export const site = {
  /** TODO: confirm final agency name and wordmark spelling. */
  name: "Forerunner Sites",
  legalName: "Forerunner Sites",

  /**
   * The one canonical production origin. Every canonical tag, sitemap
   * entry, robots.txt line, Open Graph URL, and structured-data @id is
   * built from this, so preview deployments and the *.vercel.app alias can
   * never advertise themselves as the real site.
   *
   * This MUST match the primary domain in Vercel (Settings → Domains).
   * That project currently makes www primary and 308s the apex to it, so
   * the canonical is the www host: pointing canonicals at the apex would
   * aim every one of them at a redirect. To move to the bare apex, flip
   * the primary domain in Vercel first, then change this line.
   *
   * NEXT_PUBLIC_SITE_URL exists only as an escape hatch if the domain ever
   * changes. Leave it unset in Vercel.
   */
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.forerunnersites.com").replace(/\/+$/, ""),

  tagline: "Websites for Austin businesses",
  description:
    "Forerunner Sites is an Austin, Texas web studio that designs and builds fast, strategic websites for local businesses, service companies, restaurants, and growing brands.",

  /**
   * Date the site's content last materially changed, in ISO form. Feeds
   * sitemap <lastmod> for the static pages, so bump it when copy changes.
   * (Project pages carry their own `updated` date in content/projects.ts.)
   */
  contentUpdated: "2026-09-06",

  /**
   * TODO: paste the Google Search Console HTML-tag verification token
   * (just the content value) into NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION in
   * Vercel, or verify via DNS instead and leave this unset.
   */
  googleSiteVerification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ?? null,

  /** TODO: add the public Google Business Profile URL once the listing is live. */
  googleBusinessProfileUrl: null as string | null,

  location: {
    city: "Austin",
    region: "TX",
    regionFull: "Texas",
    country: "US",
  },

  /** Public inbox — used for mailto links, the contact page, and the privacy page. */
  email: "lawbick@gmail.com",

  /** TODO: add your phone number as a string (e.g. "(512) 555-0100") or leave null to hide it. */
  phone: null as string | null,

  /** TODO: add your Calendly/Cal.com/SavvyCal URL, or leave null to hide the scheduling option. */
  schedulingUrl: null as string | null,

  /** TODO: add real profile URLs, or leave null to hide each one. */
  social: {
    instagram: null as string | null,
    linkedin: null as string | null,
    x: null as string | null,
  },

  /** TODO: set your GA4 measurement ID (e.g. "G-XXXXXXX") to enable analytics. */
  googleAnalyticsId: null as string | null,


  founder: {
    name: "Lawson Bickerstaff",
    role: "Designer & developer",
  },

  founded: "Austin, Texas",

  nav: [
    { label: "Work", href: "/work" },
    { label: "Services", href: "/services" },
    { label: "Pricing", href: "/pricing" },
    { label: "About", href: "/about" },
  ],

  cta: {
    primary: { label: "Start a Project", href: "/contact" },
    secondary: { label: "View Our Work", href: "/work" },
  },

  footerNav: [
    { label: "Work", href: "/work" },
    { label: "Services", href: "/services" },
    { label: "Pricing", href: "/pricing" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
} as const;

export type Site = typeof site;
