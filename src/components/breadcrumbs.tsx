import Link from "next/link";
import { cx } from "@/lib/cx";

export interface Crumb {
  label: string;
  /** Omit on the last item, which is the current page. */
  href?: string;
}

/**
 * Visible breadcrumb trail for nested pages. The matching BreadcrumbList
 * JSON-LD comes from `breadcrumbSchema()` in lib/schema.ts, fed the same
 * items, so the two can never disagree.
 */
export function Breadcrumbs({ items, className }: { items: Crumb[]; className?: string }) {
  return (
    <nav aria-label="Breadcrumb" className={cx("text-sm text-ink-soft", className)}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={item.label} className="flex items-center gap-x-2">
              {item.href && !last ? (
                <Link
                  href={item.href}
                  className="font-medium transition-colors hover:text-ink hover:underline hover:underline-offset-4"
                >
                  {item.label}
                </Link>
              ) : (
                <span aria-current="page" className="text-ink">
                  {item.label}
                </span>
              )}
              {!last ? (
                <span aria-hidden="true" className="text-ink-faint">
                  /
                </span>
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
