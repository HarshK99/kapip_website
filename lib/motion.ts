import { useEffect, useRef, useState, useSyncExternalStore, type RefObject } from "react";
import { animate, useInView, type Variants } from "framer-motion";

// Restrained variants (DESIGN.md — Motion). One set, reused everywhere.
// Reduced-motion-safe: components read `prefersReducedMotion` (via
// `useSafeReducedMotion` below) and pass it to `getSectionReveal` /
// `getHoverLift` / `getStaggerContainer` instead of importing the animated
// variants directly.

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
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

// Reduced motion still gets a gentle opacity fade — no transform, no
// movement. Fades are broadly considered reduced-motion-safe; slides,
// parallax, and count-ups are not.
const sectionRevealReduced: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.35, ease: "easeOut" } },
};

// Fire a little later than default so the reveal is actually seen rather than
// finishing before the element is properly on screen.
export const sectionRevealViewport = { once: true, margin: "0px 0px -12% 0px" };

export const getSectionReveal = (prefersReducedMotion: boolean): Variants =>
  prefersReducedMotion ? sectionRevealReduced : sectionRevealMotion;

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
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.06 } },
};

const staggerContainerInstant: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0, delayChildren: 0 } },
};

export const getStaggerContainer = (prefersReducedMotion: boolean): Variants =>
  prefersReducedMotion ? staggerContainerInstant : staggerContainerMotion;

// Text reveal — the one choreographed "type rises into view" moment per screen
// (DESIGN.md — Motion: one decisive move). Scoped to the primary section name
// (SectionHeading), the per-page Statement, and PageBanner's interior-page
// title; sub-heads, leads and body stay on the plain section/stagger fade. The
// word (or authored line) clip-rises
// from behind its own baseline inside an `overflow-hidden` wrapper — a
// transform-only, GPU-composited move, deliberately vertical so it never reads
// as the retired horizontal curtain-wipe. Consumed via `RevealText`.
//
// `container` orchestrates the stagger; `piece` is each word/line. Under
// reduced motion `piece` degrades to an opacity-only fade (no transform) and
// the stagger collapses to zero, so the whole heading just fades — matching
// the section reveal's reduced behaviour.
const textRevealContainerMotion: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.04 } },
};

const textRevealContainerInstant: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0, delayChildren: 0 } },
};

export const getTextRevealContainer = (prefersReducedMotion: boolean): Variants =>
  prefersReducedMotion ? textRevealContainerInstant : textRevealContainerMotion;

const textRevealPieceMotion: Variants = {
  // Travels more than 100% so descenders clear the masking wrapper (which
  // carries a little `pb` for exactly that reason — see RevealText).
  hidden: { y: "130%" },
  visible: { y: "0%", transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const textRevealPieceReduced: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3, ease: "easeOut" } },
};

export const getTextRevealPiece = (prefersReducedMotion: boolean): Variants =>
  prefersReducedMotion ? textRevealPieceReduced : textRevealPieceMotion;

// Counts up from 0 to `target` once the element scrolls into view (Home
// figures grid). Reduced-motion-safe: renders the final value immediately.
// Returns a ref for the counting element and the current display value.
export function useCountUp<T extends HTMLElement = HTMLElement>(
  target: number,
  prefersReducedMotion: boolean,
  duration = 1.4
): { ref: RefObject<T | null>; value: number } {
  const ref = useRef<T | null>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -12% 0px" });
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    if (!inView || prefersReducedMotion) return;
    const controls = animate(0, target, {
      duration,
      ease: "easeOut",
      onUpdate: (latest) => setAnimatedValue(Math.round(latest)),
    });
    return () => controls.stop();
  }, [inView, prefersReducedMotion, target, duration]);

  const value = prefersReducedMotion ? target : inView ? animatedValue : 0;
  return { ref, value };
}
