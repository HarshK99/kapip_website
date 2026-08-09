"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollColorHeading from "@/components/ui/ScrollColorHeading";
import {
  getSectionReveal,
  getStaggerContainer,
  sectionRevealViewport,
  useSafeReducedMotion,
} from "@/lib/motion";

// DUMMY credibility points — replace on content handover (PRD Content Checklist).
const points = [
  {
    title: "Precision",
    body: "Every search, draft, and filing is executed with exacting attention to the details that decide outcomes.",
  },
  {
    title: "Jurisdictional reach",
    body: "A coordinated network of associates means consistent quality wherever you need protection.",
  },
  {
    title: "Responsiveness",
    body: "Clear timelines and direct communication — you always know where your matter stands.",
  },
];

export default function WhyKAP() {
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
        {/* DUMMY heading copy */}
        <motion.div
          className="grid gap-8 sm:grid-cols-3"
          variants={getStaggerContainer(prefersReducedMotion)}
        >
          {points.map((point) => (
            <motion.div
              key={point.title}
              variants={getSectionReveal(prefersReducedMotion)}
              className="flex flex-col gap-2"
            >
              <ScrollColorHeading as="h3" className="font-display text-h3 font-semibold">
                {point.title}
              </ScrollColorHeading>
              <p className="font-body text-body text-ink-soft">{point.body}</p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </motion.section>
  );
}
