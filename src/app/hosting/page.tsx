import type { Metadata } from "next";
import { packages, pricingFaqs, formatPrice } from "@/content/pricing";
import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { ArrowLink, ButtonLink } from "@/components/button";
import { FaqList } from "@/components/faq-list";
import { JsonLd } from "@/components/json-ld";
import { buildMetadata } from "@/lib/seo";
import { webPageSchema, faqSchema } from "@/lib/schema";
import { site } from "@/config/site";
const page = {
  title: "Website Hosting & Monthly Support",
  description:
    "Managed hosting from $50/month. Growth includes two small monthly changes; Custom includes two hours of updates and support. See inclusions and limits.",
  path: "/hosting",
};
export const metadata: Metadata = buildMetadata(page);
const faqs = pricingFaqs.slice(0, 5);
export default function HostingPage() {
  return (
    <>
      <Container className="pt-14 pb-20 lg:pt-24 lg:pb-28">
        <SectionHeading
          as="h1"
          entrance="rise"
          eyebrow="After launch"
          title={
            <>
              A place to run.
              <br />
              <em>Room to keep growing.</em>
            </>
          }
          lede="Hosting and practical support, from the person who built your website."
        />
        <div className="mt-14 grid gap-8 lg:grid-cols-3">
          {packages.map((p) => (
            <article
              key={p.id}
              className="border-t-2 border-accent pt-6"
              data-reveal="up"
            >
              <p className="kicker text-accent">{p.name}</p>
              <h2 className="mt-4 font-display text-3xl">{p.hosting.name}</h2>
              <p className="mt-5">
                <span className="font-display text-5xl">
                  {formatPrice(p.hosting.monthlyPrice)}
                </span>
                <span className="ml-2 text-sm text-ink-soft">/ month</span>
              </p>
              <ul className="mt-7 space-y-3 text-sm">
                {p.hosting.includes.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span aria-hidden="true" className="text-accent">
                      ↗
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm leading-relaxed text-ink-soft">
                {p.hosting.detail}
              </p>
              <p className="mt-5 text-xs font-medium">{p.hosting.support}</p>
              <div className="mt-6">
                <ArrowLink href={`/pricing/${p.id}`}>
                  Explore the {p.name} build
                </ArrowLink>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-16 grid gap-8 border-y border-line bg-wash p-7 sm:p-10 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <p className="kicker text-accent">Simple by design</p>
            <h2 className="mt-4 font-display text-4xl">
              Send it.
              <br />
              I&apos;ll take it from there.
            </h2>
          </div>
          <ol className="space-y-6">
            {[
              [
                "Send one clear request",
                "Include the page, your final text or images, and what needs to change.",
              ],
              [
                "Agree on scope and timing",
                "I confirm the request fits your allowance. Anything extra is quoted before work starts.",
              ],
              [
                "Review the live update",
                "I make the change, check the affected page, and let you know it is ready.",
              ],
            ].map(([title, body], i) => (
              <li key={title} className="flex gap-4">
                <span className="kicker pt-1 text-accent">0{i + 1}</span>
                <div>
                  <h3 className="font-medium">{title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                    {body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl">Clear boundaries.</h2>
            <p className="mt-4 text-sm leading-relaxed text-ink-soft">
              Monthly billing starts at launch, per website. Unused changes or
              hours do not roll over. Domains, business email, paid tools, new
              pages, major redesigns, and ongoing SEO campaigns are separate.
            </p>
          </div>
          <div>
            <h2 className="font-display text-3xl">A direct connection.</h2>
            <p className="mt-4 text-sm leading-relaxed text-ink-soft">
              Support is by email during business hours. Priority support gives
              Custom requests priority in the schedule; it does not mean 24/7
              coverage. You own your website and domain. Billing, cancellation,
              and any migration work are detailed in your proposal.
            </p>
          </div>
        </div>
        <section id="faq" className="mt-16 scroll-mt-24">
          <h2 className="mb-7 font-display text-4xl">The practical details.</h2>
          <FaqList faqs={faqs} />
        </section>
        <div className="mt-12 flex flex-wrap items-center justify-between gap-6">
          <ArrowLink href="/pricing">Back to website pricing</ArrowLink>
          <ButtonLink href="/contact">Talk about your website</ButtonLink>
        </div>
      </Container>
      <JsonLd
        data={[
          webPageSchema({ ...page, dateModified: site.contentUpdated }),
          faqSchema(faqs, page.path),
        ]}
      />
    </>
  );
}
