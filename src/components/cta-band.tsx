import { ButtonLink } from "@/components/button";
import { Container } from "@/components/container";
import { Eyebrow } from "@/components/section-heading";
import { site } from "@/config/site";

/**
 * The closing call-to-action band used at the end of most pages.
 * Sits on ink so it flows into the footer as one dark closing block.
 */
export function CtaBand({
  eyebrow = "Start a project",
  title,
  copy,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  copy?: string;
}) {
  return (
    <section className="border-b border-line-dark bg-ink text-paper">
      <Container className="py-20 lg:py-28">
        <div className="max-w-3xl" data-reveal>
          <Eyebrow dark>{eyebrow}</Eyebrow>
          <h2 className="mt-4 font-display text-[clamp(2rem,1.3rem+2.6vw,3.2rem)] leading-[1.1] tracking-[-0.01em] text-balance">
            {title}
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-paper-soft">
            {copy ??
              "Tell me about your business and what the website needs to do. You'll get a straight answer on scope, timeline, and price — usually within one business day."}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
            <ButtonLink href={site.cta.primary.href}>{site.cta.primary.label}</ButtonLink>
            <a
              href={`mailto:${site.email}`}
              className="text-sm text-paper-soft underline underline-offset-4 transition-colors hover:text-paper"
            >
              or email {site.email}
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
