"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { HERO_SLIDES } from "@/lib/hero-slides";
import { cn } from "@/lib/utils";

const SLIDE_DURATION = 6000;
const FADE = { duration: 1.4, ease: [0.22, 1, 0.36, 1] as const };

export function HeroSlider() {
  const [current, setCurrent] = useState(0);

  const goTo = useCallback((index: number) => {
    setCurrent(index);
  }, []);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <div className="absolute inset-0 overflow-hidden bg-black">
      {/* All slides stacked — first image always in DOM & visible on load */}
      {HERO_SLIDES.map((slide, i) => (
        <motion.div
          key={slide.src}
          initial={false}
          animate={{
            opacity: i === current ? 1 : 0,
            scale: i === current ? 1 : 1.04,
          }}
          transition={FADE}
          className="absolute inset-0"
          aria-hidden={i !== current}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            priority={i === 0}
            unoptimized
            className="object-cover"
            sizes="100vw"
          />
        </motion.div>
      ))}

      {/* Cinematic overlay */}
      <div className="absolute inset-0 bg-black/15" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-black/35" />

      {/* Slide dots */}
      <div className="absolute bottom-[clamp(1.25rem,3vh,2rem)] left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 opacity-60">
        {HERO_SLIDES.map((slide, i) => (
          <button
            key={slide.src}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === current ? "true" : undefined}
            className="group relative h-0.5 overflow-hidden rounded-full bg-white/20 transition-all duration-300"
            style={{ width: i === current ? 36 : 16 }}
          >
            <span
              className={cn(
                "absolute inset-y-0 left-0 rounded-full bg-white transition-all",
                i === current ? "animate-hero-progress w-full" : "w-0"
              )}
              style={
                i === current
                  ? { animationDuration: `${SLIDE_DURATION}ms` }
                  : undefined
              }
            />
          </button>
        ))}
      </div>
    </div>
  );
}
