import Image from "next/image";
import { site } from "@/data/site";
import Button from "@/components/ui/Button";

// Type-first hero (DESIGN.md — Home hero). The brand line dominates in Spectral
// (`display-hero`, two authored lines split on `\n`) on the `bg-accent` card.
// The headline column runs the near-full width and is allowed to overlap the
// left edge of the photo — the photo sits in the right ~46% on desktop (a short
// strip on mobile), lightly tinted, with a left-edge scrim so the overlap zone
// still reads as panel, not photo. The headline, tagline and CTA form one calm
// left-set group; a type-first hero is legitimately left-weighted, so balance
// comes from the imagery (only lightly tinted) holding the right — not from
// splitting the group across the card.
//
// No JS entrance — the hero is the anchor and must paint instantly, especially
// on slow connections. The only motion is CSS-only and decorative on top of
// already-painted content: the headline's two lines clip-rise on load
// (`.hero-headline-line`), a slow running edge shimmer (`.hero-glow` — a
// white hotspot rounding the rim) and a static teal→green bloom on the card
// (`.hero-glow-bloom`). All are reduced-motion-safe — see app/globals.css.
// The load "moment" is PageIntro; everything below the fold reveals on scroll.
export default function Hero() {
  return (
    <div className="px-4 py-4 sm:px-6 sm:py-6">
      <section className="hero-glow-bloom relative overflow-hidden rounded-hero bg-accent">
        {/* Desktop photo — right ~46%, lightly tinted, edge-faded into the
            panel. Wider and less-tinted than before so the network reads as
            real imagery (not a dark sliver); the scrim ends further left so
            more of the image is exposed. `object-position` biased right so the
            denser node cluster sits inside the visible panel, not cropped off.
            The headline is allowed to overrun the scrim'd left edge. */}
        <div className="absolute inset-y-0 right-0 hidden w-[46%] md:block">
          <Image
            src="/images/hero/hero-bg-a.png"
            alt=""
            fill
            priority
            sizes="46vw"
            className="object-cover object-[58%_50%]"
          />
          <div className="absolute inset-0 bg-accent-deep/30" />
          <div className="absolute inset-y-0 left-0 w-[52%] bg-gradient-to-r from-accent via-accent/70 to-transparent" />
        </div>

        {/* One left-set group: headline (near-full column width so
            `site.brandLine` holds its two authored lines), then the tagline +
            CTA as a tight unit (`max-w-[34rem]` keeps the tagline to ~2 lines)
            one moderate gap below. Kept together on purpose — a scattered
            layout reads as unorganised; the imagery, not a flung CTA, is the
            counterweight. */}
        <div className="relative flex flex-col px-5 py-14 md:w-[94%] md:px-8 md:py-20 lg:w-[90%] lg:py-24">
          {/* Each authored line clip-rises on load / on client-nav remount —
              CSS-only (.hero-headline-line in app/globals.css) so the hero
              stays a static server component and the type is painted the whole
              time; the animation only transforms it. Reduced-motion → static. */}
          <h1 className="font-serif text-display-hero font-bold text-paper">
            {site.brandLine.split("\n").map((line) => (
              <span key={line} className="hero-headline-line">
                <span>{line}</span>
              </span>
            ))}
          </h1>

          <div className="mt-10 flex max-w-[34rem] flex-col gap-7 lg:mt-14">
            <p className="font-body text-lead text-paper/75">{site.tagline}</p>

            <div>
              <Button
                href="/contact"
                variant="primary"
                icon
                className="bg-paper text-accent hover:bg-paper/90"
              >
                Talk to us {/* DUMMY CTA copy */}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile: short photo strip below the text */}
        <div className="relative h-52 w-full md:hidden">
          <Image
            src="/images/hero/hero-bg-a.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-[58%_50%]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-accent via-accent-deep/55 to-accent-deep/25" />
        </div>

        {/* Running edge shimmer — a white hotspot arc rounding the card rim
            (the outer bloom is `.hero-glow-bloom` on the section itself). Last
            child so it rides above the photo and content. CSS-only,
            reduced-motion-safe (app/globals.css → .hero-glow). */}
        <div
          className="hero-glow pointer-events-none absolute inset-0 rounded-hero"
          aria-hidden="true"
        />
      </section>
    </div>
  );
}
