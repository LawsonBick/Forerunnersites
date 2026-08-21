"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/button";
import { site } from "@/config/site";
import { cx } from "@/lib/cx";

const inputClasses =
  "block w-full rounded-[var(--radius-xs)] border bg-white px-3.5 py-2.5 text-[15px] text-ink placeholder:text-ink-faint transition-colors focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20";

const labelClasses = "block text-[13px] font-medium text-ink";

function Field({
  label,
  htmlFor,
  required,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className={labelClasses}>
        {label}
        {required ? (
          <span aria-hidden="true" className="text-accent">
            {" "}
            *
          </span>
        ) : (
          <span className="font-normal text-ink-soft"> (optional)</span>
        )}
      </label>
      <div className="mt-1.5">{children}</div>
      {error ? (
        <p id={`${htmlFor}-error`} className="mt-1.5 text-[13px] font-medium text-[#b3261e]">
          {error}
        </p>
      ) : null}
    </div>
  );
}

const packageOptions = [
  { value: "launch", label: "Launch — $500" },
  { value: "growth", label: "Growth — $1,500" },
  { value: "custom", label: "Custom — $3,000+" },
  { value: "not-sure", label: "Not sure yet" },
];

const industryOptions = [
  "Restaurant & hospitality",
  "Home & local services",
  "Automotive",
  "Health & wellness",
  "Professional services",
  "Retail & e-commerce",
  "Other",
];

const goalOptions = [
  "Generate more leads and calls",
  "Take bookings or reservations",
  "Modernize an outdated website",
  "Launch a new business",
  "Sell products online",
  "Something else",
];

const featureOptions = [
  "Contact or quote forms",
  "Online booking or reservations",
  "Menus or service pricing",
  "Photo gallery",
  "Customer reviews",
  "Online ordering or e-commerce",
  "Blog or editable content",
  "Analytics and tracking",
];

const launchOptions = ["As soon as possible", "Within 1–2 months", "In 3+ months", "Flexible"];

const heardOptions = [
  "Referral from someone I know",
  "Google search",
  "Saw a website you built",
  "Social media",
  "Other",
];

type Status = "idle" | "submitting" | "success" | "error";
type Errors = Partial<Record<"name" | "email" | "details", string>>;

