export interface Package {
  id: "launch" | "growth" | "custom";
  name: string;
  price: string;
  priceNote: string;
  bestFor: string;
  summary: string;
  includes: string[];
  expectation: string;
  timeline: string;
  revisions: string;
  cta: { label: string; href: string };
  recommended?: boolean;
}

export const packages: Package[] = [
  {
    id: "launch",
    name: "Launch",
    price: "$500",
    priceNote: "one-time",
    bestFor: "A new business that needs a credible online presence quickly.",
    summary:
      "A focused one-page website that makes you easy to find, easy to trust, and easy to contact. Live within about a week.",
    includes: [
      "One-page website",
      "Professionally arranged semi-custom design system",
      "Up to five primary sections",
      "Mobile-responsive development",
      "Contact or lead form",
      "Social links",
      "Basic title & metadata setup",
      "Basic accessibility & performance review",
      "Domain connection",
      "One revision round",
    ],
    expectation:
      "Launch is a focused one-page build using your logo, copy, and imagery, not a fully custom brand or a multi-page site. It's the fastest honest way to get a credible presence live.",
    timeline: "5–7 business days",
    revisions: "One revision round",
    cta: { label: "Choose Launch", href: "/contact?package=launch" },
  },
  {
    id: "growth",
    name: "Growth",
    price: "$1,500",
    priceNote: "one-time",
    bestFor: "An established local business that needs a complete, conversion-focused website.",
    summary:
      "Up to five pages with a customized visual direction, conversion-focused layouts, and the search and analytics foundations most local sites skip.",
    includes: [
      "Up to five core pages",
      "Customized visual direction",
      "Strategic sitemap & page structure",
      "Responsive design & development",
      "Conversion-focused page layouts",
      "Contact, quote, reservation, or booking integration",
      "Basic copy refinement from your source material",
      "Local SEO foundations",
      "Page titles & meta descriptions",
      "Google Analytics & Search Console setup",
      "Image & performance optimization",
      "Social sharing metadata",
      "Domain & launch support",
      "Two revision rounds",
    ],
    expectation:
      "Growth is the right fit for most established local businesses: a real strategy pass, a design direction built around your brand, and every page shaped to produce inquiries.",
    timeline: "2–3 weeks",
    revisions: "Two revision rounds",
    cta: { label: "Choose Growth", href: "/contact?package=growth" },
    recommended: true,
  },
  {
    id: "custom",
    name: "Custom",
    price: "$3,000+",
    priceNote: "starting at",
    bestFor: "A business that needs a distinct brand experience, advanced functionality, or a larger content structure.",
    summary:
      "A fully custom engagement scoped around your business: discovery, strategy, bespoke design, and whatever functionality the work requires.",
    includes: [
      "Discovery & strategy session",
      "Custom scope & sitemap",
      "Fully custom visual design",
      "Custom page templates",
      "Advanced UX & conversion planning",
      "Scalable responsive development",
      "CMS or editable content, when needed",
      "Advanced forms & third-party integrations",
      "Booking, ordering, or e-commerce, when scoped",
      "Content & messaging guidance",
      "Technical & on-page SEO foundations",
      "Analytics & conversion-event configuration",
      "Advanced performance optimization",
      "Refined interaction & motion design",
      "Cross-browser & device QA",
      "Three structured revision rounds",
      "Launch support & handoff",
    ],
    expectation:
      "Custom projects are scoped individually, so the price reflects exactly what's being built, and nothing more. You'll get a written proposal with scope, timeline, and cost before anything begins.",
    timeline: "4–6+ weeks, depending on scope",
    revisions: "Three structured revision rounds",
    cta: { label: "Request a Custom Proposal", href: "/contact?package=custom" },
  },
];

/** Comparison table rows: [feature, launch, growth, custom]. */
export const comparison: [string, string, string, string][] = [
  ["Pages", "One page", "Up to five pages", "Custom sitemap"],
  ["Design", "Semi-custom system", "Customized direction", "Fully custom"],
  ["Copy", "Client-provided", "Refined from your material", "Guidance & messaging"],
  ["Forms & integrations", "Contact form", "Quote, booking, or reservation", "Advanced & third-party"],
  ["SEO", "Basic metadata", "Local SEO foundations", "Technical & on-page"],
  ["Analytics", "Not included", "GA4 + Search Console", "Plus conversion events"],
  ["CMS / editable content", "Not included", "Not included", "When scoped"],
  ["Revision rounds", "One", "Two", "Three"],
  ["Timeline", "5–7 business days", "2–3 weeks", "4–6+ weeks"],
  ["Price", "$500", "$1,500", "From $3,000"],
];

export const pricingNotes = [
  "All prices are one-time project fees, not subscriptions.",
  "Domain registration, hosting, paid third-party software, professional photography, and extensive copywriting are separate unless included in a custom proposal.",
  "Ongoing maintenance and optimization plans are available separately after launch.",
];

export interface Faq {
  question: string;
  answer: string;
}

export const pricingFaqs: Faq[] = [
  {
    question: "What do I need to have ready before we start?",
    answer:
      "Your logo, any photography you have, and source material for the copy, whether that is existing text, bullet points, or even voice notes. For Growth and Custom projects, part of the process is turning rough material into finished pages, so it doesn't need to be polished. If you're missing something important, we'll figure out a plan for it before work begins.",
  },
  {
    question: "What's not included in the package price?",
    answer:
      "Domain registration, hosting, paid third-party software (like booking platforms or e-commerce fees), professional photography, and extensive copywriting from scratch. None of these are hidden costs. Most are small, and you'll know exactly what applies to your project before anything is signed.",
  },
  {
    question: "How do payments work?",
    answer:
      "Projects are split into a deposit that reserves your spot on the schedule and a final payment when the site is approved and ready to launch. Custom projects may be split into milestones. Exact terms are spelled out in your proposal.",
  },
  {
    question: "How long will my project actually take?",
    answer:
      "Launch runs about 5–7 business days, Growth about 2–3 weeks, and Custom about 4–6 weeks or more depending on scope. The biggest variable is content: projects move fastest when materials and feedback arrive on time, and you'll always know what's needed from you and when.",
  },
  {
    question: "Can I update the website myself after launch?",
    answer:
      "Custom projects can include a CMS so you can edit content directly. For Launch and Growth sites, updates are handled through a simple support arrangement, which is usually faster and safer than wrestling with an editing interface for occasional changes.",
  },
  {
    question: "What if I need more pages or features later?",
    answer:
      "Sites are built to grow. Additional pages, features, or sections can be added any time after launch, quoted plainly before the work starts. You're never locked into a rebuild to make a change.",
  },
  {
    question: "Do you only work with Austin businesses?",
    answer:
      "Austin is home and most projects are local, but the entire process works remotely. If you're elsewhere in Texas or beyond, everything from discovery to launch happens the same way.",
  },
];
