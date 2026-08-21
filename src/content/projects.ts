/**
 * Case-study content for the three portfolio projects.
 *
 * Screenshots live in /public/work/ and were captured from the live
 * sites. To refresh them, re-capture at these sizes and overwrite:
 *   {slug}-desktop.jpg  2600×1625  (1600×1000 viewport @2x)
 *   {slug}-tall.jpg     1800×2700  (1600×2400 viewport @1.5x)
 *   {slug}-mobile.jpg    860×1864  (430×932 viewport @2x)
 *
 * `palette` drives each project's art direction. Values are real brand
 * colors sampled from the live sites, so every case study reads in the
 * client's own voice rather than the agency's.
 */

export interface Project {
  slug: string;
  name: string;
  url: string;
  displayUrl: string;
  industry: string;
  location: string;
  tagline: string;
  /** One-line challenge/solution pair used on the homepage and work index. */
  shortChallenge: string;
  shortSolution: string;
  overview: string;
  challenge: string;
  approach: string;
  designDirection: string;
  functionality: { title: string; detail: string }[];
  mobile: string;
  outcome: string;
  services: string[];
  palette: {
    /** Backdrop panel behind screenshots. */
    panel: string;
    /** Text color that passes contrast on the panel. */
    panelFg: string;
    /** Brand accent, used for small marks on the panel. */
    accent: string;
  };
  images: {
    desktop: { src: string; alt: string };
    tall: { src: string; alt: string };
    mobile: { src: string; alt: string };
  };
}

