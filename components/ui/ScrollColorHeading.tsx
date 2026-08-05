"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";
import { motion, useMotionTemplate, useScroll, useTransform } from "framer-motion";
import { useSafeReducedMotion } from "@/lib/motion";
import { themeColors } from "@/lib/theme-colors";

export type ScrollColorHeadingProps = {
  as?: "h1" | "h2" | "h3";
  children: ReactNode;
  className?: string;
  /** "ink" for headings on paper/surface backgrounds (default), "paper" for headings on dark accent panels, "brand" for a static brand-gradient fill (DESIGN.md — Palette → Three gradient variables). */
  tone?: "ink" | "paper" | "brand";
  /** Which CSS var the "brand" tone reads its gradient from. Default is calibrated for text on `paper`/`surface`; pass `--brand-gradient-text-on-accent` on the dark Home hero panel instead (DESIGN.md — Palette). No effect for tone !== "brand". */
  brandGradientVar?: string;
  /** Merged with the internal gradient/color style — e.g. font-variation-settings for a variable font. */
  style?: CSSProperties;
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
//
// tone="brand" is a different, simpler treatment: a static brand-gradient
// text fill, no scroll-linked wipe. It skips the motion/scroll wiring below
// entirely (the hooks still run, per rules-of-hooks, but their output goes
// unused on this path) — a moving 2-color wipe doesn't translate to a
// 3-stop brand gradient, and a static fill reads more like a signature mark
// than an animated one would.
export default function ScrollColorHeading({
  as = "h2",
  children,
  className,
  tone = "ink",
  brandGradientVar = "--brand-gradient-text",
  style,
}: ScrollColorHeadingProps) {
  const prefersReducedMotion = useSafeReducedMotion();
  const ref = useRef<HTMLHeadingElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.35"],
  });
  const progress = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const { base, final } = tones[tone === "brand" ? "ink" : tone];
  const backgroundImage = useMotionTemplate`linear-gradient(to right, ${final} 0%, ${final} calc(${progress}% - 6%), ${base} calc(${progress}% + 6%), ${base} 100%)`;

  if (tone === "brand") {
    const Tag = as;
    return (
      <Tag
        className={className}
        style={{
          ...style,
          backgroundImage: `var(${brandGradientVar})`,
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
        }}
      >
        {children}
      </Tag>
    );
  }

  if (prefersReducedMotion) {
    const Tag = as;
    return (
      <Tag className={className} style={{ ...style, color: final }}>
        {children}
      </Tag>
    );
  }

  const MotionTag = motionTags[as];
  // framer-motion's `style` prop accepts MotionValues per-property at runtime,
  // but React's CSSProperties type doesn't model that — the double cast (via
  // `unknown`) is the standard escape hatch for this exact background-clip:
  // text + animated gradient technique.
  const gradientStyle = {
    ...style,
    backgroundImage,
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    color: "transparent",
  } as unknown as CSSProperties;

  return (
    <MotionTag ref={ref} className={className} style={gradientStyle}>
      {children}
    </MotionTag>
  );
}
