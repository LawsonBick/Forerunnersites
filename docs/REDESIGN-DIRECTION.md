# Forerunner studio redesign

## Reference study
- [Elva](https://www.helloelva.com/): expressive oversized typography and moving brand elements. Adapt the confident scale and coordinated entrances, with quieter typography suited to a local studio.
- [Ramotion](https://www.ramotion.com/): concise positioning followed by large project imagery. Put demonstrable work near the first screen and give it more space than explanatory copy.
- [Oak Harbor Web Designs](https://oakharborwebdesigns.com/): explicit project and recurring cost presentation, plus deeper service links. Keep Forerunner's existing prices and bounded support; do not inherit the reference's claims or guarantees.

## Direction
Bright white, deep ink blue, and ultramarine. Archivo is the signature font for every H1 and H2, matching the Made by Forerunner label selected in preview feedback. Archivo body text and labels remain; IBM Plex Sans is retained for smaller display elements. Upright blue accents replace italic headlines, following the preview feedback. Real interactive work is the primary visual material. Native scrolling, directional reveals, short route entrances, and a visitor-controlled project reel. Reduced-motion support throughout.

## Information architecture
Keep every existing URL. Add /hosting and /pricing/launch, /pricing/growth, /pricing/custom for distinct service scope and practical details. Main pricing is an overview; detailed comparison remains available at /pricing#compare. Homepage links to work, package details, service pages, and the studio. Keep forms, analytics, canonical production URLs, and structured data intact.

## Release boundary
Lawson reviewed the preview and requested production publication on September 18, 2026, after approving the tighter portrait crop and Archivo H1/H2 typography.

## Preview validation — September 18, 2026
- Optimized production build, ESLint, and TypeScript passed.
- All 27 public routes passed the SEO crawler: distinct titles/descriptions, canonical/schema checks, internal links/anchors, local media, robots, and 404 behavior.
- Contact validation/provider handling and delegated conversion tracking passed the existing mocked checks. No test emails or analytics events were sent by those checks.
- Browser review at 390, 768, 1280, and 1440 pixels: homepage, pricing, package detail, case study, and inquiry layouts; no horizontal page overflow in checked layouts.
- Tested visitor-controlled project switching, keyboard slider adjustment, manual video pause/resume, scrolling-preview pause, mobile menu Escape dismissal, preselected inquiry package, validation, and optional fields.
- Tested persistent reduced-motion control across navigation: entrance animations disabled and videos paused. CSS and media logic also respect the operating system preference.
- Media uses stable aspect ratios, responsive/lazy images, video preload=none, and visibility-triggered playback. No new animation dependency. A field Core Web Vitals score is not established by local preview testing.
- Local optimized preview: http://localhost:3103. Production release authorized after preview review.
