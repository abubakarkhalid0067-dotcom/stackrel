"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

const SCHEMA_LINES = [
  { text: "{", indent: 0 },
  { text: '  "@context": "https://schema.org",', indent: 0 },
  { text: '  "@type": "Organization",', indent: 0 },
  { text: '  "name": "STACKREL",', indent: 0 },
  { text: '  "url": "https://stackrel.com",', indent: 0 },
  { text: '  "description": "Premium web development agency"', indent: 0 },
  { text: "}", indent: 0 },
] as const;

export function SeoSchemaDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const hasStarted = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [visibleCount, setVisibleCount] = useState(0);
  const [done, setDone] = useState(false);

  const start = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setVisibleCount(0);
    setDone(false);
    let i = 0;
    const tick = () => {
      i += 1;
      setVisibleCount(i);
      if (i < SCHEMA_LINES.length) {
        timerRef.current = setTimeout(tick, 320);
      } else {
        setDone(true);
        timerRef.current = setTimeout(start, 4000);
      }
    };
    timerRef.current = setTimeout(tick, 400);
  }, []);

  useEffect(() => {
    if (isInView && !hasStarted.current) {
      hasStarted.current = true;
      start();
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isInView, start]);

  return (
    <div ref={ref} className="rounded-xl border border-white/10 bg-[#0a0a0a] p-4">
      <div className="mb-3 flex items-center gap-2">
        <span className="rounded bg-orange-500/15 px-2 py-0.5 text-[10px] font-bold tracking-wider text-orange-400 uppercase">
          JSON-LD
        </span>
        <span className="text-[11px] text-zinc-500">schema.org markup</span>
        {done && (
          <motion.span
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            className="ml-auto text-[10px] text-emerald-400"
          >
            ✓ Indexed
          </motion.span>
        )}
      </div>
      <div className="min-h-[140px] font-mono text-[11px] leading-relaxed sm:text-[12px]">
        <AnimatePresence mode="popLayout">
          {SCHEMA_LINES.slice(0, visibleCount).map((line, i) => (
            <motion.div
              key={`schema-${i}`}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25 }}
            >
              <span
                className={cn(
                  line.text.includes("@") && "text-violet-400",
                  line.text.includes("name") && "text-sky-300",
                  line.text.includes("url") && "text-emerald-400",
                  line.text.includes("description") && "text-zinc-300",
                  (line.text === "{" || line.text === "}") && "text-zinc-500"
                )}
              >
                {line.text}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
        {!done && visibleCount < SCHEMA_LINES.length && (
          <motion.span
            className="inline-block h-3.5 w-0.5 bg-orange-400/80"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.7, repeat: Infinity }}
          />
        )}
      </div>
    </div>
  );
}
