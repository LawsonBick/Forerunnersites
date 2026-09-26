import type { Faq } from "@/content/pricing";

/** Business Automation offer copy supplied by the studio. */
export const automationPackages = [
  {
    id: "lead-catcher",
    name: "Lead Catcher",
    monthly: 149,
    setup: 500,
    tagline: "Stop losing the calls you're already getting.",
    popular: false,
    features: [
      "Missed-call text-back in seconds",
      "Instant text reply to every web lead",
      "Automatic Google review requests",
      "One inbox for every conversation",
      'Monthly "leads we caught" report',
    ],
  },
  {
    id: "booking-engine",
    name: "Booking Engine",
    monthly: 249,
    setup: 1000,
    tagline: "Turn inquiries into booked, confirmed jobs.",
    popular: true,
    features: [
      "Everything in Lead Catcher",
      "Online booking calendar on your site",
      "Appointment reminders (24-hr + 2-hr)",
      "5-touch quote follow-up sequence",
      "No-show & cancellation recovery",
    ],
  },
  {
    id: "ai-front-desk",
    name: "AI Front Desk",
    monthly: 397,
    setup: 1500,
    tagline: "A front office that never sleeps.",
    popular: false,
    features: [
      "Everything in Booking Engine",
      "After-hours AI voice receptionist",
      "Lead pipeline & CRM",
      "Past-customer reactivation campaigns",
      "Priority support",
    ],
  },
] as const;

export const automationSteps = [
  { title: "We set it all up", body: "About a week, most of it carrier approval for business texting. You approve the messages — we handle the tech." },
  { title: "It runs on autopilot", body: "Missed calls get texts, web leads get instant replies, customers get review requests. You just do the work." },
  { title: "You see the proof", body: "Every month you get a report of every lead the system caught that would've gone to a competitor." },
];

export const automationFaqs: Faq[] = [
  {
    question: "Do I need a new phone number or new phones?",
    answer: "No. We can text-enable your existing business number, or set you up with a local 512 number — your choice. Your crew keeps their phones.",
  },
  {
    question: "How fast can this be live?",
    answer: "Usually 7–10 days. The only waiting is carrier approval for business texting, which is required by law — we file it on day one.",
  },
  {
    question: "Is the texting legal / will I get flagged as spam?",
    answer: "Yes, it's fully compliant. Every number is registered with the carriers, every message includes opt-out, and we only text people who contacted you or are your customers.",
  },
  {
    question: "What if I already have a CRM or booking tool?",
    answer: "We work alongside most tools (Jobber, Housecall Pro, etc.) — the automation layer sits on top and feeds them, it doesn't replace what you like.",
  },
  {
    question: "Can I cancel?",
    answer: "Anytime, month-to-month. The setup fee covers the build-out; there's no contract locking you in.",
  },
];
