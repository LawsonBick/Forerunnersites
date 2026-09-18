"use client";
import { useState } from "react";
import Link from "next/link";

import { ProjectMedia, type ProjectPreview } from "@/components/project-media";

/** Visitor-controlled reel: no timed slide changes or focus movement. */
export function ProjectReel({
  projects,
}: {
  projects: (ProjectPreview & { slug: string; name: string })[];
}) {
  const [selected, setSelected] = useState(0);
  const project = projects[selected];
  return (
    <div className="hero-reel">
      <div className="flex justify-between gap-4 pb-5 text-[10px] font-medium uppercase tracking-[0.18em] text-white/80">
        <span>Made by Forerunner</span>
        <span>
          0{selected + 1} / 0{projects.length}
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
      <div className="mt-6 flex items-center justify-between gap-3">
        <Link
          className="text-base font-medium text-white underline-offset-4 hover:underline"
          href={`/work/${project.slug}`}
        >
          {project.name} <span aria-hidden="true">↗</span>
        </Link>
        <span className="hidden text-[11px] text-white/75 sm:block">
          Interactive preview
        </span>
      </div>
      <div
        className="mt-6 grid grid-cols-4 border-t border-white/25 pt-1"
        aria-label="Choose a project preview"
      >
        {projects.map((p, i) => (
          <button
            key={p.slug}
            type="button"
            aria-pressed={selected === i}
            aria-controls="featured-preview"
            onClick={() => setSelected(i)}
            className={`reel-selector min-h-12 py-3 text-left text-xs transition-colors ${selected === i ? "text-white" : "text-white/85 hover:text-white"}`}
          >
            <span aria-hidden="true" className="mr-2 text-[9px] opacity-80">
              0{i + 1}
            </span>
            {p.slug === "manuels"
              ? "Manuel’s"
              : p.slug === "trz-detail"
                ? "TRZ"
                : p.slug === "cleanz-atx"
                  ? "CleanZ"
                  : "Apex"}
          </button>
        ))}
      </div>
    </div>
  );
}
