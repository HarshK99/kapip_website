import { useSyncExternalStore } from "react";
import type { Variants } from "framer-motion";

// Restrained variants (DESIGN.md — Motion). One set, reused everywhere.
// Reduced-motion-safe: components read `prefersReducedMotion` (via
// `useSafeReducedMotion` below) and pass it to `getSectionReveal` /
// `getHoverLift` / `getMarkDraw` instead of importing the animated variants
// directly.

// Framer Motion's own `useReducedMotion` resolves the OS preference
// synchronously on the client, before React can reconcile against
// server-rendered markup — a client with `prefers-reduced-motion: reduce`
// would hydrate straight into the settled state while the server always
// assumed motion was on, tripping a hydration mismatch. useSyncExternalStore
// is the React-sanctioned fix: it renders the server snapshot (motion on)
// until hydration completes, then swaps to the live client value.
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(callback: () => void) {
  const mediaQueryList = window.matchMedia(REDUCED_MOTION_QUERY);
  mediaQueryList.addEventListener("change", callback);
  return () => mediaQueryList.removeEventListener("change", callback);
}

const getSnapshot = () => window.matchMedia(REDUCED_MOTION_QUERY).matches;
const getServerSnapshot = () => false;

export function useSafeReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

const sectionRevealMotion: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const sectionRevealInstant: Variants = {
  hidden: { opacity: 1, y: 0 },
  visible: { opacity: 1, y: 0, transition: { duration: 0 } },
};

export const sectionRevealViewport = { once: true, margin: "-40px" };

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

// Orchestrates a grid/row of items (cards, columns, process steps) so they
// enter in sequence rather than as one flat block — nest under a section
// that's already using getSectionReveal; children use getSectionReveal too
// and inherit the "visible" state from this container.
const staggerContainerMotion: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const staggerContainerInstant: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0, delayChildren: 0 } },
};

export const getStaggerContainer = (prefersReducedMotion: boolean): Variants =>
  prefersReducedMotion ? staggerContainerInstant : staggerContainerMotion;

// The one orchestrated moment (DESIGN.md — Motion): the Home hero mark draws
// its corner-brackets, then the check settles in, once on load.
const markDrawBracket: Variants = {
  hidden: { pathLength: 0 },
  visible: { pathLength: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

const markDrawCheck: Variants = {
  hidden: { pathLength: 0 },
  visible: { pathLength: 1, transition: { duration: 0.35, ease: "easeOut", delay: 0.45 } },
};

const markDrawInstant: Variants = {
  hidden: { pathLength: 1 },
  visible: { pathLength: 1, transition: { duration: 0 } },
};

export const getMarkDraw = (
  prefersReducedMotion: boolean,
  part: "bracket" | "check"
): Variants => {
  if (prefersReducedMotion) return markDrawInstant;
  return part === "bracket" ? markDrawBracket : markDrawCheck;
};
