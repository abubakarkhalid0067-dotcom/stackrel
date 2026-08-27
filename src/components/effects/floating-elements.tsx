"use client";

import { motion } from "framer-motion";
import { BarChart3, Globe, Zap } from "lucide-react";

const elements = [
  { icon: BarChart3, label: "Analytics", x: "10%", y: "20%", delay: 0 },
  { icon: Globe, label: "Global CDN", x: "75%", y: "15%", delay: 0.2 },
  { icon: Zap, label: "99 Score", x: "85%", y: "60%", delay: 0.4 },
];

export function FloatingElements() {
  return (
    <>
      {elements.map(({ icon: Icon, label, x, y, delay }) => (
        <motion.div
          key={label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 + delay, duration: 0.8 }}
          className="absolute hidden lg:block"
          style={{ left: x, top: y }}
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{
              duration: 4 + delay * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="glass flex items-center gap-2 rounded-2xl px-4 py-2.5 shadow-soft"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10">
              <Icon className="h-4 w-4 text-accent" />
            </div>
            <span className="text-xs font-medium">{label}</span>
          </motion.div>
        </motion.div>
      ))}
    </>
  );
}
