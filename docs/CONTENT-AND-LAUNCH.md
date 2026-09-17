# Content and launch handoff

## Where to publish

- Commercial pages: `src/content/landing-pages.ts`. Five explicit, authored entries; static routes in `src/app/[service]/page.tsx`. Unknown slugs return 404.
- Guides: `src/content/resources.ts`. Add a unique slug, title/SEO title, description, category, author-approved content, honest publication/modification dates, section IDs, related guide slugs, and relevant service slug. Index, static generation, metadata, Article schema, table of contents and sitemap derive from this data. Check facts and links before publishing. Keep the price guide in sync with `src/content/pricing.ts`.
- Case context: `src/content/project-context.ts`; original portfolio remains in `src/content/projects.ts`.
- Testimonials: `src/content/social-proof.ts`. Empty intentionally. Add only approved quotes with name, company, project, approval date, and source. `TestimonialCard` can be placed on any server-rendered page. No fake placeholders or review markup.
- Metrics: `projectResults` is empty. `ProjectResults` renders only approved entries with a reporting period, source, verification date, and methodology. Include the baseline period for comparisons and limitations on attribution. Private source URLs should not be published.
- Do not fill a content calendar with near-duplicate location pages. Start with actual customer questions, genuine projects, and distinct intent.

## Public email and delivery

Public references use the existing **lawbick@gmail.com** until the branded mailbox is ready. After provisioning and testing **hello@forerunnersites.com**, set `NEXT_PUBLIC_CONTACT_EMAIL=hello@forerunnersites.com` in production and redeploy. This updates all public references through `site.email`. Form delivery remains **lawbick@gmail.com**, resolved only in the server route, unless `CONTACT_TO` explicitly overrides it. `RESEND_API_KEY`, existing `CONTACT_FROM`, sender behavior, and reply-to are preserved. Do not move CONTACT_TO merely because the public email changed.

Before production release, provision hello@ as an inbox or forwarding alias with an email provider. Add the provider's exact MX records; use its SPF/DKIM records and a deliberately configured DMARC policy. Do not invent DNS values or overwrite existing records blindly. Test receipt from an unrelated external inbox and replying as hello@. Domain authentication for Resend sending is distinct from receiving mail: a verified sending domain alone does not create an inbox.

After mailbox verification, run an approved real form inquiry and confirm delivery to the existing destination and reply-to behavior. Code tests cover a mocked provider, not live deliverability. Phone, scheduling URL and GBP remain unset until supplied.

## Analytics events

Existing GA4 ID is preserved. One delegated click listener is installed in the root layout and cleaned up on unmount. No form contents, email address, phone number, URL query string, or link text are included in click-event parameters.

| Event | Trigger | Parameters |
| --- | --- | --- |
| generate_lead | API confirms provider acceptance, not validation failure or honeypot | method=contact_form, selected package |
| email_click | mailto link | page_path, destination=email, placement |
| phone_click | tel link, if phone configured | page_path, destination=phone, placement |
| pricing_cta_click | internal /contact link on /pricing or with package parameter | page_path, destination=/contact, placement |
| case_study_cta_click | remaining /contact links from /work/* | same |
| primary_cta_click | remaining internal /contact links | same |

Classification is exclusive: one click emits at most one of these custom events. GA4 enhanced-measurement click events may separately describe outbound links; do not add another custom tag firing these names in GTM. Mark generate_lead as a key event; clicks are intent, not completed leads. Provider acceptance is not proof of final inbox delivery. Verify GA4 DebugView/Realtime in production and reconcile with the lead log. This task does not change GA4 account settings.

## Release checks outside the code

1. Confirm mailbox delivery before releasing public hello@ links.
2. Confirm production RESEND_API_KEY and current CONTACT_FROM are valid; do not print credentials.
3. Preview all new pages and confirm author approval and factual details. Article dates reflect this draft's creation; use the actual public release date if publication happens later.
4. Deploy the reviewed branch through the existing Vercel project. See DEPLOYMENT.md for release status.
5. Confirm www is still the primary domain, apex and HTTP redirect properly, and Vercel alias behavior matches production configuration.
6. Verify Search Console ownership and submit https://www.forerunnersites.com/sitemap.xml. Monitor indexing of the 12 new URLs. Sitemap inclusion is not guaranteed indexing.
7. Use an eligible Google Business Profile only if the studio satisfies Google's real-world contact requirements. No invented storefront/address. Add its URL to config after verification.
8. Request real testimonials and review permission. Never incentivize or filter for positive reviews.
9. Monitor field Core Web Vitals, qualified inquiries and search landing pages after release. Local checks are not field-performance measurements.
