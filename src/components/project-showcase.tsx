import { ArrowLink } from "@/components/button";
import { BrowserFrame } from "@/components/frames";
import { ProjectVideo } from "@/components/project-video";
import { BeforeAfter } from "@/components/before-after";
import { AutoScrollPreview } from "@/components/auto-scroll-preview";
import { Tag } from "@/components/tag";
import type { Project } from "@/content/projects";
import { cx } from "@/lib/cx";

/**
 * A full-width case-study entry. Each project sits on a backdrop panel
 * in its own brand colors, so the three never read as identical cards.
 */
export function ProjectShowcase({
  project,
  flip = false,
  priority = false,
  headingLevel: Heading = "h3",
}: {
  project: Project;
  flip?: boolean;
  priority?: boolean;
  /** h2 where the showcase sits directly under the page h1 (the work index). */
  headingLevel?: "h2" | "h3";
}) {
  return (
    <article
      className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12"
      data-reveal
    >
      <div className={cx("lg:col-span-7", flip && "lg:order-2")}>
        <div
          className="rounded-[6px] p-4 sm:p-8 lg:p-10"
          style={{ backgroundColor: project.palette.panel }}
        >
          <BrowserFrame
            src={project.images.desktop.src}
            alt={project.images.desktop.alt}
            width={2600}
            height={1625}
            sizes="(min-width: 1024px) 56vw, 100vw"
            url={project.displayUrl}
            priority={priority}
          >
            {project.video ? (
              <ProjectVideo
                src={project.video.src}
                poster={project.video.poster}
                label={project.video.label}
              />
            ) : project.beforeAfter ? (
              <BeforeAfter {...project.beforeAfter} />
            ) : project.autoScroll ? (
              <AutoScrollPreview {...project.autoScroll} />
            ) : undefined}
          </BrowserFrame>
          <p
            className="mt-4 flex items-center justify-between text-[12px] font-medium tracking-wide"
            style={{ color: project.palette.panelFg }}
          >
            <span className="flex items-center gap-2">
              <span
                aria-hidden="true"
                className="inline-block h-[6px] w-[6px]"
                style={{ backgroundColor: project.palette.accent }}
              />
              {project.name}
            </span>
            <span className="opacity-70">{project.location}</span>
          </p>
        </div>
      </div>

      <div className={cx("lg:col-span-5", flip && "lg:order-1")}>
        <Tag>{project.industry}</Tag>
        <Heading className="mt-4 font-display text-3xl leading-tight tracking-[-0.01em] sm:text-4xl">
          {project.name}
        </Heading>
        <dl className="mt-6 space-y-5">
          <div>
            <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-soft">
              The challenge
            </dt>
            <dd className="mt-1.5 leading-relaxed text-ink-soft">
              {project.shortChallenge}
            </dd>
          </div>
          <div>
            <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-soft">
              The build
            </dt>
            <dd className="mt-1.5 leading-relaxed text-ink-soft">
              {project.shortSolution}
            </dd>
          </div>
        </dl>
        <ul className="mt-6 flex flex-wrap gap-2">
          {project.services.slice(0, 4).map((s) => (
            <li key={s}>
              <Tag>{s}</Tag>
            </li>
          ))}
        </ul>
        <div className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-3">
          <ArrowLink href={`/work/${project.slug}`}>Read the case study</ArrowLink>
          <ArrowLink href={project.url} external className="text-ink-soft hover:text-ink">
            {project.displayUrl}
          </ArrowLink>
        </div>
      </div>
    </article>
  );
}
