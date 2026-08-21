export interface ProcessStep {
  name: string;
  detail: string;
}

export const processSteps: ProcessStep[] = [
  {
    name: "Discover",
    detail:
      "We talk about your business, your customers, and what the site has to accomplish. No jargon, no forty-page questionnaire.",
  },
  {
    name: "Define",
    detail:
      "I write up a sitemap, a page plan, and a scope. You will know exactly what I am building, why, and what it costs before I start.",
  },
  {
    name: "Design",
    detail:
      "I work the look and feel out in the open. You review real pages, not abstract mood boards, and your feedback changes them.",
  },
  {
    name: "Build",
    detail:
      "I hand-code every page. You get a live preview link in the first week and watch the site come together.",
  },
  {
    name: "Launch",
    detail:
      "I handle the domain, analytics, and search setup, then walk you through all of it. You launch understanding your own site.",
  },
];

export const processNote =
  "I'm Lawson, and I handle all five steps myself. You have my email and my phone from the first conversation to launch day — no account manager relaying your notes to someone you have never met.";

export const whyUs: { title: string; detail: string }[] = [
  {
    title: "You work with me",
    detail:
      "Lawson, start to finish. Ask a question and it goes to the person who wrote the code, not a middleman.",
  },
  {
    title: "Built for you specifically",
    detail:
      "I design around your customers and your goals. Nothing here comes off a theme marketplace shelf.",
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
    detail:
      "You get pricing and deliverables in writing before I start. I have never sent a surprise invoice and I do not intend to.",
  },
  {
    title: "Business-focused decisions",
    detail: "Every page has a job — earn the call, the booking, or the order — and is judged against it.",
  },
  {
    title: "No agency overhead",
    detail:
      "There is no org chart to pay for here. No layers, no hand-offs, no retainer you did not ask for.",
  },
];
