"use client";

import { motion } from "framer-motion";
import { getServices } from "@/data/services";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import MediaCard from "@/components/ui/MediaCard";
import {
  getSectionReveal,
  getStaggerContainer,
  sectionRevealViewport,
  useSafeReducedMotion,
} from "@/lib/motion";

export default function ServicesOverview() {
  const prefersReducedMotion = useSafeReducedMotion();
  const services = getServices();

  return (
    <motion.section
      className="py-16 md:py-24"
      initial="hidden"
      whileInView="visible"
      viewport={sectionRevealViewport}
      variants={getSectionReveal(prefersReducedMotion)}
    >
      <Container className="flex flex-col gap-10">
        {/* DUMMY heading copy */}
        <SectionHeading heading="What we do" level="h2" />

        {/* Pinwheel media grid — same height, alternating narrow / wide columns
            (DESIGN.md — Home services media grid). Placeholder images until the
            real set lands (docs/IMAGE-PROMPTS.md § P2). */}
        <motion.div
          className="grid grid-cols-1 gap-4 sm:grid-cols-5 lg:gap-5"
          variants={getStaggerContainer(prefersReducedMotion)}
        >
          {services.map((service, i) => (
            <motion.div
              key={service.slug}
              variants={getSectionReveal(prefersReducedMotion)}
              className={i === 1 || i === 2 ? "sm:col-span-3" : "sm:col-span-2"}
            >
              <MediaCard
                title={service.name}
                subtitle={service.summary}
                href={`/services/${service.slug}`}
                image={`/images/services/${service.slug}.webp`}
              />
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </motion.section>
  );
}
