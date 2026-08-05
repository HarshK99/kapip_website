"use client";

import { motion } from "framer-motion";
import { about } from "@/data/about";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { getSectionReveal, sectionRevealViewport, useSafeReducedMotion } from "@/lib/motion";

export default function AboutPreview() {
  const prefersReducedMotion = useSafeReducedMotion();

  return (
    <motion.section
      className="border-b border-line py-16 md:py-24"
      initial="hidden"
      whileInView="visible"
      viewport={sectionRevealViewport}
      variants={getSectionReveal(prefersReducedMotion)}
    >
      <Container className="flex flex-col gap-6">
        <SectionHeading heading="About" lead={about.lead} level="h2" />
        <p className="max-w-prose font-body text-body text-ink-soft">{about.intro}</p>
        <div>
          <Button href="/about" variant="ghost">
            Learn more about us {/* DUMMY CTA copy */}
          </Button>
        </div>
      </Container>
    </motion.section>
  );
}
