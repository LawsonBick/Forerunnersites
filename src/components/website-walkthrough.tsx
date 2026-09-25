"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { BrowserFrame } from "@/components/frames";
import { useReducedMotion } from "@/components/motion-preference";
import type { Walkthrough } from "@/content/walkthroughs";

interface Stop {
  start: number;
  duration: number;
  from: number;
  to: number;
}
/** Wheel-like bursts with varied reading pauses and occasional small corrections. */
function scrollPlan(max: number, budget?: number) {
  if (budget) {
    // Read the opening, glide through the entire page, then hold the footer.
    const start = 400;
    return {
      stops: [{ start, duration: Math.max(1, budget - start - 650), from: 0, to: max }],
      duration: budget,
    };
  }
  const stops: Stop[] = [];
  const distances = [490, 620, 380, 560, 690, 440];
  const pauses = [1500, 950, 1850, 1150, 2200, 1350];
  let y = 0,
    time = 2400,
    i = 0;
  while (y < max) {
    const next = Math.min(max, y + distances[i % distances.length]);
    const duration = 480 + (i % 3) * 90;
    stops.push({ start: time, duration, from: y, to: next });
    y = next;
    time += duration + pauses[i % pauses.length];
    if (i % 4 === 2 && y < max) {
      stops.push({ start: time, duration: 340, from: y, to: y - 65 });
      y -= 65;
      time += 1050;
    }
    i++;
  }
  return { stops, duration: time + 2000 };
}

