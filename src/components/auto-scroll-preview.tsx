"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { cx } from "@/lib/cx";

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function subscribeToReducedMotion(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

/**
 * A full-page capture that scrolls itself inside the browser frame, so a
 * long page can be seen as a page rather than a cropped screenshot.
 *
 * Runs only while it is on screen, and holds still at the top of the page
 * for anyone who has asked for reduced motion.
 */
export function AutoScrollPreview({
  src,
  alt,
  width,
  height,
  seconds = 34,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** One full pass down the page. */
  seconds?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [running, setRunning] = useState(false);
  const reduced = useSyncExternalStore(
    subscribeToReducedMotion,
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => false
  );

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      ([entry]) => setRunning(entry.isIntersecting),
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  // How far the strip must travel to reveal its whole length inside a 16:10 window.
  const framedHeight = (width * 10) / 16;
  const travel = 100 - (framedHeight / height) * 100;

  return (
    <div ref={ref} className="relative aspect-[16/10] w-full overflow-hidden bg-ink">
      <div
        className={cx("absolute inset-x-0 top-0", !reduced && "animate-page-scroll")}
        style={
          {
            animationDuration: `${seconds}s`,
            animationPlayState: running ? "running" : "paused",
            "--scroll-travel": `-${travel.toFixed(2)}%`,
          } as React.CSSProperties
        }
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes="(min-width: 1024px) 56vw, 100vw"
          className="w-full"
        />
      </div>
    </div>
  );
}
