import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/data/blog";
import { formatPostDate } from "@/lib/blog";
import { cn } from "@/lib/utils";

export type BlogCardProps = {
  post: BlogPost;
  /** loading hint for the grid this sits in */
  sizes?: string;
  className?: string;
};

// One article in the IP Blogs listing: image on top, text below (DESIGN.md
// read of a card grid — ruled, not carded: a top hairline that shifts to
// `accent` on hover with a 1px lift, no border box, no shadow). The whole
// card is the link.
export default function BlogCard({
  post,
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 92vw",
  className,
}: BlogCardProps) {
  return (
    <Link
      href={`/ip-blogs/${post.slug}`}
      className={cn(
        "group flex flex-col gap-4 border-t border-line pt-5 transition-all hover:-translate-y-px hover:border-accent",
        className
      )}
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-media bg-ink-strong">
        <Image
          src={post.coverImage}
          alt=""
          fill
          sizes={sizes}
          className="object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
      </div>

      <h3 className="font-display text-h3 font-semibold text-ink transition-colors group-hover:text-accent">
        {post.title}
      </h3>

      <p className="line-clamp-2 font-body text-small text-ink-soft">{post.excerpt}</p>

      <div className="mt-1 flex items-center justify-between font-body text-small text-ink-soft">
        <time dateTime={post.date} className="tabular-nums">
          {formatPostDate(post.date)}
        </time>
        <span className="inline-flex items-center gap-1.5 font-display font-medium text-ink transition-colors group-hover:text-accent">
          Read more
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path
              d="M3 9L9 3M9 3H4.5M9 3V7.5"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
    </Link>
  );
}
