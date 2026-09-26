import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/container";
import { ButtonLink, ArrowLink } from "@/components/button";
import { SectionHeading, Eyebrow } from "@/components/section-heading";
import { ProjectShowcase } from "@/components/project-showcase";
import { ProjectReel } from "@/components/project-reel";
import { PricingCards } from "@/components/pricing-cards";
import { CtaBand } from "@/components/cta-band";
import { JsonLd } from "@/components/json-ld";
import { projects } from "@/content/projects";
import { site } from "@/config/site";
import { buildMetadata } from "@/lib/seo";
import { webPageSchema } from "@/lib/schema";
const page = {
  title: "Austin Web Design for Small Businesses",
  description:
    "Fast, affordable websites for Austin home-service businesses, with AI automation for missed calls, lead follow-up, reviews, and bookings. Website builds from $500.",
  path: "/",
};
export const metadata: Metadata = buildMetadata(page);
export default function HomePage() {
  return (
    <>
      <section className="home-hero relative overflow-hidden">
        <Container className="grid items-center gap-12 pt-6 pb-14 lg:grid-cols-[1.04fr_1fr] lg:gap-12 lg:pt-12 lg:pb-20">
          <div>
            <Eyebrow className="rise [&>span]:shrink-0 [&>span]:bg-brand">
              Websites + AI automation for Austin&apos;s home-service pros
            </Eyebrow>
            <h1 className="hero-title mt-5 uppercase">
              <span className="mask-line">
                <span className="mask-line-inner">A website that</span>
              </span>
              {" "}
              <span className="mask-line">
                <em
                  className="mask-line-inner text-black"
                  style={{ animationDelay: "70ms" }}
                >
                  actually brings you work.
                </em>
              </span>
            </h1>
            <p className="rise mt-7 max-w-lg text-base leading-relaxed text-ink-soft">
              We design fast, affordable websites for local businesses — then
              wire them up with automation that answers missed calls, follows up
              on quotes, and books jobs while you&apos;re on the tools. You do the
              work. Your website handles the rest.
            </p>
            <div className="rise mt-8 flex flex-wrap items-center gap-6">
              <ButtonLink href="/contact">
                Let&apos;s build your site <span aria-hidden="true">↗</span>
              </ButtonLink>
              <ArrowLink href="/automation">See Automation</ArrowLink>
            </div>
            <p className="rise mt-6 text-[11px] text-ink-soft">
              Design, development & a direct line to your designer.
            </p>
          </div>
          <div className="hero-visual rise">
            <ProjectReel
              projects={projects.map(({ slug, name, images, displayUrl, url }) => ({
                slug,
                name,
                images,
                displayUrl,
                url,
              }))}
            />
            <div className="hero-visual-note">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Real websites. Real local businesses.
              <span aria-hidden="true" className="ml-auto">
                ↓
              </span>
            </div>
          </div>
        </Container>
      </section>
      <section
        id="selected-work"
        className="scroll-mt-24 border-t border-line py-20 lg:py-28"
      >
        <Container>
          <div className="mb-16 flex flex-wrap items-end justify-between gap-8">
            <SectionHeading
              eyebrow="Selected work / 01—04"
              title={
                <>
                  Good work deserves
                  <br />
                  <em>a great website.</em>
                </>
              }
            />
            <p
              className="max-w-xs text-sm leading-relaxed text-ink-soft"
              data-reveal="right"
            >
              Restaurants. Local services. Growing businesses. Every experience
              starts with what makes them different.
            </p>
          </div>
          <div className="space-y-20 lg:space-y-28">
            {projects.map((p, i) => (
              <ProjectShowcase key={p.slug} project={p} flip={i % 2 === 1} />
            ))}
          </div>
          <div className="mt-12 border-t border-line pt-6">
            <ArrowLink href="/work">The complete portfolio</ArrowLink>
          </div>
        </Container>
      </section>
      <section id="automation" className="border-t border-line py-20 lg:py-28">
        <Container>
          <div className="grid items-end gap-8 lg:grid-cols-2 lg:gap-16">
            <SectionHeading
              eyebrow="Forerunner Automation"
              title="Your website's new superpower."
            />
            <p className="max-w-xl text-base leading-relaxed text-ink-soft" data-reveal="right">
              Most websites just sit there. Ours answer. Add automation to any
              Forerunner site and the follow-up runs itself — no missed calls,
              no cold quotes, no forgotten reviews.
            </p>
          </div>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4" data-reveal="">
            {[
              "Missed-call text-back",
              "Instant lead response",
              "Automatic review requests",
              "Booking reminders",
            ].map((feature, i) => (
              <li key={feature} className="flex items-start gap-3 border-t border-line pt-5">
                <span aria-hidden="true" className="grid size-8 shrink-0 place-items-center rounded-full bg-accent-soft text-xs text-brand">
                  0{i + 1}
                </span>
                <span className="pt-1 text-base font-medium">{feature}</span>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap items-center justify-between gap-6" data-reveal="">
            <p className="text-sm leading-relaxed text-ink-soft">
              Lead Catcher $149/mo · Booking Engine $249/mo · AI Front Desk $397/mo
            </p>
            <ButtonLink href="/automation">How automation works</ButtonLink>
          </div>
        </Container>
      </section>
      <section className="border-y border-line bg-accent-soft py-20 lg:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr]">
            <SectionHeading
              eyebrow="Considered from the first click"
              title={
                <>
                  Looks the part.
                  <br />
                  <em>Does the work.</em>
                </>
              }
            />
            <div data-reveal="right">
              {[
                [
                  "01",
                  "A design that feels like you",
                  "A distinct visual direction, with a clear path from the first impression to the next step.",
                  "/services#custom-web-design",
                  "Explore design & development",
                ],
                [
                  "02",
                  "Built to be found",
                  "Useful service pages, considered structure, and local SEO foundations.",
                  "/austin-web-design",
                  "Web design for Austin businesses",
                ],
                [
                  "03",
                  "Help after launch",
                  "Hosting and a practical level of support, from the person who built your site.",
                  "/hosting",
                  "Hosting & support",
                ],
              ].map(([n, title, copy, href, label]) => (
                <div
                  key={n}
                  className="service-row grid grid-cols-[2rem_1fr] gap-4 border-t border-line py-7"
                >
                  <span className="kicker grid size-8 place-items-center rounded-full bg-accent text-ink">{n}</span>
                  <div>
                    <h3 className="font-display text-3xl">{title}</h3>
                    <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-soft">
                      {copy}
                    </p>
                    <div className="mt-4">
                      <ArrowLink href={href} className="text-xs">
                        {label}
                      </ArrowLink>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>
      <section className="py-20 lg:py-28">
        <Container>
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="A clear starting point"
              title={
                <>
                  Good design.
                  <br />
                  <em>Plain-English pricing.</em>
                </>
              }
            />
            <ArrowLink href="/pricing">Compare your options</ArrowLink>
          </div>
          <PricingCards />
          <p className="mt-5 text-xs leading-relaxed text-ink-soft">
            Hosting is billed monthly from launch. Domains and paid tools are
            extra.{" "}
            <Link
              href="/hosting"
              className="text-ink no-underline"
            >
              See hosting inclusions and limits.
            </Link>
          </p>
        </Container>
      </section>
      <section id="website-automation-bundle" className="border-y border-line bg-wash py-10 lg:py-12">
        <Container className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
          <div className="max-w-3xl" data-reveal="">
            <h2 className="text-balance text-3xl leading-tight tracking-[-0.035em] lg:text-4xl">
              One monthly payment. Zero missed leads.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink-soft">
              Pair any website plan with Lead Catcher and your online presence
              finally works as hard as you do. Website + automation bundles from
              $199/mo.
            </p>
            <p className="mt-3 text-xs text-ink-soft">
              One-time website build and automation setup fees apply separately.
            </p>
          </div>
          <ButtonLink href="/contact?package=automation-bundle" className="self-start whitespace-nowrap lg:self-auto">
            Start a Project
          </ButtonLink>
        </Container>
      </section>
      <section className="border-t border-line py-20 lg:py-28">
        <Container>
          <div className="grid items-center gap-10 md:grid-cols-[.7fr_1.3fr] lg:gap-24">
            <div className="studio-portrait max-w-[340px]" data-reveal="left">
              <div className="studio-photo aspect-[4/5] overflow-hidden rounded-[3px]">
                <Image
                  src="/about/portrait.jpg"
                  alt="Lawson Bickerstaff, founder of Forerunner Sites"
                  width={680}
                  height={800}
                  sizes="(min-width: 768px) 340px, 80vw"
                  className="h-full w-full origin-top scale-125 object-cover object-[46%_top]"
                />
              </div>
              <p className="mt-4 flex justify-between text-[11px] text-ink-soft">
                <span>Lawson Bickerstaff</span>
                <span>Designer & developer</span>
              </p>
            </div>
            <div data-reveal="right">
              <Eyebrow>A small studio. A direct connection.</Eyebrow>
              <h2 className="mt-6 font-display text-[clamp(2.7rem,4.8vw,4.6rem)] leading-[1.04] tracking-[-.035em]">
                The person you talk to
                <br />
                <em className="text-ink no-underline">builds your website.</em>
              </h2>
              <p className="mt-6 max-w-lg text-base leading-relaxed text-ink-soft">
                I&apos;m Lawson. I design and build websites for the kinds of
                businesses that make Austin feel like Austin. Clear
                communication, thoughtful work, and one person accountable from
                the first idea to launch.
              </p>
              <div className="mt-7">
                <ArrowLink href="/about">Meet your designer</ArrowLink>
              </div>
            </div>
          </div>
        </Container>
      </section>
      <CtaBand
        title={
          <>
            Your business.
            <br />
            <em>Seen differently.</em>
          </>
        }
        copy="Tell me what you have in mind. Let’s make a website that feels like the next chapter."
      />
      <JsonLd
        data={webPageSchema({ ...page, dateModified: site.contentUpdated })}
      />
    </>
  );
}
