"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
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
    body: "Searches, drafts, and filings are checked line by line — in patent work, the wording is what holds up later.",
  },
  {
    title: "Jurisdictional reach",
    body: "A vetted network of foreign associates handles filings in the countries where you need protection.",
  },
  {
    title: "Responsiveness",
    body: "You deal directly with the person handling your matter, and you know the timeline before work starts.",
  },
];

export default function WhyKAP() {
  const prefersReducedMotion = useSafeReducedMotion();

  return (
    // The one dark beat in the Home scroll — a nocturne panel between the dark
    // hero card and the dark footer (DESIGN.md — Section rhythm). Type and rules
    // flip to `paper` tones.
    <motion.section
      className="bg-accent-deep py-16 md:py-24"
      initial="hidden"
      whileInView="visible"
      viewport={sectionRevealViewport}
      variants={getSectionReveal(prefersReducedMotion)}
    >
      <Container className="flex flex-col gap-10">
        {/* DUMMY heading copy */}
        <SectionHeading heading="Why KAP" level="h2" tone="onDark" />

        <div className="grid gap-8 md:grid-cols-[1fr_minmax(0,20rem)] md:gap-14 lg:gap-20">
          <motion.dl
            className="flex flex-col self-start border-t border-paper/15"
            variants={getStaggerContainer(prefersReducedMotion)}
          >
            {points.map((point) => (
              <motion.div
                key={point.title}
                variants={getSectionReveal(prefersReducedMotion)}
                className="flex flex-col gap-2 border-b border-paper/15 py-6 md:py-7"
              >
                <dt>
                  <h3 className="font-display text-display-l font-bold text-paper">
                    {point.title}
                  </h3>
                </dt>
                <dd className="font-body text-body text-paper/70">{point.body}</dd>
              </motion.div>
            ))}
          </motion.dl>

          {/* Supporting image — placeholder until the real one lands
              (docs/IMAGE-PROMPTS.md § P1). */}
          <motion.div
            variants={getSectionReveal(prefersReducedMotion)}
            className="relative hidden aspect-[3/4] overflow-hidden rounded-media bg-ink-strong ring-1 ring-paper/10 md:block"
          >
            <Image
              src="/images/why-kap.webp"
              alt=""
              fill
              sizes="20rem"
              className="object-cover"
            />
          </motion.div>
        </div>
      </Container>
    </motion.section>
  );
}
