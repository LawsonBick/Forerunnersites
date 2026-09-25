"use client";
import { useState } from "react";
import Link from "next/link";
import type { ProjectPreview } from "@/components/project-media";
import { HomepagePreview } from "@/components/homepage-preview";

const previewLabels: Record<string, { short: string; detail: string }> = {
  manuels: { short: "Manuel’s", detail: "Restaurant & hospitality" },
  "trz-detail": { short: "TRZ", detail: "Automotive detailing" },
  "cleanz-atx": { short: "CleanZ", detail: "Exterior cleaning" },
  "apex-window-cleaning": { short: "Apex", detail: "Window & exterior care" },
};

/** Visitors choose a site and explore it without automatic interruptions. */
export function ProjectReel({
  projects,
}: {
  projects: (ProjectPreview & { slug: string; name: string; url: string })[];
}) {
  const [selected, setSelected] = useState(0);
  const project = projects[selected];
  const stepProject = (direction: number) => {
    setSelected((index) => (index + direction + projects.length) % projects.length);
  };

  return (
    <div className="hero-reel">
      <div className="flex items-center justify-between gap-4 pb-4 text-[10px] font-medium uppercase tracking-[0.18em] text-ink-soft">
        <span>Made by Forerunner</span>
        <span className="tabular-nums">
          0{selected + 1} <span className="mx-1 text-ink/30">/</span> 0
          {projects.length}
        </span>
      </div>
      <div className="reel-browser-layout">
        <button type="button" className="reel-navigation" aria-label="Previous website" aria-controls="featured-preview" onClick={() => stepProject(-1)}>
          <span aria-hidden="true">←</span>
        </button>
        <div className="reel-window min-w-0 overflow-hidden">
          <div
            key={project.slug}
            className="reel-entry"
            id="featured-preview"
            aria-label={`${project.name} website preview`}
          >
            <HomepagePreview
              project={project}
              priority={selected === 0}
            />
          </div>
        </div>
        <button type="button" className="reel-navigation" aria-label="Next website" aria-controls="featured-preview" onClick={() => stepProject(1)}>
          <span aria-hidden="true">→</span>
        </button>
      </div>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-[11px] text-ink-soft">
        <span>Click, scroll &amp; explore</span>
        <a href={project.url} target="_blank" rel="noopener noreferrer" className="font-medium text-ink">Open live site ↗</a>
      </div>
      <p className="sr-only" aria-live="polite">{project.name}, website {selected + 1} of {projects.length}</p>
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
            onClick={() => {
              setSelected(i);
            }}
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
