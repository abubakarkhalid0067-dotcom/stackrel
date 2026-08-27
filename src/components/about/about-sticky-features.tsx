"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

export type StickyFeature = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  demo: ReactNode;
};

function FeatureTextBlock({
  feature,
  index,
  isActive,
  setActive,
}: {
  feature: StickyFeature;
  index: number;
  isActive: boolean;
  setActive: (i: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });

  useEffect(() => {
    if (inView) setActive(index);
  }, [inView, index, setActive]);

  return (
    <div
      ref={ref}
      className="flex min-h-[72vh] flex-col justify-center py-12 lg:min-h-[85vh] lg:py-16"
    >
      {/* Mobile demo */}
      <div className="mb-8 lg:hidden">
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a] p-1">
          {feature.demo}
        </div>
      </div>

      <motion.div
        animate={{ opacity: isActive ? 1 : 0.35 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="mb-4 flex items-center gap-3">
          <span
            className={cn(
              "font-mono text-[11px] font-medium tracking-wider transition-colors",
              isActive ? "text-orange-400" : "text-zinc-600"
            )}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="h-px w-8 bg-white/10" />
          <span
            className={cn(
              "text-[11px] font-semibold tracking-[0.2em] uppercase transition-colors",
              isActive ? "text-zinc-400" : "text-zinc-600"
            )}
          >
            {feature.eyebrow}
          </span>
        </div>

        <h3
          className={cn(
            "text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold leading-[1.1] tracking-[-0.04em] transition-colors",
            isActive ? "text-white" : "text-zinc-500"
          )}
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {feature.title}
        </h3>

        <p
          className={cn(
            "mt-4 max-w-md text-[15px] leading-[1.8] transition-colors sm:text-[16px]",
            isActive ? "text-zinc-400" : "text-zinc-600"
          )}
        >
          {feature.description}
        </p>

        <div
          className={cn(
            "mt-6 h-0.5 origin-left rounded-full bg-orange-400 transition-all duration-500",
            isActive ? "w-12 opacity-100" : "w-0 opacity-0"
          )}
        />
      </motion.div>
    </div>
  );
}

export function AboutStickyFeatures({
  features,
  sectionLabel = "Why teams choose us",
  sectionTitle = "Built different.",
  sectionHighlight = "Built better.",
  sectionSubtitle = "Scroll to explore how we design, build, and ship — with proof at every step.",
}: {
  features: StickyFeature[];
  sectionLabel?: string;
  sectionTitle?: string;
  sectionHighlight?: string;
  sectionSubtitle?: string;
}) {
  const [active, setActive] = useState(0);

  return (
    <section className="bg-black text-white">
      {/* Section intro — scrolls away */}
      <div className="container-premium border-b border-white/[0.06] py-16 sm:py-20">
        <p className="mb-4 text-[11px] font-semibold tracking-[0.28em] text-zinc-500 uppercase">
          {sectionLabel}
        </p>
        <h2
          className="max-w-2xl text-[clamp(2rem,4.5vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.04em]"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {sectionTitle}{" "}
          <span
            className="italic font-normal text-white/75"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            {sectionHighlight}
          </span>
        </h2>
        <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-zinc-500">
          {sectionSubtitle}
        </p>
      </div>

      {/* Sticky scroll body */}
      <div className="container-premium">
        <div className="grid lg:grid-cols-[0.95fr_1.05fr] lg:gap-16 xl:gap-24">
          {/* Left — scrolling text */}
          <div className="lg:border-r lg:border-white/[0.06]">
            {features.map((feature, i) => (
              <FeatureTextBlock
                key={feature.id}
                feature={feature}
                index={i}
                isActive={active === i}
                setActive={setActive}
              />
            ))}
          </div>

          {/* Right — sticky animation panel */}
          <div className="hidden lg:block lg:self-start lg:sticky lg:top-24 lg:w-full">
            <div className="py-8">
              {/* Progress dots */}
              <div className="mb-5 flex items-center gap-2">
                {features.map((f, i) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setActive(i)}
                    className="group flex items-center gap-2"
                    aria-label={`Go to ${f.title}`}
                  >
                    <span
                      className={cn(
                        "block h-1 rounded-full transition-all duration-300",
                        i === active
                          ? "w-8 bg-orange-400"
                          : "w-1.5 bg-white/20 group-hover:bg-white/40"
                      )}
                    />
                  </button>
                ))}
              </div>

              <div className="h-fit w-full">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={features[active].id}
                    initial={{ opacity: 0, y: 20, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -16, scale: 0.98 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="h-fit w-full"
                  >
                    {features[active].demo}
                  </motion.div>
                </AnimatePresence>
              </div>

              <p className="mt-4 text-center text-[11px] font-medium tracking-[0.14em] text-zinc-600 uppercase">
                {features[active].eyebrow}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
