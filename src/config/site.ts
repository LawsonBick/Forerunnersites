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
   * Canonical base URL used by metadata, canonical tags, Open Graph,
   * sitemap.xml, robots.txt, and structured data.
   *
   * Defaults to the live Vercel URL because that is where the site is
   * actually served today. Once forerunnersites.com is pointed at this
   * Vercel project, set NEXT_PUBLIC_SITE_URL="https://forerunnersites.com"
   * in the Vercel project env vars and every canonical follows it.
   */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://forerunner-sites.vercel.app",

  tagline: "Websites for Austin businesses",
  description:
    "Forerunner Sites is an Austin, Texas web studio that designs and builds fast, strategic websites for local businesses, service companies, restaurants, and growing brands.",

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

  /**
   * Shown above the homepage hero. Keep it honest — update or empty it
   * when your availability changes.
   */
  availability: "Now booking projects for October 2026",

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
