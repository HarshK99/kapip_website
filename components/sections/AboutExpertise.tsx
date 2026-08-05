"use client";

import { motion } from "framer-motion";
import { about } from "@/data/about";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Badge from "@/components/ui/Badge";
import ScrollColorHeading from "@/components/ui/ScrollColorHeading";
import { getSectionReveal, sectionRevealViewport, useSafeReducedMotion } from "@/lib/motion";

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

        <div className="flex flex-col gap-8 md:flex-row md:gap-16">
          <div className="flex flex-1 flex-col gap-4">
            <ScrollColorHeading as="h3" className="font-display text-h3 font-semibold">
              Technology domains
            </ScrollColorHeading>
            <div className="flex flex-wrap gap-2">
              {about.domains.map((domain) => (
                <Badge key={domain}>{domain}</Badge>
              ))}
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-4">
            <ScrollColorHeading as="h3" className="font-display text-h3 font-semibold">
              Capabilities
            </ScrollColorHeading>
            <div className="flex flex-wrap gap-2">
              {about.services.map((service) => (
                <Badge key={service}>{service}</Badge>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </motion.section>
  );
}
