"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  site,
  telHref,
  whatsappHref,
  mailHref,
  formattedAddress,
  isOfficeOpenNow,
} from "@/data/site";
import Container from "@/components/ui/Container";
import PageBanner from "@/components/ui/PageBanner";
import ContactForm from "@/components/sections/ContactForm";
import {
  getSectionReveal,
  getStaggerContainer,
  sectionRevealViewport,
  useSafeReducedMotion,
} from "@/lib/motion";

const contactItems = [
  { label: "Phone", href: telHref(), value: site.phone, external: false },
  { label: "WhatsApp", href: whatsappHref(), value: "Chat on WhatsApp", external: true },
  { label: "Email", href: mailHref(), value: site.email, external: false },
];

export default function ContactBlock() {
  const prefersReducedMotion = useSafeReducedMotion();

  // Computed after mount only — the page is statically exported, so the
  // build-time HTML can't know the visitor's current time without a mismatch.
  const [openNow, setOpenNow] = useState(false);
  useEffect(() => {
    const tick = () => setOpenNow(isOfficeOpenNow());
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      {/* DUMMY framing copy + placeholder image — real photo arrives later */}
      <PageBanner
        src="/images/page-banner.png"
        title="Contact"
        lead="Tell us what you're protecting."
      />

      <motion.section
        className="pt-10 pb-24 md:pt-14 md:pb-32"
        initial="hidden"
        whileInView="visible"
        viewport={sectionRevealViewport}
        variants={getSectionReveal(prefersReducedMotion)}
      >
        <Container className="flex flex-col gap-12">
          <div className="grid gap-12 md:grid-cols-2 md:gap-16">
            <ContactForm />

            {/* The contact rows arrive in sequence, subordinate to the banner
                title reveal — inherits the "visible" state from the section
                above (same pattern as Stats). */}
            <motion.div
              className="flex flex-col gap-6"
              variants={getStaggerContainer(prefersReducedMotion)}
            >
              {contactItems.map((item) => (
                <motion.div
                  key={item.label}
                  className="flex flex-col gap-1"
                  variants={getSectionReveal(prefersReducedMotion)}
                >
                  <span className="font-display font-medium text-eyebrow uppercase tracking-[0.12em] text-ink-soft">
                    {item.label}
                  </span>
                  <a
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noopener noreferrer" : undefined}
                    className="w-fit font-body text-body text-ink-soft transition-colors hover:text-accent"
                  >
                    {item.value}
                  </a>
                </motion.div>
              ))}

              {/* Registered Office only for now — the Bangalore office is
                  hidden until its address is confirmed (still in site.offices). */}
              {site.offices.slice(0, 1).map((office) => (
                <motion.div
                  key={office.label}
                  className="flex flex-col gap-1"
                  variants={getSectionReveal(prefersReducedMotion)}
                >
                  <span className="font-display font-medium text-eyebrow uppercase tracking-[0.12em] text-ink-soft">
                    {office.label}
                  </span>
                  <p className="font-body text-body text-ink-soft">{formattedAddress(office)}</p>
                </motion.div>
              ))}

              {site.hours ? (
                <motion.div
                  className="flex flex-col gap-1"
                  variants={getSectionReveal(prefersReducedMotion)}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-display font-medium text-eyebrow uppercase tracking-[0.12em] text-ink-soft">
                      Hours
                    </span>
                    {openNow ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-wash px-2.5 py-0.5 font-body text-small text-accent">
                        <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
                        Available now
                      </span>
                    ) : null}
                  </div>
                  <p className="font-body text-body text-ink-soft">{site.hours}</p>
                </motion.div>
              ) : null}
            </motion.div>
          </div>
        </Container>
      </motion.section>
    </>
  );
}
