import type { Metadata } from "next";
import { site } from "@/config/site";
import { projects } from "@/content/projects";
import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { ProjectShowcase } from "@/components/project-showcase";
import { CtaBand } from "@/components/cta-band";
import { JsonLd } from "@/components/json-ld";
import { buildMetadata } from "@/lib/seo";
import { webPageSchema } from "@/lib/schema";

const page = {
  title: "Web Design Portfolio: Austin Businesses",
  description:
    "Website case studies for Austin businesses: Manuel's, TRZ Shine & Detail, and CleanZ ATX. How strategy, design, and development turn visitors into customers.",
  path: "/work",
};

export const metadata: Metadata = buildMetadata(page);

export default function WorkPage() {
  return (
    <>
      <section>
        <Container className="pt-12 pb-20 sm:pt-16 lg:pt-20 lg:pb-28">
          <SectionHeading
            as="h1"
            entrance="rise"
            eyebrow="Work"
            title="Websites for Austin businesses, judged by one standard: does the site win the customer?"
            lede="Every project here belongs to an Austin-area business owner with a reputation on the line. I judge the work the way they do, by whether visitors turn into diners, bookings, and quote requests."
          />
          <div className="mt-16 space-y-20 lg:mt-24 lg:space-y-28">
            {projects.map((project, i) => (
              <ProjectShowcase
                key={project.slug}
                project={project}
                flip={i % 2 === 1}
                priority={i === 0}
                headingLevel="h2"
              />
            ))}
          </div>
        </Container>
      </section>
      <CtaBand
        eyebrow="Your project"
        title={
          <>
            The next case study could be <em>your business.</em>
          </>
        }
      />

      <JsonLd
        data={webPageSchema({ ...page, type: "CollectionPage", dateModified: site.contentUpdated })}
      />
    </>
  );
}
