"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { getSectionReveal, sectionRevealViewport, useSafeReducedMotion } from "@/lib/motion";

// Home-only "Talk to us" band: a single image panel — copy left, one inverted
// CTA right, vertically centred over a left-anchored scrim (DESIGN.md — Talk to
// us). The on-image idiom of `MediaCard` + the hero CTA. No overlapping card,
// no checklist.
export default function TalkToUs() {
  const prefersReducedMotion = useSafeReducedMotion();

  return (
    <motion.section
      className="py-16 md:py-24"
      initial="hidden"
      whileInView="visible"
      viewport={sectionRevealViewport}
      variants={getSectionReveal(prefersReducedMotion)}
    >
      <Container>
        <div className="relative isolate flex min-h-[260px] flex-col items-start justify-center gap-6 overflow-hidden rounded-media bg-ink-strong px-6 py-10 md:min-h-[300px] md:flex-row md:items-center md:justify-between md:px-10 md:py-12">
          {/* DUMMY placeholder — swap for the real photo at the same path once provided */}
          <Image
            src="/images/talk-to-us/talk-to-us-bg.webp"
            alt=""
            fill
            sizes="(min-width: 1024px) 1120px, 100vw"
            className="-z-10 object-cover"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink-strong/95 via-ink-strong/70 to-ink-strong/30" />

          <div className="flex flex-col gap-3">
            {/* DUMMY heading copy */}
            <h2 className="font-display text-display-l font-bold leading-[1.15] text-paper">
              Ready to protect what you&apos;ve built?
            </h2>
            <p className="max-w-prose font-body text-body text-paper/75">
              Tell us about your invention, brand, or work — we&apos;ll tell you what it takes to
              secure it.
            </p>
          </div>

          <Button
            href="/contact"
            variant="primary"
            icon
            className="flex-none bg-paper text-accent hover:bg-paper/90"
          >
            Talk to us {/* DUMMY CTA copy */}
          </Button>
        </div>
      </Container>
    </motion.section>
  );
}
