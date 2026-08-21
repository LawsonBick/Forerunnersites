import { cx } from "@/lib/cx";

export function Tag({
  children,
  dark = false,
  className,
}: {
  children: React.ReactNode;
  dark?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cx(
        "inline-block rounded-[var(--radius-xs)] border px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.1em]",
        dark ? "border-white/25 text-paper-soft" : "border-ink/15 text-ink-soft",
        className
      )}
    >
      {children}
    </span>
  );
}
