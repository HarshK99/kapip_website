"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useSafeReducedMotion } from "@/lib/motion";
import { ButtonIcon } from "@/components/ui/Button";

export type NodeExplorerItem = {
  id: string;
  name: string;
  subtext: string;
  href: string;
};

export type NodeExplorerProps = {
  /** Exactly 4 items, rendered as 4 circular nodes in a horizontal chain. */
  items: NodeExplorerItem[];
  /** Index active on first paint (default 0). */
  initialActiveIndex?: number;
  /** Auto-advance interval in ms (default 4500). */
  intervalMs?: number;
  className?: string;
};

// Each node's fixed horizontal anchor, as a percentage of the container's
// width (quartile centers, evenly spaced). All nodes sit on one vertical
// center (50%) — the active node grows symmetrically around that same
// point rather than shifting position, so it never crowds a neighbor.
// Nodes never swap slots — only which one is "active" (and therefore
// large) changes.
const ANCHOR_X = ["12.5%", "37.5%", "62.5%", "87.5%"] as const;
const ANCHOR_Y = "50%";

const pct = (value: string) => Number.parseFloat(value);

// A horizontal "chain" of circular nodes connected by a single line — one
// node is active (large, showing its subtext + a directional icon) while
// the rest stay small and quiet (name only). The active node auto-advances
// through all items on a timer; hovering or focusing any node activates it
// immediately and pauses the timer for as long as the interaction lasts,
// resuming from wherever it left off once released — no on-page copy
// announces this (DESIGN.md — Motion → Auto-advancing content). Disabled
// entirely under prefers-reduced-motion: the initial node stays active
// until a node is explicitly hovered/focused.
//
// Domain-agnostic (no service-specific fields) — reusable wherever a small
// set of exactly 4 named items needs this hover-to-preview/auto-cycle
// behavior, not just Services. Callers map their own data into
// NodeExplorerItem.
export default function NodeExplorer({
  items,
  initialActiveIndex = 0,
  intervalMs = 4500,
  className,
}: NodeExplorerProps) {
  const prefersReducedMotion = useSafeReducedMotion();
  const [activeIndex, setActiveIndex] = useState(initialActiveIndex);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion || paused || items.length <= 1) return;
    const id = setInterval(() => {
      setActiveIndex((current) => (current + 1) % items.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [prefersReducedMotion, paused, intervalMs, items.length]);

  const activate = (index: number) => {
    setActiveIndex(index);
    setPaused(true);
  };
  const release = () => setPaused(false);

  return (
    <div className={cn("relative h-[280px] w-full md:h-[320px] lg:h-[360px]", className)}>
      <svg className="absolute inset-0 h-full w-full text-line" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <line
          x1={pct(ANCHOR_X[0])}
          y1={pct(ANCHOR_Y)}
          x2={pct(ANCHOR_X[ANCHOR_X.length - 1])}
          y2={pct(ANCHOR_Y)}
          stroke="currentColor"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {items.map((item, index) => {
        const isActive = index === activeIndex;
        const anchorX = ANCHOR_X[index % ANCHOR_X.length];
        return (
          <motion.div
            key={item.id}
            layout
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.45, ease: "easeOut" }}
            className={cn(
              "absolute z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-2 rounded-full border text-center transition-all",
              isActive
                ? "h-56 w-56 gap-3 border-accent bg-accent/5 p-6 shadow-[0_0_60px_-8px_var(--tw-shadow-color)] shadow-accent/60 md:h-64 md:w-64 lg:h-72 lg:w-72 lg:p-8"
                : "h-20 w-20 border-line bg-paper p-2 lg:h-24 lg:w-24 lg:p-3"
            )}
            style={{ left: anchorX, top: ANCHOR_Y }}
          >
            <Link
              href={item.href}
              className="absolute inset-0 z-10 rounded-full"
              aria-label={`${item.name} — explore`}
              onMouseEnter={() => activate(index)}
              onFocus={() => activate(index)}
              onMouseLeave={release}
              onBlur={release}
            />
            <span
              className={cn(
                "font-display font-semibold transition-colors",
                isActive ? "text-h3 text-ink" : "text-small text-ink-soft"
              )}
            >
              {item.name}
            </span>
            {isActive ? (
              <>
                <p className="font-body text-small text-ink-soft">{item.subtext}</p>
                <ButtonIcon />
              </>
            ) : null}
          </motion.div>
        );
      })}
    </div>
  );
}
