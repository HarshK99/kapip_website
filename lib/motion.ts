import type { Variants } from "framer-motion";

// Restrained variants (DESIGN.md — Motion). One set, reused everywhere.
// Reduced-motion-safe: components read `prefersReducedMotion` (via
// framer-motion's `useReducedMotion`) and pass it to `getSectionReveal` /
// `getHoverLift` instead of importing the animated variants directly.

const sectionRevealMotion: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

const sectionRevealInstant: Variants = {
  hidden: { opacity: 1, y: 0 },
  visible: { opacity: 1, y: 0, transition: { duration: 0 } },
};

export const sectionRevealViewport = { once: true, margin: "-80px" };

export const getSectionReveal = (prefersReducedMotion: boolean): Variants =>
  prefersReducedMotion ? sectionRevealInstant : sectionRevealMotion;

const hoverLiftMotion: Variants = {
  rest: { y: 0 },
  hover: { y: -2, transition: { duration: 0.15, ease: "easeOut" } },
};

const hoverLiftInstant: Variants = {
  rest: { y: 0 },
  hover: { y: 0, transition: { duration: 0 } },
};

export const getHoverLift = (prefersReducedMotion: boolean): Variants =>
  prefersReducedMotion ? hoverLiftInstant : hoverLiftMotion;
