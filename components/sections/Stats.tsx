"use client";

import { motion } from "framer-motion";
import { getStats, type Stat } from "@/data/stats";
import Container from "@/components/ui/Container";
import {
  getSectionReveal,
  getStaggerContainer,
  sectionRevealViewport,
  useCountUp,
  useSafeReducedMotion,
} from "@/lib/motion";

// A hairline grid, not a row of bordered cards — the figures read as a spec
// sheet (DESIGN.md — By the numbers). Each figure counts up once on
// scroll-into-view; reduced motion renders the final value immediately.
function StatCell({ stat, prefersReducedMotion }: { stat: Stat; prefersReducedMotion: boolean }) {
  const { ref, value } = useCountUp<HTMLSpanElement>(stat.value, prefersReducedMotion);

  return (
    <motion.div
      variants={getSectionReveal(prefersReducedMotion)}
      className="flex flex-col gap-1.5 border-b border-r border-line px-4 py-6 md:px-5 md:py-8"
    >
      <span className="font-display text-display-xl font-bold tabular-nums text-accent">
        <span ref={ref}>{value}</span>
        {stat.suffix ?? ""}
      </span>
      <span className="font-display font-medium text-eyebrow uppercase tracking-[0.12em] text-ink-soft">
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
      className="bg-surface py-10 md:py-14"
      initial="hidden"
      whileInView="visible"
      viewport={sectionRevealViewport}
      variants={getSectionReveal(prefersReducedMotion)}
    >
      <Container>
        {/* stat values are DUMMY — must be real and truthful before launch (see data/stats.ts) */}
        <motion.div
          className="grid grid-cols-2 border-l border-t border-line md:grid-cols-4"
          variants={getStaggerContainer(prefersReducedMotion)}
        >
          {stats.map((stat) => (
            <StatCell key={stat.label} stat={stat} prefersReducedMotion={prefersReducedMotion} />
          ))}
        </motion.div>
      </Container>
    </motion.section>
  );
}
