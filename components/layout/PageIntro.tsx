"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import { useSafeReducedMotion } from "@/lib/motion";

const HOLD_MS = 350;
const MOVE_MS = 450;

// One-shot intro that plays on a hard page load: the mark appears
// centered, holds briefly, then travels to its real position in the
// header — measured live via #site-logo-anchor (Header.tsx), so it tracks
// the header's actual layout at any breakpoint instead of a hardcoded
// target — while this overlay fades to reveal the page underneath, which
// is already fully rendered the entire time; this component only ever
// draws on top of it, it never gates when the real content mounts.
//
// RootLayout persists across client-side route changes in the App
// Router, so this never replays on in-app navigation — only on an actual
// page load/refresh (see PageTransition.tsx for the separate route-change
// animation). Skipped outright under prefers-reduced-motion.
export default function PageIntro() {
  const prefersReducedMotion = useSafeReducedMotion();
  const [phase, setPhase] = useState<"hold" | "moving" | "done">("hold");
  const logoRef = useRef<HTMLDivElement>(null);
  const logoControls = useAnimation();

  useEffect(() => {
    // Nothing to animate — skip without touching state, the render check
    // below (`prefersReducedMotion || phase === "done"`) already covers it.
    if (prefersReducedMotion) return;

    let cancelled = false;
    document.body.style.overflow = "hidden";

    async function run() {
      await logoControls.start({ opacity: 1, scale: 1, transition: { duration: 0.35, ease: "easeOut" } });
      if (cancelled) return;

      await new Promise((resolve) => setTimeout(resolve, HOLD_MS));
      if (cancelled) return;
      setPhase("moving");

      const anchor = document.getElementById("site-logo-anchor");
      const start = logoRef.current;
      if (anchor && start) {
        const targetRect = anchor.getBoundingClientRect();
        const startRect = start.getBoundingClientRect();
        const scale = targetRect.width / startRect.width;
        const x = targetRect.left + targetRect.width / 2 - (startRect.left + startRect.width / 2);
        const y = targetRect.top + targetRect.height / 2 - (startRect.top + startRect.height / 2);
        await logoControls.start({
          x,
          y,
          scale,
          transition: { duration: MOVE_MS / 1000, ease: [0.65, 0, 0.35, 1] },
        });
      }
      if (cancelled) return;

      document.body.style.overflow = "";
      setPhase("done");
    }

    run();

    return () => {
      cancelled = true;
      document.body.style.overflow = "";
    };
  }, [prefersReducedMotion, logoControls]);

  if (prefersReducedMotion || phase === "done") return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[100]" aria-hidden="true">
      <motion.div
        className="absolute inset-0 bg-paper"
        animate={{ opacity: phase === "moving" ? 0 : 1 }}
        transition={{ duration: MOVE_MS / 1000, ease: "easeOut" }}
      />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <motion.div
          ref={logoRef}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={logoControls}
          className="relative h-20 w-20"
        >
          <Image src="/images/logo.svg" alt="" fill className="object-contain" />
        </motion.div>
      </div>
    </div>
  );
}
