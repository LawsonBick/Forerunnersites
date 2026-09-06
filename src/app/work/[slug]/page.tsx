import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, projects, relatedProjects } from "@/content/projects";
import { services } from "@/content/services";
import { Container } from "@/components/container";
import { ButtonLink, ArrowLink } from "@/components/button";
import { Eyebrow } from "@/components/section-heading";
import { BrowserFrame, PhoneFrame } from "@/components/frames";
import { Tag } from "@/components/tag";
import { CtaBand } from "@/components/cta-band";
import { Breadcrumbs, type Crumb } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, caseStudySchema, webPageSchema } from "@/lib/schema";
import { slugify } from "@/lib/slug";

interface Params {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return buildMetadata({
    title: project.seo.title,
    description: project.seo.description,
    path: `/work/${project.slug}`,
    ogType: "article",
    image: {
      url: project.images.desktop.src,
      width: 2600,
      height: 1625,
      alt: project.images.desktop.alt,
    },
  });
}

/** Service tags deep-link to the matching entry on the services page when one exists. */
const serviceAnchors = new Set(services.map((s) => slugify(s.title)));

/** A labeled prose block: label rail on the left, content on the right. */
function CaseSection({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-6 border-t border-line py-12 lg:grid-cols-12 lg:py-16" data-reveal>
      <div className="lg:col-span-3">
        <Eyebrow as="h2">{label}</Eyebrow>
      </div>
      <div className="lg:col-span-9">{children}</div>
    </div>
  );
}

