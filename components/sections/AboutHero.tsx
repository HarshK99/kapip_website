"use client";

import { motion } from "framer-motion";
import { about } from "@/data/about";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { getSectionReveal, sectionRevealViewport, useSafeReducedMotion } from "@/lib/motion";

export default function AboutHero() {
  const prefersReducedMotion = useSafeReducedMotion();

  return (
    <motion.section
      className="border-b border-line bg-paper pt-14 pb-24 md:pt-20 md:pb-32"
      initial="hidden"
      whileInView="visible"
      viewport={sectionRevealViewport}
      variants={getSectionReveal(prefersReducedMotion)}
    >
      <Container className="flex flex-col gap-6">
        <SectionHeading heading="The Firm" lead={about.lead} level="h1" />
        <p className="max-w-prose font-body text-body text-ink-soft">{about.intro}</p>
        <p className="max-w-prose font-body text-body text-ink-soft">{about.mission}</p>
      </Container>
    </motion.section>
  );
}
