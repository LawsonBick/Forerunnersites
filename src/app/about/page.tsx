import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import Image from "next/image";
import { site } from "@/config/site";
import { Container } from "@/components/container";
import { SectionHeading, Eyebrow } from "@/components/section-heading";
import { CtaBand } from "@/components/cta-band";

export const metadata: Metadata = {
  title: "About",
  description:
    "Forerunner Sites is an owner-led web studio in Austin, Texas. You work directly with the person designing and building your website, from the first conversation through launch.",
  alternates: { canonical: "/about" },
};

const beliefs = [
  {
    title: "A website should make you easier to trust and easier to choose.",
    detail:
      "That's the whole job. Every design decision either moves a visitor toward choosing you or it's decoration.",
  },
  {
    title: "Speed is respect.",
    detail:
      "Your customers are busy. A site that loads instantly and answers their question quickly says something true about how you run your business.",
  },
  {
    title: "Design decisions are business decisions.",
    detail:
      "Which page comes first, what the button says, where the phone number sits — these change what a website produces. They deserve the same care as the visuals.",
  },
  {
    title: "Direct beats layered.",
    detail:
      "The best work happens when the person making it talks to the person paying for it. No telephone game, no markup on communication.",
  },
];

/**
 * The portrait is optional: the page renders the photo when
 * public/about/portrait.jpg exists and a typographic placeholder when it
 * does not, so the site can never ship a broken image. Regenerate the
 * crop with `python3 scripts/make-portrait.py <image>`.
 */
const hasPortrait = fs.existsSync(
  path.join(process.cwd(), "public", "about", "portrait.jpg")
);

