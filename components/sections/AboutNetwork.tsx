"use client";

import { motion } from "framer-motion";
import { about } from "@/data/about";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollColorHeading from "@/components/ui/ScrollColorHeading";
import { getSectionReveal, sectionRevealViewport, useSafeReducedMotion } from "@/lib/motion";

export default function AboutNetwork() {
  const prefersReducedMotion = useSafeReducedMotion();

  return (
    <motion.section
      className="py-16 md:py-24"
      initial="hidden"
      whileInView="visible"
      viewport={sectionRevealViewport}
      variants={getSectionReveal(prefersReducedMotion)}
    >
      <Container className="flex flex-col gap-10">
        <SectionHeading eyebrow="Network & team" heading="Built on relationships" level="h2" />
        <div className="flex flex-col gap-8 md:flex-row md:gap-16">
          <div className="flex flex-1 flex-col gap-3">
            <ScrollColorHeading as="h3" className="font-display text-h3 font-semibold">
              Our network
            </ScrollColorHeading>
            <p className="font-body text-body text-ink-soft">{about.network}</p>
          </div>
          <div className="flex flex-1 flex-col gap-3">
            <ScrollColorHeading as="h3" className="font-display text-h3 font-semibold">
              Our team
            </ScrollColorHeading>
            <p className="font-body text-body text-ink-soft">{about.team}</p>
          </div>
        </div>
      </Container>
    </motion.section>
  );
}
