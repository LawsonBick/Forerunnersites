import { landingPages } from "@/content/landing-pages";
import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { ArrowLink } from "@/components/button";

export function ServiceDirectory() {
  return <section className="border-t border-line bg-wash">
    <Container className="py-16 lg:py-24">
      <SectionHeading eyebrow="Find your starting point" title="Different businesses. Different website decisions." lede="Explore the approach that fits your customers, your stage, and the job your website needs to do." />
      <div className="mt-10 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
        {landingPages.map((page) => <div key={page.slug} className="border-t border-line py-6">
          <h3 className="font-display text-xl">{page.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">{page.description}</p>
          <ArrowLink className="mt-4" href={`/${page.slug}`}>Explore {page.variant === "local" ? "Austin web design" : page.variant === "restaurant" ? "restaurant websites" : page.variant === "service" ? "service business websites" : page.variant === "redesign" ? "website redesigns" : "small business websites"}</ArrowLink>
        </div>)}
      </div>
    </Container>
  </section>;
}
