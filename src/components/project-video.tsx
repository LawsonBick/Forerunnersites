"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";

/**
 * Looping, silent clip used in place of a screenshot.
 *
 * Autoplays only when it scrolls into view and only when the visitor has
 * not asked for reduced motion — in that case it stays on the poster
 * frame and exposes normal controls so it can still be watched on
 * purpose. The file is never fetched until it is needed.
 */
const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function subscribeToReducedMotion(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

export function ProjectVideo({
  src,
  poster,
  label,
}: {
  src: string;
  poster: string;
  label: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduced = useSyncExternalStore(
    subscribeToReducedMotion,
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => false
  );

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced || !("IntersectionObserver" in window)) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.play().catch(() => {
            /* autoplay refused; the poster stays up */
          });
        } else {
          el.pause();
        }
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      controls={reduced}
      aria-label={label}
      className="block w-full"
    />
  );
}
