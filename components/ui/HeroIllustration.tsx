"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { motion } from "framer-motion";
import { useSafeReducedMotion } from "@/lib/motion";

export type HeroIllustrationProps = {
  className?: string;
};

// One-shot fade-in on mount (~1.5s settle), then handed off to a CSS
// floating loop (15–20s, one duration per depth group). Reduced-motion
// renders the final state immediately and never floats.
const ENTRANCE_SETTLE = 1.5;
const FLOAT_START_DELAY = `${ENTRANCE_SETTLE}s`;

// Max parallax travel per spec (px) — the nearest group moves at this much,
// farther groups move less, so the parallax reads as depth rather than
// everything sliding together.
const MAX_PARALLAX_PX = 6;
// Lower = smoother/slower easing toward the pointer target, higher = snappier.
const EASE_FACTOR = 0.08;

type PointerState = {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  px: number;
  py: number;
  opacity: number;
  targetOpacity: number;
};

// Reusable, artwork-agnostic animation shell: a static SVG illustration (two
// molecule clusters, grouped by depth) wrapped in an animation system that
// is entirely independent of the artwork inside it. Swapping the paths
// later means touching only the JSX below, never the effects — each depth
// group is just "a `<g>` with a ref", nothing more.
export default function HeroIllustration({ className }: HeroIllustrationProps) {
  const prefersReducedMotion = useSafeReducedMotion();

  const rootRef = useRef<HTMLDivElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);

  // Depth groups, nearest first. Each gets its own parallax factor (applied
  // to MAX_PARALLAX_PX) so the illustration reads as layered, not flat.
  const moleculeNearRef = useRef<SVGGElement>(null);
  const moleculeFarRef = useRef<SVGGElement>(null);

  const pointer = useRef<PointerState>({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
    px: 0,
    py: 0,
    opacity: 0,
    targetOpacity: 0,
  });
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    // Nothing dynamic happens under reduced motion (no float, no parallax,
    // no highlight) — skip the observer and rAF loop entirely rather than
    // starting one that would just spin writing no-op transforms forever.
    if (prefersReducedMotion) return;

    const root = rootRef.current;
    if (!root) return;

    // Pause the CSS float loop (and stop the parallax rAF loop) while the
    // hero is scrolled out of view — no work happens off-screen.
    let inView = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        root.style.setProperty("--hero-illustration-play", inView ? "running" : "paused");
        if (inView) startLoop();
        else stopLoop();
      },
      { threshold: 0 }
    );
    observer.observe(root);

    function handlePointerMove(e: PointerEvent) {
      // TS doesn't carry the `root` non-null narrowing above into this
      // hoisted function declaration's closure — it is non-null, checked
      // once at the top of this effect.
      const rect = root!.getBoundingClientRect();
      pointer.current.targetX = (e.clientX - rect.left) / rect.width - 0.5;
      pointer.current.targetY = (e.clientY - rect.top) / rect.height - 0.5;
      pointer.current.px = e.clientX - rect.left;
      pointer.current.py = e.clientY - rect.top;
      pointer.current.targetOpacity = 1;
    }

    function handlePointerLeave() {
      pointer.current.targetX = 0;
      pointer.current.targetY = 0;
      pointer.current.targetOpacity = 0;
    }

    // Direct DOM writes, no React state — pointer movement never triggers a
    // re-render. Position and highlight opacity are eased toward their
    // target each frame so the return-to-rest on pointer leave is smooth
    // rather than an instant snap.
    function tick() {
      if (!inView) {
        rafId.current = null;
        return;
      }

      const p = pointer.current;
      p.x += (p.targetX - p.x) * EASE_FACTOR;
      p.y += (p.targetY - p.y) * EASE_FACTOR;
      p.opacity += (p.targetOpacity - p.opacity) * EASE_FACTOR;

      const groups: [SVGGElement | null, number][] = [
        [moleculeNearRef.current, 1.5],
        [moleculeFarRef.current, 0.6],
      ];
      for (const [el, depth] of groups) {
        if (!el) continue;
        const tx = p.x * MAX_PARALLAX_PX * depth;
        const ty = p.y * MAX_PARALLAX_PX * depth;
        el.style.transform = `translate3d(${tx.toFixed(2)}px, ${ty.toFixed(2)}px, 0)`;
      }

      if (highlightRef.current) {
        highlightRef.current.style.opacity = p.opacity.toFixed(3);
        highlightRef.current.style.transform = `translate3d(${p.px - 170}px, ${p.py - 170}px, 0)`;
      }

      rafId.current = requestAnimationFrame(tick);
    }

    function startLoop() {
      if (rafId.current == null) rafId.current = requestAnimationFrame(tick);
    }
    function stopLoop() {
      if (rafId.current != null) {
        cancelAnimationFrame(rafId.current);
        rafId.current = null;
      }
    }

    root.addEventListener("pointermove", handlePointerMove, { passive: true });
    root.addEventListener("pointerleave", handlePointerLeave, { passive: true });
    startLoop();

    return () => {
      root.removeEventListener("pointermove", handlePointerMove);
      root.removeEventListener("pointerleave", handlePointerLeave);
      observer.disconnect();
      stopLoop();
    };
  }, [prefersReducedMotion]);

  const fadeIn = (delay: number, targetOpacity = 1) => ({
    initial: { opacity: 0 },
    animate: { opacity: targetOpacity },
    transition: prefersReducedMotion ? { duration: 0 } : { duration: 0.7, delay, ease: "easeOut" as const },
  });

  return (
    <div
      ref={rootRef}
      className={className}
      style={{ "--hero-illustration-play": "running" } as unknown as CSSProperties}
    >
      {/* Soft cursor-follow highlight — positioned via the same rAF loop, no re-renders */}
      <div ref={highlightRef} className="hero-illustration-highlight" aria-hidden="true" />

      <svg viewBox="0 0 480 640" className="h-full w-full" fill="none" aria-hidden="true">
        {/* Far molecule cluster — smallest, slowest float, least parallax */}
        <g
          className="hero-illustration-float"
          style={{ animationDuration: "24s", animationDelay: FLOAT_START_DELAY }}
        >
          <g ref={moleculeFarRef}>
            <motion.g {...fadeIn(1.3, 0.5)}>
              <line x1="150" y1="470" x2="196" y2="512" stroke="#FBFAF7" strokeOpacity="0.35" strokeWidth="1" />
              <line x1="196" y1="512" x2="182" y2="560" stroke="#FBFAF7" strokeOpacity="0.35" strokeWidth="1" />
              <circle cx="150" cy="470" r="3" stroke="#FBFAF7" strokeOpacity="0.5" strokeWidth="1" />
              <circle cx="196" cy="512" r="3.5" fill="#2E9E5B" fillOpacity="0.55" />
              <circle cx="182" cy="560" r="2.5" stroke="#FBFAF7" strokeOpacity="0.5" strokeWidth="1" />
            </motion.g>
          </g>
        </g>

        {/* Near molecule cluster — largest, fastest float, most parallax */}
        <g
          className="hero-illustration-float"
          style={{ animationDuration: "16s", animationDirection: "reverse", animationDelay: FLOAT_START_DELAY }}
        >
          <g ref={moleculeNearRef}>
            <motion.g {...fadeIn(1.1)}>
              <line x1="356" y1="120" x2="404" y2="176" stroke="#FBFAF7" strokeOpacity="0.4" strokeWidth="1" />
              <line x1="404" y1="176" x2="368" y2="248" stroke="#FBFAF7" strokeOpacity="0.4" strokeWidth="1" />
              <line x1="368" y1="248" x2="278" y2="222" stroke="#FBFAF7" strokeOpacity="0.3" strokeWidth="1" />
              <circle cx="356" cy="120" r="5" fill="#AEC61C" fillOpacity="0.75" />
              <circle cx="404" cy="176" r="3.5" stroke="#FBFAF7" strokeOpacity="0.6" strokeWidth="1" />
              <circle cx="368" cy="248" r="4.5" stroke="#FBFAF7" strokeOpacity="0.6" strokeWidth="1" />
            </motion.g>
          </g>
        </g>
      </svg>
    </div>
  );
}
