"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, LayoutGrid, Quote } from "lucide-react";
import {
  formatBlogDateShort,
  getRelatedPosts,
  type BlogPost,
  type BlogSection,
} from "@/lib/blog";
import { cn } from "@/lib/utils";

const DEFAULT_AVATAR =
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&q=80";

function formatReadTime(readTime: string): string {
  const match = readTime.match(/(\d+)/);
  if (!match) return readTime;
  return `${match[1]} Minutes`;
}

function MetaItem({
  label,
  value,
  children,
}: {
  label: string;
  value?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="min-w-0 flex-1 px-4 first:pl-0 last:pr-0 sm:px-6">
      <p className="text-[11px] font-medium tracking-[0.06em] text-zinc-400 uppercase">
        {label}
      </p>
      {children ?? (
        <p className="mt-2 text-[15px] font-semibold tracking-[-0.02em] text-foreground">
          {value}
        </p>
      )}
    </div>
  );
}

function ContentSection({
  section,
  index,
  postTitle,
}: {
  section: BlogSection;
  index: number;
  postTitle: string;
}) {
  const isIntro = index === 0 && !section.heading;

  return (
    <div className={index > 0 ? "mt-14 sm:mt-16" : ""}>
      {section.heading && (
        <h2
          className="mb-5 text-[clamp(1.5rem,3vw,2rem)] font-semibold leading-[1.15] tracking-[-0.03em] text-foreground"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {section.heading}
        </h2>
      )}

      {section.paragraphs?.map((paragraph, j) => (
        <p
          key={j}
          className={
            isIntro
              ? "text-[16px] leading-[1.9] tracking-[-0.01em] text-zinc-500 not-first:mt-5 sm:text-[17px]"
              : "text-[16px] leading-[1.9] tracking-[-0.01em] text-zinc-600 not-first:mt-5"
          }
        >
          {paragraph}
        </p>
      ))}

      {section.bullets && section.bullets.length > 0 && (
        <ul className="mt-6 space-y-4">
          {section.bullets.map((item) => (
            <li
              key={item}
              className="flex gap-3 text-[16px] leading-[1.75] text-zinc-600"
            >
              <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400" />
              {item}
            </li>
          ))}
        </ul>
      )}

      {section.image && (
        <div
          className={cn(
            "relative aspect-[16/10] overflow-hidden rounded-[1.35rem] bg-[#f3f3f3] sm:rounded-[1.5rem]",
            section.heading || isIntro ? "mt-8" : "mb-8"
          )}
        >
          <Image
            src={section.image}
            alt={section.heading ?? postTitle}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 768px"
          />
        </div>
      )}

      {section.quote && (
        <blockquote className="relative mt-8 overflow-hidden rounded-[1.25rem] border border-black/[0.08] bg-[#fafafa] px-6 py-7 sm:px-8 sm:py-8">
          <p
            className="max-w-[85%] text-[clamp(1.15rem,2vw,1.4rem)] font-medium leading-[1.45] tracking-[-0.02em] text-foreground"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            &ldquo;{section.quote}&rdquo;
          </p>
          <Quote
            className="absolute top-6 right-6 h-10 w-10 text-zinc-300 sm:h-12 sm:w-12"
            strokeWidth={1.25}
          />
        </blockquote>
      )}
    </div>
  );
}

export function BlogPostPageContent({ post }: { post: BlogPost }) {
  const related = getRelatedPosts(post.slug, 2);
  const avatar = post.authorAvatar ?? DEFAULT_AVATAR;
  const role = post.authorRole ?? "Creative Director";

  return (
    <div className="relative min-h-screen bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden pt-28 pb-10 sm:pt-32 sm:pb-12">
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            backgroundImage: `
              radial-gradient(ellipse 90% 70% at 50% -20%, rgba(139,92,246,0.09), transparent 58%),
              radial-gradient(ellipse 60% 50% at 20% 10%, rgba(249,115,22,0.04), transparent 50%),
              linear-gradient(to bottom, #fafafa 0%, #ffffff 50%)
            `,
          }}
        />

        <div className="container-premium relative">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-[13px] font-medium text-zinc-500 transition-colors hover:text-foreground"
            >
              <LayoutGrid className="h-4 w-4" />
              Blog Details
            </Link>

            <h1
              className="mt-6 max-w-4xl text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.1] tracking-[-0.04em] text-foreground"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {post.title}
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Meta bar */}
      <section className="border-y border-black/[0.07] bg-white">
        <div className="container-premium py-8 sm:py-9">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="flex flex-col gap-6 sm:flex-row sm:items-center sm:divide-x sm:divide-black/[0.08]"
          >
            <MetaItem label="Author">
              <div className="mt-2 flex items-center gap-3">
                <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-xl bg-zinc-100">
                  <Image
                    src={avatar}
                    alt={post.author}
                    fill
                    className="object-cover"
                    sizes="44px"
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-[15px] font-semibold tracking-[-0.02em] text-foreground">
                    {post.author}
                  </p>
                  <p className="text-[13px] text-zinc-500">{role}</p>
                </div>
              </div>
            </MetaItem>

            <MetaItem label="Topic/Focus" value={post.category} />
            <MetaItem label="Time to read" value={formatReadTime(post.readTime)} />
            <MetaItem
              label="Publish Date"
              value={formatBlogDateShort(post.publishedAt)}
            />
          </motion.div>
        </div>
      </section>

      {/* Featured image */}
      <section className="container-premium py-10 sm:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="relative aspect-[16/9] overflow-hidden rounded-[1.5rem] bg-[#f3f3f3] sm:rounded-[1.75rem]"
        >
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            sizes="(max-width: 1280px) 100vw, 1200px"
            priority
          />
        </motion.div>
      </section>

      {/* Article body */}
      <article className="container-premium pb-16 sm:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.12 }}
          className="mx-auto max-w-3xl"
        >
          {post.content.map((section, i) => (
            <ContentSection key={i} section={section} index={i} postTitle={post.title} />
          ))}
        </motion.div>
      </article>

      {/* Related */}
      {related.length > 0 && (
        <section className="border-t border-black/[0.06] bg-[#fafafa] py-14 sm:py-16">
          <div className="container-premium">
            <h2
              className="mb-10 text-[clamp(1.5rem,3vw,2rem)] font-semibold tracking-[-0.03em] text-foreground"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              More from the blog
            </h2>
            <div className="grid gap-10 sm:grid-cols-2 sm:gap-12">
              {related.map((item) => (
                <Link key={item.slug} href={`/blog/${item.slug}`} className="group">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[1.35rem] bg-[#f3f3f3]">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <div className="mt-5 flex items-center justify-between gap-4">
                    <span className="text-[13px] font-medium text-zinc-500">
                      {item.category}
                    </span>
                    <span className="text-[13px] text-zinc-400">
                      {formatBlogDateShort(item.publishedAt)}
                    </span>
                  </div>
                  <h3
                    className="mt-3 text-[clamp(1.2rem,2vw,1.5rem)] font-semibold leading-[1.2] tracking-[-0.03em] text-foreground transition-colors group-hover:text-zinc-600"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {item.title}
                  </h3>
                  <span className="mt-3 inline-flex items-center gap-1 text-[13px] font-medium text-foreground">
                    Read article
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
