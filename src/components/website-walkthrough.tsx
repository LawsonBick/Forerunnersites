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
function scrollPlan(max: number) {
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
}: {
  tour: Walkthrough;
  name: string;
  poster: string;
  posterAlt: string;
  priority?: boolean;
}) {
  const frame = useRef<HTMLIFrameElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const elapsed = useRef(0);
  const plan = useRef<ReturnType<typeof scrollPlan>>({
    stops: [],
    duration: 5000,
  });
  const [pageIndex, setPageIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [started, setStarted] = useState(false);
  const [ready, setReady] = useState(false);
  const [paused, setPaused] = useState(false);
  const [scale, setScale] = useState(1);
  const reduced = useReducedMotion();
  const page = tour.pages[pageIndex];

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
      { threshold: 0.15 },
    );
    observer.observe(element);
    return () => {
      resize.disconnect();
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const doc = frame.current?.contentDocument;
    if (doc) doc.documentElement.dataset.motion = reduced ? "reduced" : "full";
  }, [reduced, ready]);

  const changePage = (index: number) => {
    elapsed.current = 0;
    setReady(false);
    setPageIndex(index);
  };

  useEffect(() => {
    if (!ready || !visible || paused || reduced) return;
    let request = 0,
      previous = 0;
    const animate = (now: number) => {
      if (previous && !document.hidden)
        elapsed.current += Math.min(now - previous, 100);
      previous = now;
      const previewDocument = frame.current?.contentDocument;
      if (!previewDocument) return;
      if (tour.mode === "photos") {
        const slides = [
          ...previewDocument.querySelectorAll<HTMLElement>(".hero-slide"),
        ];
        const selected = Math.floor(elapsed.current / 4600) % slides.length;
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
        if (elapsed.current >= duration) {
          elapsed.current = 0;
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
          const ease = 1 - Math.pow(1 - progress, 3);
          y = stop.from + (stop.to - stop.from) * ease;
          if (progress < 1) break;
        }
        frame.current?.contentWindow?.scrollTo(0, y);
      }
      request = requestAnimationFrame(animate);
    };
    request = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(request);
  }, [ready, visible, paused, reduced, pageIndex, tour]);

  return (
    <BrowserFrame
      src={poster}
      alt={posterAlt}
      width={2600}
      height={1625}
      url={page.url}
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
              plan.current = scrollPlan(
                Math.max(0, doc.documentElement.scrollHeight - 800),
              );
              elapsed.current = 0;
              setReady(true);
            }}
          />
        )}
        <div className="walkthrough-controls absolute right-3 bottom-3 left-3 z-20 flex items-center justify-between gap-2 rounded-full bg-white/95 px-3 py-2 text-[10px] text-ink shadow-sm">
          <span className="truncate">
            {page.label}{" "}
            <span className="ml-1 text-ink-soft">
              {tour.mode === "scroll"
                ? `${pageIndex + 1} / ${tour.pages.length}`
                : "Slideshow"}
            </span>
          </span>
          <div className="flex shrink-0 items-center gap-1">
            {!reduced && (
              <button
                type="button"
                className="walkthrough-control"
                aria-label={`${paused ? "Play" : "Pause"} ${name} preview`}
                onClick={() => setPaused((value) => !value)}
              >
                {paused ? "Play" : "Pause"}
              </button>
            )}
            <button
              type="button"
              className="walkthrough-control"
              aria-label={
                tour.mode === "photos"
                  ? `Next ${name} photo`
                  : `Next ${name} page`
              }
              onClick={() => {
                if (tour.mode === "photos") {
                  elapsed.current =
                    (Math.floor(elapsed.current / 4600) + 1) * 4600;
                  const slides = [
                    ...(frame.current?.contentDocument?.querySelectorAll<HTMLElement>(
                      ".hero-slide",
                    ) ?? []),
                  ];
                  const index =
                    Math.floor(elapsed.current / 4600) % slides.length;
                  slides.forEach((slide, i) => {
                    if (i === index && slide.dataset.bg)
                      slide.style.backgroundImage = `url("${slide.dataset.bg}")`;
                    slide.classList.toggle("is-active", i === index);
                  });
                } else changePage((pageIndex + 1) % tour.pages.length);
              }}
            >
              Next <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      </div>
    </BrowserFrame>
  );
}
