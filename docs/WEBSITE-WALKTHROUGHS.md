# Client website walkthroughs

Release implementation, September 18, 2026. Approved for publication after local preview review.

- Manuel's: original homepage layout cycling through all 11 desktop homepage photos. The video slide and duplicate mobile crops are omitted, as requested.
- TRZ: homepage → full-detail service → results.
- CleanZ: homepage → pollen removal → gallery.
- Apex: homepage → window cleaning → gallery.

The same component is used in the hero selector, portfolio listings, and case-study hero. Every tour starts at the top of its homepage. Scrolling uses unequal wheel-like bursts, reading pauses, and occasional small upward corrections, then moves to the next page. Each website loops independently.

The obstructing label/Next bar has been removed from every preview. A small keyboard-accessible pause/play icon sits in the browser chrome, outside the website view. The featured gallery swipes to the next client after 15 seconds of visible playback; manual selections restart that interval. Pausing the featured preview also pauses gallery rotation. Motion pauses outside the viewport, in background tabs, and when visitors choose Pause. System and site reduced-motion preferences disable autoplay and gallery rotation; the client selectors remain usable. Previews initialize only when visible, and all frames have a stable aspect ratio.

The presentation HTML was captured from the verified public client pages. Styles and fonts are frozen locally; photos remain served from their original public URLs. The frames run with scripts, forms, navigation, and embedded third-party content disabled. Snapshot URLs carry noindex/nofollow headers and metadata and are excluded from the sitemap. Live-site and case-study links remain outside the frames.

To refresh the presentation copies, install beautifulsoup4 in a local Python environment and run `scripts/capture-preview-pages.py`. Review all ten pages after capture. Browser verification is needed whenever source layouts change.

Initial walkthrough validation: optimized build, lint, 27-page SEO crawl, all 10 snapshot endpoints and security/indexing headers, source sanitization, and scroll-plan boundary checks passed. Browser checks covered actual page rendering, loaded imagery, automatic Apex gallery-to-homepage cycling, manual page selection, pause, Manuel's photo progression, responsive layout at 390px and 1440px, and reduced-motion photo freezing with keyboard Next still available.

September 18 gallery refinement: removed all overlay bars, moved pause/play into browser chrome, and added a 15-second client rotation with a horizontal entrance. Lint and production build passed. Homepage, work index, and all four case studies return 200 without overlay markup. Browser checks confirmed all four clients rotate, the pause toggle holds the selected client, and the 390px layout remains unobstructed, and reduced motion holds the same client for longer than a full rotation interval.
