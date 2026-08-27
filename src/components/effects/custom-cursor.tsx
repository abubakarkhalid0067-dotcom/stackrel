"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";
import { useMediaQuery } from "@/hooks/use-media-query";

export function CustomCursor() {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const [isHovering, setIsHovering] = useState(false);

  const dotX = useSpring(0, { stiffness: 500, damping: 28, mass: 0.5 });
  const dotY = useSpring(0, { stiffness: 500, damping: 28, mass: 0.5 });
  const ringX = useSpring(0, { stiffness: 150, damping: 20, mass: 0.8 });
  const ringY = useSpring(0, { stiffness: 150, damping: 20, mass: 0.8 });

  useEffect(() => {
    if (!isDesktop) return;

    const move = (e: MouseEvent) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      ringX.set(e.clientX);
      ringY.set(e.clientY);
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setIsHovering(
        !!target.closest("a, button, [data-cursor='pointer']")
      );
    };

    window.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseover", handleOver);

    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", handleOver);
    };
  }, [isDesktop, dotX, dotY, ringX, ringY]);

  if (!isDesktop) return null;

  const dotSize = isHovering ? 48 : 16;
  const ringSize = isHovering ? 64 : 36;

  return (
    <>
      {/* Trailing ring — cursor follow */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9998] hidden lg:block"
        style={{ x: ringX, y: ringY }}
      >
        <motion.div
          animate={{ width: ringSize, height: ringSize, x: -ringSize / 2, y: -ringSize / 2 }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
          className="rounded-full border border-foreground/15"
        />
      </motion.div>

      {/* Main dot */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden mix-blend-difference lg:block"
        style={{ x: dotX, y: dotY }}
      >
        <motion.div
          animate={{
            width: dotSize,
            height: dotSize,
            x: -dotSize / 2,
            y: -dotSize / 2,
          }}
          transition={{ type: "spring", stiffness: 500, damping: 28 }}
          className="rounded-full bg-white"
          style={{ opacity: isHovering ? 0.5 : 0.85 }}
        />
      </motion.div>
    </>
  );
}
