import { WebsiteWalkthrough } from "@/components/website-walkthrough";
import { walkthroughs } from "@/content/walkthroughs";
import type { Project } from "@/content/projects";

export type ProjectPreview = Pick<
  Project,
  "slug" | "name" | "images" | "displayUrl"
>;

export function ProjectMedia({
  project,
  priority = false,
}: {
  project: ProjectPreview;
  priority?: boolean;
}) {
  return (
    <WebsiteWalkthrough
      tour={walkthroughs[project.slug]}
      name={project.name}
      poster={project.images.desktop.src}
      posterAlt={project.images.desktop.alt}
      priority={priority}
    />
  );
}