export const projects: Project[] = [
  {
    slug: "manuels",
    name: "Manuel's",
    url: "https://www.manuels.com/",
    displayUrl: "manuels.com",
    industry: "Restaurant & hospitality",
    location: "Austin, TX",
    tagline: "An Austin dining institution, organized for the way people actually use a restaurant website.",
    shortChallenge:
      "Four decades of interior Mexican cooking and a content-heavy site to match: menus, brunch, happy hour, private dining, reservations, and online ordering.",
    shortSolution:
      "A structured, mobile-first site that puts menus and reservations one tap away and lets the food carry the design.",
    overview:
      "Manuel's has served interior Mexican cuisine in Austin since 1984 — scratch-made tortillas, regional recipes, and a dining room people book for birthdays and business dinners alike. The website is the restaurant's digital front door, and it has to do a lot: present multiple menus, take reservations, route online orders, book private events, and hold up to the standard the kitchen sets every night.",
    challenge:
      "Restaurant websites fail in a predictable way: too much content, no hierarchy. Manuel's had every kind of content a restaurant can have — dinner, brunch, and happy hour menus with dietary options, a private dining program, gift cards, and a rewards club — and all of it mattered to someone. The risk was a site where everything shouts and nothing gets found, especially on a phone, where most diners arrive minutes before deciding where to eat.",
    approach:
      "The build started with an inventory of the jobs visitors show up with: see the menu, book a table, order to-go, plan an event, find hours and directions. Every page and navigation decision was made against that list. High-intent actions — reserve, order, menus — stay one tap away from anywhere on the site, while deeper content like private dining and the rewards program gets its own well-marked home instead of crowding the main path.",
    designDirection:
      "The design borrows its palette from the room itself: deep espresso tones, warm neutrals, and the red of the Manuel's neon sign. Typography stays quiet and confident so the photography — plated dishes, the patio under the oaks, cocktails at the bar — does the persuading. It reads as the restaurant, not as a template with the restaurant's logo on it.",
    functionality: [
      {
        title: "Menu system with dietary filtering",
        detail:
          "Dinner, brunch, and happy hour menus that are readable on a phone, with gluten-free and vegetarian options easy to isolate.",
      },
      {
        title: "Reservations via Resy",
        detail:
          "Table booking hands off cleanly to Resy, so guests finish in a flow they already trust.",
      },
      {
        title: "Online ordering",
        detail: "Direct to-go ordering, kept one tap from the homepage.",
      },
      {
        title: "Private dining & events",
        detail:
          "A dedicated section for party planning and private dining inquiries, with the details event planners actually need.",
      },
      {
        title: "Gift cards & rewards",
        detail:
          "Supporting programs — gift cards, the frequent-diner club, catering partners — organized without cluttering the main navigation.",
      },
    ],
    mobile:
      "Most visitors are standing somewhere deciding where to eat. On mobile, the site leads with the essentials — menus, reservations, hours, directions — each reachable in one tap, with menus set at a size you can read without pinching.",
    outcome:
      "Manuel's now has an online presence that matches the standard of the dining room: a clear structure search engines can read, menus and reservations that work as well on a phone as on a laptop, and a design that lets forty years of cooking speak for itself.",
    services: [
      "Site architecture",
      "UX & content structure",
      "Custom design",
      "Responsive development",
      "Local SEO foundations",
      "Performance optimization",
    ],
    palette: {
      panel: "#221410",
      panelFg: "#f6efe7",
      accent: "#e04b34",
    },
    images: {
      desktop: {
        src: "/work/manuels-desktop.jpg",
        alt: "Manuel's homepage on desktop: the Manuel's wordmark over a plated shrimp dish on a dark, warm background",
      },
      tall: {
        src: "/work/manuels-tall.jpg",
        alt: "A long scroll of the Manuel's website showing the hero, menu highlights, and dining room photography",
      },
      mobile: {
        src: "/work/manuels-mobile.jpg",
        alt: "Manuel's website on a phone, with menus and reservations one tap away",
      },
    },
  },
  {
    slug: "trz-detail",
    name: "TRZ Shine & Detail",
    url: "https://trzdetail.com/",
    displayUrl: "trzdetail.com",
    industry: "Automotive detailing",
    location: "West Austin, TX",
    tagline: "A premium mobile detailer whose website finally works as hard as he does.",
    shortChallenge:
      "An owner-operated detailer trusted with Rolls-Royces and Bentleys — with a word-of-mouth reputation that had outrun his web presence.",
    shortSolution:
      "A warm, confident site with transparent pricing and a booking path short enough to finish from a driveway.",
    overview:
      "TRZ Shine & Detail is a mobile detailing service covering Westlake, Barton Creek, Lakeway, and the rest of West Austin. The owner, Gage, details every vehicle himself — including as the official detailer for Barton Creek Country Club — and his clients trust him with cars most people won't park near. The website's job was to extend that trust to people who haven't met him yet.",
    challenge:
      "Detailing is a low-trust industry: pricing is opaque, quality varies wildly, and the person who answers the phone often isn't the person holding the buffer. TRZ's actual business was the opposite of all that — owner-operated, insured, meticulous — but the web presence didn't say so. The site needed to signal 'trusted with a Rolls-Royce' while staying approachable for someone booking a daily driver.",
    approach:
      "Lead with proof, then remove friction. The site puts real client vehicles and before-and-after results ahead of any claims, publishes straightforward pricing for every service tier, and keeps the path from 'first visit' to 'booked detail' as short as possible. Membership plans give regulars a reason to stay on a schedule, and an FAQ answers the trust questions — insurance, timing, process — before they're asked.",
    designDirection:
      "The direction comes straight from the TRZ badge: warm cream, deep espresso brown, and burnt orange, with a script accent that keeps the brand human. It's deliberately warmer than the black-and-chrome look most detailers reach for — premium without being cold, and unmistakably TRZ.",
    functionality: [
      {
        title: "Transparent service pricing",
        detail:
          "Exterior, interior, full detail, and ceramic coating — each with published price ranges and what's included, so there are no surprises.",
      },
      {
        title: "Before-and-after gallery",
        detail:
          "An interactive slider gallery of real client vehicles, the strongest sales tool a detailer has.",
      },
      {
        title: "Membership plans",
        detail:
          "Monthly, bi-monthly, and quarterly maintenance plans that reward repeat clients and smooth the schedule.",
      },
      {
        title: "Direct booking",
        detail:
          "A short booking flow with text confirmation — no account creation, no phone tag.",
      },
      {
        title: "Trust signals throughout",
        detail:
          "Insurance details, Google reviews, and the Barton Creek Country Club relationship, placed where hesitant visitors will see them.",
      },
    ],
    mobile:
      "TRZ's clients book from a driveway, a car wash line, or the country club parking lot. The mobile experience keeps 'Book a Detail' persistent, makes call and text one tap, and keeps pricing tables legible on a small screen.",
    outcome:
      "TRZ now has a web presence that matches the standard of the work: clear services, honest pricing, real results, and a booking path with nothing in the way. The site does the explaining so Gage can keep detailing.",
    services: [
      "Brand-led design",
      "UX & content structure",
      "Responsive development",
      "Pricing presentation",
      "Local SEO foundations",
      "Performance optimization",
    ],
    palette: {
      panel: "#f0e4ce",
      panelFg: "#33241b",
      accent: "#d7772b",
    },
    images: {
      desktop: {
        src: "/work/trz-desktop.jpg",
        alt: "TRZ Shine & Detail homepage on desktop: 'Your car deserves the best' headline beside a detailed black Rolls-Royce",
      },
      tall: {
        src: "/work/trz-tall.jpg",
        alt: "A long scroll of the TRZ Shine & Detail website showing the hero, owner introduction, and services",
      },
      mobile: {
        src: "/work/trz-mobile.jpg",
        alt: "TRZ Shine & Detail website on a phone with a persistent booking button",
      },
    },
  },
  {
    slug: "cleanz-atx",
    name: "CleanZ ATX",
    url: "https://www.cleanzatx.com/",
    displayUrl: "cleanzatx.com",
    industry: "Exterior cleaning services",
    location: "Lakeway & West Austin, TX",
    tagline: "Trust, pricing, and scheduling in one place for a Lake Travis cleaning company.",
    shortChallenge:
      "In-home services live or die on trust. CleanZ needed proof, pricing, and scheduling in one place — without making homeowners pick up the phone.",
    shortSolution:
      "A conversion-focused site with itemized pricing, real reviews, and a fast quote flow built for phones.",
    overview:
      "CleanZ ATX handles exterior cleaning — window washing, pressure and soft washing, gutters, roofs, and solar panels — for homeowners across Lakeway, Bee Cave, Steiner Ranch, and the Lake Travis area. It's a young, owner-led company competing on reliability and transparency in neighborhoods where word travels fast.",
    challenge:
      "Hiring someone to work on your home is a trust decision, and the traditional quote process — call, wait, play phone tag, get a number — loses customers at every step. CleanZ needed a site that could establish credibility fast, answer the price question honestly, and turn a visit into a scheduled job without a single phone call.",
    approach:
      "Make the quote the centerpiece. The site is built around a fast quote flow that collects property details in about a minute, backed by itemized per-window and per-square-foot pricing published right on the site. Around that core: real Google reviews with neighborhood names, before-and-after results, insurance details, and service pages structured for the local searches homeowners actually type.",
    designDirection:
      "CleanZ's brand is deep navy and clear cyan — clean, crisp, and professional, which is exactly the impression an exterior cleaning company needs to make. The design keeps that palette disciplined, uses real job photos from the neighborhoods CleanZ serves, and avoids the clip-art feel that plagues home-services websites.",
    functionality: [
      {
        title: "Fast quote flow",
        detail:
          "A short, phone-friendly form that captures property details and service needs in about a minute — no phone tag required.",
      },
      {
        title: "Itemized public pricing",
        detail:
          "Per-window and per-square-foot rates published on the site, which answers the biggest objection before it's raised.",
      },
      {
        title: "Recurring service plans",
        detail:
          "Monthly, quarterly, and bi-annual plan enrollment for homeowners who want it handled automatically.",
      },
      {
        title: "Service & area pages",
        detail:
          "Dedicated pages for each service and community, matching how people search: 'window cleaning Lakeway', not 'exterior solutions'.",
      },
      {
        title: "Proof, everywhere it counts",
        detail:
          "Google review aggregation, before-and-after galleries, guarantee and insurance details placed along the decision path.",
      },
    ],
    mobile:
      "Homeowners find CleanZ from a phone, often standing in front of the dirty windows in question. The mobile experience is thumb-first: quote flow, call button, and pricing all designed to work one-handed.",
    outcome:
      "CleanZ has a site that carries the trust burden for an in-home service: honest pricing in the open, reviews from recognizable neighborhoods, and a quote flow that turns interest into scheduled work. It's a foundation built for local lead generation, not just an online brochure.",
    services: [
      "UX & content structure",
      "Custom design",
      "Responsive development",
      "Conversion-path design",
      "Local SEO foundations",
      "Analytics & conversion tracking",
    ],
    palette: {
      panel: "#0c1826",
      panelFg: "#eaf2f8",
      accent: "#35a7e0",
    },
    images: {
      desktop: {
        src: "/work/cleanz-desktop.jpg",
        alt: "CleanZ ATX homepage on desktop: 'Streak-Free Windows. Every Time.' headline beside a photo of the crew cleaning a modern home",
      },
      tall: {
        src: "/work/cleanz-tall.jpg",
        alt: "A long scroll of the CleanZ ATX website showing the hero, services, and review sections",
      },
      mobile: {
        src: "/work/cleanz-mobile.jpg",
        alt: "CleanZ ATX website on a phone with the quote flow front and center",
      },
    },
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function relatedProjects(slug: string): Project[] {
  return projects.filter((p) => p.slug !== slug);
}
