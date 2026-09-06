import type { Metadata } from "next";
import { site } from "@/config/site";
import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { JsonLd } from "@/components/json-ld";
import { buildMetadata } from "@/lib/seo";
import { webPageSchema } from "@/lib/schema";

const page = {
  title: "Privacy Policy",
  description:
    "How Forerunner Sites handles information shared through its contact form and analytics, in plain language: what is collected, why, and how to have it removed.",
  path: "/privacy",
};

export const metadata: Metadata = buildMetadata(page);

const sections: { title: string; body: string[] }[] = [
  {
    title: "What this site collects",
    body: [
      `When you submit the project inquiry form, ${site.name} receives the details you chose to share: your name, email address, and anything you wrote about your business and project. Nothing on this site asks for payment details or sensitive personal information.`,
      "If analytics are enabled, the site collects standard, aggregated usage data such as pages visited, approximate location, and device type, to understand how visitors use the site. This data does not identify you personally.",
    ],
  },
  {
    title: "How that information is used",
    body: [
      "Inquiry details are used for exactly one thing: responding to you about your project. They are not added to a mailing list, shared with third parties, or sold. Ever.",
      "Analytics data is used to improve the site itself, such as noticing which pages are unclear or where visitors get stuck.",
    ],
  },
  {
    title: "Cookies",
    body: [
      "This site does not use advertising or tracking cookies. If analytics are enabled, the analytics provider may set a small number of cookies to distinguish visits; these can be blocked in your browser without affecting the site.",
    ],
  },
  {
    title: "How long information is kept",
    body: [
      "Inquiry emails are kept as ordinary business correspondence. If you'd like your inquiry deleted, send a note and it will be removed.",
    ],
  },
  {
    title: "Your choices",
    body: [
      `You can ask what information ${site.name} holds about you, ask for it to be corrected, or ask for it to be deleted at any time. Email ${site.email} and it will be handled promptly.`,
    ],
  },
];

export default function PrivacyPage() {
  return (
    <section>
      <Container className="pt-12 pb-20 sm:pt-16 lg:pt-20 lg:pb-28">
        <SectionHeading
          as="h1"
          entrance="rise"
          eyebrow="Privacy"
          title="Plain-language privacy."
          lede={`${site.name} collects as little as possible and does nothing surprising with it. Here's the whole story.`}
        />
        <div className="mt-12 max-w-3xl">
          {sections.map((section) => (
            <div key={section.title} className="border-t border-line py-8">
              <h2 className="font-display text-2xl">{section.title}</h2>
              {section.body.map((p) => (
                <p key={p.slice(0, 40)} className="mt-3 leading-relaxed text-ink-soft">
                  {p}
                </p>
              ))}
            </div>
          ))}
          <div className="border-t border-line py-8">
            <h2 className="font-display text-2xl">Questions</h2>
            <p className="mt-3 leading-relaxed text-ink-soft">
              Anything unclear, or a request about your information? Email{" "}
              <a
                href={`mailto:${site.email}`}
                className="text-accent underline underline-offset-4"
              >
                {site.email}
              </a>
              .
            </p>
            <p className="mt-6 text-[13px] text-ink-soft">Last updated August 2026.</p>
          </div>
        </div>
      </Container>

      <JsonLd data={webPageSchema({ ...page, dateModified: "2026-08-01" })} />
    </section>
  );
}
