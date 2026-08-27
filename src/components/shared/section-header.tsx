"use client";

import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  duration?: number;
}

export function Reveal({
  children,
  className,
  delay = 0,
  direction = "up",
  duration = 0.7,
}: RevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const directions = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { x: 40, y: 0 },
    right: { x: -40, y: 0 },
    none: { x: 0, y: 0 },
  };

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        ...directions[direction],
      }}
      animate={
        isInView
          ? { opacity: 1, x: 0, y: 0 }
          : { opacity: 0, ...directions[direction] }
      }
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

interface SectionHeaderProps {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  id?: string;
  variant?: "light" | "dark";
}

export function SectionHeader({
  badge,
  title,
  subtitle,
  align = "center",
  id,
  variant = "light",
}: SectionHeaderProps) {
  const isDark = variant === "dark";

  return (
    <Reveal className={cn("mb-16 max-w-3xl", align === "center" && "mx-auto text-center")}>
      {badge && (
        <span
          className={cn(
            "mb-4 inline-block rounded-full border px-4 py-1.5 text-xs font-medium tracking-wide uppercase",
            isDark
              ? "border-white/15 bg-white/5 text-white/60"
              : "border-border bg-secondary text-muted"
          )}
        >
          {badge}
        </span>
      )}
      <h2
        id={id}
        className={cn(
          "text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl",
          isDark && "text-white"
        )}
        style={{ fontFamily: "var(--font-heading)" }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed sm:text-lg",
            isDark ? "text-white/55" : "text-muted"
          )}
        >
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
