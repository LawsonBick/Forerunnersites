"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/config/site";
import { Container } from "@/components/container";
import { ButtonLink } from "@/components/button";
import { Wordmark } from "@/components/logo";
import { cx } from "@/lib/cx";

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Keep body scroll locked while the menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <header
      className={cx(
        "fixed inset-x-0 top-0 z-50 bg-paper transition-[border-color] duration-300",
        scrolled || open ? "border-b border-line" : "border-b border-transparent"
      )}
    >
      <Container className="flex h-16 items-center justify-between lg:h-[72px]">
        <Link href="/" className="logo-hover text-ink" aria-label={`${site.name} — home`}>
          <Wordmark />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={cx(
                "nav-link text-sm transition-colors",
                isActive(item.href) ? "font-medium text-ink" : "text-ink-soft hover:text-ink"
              )}
            >
              {item.label}
            </Link>
          ))}
          <ButtonLink href={site.cta.primary.href} size="sm">
            {site.cta.primary.label}
          </ButtonLink>
        </nav>

        <button
          type="button"
          className="relative flex h-10 w-10 flex-col items-center justify-center gap-[5px] md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span
            aria-hidden="true"
            className={cx(
              "h-[1.5px] w-5 bg-ink transition-transform duration-300",
              open && "translate-y-[3.25px] rotate-45"
            )}
          />
          <span
            aria-hidden="true"
            className={cx(
              "h-[1.5px] w-5 bg-ink transition-transform duration-300",
              open && "-translate-y-[3.25px] -rotate-45"
            )}
          />
        </button>
      </Container>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={cx(
          "fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto bg-paper md:hidden",
          open ? "block" : "hidden"
        )}
        onClick={(e) => {
          // Any link tap (nav, CTA, email) closes the menu.
          if ((e.target as HTMLElement).closest("a")) setOpen(false);
        }}
      >
        <Container className="flex min-h-full flex-col pt-6 pb-10">
          <nav aria-label="Mobile" className="flex flex-col divide-y divide-line border-y border-line">
            {[...site.nav, { label: "Contact", href: "/contact" }].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cx(
                  "flex items-baseline justify-between py-5 font-display text-3xl",
                  isActive(item.href) ? "text-accent" : "text-ink"
                )}
              >
                {item.label}
                <span aria-hidden="true" className="text-lg text-ink-faint">
                  →
                </span>
              </Link>
            ))}
          </nav>
          <div className="mt-8 flex flex-col gap-4">
            <ButtonLink href={site.cta.primary.href} className="w-full">
              {site.cta.primary.label}
            </ButtonLink>
            <a
              href={`mailto:${site.email}`}
              className="text-center text-sm text-ink-soft underline underline-offset-4 hover:text-ink"
            >
              {site.email}
            </a>
          </div>
        </Container>
      </div>
    </header>
  );
}
