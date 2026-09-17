import { resources } from "@/content/resources";
import { Container } from "@/components/container";
import { SectionHeading, Eyebrow } from "@/components/section-heading";
import { ArrowLink } from "@/components/button";
import { CtaBand } from "@/components/cta-band";
import { JsonLd } from "@/components/json-ld";
import { buildMetadata } from "@/lib/seo";
import { webPageSchema } from "@/lib/schema";
const page = { title: "Website Guides for Business Owners", description: "Practical guides to website budgets, restaurant design, local SEO, and redesigns. Clear answers from an Austin web designer, written for business owners.", path: "/resources" };
export const metadata = buildMetadata(page);
export default function ResourcesPage() {
  const categories = [...new Set(resources.map((r) => r.category))];
  return <>
    <Container className="pt-12 pb-16 sm:pt-16 lg:pt-20"><SectionHeading as="h1" entrance="rise" eyebrow="The field notes" title={<>Better questions. <em>Better websites.</em></>} lede="Practical reading for the decisions before, during, and after a website project. Budgets, guest journeys, search, and the details that make a launch work." />
      <nav aria-label="Resource topics" className="mt-8 flex flex-wrap gap-3">{categories.map((c, i) => <a key={c} href={`#topic-${i}`} className="rounded-full border border-line px-4 py-2 text-sm hover:border-ink">{c}</a>)}</nav>
    </Container>
    {categories.map((category, i) => <section key={category} id={`topic-${i}`} className="scroll-mt-24 border-t border-line"><Container className="grid gap-8 py-12 lg:grid-cols-[1fr_3fr]"><Eyebrow as="h2">{category}</Eyebrow><div className="grid gap-10 sm:grid-cols-2">{resources.filter((r) => r.category === category).map((r) => <article key={r.slug}><h3 className="font-display text-2xl leading-snug">{r.title}</h3><p className="mt-3 text-sm leading-relaxed text-ink-soft">{r.description}</p><ArrowLink className="mt-5" href={`/resources/${r.slug}`}>Read the guide</ArrowLink></article>)}</div></Container></section>)}
    <CtaBand title={<>Have a question about <em>your website?</em></>} copy="Send the website and the decision you’re trying to make. I’ll help you work out what matters for your business." />
    <JsonLd data={webPageSchema({...page,type:"CollectionPage", dateModified:"2026-09-16"})} />
  </>;
}
