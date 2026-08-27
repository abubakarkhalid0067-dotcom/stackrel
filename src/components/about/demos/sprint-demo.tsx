"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Check, Circle, Rocket } from "lucide-react";
import { cn } from "@/lib/utils";

const PHASES = [
  {
    week: "W1",
    title: "Discovery",
    tasks: ["Research", "Wireframes", "Scope"],
    done: 3,
  },
  {
    week: "W2",
    title: "Design",
    tasks: ["UI System", "Prototypes", "Review"],
    done: 3,
  },
  {
    week: "W3",
    title: "Build",
    tasks: ["Frontend", "CMS", "QA"],
    done: 2,
  },
  {
    week: "W4",
    title: "Launch",
    tasks: ["Deploy", "Optimize", "Handoff"],
    done: 1,
  },
] as const;

export function SprintDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-60px" });
  const [activeWeek, setActiveWeek] = useState(0);
  const [taskPulse, setTaskPulse] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const weekId = setInterval(() => {
      setActiveWeek((prev) => (prev + 1) % PHASES.length);
      setTaskPulse((p) => p + 1);
    }, 3000);
    return () => clearInterval(weekId);
  }, [isInView]);

  const phase = PHASES[activeWeek];
  const totalTasks = PHASES.reduce((acc, p) => acc + p.tasks.length, 0);
  const completedTasks =
    PHASES.slice(0, activeWeek).reduce((acc, p) => acc + p.tasks.length, 0) +
    phase.done;

  return (
    <div ref={ref} className="overflow-hidden rounded-xl border border-white/10 bg-[#0a0a0a]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <div>
          <p className="text-[10px] font-medium tracking-[0.14em] text-zinc-500 uppercase">
            Agile pipeline
          </p>
          <p className="mt-0.5 text-sm font-semibold text-white">
            Sprint {activeWeek + 1} · {phase.title}
          </p>
        </div>
        <div className="text-right">
          <p className="font-mono text-lg font-bold text-orange-400">
            {Math.round((completedTasks / totalTasks) * 100)}%
          </p>
          <p className="text-[9px] text-zinc-500">shipped</p>
        </div>
      </div>

      {/* Week tabs */}
      <div className="flex border-b border-white/10">
        {PHASES.map((p, i) => (
          <button
            key={p.week}
            type="button"
            onClick={() => {
              setActiveWeek(i);
              setTaskPulse((n) => n + 1);
            }}
            className={cn(
              "relative flex-1 py-2.5 text-center transition-colors",
              i === activeWeek ? "bg-white/[0.06]" : "hover:bg-white/[0.03]"
            )}
          >
            <span
              className={cn(
                "text-[10px] font-bold tracking-wider uppercase",
                i === activeWeek ? "text-white" : "text-zinc-600",
                i < activeWeek && "text-emerald-500/80"
              )}
            >
              {p.week}
            </span>
            {i < activeWeek && (
              <Check className="mx-auto mt-0.5 h-3 w-3 text-emerald-500" strokeWidth={2.5} />
            )}
            {i === activeWeek && (
              <motion.div
                layoutId="sprint-active"
                className="absolute inset-x-2 bottom-0 h-0.5 rounded-full bg-orange-400"
              />
            )}
          </button>
        ))}
      </div>

      {/* Task board */}
      <div className="p-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeWeek}-${taskPulse}`}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-2"
          >
            {phase.tasks.map((task, i) => {
              const isDone = i < phase.done;
              const isActive = i === phase.done && phase.done < phase.tasks.length;

              return (
                <motion.div
                  key={task}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className={cn(
                    "flex items-center gap-3 rounded-lg border px-3 py-2.5 transition-colors",
                    isDone
                      ? "border-emerald-500/25 bg-emerald-500/[0.08]"
                      : isActive
                        ? "border-orange-400/30 bg-orange-500/[0.08]"
                        : "border-white/[0.08] bg-white/[0.02]"
                  )}
                >
                  <div
                    className={cn(
                      "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border",
                      isDone
                        ? "border-emerald-500 bg-emerald-500"
                        : isActive
                          ? "border-orange-400 bg-orange-400/20"
                          : "border-white/20"
                    )}
                  >
                    {isDone ? (
                      <Check className="h-3 w-3 text-black" strokeWidth={3} />
                    ) : isActive ? (
                      <motion.div
                        className="h-1.5 w-1.5 rounded-full bg-orange-400"
                        animate={{ scale: [1, 1.4, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      />
                    ) : (
                      <Circle className="h-2.5 w-2.5 text-zinc-600" strokeWidth={1.5} />
                    )}
                  </div>
                  <span
                    className={cn(
                      "text-[13px] font-medium",
                      isDone ? "text-emerald-300/90 line-through decoration-emerald-500/40" : "text-zinc-300",
                      isActive && "text-white"
                    )}
                  >
                    {task}
                  </span>
                  {isActive && (
                    <span className="ml-auto text-[9px] font-semibold tracking-wider text-orange-400 uppercase">
                      In progress
                    </span>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Launch CTA on W4 */}
        {activeWeek === 3 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 flex items-center justify-center gap-2 rounded-lg border border-dashed border-orange-400/30 bg-orange-500/[0.06] py-2.5"
          >
            <Rocket className="h-3.5 w-3.5 text-orange-400" />
            <span className="text-[11px] font-semibold text-orange-300">Deploying to production…</span>
          </motion.div>
        )}
      </div>

      {/* Footer velocity */}
      <div className="flex items-center gap-3 border-t border-white/10 px-4 py-2.5">
        <div className="flex-1">
          <div className="h-1 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-orange-500 via-amber-400 to-emerald-400"
              animate={{ width: `${(completedTasks / totalTasks) * 100}%` }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
            />
          </div>
        </div>
        <span className="shrink-0 font-mono text-[10px] text-zinc-500">
          {completedTasks}/{totalTasks} tasks
        </span>
      </div>
    </div>
  );
}
