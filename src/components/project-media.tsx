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
  paused,
  onPausedChange,
  durationMs,
  onComplete,
}: {
  project: ProjectPreview;
  priority?: boolean;
  durationMs?: number;
  onComplete?: () => void;
  paused?: boolean;
  onPausedChange?: (paused: boolean) => void;
}) {
  return (
    <WebsiteWalkthrough
      tour={walkthroughs[project.slug]}
      name={project.name}
      poster={project.images.desktop.src}
      posterAlt={project.images.desktop.alt}
      priority={priority}
      durationMs={durationMs}
      onComplete={onComplete}
      paused={paused}
      onPausedChange={onPausedChange}
    />
  );
}
