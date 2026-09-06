import type { BlogPost } from "@/data/blog";

// Reading time + date formatting for the IP Blogs listing and article pages.
// Kept here (not in a component) because both the card and the post header
// need them.

const WORDS_PER_MINUTE = 200;

/** Rounded-up minutes to read a post, from the text of every prose block. */
export function readingTime(post: BlogPost): number {
  const words = post.body.reduce((total, block) => {
    if (block.type === "paragraph" || block.type === "heading" || block.type === "quote") {
      return total + block.text.trim().split(/\s+/).length;
    }
    if (block.type === "list") {
      return total + block.items.join(" ").trim().split(/\s+/).length;
    }
    return total;
  }, 0);

  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

/** ISO date -> "14 Aug 2026" (day-month-year, matching the India context). */
export function formatPostDate(iso: string): string {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
