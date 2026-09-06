import type { Metadata } from "next";
import PageBanner from "@/components/ui/PageBanner";
import BlogIndex from "@/components/sections/BlogIndex";
import CTA from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: "IP Blogs",
  description: "Practical notes on patents, filing strategy, and IP protection from KAP IP.",
};

export default function IpBlogsPage() {
  return (
    <>
      <PageBanner
        src="/images/blog/index-banner.svg"
        title="IP Blogs"
        lead="Practical notes on patents, filing strategy, and protecting what you build." /* DUMMY */
      />
      <BlogIndex />
      <CTA />
    </>
  );
}
