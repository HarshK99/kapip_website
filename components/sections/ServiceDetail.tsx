"use client";

import { motion } from "framer-motion";
import type { Service } from "@/data/services";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { getSectionReveal, sectionRevealViewport, useSafeReducedMotion } from "@/lib/motion";

export type ServiceDetailProps = {
  service: Service;
};

export default function ServiceDetail({ service }: ServiceDetailProps) {
  const prefersReducedMotion = useSafeReducedMotion();

  return (
    <motion.section
      className="border-b border-line pt-14 pb-24 md:pt-20 md:pb-32"
      initial="hidden"
      whileInView="visible"
      viewport={sectionRevealViewport}
      variants={getSectionReveal(prefersReducedMotion)}
    >
      <Container className="flex flex-col gap-6">
        <SectionHeading heading={service.name} lead={service.precise} level="h1" />
        <p className="max-w-prose font-body text-body text-ink-soft">{service.plainIntro}</p>

        {service.overview && service.overview.length > 0 ? (
          <ul className="flex max-w-prose flex-col gap-2">
            {service.overview.map((point) => (
              <li key={point} className="flex items-start gap-3 font-body text-body text-ink-soft">
                <span className="mt-2.5 h-1.5 w-1.5 flex-none rounded-full bg-accent" aria-hidden="true" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </Container>
    </motion.section>
  );
}
