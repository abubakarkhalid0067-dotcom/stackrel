"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Globe,
  ShoppingBag,
  Sparkles,
} from "lucide-react";
import { PRICING_PLANS } from "@/lib/constants";
import { TEMPLATE_LIST } from "@/lib/products";
import { getProductBySlug } from "@/lib/products";
import { AddToCartButton } from "@/components/cart/add-to-cart-button";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";

function GridBackground() {
  return (
    <div
      className="pointer-events-none absolute inset-0 opacity-[0.45]"
      aria-hidden="true"
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(0,0,0,0.04) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(0,0,0,0.04) 1px, transparent 1px)
        `,
        backgroundSize: "72px 72px",
        maskImage: "linear-gradient(to bottom, black 0%, black 50%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 50%, transparent 100%)",
      }}
    />
  );
}

function CustomPlanCard({
  plan,
  index,
}: {
  plan: (typeof PRICING_PLANS)[number];
  index: number;
}) {
  const isHighlighted = plan.highlighted;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className={cn(
        "relative flex h-full flex-col overflow-hidden rounded-[1.625rem] p-px transition-shadow duration-500",
        isHighlighted
          ? "shadow-[0_40px_100px_-32px_rgba(0,0,0,0.5)]"
          : "shadow-[0_24px_64px_-32px_rgba(0,0,0,0.12)]"
      )}
      style={
        isHighlighted
          ? {
              background:
                "linear-gradient(145deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.06) 45%, rgba(255,255,255,0.14) 100%)",
            }
          : undefined
      }
    >
      <div
        className={cn(
          "relative flex h-full flex-col rounded-[calc(1.625rem-1px)] px-7 py-8 sm:px-8 sm:py-9",
          isHighlighted
            ? "bg-[#080808] text-white"
            : "border border-black/[0.07] bg-white"
        )}
      >
        {isHighlighted && (
          <span className="absolute -top-px left-1/2 -translate-x-1/2 rounded-b-xl bg-white px-4 py-1.5 text-[10px] font-bold tracking-[0.16em] text-black uppercase">
            Most Popular
          </span>
        )}

        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <p
              className={cn(
                "text-[10px] font-medium tracking-[0.28em] uppercase",
                isHighlighted ? "text-white/35" : "text-zinc-400"
              )}
            >
              Custom website
            </p>
            <h3
              className="mt-2 text-2xl font-semibold tracking-[-0.03em]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {plan.name}
            </h3>
          </div>
          {isHighlighted && (
            <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-emerald-400/25 bg-emerald-400/[0.08] px-3 py-1.5 text-[9px] font-semibold tracking-[0.18em] text-emerald-300 uppercase">
              <Sparkles className="h-3 w-3" />
              Premium
            </span>
          )}
        </div>

        <div className="mb-5">
          {plan.price !== null ? (
            <p
              className="text-[3rem] font-semibold leading-none tracking-[-0.05em]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {formatPrice(plan.price)}
              <span
                className={cn(
                  "ml-2 text-sm font-medium tracking-normal",
                  isHighlighted ? "text-white/40" : "text-zinc-400"
                )}
              >
                / project
              </span>
            </p>
          ) : (
            <p
              className="text-[3rem] font-semibold leading-none tracking-[-0.05em]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Custom
            </p>
          )}
          <p
            className={cn(
              "mt-4 text-[15px] leading-[1.75]",
              isHighlighted ? "text-white/55" : "text-zinc-500"
            )}
          >
            {plan.description}
          </p>
        </div>

        <ul className="mb-8 flex-1 space-y-3.5">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-start gap-3 text-[14px]">
              <span
                className={cn(
                  "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
                  isHighlighted ? "bg-white text-black" : "bg-black text-white"
                )}
              >
                <Check className="h-3 w-3" strokeWidth={3} />
              </span>
              <span className={isHighlighted ? "text-white/85" : "text-zinc-700"}>
                {feature}
              </span>
            </li>
          ))}
        </ul>

        <Link
          href={`/checkout/custom?plan=${plan.name.toLowerCase()}`}
          className={cn(
            "flex w-full items-center justify-center gap-2 rounded-full py-4 text-[11px] font-bold tracking-[0.14em] uppercase transition-all duration-300",
            isHighlighted
              ? "bg-white text-black hover:shadow-[0_12px_40px_-8px_rgba(255,255,255,0.35)]"
              : "bg-black text-white hover:bg-black/90 hover:shadow-[0_12px_40px_-12px_rgba(0,0,0,0.45)]"
          )}
        >
          {plan.cta}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </motion.div>
  );
}

function TemplateProductRow({
  template,
  index,
}: {
  template: (typeof TEMPLATE_LIST)[number];
  index: number;
}) {
  const detailHref = `/templates/${template.slug}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      <div className="flex flex-col gap-5 rounded-[1.25rem] border border-black/[0.07] bg-white p-4 transition-all duration-500 hover:border-black/[0.12] hover:shadow-[0_20px_56px_-24px_rgba(0,0,0,0.14)] sm:flex-row sm:items-center sm:p-5">
        <Link
          href={detailHref}
          className="relative h-36 w-full shrink-0 overflow-hidden rounded-xl bg-zinc-100 sm:h-28 sm:w-44"
        >
          <Image
            src={template.image}
            alt={template.title}
            fill
            unoptimized={template.image.startsWith("/")}
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            sizes="176px"
          />
          <span className="absolute top-2.5 left-2.5 rounded-full border border-white/20 bg-black/45 px-2.5 py-1 text-[9px] font-semibold tracking-[0.14em] text-white uppercase backdrop-blur-md">
            {template.category}
          </span>
        </Link>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <Link href={detailHref}>
                <h3
                  className="text-xl font-semibold tracking-[-0.03em] transition-opacity hover:opacity-70"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {template.title}
                </h3>
              </Link>
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {template.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-black/[0.06] bg-zinc-50 px-2.5 py-1 text-[10px] font-medium tracking-[0.12em] text-zinc-500 uppercase"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <p
              className="shrink-0 text-2xl font-semibold tracking-[-0.04em]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {formatPrice(template.price)}
            </p>
          </div>

          <div className="mt-5 flex flex-wrap gap-2.5">
            <Link
              href={detailHref}
              className="inline-flex items-center gap-2 rounded-full border border-black/[0.1] px-5 py-2.5 text-[11px] font-semibold tracking-[0.1em] text-foreground uppercase transition-colors hover:bg-zinc-50"
            >
              View Details
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
            <AddToCartButton
              product={getProductBySlug(template.slug)!}
              variant="outline"
            />
            <Link
              href={`/checkout/${template.slug}`}
              className="inline-flex items-center gap-2 rounded-full bg-black px-5 py-2.5 text-[11px] font-semibold tracking-[0.1em] text-white uppercase transition-all hover:bg-black/90"
            >
              <ShoppingBag className="h-3.5 w-3.5" />
              Buy Now
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function PricingPageContent() {
  return (
    <div className="bg-[#fafafa]">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-black/[0.06] bg-white pt-28 pb-14 sm:pt-32 sm:pb-16">
        <GridBackground />
        <div className="container-premium relative text-center">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-5 inline-flex items-center rounded-full border border-black/[0.06] bg-white px-4 py-1.5 text-[10px] font-semibold tracking-[0.22em] text-zinc-500 uppercase"
          >
            Pricing
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.06 }}
            className="text-[clamp(2.25rem,6vw,3.75rem)] font-semibold tracking-[-0.045em] text-foreground"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Simple, transparent pricing
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
            className="mx-auto mt-5 max-w-xl text-[16px] leading-[1.8] tracking-[-0.015em] text-zinc-500 sm:text-[17px]"
          >
            Custom websites built for your brand — or premium templates you can
            buy instantly and launch today.
          </motion.p>
        </div>
      </section>

      {/* Custom Website */}
      <section className="container-premium py-16 sm:py-20">
        <div className="mb-10 flex flex-col gap-4 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-white px-3.5 py-1.5 text-[10px] font-semibold tracking-[0.16em] text-zinc-500 uppercase">
              <Globe className="h-3.5 w-3.5" />
              Custom Development
            </div>
            <h2
              className="text-[clamp(1.75rem,4vw,2.5rem)] font-semibold tracking-[-0.04em]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Custom Website Pricing
            </h2>
            <p className="mt-3 max-w-lg text-[15px] leading-[1.75] text-zinc-500">
              Tailored websites designed and built from scratch for your business —
              strategy, design, development, and launch included.
            </p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3 lg:gap-7">
          {PRICING_PLANS.map((plan, i) => (
            <CustomPlanCard key={plan.name} plan={plan} index={i} />
          ))}
        </div>
      </section>

      {/* Templates as Products */}
      <section className="border-t border-black/[0.06] bg-white py-16 sm:py-20">
        <div className="container-premium">
          <div className="mb-10 flex flex-col gap-4 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-[#fafafa] px-3.5 py-1.5 text-[10px] font-semibold tracking-[0.16em] text-zinc-500 uppercase">
                <ShoppingBag className="h-3.5 w-3.5" />
                Ready to Launch
              </div>
              <h2
                className="text-[clamp(1.75rem,4vw,2.5rem)] font-semibold tracking-[-0.04em]"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Premium Templates
              </h2>
              <p className="mt-3 max-w-lg text-[15px] leading-[1.75] text-zinc-500">
                Professional Framer & React templates — one-time purchase, instant
                download, fully customizable. No monthly fees.
              </p>
            </div>
            <Link
              href="/templates"
              className="inline-flex shrink-0 items-center gap-2 text-[13px] font-medium tracking-[0.04em] text-foreground uppercase transition-opacity hover:opacity-60"
            >
              Browse All
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="space-y-4">
            {TEMPLATE_LIST.map((template, i) => (
              <TemplateProductRow key={template.slug} template={template} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-black/[0.06] bg-[#fafafa] py-16 sm:py-20">
        <div className="container-premium">
          <div className="mx-auto max-w-2xl rounded-[1.625rem] border border-black/[0.07] bg-white px-8 py-12 text-center shadow-[0_32px_80px_-32px_rgba(0,0,0,0.12)] sm:px-12">
            <h2
              className="text-2xl font-semibold tracking-[-0.03em] sm:text-3xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Not sure which option fits?
            </h2>
            <p className="mt-4 text-[15px] leading-[1.75] text-zinc-500">
              Tell us about your project — we&apos;ll recommend the right path,
              whether that&apos;s a custom build or a premium template.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-black px-8 py-4 text-[12px] font-bold tracking-[0.12em] text-white uppercase transition-all hover:bg-black/90"
            >
              Get in Touch
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
