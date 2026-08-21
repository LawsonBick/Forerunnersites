import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/config/site";
import { projects } from "@/content/projects";
import { services } from "@/content/services";
import { processSteps, processNote, whyUs } from "@/content/process";
import { Container } from "@/components/container";
import { ButtonLink, ArrowLink } from "@/components/button";
import { SectionHeading, Eyebrow } from "@/components/section-heading";
import { BrowserFrame } from "@/components/frames";
import { ProjectShowcase } from "@/components/project-showcase";
import { PricingCards } from "@/components/pricing-cards";
import { CtaBand } from "@/components/cta-band";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="overflow-hidden">
        <Container className="pt-10 sm:pt-14 lg:pt-20">
          <div className="rise flex items-center gap-4">
            <p className="flex shrink-0 items-center gap-2.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-ink-soft">
              <span aria-hidden="true" className="inline-block h-[7px] w-[7px] bg-accent" />
              {site.availability}
            </p>
            <span aria-hidden="true" className="hidden h-px flex-1 bg-line sm:block" />
            <p className="hidden shrink-0 text-[12px] font-medium uppercase tracking-[0.16em] text-ink-soft lg:block">
              {site.location.city}, {site.location.regionFull}
            </p>
          </div>

          <div className="rise mt-10 max-w-4xl [animation-delay:100ms] sm:mt-14">
            <h1 className="font-display text-[clamp(2.6rem,1.4rem+4.6vw,4.75rem)] leading-[1.04] tracking-[-0.015em]">
              A website that <em>earns the call.</em>
            </h1>
            <p className="mt-6 max-w-[54ch] text-lg leading-relaxed text-ink-soft sm:text-xl">
              {site.name} designs and builds fast, strategic websites for Austin
              businesses that have outgrown average — restaurants, service
              companies, and growing brands whose next customer is deciding
              online right now.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <ButtonLink href={site.cta.primary.href}>{site.cta.primary.label}</ButtonLink>
              <ButtonLink href={site.cta.secondary.href} variant="secondary">
                {site.cta.secondary.label}
              </ButtonLink>
            </div>
          </div>
        </Container>

        {/* Portfolio strip: three real projects, each in its client's colors */}
        <Container className="pt-14 pb-6 sm:pt-20">
          <div className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 sm:-mx-8 sm:px-8 md:mx-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0 md:pb-0">
            {projects.map((project, i) => (
              <Link
                key={project.slug}
                href={`/work/${project.slug}`}
                className={[
                  "group block min-w-[80%] snap-center sm:min-w-[55%] md:min-w-0",
                  i === 0 ? "md:mt-10" : i === 2 ? "md:mt-16" : "",
                ].join(" ")}
              >
                <div
                  className="rounded-[6px] p-3 transition-transform duration-300 group-hover:-translate-y-1 sm:p-4"
                  style={{ backgroundColor: project.palette.panel }}
                >
                  <BrowserFrame
                    src={project.images.desktop.src}
                    alt={project.images.desktop.alt}
                    width={2600}
                    height={1625}
                    sizes="(min-width: 768px) 31vw, 92vw"
                    url={project.displayUrl}
                    priority={i === 0}
                    className="shadow-[var(--shadow-frame-sm)]"
                  />
                </div>
                <p className="mt-3 flex items-baseline justify-between gap-3 text-[13px]">
                  <span className="font-medium text-ink group-hover:underline group-hover:underline-offset-4">
                    {project.name}
                  </span>
                  <span className="truncate text-ink-soft">{project.industry}</span>
                </p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Credibility statement ────────────────────────────────── */}
      <section className="border-t border-line">
        <Container className="py-20 lg:py-28">
          <div className="grid gap-10 lg:grid-cols-12" data-reveal>
            <div className="lg:col-span-3">
              <Eyebrow>The studio</Eyebrow>
            </div>
            <div className="lg:col-span-9">
              <p className="max-w-3xl font-display text-[clamp(1.5rem,1.1rem+1.6vw,2.25rem)] leading-[1.3] tracking-[-0.005em]">
                {site.name} is an Austin studio that works directly with business
                owners — one person handling strategy, design, development,
                performance, mobile experience, and the search foundations
                underneath it all.
              </p>
              <p className="mt-6 max-w-2xl leading-relaxed text-ink-soft">
                No account managers, no hand-offs, no template with your logo
                dropped in. Just careful work, explained plainly, built to make
                your business easier to trust and easier to choose.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Featured work ────────────────────────────────────────── */}
      <section className="border-t border-line" aria-labelledby="work-heading">
        <Container className="py-20 lg:py-28">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Selected work"
              title={
                <span id="work-heading">
                  Three Austin businesses, three different jobs to do.
                </span>
              }
              lede="A forty-year-old restaurant, a premium mobile detailer, and a home-services company. Each got a site built around how its customers decide — not a reskin of the same layout."
            />
            <ArrowLink href="/work" className="mb-1">
              All work
            </ArrowLink>
          </div>
          <div className="mt-14 space-y-20 lg:mt-20 lg:space-y-28">
            {projects.map((project, i) => (
              <ProjectShowcase key={project.slug} project={project} flip={i % 2 === 1} />
            ))}
          </div>
        </Container>
      </section>

      {/* ── Services ─────────────────────────────────────────────── */}
      <section className="border-t border-line bg-wash" aria-labelledby="services-heading">
        <Container className="py-20 lg:py-28">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Services"
              title={<span id="services-heading">Everything a working website needs.</span>}
              lede="Strategy through launch and beyond, handled by one person who's accountable for all of it."
            />
            <ArrowLink href="/services" className="mb-1">
              About each service
            </ArrowLink>
          </div>
          <ul className="mt-12 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3" data-reveal>
            {services.map((service) => (
              <li key={service.title} className="border-t border-line py-6">
                <h3 className="text-[16px] font-medium">{service.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                  {service.summary}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ── Process ──────────────────────────────────────────────── */}
      <section className="border-t border-line" aria-labelledby="process-heading">
        <Container className="py-20 lg:py-28">
          <SectionHeading
            eyebrow="Process"
            title={<span id="process-heading">Five steps, no mystery.</span>}
            lede="You'll always know where the project stands, what's next, and what's needed from you."
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
          <p
            className="mt-12 max-w-2xl border-l-2 border-accent pl-5 font-display text-lg leading-relaxed text-ink"
            data-reveal
          >
            {processNote}
          </p>
        </Container>
      </section>

      {/* ── Pricing preview ──────────────────────────────────────── */}
      <section className="border-t border-line bg-wash" aria-labelledby="pricing-heading">
        <Container className="py-20 lg:py-28">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Pricing"
              title={<span id="pricing-heading">Clear packages, honest scope.</span>}
              lede="Three ways to work together, each priced as a one-time project. Most established businesses land on Growth."
            />
            <ArrowLink href="/pricing" className="mb-1">
              Compare in detail
            </ArrowLink>
          </div>
          <div className="mt-12">
            <PricingCards />
          </div>
        </Container>
      </section>

      {/* ── Why work with us ─────────────────────────────────────── */}
      <section className="border-t border-line" aria-labelledby="why-heading">
        <Container className="py-20 lg:py-28">
          <SectionHeading
            eyebrow="Why Forerunner"
            title={<span id="why-heading">What you get that an agency won&apos;t give you.</span>}
          />
          <ul className="mt-12 grid gap-x-14 sm:grid-cols-2" data-reveal>
            {whyUs.map((item) => (
              <li key={item.title} className="border-t border-line py-5">
                <h3 className="text-[16px] font-medium">{item.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{item.detail}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ── Final CTA ────────────────────────────────────────────── */}
      <CtaBand
        title={
          <>
            Your next customer is already looking. <em>Make sure they choose you.</em>
          </>
        }
      />
    </>
  );
}
