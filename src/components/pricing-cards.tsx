import { ButtonLink, ArrowLink } from "@/components/button";
import { packages, formatPrice } from "@/content/pricing";
import { cx } from "@/lib/cx";

/** Shared build + hosting prices keep the homepage and pricing page aligned. */
export function PricingCards({ detailed = false }: { detailed?: boolean }) {
  return (
    <div className="stagger grid gap-6 lg:grid-cols-3" data-reveal>
      {packages.map((pkg) => (
        <article
          key={pkg.id}
          className={cx(
            "relative flex min-w-0 flex-col rounded-[6px] border bg-white",
            pkg.recommended ? "border-accent shadow-[var(--shadow-frame-sm)]" : "border-line"
          )}
        >
          {pkg.recommended ? (
            <p className="absolute -top-3 left-7 rounded-[var(--radius-xs)] bg-accent px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white">
              Most popular
            </p>
          ) : null}

          <div className="flex flex-1 flex-col p-7 pb-6 sm:p-8 sm:pb-6">
            <h3 className="font-display text-3xl">{pkg.name}</h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft lg:min-h-[4.5rem]">{pkg.bestFor}</p>

            <div className="mt-6 border-t border-line pt-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-soft">01 / Website build</p>
              <p className="mt-3 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                <span className="font-display text-[2.6rem] leading-none tracking-[-0.02em]">{pkg.price}</span>
                <span className="text-xs text-ink-soft">one-time</span>
              </p>
            </div>

            <ul className="mt-6 space-y-2.5">
              {pkg.includes.slice(0, detailed ? 5 : 4).map((item) => (
                <li key={item} className="flex gap-2.5 text-sm leading-relaxed">
                  <span aria-hidden="true" className="mt-[8px] h-[5px] w-[5px] shrink-0 bg-accent" />
                  {item}
                </li>
              ))}
            </ul>
            {detailed ? (
              <details className="group mt-5 border-t border-line pt-4">
                <summary className="flex cursor-pointer items-center justify-between gap-3 text-sm font-medium text-accent hover:text-accent-deep">
                  Full {pkg.name} build scope
                  <span aria-hidden="true" className="text-lg transition-transform group-open:rotate-45">+</span>
                </summary>
                <ul className="mt-4 space-y-2">
                  {pkg.includes.slice(5).map((item) => <li key={item} className="text-sm leading-relaxed text-ink-soft">{item}</li>)}
                </ul>
                <p className="mt-4 text-xs leading-relaxed text-ink-soft">{pkg.expectation}</p>
              </details>
            ) : (
              <ArrowLink href="/pricing#compare" className="mt-5 text-[13px]">Compare the full build scope</ArrowLink>
            )}
            <p className="mt-auto pt-5 text-xs leading-relaxed text-ink-soft">Build timeline: {pkg.timeline}</p>
          </div>

          <div className={cx("border-t px-7 py-6 sm:px-8", pkg.recommended ? "border-accent/15 bg-accent/[0.045]" : "border-line bg-wash/70")}>
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-soft">02 / Monthly hosting</p>
            <p className="mt-3 flex items-baseline gap-1.5">
              <span className="font-display text-[2rem] leading-none">+ {formatPrice(pkg.hosting.monthlyPrice)}</span>
              <span className="text-sm text-ink-soft">/ month</span>
            </p>
            <p className="mt-4 text-sm font-medium leading-relaxed lg:min-h-[2.75rem]">{pkg.hosting.changeAllowance}</p>
            <p className="mt-2 text-xs leading-relaxed text-ink-soft">
              {pkg.id === "growth" ? "Up to 15 minutes per change. Hosting and HTTPS included." : pkg.id === "custom" ? "Content, small layout refinements, and priority email support." : "Managed hosting, HTTPS, and your domain connected."}
            </p>
            <ButtonLink href={pkg.cta.href} variant={pkg.recommended ? "primary" : "secondary"} className="mt-6 w-full">
              {pkg.cta.label}
            </ButtonLink>
          </div>
        </article>
      ))}
    </div>
  );
}
