import { ButtonLink, ArrowLink } from "@/components/button";
import { packages } from "@/content/pricing";
import { cx } from "@/lib/cx";

/**
 * The three package cards. `detailed` shows the full include list
 * (pricing page); otherwise a preview with a link to compare (home).
 */
export function PricingCards({ detailed = false }: { detailed?: boolean }) {
  return (
    <div className="stagger grid gap-6 lg:grid-cols-3" data-reveal>
      {packages.map((pkg) => {
        const items = detailed ? pkg.includes : pkg.includes.slice(0, 6);
        return (
          <article
            key={pkg.id}
            className={cx(
              "relative flex flex-col rounded-[6px] border bg-white p-7 sm:p-8",
              pkg.recommended ? "border-accent shadow-[var(--shadow-frame-sm)]" : "border-line"
            )}
          >
            {pkg.recommended ? (
              <p className="absolute -top-3 left-7 rounded-[var(--radius-xs)] bg-accent px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white">
                Most popular
              </p>
            ) : null}

            <h3 className="font-display text-2xl">{pkg.name}</h3>
            <p className="mt-3 flex items-baseline gap-2">
              <span className="font-display text-[2.5rem] leading-none tracking-[-0.01em]">
                {pkg.price}
              </span>
              <span className="text-sm text-ink-soft">{pkg.priceNote}</span>
            </p>
            <p className="mt-4 text-sm leading-relaxed text-ink-soft">{pkg.bestFor}</p>

            <ul className="mt-6 flex-1 space-y-2.5 border-t border-line pt-6">
              {items.map((item) => (
                <li key={item} className="flex gap-2.5 text-sm leading-snug text-ink">
                  <span
                    aria-hidden="true"
                    className="mt-[7px] inline-block h-[5px] w-[5px] shrink-0 bg-accent"
                  />
                  {item}
                </li>
              ))}
              {!detailed && pkg.includes.length > items.length ? (
                <li className="pt-1">
                  <ArrowLink href="/pricing" className="text-[13px]">
                    Everything included
                  </ArrowLink>
                </li>
              ) : null}
            </ul>

            {detailed ? (
              <p className="mt-6 border-t border-line pt-5 text-[13px] leading-relaxed text-ink-soft">
                {pkg.expectation}
              </p>
            ) : null}

            <p className="mt-5 text-[13px] font-medium text-ink-soft">
              Timeline: <span className="text-ink">{pkg.timeline}</span>
            </p>

            <ButtonLink
              href={pkg.cta.href}
              variant={pkg.recommended ? "primary" : "secondary"}
              className="mt-6 w-full"
            >
              {pkg.cta.label}
            </ButtonLink>
          </article>
        );
      })}
    </div>
  );
}
