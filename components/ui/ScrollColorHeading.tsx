"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";
import { motion, useMotionTemplate, useScroll, useTransform } from "framer-motion";
import { useSafeReducedMotion } from "@/lib/motion";
import { themeColors } from "@/lib/theme-colors";

export type ScrollColorHeadingProps = {
  as?: "h1" | "h2" | "h3";
  children: ReactNode;
  className?: string;
  /** "ink" for headings on paper/surface backgrounds (default), "paper" for headings on dark accent panels (the Home hero). */
  tone?: "ink" | "paper";
};

const motionTags = { h1: motion.h1, h2: motion.h2, h3: motion.h3 } as const;

const tones = {
  ink: { base: themeColors.inkSoft, final: themeColors.ink },
  paper: { base: `${themeColors.paper}66`, final: themeColors.paper },
} as const;

// Every heading starts in a muted tone and sweeps left-to-right to its full
// color as the reader scrolls it through the viewport. Tied continuously to
// scroll position (not a one-shot reveal on first entering view) via
// framer-motion's useScroll — scrolling back up un-resolves the color too.
// Single shared primitive: wherever a heading needs this, use this component
// rather than re-implementing the gradient/scroll wiring per call site.
export default function ScrollColorHeading({
  as = "h2",
  children,
  className,
  tone = "ink",
}: ScrollColorHeadingProps) {
  const prefersReducedMotion = useSafeReducedMotion();
  const ref = useRef<HTMLHeadingElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.35"],
  });
  const progress = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const { base, final } = tones[tone];
  const backgroundImage = useMotionTemplate`linear-gradient(to right, ${final} 0%, ${final} calc(${progress}% - 6%), ${base} calc(${progress}% + 6%), ${base} 100%)`;

  if (prefersReducedMotion) {
    const Tag = as;
    return (
      <Tag className={className} style={{ color: final }}>
        {children}
      </Tag>
    );
  }

  const MotionTag = motionTags[as];
  const gradientStyle = {
    backgroundImage,
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    color: "transparent",
  } as CSSProperties;

  return (
    <MotionTag ref={ref} className={className} style={gradientStyle}>
      {children}
    </MotionTag>
  );
}
