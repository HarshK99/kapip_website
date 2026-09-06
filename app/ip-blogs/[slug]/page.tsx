import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPost, getPostSlugs } from "@/data/blog";
import BlogPost from "@/components/sections/BlogPost";
import CTA from "@/components/sections/CTA";

type BlogPostParams = { slug: string };

export function generateStaticParams(): BlogPostParams[] {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<BlogPostParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);

  return post ? { title: post.title, description: post.excerpt } : {};
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<BlogPostParams>;
}) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <BlogPost post={post} />
      <CTA />
    </>
  );
}
