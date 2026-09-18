"use client";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/components/motion-preference";
import Link from "next/link";
import { ProjectMedia, type ProjectPreview } from "@/components/project-media";

const previewLabels: Record<string, { short: string; detail: string }> = {
  manuels: { short: "Manuel’s", detail: "Restaurant & hospitality" },
  "trz-detail": { short: "TRZ", detail: "Automotive detailing" },
  "cleanz-atx": { short: "CleanZ", detail: "Exterior cleaning" },
  "apex-window-cleaning": { short: "Apex", detail: "Window & exterior care" },
};

/** A fifteen-second showcase, with manual selection and unobstructed previews. */
export function ProjectReel({
  projects,
}: {
  projects: (ProjectPreview & { slug: string; name: string })[];
}) {
  const [selected, setSelected] = useState(0);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const reel = useRef<HTMLDivElement>(null);
  const elapsed = useRef(0);
  const reduced = useReducedMotion();
  const project = projects[selected];

  useEffect(() => {
    const element = reel.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.35 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || paused || reduced || projects.length < 2) return;
    let previous = performance.now();
    const timer = window.setInterval(() => {
      const now = performance.now();
      const delta = Math.min(now - previous, 1000);
      previous = now;
      // Never replace a preview or project link while someone is using its control.
      const focused = document.activeElement;
      if (
        document.hidden ||
        (focused?.matches(":focus-visible") &&
          (reel.current?.querySelector("#featured-preview")?.contains(focused) ||
            reel.current?.querySelector(".reel-project-link")?.contains(focused)))
      )
        return;
      elapsed.current += delta;
      if (elapsed.current >= 15000) {
        elapsed.current = 0;
        setSelected((index) => (index + 1) % projects.length);
      }
    }, 250);
    return () => window.clearInterval(timer);
  }, [visible, paused, reduced, projects.length]);

  return (
    <div ref={reel} className="hero-reel">
      <div className="flex items-center justify-between gap-4 pb-4 text-[10px] font-medium uppercase tracking-[0.18em] text-ink-soft">
        <span>Made by Forerunner</span>
        <span className="tabular-nums">
          0{selected + 1} <span className="mx-1 text-ink/30">/</span> 0
          {projects.length}
        </span>
      </div>
      <div className="reel-window overflow-hidden">
        <div
          key={project.slug}
          className="reel-entry"
          id="featured-preview"
          aria-label={`${project.name} website preview`}
        >
          <ProjectMedia
            project={project}
            priority={selected === 0}
            paused={paused}
            onPausedChange={setPaused}
          />
        </div>
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
            onClick={() => {
              elapsed.current = 0;
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
