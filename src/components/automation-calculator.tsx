"use client";

import { useState } from "react";

const dollars = new Intl.NumberFormat("en-US", {
  style: "currency", currency: "USD", maximumFractionDigits: 0,
});
const maxJobValue = 1_000_000;

/** Illustrative missed-call estimate; the only client island on this page. */
export function AutomationCalculator() {
  const [missedCalls, setMissedCalls] = useState(5);
  const [jobValue, setJobValue] = useState("250");
  const number = Number(jobValue);
  const averageJob = Number.isFinite(number) ? Math.max(0, Math.min(number, maxJobValue)) : 0;
  const monthly = missedCalls * 4.33 * averageJob * 0.5;

  return (
    <div className="mt-9 grid overflow-hidden rounded-[6px] border border-line bg-white lg:grid-cols-2">
      <div className="space-y-9 p-6 sm:p-9 lg:p-12">
        <div>
          <div className="flex items-center justify-between gap-4">
            <label htmlFor="missed-calls" className="text-sm font-medium">Missed calls per week</label>
            <span aria-hidden="true" className="text-3xl font-medium tabular-nums text-brand">{missedCalls}</span>
          </div>
          <input id="missed-calls" type="range" min="0" max="30" step="1" value={missedCalls}
            onChange={(event) => setMissedCalls(Number(event.target.value))}
            aria-valuetext={`${missedCalls} missed calls per week`}
            className="mt-3 block h-11 w-full cursor-pointer accent-brand" />
          <div aria-hidden="true" className="flex justify-between text-xs text-ink-soft"><span>0 calls</span><span>30 calls</span></div>
        </div>
        <div>
          <label htmlFor="average-job-value" className="block text-sm font-medium">Average job value</label>
          <div className="relative mt-3">
            <span aria-hidden="true" className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-xl text-ink-soft">$</span>
            <input id="average-job-value" type="number" min="0" max={maxJobValue} step="0.01" inputMode="decimal"
              value={jobValue} onChange={(event) => setJobValue(event.target.value)}
              onBlur={() => setJobValue(String(Math.round(averageJob * 100) / 100))}
              aria-describedby="job-value-hint"
              className="block min-h-14 w-full rounded-[var(--radius-xs)] border border-line bg-white py-3 pr-4 pl-9 text-xl tabular-nums text-ink focus:border-brand" />
          </div>
          <p id="job-value-hint" className="mt-2 text-xs text-ink-soft">In dollars, before expenses.</p>
        </div>
      </div>
      <div className="flex flex-col justify-center border-t border-line bg-accent-soft p-6 sm:p-9 lg:border-t-0 lg:border-l lg:p-12">
        <p id="revenue-label" className="text-sm font-medium">Potential revenue slipping away</p>
        <output id="automation-revenue" htmlFor="missed-calls average-job-value" aria-labelledby="revenue-label" aria-live="polite" aria-atomic="true"
          className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className={`font-medium leading-none tracking-[-0.055em] tabular-nums ${monthly >= 10_000_000 ? "text-[clamp(1.9rem,4vw,4rem)]" : "text-[clamp(2.8rem,6vw,5.5rem)]"}`}>
            {dollars.format(monthly)}
          </span>
          <span className="text-sm text-ink-soft">/mo</span>
        </output>
        <p className="mt-7 max-w-sm text-sm leading-relaxed">Lead Catcher pays for itself at $149/mo — one saved job covers months.</p>
        <p className="mt-5 border-t border-ink/10 pt-4 text-xs leading-relaxed text-ink-soft">
          Estimate: missed calls × 4.33 weeks × job value × 50%. Assumes half of missed calls were real jobs. Illustrative potential, not guaranteed revenue.
        </p>
      </div>
    </div>
  );
}
