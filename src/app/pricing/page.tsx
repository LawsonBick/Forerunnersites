import type { Metadata } from "next";
import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { PricingCards } from "@/components/pricing-cards";
import { ArrowLink, ButtonLink } from "@/components/button";
import { FaqList } from "@/components/faq-list";
import { JsonLd } from "@/components/json-ld";
import { comparison, packages, pricingFaqs } from "@/content/pricing";
import { buildMetadata } from "@/lib/seo";
import { faqSchema, webPageSchema } from "@/lib/schema";
import { site } from "@/config/site";
const page = {
  title: "Website Pricing, Hosting & Support",
  description:
    "Choose Launch at $500, Growth at $1,500, or Custom from $3,000. Monthly hosting at $50, $100, or $200. Explore package scope and included support.",
  path: "/pricing",
};
export const metadata: Metadata = buildMetadata(page);
const faqs = [
  pricingFaqs[0],
  pricingFaqs.find((f) => f.question === "How do payments work?")!,
  pricingFaqs.find(
    (f) => f.question === "What do I need to have ready before we start?",
  )!,
];
export default function PricingPage() {
  return (
    <>
      <section>
        <Container className="pt-14 pb-16 lg:pt-24 lg:pb-24">
          <div className="mb-14 grid items-end gap-7 lg:grid-cols-[1.4fr_1fr]">
            <SectionHeading
              as="h1"
              entrance="rise"
              eyebrow="The investment"
              title={
                <>
                  A clear price.
                  <br />
                  <em>A considered website.</em>
                </>
              }
            />
            <p className="rise max-w-sm text-base leading-relaxed text-ink-soft">
              Pay once for the build. Choose the level of ongoing help you need.
              Both costs, right here.
            </p>
          </div>
          <PricingCards />
          <p className="mt-5 max-w-3xl text-xs leading-relaxed text-ink-soft">
            Monthly hosting starts at launch. Domain registration, business
            email, and paid tools are separate. Update allowances reset each
            month without rollover; additional work is quoted before it begins.
          </p>
        </Container>
      </section>
      <section id="hosting" className="border-y border-line bg-wash">
        <Container className="grid items-center gap-8 py-12 md:grid-cols-[1fr_auto]">
          <div data-reveal="left">
            <p className="kicker text-accent">After launch</p>
            <h2 className="mt-4 font-display text-4xl">
              A home for your site.
              <br />
              <em>Help when you need it.</em>
            </h2>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-ink-soft">
              From simple hosting to ongoing updates. See exactly what each
              monthly plan covers.
            </p>
          </div>
          <ButtonLink href="/hosting" variant="secondary">
            Explore hosting & support <span aria-hidden="true">↗</span>
          </ButtonLink>
        </Container>
      </section>
      <section>
        <Container className="py-16 lg:py-20">
          <div id="compare" className="scroll-mt-24">
            <details className="border-y border-line">
              <summary className="group flex cursor-pointer items-center justify-between gap-5 py-7">
                <h2 className="font-display text-3xl">Compare every detail</h2>
                <span
                  aria-hidden="true"
                  className="text-2xl text-accent group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <div
                className="overflow-x-auto pb-5"
                tabIndex={0}
                role="region"
                aria-label="Scrollable package comparison"
              >
                <table className="w-full min-w-[700px] text-left text-sm">
                  <caption className="sr-only">
                    Website packages and ongoing costs
                  </caption>
                  <thead>
                    <tr className="border-b border-ink">
                      <th scope="col" className="p-4">
                        Included
                      </th>
                      {packages.map((p) => (
                        <th key={p.id} scope="col" className="p-4">
                          {p.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {comparison.map(([label, ...values]) => (
                      <tr key={label} className="border-b border-line">
                        <th scope="row" className="p-4 font-medium">
                          {label}
                        </th>
                        {values.map((value, i) => (
                          <td key={i} className="p-4 text-ink-soft">
                            {value}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="pb-6 text-xs leading-relaxed text-ink-soft">
                First-year examples use the build price plus 12 months of
                hosting. Hosting is billed monthly. Domains, paid tools, and
                extra work are excluded; Custom scope may increase the build
                fee.
              </p>
            </details>
          </div>
          <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_1.4fr]">
            <div>
              <p className="kicker text-accent">Before we start</p>
              <h2 className="mt-4 font-display text-4xl">
                A few useful answers.
              </h2>
              <div className="mt-6">
                <ArrowLink href="/hosting#faq">
                  Hosting & support questions
                </ArrowLink>
              </div>
            </div>
            <FaqList faqs={faqs} />
          </div>
          <div className="mt-14 flex flex-wrap items-center justify-between gap-6 border-t border-line pt-8">
            <p className="font-display text-2xl">A little help choosing?</p>
            <ArrowLink href="/contact?package=not-sure">
              Tell me about your business
            </ArrowLink>
          </div>
        </Container>
      </section>
      <JsonLd
        data={[
          webPageSchema({ ...page, dateModified: site.contentUpdated }),
          faqSchema(faqs, page.path),
        ]}
      />
    </>
  );
}
