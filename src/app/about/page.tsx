import type { Metadata } from "next";
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
                  I started {site.name} because too many good local businesses
                  were stuck with websites that undersold them. The restaurant
                  with a forty-year reputation and a site that couldn&apos;t
                  show a menu on a phone. The detailer trusted with
                  six-figure cars, invisible on Google. The cleaning company
                  losing quote requests to phone tag. The work was excellent;
                  the websites said otherwise.
                </p>
                <p>
                  So that&apos;s the specialty here: local and service-based
                  businesses — restaurants, home services, automotive,
                  professional practices — where the website&apos;s job is
                  concrete. Get found. Look as good as the work actually is.
                  Turn a visit into a call, a booking, or a reservation.
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
              {/*
                Portrait placeholder. Replace by dropping a photo at
                public/about/portrait.jpg and swapping this block for:
                <Image src="/about/portrait.jpg" alt="..." width={880} height={1100} />
              */}
              <figure data-reveal>
                <div className="flex aspect-[4/5] items-end justify-between rounded-[6px] border border-line bg-wash p-6">
                  <span
                    aria-hidden="true"
                    className="font-display text-[7rem] leading-none text-ink/10 italic"
                  >
                    {site.founder.name.charAt(0)}
                  </span>
                  <span aria-hidden="true" className="mb-2 inline-block h-2 w-2 bg-accent" />
                </div>
                <figcaption className="mt-3 flex items-baseline justify-between text-[13px]">
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
            If your work is better than your website, <em>we should talk.</em>
          </>
        }
      />
    </>
  );
}
