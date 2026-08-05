"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import ScrollColorHeading from "@/components/ui/ScrollColorHeading";
import {
  getSectionReveal,
  getStaggerContainer,
  sectionRevealViewport,
  useSafeReducedMotion,
} from "@/lib/motion";

// DUMMY trust points — replace on content handover (PRD Content Checklist).
const points = [
  "Direct access to the attorney handling your matter",
  "Clear timelines before any filing begins",
  "One coordinated team across patents, trademarks, copyrights, and designs",
];

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="mt-1 flex-none text-accent">
      <path
        d="M2.5 7.5L5.5 10.5L11.5 3.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Home-only "Talk to us" band: a photo panel with a text+CTA card set below
// it, overlapping the image's bottom edge. Distinct from the plain `CTA`
// band reused on service/about pages (DESIGN.md's quiet "CTA band" wireframe)
// — this richer, image-led treatment is Home-specific, same pattern as
// `Team.tsx` being a Home-only variant alongside About's own team content.
export default function TalkToUs() {
  const prefersReducedMotion = useSafeReducedMotion();

  return (
    <motion.section
      className="px-4 py-16 sm:px-6 md:py-24"
      initial="hidden"
      whileInView="visible"
      viewport={sectionRevealViewport}
      variants={getSectionReveal(prefersReducedMotion)}
    >
      <div className="relative mx-auto max-w-container">
        <div className="relative h-64 w-full overflow-hidden rounded-card sm:h-80 md:h-96">
          {/* DUMMY placeholder — swap for the real photo at the same path once provided */}
          <Image
            src="/images/talk-to-us/talk-to-us-bg.svg"
            alt=""
            fill
            sizes="(min-width: 768px) 1120px, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-accent-deep/50 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 -mt-16 px-2 sm:-mt-20 md:-mt-24">
          <div className="flex flex-col gap-8 rounded-card border border-line bg-paper p-6 md:flex-row md:items-center md:justify-between md:gap-10 md:p-10">
            <div className="flex flex-col gap-3 md:max-w-sm">
              {/* DUMMY heading copy */}
              <ScrollColorHeading as="h2" className="font-display text-h2 font-semibold">
                Ready to protect what you&apos;ve built?
              </ScrollColorHeading>
              <p className="font-body text-body text-ink-soft">
                Tell us about your invention, brand, or work — we&apos;ll tell you what it takes to
                secure it.
              </p>
            </div>

            <div className="flex flex-col gap-6 md:items-start">
              <motion.ul
                variants={getStaggerContainer(prefersReducedMotion)}
                className="flex flex-col gap-2"
              >
                {points.map((point) => (
                  <motion.li
                    key={point}
                    variants={getSectionReveal(prefersReducedMotion)}
                    className="flex items-start gap-2 font-body text-small text-ink-soft"
                  >
                    <CheckIcon />
                    {point}
                  </motion.li>
                ))}
              </motion.ul>

              <div className="flex flex-wrap gap-3">
                <Button href="/contact" variant="primary" icon>
                  Talk to us {/* DUMMY CTA copy */}
                </Button>
                <Button href="/services" variant="ghost">
                  Explore services {/* DUMMY CTA copy */}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
