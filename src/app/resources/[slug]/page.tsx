import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { site } from "@/config/site";
import { resources, getResource } from "@/content/resources";
import { getLandingPage } from "@/content/landing-pages";
import { Container } from "@/components/container";
import { SectionHeading, Eyebrow } from "@/components/section-heading";
import { ArrowLink } from "@/components/button";
import { Breadcrumbs, type Crumb } from "@/components/breadcrumbs";
import { CtaBand } from "@/components/cta-band";
import { JsonLd } from "@/components/json-ld";
import { absoluteUrl, buildMetadata, defaultShareImage } from "@/lib/seo";
import { breadcrumbSchema, ids, webPageSchema } from "@/lib/schema";
type Props = { params: Promise<{slug: string}> };
export const dynamicParams = false;
export function generateStaticParams() { return resources.map((r) => ({ slug:r.slug })); }
export async function generateMetadata({params}: Props): Promise<Metadata> {
  const r = getResource((await params).slug); if (!r) return {};
  const meta = buildMetadata({title:r.seoTitle,description:r.description,path:`/resources/${r.slug}`,ogType:"article"});
  return {...meta, authors:[{name:site.founder.name,url:absoluteUrl("/about")}], openGraph:{...meta.openGraph,type:"article",publishedTime:r.published,modifiedTime:r.modified,authors:[absoluteUrl("/about")]}};
}
function displayDate(date: string) { return new Intl.DateTimeFormat("en-US", {month:"long",day:"numeric",year:"numeric",timeZone:"UTC"}).format(new Date(date)); }
export default async function ResourcePage({params}: Props) {
  const r = getResource((await params).slug); if (!r) notFound();
  const path = `/resources/${r.slug}`;
  const crumbs: Crumb[] = [{label:"Home",href:"/"},{label:"Resources",href:"/resources"},{label:r.title}];
  const related = r.related.map(getResource).filter((v) => v !== undefined);
  const service = getLandingPage(r.serviceSlug)!;
  return <>
    <article><Container className="pt-10 pb-16 sm:pt-16 lg:pt-20">
      <Breadcrumbs items={crumbs} />
      <div className="mt-8"><SectionHeading as="h1" entrance="rise" eyebrow={r.category} title={r.title} lede={r.intro} /></div>
      <p className="mt-6 text-sm leading-relaxed text-ink-soft">By <Link href="/about" className="underline underline-offset-4">{site.founder.name}</Link> · Published <time dateTime={r.published}>{displayDate(r.published)}</time>{r.modified !== r.published ? <> · Updated <time dateTime={r.modified}>{displayDate(r.modified)}</time></> : null}</p>
      <div className="mt-12 grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.4fr)]">
        <nav aria-label="Table of contents" className="border-t border-line pt-5 lg:sticky lg:top-28"><Eyebrow>In this guide</Eyebrow><ol className="mt-4 space-y-3">{r.sections.map((s) => <li key={s.id}><a className="text-sm leading-relaxed text-ink-soft underline-offset-4 hover:text-ink hover:underline" href={`#${s.id}`}>{s.title}</a></li>)}</ol></nav>
        <div className="min-w-0 max-w-3xl">{r.sections.map((s) => <section key={s.id} id={s.id} className="scroll-mt-28 border-t border-line pb-10 pt-6">
          <h2 className="font-display text-2xl leading-snug sm:text-3xl">{s.title}</h2>
          {s.paragraphs.map((p) => <p key={p.slice(0,55)} className="mt-5 leading-[1.8] text-ink-soft">{p}</p>)}
          {s.checklist ? <ul className="mt-6 space-y-3 rounded-[6px] border border-line bg-wash p-5 sm:p-7">{s.checklist.map((item) => <li key={item} className="flex gap-3 text-sm leading-relaxed"><span aria-hidden="true" className="text-ink">□</span>{item}</li>)}</ul> : null}
          {s.links ? <div className="mt-5 flex flex-col items-start gap-3">{s.links.map((link) => <ArrowLink key={link.href} href={link.href} external={link.href.startsWith("https:")}>{link.label}</ArrowLink>)}</div> : null}
        </section>)}</div>
      </div>
      <aside className="mt-6 border-t border-line pt-8"><h2 className="font-display text-2xl">Put the guide to work.</h2><p className="mt-3 max-w-2xl leading-relaxed text-ink-soft">See how these decisions fit a real project, with scope, relevant work, and a clear next step.</p><ArrowLink className="mt-4" href={`/${service.slug}`}>{service.title}</ArrowLink></aside>
    </Container></article>
    <section className="border-t border-line bg-wash"><Container className="py-12"><Eyebrow as="h2">Keep reading</Eyebrow><div className="mt-6 grid gap-8 sm:grid-cols-2">{related.map((item) => <div key={item.slug}><h3 className="font-display text-xl">{item.title}</h3><ArrowLink className="mt-3" href={`/resources/${item.slug}`}>Read the guide</ArrowLink></div>)}</div></Container></section>
    <CtaBand title={<>A practical plan for <em>your next website.</em></>} copy="Tell me about your business, your current website, and what needs to work better. We’ll start with the scope." />
    <JsonLd data={[webPageSchema({path,title:r.title,description:r.description,dateModified:r.modified,breadcrumbs:crumbs}),breadcrumbSchema(crumbs,path),{
      "@type":"Article","@id":`${absoluteUrl(path)}#article`,headline:r.title,description:r.description,datePublished:r.published,dateModified:r.modified,author:{"@id":ids.founder,"@type":"Person",name:site.founder.name,url:absoluteUrl("/about")},publisher:{"@id":ids.organization},mainEntityOfPage:{"@id":`${absoluteUrl(path)}#webpage`},image:absoluteUrl(defaultShareImage.url),inLanguage:"en-US",articleSection:r.category,
    }]} />
  </>;
}
