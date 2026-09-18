"use client";
import { useEffect, useSyncExternalStore } from "react";
const key = "forerunner-reduce-motion";
const eventName = "forerunner-motion-change";
function subscribe(change: () => void) {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", change);
  window.addEventListener(eventName, change);
  window.addEventListener("storage", change);
  return () => {
    media.removeEventListener("change", change);
    window.removeEventListener(eventName, change);
    window.removeEventListener("storage", change);
  };
}
function snapshot() {
  const system = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  try {
    return system || window.localStorage.getItem(key) === "true";
  } catch {
    return system || document.documentElement.dataset.motion === "reduced";
  }
}
export function useReducedMotion() {
  return useSyncExternalStore(subscribe, snapshot, () => false);
}
export function MotionPreference() {
  const reduced = useReducedMotion();
  useEffect(() => {
    document.documentElement.dataset.motion = reduced ? "reduced" : "full";
  }, [reduced]);
  return (
    <button
      type="button"
      aria-pressed={reduced}
      className="text-left text-xs text-ink-soft underline underline-offset-4 hover:text-ink"
      onClick={() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
          return;
        document.documentElement.dataset.motion = !reduced ? "reduced" : "full";
        try {
          window.localStorage.setItem(key, String(!reduced));
        } catch {}
        window.dispatchEvent(new Event(eventName));
      }}
    >
      {reduced ? "Reduced motion on" : "Reduce motion"}
    </button>
  );
}
