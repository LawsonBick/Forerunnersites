import Link from "next/link";
import { site } from "@/config/site";
import { Container } from "@/components/container";

export function SiteFooter() {
  const year = new Date().getFullYear();
  const socials = [
    { label: "Instagram", href: site.social.instagram },
    { label: "LinkedIn", href: site.social.linkedin },
    { label: "X", href: site.social.x },
  ].filter((s): s is { label: string; href: string } => Boolean(s.href));

  return (
    <footer className="bg-ink text-paper">
      <Container className="py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="inline-flex items-baseline gap-2">
              <span aria-hidden="true" className="inline-block h-2 w-2 self-center bg-accent" />
              <span className="text-[17px] font-semibold tracking-[-0.01em]">{site.name}</span>
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-paper-soft">
              Strategic websites for local businesses, service companies,
              restaurants, and growing brands.
            </p>
            <p className="mt-6 text-sm text-paper-soft">
              {site.location.city}, {site.location.regionFull}
            </p>
          </div>

          <nav aria-label="Footer" className="lg:col-span-3">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-paper-soft">
              Site
            </h2>
            <ul className="mt-4 space-y-3">
              {site.footerNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-paper transition-colors hover:text-white hover:underline hover:underline-offset-4"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-4">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-paper-soft">
              Contact
            </h2>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="text-sm text-paper transition-colors hover:text-white hover:underline hover:underline-offset-4"
                >
                  {site.email}
                </a>
              </li>
              {site.phone ? (
                <li>
                  <a
                    href={`tel:${site.phone.replace(/[^+\d]/g, "")}`}
                    className="text-sm text-paper transition-colors hover:text-white hover:underline hover:underline-offset-4"
                  >
                    {site.phone}
                  </a>
                </li>
              ) : null}
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-paper transition-colors hover:text-white hover:underline hover:underline-offset-4"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-line-dark pt-6 text-[13px] text-paper-soft sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.legalName}. All rights reserved.
          </p>
          <p className="flex items-center gap-5">
            <Link href="/privacy" className="transition-colors hover:text-paper">
              Privacy
            </Link>
            <span>Designed and built in Austin, Texas.</span>
          </p>
        </div>
      </Container>
    </footer>
  );
}
