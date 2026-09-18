import { ArrowLink } from "@/components/button";
import { ProjectMedia } from "@/components/project-media";
import type { Project } from "@/content/projects";
import { cx } from "@/lib/cx";

export function ProjectShowcase({
  project,
  flip = false,
  priority = false,
  headingLevel: Heading = "h3",
}: {
  project: Project;
  flip?: boolean;
  priority?: boolean;
  headingLevel?: "h2" | "h3";
}) {
  const feature =
    project.slug === "manuels"
      ? "A look through the homepage"
      : "An automatic tour of the website";
  return (
    <article className="project-story grid items-center gap-8 lg:grid-cols-12 lg:gap-14">
      <div
        className={cx("min-w-0 lg:col-span-8", flip && "lg:order-2")}
        data-reveal={flip ? "right" : "left"}
      >
        <div
          className="project-stage"
          style={{ backgroundColor: project.palette.panel }}
        >
          <div
            className="mb-6 flex items-center justify-between gap-4 text-[10px] font-medium uppercase tracking-[0.16em]"
            style={{ color: project.palette.panelFg }}
          >
            <span>{project.industry}</span>
            <span aria-hidden="true">↗</span>
          </div>
          <ProjectMedia project={project} priority={priority} />
          <div
            className="mt-6 flex justify-between gap-4 text-xs"
            style={{ color: project.palette.panelFg }}
          >
            <span>{feature}</span>
            <span className="hidden sm:block">{project.location}</span>
          </div>
        </div>
      </div>
      <div
        className={cx("lg:col-span-4", flip && "lg:order-1")}
        data-reveal={flip ? "left" : "right"}
      >
        <p className="kicker text-ink-soft">
          Selected work / {project.location}
        </p>
        <Heading className="mt-5 font-display text-[clamp(2.5rem,3.7vw,4rem)] leading-[1.04] tracking-[-0.035em]">
          {project.name}
        </Heading>
        <p className="mt-5 max-w-md text-[15px] leading-relaxed text-ink-soft">
          {project.shortSolution}
        </p>
        <div className="mt-7 flex flex-col items-start gap-4">
          <ArrowLink href={`/work/${project.slug}`}>
            Explore the project
          </ArrowLink>
          <ArrowLink
            href={project.url}
            external
            className="text-xs text-ink-soft"
          >
            Visit the live site
          </ArrowLink>
        </div>
      </div>
    </article>
  );
}
