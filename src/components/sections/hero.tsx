"use client";

import { motion } from "framer-motion";
import { HeroSlider } from "@/components/effects/hero-slider";
import { HERO_HEADLINE, HERO_SUBTITLE } from "@/lib/hero-slides";

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen overflow-hidden">
      <HeroSlider />

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex flex-col gap-5 pb-[clamp(2.5rem,6vh,4.5rem)] lg:inset-0 lg:block"
        style={{
          paddingLeft: "clamp(1.5rem, 4vw, 3.5rem)",
          paddingRight: "clamp(1.5rem, 4vw, 3.5rem)",
        }}
      >
        {/* Bottom-left headline */}
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-auto max-w-[92%] text-[clamp(1.75rem,4.2vw,3.75rem)] leading-[1.06] font-normal tracking-[-0.01em] text-white lg:absolute lg:bottom-[clamp(2.5rem,6vh,4.5rem)] lg:max-w-[min(58vw,640px)]"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          <span className="italic">{HERO_HEADLINE}</span>
        </motion.h1>

        {/* Bottom-right description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-auto ml-auto max-w-[280px] text-right text-[13px] leading-[1.7] font-normal text-white/75 sm:max-w-[300px] lg:absolute lg:right-[clamp(1.5rem,4vw,3.5rem)] lg:bottom-[clamp(2.5rem,6vh,4.5rem)] lg:max-w-[min(26vw,300px)] lg:text-[clamp(0.7rem,1.1vw,0.8125rem)]"
        >
          {HERO_SUBTITLE}
        </motion.p>
      </div>
    </section>
  );
}
