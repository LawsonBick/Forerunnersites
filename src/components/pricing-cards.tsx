import { ButtonLink, ArrowLink } from "@/components/button";
import { packages, formatPrice } from "@/content/pricing";

const highlights = {
  launch: [
    "One focused page",
    "Mobile-ready design",
    "Contact form + SEO basics",
  ],
  growth: [
    "Up to five core pages",
    "A design shaped around your brand",
    "Local SEO + analytics setup",
  ],
  custom: [
    "A tailored sitemap & scope",
    "Fully custom design",
    "Advanced features, scoped together",
  ],
};
export function PricingCards() {
  return (
    <div
      className="pricing-grid grid gap-0 border-y border-line lg:grid-cols-3"
      data-reveal="up"
    >
      {packages.map((pkg, i) => (
        <article
          key={pkg.id}
          className={`price-column relative flex flex-col px-6 py-9 sm:px-9 ${pkg.recommended ? "bg-wash" : ""}`}
        >
          <div className="flex items-center justify-between">
            <p className="kicker text-ink-soft">
              0{i + 1} /{" "}
              {pkg.id === "launch"
                ? "A focused start"
                : pkg.id === "growth"
                  ? "Room to grow"
                  : "Built around you"}
            </p>
            {pkg.recommended ? (
              <span className="rounded-full bg-accent px-2.5 py-1 text-[9px] font-medium uppercase tracking-wider text-white">
                Recommended
              </span>
            ) : null}
          </div>
          <h3 className="mt-6 font-display text-4xl">{pkg.name}</h3>
          <p className="mt-5 flex flex-wrap items-baseline gap-2">
            <span className="font-display text-5xl tracking-[-0.035em]">
              {pkg.price}
            </span>
            <span className="text-xs text-ink-soft">one-time build</span>
          </p>
          <p className="mt-2 text-sm text-accent">
            + {formatPrice(pkg.hosting.monthlyPrice)}/month hosting
          </p>
          <ul className="my-7 space-y-3 text-sm text-ink-soft">
            {highlights[pkg.id].map((item) => (
              <li key={item} className="flex gap-2">
                <span className="text-accent" aria-hidden="true">
                  ↗
                </span>
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-auto border-t border-line pt-5">
            <p className="text-xs leading-relaxed text-ink-soft lg:min-h-10">
              {pkg.id === "launch"
                ? "Hosting only. Edits quoted separately."
                : pkg.id === "growth"
                  ? "2 small changes/month, up to 15 minutes each."
                  : "2 hours of updates & support/month. Priority email."}
            </p>
            <ButtonLink
              href={pkg.cta.href}
              variant={pkg.recommended ? "primary" : "secondary"}
              className="mt-5 w-full"
            >
              {pkg.id === "custom"
                ? "Discuss your project"
                : `Choose ${pkg.name}`}
            </ButtonLink>
            <div className="mt-4 text-center">
              <ArrowLink href={`/pricing/${pkg.id}`} className="text-xs">
                Full package details
              </ArrowLink>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