export function WebsiteWalkthrough({
  tour,
  name,
  poster,
  posterAlt,
  priority = false,
  paused: controlledPaused,
  onPausedChange,
  durationMs,
  onComplete,
}: {
  tour: Walkthrough;
  name: string;
  poster: string;
  posterAlt: string;
  priority?: boolean;
  durationMs?: number;
  onComplete?: () => void;
  paused?: boolean;
  onPausedChange?: (paused: boolean) => void;
}) {
  const frame = useRef<HTMLIFrameElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const cursor = useRef<HTMLDivElement>(null);
  const elapsed = useRef(0);
  const plan = useRef<ReturnType<typeof scrollPlan>>({
    stops: [],
    duration: 5000,
  });
  const [pageIndex, setPageIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [started, setStarted] = useState(false);
  const [ready, setReady] = useState(false);
  const [localPaused, setLocalPaused] = useState(false);
  const paused = controlledPaused ?? localPaused;
  const setPaused = onPausedChange ?? setLocalPaused;
  const [scale, setScale] = useState(1);
  const reduced = useReducedMotion();
  const page = tour.pages[pageIndex];
  const pageBudget = durationMs ? durationMs / tour.pages.length : undefined;

  useEffect(() => {
    const element = viewport.current;
    if (!element) return;
    const resize = new ResizeObserver(([entry]) =>
      setScale(entry.contentRect.width / 1280),
    );
    resize.observe(element);
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
        if (entry.isIntersecting) setStarted(true);
      },
      { threshold: durationMs ? 0.35 : 0.15 },
    );
    observer.observe(element);
    return () => {
      resize.disconnect();
      observer.disconnect();
    };
  }, [durationMs]);

  useEffect(() => {
    const doc = frame.current?.contentDocument;
    if (doc) doc.documentElement.dataset.motion = reduced ? "reduced" : "full";
  }, [reduced, ready]);

  useEffect(() => {
    if (!ready || !visible || paused || reduced) return;
    let request = 0,
      previous = 0;
    let navigationLink: HTMLAnchorElement | undefined;
    let navigationY: number | undefined;
    const animate = (now: number) => {
      const reel = viewport.current?.closest(".hero-reel");
      const focused = document.activeElement;
      const interacting = focused?.matches(":focus-visible") &&
        (reel?.querySelector("#featured-preview")?.contains(focused) ||
          reel?.querySelector(".reel-project-link")?.contains(focused));
      if (previous && !document.hidden && !interacting)
        elapsed.current += Math.min(now - previous, 100);
      previous = now;
      const previewDocument = frame.current?.contentDocument;
      if (!previewDocument) return;
      if (tour.mode === "photos") {
        const slides = [
          ...previewDocument.querySelectorAll<HTMLElement>(".hero-slide"),
        ];
        if (durationMs && elapsed.current >= durationMs && onComplete) {
          onComplete();
          return;
        }
        const selected = Math.floor(elapsed.current / (durationMs ? durationMs / Math.max(1, slides.length) : 4600)) % Math.max(1, slides.length);
        slides.forEach((slide, i) => {
          if (i === selected || i === (selected + 1) % slides.length) {
            const image = slide.dataset.bg;
            if (image && !slide.style.backgroundImage)
              slide.style.backgroundImage = `url("${image}")`;
          }
          slide.classList.toggle("is-active", i === selected);
        });
      } else {
        const { stops, duration } = plan.current;
        if (pageBudget && stops[0]) {
          stops[0].to = Math.max(0, previewDocument.documentElement.scrollHeight - 800);
        }
        if (elapsed.current >= duration) {
          elapsed.current = 0;
          if (pageIndex === tour.pages.length - 1 && onComplete) {
            onComplete();
            return;
          }
          setReady(false);
          setPageIndex((index) => (index + 1) % tour.pages.length);
          return;
        }
        let y = 0;
        for (const stop of stops) {
          if (elapsed.current < stop.start) break;
          const progress = Math.min(
            1,
            (elapsed.current - stop.start) / stop.duration,
          );
          // A gentle speed ramp at each end, without jerky wheel bursts.
          const ease = pageBudget
            ? progress * progress * (3 - 2 * progress)
            : 1 - Math.pow(1 - progress, 3);
          y = stop.from + (stop.to - stop.from) * ease;
          if (progress < 1) break;
        }
        // Follow a real link in the presentation copy; never submit client forms.
        const next = tour.pages[pageIndex + 1];
        const clickPhase = pageBudget && next ? elapsed.current - (duration - 550) : -1;
        const pointer = cursor.current;
        if (pointer) pointer.style.opacity = "0";
        if (clickPhase >= 0 && next) {
          const targetPath = new URL(`https://${next.url}`).pathname.replace(/\/$/, "");
          navigationLink ??= [...previewDocument.querySelectorAll<HTMLAnchorElement>("a[href]")]
            .filter((link) => new URL(link.href).pathname.replace(/\/$/, "") === targetPath && link.getClientRects().length)
            .sort((a, b) => Math.abs(a.getBoundingClientRect().top - 650) - Math.abs(b.getBoundingClientRect().top - 650))[0];
          const link = navigationLink;
          if (link) {
            const rect = link.getBoundingClientRect();
            const currentY = frame.current?.contentWindow?.scrollY ?? 0;
            navigationY ??= rect.top >= 0 && rect.bottom <= 800
              ? currentY
              : Math.max(0, Math.min(previewDocument.documentElement.scrollHeight - 800, currentY + rect.top - 620));
            const progress = Math.min(1, clickPhase / 280);
            y += (navigationY - y) * (progress * progress * (3 - 2 * progress));
            if (pointer && clickPhase > 280) {
              pointer.style.opacity = "1";
              pointer.style.left = `${(rect.left + rect.width / 2) / 1280 * 100}%`;
              pointer.style.top = `${(rect.top + currentY - y + rect.height / 2) / 800 * 100}%`;
              pointer.dataset.clicking = clickPhase > 430 ? "true" : "false";
            }
          }
        }
        frame.current?.contentWindow?.scrollTo(0, y);
      }
      request = requestAnimationFrame(animate);
    };
    request = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(request);
  }, [ready, visible, paused, reduced, pageIndex, tour, pageBudget, durationMs, onComplete]);

  return (
    <BrowserFrame
      src={poster}
      alt={posterAlt}
      width={2600}
      height={1625}
      url={page.url}
      chromeActions={
        !reduced ? (
          <button
            type="button"
            className="preview-playback grid size-8 place-items-center rounded-full text-ink-soft hover:bg-ink/5 focus-visible:outline-2 focus-visible:outline-ink"
            aria-label={`${paused ? "Play" : "Pause"} ${name} preview`}
            aria-pressed={paused}
            title={paused ? "Play preview" : "Pause preview"}
            onClick={() => setPaused(!paused)}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="currentColor"
              aria-hidden="true"
            >
              {paused ? (
                <path d="M3 1.5 10 6l-7 4.5Z" />
              ) : (
                <path d="M2 1h3v10H2zm5 0h3v10H7z" />
              )}
            </svg>
          </button>
        ) : undefined
      }
    >
      <div
        ref={viewport}
        className="walkthrough-viewport relative aspect-[16/10] overflow-hidden bg-white"
      >
        <Image
          src={poster}
          alt={posterAlt}
          fill
          sizes="(min-width: 1024px) 60vw, 100vw"
          priority={priority}
          className="object-cover"
        />
        {started && (
          <iframe
            key={page.src}
            ref={frame}
            src={page.src}
            title={`${name} — ${page.label} website preview`}
            aria-hidden="true"
            tabIndex={-1}
            sandbox="allow-same-origin"
            referrerPolicy="no-referrer"
            className="pointer-events-none absolute top-0 left-0 origin-top-left border-0"
            style={{
              width: 1280,
              height: 800,
              transform: `scale(${scale})`,
              opacity: ready ? 1 : 0,
            }}
            onLoad={() => {
              const doc = frame.current?.contentDocument;
              if (!doc) return;
              frame.current?.contentWindow?.scrollTo(0, 0);
              if (durationMs && tour.mode === "photos") {
                doc.querySelectorAll<HTMLElement>(".hero-slide").forEach((slide) => {
                  slide.style.setProperty("transition", "opacity 450ms ease", "important");
                });
              }
              plan.current = scrollPlan(
                Math.max(0, doc.documentElement.scrollHeight - 800),
                pageBudget,
              );
              if (cursor.current) cursor.current.style.opacity = "0";
              elapsed.current = 0;
              setReady(true);
            }}
          />
        )}
        {durationMs && !reduced && (
          <div ref={cursor} aria-hidden="true" className="tour-cursor">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="#202124" stroke="white" strokeWidth="1.5">
              <path d="M4 2v18l5-5 4 8 4-2-4-8h7Z" />
            </svg>
          </div>
        )}
      </div>
    </BrowserFrame>
  );
}
