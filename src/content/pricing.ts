export interface HostingPlan {
  monthlyPrice: number;
  name: string;
  summary: string;
  changeAllowance: string;
  detail: string;
  includes: string[];
  support: string;
}

export function formatPrice(amount: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(amount);
}

export interface Package {
  id: "launch" | "growth" | "custom";
  name: string;
  price: string;
  priceNote: string;
  hosting: HostingPlan;
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
    hosting: {
      monthlyPrice: 50,
      name: "Hosting essentials",
      summary: "For a website that is ready to run as it is.",
      changeAllowance: "Hosting only · edits quoted separately",
      detail: "A straightforward home for your website. Content changes and ongoing design work are available when you need them, quoted separately.",
      includes: ["Managed website hosting", "SSL / HTTPS included", "Custom domain connection"],
      support: "Email support for hosting issues",
    },
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
    hosting: {
      monthlyPrice: 100,
      name: "Hosting + small updates",
      summary: "Keep the essentials current with a little help each month.",
      changeAllowance: "2 small changes per month",
      detail: "Two content requests each month, up to 15 minutes per request. Ideal for updating hours, swapping an image, or replacing a short block of text on an existing page.",
      includes: ["Everything in Hosting essentials", "2 small content changes per month", "Up to 15 minutes per change"],
      support: "Email requests, handled in scheduled batches",
    },
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
    hosting: {
      monthlyPrice: 200,
      name: "Hosting + ongoing support",
      summary: "More room for updates, refinements, and direct help.",
      changeAllowance: "2 hours of updates & support per month",
      detail: "A flexible two-hour monthly allowance for content updates, small layout refinements, troubleshooting, and website guidance. Requests are prioritized together and handled one at a time.",
      includes: ["Everything in Hosting essentials", "2 hours of updates & support per month", "Content changes & small layout refinements"],
      support: "Priority email support",
    },
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
  ["One-time build", ...packages.map((p) => p.price)] as [string, string, string, string],
  ["Monthly hosting", ...packages.map((p) => `${formatPrice(p.hosting.monthlyPrice)}/mo`)] as [string, string, string, string],
  ["Monthly changes", "Quoted separately", "2 requests, up to 15 minutes each", "2 hours of updates & support"],
  ["Support", "Hosting issues", "Scheduled content requests", "Priority email support"],
  ["Build + 12 months of hosting", ...packages.map((p) => {
    const total = Number(p.price.replace(/[^0-9]/g, "")) + p.hosting.monthlyPrice * 12;
    return `${p.id === "custom" ? "From " : ""}${formatPrice(total)}`;
  })] as [string, string, string, string],
];

export const pricingNotes = [
  "The build fee is paid once. Hosting is billed monthly from launch, per website, while Forerunner hosts your site.",
  "Domain registration and renewal, business email, paid third-party tools, photography, and extensive copywriting are separate.",
  "Monthly update allowances reset each billing month and do not roll over. Extra work is quoted for approval before it begins.",
];

export interface Faq {
  question: string;
  answer: string;
}

export const pricingFaqs: Faq[] = [
  {
    question: "Is hosting included in the one-time website price?",
    answer: "The build and hosting are separate. Launch is $500 to build plus $50/month for hosting. Growth is $1,500 to build plus $100/month for hosting and two small changes. Custom builds start at $3,000, plus $200/month for hosting and up to two hours of updates and support. Monthly billing starts when the site launches.",
  },
  {
    question: "What counts as one of Growth’s two monthly changes?",
    answer: "One small change is a focused content request on an existing page that takes up to 15 minutes, such as updating business hours, swapping an image, or replacing a short paragraph with copy you provide. Two requests are included per billing month. Send the final text or images with your request so the time goes toward updating the site. New pages, new sections, and new features are quoted separately.",
  },
  {
    question: "What can I use Custom’s two support hours for?",
    answer: "Use the allowance for content changes, small layout refinements, troubleshooting, or guidance on your website. Time spent on the request and related support counts toward the two hours. Requests are handled one at a time with priority email support. New pages, substantial redesigns, custom features, and ongoing SEO campaigns need a separate scope.",
  },
  {
    question: "What happens if I need more help, or do not use my allowance?",
    answer: "Monthly changes and support time reset each billing month and do not roll over. If a request exceeds the allowance, I explain the additional scope and price before doing the work. Launch clients can request separately quoted updates whenever they need them. Support is provided during business hours; priority support does not mean 24/7 coverage or instant completion.",
  },
  {
    question: "Am I locked into your hosting?",
    answer: "You own your website and domain. Hosting is billed month to month while the site is hosted with Forerunner. If you want to move, we can coordinate a handoff; migration work may be quoted separately. Arrange replacement hosting before ending service so your website can stay online. Billing and cancellation details are set out in your proposal.",
  },
  {
    question: "What do I need to have ready before we start?",
    answer:
      "Your logo, any photography you have, and source material for the copy, whether that is existing text, bullet points, or even voice notes. For Growth and Custom projects, part of the process is turning rough material into finished pages, so it doesn't need to be polished. If you're missing something important, we'll figure out a plan for it before work begins.",
  },
  {
    question: "What's not included in the package price?",
    answer:
      "The one-time fee covers the agreed website build. Monthly hosting is shown separately for each tier. Domain registration and renewals, business email, paid booking or e-commerce tools, professional photography, and extensive copywriting are extra. High-traffic or unusually complex hosting requirements are scoped before launch. You will know which costs apply before work begins.",
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
      "Custom builds can include a CMS when it is part of the agreed scope. If you prefer to send changes to me, Growth hosting includes two small changes each month and Custom hosting includes two hours of updates and support. Launch content changes are quoted separately.",
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
