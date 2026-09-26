import type { Metadata } from "next";
import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { ButtonLink } from "@/components/button";
import { FaqList } from "@/components/faq-list";
import { AutomationCalculator } from "@/components/automation-calculator";
import { JsonLd } from "@/components/json-ld";
import { automationPackages, automationSteps, automationFaqs } from "@/content/automation";
import { formatPrice } from "@/content/pricing";
import { buildMetadata } from "@/lib/seo";
import { faqSchema, webPageSchema } from "@/lib/schema";

const page = {
  title: "Business Automation for Austin Service Businesses",
  description: "Missed-call text-back, lead follow-up, online booking and an AI front desk for Austin home-service businesses. Plans from $149/month plus setup.",
  path: "/automation",
};
export const metadata: Metadata = buildMetadata(page);
const stats = [
  ["78%", "of customers go with whoever responds first"],
  ["<5 min", "response time wins the job"],
  ["24/7", "your business answers, even when you can't"],
];

export default function AutomationPage() {
  return (
    <>
      <section>
        <Container className="pt-12 pb-14 sm:pt-16 lg:pt-20 lg:pb-20">
          <div className="grid items-end gap-8 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
            <SectionHeading as="h1" entrance="rise" eyebrow="Forerunner Business Automation"
              title={<>Never miss<br /><em>another lead.</em></>} />
            <div className="rise max-w-xl">
              <p className="text-lg leading-relaxed text-ink-soft">You&apos;re on a job site, under a house, up a ladder — your phone rings and you can&apos;t answer. We make sure that caller still becomes your customer.</p>
              <ButtonLink href="/contact?package=automation" className="mt-7">Let&apos;s talk automation <span aria-hidden="true">↗</span></ButtonLink>
            </div>
          </div>
          <dl className="mt-12 grid grid-cols-3 gap-4 border-y border-line py-7 sm:gap-8 sm:py-9 lg:mt-16">
            {stats.map(([value, label]) => (
              <div key={value} className="min-w-0">
                <dt className="text-[clamp(1.7rem,4.4vw,3.6rem)] font-medium leading-none tracking-[-0.045em] text-brand">{value}</dt>
                <dd className="mt-3 max-w-[15rem] text-xs leading-relaxed text-ink-soft sm:text-sm">{label}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <section className="border-y border-line bg-wash" aria-labelledby="calculator-heading">
        <Container className="py-14 lg:py-20">
          <SectionHeading eyebrow="The cost of a missed call" title={<span id="calculator-heading">What are missed calls costing you?</span>}
            lede="Drag the sliders. Be honest — most owners underestimate this by a lot." />
          <AutomationCalculator />
        </Container>
      </section>

      <section id="plans" aria-labelledby="automation-plans-heading">
        <Container className="py-16 lg:py-24">
          <SectionHeading eyebrow="Business Automation plans" title={<span id="automation-plans-heading">Less chasing.<br /><em>More booked jobs.</em></span>} />
          <div className="pricing-grid mt-10 grid border-y border-line lg:grid-cols-3" data-reveal="up">
            {automationPackages.map((plan, index) => (
              <article key={plan.id} className={`price-column relative flex min-w-0 flex-col px-6 py-9 sm:px-9 ${plan.popular ? "is-recommended bg-accent-soft" : ""}`}>
                <div className="flex min-h-6 flex-wrap items-center justify-between gap-3">
                  <span className="kicker text-ink-soft">0{index + 1}</span>
                  {plan.popular && <span className="rounded-full bg-accent px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-ink">Most popular</span>}
                </div>
                <h3 className="mt-6 font-display text-3xl tracking-[-0.035em] sm:text-4xl">{plan.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft lg:min-h-12">{plan.tagline}</p>
                <p className="mt-6 flex items-baseline gap-2"><span className="font-display text-5xl tracking-[-0.035em]">{formatPrice(plan.monthly)}</span><span className="text-sm text-ink-soft">/mo</span></p>
                <p className="mt-2 text-sm text-ink-soft">+ {formatPrice(plan.setup)} one-time setup</p>
                <ul className="my-8 space-y-3.5 text-sm leading-relaxed">
                  {plan.features.map((feature) => <li key={feature} className="flex gap-2.5"><span aria-hidden="true" className="text-brand">↗</span><span>{feature}</span></li>)}
                </ul>
                <div className="mt-auto border-t border-line pt-6">
                  <ButtonLink href={`/contact?package=${plan.id}`} variant={plan.popular ? "primary" : "secondary"} className="w-full">Get {plan.name}</ButtonLink>
                </div>
              </article>
            ))}
          </div>
          <p className="mt-6 text-center text-sm leading-relaxed text-ink-soft">Month-to-month after setup. No contracts, no per-lead fees, no surprises.</p>
        </Container>
      </section>

      <section className="border-y border-line bg-wash">
        <Container className="grid items-center gap-8 py-12 lg:grid-cols-[1fr_auto] lg:gap-16 lg:py-16">
          <div data-reveal="left">
            <p className="kicker text-ink-soft">Better together</p>
            <h2 className="mt-4 max-w-3xl font-display text-3xl leading-tight tracking-[-0.035em] sm:text-4xl">Already getting a Forerunner website? Bundle it.</h2>
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-ink-soft">Add Lead Catcher to any website plan and your site doesn&apos;t just look good — it answers, follows up, and books while you work. Ask about bundle pricing when we build your site.</p>
          </div>
          <ButtonLink href="/contact?package=automation-bundle" variant="secondary">Ask about a bundle <span aria-hidden="true">↗</span></ButtonLink>
        </Container>
      </section>

      <section>
        <Container className="py-16 lg:py-24">
          <SectionHeading eyebrow="How it works" title={<>We handle the setup.<br /><em>You do the work.</em></>} />
          <ol className="mt-10 grid gap-9 lg:grid-cols-3 lg:gap-12">
            {automationSteps.map((step, index) => <li key={step.title} className="border-t-2 border-accent pt-5" data-reveal="up">
              <span className="kicker text-brand">0{index + 1}</span>
              <h3 className="mt-4 font-display text-2xl">{step.title}</h3>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-soft">{step.body}</p>
            </li>)}
          </ol>
          <div id="faq" className="mt-16 grid scroll-mt-24 gap-8 lg:mt-24 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
            <div>
              <p className="kicker text-ink-soft">Before we start</p>
              <h2 className="mt-4 font-display text-4xl tracking-[-0.035em]">A few useful answers.</h2>
            </div>
            <FaqList faqs={automationFaqs} />
          </div>
          <div className="mt-14 flex flex-wrap items-center justify-between gap-7 border-t border-line pt-9">
            <p className="max-w-xl text-base leading-relaxed">Built for Austin&apos;s home-service pros by Forerunner Sites. The person you talk to is the one who builds it.</p>
            <ButtonLink href="/contact?package=automation">Start a conversation <span aria-hidden="true">↗</span></ButtonLink>
          </div>
        </Container>
      </section>
      <JsonLd data={[webPageSchema({ ...page, dateModified: "2026-09-26" }), faqSchema(automationFaqs, page.path)]} />
    </>
  );
}
