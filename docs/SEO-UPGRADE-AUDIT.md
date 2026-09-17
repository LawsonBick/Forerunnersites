# Organic acquisition upgrade — audit, September 16, 2026

Baseline: aa38d17, clean main matching origin/main, /Users/lawson/Forerunner Sites/sitepilot. The Desktop duplicate is iCloud-offloaded and unreadable. This readable repository identifies the live production domain and GitHub remote.

## Architecture and page inventory

Next.js 16.3.1 App Router, React 19, TypeScript, Tailwind 4. Shared paper/ink/cobalt tokens, Archivo/Newsreader via next/font, Container/SectionHeading/ButtonLink/CtaBand/BrowserFrame components. Server-rendered pages; small client islands for menu, contact form, reveal observer and portfolio motion. No new dependency needed.

Reviewed routes: / (brand and portfolio), /services (nine services), /pricing (three packages and FAQ), /work (portfolio), /work/manuels, /work/trz-detail, /work/cleanz-atx (structured narratives and screenshots), /about (owner and approach), /contact (inquiry form), /privacy, and not-found. No acquisition landing pages or resources exist.

## Findings and decisions

- Existing centralized metadata, production www canonicals, sitemap, preview noindex, robots, lowercase redirect, optimized images and self-hosted fonts are worth preserving.
- JsonLd adds @context only to arrays. Single-object WebPage nodes lack their JSON-LD context: fix centrally.
- The public email doubles as Resend recipient. Separate server-only CONTACT_TO (default existing Gmail) before changing public email. New mailbox delivery needs external setup and owner verification.
- Contact handler assumes parsed JSON is an object; null causes a server error. Validate JSON shape before field access.
- GA4 is configured; generate_lead fires on accepted form responses. Preserve it. Add one delegated click listener with mutually exclusive event classification, no inquiry text/email/phone payloads. Honeypot responses must not count as delivered leads.
- Cases have overview/challenge/approach/design/functionality/mobile/outcome, but no dedicated development/SEO discussion, service-page links, or source-backed metric fields. Add these using existing project facts only. Previous-site evidence is unavailable: do not invent before metrics or limitations.
- Add five distinct intent pages, six authored resources, and one resource index; connect via service directory, case studies, homepage and footer. Resources in primary nav; specialist pages live under service discovery, not five extra top-level links.
- Existing titles are unique. Homepage retains broad brand introduction; /austin-web-design becomes detailed local buying guide. Avoid cloning home copy.
- Existing images have dimensions/alt/sizes, AVIF/WebP optimization. Largest JPG is ~1.3 MB source; delivery is resized by next/image. Video is ~1.2 MB and preload=none, plays only in view. Preserve original assets and tasteful motion.
- Cache rule /work/:file* also covers case-study documents; scope the media cache rule to actual media filenames.
- Privacy copy says information is never shared with third parties, despite Resend, and denies tracking cookies despite GA4. Correct these factual descriptions without claiming legal review.
- No verified studio testimonials or quantitative client results exist. Add typed, unused infrastructure requiring attribution/source and measurement periods.
- LocalBusiness has city-level address only; do not invent a street, phone, GBP, reviews, or certifications. FAQs remain visible useful content; do not promise FAQ rich results.

## Verification plan

Build/lint/types; crawl all existing and new production-build pages for status, unique title/description/canonical, OG/Twitter, one H1, valid JSON-LD context, sitemap inclusion, internal links/anchors and assets. Exercise invalid form payloads and delivery via mocked Resend, without sending a real inquiry. Browser review all 12 new routes, representative mobile/tablet/desktop views, navigation, FAQs, form validation, click events and console. Field CWV and real inbox receipt require live data/owner verification; do not report lab checks as field results.
