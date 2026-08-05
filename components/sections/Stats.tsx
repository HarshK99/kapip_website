"use client";

import { motion } from "framer-motion";
import { getStats, type Stat } from "@/data/stats";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import {
  getSectionReveal,
  getStaggerContainer,
  sectionRevealViewport,
  useCountUp,
  useSafeReducedMotion,
} from "@/lib/motion";

function StatTile({ stat, prefersReducedMotion }: { stat: Stat; prefersReducedMotion: boolean }) {
  const { ref, value } = useCountUp<HTMLSpanElement>(stat.value, prefersReducedMotion);

  return (
    <motion.div
      variants={getSectionReveal(prefersReducedMotion)}
      className="flex flex-col gap-2 rounded-card border border-line bg-surface p-6"
    >
      <span ref={ref} className="font-display text-display-l font-bold tabular-nums text-accent">
        {value}
        {stat.suffix ?? ""}
      </span>
      <span className="font-mono text-mono-eyebrow uppercase tracking-[0.12em] text-ink-soft">
        {stat.label}
      </span>
    </motion.div>
  );
}

export default function Stats() {
  const prefersReducedMotion = useSafeReducedMotion();
  const stats = getStats();

  return (
    <motion.section
      className="border-b border-line py-16 md:py-24"
      initial="hidden"
      whileInView="visible"
      viewport={sectionRevealViewport}
      variants={getSectionReveal(prefersReducedMotion)}
    >
      <Container className="flex flex-col gap-10">
        {/* DUMMY heading copy; stat values are DUMMY — must be real and truthful before launch (see data/stats.ts) */}
        <SectionHeading heading="By the numbers" level="h2" />
        <motion.div
          className="grid gap-6 sm:grid-cols-2 md:grid-cols-4"
          variants={getStaggerContainer(prefersReducedMotion)}
        >
          {stats.map((stat) => (
            <StatTile key={stat.label} stat={stat} prefersReducedMotion={prefersReducedMotion} />
          ))}
        </motion.div>
      </Container>
    </motion.section>
  );
}
