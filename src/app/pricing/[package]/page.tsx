import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { packages, formatPrice, pricingFaqs } from "@/content/pricing";
import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { ArrowLink, ButtonLink } from "@/components/button";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { FaqList } from "@/components/faq-list";
import { JsonLd } from "@/components/json-ld";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { site } from "@/config/site";
type Props = { params: Promise<{ package: string }> };
export function generateStaticParams() {
  return packages.map((p) => ({ package: p.id }));
}
const positioning = {
  launch: {
    title: "Start with the essentials.",
    body: "A focused introduction for a new business, with the information customers need and a direct way to get in touch.",
    prepare:
      "Bring your logo, final text, and photos. We organize up to five sections on one page, agree on the direction, and use one revision round to refine it.",
    fit: "A clear service offering, a short story, and one main action. If you need separate pages for several services or locations, explore Growth.",
  },
  growth: {
    title: "Give your business room.",
    body: "A complete website for an established business, with enough space to explain your services and guide visitors toward an inquiry.",
    prepare:
      "Bring your existing brand materials, service details, and photography. We shape a sitemap of up to five core pages, refine your source copy, and work through two revision rounds.",
    fit: "A business with multiple services, a team to introduce, or a booking or quote path that deserves its own page. Integrations are agreed before the build.",
  },
  custom: {
    title: "Make something distinct.",
    body: "For a larger vision, a more involved customer journey, or features that need an individually planned build.",
    prepare:
      "Start with your goals and the systems the website needs to work with. Discovery defines the sitemap, visual direction, integrations, and deliverables before a proposal sets the final price.",
    fit: "A custom content structure, advanced interactions, or a CMS when editing is part of the agreed scope. Third-party fees and specialist functionality are identified in the proposal.",
  },
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { package: id } = await params;
  const p = packages.find((p) => p.id === id);
  return p
    ? buildMetadata({
        title: `${p.name} Website Package: ${p.price}`,
        description: `${p.bestFor} Explore the ${p.name} website package at ${p.price}, plus ${formatPrice(p.hosting.monthlyPrice)}/month hosting.`,
        path: `/pricing/${id}`,
      })
    : {};
}
export default async function PackagePage({ params }: Props) {
  const { package: id } = await params;
  const p = packages.find((p) => p.id === id);
  if (!p) notFound();
  const content = positioning[p.id];
  const path = `/pricing/${p.id}`;
  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Pricing", href: "/pricing" },
    { label: p.name },
  ];
  return (
    <>
      <Container className="pt-12 pb-20 lg:pt-20">
        <Breadcrumbs items={crumbs} />
        <div className="mt-10 grid items-start gap-12 lg:grid-cols-[1.3fr_1fr]">
          <SectionHeading
            as="h1"
            entrance="rise"
            eyebrow={`${p.name} website package`}
            title={content.title}
            lede={content.body}
          />
          <aside className="border-t-2 border-accent bg-wash p-8">
            <p className="kicker text-accent">Your investment</p>
            <p className="mt-6 font-display text-6xl">{p.price}</p>
            <p className="mt-2 text-sm text-ink-soft">
              One-time build + {formatPrice(p.hosting.monthlyPrice)}/month
              hosting
            </p>
            <p className="mt-5 text-sm leading-relaxed text-ink-soft">
              {p.hosting.changeAllowance}
              {p.id === "growth" ? ". Up to 15 minutes each." : "."}
            </p>
            <ButtonLink href={p.cta.href} className="mt-7 w-full">
              {p.cta.label}
            </ButtonLink>
            <p className="mt-5 text-xs leading-relaxed text-ink-soft">
              Typical build: {p.timeline}. Final timing depends on scope,
              content, and feedback.
            </p>
          </aside>
        </div>
        <div className="mt-16 grid gap-10 border-t border-line pt-10 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <p className="kicker text-accent">Built for this stage</p>
            <h2 className="mt-4 font-display text-4xl">The right fit.</h2>
            <p className="mt-5 max-w-lg leading-relaxed text-ink-soft">
              {content.fit}
            </p>
          </div>
          <div>
            <h2 className="font-display text-3xl">What&apos;s in the build</h2>
            <ul className="mt-6 grid gap-x-7 sm:grid-cols-2">
              {p.includes.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 border-t border-line py-3 text-sm leading-relaxed"
                >
                  <span aria-hidden="true" className="text-accent">
                    ↗
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-14 grid gap-10 border-t border-line pt-10 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl">How we get there.</h2>
            <p className="mt-4 leading-relaxed text-ink-soft">
              {content.prepare}
            </p>
          </div>
          <div>
            <h2 className="font-display text-3xl">After the launch.</h2>
            <p className="mt-4 leading-relaxed text-ink-soft">
              {p.hosting.detail}
            </p>
            <p className="mt-4 text-sm text-ink-soft">
              Domains, email, and paid tools are extra. Unused update time does
              not roll over. Work beyond your plan is quoted before it begins.
            </p>
            <div className="mt-5">
              <ArrowLink href="/hosting">
                Hosting details & support limits
              </ArrowLink>
            </div>
          </div>
        </div>
        <div className="mt-14">
          <FaqList
            faqs={pricingFaqs.filter((f) =>
              [
                "What do I need to have ready before we start?",
                "How do payments work?",
                "What if I need more pages or features later?",
              ].includes(f.question),
            )}
          />
        </div>
        <div className="mt-10 flex flex-wrap gap-7">
          {packages
            .filter((other) => other.id !== p.id)
            .map((other) => (
              <ArrowLink key={other.id} href={`/pricing/${other.id}`}>
                Explore {other.name}
              </ArrowLink>
            ))}
        </div>
      </Container>
      <JsonLd
        data={[
          webPageSchema({
            title: `${p.name} website package`,
            description: content.body,
            path,
            dateModified: site.contentUpdated,
          }),
          breadcrumbSchema(crumbs, path),
        ]}
      />
    </>
  );
}
