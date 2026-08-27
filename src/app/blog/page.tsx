import type { Metadata } from "next";
import { BlogPageContent } from "@/components/blog/blog-page";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Insights on web design, development, performance, and SEO from the STACKREL team — premium web experiences, explained.",
  openGraph: {
    title: "Blog — STACKREL",
    description:
      "Design thinking, development practices, and launch strategies from the STACKREL team.",
  },
};

export default function BlogPage() {
  return <BlogPageContent />;
}