export function ContactForm({ defaultPackage }: { defaultPackage?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const summaryRef = useRef<HTMLDivElement>(null);

  const initialPackage = packageOptions.some((o) => o.value === defaultPackage)
    ? defaultPackage
    : "not-sure";

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const details = String(data.get("details") ?? "").trim();

    const nextErrors: Errors = {};
    if (!name) nextErrors.name = "Please add your name so I know who to reply to.";
    if (!email) {
      nextErrors.email = "Please add your email so I can reply.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = "That email doesn't look complete — check for a typo.";
    }
    if (!details) {
      nextErrors.details = "A sentence or two about the project helps me give you a useful reply.";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }

    setStatus("submitting");
    const payload: Record<string, string | string[]> = {};
    for (const [key, value] of data.entries()) {
      if (typeof value !== "string") continue;
      if (key === "features") {
        payload.features = [...(payload.features as string[] | undefined) ?? [], value];
      } else {
        payload[key] = value;
      }
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        className="rounded-[6px] border border-line bg-white p-8 sm:p-10"
        role="status"
        aria-live="polite"
      >
        <p className="flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-soft">
          <span aria-hidden="true" className="inline-block h-[7px] w-[7px] bg-accent" />
          Request received
        </p>
        <h2 className="mt-4 font-display text-3xl">Thanks — your inquiry is in.</h2>
        <p className="mt-4 max-w-xl leading-relaxed text-ink-soft">
          I read every inquiry personally and reply within one business day, usually
          sooner. The reply will come from{" "}
          <a href={`mailto:${site.email}`} className="text-accent underline underline-offset-4">
            {site.email}
          </a>
          , so keep an eye on your inbox.
        </p>
        {site.schedulingUrl ? (
          <p className="mt-4 max-w-xl leading-relaxed text-ink-soft">
            Want to skip ahead?{" "}
            <a
              href={site.schedulingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent underline underline-offset-4"
            >
              Book a discovery call
            </a>{" "}
            at a time that works for you.
          </p>
        ) : null}
      </div>
    );
  }

  const errorEntries = Object.entries(errors) as [keyof Errors, string][];

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6">
      {errorEntries.length > 0 ? (
        <div
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          className="rounded-[var(--radius-xs)] border border-[#b3261e]/40 bg-[#b3261e]/5 p-4"
        >
          <p className="text-sm font-medium text-[#8f1f18]">
            A few fields need attention before this can send:
          </p>
          <ul className="mt-2 list-inside list-disc text-sm text-[#8f1f18]">
            {errorEntries.map(([key, msg]) => (
              <li key={key}>
                <a href={`#${key}`} className="underline underline-offset-2">
                  {msg}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Name" htmlFor="name" required error={errors.name}>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={cx(inputClasses, errors.name ? "border-[#b3261e]" : "border-ink/20")}
          />
        </Field>
        <Field label="Email" htmlFor="email" required error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={cx(inputClasses, errors.email ? "border-[#b3261e]" : "border-ink/20")}
          />
        </Field>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Company or business name" htmlFor="company">
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            className={cx(inputClasses, "border-ink/20")}
          />
        </Field>
        <Field label="Current website" htmlFor="current_website">
          <input
            id="current_website"
            name="current_website"
            type="url"
            inputMode="url"
            placeholder="https://"
            className={cx(inputClasses, "border-ink/20")}
          />
        </Field>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Industry" htmlFor="industry">
          <select
            id="industry"
            name="industry"
            defaultValue=""
            className={cx(inputClasses, "border-ink/20")}
          >
            <option value="" disabled>
              Select an industry
            </option>
            {industryOptions.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Package or budget" htmlFor="package">
          <select
            id="package"
            name="package"
            defaultValue={initialPackage}
            className={cx(inputClasses, "border-ink/20")}
          >
            {packageOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Primary goal" htmlFor="goal">
          <select
            id="goal"
            name="goal"
            defaultValue=""
            className={cx(inputClasses, "border-ink/20")}
          >
            <option value="" disabled>
              What should the site accomplish?
            </option>
            {goalOptions.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Desired launch date" htmlFor="timeline">
          <select
            id="timeline"
            name="timeline"
            defaultValue=""
            className={cx(inputClasses, "border-ink/20")}
          >
            <option value="" disabled>
              When do you want to launch?
            </option>
            {launchOptions.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <fieldset>
        <legend className={labelClasses}>
          Features you think you need{" "}
          <span className="font-normal text-ink-soft">(optional — check any)</span>
        </legend>
        <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
          {featureOptions.map((o) => (
            <label
              key={o}
              className="flex cursor-pointer items-center gap-2.5 text-sm text-ink"
            >
              <input
                type="checkbox"
                name="features"
                value={o}
                className="h-4 w-4 rounded-[2px] border-ink/30 accent-[#2434c8]"
              />
              {o}
            </label>
          ))}
        </div>
      </fieldset>

      <Field label="Project details" htmlFor="details" required error={errors.details}>
        <textarea
          id="details"
          name="details"
          rows={6}
          required
          placeholder="What does your business do, and what should the new website change? Anything you already know about scope, pages, or examples you like is helpful."
          aria-invalid={errors.details ? true : undefined}
          aria-describedby={errors.details ? "details-error" : undefined}
          className={cx(inputClasses, "resize-y", errors.details ? "border-[#b3261e]" : "border-ink/20")}
        />
      </Field>

      <Field label="How did you hear about the studio?" htmlFor="heard_about">
        <select
          id="heard_about"
          name="heard_about"
          defaultValue=""
          className={cx(inputClasses, "border-ink/20")}
        >
          <option value="" disabled>
            Select one
          </option>
          {heardOptions.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </Field>

      {/* Honeypot — humans never see or fill this. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="company_site">Leave this field empty</label>
        <input id="company_site" name="company_site" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {status === "error" ? (
        <div role="alert" className="rounded-[var(--radius-xs)] border border-[#b3261e]/40 bg-[#b3261e]/5 p-4">
          <p className="text-sm text-[#8f1f18]">
            Something went wrong sending the form. Please try again, or email{" "}
            <a href={`mailto:${site.email}`} className="font-medium underline underline-offset-2">
              {site.email}
            </a>{" "}
            directly — same result, same reply time.
          </p>
        </div>
      ) : null}

      <div className="flex flex-wrap items-center gap-5 border-t border-line pt-6">
        <Button type="submit" disabled={status === "submitting"}>
          {status === "submitting" ? "Sending…" : "Send project inquiry"}
        </Button>
        <p className="text-[13px] text-ink-soft">
          You&apos;ll hear back within one business day.
        </p>
      </div>
    </form>
  );
}
