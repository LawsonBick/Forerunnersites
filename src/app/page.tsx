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
    "Distinctive websites for Austin businesses, designed and built by Lawson Bickerstaff. Explore real work. Website builds from $500, with hosting from $50/month.",
  path: "/",
};
export const metadata: Metadata = buildMetadata(page);
export default function HomePage() {
  return (
    <>
      <section className="home-hero relative overflow-hidden">
        <Container className="grid items-center gap-12 pt-6 pb-14 lg:grid-cols-[1.04fr_1fr] lg:gap-12 lg:pt-12 lg:pb-20">
          <div>
            <Eyebrow className="rise [&>span]:bg-brand">
              Independent web studio / Austin, TX
            </Eyebrow>
            <h1 className="hero-title mt-5 uppercase">
              <span className="mask-line">
                <span className="mask-line-inner">Modern businesses</span>
              </span>
              <br />
              <span className="mask-line">
                <em
                  className="mask-line-inner text-black"
                  style={{ animationDelay: "70ms" }}
                >
                  Modern websites
                </em>
              </span>
            </h1>
            <p className="rise mt-7 max-w-[350px] text-base leading-relaxed text-ink-soft">
              Distinctive websites for businesses doing great things. Designed
              to get noticed. Built to bring people in.
            </p>
            <div className="rise mt-8 flex flex-wrap items-center gap-6">
              <ButtonLink href="/contact">
                Let&apos;s build your site <span aria-hidden="true">↗</span>
              </ButtonLink>
              <ArrowLink href="#selected-work">Explore the work</ArrowLink>
            </div>
            <p className="rise mt-6 text-[11px] text-ink-soft">
              Design, development & a direct line to your designer.
            </p>
          </div>
          <div className="hero-visual rise">
            <ProjectReel
              projects={projects.map(({ slug, name, images, displayUrl }) => ({
                slug,
                name,
                images,
                displayUrl,
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
        <Container>
          <div className="client-line flex flex-wrap items-center justify-between gap-x-8 gap-y-5 border-t border-line py-7">
            <p className="kicker text-ink-soft">A few familiar faces</p>
            {projects.map((p) => (
              <Link
                key={p.slug}
                href={`/work/${p.slug}`}
                className="font-display text-xl tracking-tight transition-colors hover:text-ink"
              >
                {p.name}
              </Link>
            ))}
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
