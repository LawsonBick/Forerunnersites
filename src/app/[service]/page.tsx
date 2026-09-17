import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { landingPages, getLandingPage } from "@/content/landing-pages";
import { getProject } from "@/content/projects";
import { getResource } from "@/content/resources";
import { Container } from "@/components/container";
import { SectionHeading, Eyebrow } from "@/components/section-heading";
import { ButtonLink, ArrowLink } from "@/components/button";
import { Breadcrumbs, type Crumb } from "@/components/breadcrumbs";
import { FaqList } from "@/components/faq-list";
import { CtaBand } from "@/components/cta-band";
import { JsonLd } from "@/components/json-ld";
import { buildMetadata, absoluteUrl } from "@/lib/seo";
import { webPageSchema, breadcrumbSchema, ids } from "@/lib/schema";

type Props = { params: Promise<{ service: string }> };
export function generateStaticParams() { return landingPages.map((p) => ({ service: p.slug })); }
export const dynamicParams = false;
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = getLandingPage((await params).service);
  return page ? buildMetadata({ ...page, path: `/${page.slug}` }) : {};
}
export default async function ServicePage({ params }: Props) {
  const page = getLandingPage((await params).service);
  if (!page) notFound();
  const path = `/${page.slug}`;
  const crumbs: Crumb[] = [{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: page.title }];
  const work = page.projectSlugs.map(getProject).filter((p) => p !== undefined);
  const reading = page.resourceSlugs.map(getResource).filter((r) => r !== undefined);
  const featured = work[0];
  return <>
    <section><Container className="pt-10 pb-16 sm:pt-16 lg:pb-24">
      <Breadcrumbs items={crumbs} />
      <div className={`mt-8 grid gap-12 ${page.variant === "restaurant" ? "lg:grid-cols-2 lg:items-center" : ""}`}>
        <div>
          <SectionHeading as="h1" entrance="rise" eyebrow={page.eyebrow} title={page.headline} lede={page.intro} />
          <div className="mt-8 flex flex-wrap gap-4"><ButtonLink href="/contact">Start a Project</ButtonLink><ButtonLink variant="secondary" href="/pricing">Compare packages</ButtonLink></div>
          <p className="mt-5 text-sm text-ink-soft">Strategy, design, and development with Lawson Bickerstaff.</p>
        </div>
        {page.variant === "restaurant" && featured ? <div className="rounded-[6px] p-5 sm:p-8" style={{ backgroundColor: featured.palette.panel }}>
          <Image src={featured.images.desktop.src} alt={featured.images.desktop.alt} width={2600} height={1625} sizes="(min-width: 1024px) 45vw, 92vw" preload className="h-auto w-full rounded-[4px]" />
          <p className="mt-4 text-sm" style={{ color: featured.palette.panelFg }}>Featured work: Manuel&apos;s, Austin</p>
        </div> : null}
      </div>
      <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 border-t border-line pt-5" aria-label="Related work">
        {work.map((p) => <ArrowLink key={p.slug} href={`/work/${p.slug}`}>{p.name} · {p.industry}</ArrowLink>)}
      </div>
    </Container></section>
    <section className="border-y border-line bg-wash"><Container className="py-16 lg:py-24">
      <SectionHeading eyebrow={page.variant === "redesign" ? "Before the rebuild" : "The decisions that matter"} title={page.decisionTitle} lede={page.decisionCopy} />
      {page.variant === "redesign" ? <ol className="mt-10 divide-y divide-line">
        {page.priorities.map((item, i) => <li key={item.title} className="grid gap-4 py-7 sm:grid-cols-[3rem_1fr] lg:grid-cols-[3rem_1fr_1.4fr]">
          <span className="text-sm font-medium text-accent">0{i + 1}</span><h3 className="font-display text-2xl">{item.title}</h3><p className="leading-relaxed text-ink-soft">{item.body}</p>
        </li>)}
      </ol> : <div className={`mt-10 grid gap-x-12 gap-y-8 ${page.variant === "business" ? "lg:grid-cols-2" : "sm:grid-cols-2"}`}>
        {page.priorities.map((item) => <div key={item.title} className={page.variant === "business" ? "rounded-[6px] border border-line bg-paper p-6" : "border-t border-line pt-6"}><h3 className="font-display text-2xl">{item.title}</h3><p className="mt-3 leading-relaxed text-ink-soft">{item.body}</p></div>)}
      </div>}
    </Container></section>
    <section><Container className="py-16 lg:py-24">
      <SectionHeading eyebrow="Relevant work" title={page.variant === "restaurant" ? "See the decisions in the Manuel’s website." : "Real businesses, with different jobs to do."} />
      <div className={`mt-10 grid gap-8 ${work.length > 1 ? "md:grid-cols-2" : ""} ${work.length === 3 ? "lg:grid-cols-3" : ""}`}>
        {work.map((p) => <div key={p.slug} className={work.length === 1 ? "grid gap-8 lg:grid-cols-2 lg:items-center" : ""}>
          <div className="rounded-[6px] p-5" style={{ backgroundColor: p.palette.panel }}><Image src={p.images.desktop.src} alt={p.images.desktop.alt} width={2600} height={1625} sizes="(min-width: 1024px) 40vw, 92vw" className="h-auto w-full rounded-[3px]" /></div>
          <div><h3 className="mt-5 font-display text-2xl">{p.name}</h3><p className="mt-2 text-sm leading-relaxed text-ink-soft">{p.shortSolution}</p><ArrowLink className="mt-4" href={`/work/${p.slug}`}>Read the {p.name} case study</ArrowLink></div>
        </div>)}
      </div>
    </Container></section>
    <section className="border-y border-line bg-wash"><Container className="py-16 lg:py-24">
      <SectionHeading eyebrow="How we work" title="A clear scope before the first page is built." />
      <ol className="mt-10 grid gap-8 md:grid-cols-3">{page.process.map((step, i) => <li key={step.title} className="border-t-2 border-ink pt-5"><p className="text-sm text-accent">0{i + 1}</p><h3 className="mt-3 font-display text-2xl">{step.title}</h3><p className="mt-3 leading-relaxed text-ink-soft">{step.body}</p></li>)}</ol>
      <ArrowLink className="mt-8" href="/about">Meet the person building your website</ArrowLink>
    </Container></section>
    <section><Container className="py-16 lg:py-24"><SectionHeading eyebrow="Questions before you start" title="The practical details." /><div className="mt-8"><FaqList faqs={page.faqs} /></div></Container></section>
    <section className="border-t border-line"><Container className="pb-16 pt-10"><Eyebrow as="h2">Useful reading</Eyebrow><div className="mt-5 grid gap-6 sm:grid-cols-2">{reading.map((r) => <div key={r.slug}><h3 className="font-display text-xl">{r.title}</h3><p className="mt-2 text-sm leading-relaxed text-ink-soft">{r.description}</p><ArrowLink className="mt-3" href={`/resources/${r.slug}`}>Read the guide</ArrowLink></div>)}</div></Container></section>
    <CtaBand eyebrow="Your next step" title={<>Tell me what your website <em>needs to do.</em></>} copy="Send your current site, the customers you want to reach, and the problem you want to solve. I’ll help define a useful scope and a clear next step." />
    <JsonLd data={[webPageSchema({path, title:page.title, description:page.description, dateModified:page.updated, breadcrumbs:crumbs}), breadcrumbSchema(crumbs,path), {
      "@type":"Service", "@id":`${absoluteUrl(path)}#service`, url:absoluteUrl(path), name:page.title, description:page.description, provider:{"@id":ids.organization}, areaServed:{"@type":"City",name:"Austin", containedInPlace:{"@type":"State",name:"Texas"}}, mainEntityOfPage:{"@id":`${absoluteUrl(path)}#webpage`},
    }]} />
  </>;
}
