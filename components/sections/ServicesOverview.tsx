"use client";

import { motion } from "framer-motion";
import { getServices } from "@/data/services";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ServiceCard from "@/components/ui/ServiceCard";
import NodeExplorer, { type NodeExplorerItem } from "@/components/ui/NodeExplorer";
import {
  getSectionReveal,
  getStaggerContainer,
  sectionRevealViewport,
  useSafeReducedMotion,
} from "@/lib/motion";

export default function ServicesOverview() {
  const prefersReducedMotion = useSafeReducedMotion();
  const services = getServices();

  // NodeExplorer is domain-agnostic — map services into its generic shape.
  const nodeItems: NodeExplorerItem[] = services.map((service) => ({
    id: service.slug,
    name: service.name,
    subtext: service.summary,
    href: `/services/${service.slug}`,
  }));

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
        <SectionHeading heading="What we do" level="h2" />

        {/* md+: 4-node corner explorer (DESIGN.md — Home services node explorer). Below md it doesn't survive the layout, so mobile keeps the plain card grid. */}
        <NodeExplorer items={nodeItems} className="mx-auto hidden md:block" />

        <motion.div
          className="grid gap-6 sm:grid-cols-2 md:hidden"
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
