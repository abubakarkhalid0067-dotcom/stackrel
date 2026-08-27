"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";
import { useMediaQuery } from "@/hooks/use-media-query";

export function MouseLight() {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const springX = useSpring(0, { stiffness: 60, damping: 20 });
  const springY = useSpring(0, { stiffness: 60, damping: 20 });

  useEffect(() => {
    if (!isDesktop) return;

    const onMove = (e: MouseEvent) => {
      setMouse({ x: e.clientX, y: e.clientY });
      springX.set(e.clientX);
      springY.set(e.clientY);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [isDesktop, springX, springY]);

  if (!isDesktop) return null;

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[2] overflow-hidden"
      aria-hidden="true"
      style={{ x: 0, y: 0 }}
    >
      <motion.div
        className="absolute h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-100"
        style={{
          x: springX,
          y: springY,
          background:
            "radial-gradient(circle, rgba(37,99,235,0.07) 0%, rgba(124,58,237,0.04) 35%, transparent 70%)",
        }}
      />
    </motion.div>
  );
}
