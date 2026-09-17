# QA report — September 16, 2026

Branch: seo-organic-acquisition. Local production preview: http://127.0.0.1:3100.

## Passed

- `npm run build`: 30 generated routes including metadata endpoints; all five commercial pages and six guides statically generated, resource index static. Only contact API dynamic.
- `npm run lint`, `npx tsc --noEmit`, `git diff --check`.
- `python3 scripts/check-seo.py`: all 22 indexable pages return 200, have one H1, unique titles and descriptions, correct www canonical and OG URL, complete social metadata, JSON-LD context, crawlable robots settings, valid internal page/anchor links, and existing local media sources. Three unknown-route variants return 404 and noindex. Results saved in seo-qa-results.json.
- `node scripts/check-contact.mjs`: malformed JSON, null/scalar/array bodies, required-field errors, honeypot without delivered-lead status, successful mocked provider response, failed provider, absent key, unchanged default Gmail destination, explicit CONTACT_TO override, reply-to and HTML/header escaping. No actual email sent.
- `node scripts/check-tracking.mjs`: exclusive event classification, unrelated links ignored, email/phone/query-string values omitted from click payload, listener cleanup. No analytics transmitted by this test.
- Browser visited all 12 new pages and reviewed screenshots and content structure. All 12 checked at 390, 768, and 1440px: no horizontal overflow, one H1 each. Representative phone/tablet screenshots showed readable article navigation, cards, hero image, CTAs and breadcrumb wrapping.
- Mobile menu opens/closes, Resources navigation works, Escape returns focus to toggle, main/footer become inert while open and restore afterward. Restaurant FAQ expands and displays the answer.
- Contact form empty submit shows accessible field errors and focuses the error summary. No live inquiry was sent.
- Browser console review returned no warnings/errors during new-page review.
- Uppercase commercial URL returns 308 to lowercase. Portfolio MP4 retains one-week media cache header; case-study HTML no longer receives that custom media header.

## Performance observations

No new dependency. Existing AVIF/WebP image optimization, explicit image sizing, lazy images, next/font, reduced-motion support, deferred GA4, and viewport-gated portfolio media remain. New content stays in server-rendered pages. Locally compressed referenced first-party JS: homepage ~183.7 KiB, Austin landing page ~181.8 KiB, restaurant guide ~176.4 KiB. These are summed gzip file estimates, not browser transfer measurements or before/after improvements. Framework/shared scripts dominate; the added site-wide tracking uses one listener.

## Release limits

Not deployed. No production account or DNS settings changed. Real mailbox receipt, GA4 ingestion, Search Console indexing, Google rich-result interpretation, and field LCP/CLS/INP are not established by these local checks. The new public hello@ address must be provisioned and tested before release; form recipient remains the existing Gmail. See CONTENT-AND-LAUNCH.md. No quantitative project results or studio testimonials were fabricated.
