"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

const SNAP_POINTS = [
  { x: 18, y: 22, label: "8px grid" },
  { x: 42, y: 38, label: "Centered" },
  { x: 66, y: 22, label: "Aligned" },
  { x: 42, y: 54, label: "Baseline" },
] as const;

export function PixelPerfectDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-40px" });
  const [active, setActive] = useState(0);
  const [showSnap, setShowSnap] = useState(false);

  useEffect(() => {
    if (!isInView) return;
    const id = setInterval(() => {
      setActive((prev) => {
        const next = (prev + 1) % SNAP_POINTS.length;
        setShowSnap(true);
        setTimeout(() => setShowSnap(false), 700);
        return next;
      });
    }, 2400);
    return () => clearInterval(id);
  }, [isInView]);

  const point = SNAP_POINTS[active];

  return (
    <div
      ref={ref}
      className="relative mb-5 overflow-hidden rounded-xl border border-white/10 bg-[#0a0a0a]"
    >
      {/* Rulers */}
      <div className="absolute top-0 right-0 left-0 flex h-5 items-end border-b border-white/10 px-2">
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <div key={i} className="flex-1 border-r border-white/[0.06] pb-0.5 text-center">
            <span className="text-[7px] text-zinc-600">{i * 16}</span>
          </div>
        ))}
      </div>
      <div className="absolute top-5 bottom-0 left-0 flex w-5 flex-col border-r border-white/10 py-2">
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className="flex-1 border-b border-white/[0.06] pr-0.5 text-right">
            <span className="text-[7px] text-zinc-600">{i * 16}</span>
          </div>
        ))}
      </div>

      {/* Canvas */}
      <div className="relative ml-5 h-[148px] pt-5">
        <div
          className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:8px_8px]"
          aria-hidden
        />

        {/* Guide lines on snap */}
        <AnimatePresence>
          {showSnap && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute top-0 bottom-0 w-px bg-orange-400/60"
                style={{ left: `${point.x}%` }}
              />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute right-0 left-0 h-px bg-orange-400/60"
                style={{ top: `${point.y}%` }}
              />
            </>
          )}
        </AnimatePresence>

        {/* Draggable element */}
        <motion.div
          className="absolute z-10 w-[38%]"
          animate={{
            left: `${point.x}%`,
            top: `${point.y}%`,
            x: "-50%",
            y: "-50%",
          }}
          transition={{ type: "spring", stiffness: 320, damping: 28 }}
        >
          <div className="relative rounded-lg border-2 border-orange-400/70 bg-orange-500/15 p-2.5 shadow-[0_0_20px_rgba(249,115,22,0.15)]">
            <div className="h-1.5 w-3/4 rounded-full bg-white/40" />
            <div className="mt-1.5 h-6 rounded bg-white/15" />
            {/* Corner handles */}
            {["tl", "tr", "bl", "br"].map((corner) => (
              <span
                key={corner}
                className={cn(
                  "absolute h-1.5 w-1.5 rounded-full bg-orange-400",
                  corner === "tl" && "-top-1 -left-1",
                  corner === "tr" && "-top-1 -right-1",
                  corner === "bl" && "-bottom-1 -left-1",
                  corner === "br" && "-bottom-1 -right-1"
                )}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Status bar */}
      <div className="flex items-center justify-between border-t border-white/10 px-3 py-2">
        <div className="flex items-center gap-2 font-mono text-[10px] text-zinc-500">
          <span>X {Math.round(point.x * 1.6)}</span>
          <span>Y {Math.round(point.y * 1.2)}</span>
        </div>
        <AnimatePresence mode="wait">
          <motion.span
            key={point.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="rounded-full bg-orange-500/15 px-2 py-0.5 text-[9px] font-semibold text-orange-400"
          >
            {showSnap ? `✓ ${point.label}` : point.label}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}
