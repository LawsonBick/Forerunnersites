import type { Metadata } from "next";
import { site } from "@/config/site";
import { services } from "@/content/services";
import { processSteps, processNote } from "@/content/process";
import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { ArrowLink } from "@/components/button";
import { CtaBand } from "@/components/cta-band";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Website strategy, UX, custom design, responsive development, local SEO foundations, performance, analytics, redesigns, and ongoing support — from one Austin studio.",
  alternates: { canonical: "/services" },
};

const servicesSchema = {
  "@context": "https://schema.org",
  "@graph": services.map((s) => ({
    "@type": "Service",
    name: s.title,
    description: s.detail,
    provider: { "@type": "ProfessionalService", name: site.name, url: site.url },
    areaServed: `${site.location.city}, ${site.location.regionFull}`,
  })),
};

export default function ServicesPage() {
  return (
    <>
      <section>
        <Container className="pt-12 pb-20 sm:pt-16 lg:pt-20 lg:pb-28">
          <SectionHeading
            as="h1"
            entrance="rise"
            eyebrow="Services"
            title="One studio, accountable for the whole website."
            lede="Most agencies split your project across a strategist, a designer, a developer, and an account manager. Here, those are the same person — which means nothing gets lost between them, and every decision traces back to what your business needs."
          />

          <div className="mt-16">
            {services.map((service) => (
              <div
                key={service.title}
                className="grid gap-3 border-t border-line py-8 lg:grid-cols-12 lg:gap-6 lg:py-10"
                data-reveal
              >
                <h2 className="font-display text-2xl lg:col-span-4">{service.title}</h2>
                <div className="lg:col-span-8">
                  <p className="max-w-2xl leading-relaxed text-ink-soft">{service.detail}</p>
                </div>
              </div>
            ))}
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
        copy="Describe the business and the problem — outdated site, no site, not enough inquiries — and I'll tell you what I'd build, what I'd skip, and what it would cost."
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }}
      />
    </>
  );
}
