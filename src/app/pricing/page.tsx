import type { Metadata } from "next";
import { comparison, packages, pricingFaqs, pricingNotes } from "@/content/pricing";
import { Container } from "@/components/container";
import { SectionHeading, Eyebrow } from "@/components/section-heading";
import { ButtonLink } from "@/components/button";
import { PricingCards } from "@/components/pricing-cards";
import { FaqList } from "@/components/faq-list";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Three clear one-time packages: Launch at $500, Growth at $1,500, and Custom from $3,000. Honest scope, transparent comparisons, and a pricing FAQ.",
  alternates: { canonical: "/pricing" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: pricingFaqs.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};

export default function PricingPage() {
  return (
    <>
      <section>
        <Container className="pt-12 pb-20 sm:pt-16 lg:pt-20 lg:pb-24">
          <SectionHeading
            as="h1"
            entrance="rise"
            eyebrow="Pricing"
            title="One-time project prices. No retainers, no surprises."
            lede="Every package is a real, valuable build. The differences are scope and customization, and they're spelled out below. Domain registration, hosting, paid third-party software, professional photography, and extensive copywriting are separate unless included in a custom proposal."
          />
          <div className="mt-12">
            <PricingCards detailed />
          </div>
          <ul className="mt-8 max-w-3xl space-y-1.5" data-reveal>
            {pricingNotes.map((note) => (
              <li key={note} className="flex gap-2.5 text-[13px] leading-relaxed text-ink-soft">
                <span aria-hidden="true" className="mt-[7px] inline-block h-[4px] w-[4px] shrink-0 bg-ink-faint" />
                {note}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Comparison table */}
      <section className="border-t border-line bg-wash" aria-labelledby="compare-heading">
        <Container className="py-20 lg:py-24">
          <SectionHeading
            eyebrow="Side by side"
            title={<span id="compare-heading">Compare the packages.</span>}
          />
          <div className="mt-10 overflow-x-auto" data-reveal>
            <table className="w-full min-w-[640px] border-collapse bg-white text-sm">
              <caption className="sr-only">
                Feature comparison of the Launch, Growth, and Custom packages
              </caption>
              <thead>
                <tr className="border-b-2 border-ink text-left">
                  <th scope="col" className="py-4 pr-4 pl-5 font-semibold">
                    What&apos;s included
                  </th>
                  {packages.map((pkg) => (
                    <th key={pkg.id} scope="col" className="px-4 py-4 font-semibold">
                      <span className="flex items-center gap-2">
                        {pkg.name}
                        {pkg.recommended ? (
                          <span className="rounded-[var(--radius-xs)] bg-accent px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-white">
                            Popular
                          </span>
                        ) : null}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparison.map(([feature, launch, growth, custom]) => (
                  <tr key={feature} className="border-b border-line align-top">
                    <th scope="row" className="py-3.5 pr-4 pl-5 text-left font-medium text-ink">
                      {feature}
                    </th>
                    <td className="px-4 py-3.5 text-ink-soft">{launch}</td>
                    <td className="px-4 py-3.5 text-ink">{growth}</td>
                    <td className="px-4 py-3.5 text-ink-soft">{custom}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div
            className="mt-10 flex flex-wrap items-center justify-between gap-6 rounded-[6px] border border-line bg-white p-7 sm:p-8"
            data-reveal
          >
            <div className="max-w-xl">
              <h3 className="font-display text-2xl">Not sure which option fits?</h3>
              <p className="mt-2 leading-relaxed text-ink-soft">
                Send a few sentences about your business and I&apos;ll recommend the
                smallest package that actually solves your problem, even if
                that&apos;s the $500 one.
              </p>
            </div>
            <ButtonLink href="/contact?package=not-sure">Get a recommendation</ButtonLink>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="border-t border-line" aria-labelledby="faq-heading">
        <Container className="py-20 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Eyebrow>Pricing FAQ</Eyebrow>
              <h2 id="faq-heading" className="mt-4 font-display text-3xl leading-tight">
                The questions everyone asks before starting.
              </h2>
              <p className="mt-4 leading-relaxed text-ink-soft">
                Ongoing maintenance and optimization plans are available
                separately after launch. Ask about them in your inquiry.
              </p>
            </div>
            <div className="lg:col-span-8">
              <FaqList faqs={pricingFaqs} />
            </div>
          </div>
        </Container>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
