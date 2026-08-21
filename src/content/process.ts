export interface ProcessStep {
  name: string;
  detail: string;
}

export const processSteps: ProcessStep[] = [
  {
    name: "Discover",
    detail:
      "A conversation about your business, your customers, and what the website has to accomplish. No jargon, no forty-page questionnaire.",
  },
  {
    name: "Define",
    detail:
      "A clear sitemap, page plan, and written scope. You'll know exactly what's being built, why, and what it costs before work begins.",
  },
  {
    name: "Design",
    detail:
      "The look and feel, worked out in the open. You review real pages — not abstract mood boards — and your feedback shapes them.",
  },
  {
    name: "Build",
    detail:
      "Hand-coded, fast, and responsive. You watch progress on a live preview link as the site comes together.",
  },
  {
    name: "Launch",
    detail:
      "Domain, analytics, and search setup, plus a walkthrough of everything. You launch with a site you actually understand.",
  },
];

export const processNote =
  "One person, start to finish. You communicate directly with the person designing and building your website — at every step, on every decision.";

export const whyUs: { title: string; detail: string }[] = [
  {
    title: "Direct communication",
    detail: "You talk to the person building your site, not an account manager relaying notes.",
  },
  {
    title: "Thoughtful custom work",
    detail: "Design decisions made for your business, not pulled from a theme marketplace.",
  },
  {
    title: "Mobile-first execution",
    detail: "Most of your visitors are on a phone. The site is built for them first, not adapted later.",
  },
  {
    title: "Fast performance",
    detail: "Speed is a feature: better rankings, fewer abandoned visits, more completed inquiries.",
  },
  {
    title: "Transparent scope",
    detail: "Clear pricing and deliverables in writing before work begins. No surprise invoices.",
  },
  {
    title: "Business-focused decisions",
    detail: "Every page has a job — earn the call, the booking, or the order — and is judged against it.",
  },
  {
    title: "No agency overhead",
    detail: "No layers, no handoffs, no retainer you didn't ask for. You pay for the work, not the org chart.",
  },
];
