import type { Faq } from "@/content/pricing";

export function FaqList({ faqs }: { faqs: Faq[] }) {
  return (
    <div className="divide-y divide-line border-y border-line" data-reveal>
      {faqs.map((faq) => (
        <details key={faq.question} className="group">
          <summary className="flex cursor-pointer items-center justify-between gap-6 py-5 text-left text-[15px] font-medium text-ink transition-colors hover:text-accent-deep">
            {faq.question}
            <span
              aria-hidden="true"
              className="text-xl font-light text-ink-faint transition-transform duration-300 group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="max-w-3xl pb-6 text-[15px] leading-relaxed text-ink-soft">
            {faq.answer}
          </p>
        </details>
      ))}
    </div>
  );
}
