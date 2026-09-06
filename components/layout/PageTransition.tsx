"use client";

import type { ReactNode } from "react";
import { AnimatePresence, motion, PresenceContext } from "framer-motion";
import { usePathname } from "next/navigation";
import { useSafeReducedMotion } from "@/lib/motion";

// Blur-dissolve crossfade on route change — the closest cheap (GPU-
// composited, no canvas) approximation of a "pixelated reassemble":
// content softens out of focus and sharpens back in, rather than
// literally screenshotting the DOM into a mosaic, which would need
// canvas and conflict with the project's no-canvas/perf-first rule.
//
// Deliberately no `mode="wait"`: that forces the outgoing page to fully
// exit before the incoming one is even allowed to start, which leaves a
// blank gap whenever the next route isn't instantly ready (e.g. next dev
// compiling a route on first visit). Both pages are stacked in the same
// grid cell instead, so the old one stays fully visible the entire time
// the new one is still becoming available — nothing is ever blank.
//
// `initial={false}` skips this on the very first mount, so it never
// doubles up with PageIntro on a hard page load — this is purely the
// client-side navigation case. Header/Footer live outside this wrapper in
// RootLayout, so they stay put across navigations; only the page body
// animates.
//
// IMPORTANT: `AnimatePresence initial={false}` propagates a
// `PresenceContext` with `initial: false` to *every* descendant motion
// component, which silently suppresses their own `initial` prop — that
// broke every `whileInView` section-reveal on the site (they animated from
// opacity-1 to opacity-1). The children are wrapped in a `null`
// PresenceContext so their `initial="hidden"` works normally; only this
// wrapper's own div is a presence child.
export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const prefersReducedMotion = useSafeReducedMotion();

  if (prefersReducedMotion) {
    return <>{children}</>;
  }

  return (
    <div className="grid">
      <AnimatePresence initial={false}>
        <motion.div
          key={pathname}
          className="col-start-1 row-start-1"
          initial={{ opacity: 0, filter: "blur(10px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, filter: "blur(6px)" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <PresenceContext.Provider value={null}>{children}</PresenceContext.Provider>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
