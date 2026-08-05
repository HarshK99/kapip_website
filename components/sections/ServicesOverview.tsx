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

export default function ServicesOverview() {
  const prefersReducedMotion = useSafeReducedMotion();
  const services = getServices();

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
        <SectionHeading heading="What we do" lead="Four ways we protect your ideas." level="h2" />
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
