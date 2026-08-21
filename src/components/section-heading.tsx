import { cx } from "@/lib/cx";

/** The small labeled marker used above every section title. */
export function Eyebrow({
  children,
  dark = false,
  className,
  as: Tag = "p",
}: {
  children: React.ReactNode;
  dark?: boolean;
  className?: string;
  /** Render as a heading (e.g. "h2") when the label titles a section. */
  as?: "p" | "h2" | "h3";
}) {
  return (
    <Tag
      className={cx(
        "flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.18em]",
        dark ? "text-paper-soft" : "text-ink-soft",
        className
      )}
    >
      <span aria-hidden="true" className="inline-block h-[7px] w-[7px] bg-accent" />
      {children}
    </Tag>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lede,
  dark = false,
  className,
  entrance = "reveal",
  as: Tag = "h2",
}: {
  eyebrow: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  dark?: boolean;
  className?: string;
  /**
   * "reveal" animates on scroll (below-the-fold sections); "rise" plays a
   * CSS-only entrance immediately — use it for page-top headings so LCP
   * never waits on hydration; "none" renders statically.
   */
  entrance?: "reveal" | "rise" | "none";
  /** Use "h1" when this heading titles the page. */
  as?: "h1" | "h2";
}) {
  return (
    <div
      className={cx("max-w-3xl", entrance === "rise" && "rise", className)}
      data-reveal={entrance === "reveal" ? "" : undefined}
    >
      <Eyebrow dark={dark}>{eyebrow}</Eyebrow>
      <Tag
        className={cx(
          "mt-4 font-display text-[clamp(1.85rem,1.2rem+2.1vw,2.7rem)] leading-[1.12] tracking-[-0.01em] text-balance",
          dark ? "text-paper" : "text-ink"
        )}
      >
        {title}
      </Tag>
      {lede ? (
        <p
          className={cx(
            "mt-4 max-w-2xl text-lg leading-relaxed",
            dark ? "text-paper-soft" : "text-ink-soft"
          )}
        >
          {lede}
        </p>
      ) : null}
    </div>
  );
}
