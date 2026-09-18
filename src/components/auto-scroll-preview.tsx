"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/components/motion-preference";
import { cx } from "@/lib/cx";

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
  seconds = 20,
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
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();

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
            animationPlayState: running && !paused ? "running" : "paused",
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
      {!reduced ? <button type="button" className="media-toggle" aria-label={paused ? "Play website preview" : "Pause website preview"} onClick={() => setPaused(!paused)}>{paused ? "Play" : "Pause"} <span aria-hidden="true">{paused ? "▷" : "Ⅱ"}</span></button> : <span className="media-toggle">Website preview</span>}
    </div>
  );
}
