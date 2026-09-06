import Link from "next/link";
import { cx } from "@/lib/cx";

type Variant = "primary" | "secondary" | "inverse";
type Size = "md" | "sm";

const base =
  "inline-flex items-center justify-center gap-2 rounded-[var(--radius-xs)] font-medium tracking-[0.01em] transition-[color,background-color,border-color,transform,box-shadow] duration-200 select-none hover:-translate-y-[1.5px] active:translate-y-0 motion-reduce:transform-none";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-white hover:bg-accent-deep hover:shadow-[0_8px_18px_-8px_rgb(36_52_200/0.55)]",
  secondary:
    "border border-ink/25 text-ink hover:border-ink/60 hover:bg-ink/[0.04]",
  inverse: "bg-paper text-ink hover:bg-white",
};

const sizes: Record<Size, string> = {
  md: "px-6 py-3 text-sm",
  sm: "px-4 py-2 text-[13px]",
};

interface ButtonLinkProps {
  href: string;
  variant?: Variant;
  size?: Size;
  external?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  external = false,
  className,
  children,
}: ButtonLinkProps) {
  const classes = cx(base, variants[variant], sizes[size], className);
  if (external) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
        {children}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
}) {
  return (
    <button
      className={cx(base, variants[variant], sizes[size], "disabled:opacity-60", className)}
      {...props}
    />
  );
}

/** Inline text link with a moving arrow — the standard "read more" affordance. */
export function ArrowLink({
  href,
  external = false,
  className,
  children,
}: {
  href: string;
  external?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  const classes = cx(
    "group inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-accent-deep",
    className
  );
  const arrow = (
    <span
      aria-hidden="true"
      className="transition-transform duration-200 group-hover:translate-x-0.5"
    >
      {external ? "↗" : "→"}
    </span>
  );
  if (external) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
        {children}
        {arrow}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {children}
      {arrow}
    </Link>
  );
}
