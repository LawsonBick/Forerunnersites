# Client website walkthroughs

Release implementation, September 18, 2026. Approved for publication after local preview review.

- Manuel's: original homepage layout cycling through all 11 desktop homepage photos. The video slide and duplicate mobile crops are omitted, as requested.
- TRZ: homepage → full-detail service → results.
- CleanZ: homepage → pollen removal → gallery.
- Apex: homepage → window cleaning → gallery.

The same component is used in the hero selector, portfolio listings, and case-study hero. Every tour starts at the top of its homepage. Scrolling uses unequal wheel-like bursts, reading pauses, and occasional small upward corrections, then moves to the next page. Each website loops independently.

Controls support keyboard use. Motion pauses outside the viewport, in background tabs, and when visitors choose Pause. System and site reduced-motion preferences disable autoplay; Next remains usable. Previews initialize only when visible, and all frames have a stable aspect ratio.

The presentation HTML was captured from the verified public client pages. Styles and fonts are frozen locally; photos remain served from their original public URLs. The frames run with scripts, forms, navigation, and embedded third-party content disabled. Snapshot URLs carry noindex/nofollow headers and metadata and are excluded from the sitemap. Live-site and case-study links remain outside the frames.

To refresh the presentation copies, install beautifulsoup4 in a local Python environment and run `scripts/capture-preview-pages.py`. Review all ten pages after capture. Browser verification is needed whenever source layouts change.

Validation: optimized build, lint, 27-page SEO crawl, all 10 snapshot endpoints and security/indexing headers, source sanitization, and scroll-plan boundary checks passed. Browser checks covered actual page rendering, loaded imagery, automatic Apex gallery-to-homepage cycling, manual page selection, pause, Manuel's photo progression, responsive layout at 390px and 1440px, and reduced-motion photo freezing with keyboard Next still available.
