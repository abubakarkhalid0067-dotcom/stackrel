"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Service } from "@/lib/constants";
import { SERVICES } from "@/lib/constants";
import { Reveal } from "@/components/shared/section-header";
import { cn } from "@/lib/utils";

function ServicesHeader() {
  return (
    <Reveal className="relative mb-16 lg:mb-20">
      <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-accent/[0.07] blur-3xl" />
      <div className="pointer-events-none absolute top-8 right-0 hidden h-40 w-40 rounded-full bg-violet-500/[0.05] blur-3xl lg:block" />

      <div className="relative grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-12">
        <div>
          <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-border bg-background/80 py-1.5 pr-4 pl-1.5 shadow-soft backdrop-blur-sm">
            <span className="rounded-full bg-accent px-3 py-1 text-[10px] font-semibold tracking-widest text-white uppercase">
              Services
            </span>
            <span className="text-xs font-medium text-muted">
              8 premium solutions
            </span>
          </div>

          <h2
            className="text-[clamp(2rem,4.5vw,3.75rem)] leading-[1.05] font-bold tracking-[-0.03em] text-foreground"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Everything you need to{" "}
            <span className="text-gradient-accent">dominate</span>{" "}
            <span
              className="font-normal italic text-foreground/90"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              online.
            </span>
          </h2>
        </div>

        <div className="lg:border-l lg:border-border lg:pl-10">
          <p className="text-base leading-relaxed text-muted sm:text-lg lg:max-w-md">
            From concept to launch, we deliver end-to-end digital solutions
            tailored to your business goals.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted">
            <span className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Strategy
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent/60" />
              Design
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent/30" />
              Development
            </span>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const Icon = service.icon;
  const hasImage = Boolean(service.image);

  return (
    <Reveal delay={index * 0.06}>
      <Link href={`/services/${service.slug}`} data-cursor="pointer" className="group block">
        <motion.div
          whileHover={{ y: -4 }}
          transition={{ type: "spring", stiffness: 400, damping: 28 }}
          className="overflow-hidden rounded-2xl border border-border bg-background shadow-soft transition-shadow hover:shadow-premium"
        >
          {/* Preview area */}
          <div className="relative aspect-[4/3] overflow-hidden bg-white">
            {hasImage ? (
              <>
                <Image
                  src={service.image!}
                  alt={service.title}
                  fill
                  unoptimized
                  className="object-contain object-center transition-transform duration-700 group-hover:scale-[1.02]"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
                <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/[0.03]" />
              </>
            ) : (
              <>
                <div
                  className={cn(
                    "absolute inset-0 bg-gradient-to-br",
                    service.preview
                  )}
                />
                <div
                  className={cn(
                    "absolute inset-0 bg-gradient-to-br opacity-60",
                    service.gradient
                  )}
                />

                <div className="absolute inset-3 rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-sm" />
                <div className="absolute top-6 right-6 left-6 flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-white/20" />
                  <span className="h-2 w-2 rounded-full bg-white/15" />
                  <span className="h-2 w-2 rounded-full bg-white/10" />
                </div>

                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                  <p
                    className="text-[clamp(1.1rem,2vw,1.5rem)] leading-tight text-white/90 italic"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {service.title}
                  </p>
                </div>

                <div className="absolute inset-0 bg-white/0 transition-colors duration-500 group-hover:bg-white/[0.03]" />
              </>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between gap-3 border-t border-border bg-secondary/50 px-4 py-3.5">
            <div className="min-w-0">
              <p
                className="truncate text-sm font-semibold text-foreground"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {service.title}
              </p>
              <p className="text-xs text-muted">Service — {service.tag}</p>
            </div>
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border bg-background">
              <Icon className="h-4 w-4 text-foreground/70" />
            </div>
          </div>
        </motion.div>
      </Link>
    </Reveal>
  );
}

function ServiceGrid({ items, startIndex }: { items: Service[]; startIndex: number }) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
      {items.map((service, i) => (
        <ServiceCard
          key={service.title}
          service={service}
          index={startIndex + i}
        />
      ))}
    </div>
  );
}

export function Services() {
  const topRow = SERVICES.slice(0, 4);
  const bottomRow = SERVICES.slice(4, 8);

  return (
    <section id="services" className="section-padding">
      <div className="container-premium">
        <ServicesHeader />

        <ServiceGrid items={topRow} startIndex={0} />

        {/* Break line */}
        <div className="relative my-8 lg:my-10">
          <div className="h-px w-full bg-border" />
          <div className="absolute top-1/2 left-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-border" />
        </div>

        <ServiceGrid items={bottomRow} startIndex={4} />
      </div>
    </section>
  );
}
