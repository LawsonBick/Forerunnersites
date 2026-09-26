"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { BrowserFrame } from "@/components/frames";
import type { ProjectPreview } from "@/components/project-media";

/** A contained, visitor-controlled browser. Only the selected site is mounted. */
export function HomepagePreview({ project, priority }: {
  project: ProjectPreview & { url: string };
  priority?: boolean;
}) {
  const viewport = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const [ready, setReady] = useState(false);
  const [revision, setRevision] = useState(0);
  const [size, setSize] = useState({ width: 1280, height: 800, scale: 1 });
  const manuels = project.slug === "manuels";
  const previewSource = project.slug === "trz-detail" ? "/work/preview/trz"
    : project.slug === "cleanz-atx" ? "/work/preview/cleanz" : null;
  const isolated = manuels || Boolean(previewSource);
  const poster = project.images.desktop;

  useEffect(() => {
    const element = viewport.current;
    if (!element) return;
    const resize = new ResizeObserver(([entry]) => {
      const width = entry.contentRect.width;
      // Show each site's mobile layout on phones, with readable touch targets.
      const frameWidth = window.matchMedia("(max-width: 639px)").matches ? Math.max(390, width) : 1280;
      const scale = width / frameWidth;
      if (scale > 0) setSize({ width: frameWidth, height: entry.contentRect.height / scale, scale });
    });
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setStarted(true);
        observer.disconnect(); // Keep the visitor's place when the outer page scrolls away.
      }
    }, { rootMargin: "100px" });
    resize.observe(element);
    observer.observe(element);
    return () => { resize.disconnect(); observer.disconnect(); };
  }, []);

  return (
    <BrowserFrame src={poster.src} alt={poster.alt} width={2600} height={1625}
      url={project.displayUrl}
      chromeActions={
        <button type="button" className="grid size-8 place-items-center rounded-full text-ink-soft hover:bg-ink/5"
          aria-label={`Return to ${project.name} homepage`}
          onClick={() => { setReady(false); setRevision((value) => value + 1); }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
            <path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1Z" />
          </svg>
        </button>
      }>
      <div ref={viewport} className="relative aspect-[4/5] overflow-hidden bg-white sm:aspect-[16/10]">
        <Image src={poster.src} alt={poster.alt} fill sizes="(min-width: 1024px) 50vw, 100vw"
          priority={priority} className="object-cover" />
        {started && (
          <iframe key={revision} src={manuels ? "/work/interactive/manuels/index.html" : previewSource ?? project.url}
            title={`${project.name} interactive website preview`}
            sandbox={isolated
              ? "allow-scripts allow-popups allow-popups-to-escape-sandbox"
              : "allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"}
            allow="autoplay; fullscreen" referrerPolicy="no-referrer"
            className="absolute top-0 left-0 origin-top-left border-0 bg-white"
            style={{ width: size.width, height: size.height, transform: `scale(${size.scale})`, opacity: ready ? 1 : 0 }}
            onLoad={() => setReady(true)} />
        )}
      </div>
    </BrowserFrame>
  );
}
