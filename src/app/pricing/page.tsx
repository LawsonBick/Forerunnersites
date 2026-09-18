import type { Metadata } from "next";
import { site } from "@/config/site";
import { comparison, packages, pricingFaqs, pricingNotes, formatPrice } from "@/content/pricing";
import { Container } from "@/components/container";
import { SectionHeading, Eyebrow } from "@/components/section-heading";
import { ButtonLink, ArrowLink } from "@/components/button";
import { PricingCards } from "@/components/pricing-cards";
import { FaqList } from "@/components/faq-list";
import { JsonLd } from "@/components/json-ld";
import { buildMetadata } from "@/lib/seo";
import { faqSchema, webPageSchema } from "@/lib/schema";

const page = {
  title: "Website Pricing, Hosting & Support",
  description: "Compare website builds from $500 and monthly hosting at $50, $100, or $200. Clear packages, included updates, and support from your Austin web designer.",
  path: "/pricing",
};
export const metadata: Metadata = buildMetadata(page);

export default function PricingPage() {
  return (
    <>
      <section>
        <Container className="pt-12 pb-16 sm:pt-16 lg:pt-20 lg:pb-24">
          <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:items-end">
            <SectionHeading as="h1" entrance="rise" eyebrow="Pricing, made clear" title={<>A considered build.<br /><em>A clear monthly plan.</em></>} lede="Pay once for the website. Then choose the right level of hosting and help to keep it working for your business." />
            <div className="rise border-l-2 border-accent pl-6 lg:mb-1">
              <p className="text-sm leading-relaxed text-ink-soft">Every package shows both costs upfront. Hosting starts at launch, and you work directly with the person who built your site.</p>
              <a href="#hosting" className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline">See what happens after launch <span aria-hidden="true">↓</span></a>
            </div>
          </div>

          <div className="mt-10 grid gap-5 border-y border-line py-6 sm:grid-cols-2 sm:gap-10">
            <div className="flex gap-4"><span className="pt-1 text-xs font-semibold text-accent">01</span><div><h2 className="font-display text-xl">The build is a one-time project.</h2><p className="mt-1 text-sm leading-relaxed text-ink-soft">Strategy, design, development, and a clear scope.</p></div></div>
            <div className="flex gap-4"><span className="pt-1 text-xs font-semibold text-accent">02</span><div><h2 className="font-display text-xl">Hosting is the monthly part.</h2><p className="mt-1 text-sm leading-relaxed text-ink-soft">From a place to run your site to ongoing help with changes.</p></div></div>
          </div>

          <h2 className="sr-only">Choose your website and hosting package</h2>
          <div className="mt-12"><PricingCards detailed /></div>
          <ul className="mt-7 max-w-4xl space-y-2">
            {pricingNotes.map((note) => <li key={note} className="flex gap-2.5 text-xs leading-relaxed text-ink-soft"><span aria-hidden="true" className="mt-[6px] h-[4px] w-[4px] shrink-0 bg-ink-faint" />{note}</li>)}
          </ul>
        </Container>
      </section>

      <section id="hosting" className="scroll-mt-20 bg-ink text-paper" aria-labelledby="hosting-heading">
        <Container className="py-16 lg:py-24">
          <SectionHeading dark eyebrow="After launch" title={<span id="hosting-heading">The right amount of help.<br /><em>Room to grow when you need it.</em></span>} lede="Some sites rarely change. Others need a steady stream of updates. Your monthly plan makes that difference clear." />
          <div className="mt-12 grid gap-10 lg:grid-cols-3">
            {packages.map((pkg) => <article key={pkg.id} className="border-t border-line-dark pt-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-paper-soft">{pkg.name} / After launch</p>
              <h3 className="mt-4 font-display text-2xl">{pkg.hosting.name}</h3>
              <p className="mt-4 flex items-baseline gap-2"><span className="font-display text-4xl">{formatPrice(pkg.hosting.monthlyPrice)}</span><span className="text-sm text-paper-soft">/ month</span></p>
              <p className="mt-5 text-sm leading-relaxed text-paper-soft lg:min-h-[4.5rem]">{pkg.hosting.summary}</p>
              <ul className="mt-5 space-y-3">{pkg.hosting.includes.map((item) => <li key={item} className="flex gap-3 text-sm leading-relaxed"><span aria-hidden="true" className="text-paper-soft">✓</span>{item}</li>)}</ul>
              <p className="mt-5 border-t border-line-dark pt-5 text-sm leading-relaxed text-paper-soft">{pkg.hosting.detail}</p>
              <p className="mt-4 text-xs font-medium text-paper">{pkg.hosting.support}</p>
            </article>)}
          </div>
          <div className="mt-12 grid gap-3 border-t border-line-dark pt-6 sm:grid-cols-[1fr_2fr] sm:gap-10">
            <h3 className="font-display text-xl">A bigger idea? Let&apos;s scope it.</h3>
            <p className="text-sm leading-relaxed text-paper-soft">New pages, new features, major redesigns, and ongoing SEO campaigns are separate projects. I&apos;ll confirm the scope and cost before starting anything beyond your plan.</p>
          </div>
        </Container>
      </section>

      <section className="border-b border-line bg-wash">
        <Container className="grid gap-10 py-14 lg:grid-cols-[1fr_2fr]">
          <div><Eyebrow>How changes work</Eyebrow><h2 className="mt-4 font-display text-3xl">Send the details.<br />I&apos;ll handle the update.</h2></div>
          <ol className="grid gap-8 sm:grid-cols-3">
            <li><p className="text-xs font-semibold text-accent">01 / Send</p><h3 className="mt-3 font-medium">One clear email</h3><p className="mt-2 text-sm leading-relaxed text-ink-soft">Include the page, what needs changing, and your final text or images.</p></li>
            <li><p className="text-xs font-semibold text-accent">02 / Confirm</p><h3 className="mt-3 font-medium">Scope before work</h3><p className="mt-2 text-sm leading-relaxed text-ink-soft">I&apos;ll confirm the request fits your allowance and let you know the timing.</p></li>
            <li><p className="text-xs font-semibold text-accent">03 / Update</p><h3 className="mt-3 font-medium">A checked, live change</h3><p className="mt-2 text-sm leading-relaxed text-ink-soft">I&apos;ll make the change, check the affected page, and let you know it&apos;s ready.</p></li>
          </ol>
        </Container>
      </section>

      <section id="compare" className="scroll-mt-24" aria-labelledby="compare-heading">
        <Container className="py-16 lg:py-24">
          <SectionHeading eyebrow="The complete picture" title={<span id="compare-heading">Compare the build. Plan the running cost.</span>} />
          <p className="mt-5 text-xs text-ink-soft sm:hidden">Scroll the table sideways to compare all three packages.</p>
          <div className="mt-8 overflow-x-auto rounded-[6px] border border-line" tabIndex={0} role="region" aria-label="Scrollable package comparison">
            <table className="w-full min-w-[700px] border-collapse text-sm">
              <caption className="sr-only">Website builds, monthly hosting, and example first-year costs</caption>
              <thead><tr className="border-b-2 border-ink bg-wash text-left">
                <th scope="col" className="px-5 py-5 font-semibold">What&apos;s included</th>
                {packages.map((pkg) => <th key={pkg.id} scope="col" className="px-5 py-5 font-semibold">{pkg.name}</th>)}
              </tr></thead>
              <tbody>{comparison.map(([feature, ...values]) => <tr key={feature} className={feature.includes("hosting") || feature === "One-time build" ? "border-b border-line bg-wash/60" : "border-b border-line"}>
                <th scope="row" className="px-5 py-4 text-left align-top font-medium">{feature}</th>
                {values.map((value, i) => <td key={i} className="px-5 py-4 align-top leading-relaxed text-ink-soft">{value}</td>)}
              </tr>)}</tbody>
            </table>
          </div>
          <p className="mt-4 max-w-3xl text-xs leading-relaxed text-ink-soft">First-year examples assume the listed build price plus 12 full months of hosting. Hosting is billed monthly, not prepaid annually. Domain costs, paid software, and separately scoped work are not included. Custom build pricing varies with scope.</p>
          <div className="mt-10 flex flex-wrap items-center justify-between gap-6 rounded-[6px] border border-line bg-wash p-7 sm:p-8">
            <div className="max-w-xl"><h3 className="font-display text-2xl">Not sure how much website you need?</h3><p className="mt-2 text-sm leading-relaxed text-ink-soft">Tell me what your business does and how often the site changes. I&apos;ll recommend a build and hosting plan that fit.</p></div>
            <ButtonLink href="/contact?package=not-sure">Get a recommendation</ButtonLink>
          </div>
        </Container>
      </section>

      <section className="border-t border-line" aria-labelledby="faq-heading">
        <Container className="py-16 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4"><Eyebrow>Pricing FAQ</Eyebrow><h2 id="faq-heading" className="mt-4 font-display text-3xl leading-tight">Clear expectations,<br />before we start.</h2><p className="mt-4 leading-relaxed text-ink-soft">Build scope, monthly changes, and the practical details of working together.</p>
              <div className="mt-6 flex flex-col gap-3"><ArrowLink href="/resources/how-much-does-a-website-cost-in-austin">How to compare website quotes</ArrowLink><ArrowLink href="/services">What each service involves</ArrowLink><ArrowLink href="/work">See finished projects</ArrowLink></div>
            </div>
            <div className="lg:col-span-8"><FaqList faqs={pricingFaqs} /></div>
          </div>
        </Container>
      </section>
      <JsonLd data={[webPageSchema({ ...page, dateModified: site.contentUpdated }), faqSchema(pricingFaqs, page.path)]} />
    </>
  );
}
