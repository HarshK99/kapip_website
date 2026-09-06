"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import RevealText from "@/components/ui/RevealText";
import { getSectionReveal, sectionRevealViewport, useSafeReducedMotion } from "@/lib/motion";

export type StatementProps = {
  /** A single short claim in Spectral. Keep it to a handful of words. A plain
   *  string clip-rises word by word; put a `\n` in it to author a two-line
   *  break and it clip-rises line by line instead (RevealText). */
  children: string;
  /** Full-bleed `surface` band behind it. Off by default (paper + hairline). */
  banded?: boolean;
  /** Drop the first sentence to a lighter tone — a tonal step for a two-part
   *  claim ("Fewer filings." dimmed / "Stronger claims." carries the weight).
   *  Stays on one line; word split only. */
  dimLead?: boolean;
  className?: string;
};

// One oversized typographic statement per page (DESIGN.md — Statement block).
// The firm's position, in its own voice — it interrupts the scroll. Spectral,
// `ink-strong`, centred, enormous air. Sized (`display-statement`) + widened
// measure (`max-w-[82rem]`) so a short claim holds one line on desktop; a
// longer sentence carries an authored `\n` and rises as two balanced lines.
export default function Statement({
  children,
  banded = false,
  dimLead = false,
  className,
}: StatementProps) {
  const prefersReducedMotion = useSafeReducedMotion();
  const split = children.includes("\n") ? "line" : "word";

  // For `dimLead`: the last word-piece index that belongs to the first
  // sentence — every piece up to it drops to `ink-soft` (RevealText splits the
  // same way, whitespace pieces included, so indices line up).
  const leadEnd =
    dimLead && split === "word"
      ? children.split(/(\s+)/).filter(Boolean).findIndex((w) => /[.!?]$/.test(w))
      : -1;

  return (
    <motion.section
      className={cn(banded ? "bg-surface" : "border-b border-line", "py-16 md:py-24", className)}
      initial="hidden"
      whileInView="visible"
      viewport={sectionRevealViewport}
      variants={getSectionReveal(prefersReducedMotion)}
    >
      <div className="mx-auto w-full max-w-[82rem] px-5 text-center md:px-10">
        <RevealText
          as="p"
          text={children}
          split={split}
          className="font-serif text-display-statement font-bold text-ink-strong"
          pieceClassName={
            leadEnd >= 0 ? (index) => (index <= leadEnd ? "text-ink-soft" : undefined) : undefined
          }
        />
      </div>
    </motion.section>
  );
}
