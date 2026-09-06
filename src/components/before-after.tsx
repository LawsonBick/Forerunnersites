"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function subscribeToReducedMotion(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

/** Sweep the handle across and settle back, so the control explains itself. */
const SWEEP: [number, number][] = [
  [0, 50],
  [0.3, 88],
  [0.68, 14],
  [1, 50],
];

function sweepAt(t: number) {
  for (let i = 1; i < SWEEP.length; i++) {
    const [t1, v1] = SWEEP[i];
    if (t <= t1) {
      const [t0, v0] = SWEEP[i - 1];
      const local = (t - t0) / (t1 - t0);
      const eased = local < 0.5 ? 2 * local * local : 1 - (-2 * local + 2) ** 2 / 2;
      return v0 + (v1 - v0) * eased;
    }
  }
  return 50;
}

/**
 * The before/after reveal from the client's own site, rebuilt so it is
 * live rather than a screenshot. It sweeps itself back and forth while it
 * is on screen, and hands control to the visitor on the first drag or
 * arrow key. Under prefers-reduced-motion it simply sits at the midpoint
 * and waits to be moved.
 */
export function BeforeAfter({
  before,
  after,
  caption,
  beforeAlt,
  afterAlt,
}: {
  before: string;
  after: string;
  caption: string;
  beforeAlt: string;
  afterAlt: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const [touched, setTouched] = useState(false);
  const reduced = useSyncExternalStore(
    subscribeToReducedMotion,
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => false
  );

  // Keep demonstrating while on screen, so the control is never sitting
  // still when someone arrives at it. Runs only while visible, and stops
  // for good the moment the visitor takes over.
  useEffect(() => {
    if (reduced || touched) return;
    const el = wrapRef.current;
    if (!el || !("IntersectionObserver" in window)) return;

    let raf = 0;
    let startedAt = 0;
    const DURATION = 3400;
    const REST = 900; // a beat at the midpoint between passes

    const tick = (now: number) => {
      if (!startedAt) startedAt = now;
      const elapsed = (now - startedAt) % (DURATION + REST);
      setPos(sweepAt(Math.min(1, elapsed / DURATION)));
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !raf) {
          startedAt = 0;
          raf = requestAnimationFrame(tick);
        } else if (!entry.isIntersecting && raf) {
          cancelAnimationFrame(raf);
          raf = 0;
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [reduced, touched]);

  const moveTo = useCallback((clientX: number) => {
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(2, Math.min(98, next)));
  }, []);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setTouched(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    moveTo(e.clientX);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.currentTarget.hasPointerCapture(e.pointerId)) moveTo(e.clientX);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const step = e.shiftKey ? 10 : 4;
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      e.preventDefault();
      setTouched(true);
      setPos((p) => Math.max(2, Math.min(98, p + (e.key === "ArrowRight" ? step : -step))));
    }
  };

  return (
    <figure className="relative">
      <div
        ref={wrapRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        className="relative aspect-[16/10] w-full cursor-ew-resize touch-none overflow-hidden bg-ink select-none"
      >
        {/* The photos are portrait, so the 16/10 frame keeps only a middle
            band. The two offsets differ because each shot sits the car at a
            different height; they are tuned to land it in the same place on
            screen, so it does not jump as the handle crosses. */}
        <Image
          src={after}
          alt={afterAlt}
          fill
          sizes="(min-width: 1024px) 56vw, 100vw"
          className="object-cover"
          style={{ objectPosition: "center 69%" }}
        />
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        >
          <Image
            src={before}
            alt={beforeAlt}
            fill
            sizes="(min-width: 1024px) 56vw, 100vw"
            className="object-cover"
            style={{ objectPosition: "center 59%" }}
          />
        </div>

        <span className="pointer-events-none absolute top-3 left-3 rounded-[var(--radius-xs)] bg-ink/75 px-2 py-1 text-[10px] font-semibold tracking-[0.12em] text-paper uppercase">
          Before
        </span>
        <span className="pointer-events-none absolute top-3 right-3 rounded-[var(--radius-xs)] bg-ink/75 px-2 py-1 text-[10px] font-semibold tracking-[0.12em] text-paper uppercase">
          After
        </span>

        <div
          role="slider"
          tabIndex={0}
          aria-label="Reveal more of the before or after photo"
          aria-valuemin={2}
          aria-valuemax={98}
          aria-valuenow={Math.round(pos)}
          onKeyDown={onKeyDown}
          className="absolute inset-y-0 z-10 -ml-5 flex w-10 cursor-ew-resize items-center justify-center focus-visible:outline-none"
          style={{ left: `${pos}%` }}
        >
          <span aria-hidden="true" className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-white/90" />
          <span
            aria-hidden="true"
            className="relative flex h-9 w-9 items-center justify-center rounded-full border border-white/70 bg-white/95 text-[13px] text-ink shadow-[0_2px_10px_rgba(0,0,0,0.28)]"
          >
            ⇆
          </span>
        </div>
      </div>
      <figcaption className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-[var(--radius-xs)] bg-ink/75 px-2.5 py-1 text-[11px] font-medium text-paper">
        {caption}
      </figcaption>
    </figure>
  );
}
