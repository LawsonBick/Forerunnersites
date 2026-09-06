import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import Image from "next/image";
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

const hasPortrait = fs.existsSync(
  path.join(process.cwd(), "public", "about", "portrait.jpg")
);

export default function HomePage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="overflow-hidden">
        <Container className="pt-16 sm:pt-20 lg:pt-28">
          <div className="max-w-4xl">
            <h1 className="font-display text-[clamp(2.6rem,1.4rem+4.6vw,4.75rem)] leading-[1.04] tracking-[-0.015em]">
              <span className="mask-line">
                <span className="mask-line-inner">Get found.</span>
              </span>{" "}
              <span className="mask-line">
                <span className="mask-line-inner [animation-delay:140ms]">
                  <em>Get chosen.</em>
                </span>
              </span>
            </h1>
            <p className="rise mt-6 max-w-[54ch] text-lg leading-relaxed text-ink-soft [animation-delay:280ms] sm:text-xl">
              {site.name} designs and builds fast, strategic websites for
              Austin restaurants, service businesses, and growing brands ready
              to move beyond average, because your next customer is
              already deciding online.
            </p>
            <div className="rise mt-8 flex flex-wrap items-center gap-4 [animation-delay:400ms]">
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
                className="group block flex-[0_0_82%] snap-center sm:flex-[0_0_48%] md:flex-none"
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

      {/* ── The studio ───────────────────────────────────────────── */}
      <section className="border-t border-line" aria-labelledby="studio-heading">
        <Container className="py-20 lg:py-28">
          <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-14" data-reveal>
            <div className="lg:col-span-4">
              <Eyebrow>The studio</Eyebrow>
              <figure className="mt-6 max-w-[220px]">
                {hasPortrait ? (
                  <div className="overflow-hidden rounded-full border border-line bg-white">
                    <Image
                      src="/about/portrait.jpg"
                      alt={`${site.founder.name}, ${site.founder.role} at ${site.name}`}
                      width={880}
                      height={880}
                      sizes="220px"
                      className="h-full w-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="flex aspect-square items-center justify-center rounded-full border border-line bg-wash">
                    <span
                      aria-hidden="true"
                      className="font-display text-6xl leading-none text-ink/15 italic"
                    >
                      {site.founder.name.charAt(0)}
                    </span>
                  </div>
                )}
                <figcaption className="mt-3 border-t border-line pt-3 text-[13px]">
                  <span className="block font-medium text-ink">{site.founder.name}</span>
                  <span className="block text-ink-soft">{site.founder.role}</span>
                </figcaption>
              </figure>
            </div>

            <div className="lg:col-span-8">
              <h2
                id="studio-heading"
                className="max-w-3xl font-display text-[clamp(1.5rem,1.1rem+1.6vw,2.25rem)] leading-[1.3] tracking-[-0.005em] text-balance"
              >
                Hi, I&apos;m Lawson. I run {site.name} out of Austin, and I
                manage the strategy, design, development, and performance of
                your website with precision.
              </h2>
              <div className="mt-6 max-w-2xl space-y-4 leading-relaxed text-ink-soft">
                <p>
                  I grew up in Austin and spent most of my working life inside
                  the kinds of businesses I now build websites for: a
                  restaurant, car detailing, a country club retail floor, a desk
                  where the whole job was explaining complicated things in plain
                  English. I know what a Saturday rush looks like, and what it
                  costs when a customer can&apos;t find a menu, a price, or a way
                  to book.
                </p>
                <p>
                  I make it an absolute priority to be responsive and work with
                  my clients to ensure a strong product and effective results.
                  Send me an inquiry and let&apos;s get started.
                </p>
              </div>
              <div className="mt-7">
                <ArrowLink href="/about">More about the studio</ArrowLink>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Featured work ────────────────────────────────────────── */}
      <section className="border-t border-line" aria-label="Selected work">
        <Container className="py-20 lg:py-28">
          <div className="space-y-20 lg:space-y-28">
            {projects.map((project, i) => (
              <ProjectShowcase key={project.slug} project={project} flip={i % 2 === 1} />
            ))}
          </div>
          <div className="mt-14 border-t border-line pt-6" data-reveal>
            <ArrowLink href="/work">See all work</ArrowLink>
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
          <ul className="stagger mt-12 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3" data-reveal>
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
          <ol className="stagger mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-5" data-reveal>
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
          <ul className="stagger mt-12 grid gap-x-14 sm:grid-cols-2" data-reveal>
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
