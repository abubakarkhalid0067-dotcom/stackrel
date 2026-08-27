"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Search,
} from "lucide-react";
import { PORTFOLIO, PORTFOLIO_FILTERS, TRUSTED_LOGOS } from "@/lib/constants";
import { cn } from "@/lib/utils";

type FilterOption = (typeof PORTFOLIO_FILTERS)[number];

function GridBackground() {
  return (
    <div
      className="pointer-events-none absolute inset-0 opacity-[0.35]"
      aria-hidden="true"
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(0,0,0,0.04) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(0,0,0,0.04) 1px, transparent 1px)
        `,
        backgroundSize: "72px 72px",
      }}
    />
  );
}

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

function matchesFilter(project: (typeof PORTFOLIO)[number], filter: FilterOption) {
  if (filter === "All") return true;
  if (filter === "Live Projects") return project.type === "live";
  if (filter === "Concept Demos") return project.type === "concept";
  if (filter === "Ecommerce") {
    return project.category.toLowerCase().includes("ecommerce");
  }
  if (filter === "SaaS") {
    return (
      project.category.toLowerCase().includes("saas") ||
      project.category.toLowerCase().includes("dashboard")
    );
  }
  if (filter === "AI") {
    return project.category.toLowerCase().includes("ai") || project.title.includes("GPT");
  }
  return true;
}

function FeaturedProject({ project }: { project: (typeof PORTFOLIO)[number] }) {
  const isExternal = project.href.startsWith("http");

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="overflow-hidden rounded-[1.75rem] border border-black/[0.07] bg-white shadow-[0_32px_80px_-36px_rgba(0,0,0,0.14)]"
    >
      <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
        <div className="relative aspect-[16/10] overflow-hidden bg-zinc-100 lg:aspect-auto lg:min-h-[420px]">
          <Image
            src={project.image}
            alt={project.title}
            fill
            unoptimized={project.image.startsWith("/")}
            className={cn(
              "transition-transform duration-700 hover:scale-[1.03]",
              project.image.startsWith("/services/")
                ? "object-contain bg-white p-8"
                : "object-cover"
            )}
            sizes="(max-width: 1024px) 100vw, 60vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-black/[0.04]" />
        </div>

        <div className="flex flex-col justify-center px-7 py-10 sm:px-10 sm:py-12 lg:px-12">
          <div className="mb-5 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center rounded-full bg-black px-3 py-1 text-[10px] font-semibold tracking-[0.18em] text-white uppercase">
              Featured Live Project
            </span>
            <span className="inline-flex items-center rounded-full border border-black/[0.08] bg-[#fafafa] px-3 py-1 text-[10px] font-medium tracking-[0.14em] text-zinc-500 uppercase">
              {project.category}
            </span>
          </div>

          <h2
            className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold tracking-[-0.04em] text-foreground"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {project.title}
          </h2>

          <p className="mt-4 text-[15px] leading-[1.8] tracking-[-0.015em] text-zinc-500 sm:text-[16px]">
            {project.description}
          </p>

          <div className="mt-8 grid grid-cols-3 gap-2.5">
            {project.stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-black/[0.06] bg-[#fafafa] px-3 py-3 sm:px-4 sm:py-3.5"
              >
                <p className="text-[9px] font-semibold tracking-[0.2em] text-zinc-400 uppercase">
                  {stat.label}
                </p>
                <p
                  className="mt-1.5 text-[13px] font-medium tracking-[-0.02em] text-foreground sm:text-[14px]"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {stat.value}
                </p>
              </div>
            ))}
          </div>

          {isExternal ? (
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-9 inline-flex w-fit items-center gap-2 rounded-full bg-black px-7 py-3.5 text-[11px] font-bold tracking-[0.14em] text-white uppercase transition-all hover:bg-black/90"
            >
              {project.linkLabel}
              <ArrowUpRight className="h-4 w-4" />
            </a>
          ) : (
            <Link
              href={project.href}
              className="mt-9 inline-flex w-fit items-center gap-2 rounded-full bg-black px-7 py-3.5 text-[11px] font-bold tracking-[0.14em] text-white uppercase transition-all hover:bg-black/90"
            >
              {project.linkLabel}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          )}
        </div>
      </div>
    </motion.article>
  );
}

function PortfolioGridCard({
  project,
  index,
}: {
  project: (typeof PORTFOLIO)[number];
  index: number;
}) {
  const isExternal = project.href.startsWith("http");

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.45, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      <div className="overflow-hidden rounded-[1.625rem] border border-black/[0.07] bg-white shadow-[0_24px_64px_-32px_rgba(0,0,0,0.12)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_32px_80px_-28px_rgba(0,0,0,0.16)]">
        <div className="relative m-3.5 overflow-hidden rounded-xl bg-zinc-100 sm:m-4">
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={project.image}
              alt={project.title}
              fill
              unoptimized={project.image.startsWith("/")}
              className={cn(
                "transition-transform duration-700 group-hover:scale-[1.04]",
                project.image.startsWith("/services/")
                  ? "object-contain bg-white p-6"
                  : "object-cover"
              )}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </div>
        </div>

        <div className="px-5 pb-6 sm:px-6 sm:pb-7">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span
              className={cn(
                "inline-flex items-center rounded-full px-2.5 py-0.5 text-[9px] font-semibold tracking-[0.16em] uppercase",
                project.type === "live"
                  ? "bg-foreground text-background"
                  : "border border-black/[0.08] bg-[#fafafa] text-zinc-500"
              )}
            >
              {project.type === "live" ? "Live" : "Concept"}
            </span>
            <span className="text-[10px] font-medium tracking-[0.12em] text-zinc-400 uppercase">
              {project.category}
            </span>
          </div>

          <h3
            className="text-[1.25rem] font-semibold tracking-[-0.03em] text-foreground sm:text-[1.35rem]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {renderWithGptLogo(project.title, "h-[0.85em] w-[0.85em]")}
          </h3>

          <p className="mt-2.5 line-clamp-2 text-[14px] leading-[1.7] text-zinc-500">
            {renderWithGptLogo(project.description, "h-[0.8em] w-[0.8em]")}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {project.stats.slice(0, 2).map((stat) => (
              <span
                key={stat.label}
                className="rounded-full border border-black/[0.06] bg-[#fafafa] px-3 py-1 text-[11px] text-zinc-600"
              >
                {stat.value}
              </span>
            ))}
          </div>

          {isExternal ? (
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-1.5 text-[12px] font-semibold tracking-[0.06em] text-foreground uppercase transition-opacity hover:opacity-70"
            >
              {project.linkLabel}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          ) : (
            <Link
              href={project.href}
              className="mt-6 inline-flex items-center gap-1.5 text-[12px] font-semibold tracking-[0.06em] text-foreground uppercase transition-opacity hover:opacity-70"
            >
              {project.linkLabel}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          )}
        </div>
      </div>
    </motion.article>
  );
}

function isShowcaseImage(src: string) {
  return src.startsWith("/portfolio/");
}

function PortfolioHero({
  liveCount,
  conceptCount,
}: {
  liveCount: number;
  conceptCount: number;
}) {
  const bento = PORTFOLIO.filter((p) => isShowcaseImage(p.image)).slice(0, 3);

  return (
    <section className="relative overflow-hidden pt-24 pb-8 sm:pt-28 sm:pb-10">
      <div className="container-premium">
        {/* Top bar */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex flex-wrap items-end justify-between gap-4"
        >
          <div>
            <p className="text-[11px] font-semibold tracking-[0.28em] text-zinc-400 uppercase">
              Portfolio
            </p>
            <h1
              className="mt-3 text-[clamp(2.5rem,6vw,4.5rem)] font-semibold leading-[0.98] tracking-[-0.05em] text-foreground"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Shipped work.
              <span
                className="ml-2 italic font-normal text-zinc-400"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                Real results.
              </span>
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-black/[0.08] bg-white px-3.5 py-1.5 text-[11px] font-medium text-zinc-600">
              <strong className="font-semibold text-foreground">{PORTFOLIO.length}</strong>{" "}
              projects
            </span>
            <span className="rounded-full bg-orange-500 px-3.5 py-1.5 text-[11px] font-bold tracking-[0.08em] text-white uppercase">
              {liveCount} live
            </span>
            <span className="rounded-full border border-black/[0.08] bg-white px-3.5 py-1.5 text-[11px] font-medium text-zinc-600">
              {conceptCount} demos
            </span>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.06 }}
          className="mb-8 max-w-2xl text-[15px] leading-[1.8] text-zinc-500 sm:text-[16px]"
        >
          Client launches, live platforms, and concept builds — explore how we
          design and engineer for growth across freight, AI, SaaS, and ecommerce.
        </motion.p>

        {/* Showcase grid — featured + 2 equal tiles */}
        <div className="grid gap-4 lg:grid-cols-12 lg:grid-rows-2 lg:gap-4 lg:h-[min(540px,62vh)]">
          {bento.map((project, i) => {
            const isExternal = project.href.startsWith("http");
            const isFeatured = i === 0;

            const cardClass = cn(
              "group relative block h-full w-full overflow-hidden rounded-[1.25rem] border border-black/[0.08] bg-zinc-100 shadow-[0_24px_64px_-28px_rgba(0,0,0,0.18)]",
              isFeatured
                ? "aspect-[16/10] min-h-[260px] sm:min-h-[320px] lg:aspect-auto lg:min-h-0"
                : "aspect-[16/10] min-h-[220px] lg:aspect-auto lg:min-h-0"
            );

            const inner = (
              <>
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  unoptimized
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                  sizes={
                    isFeatured
                      ? "(max-width: 1024px) 100vw, 58vw"
                      : "(max-width: 1024px) 100vw, 42vw"
                  }
                  priority={isFeatured}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/5" />

                <div
                  className={cn(
                    "absolute inset-x-0 bottom-0",
                    isFeatured ? "p-6 sm:p-8" : "p-5 sm:p-6"
                  )}
                >
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <span
                      className={cn(
                        "inline-flex rounded-full px-2.5 py-0.5 text-[9px] font-bold tracking-[0.16em] uppercase",
                        project.type === "live"
                          ? "bg-orange-500 text-white"
                          : "border border-white/25 bg-white/10 text-white/85 backdrop-blur-sm"
                      )}
                    >
                      {project.type === "live" ? "Live" : "Concept"}
                    </span>
                    <span className="text-[10px] font-medium tracking-[0.12em] text-white/60 uppercase">
                      {project.category}
                    </span>
                  </div>
                  <p
                    className={cn(
                      "font-semibold tracking-[-0.03em] text-white",
                      isFeatured ? "text-[1.35rem] sm:text-[1.5rem]" : "text-[1.05rem] sm:text-[1.15rem]"
                    )}
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {project.title}
                  </p>
                  {isFeatured && (
                    <p className="mt-2 line-clamp-2 max-w-lg text-[13px] leading-[1.65] text-white/65 sm:text-[14px]">
                      {project.description}
                    </p>
                  )}
                  <span className="mt-3 inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.1em] text-white/90 uppercase sm:mt-4 sm:text-[11px]">
                    {project.linkLabel}
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </>
            );

            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.07, duration: 0.55 }}
                className={cn(
                  "h-full",
                  isFeatured ? "lg:col-span-7 lg:row-span-2" : "lg:col-span-5"
                )}
              >
                {isExternal ? (
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cardClass}
                  >
                    {inner}
                  </a>
                ) : (
                  <Link href={project.href} className={cardClass}>
                    {inner}
                  </Link>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.38 }}
          className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-black/[0.06] pt-8"
        >
          <a
            href="#projects"
            className="inline-flex items-center gap-2 text-[12px] font-semibold tracking-[0.1em] text-foreground uppercase transition-opacity hover:opacity-60"
          >
            Browse all projects
            <ArrowRight className="h-4 w-4" />
          </a>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-[11px] font-bold tracking-[0.12em] text-white uppercase transition-all hover:bg-black/90"
          >
            Start a project
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export function PortfolioPageContent() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterOption>("All");

  const liveCount = PORTFOLIO.filter((p) => p.type === "live").length;
  const conceptCount = PORTFOLIO.filter((p) => p.type === "concept").length;
  const featuredLive = PORTFOLIO.find((p) => p.type === "live");

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();

    return PORTFOLIO.filter((project) => {
      if (!matchesFilter(project, activeFilter)) return false;
      if (!query) return true;

      return (
        project.title.toLowerCase().includes(query) ||
        project.category.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query)
      );
    });
  }, [activeFilter, search]);

  const showFeatured =
    activeFilter === "All" &&
    !search.trim() &&
    featuredLive &&
    filtered.some((p) => p.title === featuredLive.title);

  const gridProjects = showFeatured
    ? filtered.filter((p) => p.title !== featuredLive!.title)
    : filtered;

  return (
    <div className="relative min-h-screen bg-[#fafafa]">
      <GridBackground />

      <PortfolioHero liveCount={liveCount} conceptCount={conceptCount} />

      <section id="projects" className="sticky top-[4.5rem] z-30 border-y border-black/[0.05] bg-[#fafafa]/95 backdrop-blur-xl lg:top-20">
        <div className="container-premium py-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative flex-1 lg:max-w-sm">
              <Search className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-zinc-400" />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search projects..."
                className="h-11 w-full rounded-full border border-black/[0.08] bg-white pr-4 pl-11 text-[14px] placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-black/10"
              />
            </div>

            <div className="hidden flex-wrap items-center gap-1.5 rounded-full border border-black/[0.06] bg-white p-1.5 sm:flex">
              {PORTFOLIO_FILTERS.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={cn(
                    "rounded-full px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.06em] uppercase transition-all",
                    activeFilter === filter
                      ? "bg-black text-white"
                      : "text-zinc-500 hover:text-foreground"
                  )}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-3 flex gap-1.5 overflow-x-auto pb-1 sm:hidden">
            {PORTFOLIO_FILTERS.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={cn(
                  "shrink-0 rounded-full px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.06em] uppercase transition-all",
                  activeFilter === filter
                    ? "bg-black text-white"
                    : "border border-black/[0.08] text-zinc-500"
                )}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="relative container-premium py-14 sm:py-20">
        <div className="mb-8 flex items-end justify-between">
          <p className="text-[14px] text-zinc-500">
            <span className="font-semibold text-foreground">{filtered.length}</span>{" "}
            project{filtered.length !== 1 ? "s" : ""}
            {activeFilter !== "All" && (
              <span>
                {" "}
                in <span className="text-foreground">{activeFilter}</span>
              </span>
            )}
          </p>
          <Link
            href="/contact"
            className="hidden items-center gap-1.5 text-[13px] font-medium text-foreground sm:inline-flex"
          >
            Start your project
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-[1.625rem] border border-black/[0.07] bg-white py-20 text-center">
            <p className="text-[16px] font-medium">No projects found</p>
            <p className="mt-2 text-[14px] text-zinc-500">
              Try a different search or filter.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setActiveFilter("All");
              }}
              className="mt-6 text-[13px] font-medium underline-offset-2 hover:underline"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="space-y-10">
            {showFeatured && featuredLive && (
              <FeaturedProject project={featuredLive} />
            )}

            {gridProjects.length > 0 && (
              <motion.div
                layout
                className="grid items-start gap-6 sm:grid-cols-2 sm:gap-7 lg:gap-8"
              >
                <AnimatePresence mode="popLayout">
                  {gridProjects.map((project, i) => (
                    <PortfolioGridCard key={project.title} project={project} index={i} />
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </div>
        )}
      </section>

      <section className="relative border-y border-black/[0.05] py-12 sm:py-16">
        <div className="container-premium">
          <p className="mb-8 text-center text-[10px] font-semibold tracking-[0.22em] text-zinc-400 uppercase">
            Trusted by teams building with
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 opacity-70 grayscale">
            {TRUSTED_LOGOS.slice(0, 6).map((logo) =>
              logo.src ? (
                <Image
                  key={logo.name}
                  src={logo.src}
                  alt={logo.name}
                  width={100}
                  height={28}
                  className="h-6 w-auto object-contain sm:h-7"
                />
              ) : (
                <span key={logo.name} className="text-[13px] font-medium text-zinc-500">
                  {logo.name}
                </span>
              )
            )}
          </div>
        </div>
      </section>

      <section className="relative py-16 sm:py-20">
        <div className="container-premium">
          <div className="mx-auto max-w-2xl rounded-[1.625rem] border border-black/[0.07] bg-white px-8 py-12 text-center shadow-[0_24px_64px_-32px_rgba(0,0,0,0.1)] sm:px-12">
            <h2
              className="text-2xl font-semibold tracking-[-0.03em] sm:text-3xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Ready to build something premium?
            </h2>
            <p className="mt-4 text-[15px] leading-[1.75] text-zinc-500">
              From live platforms to launch-ready templates — we help you ship
              faster with design and engineering that feels world-class.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-black px-8 py-4 text-[12px] font-bold tracking-[0.12em] text-white uppercase transition-all hover:bg-black/90"
              >
                Start a Project
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/templates"
                className="inline-flex items-center gap-2 rounded-full border border-black/[0.12] bg-[#fafafa] px-8 py-4 text-[12px] font-bold tracking-[0.12em] uppercase transition-colors hover:bg-white"
              >
                Browse Templates
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
