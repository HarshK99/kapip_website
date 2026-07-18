"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { site } from "@/data/site";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Rule from "@/components/ui/Rule";
import { MARK_PATHS } from "@/components/ui/Mark";
import { getMarkDraw, getSectionReveal, useSafeReducedMotion } from "@/lib/motion";

export default function Hero() {
  const prefersReducedMotion = useSafeReducedMotion();

  const delay = (seconds: number) => (prefersReducedMotion ? 0 : seconds);

  return (
    <Container>
      <section className="relative overflow-hidden rounded-hero bg-accent">
        {/* Image confined to the right side only, tinted into the panel color */}
        <div className="absolute inset-y-0 right-0 hidden w-1/2 md:block lg:w-[45%]">
          <Image
            src="/images/hero/hero-bg.webp"
            alt=""
            fill
            priority
            sizes="45vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-accent-deep/40" />
          <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-accent to-transparent" />
        </div>

        <div className="relative flex flex-col gap-6 px-5 py-16 md:w-1/2 md:px-6 md:py-20 lg:w-[55%] lg:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={getSectionReveal(prefersReducedMotion)}
            className="inline-flex w-fit items-center gap-2 rounded-card border border-paper/30 px-3 py-1.5"
          >
            <motion.svg
              width={20}
              height={20}
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
              className="text-paper"
              initial="hidden"
              animate="visible"
            >
              <motion.path
                d={MARK_PATHS.bracketTopLeft}
                stroke="currentColor"
                strokeWidth="1.5"
                variants={getMarkDraw(prefersReducedMotion, "bracket")}
              />
              <motion.path
                d={MARK_PATHS.bracketBottomRight}
                stroke="currentColor"
                strokeWidth="1.5"
                variants={getMarkDraw(prefersReducedMotion, "bracket")}
              />
              <motion.path
                d={MARK_PATHS.check}
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                variants={getMarkDraw(prefersReducedMotion, "check")}
              />
            </motion.svg>
            <span className="font-mono text-mono-eyebrow uppercase tracking-[0.12em] text-paper/80">
              Precision IP Counsel {/* DUMMY badge copy */}
            </span>
          </motion.div>

          <motion.h1
            initial="hidden"
            animate="visible"
            variants={getSectionReveal(prefersReducedMotion)}
            transition={{ delay: delay(0.15) }}
            className="max-w-xl font-display text-display-l font-bold tracking-tighter text-paper md:text-display-xl"
          >
            {site.tagline}
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="visible"
            variants={getSectionReveal(prefersReducedMotion)}
            transition={{ delay: delay(0.3) }}
            className="max-w-md font-body text-body text-paper/80"
          >
            {/* DUMMY supporting copy */}
            We help you search, draft, file, and defend the ideas that make your business
            valuable.
          </motion.p>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={getSectionReveal(prefersReducedMotion)}
            transition={{ delay: delay(0.35) }}
          >
            <Rule variant="short" className="border-paper/30" />
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={getSectionReveal(prefersReducedMotion)}
            transition={{ delay: delay(0.45) }}
            className="flex flex-wrap gap-4 pb-2"
          >
            <Button
              href="/contact"
              variant="primary"
              icon
              className="bg-paper text-accent hover:bg-paper/90"
            >
              Talk to us {/* DUMMY CTA copy */}
            </Button>
            <Button
              href="/services"
              variant="ghost"
              className="border-paper/40 text-paper hover:border-paper hover:text-paper"
            >
              Explore services {/* DUMMY CTA copy */}
            </Button>
          </motion.div>
        </div>
      </section>
    </Container>
  );
}
