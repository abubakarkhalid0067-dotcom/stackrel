"use client";

import { motion, useReducedMotion } from "framer-motion";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={
        prefersReducedMotion
          ? { opacity: 0 }
          : { opacity: 0, y: 48 }
      }
      animate={
        prefersReducedMotion
          ? { opacity: 1 }
          : { opacity: 1, y: 0 }
      }
      transition={{
        duration: prefersReducedMotion ? 0.25 : 0.65,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="will-change-transform"
    >
      {children}
    </motion.div>
  );
}
