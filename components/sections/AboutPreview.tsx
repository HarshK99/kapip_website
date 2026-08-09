"use client";

import Image from "next/image";
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
      <Container className="flex flex-col gap-10 md:flex-row md:items-center md:justify-between md:gap-12">
        <div className="flex flex-col gap-6 md:max-w-md lg:max-w-lg">
          <SectionHeading heading="About" lead={about.lead} level="h2" />
          <p className="max-w-prose font-body text-body text-ink-soft">{about.intro}</p>
          <div>
            <Button href="/about" variant="ghost">
              Learn more about us {/* DUMMY CTA copy */}
            </Button>
          </div>
        </div>

        {/* Fills the space that used to sit empty next to the text on wide
            screens. Same photo as the Home hero, reused deliberately as a
            recurring motif rather than a second unrelated image. */}
        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-card border border-line md:w-[280px] md:flex-none lg:w-[340px]">
          <Image
            src="/images/about-section.png"
            alt=""
            fill
            sizes="(min-width: 1024px) 340px, (min-width: 768px) 280px, 100vw"
            className="object-cover"
          />
        </div>
      </Container>
    </motion.section>
  );
}
