import type { Metadata } from "next";
import { projects } from "@/content/projects";
import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { ProjectShowcase } from "@/components/project-showcase";
import { CtaBand } from "@/components/cta-band";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected website projects for Austin businesses: Manuel's, TRZ Shine & Detail, and CleanZ ATX. Strategy, design, and development by Forerunner Sites.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <section>
        <Container className="pt-12 pb-20 sm:pt-16 lg:pt-20 lg:pb-28">
          <SectionHeading
            as="h1"
            entrance="rise"
            eyebrow="Work"
            title="Real businesses, measured against a simple standard: does the site win the customer?"
            lede="Every project here belongs to an Austin-area business owner with a reputation on the line. I judge the work the way they do — by whether visitors turn into diners, bookings, and quote requests."
          />
          <div className="mt-16 space-y-20 lg:mt-24 lg:space-y-28">
            {projects.map((project, i) => (
              <ProjectShowcase
                key={project.slug}
                project={project}
                flip={i % 2 === 1}
                priority={i === 0}
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
    </>
  );
}
