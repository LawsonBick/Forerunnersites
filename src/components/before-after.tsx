"use client";
import Image from "next/image";
import { useReducedMotion } from "@/components/motion-preference";
import { useEffect, useRef, useState } from "react";

/** Native range input supports touch, arrows, Home/End, and assistive technology. */
export function BeforeAfter({
  before,
  after,
  caption,
  beforeAlt,
  afterAlt,
  beforePosition = "center 59%",
  afterPosition = "center 69%",
}: {
  before: string;
  after: string;
  caption: string;
  beforeAlt: string;
  afterAlt: string;
  beforePosition?: string;
  afterPosition?: string;
}) {
  const [position, setPosition] = useState(50);
  const reduced = useReducedMotion();
  const wrap = useRef<HTMLElement>(null);
  const touched = useRef(false);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced || !wrap.current) return;
    let frame = 0;
    let start = 0;
    let shown = false;
    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };
    const tick = (time: number) => {
      if (touched.current || media.matches) {
        stop();
        return;
      }
      if (!start) start = time;
      const progress = Math.min((time - start) / 2300, 1);
      setPosition(
        50 +
          26 * Math.sin(progress * Math.PI * 2) * Math.sin(progress * Math.PI),
      );
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !shown) {
          shown = true;
          frame = requestAnimationFrame(tick);
        }
      },
      { threshold: 0.45 },
    );
    observer.observe(wrap.current);
    media.addEventListener("change", stop);
    return () => {
      observer.disconnect();
      stop();
      media.removeEventListener("change", stop);
    };
  }, [reduced]);
  return (
    <figure
      ref={wrap}
      className="comparison relative aspect-[16/10] overflow-hidden bg-ink"
    >
      <Image
        src={after}
        alt={afterAlt}
        fill
        sizes="(min-width: 1024px) 60vw, 100vw"
        className="object-cover"
        style={{ objectPosition: afterPosition }}
      />
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <Image
          src={before}
          alt={beforeAlt}
          fill
          sizes="(min-width: 1024px) 60vw, 100vw"
          className="object-cover"
          style={{ objectPosition: beforePosition }}
        />
      </div>
      <span className="preview-label left-4">Before</span>
      <span className="preview-label right-4">After</span>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 z-10 w-px bg-white"
        style={{ left: `${position}%` }}
      >
        <span className="absolute top-1/2 left-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-lg text-ink shadow-lg">
          ↔
        </span>
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={position}
        aria-label={`${caption}: before and after`}
        aria-valuetext={`${Math.round(position)}% before, ${100 - Math.round(position)}% after`}
        onPointerDown={() => {
          touched.current = true;
        }}
        onKeyDown={() => {
          touched.current = true;
        }}
        onChange={(event) => {
          touched.current = true;
          setPosition(Number(event.target.value));
        }}
        className="comparison-input absolute inset-0 z-20 h-full w-full cursor-ew-resize opacity-0"
      />
      <figcaption className="pointer-events-none absolute bottom-3 left-3 z-10 max-w-[75%] rounded-full bg-ink/80 px-3 py-1.5 text-[10px] text-white">
        {caption}
      </figcaption>
    </figure>
  );
}
