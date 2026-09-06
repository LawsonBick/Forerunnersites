import type { Metadata } from "next";
import { site } from "@/config/site";
import { services } from "@/content/services";
import { processSteps, processNote } from "@/content/process";
import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { ArrowLink } from "@/components/button";
import { CtaBand } from "@/components/cta-band";
import { JsonLd } from "@/components/json-ld";
import { buildMetadata } from "@/lib/seo";
import { serviceSchemas, webPageSchema } from "@/lib/schema";
import { slugify } from "@/lib/slug";

const page = {
  title: "Web Design & SEO Services in Austin",
  description:
    "Website strategy, custom design, responsive development, local SEO, performance, analytics, and redesigns for Austin businesses, from one accountable studio.",
  path: "/services",
};

export const metadata: Metadata = buildMetadata(page);

export default function ServicesPage() {
  return (
    <>
      <section>
        <Container className="pt-12 pb-20 sm:pt-16 lg:pt-20 lg:pb-28">
          <SectionHeading
            as="h1"
            entrance="rise"
            eyebrow="Services"
            title="Web design services for Austin businesses, from one accountable studio."
            lede="Most agencies split your project across a strategist, a designer, a developer, and an account manager. I do all four jobs myself, so nothing gets lost in a hand-off and every decision traces back to what your business actually needs."
          />

          <div className="mt-16">
            {services.map((service) => (
              <div
                key={service.title}
                id={slugify(service.title)}
                className="grid scroll-mt-28 gap-3 border-t border-line py-8 lg:grid-cols-12 lg:gap-6 lg:py-10"
                data-reveal
              >
                <h2 className="font-display text-2xl lg:col-span-4">{service.title}</h2>
                <div className="lg:col-span-8">
                  <p className="max-w-2xl leading-relaxed text-ink-soft">{service.detail}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-line pt-6" data-reveal>
            <ArrowLink href="/work">See these services in finished websites</ArrowLink>
            <ArrowLink href="/pricing" className="text-ink-soft hover:text-ink">
              Compare the three packages
            </ArrowLink>
          </div>
        </Container>
      </section>

      <section className="border-t border-line bg-wash" aria-labelledby="how-heading">
        <Container className="py-20 lg:py-28">
          <SectionHeading
            eyebrow="How it comes together"
            title={<span id="how-heading">A process you can see the whole way through.</span>}
          />
          <ol className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-5" data-reveal>
            {processSteps.map((step, i) => (
              <li key={step.name} className="border-t-2 border-ink pt-4">
                <p className="text-[13px] font-semibold tracking-[0.08em] text-accent tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 font-display text-xl">{step.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{step.detail}</p>
              </li>
            ))}
          </ol>
          <div className="mt-12 flex flex-wrap items-center justify-between gap-6" data-reveal>
            <p className="max-w-2xl border-l-2 border-accent pl-5 font-display text-lg leading-relaxed">
              {processNote}
            </p>
            <ArrowLink href="/pricing">See what projects cost</ArrowLink>
          </div>
        </Container>
      </section>

      <CtaBand
        title={
          <>
            Not sure what your project needs? <em>That&apos;s a fine place to start.</em>
          </>
        }
        copy="Describe your business and the problem, whether that is an outdated site, no site, or not enough inquiries, and I'll tell you what I would build, what I would skip, and what it would cost."
      />

      <JsonLd
        data={[
          webPageSchema({ ...page, dateModified: site.contentUpdated }),
          ...serviceSchemas(),
        ]}
      />
    </>
  );
}
