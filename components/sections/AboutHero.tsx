"use client";

import { motion } from "framer-motion";
import { about } from "@/data/about";
import Container from "@/components/ui/Container";
import { getSectionReveal, sectionRevealViewport, useSafeReducedMotion } from "@/lib/motion";

export default function AboutHero() {
  const prefersReducedMotion = useSafeReducedMotion();

  return (
    <motion.section
      className="border-b border-line bg-paper py-24 md:py-32"
      initial="hidden"
      whileInView="visible"
      viewport={sectionRevealViewport}
      variants={getSectionReveal(prefersReducedMotion)}
    >
      <Container className="flex flex-col gap-6">
        <span className="font-mono text-mono-eyebrow uppercase tracking-[0.12em] text-ink-soft">
          The Firm
        </span>
        <h1 className="max-w-2xl font-display text-display-l font-semibold tracking-tight text-ink md:text-display-xl">
          {about.lead}
        </h1>
        <p className="max-w-prose font-body text-body text-ink-soft">{about.intro}</p>
        <p className="max-w-prose font-body text-body text-ink-soft">{about.mission}</p>
      </Container>
    </motion.section>
  );
}
