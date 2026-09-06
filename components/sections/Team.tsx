"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { getFounder } from "@/data/team";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { getSectionReveal, sectionRevealViewport, useSafeReducedMotion } from "@/lib/motion";

// Leadership card on the About page, sitting above AboutNetwork's narrative
// `about.team` paragraph (data/about.ts) — the named founder here, the wider
// team described there, no duplicated copy.
export default function Team() {
  const prefersReducedMotion = useSafeReducedMotion();
  const founder = getFounder();

  if (!founder) return null;

  return (
    <motion.section
      className="border-b border-line py-16 md:py-24"
      initial="hidden"
      whileInView="visible"
      viewport={sectionRevealViewport}
      variants={getSectionReveal(prefersReducedMotion)}
    >
      <Container className="flex flex-col gap-10">
        <SectionHeading heading="Leadership" level="h2" />
        <div className="flex flex-col gap-6 rounded-card border border-line bg-surface p-6 sm:flex-row sm:items-center sm:gap-8 sm:p-8">
          <Image
            src={founder.image}
            alt={founder.name}
            width={160}
            height={160}
            className="h-32 w-32 flex-none rounded-card object-cover sm:h-40 sm:w-40"
          />
          <div className="flex flex-col gap-2">
            <span className="font-display text-h3 font-semibold text-ink">{founder.name}</span>
            <span className="font-display font-medium text-eyebrow uppercase tracking-[0.12em] text-ink-soft">
              {founder.role}
            </span>
            <p className="max-w-prose font-body text-body text-ink-soft">{founder.bio}</p>
          </div>
        </div>
      </Container>
    </motion.section>
  );
}
