import { site } from "@/config/site";
import { cx } from "@/lib/cx";

/**
 * The Forerunner Sites mark: two squares stepping up and to the right —
 * one solid, one open — for something moving out ahead.
 *
 * It elevates the small accent square already used as the eyebrow motif
 * throughout the site, so the logo and the design system share a shape.
 * Drawn with currentColor plus an explicit accent so it stays legible on
 * both the paper and ink backgrounds.
 */
export function LogoMark({
  className,
  inverse = false,
}: {
  className?: string;
  inverse?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 20 20"
      aria-hidden="true"
      focusable="false"
      className={cx("logo-mark shrink-0", className)}
    >
      <rect x="0" y="10" width="10" height="10" className="lm-solid fill-accent" />
      <rect
        x="10.9"
        y="0.9"
        width="8.2"
        height="8.2"
        fill="none"
        strokeWidth="1.8"
        className={cx("lm-outline", inverse ? "stroke-paper" : "stroke-ink")}
      />
    </svg>
  );
}

/** Mark plus name, used in the header and footer. */
export function Wordmark({
  className,
  inverse = false,
}: {
  className?: string;
  inverse?: boolean;
}) {
  return (
    <span className={cx("inline-flex items-center gap-2.5", className)}>
      <LogoMark inverse={inverse} className="h-5 w-5" />
      <span className="text-[17px] font-semibold tracking-[-0.01em]">
        {site.name}
      </span>
    </span>
  );
}
