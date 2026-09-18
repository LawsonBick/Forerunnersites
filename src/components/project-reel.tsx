"use client";
import { useState } from "react";
import Link from "next/link";
import { ProjectMedia, type ProjectPreview } from "@/components/project-media";

const previewLabels: Record<string, { short: string; detail: string }> = {
  manuels: { short: "Manuel’s", detail: "Restaurant & hospitality" },
  "trz-detail": { short: "TRZ", detail: "Automotive detailing" },
  "cleanz-atx": { short: "CleanZ", detail: "Exterior cleaning" },
  "apex-window-cleaning": { short: "Apex", detail: "Window & exterior care" },
};

/** An open project gallery; visitors control the selection and media. */
export function ProjectReel({
  projects,
}: {
  projects: (ProjectPreview & { slug: string; name: string })[];
}) {
  const [selected, setSelected] = useState(0);
  const project = projects[selected];
  return (
    <div className="hero-reel">
      <div className="flex items-center justify-between gap-4 pb-4 text-[10px] font-medium uppercase tracking-[0.18em] text-ink-soft">
        <span>Made by Forerunner</span>
        <span className="tabular-nums">
          0{selected + 1} <span className="mx-1 text-ink/30">/</span> 0
          {projects.length}
        </span>
      </div>
      <div
        key={project.slug}
        className="reel-entry"
        id="featured-preview"
        aria-label={`${project.name} website preview`}
      >
        <ProjectMedia project={project} priority={selected === 0} />
      </div>
      <Link
        href={`/work/${project.slug}`}
        className="reel-project-link group mt-5 flex items-center justify-between gap-5 py-1"
      >
        <div>
          <span className="block text-xl font-medium tracking-[-0.025em] text-ink sm:text-2xl">
            {project.name}
          </span>
          <span className="mt-1.5 block text-[11px] text-ink-soft">
            {previewLabels[project.slug]?.detail ??
              "Website design & development"}
          </span>
        </div>
        <span className="flex items-center gap-3 text-xs text-ink-soft">
          <span className="hidden sm:block">View project</span>
          <span aria-hidden="true" className="reel-project-arrow">
            ↗
          </span>
        </span>
      </Link>
      <div
        className="reel-selectors mt-6 grid grid-cols-4"
        aria-label="Choose a project preview"
      >
        {projects.map((p, i) => (
          <button
            key={p.slug}
            type="button"
            aria-pressed={selected === i}
            aria-controls="featured-preview"
            onClick={() => setSelected(i)}
            className="reel-selector flex min-h-14 items-center gap-2 py-3 text-left text-xs font-medium sm:gap-3"
          >
            <span
              aria-hidden="true"
              className="text-[9px] tabular-nums opacity-55"
            >
              0{i + 1}
            </span>
            {previewLabels[p.slug]?.short ?? p.name}
          </button>
        ))}
      </div>
    </div>
  );
}
