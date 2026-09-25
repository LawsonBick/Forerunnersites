"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { BrowserFrame } from "@/components/frames";
import { useReducedMotion } from "@/components/motion-preference";
import type { ProjectPreview } from "@/components/project-media";

/** Live, non-interactive homepages. Manuel's disallows framing, so its local
 * presentation copy reproduces the verified opening photo → video sequence. */
export function HomepagePreview({ project, priority, paused, onPausedChange, onComplete }: {
  project: ProjectPreview & { url: string };
  priority?: boolean;
  paused: boolean;
  onPausedChange: (paused: boolean) => void;
  onComplete: () => void;
}) {
  const viewport = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLIFrameElement>(null);
  const elapsed = useRef(0);
  const [visible, setVisible] = useState(false);
  const [ready, setReady] = useState(false);
  const [scale, setScale] = useState(1);
  const reduced = useReducedMotion();
  const manuels = project.slug === "manuels";
  const poster = project.images.desktop;

  useEffect(() => {
    const element = viewport.current;
    if (!element) return;
    const resize = new ResizeObserver(([entry]) => setScale(entry.contentRect.width / 1280));
    const observer = new IntersectionObserver(([entry]) => {
      const inView = entry.isIntersecting && entry.intersectionRatio >= 0.35;
      setVisible(inView);
      if (!inView) setReady(false);
    }, { threshold: [0, 0.35] });
    resize.observe(element);
    observer.observe(element);
    return () => { resize.disconnect(); observer.disconnect(); };
  }, []);

  useEffect(() => {
    if (!visible || reduced) return;
    // A slow client host must not trap the carousel on one project.
    const timeout = window.setTimeout(() => setReady(true), 4000);
    return () => window.clearTimeout(timeout);
  }, [visible, reduced]);

  useEffect(() => {
    if (!visible || !ready || reduced) return;
    let previous = performance.now();
    const timer = window.setInterval(() => {
      const now = performance.now();
      const delta = Math.min(now - previous, 250);
      previous = now;
      const focused = document.activeElement;
      const reel = viewport.current?.closest(".hero-reel");
      const interacting = focused?.matches(":focus-visible") &&
        (reel?.querySelector("#featured-preview")?.contains(focused) ||
          reel?.querySelector(".reel-project-link")?.contains(focused));
      if (paused || document.hidden || interacting) return;
      elapsed.current += delta;
      if (manuels) {
        const doc = frame.current?.contentDocument;
        const slides = doc?.querySelectorAll<HTMLElement>(".hero-slide");
        const video = doc?.querySelector<HTMLVideoElement>("video");
        const selected = elapsed.current >= 3000 ? 1 : 0;
        slides?.forEach((slide, index) => slide.classList.toggle("is-active", index === selected));
        if (selected === 1 && video?.paused) void video.play().catch(() => {});
      }
      if (elapsed.current >= 6000) {
        window.clearInterval(timer);
        onComplete();
      }
    }, 100);
    return () => window.clearInterval(timer);
  }, [visible, ready, reduced, paused, manuels, onComplete]);

  return (
    <BrowserFrame src={poster.src} alt={poster.alt} width={2600} height={1625}
      url={project.displayUrl}
      chromeActions={!reduced ? (
        <button type="button" className="preview-playback grid size-8 place-items-center rounded-full text-ink-soft hover:bg-ink/5"
          aria-label={`${paused ? "Play" : "Pause"} homepage slideshow`} aria-pressed={paused}
          onClick={() => onPausedChange(!paused)}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
            <path d={paused ? "M3 1.5 10 6l-7 4.5Z" : "M2 1h3v10H2zm5 0h3v10H7z"} />
          </svg>
        </button>
      ) : undefined}>
      <div ref={viewport} className="relative aspect-[16/10] overflow-hidden bg-white">
        <Image src={poster.src} alt={poster.alt} fill sizes="(min-width: 1024px) 50vw, 100vw"
          priority={priority} className="object-cover" />
        {visible && !reduced && (
          <iframe ref={frame} src={manuels ? "/work/tours/manuels-home.html" : project.url}
            title={`${project.name} homepage preview`} tabIndex={-1} aria-hidden="true"
            sandbox={manuels ? "allow-same-origin" : "allow-scripts allow-same-origin"}
            allow="autoplay" referrerPolicy="no-referrer"
            className="pointer-events-none absolute top-0 left-0 origin-top-left border-0"
            style={{ width: 1280, height: 800, transform: `scale(${scale})`, opacity: ready ? 1 : 0 }}
            onLoad={() => {
              if (manuels) {
                const doc = frame.current?.contentDocument;
                const first = doc?.querySelector<HTMLElement>(".hero-slide");
                if (doc && first) {
                  const slide = doc.createElement("div");
                  slide.className = "hero-slide hero-slide--video";
                  const video = doc.createElement("video");
                  video.src = "https://www.manuels.com/assets/video/manuels-fajitas-720.mp4";
                  video.muted = true;
                  video.loop = true;
                  video.playsInline = true;
                  video.preload = "auto";
                  slide.append(video);
                  first.after(slide);
                  doc.querySelectorAll<HTMLElement>(".hero-slide").forEach((item) => {
                    item.style.setProperty("transition", "opacity 1800ms ease", "important");
                  });
                }
              }
              elapsed.current = 0;
              setReady(true);
            }} />
        )}
      </div>
    </BrowserFrame>
  );
}