const commitments = [
  {
    title: "You see it early",
    detail:
      "A live preview link goes up in the first week. You watch the site take shape instead of waiting for a reveal at the end.",
  },
  {
    title: "Scope in writing",
    detail:
      "Pages, features, timeline, and price agreed before I start. If something new comes up mid-project, you get a number before I build it.",
  },
  {
    title: "Questions go to the builder",
    detail:
      "Ask me anything about the site and you get the answer from the person who wrote the code, usually the same day.",
  },
  {
    title: "You own everything",
    detail:
      "The domain, the accounts, the code, the analytics. It is your business, so it stays in your name whether or not we work together again.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section>
        <Container className="pt-12 pb-20 sm:pt-16 lg:pt-20 lg:pb-28">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <SectionHeading
                as="h1"
                entrance="rise"
                eyebrow="About"
                title="An owner-led studio, built for owner-led businesses."
                lede={`${site.name} is a one-person web studio in Austin, Texas. When you work with the studio, you work with me — from the first conversation through launch, and for every decision in between.`}
              />
              <div className="mt-10 max-w-2xl space-y-5 leading-relaxed text-ink-soft" data-reveal>
                <p>
                  I started building websites because I kept running into the
                  same gap. The businesses I worked in and around Austin were
                  genuinely good — the food, the service, the craftsmanship —
                  and then you would look them up and find something that made
                  them seem ordinary. A menu you could not read on a phone. A
                  quote form nobody answered. A page that took eight seconds to
                  load. The work deserved better than the website it was hiding
                  behind.
                </p>
                <p>
                  Most of what I know about customers I learned before I wrote a
                  line of code for anyone. I have prepped food on a restaurant
                  line through a Saturday rush. I have detailed cars. I have
                  worked a country club retail floor and booked tee times. I
                  have sat at a desk making a hundred and fifty calls a day,
                  learning how to explain something complicated to someone who
                  has no patience for jargon. Those jobs taught me what a
                  business actually needs from its website, which is rarely the
                  part a designer finds most interesting.
                </p>
                <p>
                  The technical half started earlier. One of my first jobs was
                  teaching kids aged eight to fourteen to write their first
                  lines of Python. Explaining to a ten-year-old why a loop
                  works turns out to be good preparation for explaining to a
                  restaurant owner why their site is slow. I studied economics
                  at UT Austin with minors in business and entrepreneurship,
                  which is another way of saying I care more about whether a
                  website earns its keep than whether other designers admire it.
                </p>
                <p>
                  So this studio is built for local and service-based businesses
                  — restaurants, home services, automotive, professional
                  practices — where a website has a concrete job to do. Get
                  found by someone searching. Look as good as the work actually
                  is. Turn a visit into a call, a booking, or a reservation. If
                  what you need is a brand manifesto or a fifty-page enterprise
                  platform, I am not your best option, and I will say so on the
                  first call rather than three weeks in.
                </p>
                <p>
                  Every site is designed and hand-coded for the business it
                  serves. No page builders, no theme with your logo dropped into
                  someone else&apos;s layout. Because one person does the
                  strategy, the design, and the code, nothing gets lost in a
                  hand-off and you never have to explain your business twice.
                </p>
                <p>
                  And you can reach me. That sounds like a low bar until you
                  have tried getting a straight answer out of an agency. I
                  answer my own email, I reply the same day when I can, and
                  after launch I am still the person who picks up.
                </p>
              </div>
              </div>

            <div className="lg:col-span-5">
              <figure
                data-reveal
                className="mx-auto max-w-[340px] lg:sticky lg:top-28 lg:mx-0"
              >
                {hasPortrait ? (
                  <div className="overflow-hidden rounded-full border border-line bg-white">
                    <Image
                      src="/about/portrait.jpg"
                      alt={`${site.founder.name}, ${site.founder.role} at ${site.name}`}
                      width={880}
                      height={880}
                      sizes="(min-width: 1024px) 340px, 70vw"
                      className="h-full w-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="flex aspect-square items-center justify-center rounded-full border border-line bg-wash">
                    <span
                      aria-hidden="true"
                      className="font-display text-[6rem] leading-none text-ink/15 italic"
                    >
                      {site.founder.name.charAt(0)}
                    </span>
                  </div>
                )}
                <figcaption className="mt-4 flex items-baseline justify-between border-t border-line pt-3 text-[13px]">
                  <span className="font-medium text-ink">{site.founder.name}</span>
                  <span className="text-ink-soft">{site.founder.role}</span>
                </figcaption>
              </figure>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t border-line bg-wash" aria-labelledby="beliefs-heading">
        <Container className="py-20 lg:py-28">
          <Eyebrow>What the work is built on</Eyebrow>
          <h2 id="beliefs-heading" className="sr-only">
            Studio principles
          </h2>
          <div className="mt-8 grid gap-x-14 sm:grid-cols-2" data-reveal>
            {beliefs.map((belief) => (
              <div key={belief.title} className="border-t border-line py-7">
                <h3 className="max-w-md font-display text-xl leading-snug">{belief.title}</h3>
                <p className="mt-2.5 max-w-md text-sm leading-relaxed text-ink-soft">
                  {belief.detail}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-line" aria-labelledby="working-heading">
        <Container className="py-20 lg:py-28">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-3">
              <Eyebrow>Working together</Eyebrow>
            </div>
            <div className="lg:col-span-9">
              <h2
                id="working-heading"
                className="max-w-3xl font-display text-[clamp(1.5rem,1.1rem+1.6vw,2.25rem)] leading-[1.3] text-balance"
              >
                Expect straight answers, visible progress, and a site you
                understand when it launches — not a black box with an invoice
                attached.
              </h2>
              <div className="mt-8 grid gap-x-12 sm:grid-cols-2" data-reveal>
                {commitments.map((item) => (
                  <div key={item.title} className="border-t border-line py-5">
                    <h3 className="text-[15px] font-medium text-ink">{item.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                      {item.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <CtaBand
        title={
          <>
            Let&apos;s make the website <em>match the work.</em>
          </>
        }
      />
    </>
  );
}
