"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import {
  BLOG_CATEGORIES,
  BLOG_POSTS,
  formatBlogDateShort,
  type BlogFilter,
  type BlogPost,
} from "@/lib/blog";
import { cn } from "@/lib/utils";

function matchesFilter(post: BlogPost, filter: BlogFilter) {
  if (filter === "All") return true;
  return post.category === filter;
}

function BlogCard({ post, index }: { post: BlogPost; index: number }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[1.35rem] bg-[#f3f3f3] sm:rounded-[1.5rem]">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        <div className="mt-5 flex items-center justify-between gap-4">
          <span className="text-[13px] font-medium tracking-[-0.01em] text-zinc-500">
            {post.category}
          </span>
          <time
            dateTime={post.publishedAt}
            className="shrink-0 text-[13px] text-zinc-400"
          >
            {formatBlogDateShort(post.publishedAt)}
          </time>
        </div>

        <h2
          className="mt-3 text-[clamp(1.35rem,2.5vw,1.75rem)] font-semibold leading-[1.2] tracking-[-0.03em] text-foreground transition-colors group-hover:text-zinc-600"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {post.title}
        </h2>
      </Link>
    </motion.article>
  );
}

export function BlogPageContent() {
  const [activeFilter, setActiveFilter] = useState<BlogFilter>("All");

  const filtered = useMemo(
    () => BLOG_POSTS.filter((post) => matchesFilter(post, activeFilter)),
    [activeFilter]
  );

  return (
    <div className="relative min-h-screen bg-white">
      {/* Hero — light editorial gradient */}
      <section className="relative overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pb-24">
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            backgroundImage: `
              radial-gradient(ellipse 90% 70% at 50% -20%, rgba(139,92,246,0.09), transparent 58%),
              radial-gradient(ellipse 60% 50% at 80% 10%, rgba(249,115,22,0.05), transparent 50%),
              linear-gradient(to bottom, #fafafa 0%, #ffffff 45%)
            `,
          }}
        />

        <div className="container-premium relative text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-[13px] font-medium tracking-[-0.01em] text-zinc-500 transition-colors hover:text-foreground"
            >
              Blog & News
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>

            <h1
              className="mx-auto mt-6 max-w-3xl text-[clamp(2.25rem,5.5vw,3.75rem)] font-semibold leading-[1.08] tracking-[-0.04em] text-foreground"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Explore Our Thoughts On Design
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-2"
          >
            {BLOG_CATEGORIES.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={cn(
                  "rounded-full px-4 py-2 text-[11px] font-medium tracking-[0.08em] uppercase transition-all",
                  activeFilter === filter
                    ? "bg-foreground text-background"
                    : "text-zinc-400 hover:text-foreground"
                )}
              >
                {filter}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Posts grid — 2 columns editorial */}
      <section className="container-premium pb-20 sm:pb-24 lg:pb-28">
        {filtered.length === 0 ? (
          <div className="py-24 text-center">
            <p className="text-[16px] font-medium text-foreground">No articles found</p>
            <button
              type="button"
              onClick={() => setActiveFilter("All")}
              className="mt-4 text-[13px] font-medium text-zinc-500 underline-offset-2 hover:underline"
            >
              View all articles
            </button>
          </div>
        ) : (
          <motion.div
            layout
            className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-14 lg:gap-x-14 lg:gap-y-16"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((post, i) => (
                <BlogCard key={post.slug} post={post} index={i} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </section>

      {/* Minimal CTA */}
      <section className="border-t border-black/[0.06] bg-[#fafafa] py-16 sm:py-20">
        <div className="container-premium text-center">
          <h2
            className="text-[clamp(1.5rem,3vw,2rem)] font-semibold tracking-[-0.03em] text-foreground"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Have a project in mind?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-[15px] leading-[1.75] text-zinc-500">
            Let&apos;s talk about your next launch — custom build, template, or
            redesign.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3.5 text-[11px] font-bold tracking-[0.14em] text-background uppercase transition-opacity hover:opacity-90"
          >
            Get in touch
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
