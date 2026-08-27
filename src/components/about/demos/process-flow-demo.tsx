"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { PROCESS_STEPS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function ProcessFlowDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-80px" });
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % PROCESS_STEPS.length);
    }, 2800);
    return () => clearInterval(id);
  }, [isInView]);

  const step = PROCESS_STEPS[active];

  return (
    <div ref={ref} className="rounded-xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
      <div className="mb-5 flex items-center justify-between">
        <span className="text-[11px] font-medium tracking-[0.16em] text-zinc-500 uppercase">
          Live pipeline
        </span>
        <div className="flex gap-1">
          {PROCESS_STEPS.map((_, i) => (
            <motion.div
              key={i}
              className={cn(
                "h-1 rounded-full",
                i === active ? "w-6 bg-white" : "w-1.5 bg-white/20"
              )}
              animate={{ width: i === active ? 24 : 6 }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>
      </div>

      <div className="mb-6 grid grid-cols-3 gap-2 sm:grid-cols-6">
        {PROCESS_STEPS.map((s, i) => (
          <motion.button
            key={s.step}
            type="button"
            onClick={() => setActive(i)}
            className={cn(
              "rounded-lg border px-2 py-2 text-center transition-colors",
              i === active
                ? "border-white/25 bg-white/10"
                : "border-white/10 bg-transparent hover:border-white/15"
            )}
            whileTap={{ scale: 0.97 }}
          >
            <span
              className={cn(
                "block text-[10px] font-bold tracking-wider uppercase",
                i === active ? "text-white" : "text-zinc-600"
              )}
            >
              {s.step}
            </span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step.step}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-[11px] font-bold tracking-[0.2em] text-zinc-500 uppercase">
            Step {step.step}
          </p>
          <h3
            className="mt-2 text-xl font-semibold text-white"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {step.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-zinc-500">{step.description}</p>
        </motion.div>
      </AnimatePresence>

      <div className="mt-5 h-1 overflow-hidden rounded-full bg-white/10">
        <motion.div
          key={`progress-${active}`}
          className="h-full rounded-full bg-gradient-to-r from-indigo-400 to-orange-400"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 2.8, ease: "linear" }}
        />
      </div>
    </div>
  );
}
