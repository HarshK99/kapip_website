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

// Practice areas set as two ruled indexes rather than chip clouds — the
// layout reads like a firm's capability sheet (DESIGN.md — precise document).
// Asymmetric split: the broader domains list takes the wider column.
function RuledIndex({
  label,
  items,
  columns,
  prefersReducedMotion,
}: {
  label: string;
  items: string[];
  columns: 1 | 2;
  prefersReducedMotion: boolean;
}) {
  return (
    <div className="flex flex-col gap-5">
      <h3 className="font-display text-h3 font-semibold text-ink">{label}</h3>
      <motion.ul
        variants={getStaggerContainer(prefersReducedMotion)}
        className={`grid border-t border-line ${
          columns === 2 ? "sm:grid-cols-2 sm:gap-x-10" : ""
        }`}
      >
        {items.map((item) => (
          <motion.li
            key={item}
            variants={getSectionReveal(prefersReducedMotion)}
            className="border-b border-line py-2.5 font-body text-small text-ink-soft"
          >
            {item}
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
}

export default function AboutExpertise() {
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
        <SectionHeading heading="Expertise" lead="Where our work concentrates." level="h2" />

        <div className="grid gap-x-16 gap-y-12 md:grid-cols-[1.1fr_1fr]">
          <RuledIndex
            label="Technology domains"
            items={about.domains}
            columns={2}
            prefersReducedMotion={prefersReducedMotion}
          />
          <RuledIndex
            label="Capabilities"
            items={about.services}
            columns={1}
            prefersReducedMotion={prefersReducedMotion}
          />
        </div>
      </Container>
    </motion.section>
  );
}
