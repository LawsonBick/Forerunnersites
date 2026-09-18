import { BrowserFrame } from "@/components/frames";
import { ProjectVideo } from "@/components/project-video";
import { BeforeAfter } from "@/components/before-after";
import { AutoScrollPreview } from "@/components/auto-scroll-preview";
import type { Project } from "@/content/projects";

export type ProjectPreview = Pick<
  Project,
  "images" | "displayUrl" | "video" | "beforeAfter" | "autoScroll"
>;

export function ProjectMedia({
  project,
  priority = false,
}: {
  project: ProjectPreview;
  priority?: boolean;
}) {
  return (
    <BrowserFrame
      src={project.images.desktop.src}
      alt={project.images.desktop.alt}
      width={2600}
      height={1625}
      sizes="(min-width: 1024px) 60vw, 100vw"
      url={project.displayUrl}
      priority={priority}
    >
      {project.video ? (
        <ProjectVideo {...project.video} />
      ) : project.beforeAfter ? (
        <BeforeAfter {...project.beforeAfter} />
      ) : project.autoScroll ? (
        <AutoScrollPreview {...project.autoScroll} />
      ) : undefined}
    </BrowserFrame>
  );
}
