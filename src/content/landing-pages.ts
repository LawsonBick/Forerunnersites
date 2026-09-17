import type { Faq } from "@/content/pricing";

export interface LandingPage {
  slug: string;
  title: string;
  description: string;
  eyebrow: string;
  headline: string;
  intro: string;
  decisionTitle: string;
  decisionCopy: string;
  priorities: { title: string; body: string }[];
  process: { title: string; body: string }[];
  projectSlugs: string[];
  resourceSlugs: string[];
  faqs: Faq[];
  variant: "local" | "business" | "restaurant" | "service" | "redesign";
  updated: string;
}

export const landingPages: LandingPage[] = [
  {
    slug: "austin-web-design", title: "Austin Web Design for Local Businesses",
    description: "Work directly with an Austin web designer on strategy, design, development, and launch. Explore local projects, transparent pricing, and a practical process.",
    eyebrow: "Austin, Texas · Web design", headline: "A website built around how Austin chooses your business.",
    intro: "A diner comparing menus, a homeowner checking service areas, an owner looking for a dependable partner: each arrives with a different question. I’m Lawson Bickerstaff, an Austin web designer. I plan, design, and build websites that answer those questions and make the next step clear.",
    decisionTitle: "Choose the website around the decision it needs to earn.",
    decisionCopy: "Austin businesses compete for attention long before a customer walks through the door. Your site needs to explain what you offer, establish trust, and make contact easy. A polished homepage helps, but the service pages, pricing, mobile experience, and inquiry flow have to carry their share of the work.",
    priorities: [
      { title: "Local context with a clear purpose", body: "Your real location, service area, and customer questions shape the content. Restaurant menus, service boundaries, and directions deserve useful pages. Repeating neighborhood names does not make a site more helpful." },
      { title: "Design and development together", body: "I handle the sitemap, visual direction, responsive build, and launch. You review working pages and speak directly to the person implementing your feedback, so a design decision can be tested against the actual experience." },
      { title: "Search foundations from the start", body: "Readable page structure, descriptive metadata, internal links, a sitemap, and accurate business information help search engines understand the site. Image sizing and restrained scripts support performance. These are foundations, not a promise of rankings." },
      { title: "A measurable next step", body: "Calls, reservations, quote requests, and project inquiries need different paths. We choose the important action for each page and plan tracking around completed inquiries rather than treating every button click as a customer." },
    ],
    process: [
      { title: "Define the job", body: "We identify who the website serves, what they need to know, and what the business can realistically deliver. The scope names the pages, integrations, content responsibilities, and budget." },
      { title: "Review real pages", body: "You see the visual direction in a working preview. We review the main customer journey on a phone as well as a larger screen before expanding the rest of the site." },
      { title: "Launch with a handoff", body: "Forms, redirects, metadata, analytics, and key links are checked before launch. Ownership and any ongoing support are clear, so you know who handles the next update." },
    ],
    projectSlugs: ["manuels", "trz-detail", "cleanz-atx"],
    resourceSlugs: ["how-much-does-a-website-cost-in-austin", "website-redesign-checklist"],
    faqs: [
      { question: "What kinds of Austin businesses do you work with?", answer: "The portfolio includes a restaurant, a mobile detailer, and an exterior cleaning company. The same approach fits owner-led businesses that need a clear explanation of their services and a reliable path to an inquiry. Complex applications are scoped separately." },
      { question: "What does an Austin web design project cost?", answer: "Forerunner’s published packages are Launch at $500 for one page, Growth at $1,500 for up to five core pages, and Custom starting at $3,000. The pricing page explains scope and timelines. Integrations, additional content, and ongoing support should be agreed before work starts." },
      { question: "Is SEO included?", answer: "The build includes local SEO foundations: page structure, metadata, mobile usability, and crawlable content. Ongoing content, reputation building, and competitive search work need a separate plan. No package guarantees a position in Google." },
    ], variant: "local", updated: "2026-09-16",
  },
  {
    slug: "small-business-web-design-austin", title: "Small Business Web Design Austin",
    description: "Practical website design for Austin small businesses. Choose the right scope, explain your services clearly, and make calls, bookings, and inquiries easier.",
    eyebrow: "For owner-led businesses", headline: "Make your website useful to the next customer.",
    intro: "You do not need a large website to look credible. You need the right information, real proof, and a next step that works on a phone. Forerunner Sites helps Austin small business owners turn those basics into a focused, dependable website.",
    decisionTitle: "Start with what the customer needs, then set the budget.",
    decisionCopy: "A new business introducing one service has a different job from an established company explaining several offers. Before choosing pages or features, identify the questions you answer on repeat. Those questions often become the most useful parts of the website: what is included, where you work, what it costs, and how to get started.",
    priorities: [
      { title: "Enough site for this stage", body: "A one-page launch can suit a simple offer with one primary action. Separate service pages make sense when customers have different needs or need more detail before calling. Add a page because it helps a decision, not to reach an arbitrary page count." },
      { title: "Credibility before claims", body: "Show the owner, the work, the process, and accurate contact information. Real project photos and permissioned reviews are more useful than generic promises. If you do not yet have testimonials, explain the service and show what you can actually demonstrate." },
      { title: "Mobile paths that fit real life", body: "Keep headings readable, forms short, and booking links easy to use. A visitor should not need to pinch a price list or work out which of several competing buttons starts an inquiry." },
      { title: "Visibility with a way to measure it", body: "Clear service content, consistent business details, and local relevance support Google visibility. Track accepted inquiries separately from email clicks, then ask leads how they found you. Traffic alone does not tell you whether the site is helping." },
    ],
    process: [
      { title: "Choose one primary outcome", body: "A call, quote request, booking, reservation, or sale shapes the page structure. We decide what a qualified inquiry looks like before choosing features." },
      { title: "Gather the essentials", body: "Bring your service list, real photos, contact details, business story, and any existing site. We identify missing content before it delays the build." },
      { title: "Build, test, and maintain", body: "We review the customer path, test the form and mobile layout, and agree who updates prices, hours, and content after launch." },
    ],
    projectSlugs: ["cleanz-atx", "trz-detail"],
    resourceSlugs: ["how-much-should-small-business-spend-on-website", "local-seo-service-businesses-austin"],
    faqs: [
      { question: "Can I start with a one-page website?", answer: "Yes, if one page can clearly explain the offer and support the main action. The $500 Launch package covers a one-page site with up to five primary sections. A business with several distinct services may be better served by Growth or a custom scope." },
      { question: "Will the website automatically bring in leads?", answer: "No. The site needs relevant visitors, a useful offer, and a reliable way to respond. It supports referrals, local search, and other acquisition efforts. We can make inquiries easier to complete and measure without promising a volume of leads." },
      { question: "Who owns the website?", answer: "You own the domain, code, and accounts. Ongoing support is separate from the one-time project price; the scope should explain updates, hosting, and third-party costs before work begins." },
    ], variant: "business", updated: "2026-09-16",
  },
  {
    slug: "restaurant-web-design", title: "Restaurant Web Design in Austin",
    description: "Restaurant websites built around menus, reservations, ordering, and private dining. See the Manuel’s project and plan a clearer path from visitor to guest.",
    eyebrow: "Restaurants & hospitality", headline: "Help the guest decide. Then make booking easy.",
    intro: "A restaurant website has to work between other plans: before a dinner reservation, on the way across Austin, or while someone compares private dining options. I design the experience around the menu, the occasion, and the action that brings a guest closer to your table.",
    decisionTitle: "The menu should never be the hard part.",
    decisionCopy: "Beautiful photography sets expectations. Useful details close the gap between interest and a visit. Guests need current menus, hours, directions, and clear links to reserve or order. Event planners need a different path, with enough information to decide whether to inquire about a group.",
    priorities: [
      { title: "Menus made for a phone", body: "Organize dinner, brunch, drinks, and specials as readable content. An optional downloadable menu can support printing, but the main experience should not depend on pinching a PDF. Assign someone to keep prices and availability current." },
      { title: "Reservations and ordering", body: "Keep the restaurant’s existing booking and ordering systems when they work. Give each action a clear label, test the handoff on mobile, and avoid a prominent button that sends guests to a closed or outdated service." },
      { title: "Private dining and events", body: "Separate group inquiries from table reservations. Include verified capacity, available spaces, event types, and the information your team needs to respond. Publish only details the restaurant has confirmed." },
      { title: "A location guests can find", body: "Make the address, regular hours, holiday updates, and directions easy to locate. Align the website with the restaurant’s Business Profile. Useful location content and accurate structured data help describe the business; they do not guarantee visibility." },
    ],
    process: [
      { title: "Inventory the guest journeys", body: "List menus, reservations, takeout, private dining, events, and gift cards. Choose which actions deserve top billing and which need their own pages." },
      { title: "Let the restaurant lead the design", body: "Use the actual room, food, and brand as the visual reference. Size photography for the web and keep essential information available while images load." },
      { title: "Rehearse the visit", body: "On a phone, find a dish, check hours, reserve a table, and locate the restaurant. Review ordering and event inquiry paths as separate tasks before launch." },
    ],
    projectSlugs: ["manuels"], resourceSlugs: ["restaurant-website-design-guide", "signs-restaurant-website-costing-customers"],
    faqs: [
      { question: "Can you work with our existing reservation platform?", answer: "The Manuel’s project includes a Resy reservation handoff. For another restaurant, I review its current booking or ordering provider first. Simple links and supported embeds are different scopes from a custom integration, and that distinction goes into the proposal." },
      { question: "Do you provide restaurant photography?", answer: "Photography requirements are planned with the website, but a photo shoot is not implied by the website packages. We can use your approved images and identify the shots a photographer would need to capture." },
      { question: "Can staff update menus and hours?", answer: "We agree on the update workflow before the build. If staff need to edit content themselves, content management must be included explicitly in the scope. A custom-coded site should not leave the team unsure how to change a price." },
    ], variant: "restaurant", updated: "2026-09-16",
  },
  {
    slug: "service-business-web-design", title: "Web Design for Service Businesses",
    description: "Websites for cleaners, detailers, contractors, and local service businesses. Explain services, show real work, and make quote requests and bookings easier.",
    eyebrow: "Local services & home services", headline: "From “do they do this?” to a useful inquiry.",
    intro: "A homeowner needs to know whether you handle the job, serve their address, and can be trusted on the property. A detailing customer wants to understand the package before booking. Your website should answer those questions before asking for a name and phone number.",
    decisionTitle: "Build the quote path around the work you actually want.",
    decisionCopy: "Window cleaners, landscapers, contractors, detailers, and other service companies do not all need the same form. A recurring cleaning inquiry may need a service and ZIP code. A larger project may need photos, access details, and a consultation. Ask enough to qualify the job without turning the first step into paperwork.",
    priorities: [
      { title: "Services people can understand", body: "Explain what is included, what is excluded, and when a site visit is required. Separate substantially different services so a customer can recognize the right option without interpreting industry shorthand." },
      { title: "Proof close to the decision", body: "Place real job photos, approved reviews, and verifiable insurance or certification details near the relevant service. Before-and-after images should describe the actual work shown. Never turn a design example into an invented client result." },
      { title: "Honest coverage and pricing", body: "List areas you genuinely serve and explain travel limits. Show fixed prices, starting prices, or the factors that determine a quote as appropriate. Avoid near-identical city pages with no additional information for the customer." },
      { title: "Calls, quotes, and bookings", body: "Use a primary action that matches how the business operates. A call link is useful only if someone can answer. A form needs working delivery, a confirmation, and an owner responsible for following up." },
    ],
    process: [
      { title: "Map the good-fit job", body: "Identify services, job size, coverage, scheduling constraints, and the questions you need answered before quoting." },
      { title: "Build trust into the page", body: "Connect service details to real work and clear pricing expectations. Keep the request form accessible from the decision points." },
      { title: "Test the whole inquiry", body: "Check mobile entry, validation, delivery, and the response message. Track successful inquiries separately from clicks and review whether leads match the jobs you want." },
    ],
    projectSlugs: ["cleanz-atx", "trz-detail"], resourceSlugs: ["local-seo-service-businesses-austin", "how-much-should-small-business-spend-on-website"],
    faqs: [
      { question: "Do you build contractor and home service websites?", answer: "Yes. The scope is tailored to the services, coverage, proof, and inquiry process. CleanZ ATX is the relevant exterior-cleaning example; TRZ shows a different approach for mobile detailing. These examples demonstrate website features, not promised lead totals." },
      { question: "Should every neighborhood get a page?", answer: "Only when it offers distinct, useful information about real service delivery. A list of genuine service areas may be enough. Copying one page and changing the city name creates little value for customers." },
      { question: "Can a form connect to my booking software?", answer: "We review the software’s supported options before committing. A booking link, an embed, and a custom API connection involve different work. The proposal should name the integration and any ongoing provider fees." },
    ], variant: "service", updated: "2026-09-16",
  },
  {
    slug: "website-redesign-austin", title: "Website Redesign Austin",
    description: "Plan an Austin business website redesign around mobile usability, clearer content, performance, and a careful SEO migration. Start with a practical review.",
    eyebrow: "A better next version", headline: "Keep what earns its place. Fix what gets in the way.",
    intro: "An older website is not automatically a bad website. A redesign is worth considering when the site no longer represents the business or makes simple tasks difficult. I help Austin owners identify those problems and plan a rebuild with the content, links, and working tools accounted for.",
    decisionTitle: "Signs your business website needs a redesign.",
    decisionCopy: "Start with evidence, not a dislike of the color palette. Try the tasks customers come to complete. Ask the person answering inquiries which questions the website should have answered. Review search and analytics data if you have it; if you do not, a short baseline measurement period can prevent guesswork.",
    priorities: [
      { title: "Customers cannot finish the task", body: "Menus are hard to read, a form is awkward on a phone, or the main action is buried. Record the exact point where the task becomes confusing. Some problems need a targeted fix instead of a full rebuild." },
      { title: "The content describes the old business", body: "Outdated services, old prices, or a previous visual identity can undermine trust. Inventory each page and decide what to keep, rewrite, combine, or remove before beginning the design." },
      { title: "Performance and structure hold it back", body: "Oversized media, unnecessary scripts, or confusing navigation can make the site difficult to use. Review actual loading behavior and content structure before choosing a new framework or replacing working integrations." },
      { title: "Routine updates are too difficult", body: "If changing hours or adding a service requires work nobody can maintain, the update workflow needs attention. Define who edits what and how often. Content management is a requirement to scope, not a feature to assume." },
    ],
    process: [
      { title: "Audit and preserve", body: "Inventory URLs, search landing pages, content, tracking, forms, and integrations. Record the current state and agree on what success will mean." },
      { title: "Rebuild the important journeys", body: "Work through the sitemap, content, and responsive design in a preview. Match existing URLs where useful and map changed URLs to the closest relevant replacements." },
      { title: "Migrate and monitor", body: "Test redirects, canonicals, sitemap, indexing rules, analytics, and form delivery. After launch, review Search Console and inquiries for problems. Search performance can fluctuate during a migration." },
    ],
    projectSlugs: ["manuels", "cleanz-atx"], resourceSlugs: ["website-redesign-checklist", "how-much-does-a-website-cost-in-austin"],
    faqs: [
      { question: "Can a redesign hurt existing search traffic?", answer: "It can, especially if useful content disappears or established URLs break. A migration plan preserves valuable pages, maps necessary redirects, and checks indexing and tracking. No migration can promise unchanged rankings." },
      { question: "Do I have to change platforms?", answer: "Not necessarily. We first identify the problem and your editing needs. A focused improvement may be more appropriate than a rebuild. If a platform change is proposed, its benefits and maintenance implications should be explicit." },
      { question: "How long does a redesign take?", answer: "Forerunner publishes 2–3 weeks for its five-page Growth scope and 4–6 or more weeks for Custom work. A redesign’s actual schedule depends on content readiness, integration complexity, feedback, and migration requirements." },
    ], variant: "redesign", updated: "2026-09-16",
  },
];

export function getLandingPage(slug: string) { return landingPages.find((page) => page.slug === slug); }
