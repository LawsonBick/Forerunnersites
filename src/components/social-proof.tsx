import Image from "next/image";
import Link from "next/link";
import type { Testimonial, VerifiedResult } from "@/content/social-proof";

export function TestimonialCard({ testimonial: t }: { testimonial: Testimonial }) {
  return <figure className="rounded-[6px] border border-line bg-wash p-6 sm:p-8">
    <blockquote className="font-display text-2xl leading-relaxed">“{t.quote}”</blockquote>
    <figcaption className="mt-6 flex items-center gap-4">
      {t.photo ? <Image {...t.photo} alt={t.photo.alt} sizes="48px" className="h-12 w-12 rounded-full object-cover" /> : null}
      <div><p className="text-sm font-medium">{t.clientName}</p><p className="mt-1 text-sm text-ink-soft">{t.position ? `${t.position}, ` : ""}{t.company}</p><Link className="mt-2 inline-block text-sm text-accent underline underline-offset-4" href={`/work/${t.projectSlug}`}>View the project</Link></div>
    </figcaption>
  </figure>;
}
export function ProjectResults({ results }: { results: VerifiedResult[] }) {
  const verified = results.filter((r) => r.approvedForPublication && r.sourceLabel && r.verifiedAt && r.methodology && r.period);
  if (!verified.length) return null;
  return <section className="border-t border-line py-10"><h2 className="font-display text-2xl">Measured results</h2><div className="mt-6 grid gap-6 sm:grid-cols-2">{verified.map((r) => <div key={`${r.label}-${r.period}`}><p className="font-display text-3xl">{r.value}</p><h3 className="mt-2 font-medium">{r.label}</h3><p className="mt-2 text-sm text-ink-soft">{r.period}{r.comparisonPeriod ? ` compared with ${r.comparisonPeriod}` : ""}</p><p className="mt-2 text-sm leading-relaxed text-ink-soft">{r.methodology}</p><p className="mt-2 text-xs text-ink-soft">Source: {r.sourceUrl ? <a href={r.sourceUrl} className="underline">{r.sourceLabel}</a> : r.sourceLabel} · Verified {r.verifiedAt}</p></div>)}</div></section>;
}
