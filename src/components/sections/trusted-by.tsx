"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { TRUSTED_LOGOS } from "@/lib/constants";
import { Reveal } from "@/components/shared/section-header";

function LogoItem({ name, src }: { name: string; src?: string }) {
  if (src) {
    return (
      <div className="flex h-8 shrink-0 items-center justify-center sm:h-9">
        <Image
          src={src}
          alt={`${name} logo`}
          width={120}
          height={36}
          className="h-6 w-auto object-contain transition-opacity duration-300 hover:opacity-90 sm:h-7"
          unoptimized
        />
      </div>
    );
  }

  return (
    <span
      className="shrink-0 text-lg font-semibold tracking-tight text-foreground/30 transition-colors hover:text-foreground/60 sm:text-xl"
      style={{ fontFamily: "var(--font-heading)" }}
    >
      {name}
    </span>
  );
}

export function TrustedBy() {
  const logos = [...TRUSTED_LOGOS, ...TRUSTED_LOGOS];

  return (
    <section className="overflow-hidden border-y border-border bg-secondary py-12">
      <Reveal>
        <p className="mb-8 text-center text-xs font-medium tracking-widest text-muted uppercase">
          Trusted by industry leaders
        </p>
      </Reveal>

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-secondary to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-secondary to-transparent" />

        <motion.div
          className="flex items-center gap-14 sm:gap-16"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            x: { duration: 30, repeat: Infinity, ease: "linear" },
          }}
        >
          {logos.map((logo, i) => (
            <LogoItem key={`${logo.name}-${i}`} name={logo.name} src={logo.src} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
