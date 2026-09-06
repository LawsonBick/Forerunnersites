import type { Metadata } from "next";
import { site } from "@/config/site";
import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { ContactForm } from "@/components/contact-form";
import { JsonLd } from "@/components/json-ld";
import { buildMetadata } from "@/lib/seo";
import { webPageSchema } from "@/lib/schema";

const page = {
  title: "Start a Website Project",
  description:
    "Tell Forerunner Sites about your business and what the website needs to do. Every inquiry gets a personal reply within one business day and a written proposal.",
  path: "/contact",
};

export const metadata: Metadata = buildMetadata(page);

const nextSteps = [
  {
    title: "I read your inquiry",
    detail: "Personally, usually the same day. No auto-responders, no sales queue.",
  },
  {
    title: "We talk it through",
    detail:
      "A short call or email thread about your business, your customers, and what the site has to do.",
  },
  {
    title: "You get a written proposal",
    detail:
      "Scope, timeline, and price in plain language. If a package isn't the right fit, I'll say so.",
  },
];

/**
 * Fully static. The `?package=` preselect that pricing links pass along is
 * read by the form on the client, so this page never has to render per
 * request just to look at a query string.
 */
export default function ContactPage() {
  return (
    <section>
      <Container className="pt-12 pb-20 sm:pt-16 lg:pt-20 lg:pb-28">
        <SectionHeading
          as="h1"
          entrance="rise"
          eyebrow="Start a project"
          title="Tell me where your website is letting you down."
          lede="A few honest details are all this takes. If we're a fit, you'll have a clear proposal in hand within days, and if we're not, I'll point you somewhere useful."
        />

        <div className="mt-14 grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7" data-reveal>
            <ContactForm />
          </div>

          <aside className="lg:col-span-5" data-reveal>
            <div className="space-y-10 lg:sticky lg:top-28">
              <div>
                <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-soft">
                  What happens next
                </h2>
                <ol className="stagger mt-4" data-reveal>
                  {nextSteps.map((step, i) => (
                    <li key={step.title} className="flex gap-4 border-t border-line py-4">
                      <span className="text-[13px] font-semibold text-accent tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span>
                        <span className="block text-sm font-medium">{step.title}</span>
                        <span className="mt-1 block text-sm leading-relaxed text-ink-soft">
                          {step.detail}
                        </span>
                      </span>
                    </li>
                  ))}
                </ol>
              </div>

              <div>
                <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-soft">
                  Prefer email?
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                  Skip the form entirely. Same inbox, same reply time.
                </p>
                <a
                  href={`mailto:${site.email}`}
                  className="mt-2 inline-block font-display text-xl text-accent underline underline-offset-4 transition-colors hover:text-accent-deep"
                >
                  {site.email}
                </a>
                {site.phone ? (
                  <p className="mt-3 text-sm text-ink-soft">
                    Or call{" "}
                    <a
                      href={`tel:${site.phone.replace(/[^+\d]/g, "")}`}
                      className="font-medium text-ink underline underline-offset-4"
                    >
                      {site.phone}
                    </a>
                  </p>
                ) : null}
              </div>

              {site.schedulingUrl ? (
                <div>
                  <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-soft">
                    Rather just talk?
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                    Book a free 20-minute discovery call. No pitch, just a
                    conversation about what your business needs.
                  </p>
                  <a
                    href={site.schedulingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-sm font-medium text-accent underline underline-offset-4"
                  >
                    Pick a time ↗
                  </a>
                </div>
              ) : null}

              <p className="border-t border-line pt-5 text-[13px] leading-relaxed text-ink-soft">
                Based in {site.location.city}, {site.location.regionFull}. Your
                details are used only to respond to this inquiry. No lists, no
                newsletters, no sharing.
              </p>
            </div>
          </aside>
        </div>
      </Container>

      <JsonLd data={webPageSchema({ ...page, type: "ContactPage" })} />
    </section>
  );
}
