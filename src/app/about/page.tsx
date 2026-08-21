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
                  I grew up around Austin and spent most of my working life
                  inside the kinds of businesses I now build websites for: a
                  restaurant kitchen, a country club retail floor, and a desk
                  where the whole job was explaining complicated things to
                  people in plain language. I know what a Saturday rush looks
                  like. I know what it costs when a customer can&apos;t find a
                  menu, a price, or a way to book.
                </p>
                <p>
                  That is the background I bring to a website. I studied
                  economics at UT Austin with minors in business and
                  entrepreneurship, and I started out teaching kids to write
                  their first lines of Python — which turns out to be good
                  preparation for this work. Most of it is taking something
                  technical and making it make sense to the person who has to
                  live with it.
                </p>
                <p>
                  So the specialty here is local and service-based businesses —
                  restaurants, home services, automotive, professional
                  practices — where the website has a concrete job. Get found.
                  Look as good as the work actually is. Turn a visit into a
                  call, a booking, or a reservation.
                </p>
                <p>
                  Every site is designed and hand-built for the business it
                  serves: attractive, fast, easy to use on a phone, and aligned
                  with what the business is actually trying to accomplish. And
                  because one person does the strategy, the design, and the
                  code, nothing gets lost in a hand-off and nobody has to
                  translate your goals twice.
                </p>
              </div>
            </div>

            <div className="lg:col-span-5">
              <figure data-reveal className="mx-auto max-w-[340px] lg:mx-0">
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
              <p
                id="working-heading"
                className="max-w-3xl font-display text-[clamp(1.5rem,1.1rem+1.6vw,2.25rem)] leading-[1.3]"
              >
                Expect straight answers, visible progress, and a site you
                understand when it launches — not a black box with an invoice
                attached.
              </p>
              <p className="mt-6 max-w-2xl leading-relaxed text-ink-soft" data-reveal>
                Projects run on a live preview link from the first week, so you
                watch the site take shape instead of waiting for a big reveal.
                Questions get answered by the person who knows the answer,
                because that&apos;s who you&apos;re already talking to.
              </p>
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
