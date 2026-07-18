"use client";

import { motion } from "framer-motion";
import { site, telHref, whatsappHref, mailHref, formattedAddress } from "@/data/site";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ContactForm from "@/components/sections/ContactForm";
import { getSectionReveal, sectionRevealViewport, useSafeReducedMotion } from "@/lib/motion";

export default function ContactBlock() {
  const prefersReducedMotion = useSafeReducedMotion();

  return (
    <motion.section
      className="py-24 md:py-32"
      initial="hidden"
      whileInView="visible"
      viewport={sectionRevealViewport}
      variants={getSectionReveal(prefersReducedMotion)}
    >
      <Container className="flex flex-col gap-12">
        {/* DUMMY framing copy */}
        <SectionHeading eyebrow="Contact" heading="Tell us what you're protecting" level="h1" />

        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          <div className="flex flex-col gap-3 font-body text-body text-ink-soft">
            <a href={telHref()} className="w-fit transition-colors hover:text-accent">
              {site.phone}
            </a>
            <a
              href={whatsappHref()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-fit transition-colors hover:text-accent"
            >
              WhatsApp
            </a>
            <a href={mailHref()} className="w-fit transition-colors hover:text-accent">
              {site.email}
            </a>
            <p>{formattedAddress()}</p>
            {site.hours ? <p className="text-small text-ink-soft">{site.hours}</p> : null}
          </div>

          <ContactForm />
        </div>
      </Container>
    </motion.section>
  );
}
