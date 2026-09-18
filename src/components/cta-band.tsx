import { ButtonLink } from "@/components/button";
import { Container } from "@/components/container";
import { Eyebrow } from "@/components/section-heading";
import { site } from "@/config/site";

/**
 * The closing call-to-action band used at the end of most pages.
 * Uses sky blue and charcoal to create a light closing panel.
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
    <section className="border-b border-ink/10 bg-accent text-ink">
      <Container className="py-20 lg:py-28">
        <div className="max-w-4xl" data-reveal>
          <Eyebrow className="text-ink [&>span]:bg-ink">{eyebrow}</Eyebrow>
          <h2 className="mt-4 font-display text-[clamp(3.4rem,1.3rem+6vw,7rem)] leading-[1.1] tracking-[-0.01em] text-balance">
            {title}
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink">
            {copy ??
              "Tell me what your business needs. I’ll reply personally with a clear next step."}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
            <ButtonLink href={site.cta.primary.href} variant="primary">{site.cta.primary.label}</ButtonLink>
            <a
              href={`mailto:${site.email}`}
              className="text-sm text-ink underline underline-offset-4 transition-colors hover:text-ink"
            >
              or email {site.email}
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
