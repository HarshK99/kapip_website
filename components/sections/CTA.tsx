"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { getSectionReveal, sectionRevealViewport, useSafeReducedMotion } from "@/lib/motion";

export type CTAProps = {
  heading?: string;
  subtext?: string;
};

export default function CTA({
  heading = "Ready to protect what you've built?", // DUMMY
  subtext = "Tell us about your invention, brand, or work — we'll tell you what it takes to secure it.", // DUMMY
}: CTAProps) {
  const prefersReducedMotion = useSafeReducedMotion();

  return (
    <motion.section
      className="bg-surface py-16 md:py-24"
      initial="hidden"
      whileInView="visible"
      viewport={sectionRevealViewport}
      variants={getSectionReveal(prefersReducedMotion)}
    >
      <Container className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-2">
          <h2 className="font-display text-display-l font-bold text-ink-strong">{heading}</h2>
          <p className="max-w-prose font-body text-body text-ink-soft">{subtext}</p>
        </div>
        <Button href="/contact" variant="primary">
          Talk to us {/* DUMMY CTA copy */}
        </Button>
      </Container>
    </motion.section>
  );
}
