"use client";

import { motion } from "framer-motion";
import { about } from "@/data/about";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import {
  getSectionReveal,
  getStaggerContainer,
  sectionRevealViewport,
  useSafeReducedMotion,
} from "@/lib/motion";

export default function AboutApproach() {
  const prefersReducedMotion = useSafeReducedMotion();

  return (
    <motion.section
      className="border-b border-line py-16 md:py-24"
      initial="hidden"
      whileInView="visible"
      viewport={sectionRevealViewport}
      variants={getSectionReveal(prefersReducedMotion)}
    >
      <Container className="flex flex-col gap-10">
        <SectionHeading eyebrow="Approach" heading="How we work" level="h2" />
        <p className="max-w-prose font-body text-body text-ink-soft">{about.approach}</p>

        <motion.div
          className="flex flex-col divide-y divide-line sm:flex-row sm:divide-x sm:divide-y-0"
          variants={getStaggerContainer(prefersReducedMotion)}
        >
          {about.values.map((value) => (
            <motion.div
              key={value}
              variants={getSectionReveal(prefersReducedMotion)}
              className="flex-1 py-4 first:pt-0 sm:py-0 sm:px-8 sm:first:pl-0 sm:last:pr-0"
            >
              <span className="font-display text-h2 font-semibold tracking-tight text-ink">
                {value}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </motion.section>
  );
}
