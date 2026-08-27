"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Eye, ShoppingBag } from "lucide-react";
import { TEMPLATE_CATEGORIES } from "@/lib/constants";
import { TEMPLATE_LIST } from "@/lib/products";
import { getProductBySlug } from "@/lib/products";
import { AddToCartButton } from "@/components/cart/add-to-cart-button";
import { formatPrice } from "@/lib/utils";
import { Reveal } from "@/components/shared/section-header";
import { cn } from "@/lib/utils";

function TemplateCard({
  template,
  index,
}: {
  template: (typeof TEMPLATE_LIST)[number];
  index: number;
}) {
  const detailHref = `/templates/${template.slug}`;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.4, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="group"
    >
      <div
        className={cn(
          "overflow-hidden rounded-[1.25rem] border border-black/[0.06]",
          "bg-white/90 backdrop-blur-sm",
          "shadow-[0_1px_1px_rgba(0,0,0,0.03),0_12px_40px_-16px_rgba(0,0,0,0.1)]",
          "transition-all duration-500",
          "hover:border-black/[0.09] hover:shadow-[0_24px_56px_-24px_rgba(0,0,0,0.16)]"
        )}
      >
        <Link href={detailHref} className="relative m-3 block overflow-hidden rounded-xl bg-zinc-100 sm:m-3.5">
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={template.image}
              alt={template.title}
              fill
              unoptimized={template.image.startsWith("/")}
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            <div className="absolute top-3 left-3">
              <span className="inline-flex rounded-full border border-white/20 bg-black/40 px-2.5 py-1 text-[10px] font-semibold tracking-[0.16em] text-white uppercase backdrop-blur-md">
                {template.category}
              </span>
            </div>

            <div className="absolute inset-0 flex items-center justify-center gap-2.5 opacity-0 transition-all duration-400 group-hover:opacity-100">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/95 px-4 py-2 text-[11px] font-semibold tracking-[0.06em] text-foreground uppercase backdrop-blur-md transition-transform hover:scale-105">
                <Eye className="h-3.5 w-3.5" />
                View Details
              </span>
            </div>
          </div>
        </Link>

        <div className="px-5 pt-1 pb-5 sm:px-6 sm:pb-6">
          <div className="mb-3 flex items-start justify-between gap-4">
            <Link href={detailHref}>
              <h3
                className="text-[17px] font-semibold tracking-[-0.03em] text-foreground transition-opacity hover:opacity-70 sm:text-lg"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {template.title}
              </h3>
            </Link>
            <span className="shrink-0 font-mono text-[15px] font-medium tracking-tight text-foreground">
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
            <AddToCartButton
              product={getProductBySlug(template.slug)!}
              variant="compact"
              className="flex-1"
            />
            <Link
              href={`/checkout/${template.slug}`}
              className="flex flex-1 items-center justify-center gap-2 rounded-full bg-foreground py-3 text-[12px] font-semibold tracking-[0.08em] text-background uppercase transition-all duration-300 hover:opacity-90"
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

export function Templates() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? TEMPLATE_LIST
      : TEMPLATE_LIST.filter(
          (t) =>
            t.category === activeCategory ||
            t.tags.some((tag) =>
              tag.toLowerCase().includes(activeCategory.toLowerCase())
            )
        );

  return (
    <section id="templates" className="relative section-padding overflow-hidden bg-secondary">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(0,0,0,0.015))]" />

      <div className="container-premium relative">
        <Reveal className="mx-auto mb-14 max-w-3xl text-center sm:mb-16">
          <span className="mb-5 inline-flex items-center rounded-full border border-black/[0.06] bg-white px-4 py-1.5 text-[10px] font-semibold tracking-[0.22em] text-zinc-500 uppercase">
            Templates
          </span>
          <h2
            className="text-[clamp(2rem,4.5vw,3.25rem)] font-semibold tracking-[-0.04em] text-foreground"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Professional templates, ready to launch
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[15px] leading-[1.8] font-normal tracking-[-0.015em] text-zinc-500 sm:text-[16px]">
            Premium, production-ready templates built with modern frameworks.
            Customize and deploy in hours.
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mb-12 flex justify-center sm:mb-14">
            <div className="inline-flex max-w-full flex-wrap items-center justify-center gap-1.5 rounded-full border border-black/[0.06] bg-white/80 p-1.5 shadow-[0_8px_32px_-16px_rgba(0,0,0,0.08)] backdrop-blur-sm sm:gap-2 sm:p-2">
              {TEMPLATE_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "rounded-full px-3.5 py-2 text-[11px] font-semibold tracking-[0.06em] uppercase transition-all duration-300 sm:px-4 sm:text-[12px]",
                    activeCategory === cat
                      ? "bg-foreground text-background shadow-[0_4px_16px_-4px_rgba(0,0,0,0.25)]"
                      : "text-zinc-500 hover:bg-zinc-100 hover:text-foreground"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        <motion.div layout className="grid gap-6 sm:grid-cols-2 sm:gap-7 lg:grid-cols-3 lg:gap-8">
          <AnimatePresence mode="popLayout">
            {filtered.map((template, i) => (
              <TemplateCard key={template.slug} template={template} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        <Reveal className="mt-14 text-center sm:mt-16">
          <Link
            href="/templates"
            className="group/link inline-flex items-center gap-2.5 border-b border-black/0 pb-1 text-[13px] font-medium tracking-[0.04em] text-foreground uppercase transition-all duration-300 hover:border-black/20 hover:opacity-70"
          >
            View All Templates
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
