"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Eye,
  LayoutTemplate,
  Search,
  ShoppingBag,
  Sparkles,
  Zap,
} from "lucide-react";
import { TEMPLATE_CATEGORIES } from "@/lib/constants";
import { TEMPLATE_LIST, getProductBySlug } from "@/lib/products";
import { AddToCartButton } from "@/components/cart/add-to-cart-button";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";

type SortOption = "featured" | "price-asc" | "price-desc" | "name";

function GridBackground({ full = false }: { full?: boolean }) {
  return (
    <div
      className="pointer-events-none absolute inset-0 opacity-[0.35]"
      aria-hidden="true"
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(0,0,0,0.04) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(0,0,0,0.04) 1px, transparent 1px)
        `,
        backgroundSize: "72px 72px",
        maskImage: full
          ? undefined
          : "linear-gradient(to bottom, black 0%, black 55%, transparent 100%)",
        WebkitMaskImage: full
          ? undefined
          : "linear-gradient(to bottom, black 0%, black 55%, transparent 100%)",
      }}
    />
  );
}

export function TemplateCard({
  template,
  index,
}: {
  template: (typeof TEMPLATE_LIST)[number];
  index: number;
}) {
  const detailHref = `/templates/${template.slug}`;
  const product = getProductBySlug(template.slug)!;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.45, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      <div className="overflow-hidden rounded-[1.625rem] border border-black/[0.07] bg-white shadow-[0_24px_64px_-32px_rgba(0,0,0,0.12)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_32px_80px_-28px_rgba(0,0,0,0.16)]">
        <Link
          href={detailHref}
          className="relative m-3.5 block overflow-hidden rounded-xl bg-zinc-100 sm:m-4"
        >
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={template.image}
              alt={template.title}
              fill
              unoptimized={template.image.startsWith("/")}
              className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            <div className="absolute top-3 left-3">
              <span className="inline-flex rounded-full border border-white/20 bg-black/40 px-2.5 py-1 text-[10px] font-semibold tracking-[0.16em] text-white uppercase backdrop-blur-md">
                {template.category}
              </span>
            </div>

            <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-400 group-hover:opacity-100">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/95 px-4 py-2 text-[11px] font-semibold tracking-[0.06em] text-foreground uppercase backdrop-blur-md">
                <Eye className="h-3.5 w-3.5" />
                View Details
              </span>
            </div>
          </div>
        </Link>

        <div className="px-5 pt-0.5 pb-5 sm:px-6 sm:pb-6">
          <div className="mb-3 flex items-start justify-between gap-4">
            <Link href={detailHref}>
              <h3
                className="text-[17px] font-semibold tracking-[-0.03em] transition-opacity hover:opacity-70 sm:text-lg"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {template.title}
              </h3>
            </Link>
            <span className="shrink-0 font-mono text-[15px] font-medium tracking-tight">
              {formatPrice(template.price)}
            </span>
          </div>

          <div className="mb-5 flex flex-wrap gap-1.5">
            {template.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex rounded-full border border-black/[0.06] bg-zinc-50 px-2.5 py-1 text-[10px] font-medium tracking-[0.12em] text-zinc-500 uppercase"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex gap-2">
            <AddToCartButton product={product} variant="compact" className="flex-1" />
            <Link
              href={`/checkout/${template.slug}`}
              className="flex flex-1 items-center justify-center gap-2 rounded-full bg-black py-3 text-[12px] font-semibold tracking-[0.08em] text-white uppercase transition-all hover:bg-black/90"
            >
              <ShoppingBag className="h-3.5 w-3.5" />
              Buy
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

const FEATURES = [
  { icon: Zap, label: "Instant download" },
  { icon: LayoutTemplate, label: "Fully customizable" },
  { icon: Sparkles, label: "Premium design" },
] as const;

export function TemplatesPageContent() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortOption>("featured");

  const filtered = useMemo(() => {
    let list = [...TEMPLATE_LIST];

    if (activeCategory !== "All") {
      list = list.filter(
        (t) =>
          t.category === activeCategory ||
          t.tags.some((tag) =>
            tag.toLowerCase().includes(activeCategory.toLowerCase())
          )
      );
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q) ||
          t.tags.some((tag) => tag.toLowerCase().includes(q))
      );
    }

    switch (sort) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "name":
        list.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        break;
    }

    return list;
  }, [activeCategory, search, sort]);

  return (
    <div className="relative min-h-screen bg-[#fafafa]">
      <GridBackground full />

      {/* Hero */}
      <section className="relative overflow-hidden pt-28 pb-14 sm:pt-32 sm:pb-16">
        <div className="container-premium relative text-center">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-black/[0.06] bg-white px-4 py-1.5 text-[10px] font-semibold tracking-[0.22em] text-zinc-500 uppercase"
          >
            <LayoutTemplate className="h-3.5 w-3.5" />
            Template Store
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.06 }}
            className="text-[clamp(2.25rem,6vw,3.75rem)] font-semibold tracking-[-0.045em] text-foreground"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Premium templates, ready to launch
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
            className="mx-auto mt-5 max-w-2xl text-[16px] leading-[1.8] tracking-[-0.015em] text-zinc-500 sm:text-[17px]"
          >
            Production-ready Framer & React templates — buy once, customize freely,
            and launch in hours. No subscriptions.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18 }}
            className="mx-auto mt-10 flex max-w-xl flex-wrap items-center justify-center gap-6 sm:gap-10"
          >
            {FEATURES.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-2 text-[13px] font-medium text-zinc-600"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-black/[0.08] bg-white">
                  <Icon className="h-3.5 w-3.5 text-orange-500" />
                </span>
                {label}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Toolbar */}
      <section className="sticky top-[4.5rem] z-30 border-y border-black/[0.05] bg-[#fafafa]/95 backdrop-blur-xl lg:top-20">
        <div className="container-premium py-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative flex-1 lg:max-w-sm">
              <Search className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-zinc-400" />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search templates..."
                className="h-11 w-full rounded-full border border-black/[0.08] bg-white pr-4 pl-11 text-[14px] placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-black/10"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortOption)}
                className="h-11 rounded-full border border-black/[0.08] bg-white px-4 text-[13px] text-foreground focus:outline-none focus:ring-2 focus:ring-black/10"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name">Name A–Z</option>
              </select>

              <div className="hidden items-center gap-1.5 rounded-full border border-black/[0.06] bg-white p-1.5 sm:flex">
                {TEMPLATE_CATEGORIES.slice(0, 5).map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveCategory(cat)}
                    className={cn(
                      "rounded-full px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.06em] uppercase transition-all",
                      activeCategory === cat
                        ? "bg-black text-white"
                        : "text-zinc-500 hover:text-foreground"
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile categories */}
          <div className="mt-3 flex gap-1.5 overflow-x-auto pb-1 sm:hidden">
            {TEMPLATE_CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "shrink-0 rounded-full px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.06em] uppercase transition-all",
                  activeCategory === cat
                    ? "bg-black text-white"
                    : "border border-black/[0.08] text-zinc-500"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="relative container-premium py-14 sm:py-20">
        <div className="mb-8 flex items-end justify-between">
          <p className="text-[14px] text-zinc-500">
            <span className="font-semibold text-foreground">{filtered.length}</span>{" "}
            template{filtered.length !== 1 ? "s" : ""}
            {activeCategory !== "All" && (
              <span>
                {" "}
                in <span className="text-foreground">{activeCategory}</span>
              </span>
            )}
          </p>
          <Link
            href="/pricing"
            className="hidden items-center gap-1.5 text-[13px] font-medium text-foreground sm:inline-flex"
          >
            Need custom build?
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-[1.625rem] border border-black/[0.07] bg-white py-20 text-center">
            <p className="text-[16px] font-medium">No templates found</p>
            <p className="mt-2 text-[14px] text-zinc-500">Try a different search or category.</p>
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setActiveCategory("All");
              }}
              className="mt-6 text-[13px] font-medium underline-offset-2 hover:underline"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <motion.div layout className="grid items-start gap-6 sm:grid-cols-2 sm:gap-7 lg:grid-cols-3 lg:gap-8">
            <AnimatePresence mode="popLayout">
              {filtered.map((template, i) => (
                <TemplateCard key={template.slug} template={template} index={i} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </section>

      {/* CTA */}
      <section className="relative border-t border-black/[0.05] py-16 sm:py-20">
        <div className="container-premium">
          <div className="mx-auto max-w-2xl rounded-[1.625rem] border border-black/[0.07] bg-white px-8 py-12 text-center shadow-[0_24px_64px_-32px_rgba(0,0,0,0.1)] sm:px-12">
            <h2
              className="text-2xl font-semibold tracking-[-0.03em] sm:text-3xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Need something fully custom?
            </h2>
            <p className="mt-4 text-[15px] leading-[1.75] text-zinc-500">
              Our team builds bespoke websites from scratch — tailored to your brand,
              goals, and growth plans.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 rounded-full bg-black px-8 py-4 text-[12px] font-bold tracking-[0.12em] text-white uppercase transition-all hover:bg-black/90"
              >
                View Custom Pricing
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-black/[0.12] bg-[#fafafa] px-8 py-4 text-[12px] font-bold tracking-[0.12em] uppercase transition-colors hover:bg-white"
              >
                Talk to Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
