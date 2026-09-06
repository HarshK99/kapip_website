import Image from "next/image";
import type { BlogBlock } from "@/data/blog";

export type BlogBodyProps = {
  blocks: BlogBlock[];
};

// Renders a post's typed block union with design-token styling (no
// markdown/typography plugin — static export, and the project keeps styling
// on tokens). Reading copy is capped ~68ch by the wrapper; the lead
// paragraph gets the standfirst treatment.
export default function BlogBody({ blocks }: BlogBodyProps) {
  const leadIndex = blocks.findIndex((block) => block.type === "paragraph");

  return (
    <div className="flex max-w-prose flex-col gap-6">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "paragraph": {
            const isLead = index === leadIndex;
            return (
              <p
                key={index}
                className={
                  isLead
                    ? "font-body text-lead text-ink-soft"
                    : "font-body text-body text-ink"
                }
              >
                {block.text}
              </p>
            );
          }

          case "heading":
            return (
              <h2
                key={index}
                className="mt-6 font-display text-h3 font-semibold text-ink"
              >
                {block.text}
              </h2>
            );

          case "list":
            return (
              <ul key={index} className="flex flex-col gap-2">
                {block.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 font-body text-body text-ink"
                  >
                    <span
                      className="mt-2.5 h-1.5 w-1.5 flex-none rounded-full bg-accent"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            );

          case "quote":
            return (
              <blockquote
                key={index}
                className="border-l-2 border-accent pl-5 font-body text-lead italic text-ink"
              >
                {block.text}
              </blockquote>
            );

          case "image":
            return (
              <figure key={index} className="flex flex-col gap-2">
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-media bg-ink-strong">
                  <Image
                    src={block.src}
                    alt={block.caption ?? ""}
                    fill
                    sizes="(min-width: 768px) 68ch, 92vw"
                    className="object-cover"
                  />
                </div>
                {block.caption ? (
                  <figcaption className="font-display font-medium text-eyebrow uppercase tracking-[0.12em] text-ink-soft">
                    {block.caption}
                  </figcaption>
                ) : null}
              </figure>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
