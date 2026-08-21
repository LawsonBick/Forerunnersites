export interface Service {
  title: string;
  /** One-line version for the homepage index. */
  summary: string;
  /** Fuller description for the services page. */
  detail: string;
}

export const services: Service[] = [
  {
    title: "Website strategy",
    summary: "Every build starts with how your customers decide, not with a template.",
    detail:
      "Before anything gets designed, we work out what the site has to accomplish: who it's for, what they need to see to trust you, and which action each page should drive. The result is a plan you can read in one sitting — not a deck, a decision.",
  },
  {
    title: "UX & content structure",
    summary: "Pages organized around the questions people actually arrive with.",
    detail:
      "Visitors show up with jobs: check the menu, get a price, book the service, see if you're legit. Sitemaps, page structures, and navigation are built around those jobs, so the path from landing to inquiry is short and obvious on every device.",
  },
  {
    title: "Custom web design",
    summary: "A visual identity that matches how good your work already is.",
    detail:
      "No themes, no page builders. Typography, color, spacing, and imagery chosen for your business specifically — so the site looks like you at your best, and not like four of your competitors.",
  },
  {
    title: "Responsive development",
    summary: "Hand-built, fast, and dependable on every screen size.",
    detail:
      "Clean, modern code with no plugin bloat. The site is built mobile-first, tested across browsers and devices, and structured so it keeps working long after launch.",
  },
  {
    title: "Local SEO foundations",
    summary: "Structure, metadata, and schema so Austin can find you.",
    detail:
      "Titles and descriptions written for real searches, structured data that tells Google what you do and where, clean URLs, and a site architecture search engines can read. Foundations first — no gimmicks, no keyword stuffing.",
  },
  {
    title: "Performance optimization",
    summary: "Pages that load before your customer loses interest.",
    detail:
      "Optimized images, minimal scripts, and careful loading behavior. Speed isn't a vanity metric: it's rankings, bounce rate, and whether someone on a phone in a parking lot waits for your page or taps back.",
  },
  {
    title: "Analytics & conversion tracking",
    summary: "Know which pages earn calls, quotes, and bookings.",
    detail:
      "Google Analytics and Search Console configured properly, with conversion events on the actions that matter — form submissions, calls, bookings — so you can see what the site is actually producing.",
  },
  {
    title: "Website redesigns",
    summary: "Keep what works, rebuild what's costing you customers.",
    detail:
      "An honest review of your current site: what's earning its keep, what's confusing people, and what's quietly broken. Then a rebuild that preserves your search equity while fixing the experience.",
  },
  {
    title: "Ongoing support",
    summary: "Updates, fixes, and improvements after launch — from the person who built it.",
    detail:
      "Content updates, seasonal changes, new pages, and small improvements, handled directly by the person who wrote the code. Support plans are simple and separate from project pricing — no forced retainers.",
  },
];
