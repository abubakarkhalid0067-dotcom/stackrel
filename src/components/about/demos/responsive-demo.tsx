"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Monitor, Smartphone, Tablet } from "lucide-react";
import { cn } from "@/lib/utils";

const BREAKPOINTS = [
  {
    id: "mobile",
    icon: Smartphone,
    label: "Mobile",
    size: "375px",
    image: "/about/responsive-mobile.png",
    imageW: 140,
    imageH: 280,
  },
  {
    id: "tablet",
    icon: Tablet,
    label: "Tablet",
    size: "768px",
    image: "/about/responsive-tablet.png",
    imageW: 260,
    imageH: 200,
  },
  {
    id: "desktop",
    icon: Monitor,
    label: "Desktop",
    size: "1440px",
    image: "/about/responsive-desktop.png",
    imageW: 320,
    imageH: 200,
  },
] as const;

export function ResponsiveDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-60px" });
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!isInView || paused) return;
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % BREAKPOINTS.length);
    }, 2800);
    return () => clearInterval(id);
  }, [isInView, paused]);

  const current = BREAKPOINTS[active];

  return (
    <div
      ref={ref}
      className="rounded-xl border border-white/10 bg-white/[0.03] p-5"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mb-4 flex items-center justify-between">
        <p className="text-[11px] font-medium tracking-[0.16em] text-zinc-500 uppercase">
          Responsive preview
        </p>
        <motion.span
          key={current.size}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-full border border-white/15 bg-white/5 px-2.5 py-0.5 font-mono text-[10px] text-white/80"
        >
          {current.size}
        </motion.span>
      </div>

      <div className="relative flex h-[280px] items-center justify-center">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          aria-hidden
          style={{
            backgroundImage:
              "radial-gradient(circle at 50% 50%, rgba(249,115,22,0.12), transparent 65%)",
          }}
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -8 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
            style={{ width: current.imageW, height: current.imageH }}
          >
            <Image
              src={current.image}
              alt={`${current.label} responsive layout preview`}
              fill
              sizes="(max-width: 768px) 140px, 320px"
              className="object-contain drop-shadow-[0_24px_48px_rgba(0,0,0,0.35)]"
              priority={active === 0}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-4 flex justify-center gap-1.5 rounded-full border border-white/10 bg-black/40 p-1">
        {BREAKPOINTS.map((bp, i) => (
          <button
            key={bp.id}
            type="button"
            onClick={() => setActive(i)}
            className={cn(
              "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-medium transition-all",
              i === active
                ? "bg-white text-black"
                : "text-zinc-500 hover:text-zinc-300"
            )}
          >
            <bp.icon className="h-3 w-3" strokeWidth={2} />
            {bp.label}
          </button>
        ))}
      </div>

      <p className="mt-3 text-center text-xs text-zinc-500">
        Layout adapts at{" "}
        <AnimatePresence mode="wait">
          <motion.span
            key={current.size}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="inline-block font-medium text-white"
          >
            {current.size}
          </motion.span>
        </AnimatePresence>{" "}
        and every size in between
      </p>
    </div>
  );
}
