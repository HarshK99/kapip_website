"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  getTextRevealContainer,
  getTextRevealPiece,
  sectionRevealViewport,
  useSafeReducedMotion,
} from "@/lib/motion";

export type RevealTextProps = {
  /** The full string. Rendered once as the accessible label; the visible
   *  pieces are aria-hidden so a screen reader reads it plainly, once. */
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  /** "word" (default) staggers each word; "line" splits on authored "\n". */
  split?: "word" | "line";
  /** Classes for the semantic tag — font, size, colour. */
  className?: string;
  /** Extra classes per visible piece (word / line) — e.g. a tonal step across
   *  authored lines. Called with the piece's index and the total count. */
  pieceClassName?: (index: number, total: number) => string | undefined;
};

const WHITESPACE = /^\s+$/;

// The once-per-screen "type rises into view" moment (DESIGN.md — Motion).
// Each word (or authored line) clip-rises from behind its own baseline; the
// wrapper masks it. The semantic tag carries `aria-label` and every piece is
// `aria-hidden`. SSR emits the full text (transformed, not removed) so it
// stays crawlable and paints before hydration — the same initial="hidden"
// tradeoff the section reveal already makes.
//
// The wrapper's `pb`/`-mb` pair reserves room for descenders inside the clip
// without changing layout; the piece variant travels 120% to clear it.
export default function RevealText({
  text,
  as = "span",
  split = "word",
  className,
  pieceClassName,
}: RevealTextProps) {
  const prefersReducedMotion = useSafeReducedMotion();
  const Tag = as;

  const pieces =
    split === "line"
      ? text.split("\n")
      : text.split(/(\s+)/).filter((piece) => piece.length > 0);
  const pieceVariants = getTextRevealPiece(prefersReducedMotion);
  const wrapperClass =
    split === "line"
      ? "block overflow-hidden pb-[0.18em] -mb-[0.18em]"
      : "inline-block overflow-hidden pb-[0.18em] -mb-[0.18em] align-bottom";

  return (
    <Tag className={className} aria-label={text}>
      <motion.span
        className="block"
        initial="hidden"
        whileInView="visible"
        viewport={sectionRevealViewport}
        variants={getTextRevealContainer(prefersReducedMotion)}
      >
        {pieces.map((piece, index) =>
          WHITESPACE.test(piece) ? (
            <Fragment key={index}>{piece}</Fragment>
          ) : (
            <span
              key={index}
              aria-hidden="true"
              className={cn(wrapperClass, pieceClassName?.(index, pieces.length))}
            >
              <motion.span className="inline-block" variants={pieceVariants}>
                {piece}
              </motion.span>
            </span>
          )
        )}
      </motion.span>
    </Tag>
  );
}
