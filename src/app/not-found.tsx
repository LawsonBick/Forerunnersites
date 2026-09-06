import Link from "next/link";
import { Container } from "@/components/container";
import { Eyebrow } from "@/components/section-heading";
import { ButtonLink } from "@/components/button";

const suggestions = [
  { label: "See the work", href: "/work" },
  { label: "Browse services", href: "/services" },
  { label: "Check pricing", href: "/pricing" },
];

export default function NotFound() {
  return (
    <section>
      <Container className="pt-16 pb-24 sm:pt-24 lg:pt-32 lg:pb-32">
        <div className="max-w-2xl">
          <Eyebrow>Error 404</Eyebrow>
          <h1 className="mt-4 font-display text-[clamp(2.4rem,1.4rem+3.8vw,4.25rem)] leading-[1.05] tracking-[-0.015em]">
            This page doesn&apos;t exist.
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-ink-soft">
            The page you&apos;re looking for moved, was renamed, or never
            existed. Broken links are exactly the kind of thing this studio
            gets hired to fix, so apologies for the irony. Here&apos;s a way
            forward:
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <ButtonLink href="/">Back to the homepage</ButtonLink>
            {suggestions.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="text-sm font-medium text-accent underline underline-offset-4 transition-colors hover:text-accent-deep"
              >
                {s.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