export default async function CaseStudyPage({ params }: Params) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const related = relatedProjects(project.slug);
  const path = `/work/${project.slug}`;
  const crumbs: Crumb[] = [
    { label: "Home", href: "/" },
    { label: "Work", href: "/work" },
    { label: project.name },
  ];

  return (
    <>
      <article>
        {/* Header */}
        <Container className="pt-12 sm:pt-16 lg:pt-20">
          <div className="rise">
            <Breadcrumbs items={crumbs} />
            <div className="mt-8 flex flex-wrap items-baseline justify-between gap-4">
              <h1 className="font-display text-[clamp(2.4rem,1.4rem+3.8vw,4.25rem)] leading-[1.05] tracking-[-0.015em]">
                {project.name}
              </h1>
              <Tag>{project.industry}</Tag>
            </div>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft sm:text-xl">
              {project.tagline}
            </p>
          </div>

          <dl className="rise mt-10 grid grid-cols-2 gap-6 border-t border-line pt-6 [animation-delay:100ms] sm:grid-cols-4">
            <div>
              <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-soft">
                Industry
              </dt>
              <dd className="mt-1.5 text-sm font-medium">{project.industry}</dd>
            </div>
            <div>
              <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-soft">
                Location
              </dt>
              <dd className="mt-1.5 text-sm font-medium">{project.location}</dd>
            </div>
            <div>
              <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-soft">
                Scope
              </dt>
              <dd className="mt-1.5 text-sm font-medium">
                {project.services.length} services delivered
              </dd>
            </div>
            <div>
              <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-soft">
                Live site
              </dt>
              <dd className="mt-1.5">
                <ArrowLink href={project.url} external className="text-sm">
                  {project.displayUrl}
                </ArrowLink>
              </dd>
            </div>
          </dl>
        </Container>

        {/* Hero screenshot on the client's brand panel */}
        <Container className="mt-12">
          <div
            className="rise rounded-[6px] p-4 [animation-delay:150ms] sm:p-10 lg:p-14"
            style={{ backgroundColor: project.palette.panel }}
          >
            <BrowserFrame
              src={project.images.desktop.src}
              alt={project.images.desktop.alt}
              width={2600}
              height={1625}
              sizes="(min-width: 1280px) 1140px, 92vw"
              url={project.displayUrl}
              priority
            />
          </div>
        </Container>

        {/* Narrative */}
        <Container className="mt-16 lg:mt-20">
          <CaseSection label="Overview">
            <p className="max-w-3xl text-lg leading-relaxed">{project.overview}</p>
          </CaseSection>

          <CaseSection label="The challenge">
            <p className="max-w-3xl leading-relaxed text-ink-soft">{project.challenge}</p>
          </CaseSection>

          <CaseSection label="The approach">
            <p className="max-w-3xl leading-relaxed text-ink-soft">{project.approach}</p>
          </CaseSection>

          <CaseSection label="Design direction">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
              <p className="leading-relaxed text-ink-soft">{project.designDirection}</p>
              <div
                className="rounded-[6px] p-4 sm:p-6"
                style={{ backgroundColor: project.palette.panel }}
              >
                <BrowserFrame
                  src={project.images.tall.src}
                  alt={project.images.tall.alt}
                  width={1800}
                  height={2700}
                  sizes="(min-width: 1024px) 34vw, 92vw"
                  url={project.displayUrl}
                />
              </div>
            </div>
          </CaseSection>

          <CaseSection label="Core functionality">
            <ul className="grid gap-x-10 sm:grid-cols-2">
              {project.functionality.map((f) => (
                <li key={f.title} className="border-t border-line py-5">
                  <h3 className="text-[15px] font-medium">{f.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{f.detail}</p>
                </li>
              ))}
            </ul>
          </CaseSection>

          <CaseSection label="Mobile experience">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
              <p className="leading-relaxed text-ink-soft">{project.mobile}</p>
              <div
                className="flex justify-center rounded-[6px] px-6 py-10"
                style={{ backgroundColor: project.palette.panel }}
              >
                <PhoneFrame
                  src={project.images.mobile.src}
                  alt={project.images.mobile.alt}
                  width={860}
                  height={1864}
                  sizes="260px"
                  className="w-full max-w-[260px]"
                />
              </div>
            </div>
          </CaseSection>

          <CaseSection label="The outcome">
            <p className="max-w-3xl text-lg leading-relaxed">{project.outcome}</p>
            <div className="mt-8">
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-soft">
                Services delivered
              </h3>
              <ul className="mt-3 flex max-w-2xl flex-wrap gap-2">
                {project.services.map((s) => {
                  const anchor = slugify(s);
                  return (
                    <li key={s}>
                      {serviceAnchors.has(anchor) ? (
                        <Link
                          href={`/services#${anchor}`}
                          className="inline-block transition-colors hover:text-ink"
                        >
                          <Tag className="hover:border-ink/40">{s}</Tag>
                        </Link>
                      ) : (
                        <Tag>{s}</Tag>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="mt-9">
              <ButtonLink href={project.url} external variant="secondary">
                Visit {project.displayUrl}
                <span aria-hidden="true">↗</span>
              </ButtonLink>
            </div>
          </CaseSection>
        </Container>

        {/* Related projects */}
        <section className="border-t border-line bg-wash" aria-labelledby="related-heading">
          <Container className="py-16 lg:py-20">
            <h2
              id="related-heading"
              className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-soft"
            >
              More work
            </h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2" data-reveal>
              {related.map((p) => (
                <Link
                  key={p.slug}
                  href={`/work/${p.slug}`}
                  className="group flex items-center gap-5 rounded-[6px] border border-line bg-white p-5 transition-colors hover:border-ink/30"
                >
                  <span
                    aria-hidden="true"
                    className="h-14 w-14 shrink-0 rounded-[4px]"
                    style={{ backgroundColor: p.palette.panel }}
                  >
                    <span
                      className="mt-4 ml-4 block h-[7px] w-[7px]"
                      style={{ backgroundColor: p.palette.accent }}
                    />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-display text-xl group-hover:underline group-hover:underline-offset-4">
                      {p.name}
                    </span>
                    <span className="mt-0.5 block truncate text-sm text-ink-soft">
                      {p.industry}
                    </span>
                  </span>
                  <span
                    aria-hidden="true"
                    className="ml-auto text-ink-faint transition-transform duration-200 group-hover:translate-x-0.5"
                  >
                    →
                  </span>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      </article>

      <CtaBand
        eyebrow="Your project"
        title={
          <>
            Want a site that does this <em>for your business?</em>
          </>
        }
        copy="Tell me what you do and who your customers are. You'll get an honest read on what a site like this would involve: scope, timeline, and price."
      />

      <JsonLd
        data={[
          webPageSchema({
            path,
            title: project.seo.title,
            description: project.seo.description,
            type: "ItemPage",
            image: project.images.desktop.src,
            dateModified: project.updated,
            breadcrumbs: crumbs,
          }),
          breadcrumbSchema(crumbs, path),
          caseStudySchema(project),
        ]}
      />
    </>
  );
}
