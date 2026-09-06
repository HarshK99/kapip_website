"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { BlogPost as BlogPostType } from "@/data/blog";
import { formatPostDate, readingTime } from "@/lib/blog";
import Container from "@/components/ui/Container";
import RevealText from "@/components/ui/RevealText";
import BlogBody from "@/components/ui/BlogBody";
import { getSectionReveal, sectionRevealViewport, useSafeReducedMotion } from "@/lib/motion";

export type BlogPostProps = {
  post: BlogPostType;
};

export default function BlogPost({ post }: BlogPostProps) {
  const prefersReducedMotion = useSafeReducedMotion();

  return (
    <motion.article
      className="border-b border-line pt-14 pb-16 md:pt-20 md:pb-24"
      initial="hidden"
      whileInView="visible"
      viewport={sectionRevealViewport}
      variants={getSectionReveal(prefersReducedMotion)}
    >
      <Container className="flex flex-col gap-10">
        <header className="flex flex-col gap-5">
          <p className="font-body text-small text-ink-soft">
            <time dateTime={post.date} className="tabular-nums">
              {formatPostDate(post.date)}
            </time>
            <span aria-hidden="true"> · </span>
            {readingTime(post)} min read
          </p>

          <RevealText
            as="h1"
            text={post.title}
            className="max-w-[24ch] font-display text-display-l font-bold text-ink-strong"
          />

          <p className="max-w-prose font-body text-lead text-ink-soft">{post.excerpt}</p>
        </header>

        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-media bg-ink-strong">
          <Image
            src={post.coverImage}
            alt=""
            fill
            priority
            sizes="(min-width: 1024px) 1120px, 100vw"
            className="object-cover"
          />
        </div>

        <BlogBody blocks={post.body} />

        <Link
          href="/ip-blogs"
          className="inline-flex w-fit items-center gap-2 font-display text-small font-medium text-ink transition-colors hover:text-accent"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path
              d="M9 3L3 9M3 9H7.5M3 9V4.5"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          All articles
        </Link>
      </Container>
    </motion.article>
  );
}
