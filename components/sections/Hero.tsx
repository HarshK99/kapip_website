"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { site } from "@/data/site";
import Button from "@/components/ui/Button";
import Rule from "@/components/ui/Rule";
import HeroBackground from "@/components/ui/HeroBackground";
import HeroIllustration from "@/components/ui/HeroIllustration";
import { getWipeReveal, useSafeReducedMotion } from "@/lib/motion";

// Deliberately not the shared Container: Container's max-w-container (1120px)
// would cap the hero card well short of the viewport on wide screens, leaving
// large empty margins either side. The hero instead gets its own small,
// fixed gutter with no width cap, so it stays close to full width everywhere.

export default function Hero() {
  const prefersReducedMotion = useSafeReducedMotion();

  const delay = (seconds: number) => (prefersReducedMotion ? 0 : seconds);

  return (
    <div className="px-4 sm:px-6">
      <motion.section
        className="relative overflow-hidden rounded-hero bg-accent"
        initial="hidden"
        animate="visible"
        variants={getWipeReveal(prefersReducedMotion)}
      >
        {/* Layer 0: photo, confined to the right side only, tinted into the panel color */}
        <div className="absolute inset-y-0 right-0 hidden w-1/2 md:block lg:w-[45%]">
          <Image
            src="/images/hero/hero-bg.webp"
            alt=""
            fill
            priority
            sizes="45vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-accent-deep/40" />
          <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-accent to-transparent" />
        </div>

        {/* Layer 1: static atmosphere — faint patent-sheet motifs, full-bleed */}
        <HeroBackground />

        {/* Layer 2: interactive foreground — molecule clusters, sitting directly
            behind the headline/copy on the left. Same footprint as the content
            column below so it reads as "behind the text", not beside it. Hidden
            below md: a corner-node-scale animated illustration has no room to
            read on a small screen, and the hero stays text + photo there instead. */}
        <HeroIllustration className="absolute inset-y-0 left-0 hidden w-1/2 md:block lg:w-[55%]" />

        {/* Layer 3: hero content. pointer-events-none so the illustration behind
            it still receives hover for its parallax/highlight — the CTA row
            opts back into pointer-events-auto so the buttons stay clickable. */}
        <div className="relative flex flex-col gap-6 px-5 py-12 pointer-events-none md:w-1/2 md:px-6 md:py-16 lg:w-[55%] lg:gap-7 lg:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={getWipeReveal(prefersReducedMotion)}
            transition={{ delay: delay(0.5) }}
          >
            <h1
              className="max-w-xl font-serif text-display-l font-bold leading-[0.95] tracking-wide text-paper md:text-display-xl"
              style={{ fontVariationSettings: '"opsz" 144, "SOFT" 20, "WONK" 60' }}
            >
              {site.brandLine}
            </h1>
          </motion.div>

          <motion.p
            initial="hidden"
            animate="visible"
            variants={getWipeReveal(prefersReducedMotion)}
            transition={{ delay: delay(0.65) }}
            className="max-w-md font-body text-lead text-paper/80"
          >
            {site.tagline}
          </motion.p>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={getWipeReveal(prefersReducedMotion)}
            transition={{ delay: delay(0.78) }}
          >
            <Rule variant="short" tone="gradient" />
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={getWipeReveal(prefersReducedMotion)}
            transition={{ delay: delay(0.9) }}
            className="pointer-events-auto flex flex-wrap gap-4"
          >
            <Button
              href="/contact"
              variant="primary"
              icon
              className="bg-paper text-accent hover:bg-paper/90"
            >
              Talk to us {/* DUMMY CTA copy */}
            </Button>
            <Button
              href="/services"
              variant="ghost"
              className="border-paper/40 text-paper hover:border-paper hover:text-paper"
            >
              Explore services {/* DUMMY CTA copy */}
            </Button>
          </motion.div>
        </div>

        {/* Mobile: photo stacked below the text. One continuous gradient (not
            two overlapping overlays) so there's no visible seam where it
            meets the solid-accent panel above — it starts at the exact same
            accent color, then eases into the tint. */}
        <div className="relative h-56 w-full md:hidden">
          <Image src="/images/hero/hero-bg.webp" alt="" fill sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-accent via-accent-deep/55 to-accent-deep/20" />
        </div>
      </motion.section>
    </div>
  );
}
