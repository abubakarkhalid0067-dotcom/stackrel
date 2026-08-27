"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Check, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

const CODE_LINES = [
  { text: 'import { createAgent } from "@stackrel/ai";', indent: 0 },
  { text: "", indent: 0 },
  { text: "const agent = createAgent({", indent: 0 },
  { text: '  model: "gpt-4o",', indent: 0 },
  { text: '  tools: ["search", "email", "calendar"],', indent: 0 },
  { text: '  memory: "vector-store",', indent: 0 },
  { text: "});", indent: 0 },
  { text: "", indent: 0 },
  { text: 'await agent.run("Analyze Q4 sales trends");', indent: 0 },
] as const;

type DemoStatus = "idle" | "typing" | "ready" | "kept" | "undone";

export function AIDevCodeDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const hasStartedRef = useRef(false);

  const [visibleCount, setVisibleCount] = useState(0);
  const [status, setStatus] = useState<DemoStatus>("idle");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const startTyping = useCallback(() => {
    clearTimer();
    setStatus("typing");
    setVisibleCount(0);

    let index = 0;
    const tick = () => {
      index += 1;
      setVisibleCount(index);

      if (index < CODE_LINES.length) {
        timerRef.current = setTimeout(tick, index === 1 ? 400 : 280);
      } else {
        setStatus("ready");
      }
    };

    timerRef.current = setTimeout(tick, 500);
  }, []);

  useEffect(() => {
    if (isInView && !hasStartedRef.current) {
      hasStartedRef.current = true;
      startTyping();
    }
    return clearTimer;
  }, [isInView, startTyping]);

  const handleKeepAll = () => {
    clearTimer();
    setStatus("kept");
    timerRef.current = setTimeout(startTyping, 2200);
  };

  const handleUndoAll = () => {
    clearTimer();
    setStatus("undone");

    let index = visibleCount;
    const tick = () => {
      index -= 1;
      setVisibleCount(Math.max(0, index));

      if (index > 0) {
        timerRef.current = setTimeout(tick, 120);
      } else {
        timerRef.current = setTimeout(startTyping, 900);
      }
    };

    timerRef.current = setTimeout(tick, 200);
  };

  const showActions = status === "ready" || status === "kept";

  return (
    <div ref={containerRef} className="mb-8">
      <div className="overflow-hidden rounded-xl border border-white/10 bg-[#0a0a0a]">
        <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
          </div>
          <span className="ml-2 text-[11px] text-zinc-500">agent.ts — AI suggested</span>
        </div>

        <div className="relative min-h-[220px] p-4 font-mono text-[12px] leading-relaxed sm:text-[13px]">
          <AnimatePresence mode="popLayout">
            {CODE_LINES.slice(0, visibleCount).map((line, i) => (
              <motion.div
                key={`line-${i}-${line.text}`}
                initial={{ opacity: 0, y: i % 2 === 0 ? 10 : -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: i % 2 === 0 ? -8 : 8 }}
                transition={{
                  duration: 0.35,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="whitespace-pre"
              >
                <span className="mr-4 inline-block w-4 select-none text-right text-zinc-600">
                  {i + 1}
                </span>
                <span
                  className={cn(
                    line.text.startsWith("import") && "text-violet-400",
                    line.text.startsWith("const") && "text-sky-400",
                    line.text.startsWith("await") && "text-emerald-400",
                    line.text.includes("model") && "text-zinc-300",
                    line.text.includes("tools") && "text-zinc-300",
                    line.text.includes("memory") && "text-zinc-300",
                    line.text === "});" && "text-zinc-400",
                    !line.text && "text-transparent"
                  )}
                >
                  {line.text || " "}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>

          {status === "typing" && visibleCount < CODE_LINES.length && (
            <motion.span
              className="ml-8 inline-block h-4 w-0.5 bg-white/70"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            />
          )}

          {status === "kept" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 flex items-center justify-center bg-emerald-500/10 backdrop-blur-[1px]"
            >
              <div className="flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-400">
                <Check className="h-4 w-4" />
                Changes applied
              </div>
            </motion.div>
          )}
        </div>

        <AnimatePresence>
          {showActions && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.25 }}
              className="flex items-center justify-end gap-2 border-t border-white/10 px-4 py-3"
            >
              <button
                type="button"
                onClick={handleUndoAll}
                className="flex items-center gap-1.5 rounded-lg border border-white/10 px-3.5 py-2 text-xs font-medium text-zinc-400 transition-colors hover:border-white/20 hover:text-white"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Undo All
              </button>
              <button
                type="button"
                onClick={handleKeepAll}
                className="flex items-center gap-1.5 rounded-lg bg-white px-3.5 py-2 text-xs font-medium text-black transition-opacity hover:opacity-90"
              >
                <Check className="h-3.5 w-3.5" />
                Keep All
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
