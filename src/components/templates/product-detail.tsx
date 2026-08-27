"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Check,
  ChevronRight,
  Package,
  Play,
  Shield,
  ShoppingBag,
  Sparkles,
  Zap,
} from "lucide-react";
import type { Product } from "@/lib/products";
import { getRelatedProducts } from "@/lib/products";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { AddToCartButton } from "@/components/cart/add-to-cart-button";

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
        maskImage: "linear-gradient(to bottom, black 0%, black 55%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 55%, transparent 100%)",
      }}
    />
  );
}

function enforceVideoMute(video: HTMLVideoElement) {
  video.muted = true;
  video.volume = 0;
}

function MediaGallery({ product }: { product: Product }) {
  const heroImage = product.detailImage ?? product.image;
  const allMedia = [
    { type: "image" as const, src: heroImage },
    ...product.gallery
      .filter((src) => src !== heroImage)
      .map((src) => ({ type: "image" as const, src })),
  ];
  const [active, setActive] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoRef = useCallback((node: HTMLVideoElement | null) => {
    videoRef.current = node;
    if (node) enforceVideoMute(node);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!showVideo || !video) return;

    enforceVideoMute(video);
    void video.play();
  }, [showVideo]);

  return (
    <div className="space-y-4">
      <div className="relative overflow-hidden rounded-[1.25rem] border border-black/[0.07] bg-zinc-50 shadow-[0_32px_80px_-40px_rgba(0,0,0,0.18)]">
        <AnimatePresence mode="wait">
          {showVideo && product.video ? (
            <motion.div
              key="video"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative aspect-[16/10] bg-black"
            >
              <video
                ref={handleVideoRef}
                src={product.video}
                controls
                autoPlay
                muted
                playsInline
                disablePictureInPicture
                controlsList="nodownload noremoteplayback"
                onVolumeChange={(e) => enforceVideoMute(e.currentTarget)}
                onPlay={(e) => enforceVideoMute(e.currentTarget)}
                onLoadedMetadata={(e) => enforceVideoMute(e.currentTarget)}
                className="h-full w-full object-contain"
              />
            </motion.div>
          ) : (
            <motion.div
              key={allMedia[active]?.src ?? heroImage}
              initial={{ opacity: 0, scale: 1.015 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="relative aspect-[16/10]"
            >
              <Image
                src={allMedia[active]?.src ?? heroImage}
                alt={product.title}
                fill
                unoptimized={(allMedia[active]?.src ?? heroImage).startsWith("/")}
                className={cn(
                  "object-cover",
                  (allMedia[active]?.src ?? heroImage).startsWith("/services/") &&
                    "object-contain bg-white p-8"
                )}
                sizes="(max-width: 1024px) 100vw, 60vw"
                priority
              />
            </motion.div>
          )}
        </AnimatePresence>

        {product.video && (
          <button
            type="button"
            onClick={() => setShowVideo((v) => !v)}
            className="absolute bottom-5 left-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/55 px-4 py-2.5 text-[11px] font-semibold tracking-[0.1em] text-white uppercase backdrop-blur-xl transition-all hover:bg-black/75"
          >
            <Play className="h-3.5 w-3.5 fill-white" />
            {showVideo ? "View Images" : "Watch Demo"}
          </button>
        )}
      </div>

      <div className="flex gap-2.5 overflow-x-auto pb-1">
        {allMedia.map((item, i) => (
          <button
            key={item.src}
            type="button"
            onClick={() => {
              setShowVideo(false);
              setActive(i);
            }}
            className={cn(
              "relative h-[4.5rem] w-[5.5rem] shrink-0 overflow-hidden rounded-xl border-2 transition-all duration-300 sm:h-20 sm:w-28",
              active === i && !showVideo
                ? "border-foreground shadow-[0_4px_16px_-4px_rgba(0,0,0,0.2)]"
                : "border-transparent opacity-60 hover:opacity-100"
            )}
          >
            <Image
              src={item.src}
              alt=""
              fill
              unoptimized={item.src.startsWith("/")}
              className="object-cover"
              sizes="112px"
            />
          </button>
        ))}
        {product.video && (
          <button
            type="button"
            onClick={() => setShowVideo(true)}
            className={cn(
              "flex h-[4.5rem] w-[5.5rem] shrink-0 items-center justify-center rounded-xl border-2 bg-zinc-900 transition-all duration-300 sm:h-20 sm:w-28",
              showVideo
                ? "border-foreground shadow-[0_4px_16px_-4px_rgba(0,0,0,0.2)]"
                : "border-transparent opacity-60 hover:opacity-100"
            )}
          >
            <Play className="h-5 w-5 fill-white text-white" />
          </button>
        )}
      </div>
    </div>
  );
}

function PurchaseCard({ product }: { product: Product }) {
  return (
    <div
      id="purchase"
      className="relative overflow-hidden rounded-[1.625rem] border border-black/[0.07] bg-white p-7 shadow-[0_32px_80px_-32px_rgba(0,0,0,0.14)] sm:p-8"
    >
      {/* Header */}
      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <p className="text-[10px] font-medium tracking-[0.3em] text-zinc-400 uppercase">
            One-time purchase
          </p>
          <p
            className="mt-3 text-[3.25rem] font-semibold leading-[0.95] tracking-[-0.055em] text-foreground"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {formatPrice(product.price)}
          </p>
        </div>
        <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-emerald-200/80 bg-emerald-50 px-3.5 py-1.5 text-[9px] font-semibold tracking-[0.2em] text-emerald-700 uppercase">
          <Sparkles className="h-3 w-3 text-emerald-600" />
          Premium
        </span>
      </div>

      {/* Specs */}
      <div className="mb-8 overflow-hidden rounded-2xl border border-black/[0.06] bg-zinc-50/60">
        <div className="grid grid-cols-2 divide-x divide-y divide-black/[0.05]">
          {product.specs.map((spec) => (
            <div key={spec.label} className="bg-white px-4 py-4 sm:px-5 sm:py-[1.125rem]">
              <p className="text-[9px] font-medium tracking-[0.24em] text-zinc-400 uppercase">
                {spec.label}
              </p>
              <p
                className="mt-2 text-[13px] font-medium tracking-[-0.02em] text-foreground"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {spec.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="mb-3 grid grid-cols-2 gap-3">
        <AddToCartButton product={product} variant="compact" />
        <Link
          href={`/checkout/${product.slug}`}
          className="group relative flex flex-1 items-center justify-center gap-2 overflow-hidden rounded-full bg-black py-[1.125rem] text-[11px] font-bold tracking-[0.14em] text-white uppercase transition-all duration-500 hover:bg-black/90 hover:shadow-[0_12px_40px_-12px_rgba(0,0,0,0.45)]"
        >
          <span
            className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-[100%]"
            aria-hidden="true"
          />
          <ShoppingBag className="relative h-4 w-4" strokeWidth={2} />
          <span className="relative">Buy Now</span>
        </Link>
      </div>

      <Link
        href="/contact"
        className="flex w-full items-center justify-center gap-2 rounded-full border border-black/[0.1] bg-white py-[1.125rem] text-[11px] font-semibold tracking-[0.14em] text-foreground uppercase transition-all duration-300 hover:border-black/20 hover:bg-zinc-50"
      >
        Request Customization
      </Link>

      {/* Trust */}
      <div className="mt-8 space-y-3.5 border-t border-black/[0.06] pt-7">
        {[
          { icon: Zap, text: "Instant download after purchase" },
          { icon: Shield, text: "30-day money-back guarantee" },
        ].map(({ icon: Icon, text }) => (
          <p
            key={text}
            className="flex items-center gap-3 text-[12px] tracking-[-0.01em] text-zinc-500"
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-black/[0.06] bg-zinc-50">
              <Icon className="h-3.5 w-3.5 text-zinc-400" strokeWidth={1.5} />
            </span>
            {text}
          </p>
        ))}
      </div>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="text-[1.65rem] font-semibold tracking-[-0.035em] text-foreground sm:text-[1.85rem]"
      style={{ fontFamily: "var(--font-heading)" }}
    >
      {children}
    </h2>
  );
}

export function ProductDetail({ product }: { product: Product }) {
  const related = getRelatedProducts(product.slug);

  return (
    <div className="relative bg-[#fafafa]">
      {/* Hero — pt clears fixed black navbar */}
      <section className="relative overflow-hidden border-b border-black/[0.06] bg-white pt-24 sm:pt-28">
        <GridBackground />

        <div className="container-premium relative pb-10 sm:pb-14">
          <Link
            href="/templates"
            className="inline-flex items-center gap-2 text-[13px] font-medium tracking-[0.01em] text-zinc-500 transition-colors hover:text-black"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Templates
          </Link>

          <div className="mx-auto mt-8 max-w-3xl text-center sm:mt-10">
            <div className="mb-6 flex flex-wrap items-center justify-center gap-2">
              <span className="rounded-full bg-black px-3.5 py-1.5 text-[10px] font-bold tracking-[0.18em] text-white uppercase">
                {product.category}
              </span>
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-black/[0.1] bg-white px-3.5 py-1.5 text-[10px] font-semibold tracking-[0.14em] text-zinc-500 uppercase"
                >
                  {tag}
                </span>
              ))}
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="text-[clamp(2.25rem,6vw,3.75rem)] font-semibold tracking-[-0.045em] text-foreground"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {product.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto mt-5 max-w-xl text-[16px] leading-[1.8] tracking-[-0.015em] text-zinc-500 sm:text-[17px]"
            >
              {product.shortDescription}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Gallery + Purchase */}
      <section className="container-premium py-10 sm:py-14">
        <div className="grid gap-10 lg:grid-cols-[1fr_360px] lg:gap-12 xl:grid-cols-[1fr_380px] xl:gap-16">
          <MediaGallery product={product} />

          <div className="lg:sticky lg:top-32 lg:self-start">
            <PurchaseCard product={product} />
          </div>
        </div>
      </section>

      {/* Details */}
      <section className="border-t border-black/[0.06] bg-white">
        <div className="container-premium py-14 sm:py-20">
          <div className="mx-auto max-w-4xl space-y-16 sm:space-y-20">
            <div>
              <SectionTitle>Overview</SectionTitle>
              <p className="mt-5 text-[16px] leading-[1.9] tracking-[-0.01em] text-zinc-600 sm:text-[17px]">
                {product.description}
              </p>
              {product.closingLine && (
                <p className="mt-5 border-l-2 border-black/10 pl-5 text-[15px] leading-[1.85] tracking-[-0.01em] text-zinc-500 italic">
                  {product.closingLine}
                </p>
              )}
            </div>

            {product.audience && (
              <div>
                <SectionTitle>Who Is It For?</SectionTitle>
                <p className="mt-5 text-[16px] leading-[1.9] tracking-[-0.01em] text-zinc-600 sm:text-[17px]">
                  {product.audience}
                </p>
              </div>
            )}

            {product.highlights && product.highlights.length > 0 ? (
              <div>
                <SectionTitle>{product.highlightsTitle ?? "Key Features"}</SectionTitle>
                <div className="mt-7 grid gap-4 sm:grid-cols-2">
                  {product.highlights.map((item, i) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 14 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ delay: i * 0.05, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      className="rounded-2xl border border-black/[0.06] bg-[#fafafa] p-5 transition-colors hover:border-black/[0.1] hover:bg-white sm:p-6"
                    >
                      <h3
                        className="text-[15px] font-semibold tracking-[-0.02em] text-foreground"
                        style={{ fontFamily: "var(--font-heading)" }}
                      >
                        {item.title}
                      </h3>
                      <p className="mt-2.5 text-[14px] leading-relaxed text-zinc-600">
                        {item.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            ) : (
              <div>
                <SectionTitle>Key Features</SectionTitle>
                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                  {product.features.map((feature, i) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, y: 14 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ delay: i * 0.04, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      className="group flex items-start gap-3.5 rounded-2xl border border-black/[0.06] bg-[#fafafa] px-5 py-4 transition-colors hover:border-black/[0.1] hover:bg-white"
                    >
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-foreground transition-transform group-hover:scale-110">
                        <Check className="h-3 w-3 text-background" strokeWidth={3} />
                      </span>
                      <span className="text-[14px] leading-relaxed text-zinc-700">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {product.features.length > 0 && product.highlights && product.highlights.length > 0 && (
              <div>
                <SectionTitle>Details</SectionTitle>
                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                  {(product.detailPoints ?? product.features).map((point, i) => (
                    <motion.div
                      key={point}
                      initial={{ opacity: 0, y: 14 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ delay: i * 0.04, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      className="group flex items-start gap-3.5 rounded-2xl border border-black/[0.06] bg-[#fafafa] px-5 py-4 transition-colors hover:border-black/[0.1] hover:bg-white"
                    >
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-foreground transition-transform group-hover:scale-110">
                        <Check className="h-3 w-3 text-background" strokeWidth={3} />
                      </span>
                      <span className="text-[14px] leading-relaxed text-zinc-700">{point}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {product.builtFor && product.builtFor.length > 0 && (
              <div>
                <SectionTitle>Built For</SectionTitle>
                <div className="mt-6 flex flex-wrap gap-2.5">
                  {product.builtFor.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-black/[0.08] bg-[#fafafa] px-4 py-2 text-[13px] font-medium tracking-[-0.01em] text-zinc-700"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div>
              <SectionTitle>What&apos;s Included</SectionTitle>
              <div className="mt-7 overflow-hidden rounded-[1.25rem] border border-black/[0.07] bg-[#fafafa]">
                <ul className="divide-y divide-black/[0.05]">
                  {product.includes.map((item, i) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, x: -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05, duration: 0.4 }}
                      className="flex items-center gap-4 px-6 py-4 text-[14px] text-zinc-700 sm:px-8 sm:py-5"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-black/[0.06] bg-white">
                        <Package className="h-3.5 w-3.5 text-zinc-400" />
                      </span>
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="border-t border-black/[0.06] bg-[#fafafa]">
          <div className="container-premium py-14 sm:py-20">
            <div className="mb-10 flex items-end justify-between sm:mb-12">
              <SectionTitle>Related Templates</SectionTitle>
              <Link
                href="/templates"
                className="hidden items-center gap-1.5 text-[12px] font-semibold tracking-[0.08em] text-foreground uppercase transition-opacity hover:opacity-60 sm:inline-flex"
              >
                View All
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item, i) => (
                <motion.div
                  key={item.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={`/templates/${item.slug}`}
                    className="group block overflow-hidden rounded-[1.25rem] border border-black/[0.07] bg-white shadow-[0_8px_32px_-16px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_48px_-24px_rgba(0,0,0,0.16)]"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-zinc-100">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        unoptimized={item.image.startsWith("/")}
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                        sizes="33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    </div>
                    <div className="flex items-center justify-between p-5 sm:p-6">
                      <div>
                        <p className="text-[10px] font-bold tracking-[0.18em] text-zinc-400 uppercase">
                          {item.category}
                        </p>
                        <p
                          className="mt-1 text-[16px] font-semibold tracking-[-0.025em]"
                          style={{ fontFamily: "var(--font-heading)" }}
                        >
                          {item.title}
                        </p>
                      </div>
                      <span
                        className="font-mono text-[15px] font-semibold tracking-tight"
                        style={{ fontFamily: "var(--font-heading)" }}
                      >
                        {formatPrice(item.price)}
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
