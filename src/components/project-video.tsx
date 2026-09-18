"use client";
import { useReducedMotion } from "@/components/motion-preference";
import { useEffect, useRef, useState } from "react";
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
  const [playing, setPlaying] = useState(false);
  const manual = useRef(false);
  const reduced = useReducedMotion();
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced) video.pause();
    const changed = () => {
      if (media.matches) video.pause();
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) video.pause();
        else if (!reduced && !manual.current) void video.play().catch(() => {});
      },
      { threshold: 0.25 },
    );
    observer.observe(video);
    media.addEventListener("change", changed);
    return () => {
      observer.disconnect();
      media.removeEventListener("change", changed);
      video.pause();
    };
  }, [reduced]);
  return (
    <div className="relative aspect-[16/10] overflow-hidden bg-ink">
      <video
        ref={ref}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="none"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        aria-label={label}
        className="h-full w-full object-cover"
      />
      <button
        type="button"
        className="media-toggle"
        aria-label={playing ? "Pause project video" : "Play project video"}
        onClick={() => {
          manual.current = true;
          if (playing) ref.current?.pause();
          else void ref.current?.play().catch(() => {});
        }}
      >
        {playing ? "Pause" : "Play"}{" "}
        <span aria-hidden="true">{playing ? "Ⅱ" : "▷"}</span>
      </button>
    </div>
  );
}
