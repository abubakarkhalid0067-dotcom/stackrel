"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BrandLogo } from "@/components/shared/brand-logo";

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const finish = () => setIsLoading(false);

    if (document.readyState === "complete") {
      const timer = setTimeout(finish, 250);
      return () => clearTimeout(timer);
    }

    const onLoad = () => setTimeout(finish, 250);
    window.addEventListener("load", onLoad, { once: true });
    const maxTimer = setTimeout(finish, 600);

    return () => {
      window.removeEventListener("load", onLoad);
      clearTimeout(maxTimer);
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-background"
        >
          <BrandLogo
            size={40}
            variant="heading"
            textClassName="text-3xl font-bold tracking-tight"
            className="text-foreground"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
