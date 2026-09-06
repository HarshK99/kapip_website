"use client";

import { motion } from "framer-motion";
import { getPosts } from "@/data/blog";
import Container from "@/components/ui/Container";
import BlogCard from "@/components/ui/BlogCard";
import {
  getSectionReveal,
  getStaggerContainer,
  sectionRevealViewport,
  useSafeReducedMotion,
} from "@/lib/motion";

export default function BlogIndex() {
  const prefersReducedMotion = useSafeReducedMotion();
  const posts = getPosts();

  return (
    <motion.section
      className="pt-10 pb-24 md:pt-14 md:pb-32"
      initial="hidden"
      whileInView="visible"
      viewport={sectionRevealViewport}
      variants={getSectionReveal(prefersReducedMotion)}
    >
      <Container className="flex flex-col gap-12">
        {posts.length > 0 ? (
          <motion.div
            className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3"
            variants={getStaggerContainer(prefersReducedMotion)}
          >
            {posts.map((post) => (
              <motion.div key={post.slug} variants={getSectionReveal(prefersReducedMotion)}>
                <BlogCard post={post} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <p className="font-body text-body text-ink-soft">Articles are on the way — check back soon.</p>
        )}
      </Container>
    </motion.section>
  );
}
