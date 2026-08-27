"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { PORTFOLIO } from "@/lib/constants";
import { Reveal } from "@/components/shared/section-header";
import { cn } from "@/lib/utils";

function renderWithGptLogo(text: string, logoSize = "h-[0.95em] w-[0.95em]") {
  if (!text.includes("GPT")) return text;

  const segments = text.split("GPT");

  return segments.map((segment, i) => (
    <span key={`${segment}-${i}`}>
      {segment}
      {i < segments.length - 1 && (
        <span className="inline-flex items-center gap-1">
          <Image
            src="/ai/openai-logo.png"
            alt=""
            width={18}
            height={18}
            className={cn("inline-block shrink-0 align-[-0.12em]", logoSize)}
            aria-hidden
          />
          GPT
        </span>
      )}
    </span>
  ));
}

function PortfolioStat({ label, value }: { label: string; value: string }) {
  const isTech = label.toLowerCase().includes("stack") || label.toLowerCase().includes("tech");

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-black/[0.05]",
        "bg-white/90 backdrop-blur-sm",
        "px-4 py-4 sm:px-5 sm:py-[1.35rem]",
        "shadow-[0_1px_1px_rgba(0,0,0,0.03),0_8px_28px_-12px_rgba(0,0,0,0.08)]",
        "transition-all duration-500 ease-out",
        "hover:-translate-y-0.5 hover:border-black/[0.08] hover:shadow-[0_20px_40px_-24px_rgba(0,0,0,0.15)]"
      )}
    >
      <div className="absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-black/[0.08] to-transparent sm:inset-x-5" />
      <p className="text-[10px] font-semibold tracking-[0.24em] text-zinc-400 uppercase">
        {label}
      </p>
      <p
        className={cn(
          "mt-2.5 leading-none tracking-[-0.03em] text-zinc-900",
          isTech
            ? "font-mono text-[12px] font-medium sm:text-[13px]"
            : "text-[14px] font-medium sm:text-[15px]"
        )}
        style={isTech ? undefined : { fontFamily: "var(--font-heading)" }}
      >
        {value}
      </p>
    </div>
  );
}

function PortfolioCard({
  project,
  index,
}: {
  project: (typeof PORTFOLIO)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const isEven = index % 2 === 0;
  const isExternal = project.href.startsWith("http");

  return (
    <Reveal>
      <div
        ref={ref}
        className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-16 ${
          !isEven ? "lg:[direction:rtl]" : ""
        }`}
      >
        <motion.div style={{ y }} className="relative lg:[direction:ltr]">
          <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl shadow-premium">
            <Image
              src={project.image}
              alt={project.title}
              fill
              loading="lazy"
              className={cn(
                "transition-transform duration-700 group-hover:scale-105",
                project.image.startsWith("/services/")
                  ? "object-contain bg-white p-6"
                  : "object-cover"
              )}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </div>
        </motion.div>

        <div className="lg:[direction:ltr]">
          <div className="mb-5 flex flex-wrap items-center gap-2.5">
            <span
              className={cn(
                "inline-flex items-center rounded-full px-3 py-1 text-[10px] font-semibold tracking-[0.18em] uppercase",
                project.type === "live"
                  ? "bg-foreground text-background"
                  : "border border-black/[0.08] bg-white text-zinc-500"
              )}
            >
              {project.type === "live" ? "Live Project" : "Concept Demo"}
            </span>
            <span className="inline-flex items-center rounded-full border border-black/[0.06] bg-white/80 px-3 py-1 text-[10px] font-medium tracking-[0.14em] text-zinc-500 uppercase">
              {project.category}
            </span>
          </div>

          <h3
            className="text-[clamp(1.65rem,2.8vw,2.125rem)] font-semibold tracking-[-0.04em] text-foreground"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {renderWithGptLogo(project.title, "h-[0.88em] w-[0.88em]")}
          </h3>

          <p className="mt-4 max-w-[34rem] text-[15px] leading-[1.8] font-normal tracking-[-0.015em] text-zinc-500 sm:mt-5 sm:text-[16px] sm:leading-[1.75]">
            {renderWithGptLogo(project.description, "h-[0.85em] w-[0.85em]")}
          </p>

          <div className="mt-8 grid grid-cols-3 gap-2.5 sm:mt-9 sm:gap-3.5">
            {project.stats.map((stat) => (
              <PortfolioStat key={stat.label} label={stat.label} value={stat.value} />
            ))}
          </div>

          {isExternal ? (
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="pointer"
              className="group/link mt-9 inline-flex items-center gap-2.5 border-b border-black/0 pb-1 text-[13px] font-medium tracking-[0.04em] text-foreground uppercase transition-all duration-300 hover:border-black/20 hover:opacity-70 sm:mt-10"
            >
              {project.linkLabel}
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
            </a>
          ) : (
            <Link
              href={project.href}
              data-cursor="pointer"
              className="group/link mt-9 inline-flex items-center gap-2.5 border-b border-black/0 pb-1 text-[13px] font-medium tracking-[0.04em] text-foreground uppercase transition-all duration-300 hover:border-black/20 hover:opacity-70 sm:mt-10"
            >
              {project.linkLabel}
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
            </Link>
          )}
        </div>
      </div>
    </Reveal>
  );
}

export function Portfolio() {
  return (
    <section id="portfolio" className="section-padding bg-secondary">
      <div className="container-premium">
        <Reveal className="mb-16 max-w-3xl mx-auto text-center sm:mb-20">
          <span className="mb-5 inline-flex items-center rounded-full border border-black/[0.06] bg-white px-4 py-1.5 text-[10px] font-semibold tracking-[0.22em] text-zinc-500 uppercase">
            Portfolio
          </span>
          <h2
            className="text-[clamp(2rem,4.5vw,3.25rem)] font-semibold tracking-[-0.04em] text-foreground"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Featured work & demos
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[15px] leading-[1.8] font-normal tracking-[-0.015em] text-zinc-500 sm:text-[16px]">
            Real client work and honest demo projects — explore what we&apos;ve
            built and what we can create for you.
          </p>
        </Reveal>

        <div className="space-y-24 lg:space-y-32">
          {PORTFOLIO.slice(0, 3).map((project, i) => (
            <PortfolioCard key={project.title} project={project} index={i} />
          ))}
        </div>

        <Reveal className="mt-16 text-center sm:mt-20">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 rounded-full border border-black/[0.1] bg-white px-8 py-4 text-[12px] font-bold tracking-[0.12em] uppercase transition-all hover:bg-[#fafafa]"
          >
            View Full Portfolio
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
