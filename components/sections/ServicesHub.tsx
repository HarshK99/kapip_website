"use client";

import { motion } from "framer-motion";
import { getServices } from "@/data/services";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ServiceCard from "@/components/ui/ServiceCard";
import {
  getSectionReveal,
  getStaggerContainer,
  sectionRevealViewport,
  useSafeReducedMotion,
} from "@/lib/motion";

export default function ServicesHub() {
  const prefersReducedMotion = useSafeReducedMotion();
  const services = getServices();

  return (
    <motion.section
      className="py-24 md:py-32"
      initial="hidden"
      whileInView="visible"
      viewport={sectionRevealViewport}
      variants={getSectionReveal(prefersReducedMotion)}
    >
      <Container className="flex flex-col gap-10">
        {/* DUMMY framing copy */}
        <SectionHeading
          eyebrow="Services"
          heading="Four disciplines, one standard of precision"
          level="h1"
        />
        <motion.div
          className="grid gap-6 sm:grid-cols-2"
          variants={getStaggerContainer(prefersReducedMotion)}
        >
          {services.map((service) => (
            <motion.div key={service.slug} variants={getSectionReveal(prefersReducedMotion)}>
              <ServiceCard service={service} />
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </motion.section>
  );
}
