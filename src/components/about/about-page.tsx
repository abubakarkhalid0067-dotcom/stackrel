"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Code2,
  Handshake,
  Sparkles,
} from "lucide-react";
import {
  PROCESS_STEPS,
  TRUSTED_LOGOS,
} from "@/lib/constants";
import { Reveal } from "@/components/shared/section-header";
import { BuildCodeDemo } from "@/components/about/demos/build-code-demo";
import { PerformanceDemo } from "@/components/about/demos/performance-demo";
import { SeoSchemaDemo } from "@/components/about/demos/seo-schema-demo";
import { ResponsiveDemo } from "@/components/about/demos/responsive-demo";
import { SprintDemo } from "@/components/about/demos/sprint-demo";
import { PixelPerfectDemo } from "@/components/about/demos/pixel-perfect-demo";
import { PremiumUiDemo } from "@/components/about/demos/premium-ui-demo";
import {
  AboutStickyFeatures,
  type StickyFeature,
} from "@/components/about/about-sticky-features";
import { cn } from "@/lib/utils";

const ABOUT_FEATURES: StickyFeature[] = [
  {
    id: "code",
    eyebrow: "Engineering",
    title: "Modern Code",
    description:
      "Clean, typed, tested codebases your team can maintain and scale — generated and refined in seconds with production-ready patterns.",
    demo: <BuildCodeDemo />,
  },
  {
    id: "performance",
    eyebrow: "Speed",
    title: "Lightning Performance",
    description:
      "Sub-second load times with edge caching, optimized assets, and Core Web Vitals baked in from day one.",
    demo: <PerformanceDemo />,
  },
  {
    id: "seo",
    eyebrow: "Visibility",
    title: "SEO Optimized",
    description:
      "Built-in technical SEO, schema markup, and search-ready structure so your site ranks from launch day.",
    demo: <SeoSchemaDemo />,
  },
  {
    id: "responsive",
    eyebrow: "Every device",
    title: "Fully Responsive",
    description:
      "Layouts that adapt flawlessly from mobile to 4K — one codebase, every breakpoint perfected.",
    demo: <ResponsiveDemo />,
  },
  {
    id: "delivery",
    eyebrow: "Agile",
    title: "Fast Delivery",
    description:
      "Launch in weeks, not months. Agile sprints with weekly deliverables and transparent progress.",
    demo: <SprintDemo />,
  },
  {
    id: "pixel",
    eyebrow: "Precision",
    title: "Pixel Perfect",
    description:
      "Design fidelity down to the last pixel across every breakpoint — aligned, snapped, and polished.",
    demo: <PixelPerfectDemo />,
  },
  {
    id: "premium",
    eyebrow: "Craft",
    title: "Premium UI",
    description:
      "Interfaces inspired by the world's best product companies — components, tokens, and systems that feel world-class.",
    demo: <PremiumUiDemo />,
  },
];

const HERO_SHOWCASE = [
  {
    src: "/services/ai-websites.png",
    label: "AI Products",
    tag: "Intelligent UX",
  },
  {
    src: "/services/ecommerce.png",
    label: "Ecommerce",
    tag: "Conversion-first",
  },
  {
    src: "/services/saas.png",
    label: "SaaS Platforms",
    tag: "Scale-ready",
  },
] as const;

const EXPERTISE_TAGS = [
  "Custom Websites",
  "Framer Templates",
  "Next.js",
  "Ecommerce",
  "SaaS",
  "AI Experiences",
  "UI/UX Design",
  "Performance",
] as const;

const PRINCIPLES = [
  {
    title: "Design with intent",
    description:
      "Every layout, type choice, and interaction serves a business goal — not decoration for its own sake.",
    icon: Sparkles,
  },
  {
    title: "Engineering that scales",
    description:
      "Modern stacks, clean architecture, and performance budgets baked in from day one.",
    icon: Code2,
  },
  {
    title: "Partnership, not handoff",
    description:
      "We stay close through launch and beyond — clear communication, fast iterations, honest timelines.",
    icon: Handshake,
  },
] as const;

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

function AboutHero() {
  return (
    <section className="relative min-h-[92vh] overflow-hidden pt-24 pb-10 sm:pt-28 sm:pb-14">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 70% 55% at 15% 0%, rgba(99,102,241,0.08), transparent 55%), radial-gradient(ellipse 50% 45% at 95% 15%, rgba(249,115,22,0.07), transparent 50%)",
        }}
      />

      <div className="container-premium relative">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10 xl:gap-14">
          {/* Copy */}
          <div className="lg:col-span-7 xl:col-span-6">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="mb-8 inline-flex items-center gap-3 rounded-full border border-black/[0.08] bg-white/80 px-4 py-2 shadow-[0_8px_32px_-20px_rgba(0,0,0,0.15)] backdrop-blur-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="text-[11px] font-semibold tracking-[0.22em] text-zinc-500 uppercase">
                Design studio · Global clients
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.06, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-[clamp(2.75rem,7vw,5.25rem)] font-semibold leading-[0.96] tracking-[-0.05em] text-foreground"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              We craft
              <br />
              <span
                className="italic font-normal text-zinc-400"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                unforgettable
              </span>
              <br />
              digital brands.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.14 }}
              className="mt-7 max-w-xl text-[16px] leading-[1.85] tracking-[-0.015em] text-zinc-500 sm:text-[17px]"
            >
              STACKREL is where ambitious founders come for websites that look
              editorial, load instantly, and convert — from custom builds to
              premium templates you can launch this week.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22 }}
              className="mt-9 flex flex-wrap gap-3"
            >
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-black px-7 py-3.5 text-[11px] font-bold tracking-[0.14em] text-white uppercase transition-all hover:bg-black/90"
              >
                Start a project
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 rounded-full border border-black/[0.1] bg-white px-7 py-3.5 text-[11px] font-bold tracking-[0.14em] text-foreground uppercase transition-all hover:bg-zinc-50"
              >
                See our work
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-black/[0.06] pt-8"
            >
              {[
                { value: "120+", label: "Projects" },
                { value: "8+", label: "Years" },
                { value: "40+", label: "Templates" },
              ].map((stat, i) => (
                <span key={stat.label} className="inline-flex items-center gap-6">
                  {i > 0 && (
                    <span className="hidden h-5 w-px bg-black/10 sm:block" aria-hidden />
                  )}
                  <span>
                    <strong
                      className="block text-[1.35rem] font-semibold tracking-[-0.03em] text-foreground sm:text-[1.5rem]"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {stat.value}
                    </strong>
                    <span className="text-[11px] font-medium tracking-[0.16em] text-zinc-400 uppercase">
                      {stat.label}
                    </span>
                  </span>
                </span>
              ))}
            </motion.div>
          </div>

          {/* Visual collage */}
          <div className="relative lg:col-span-5 lg:col-start-8 xl:col-span-6 xl:col-start-7">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.12, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative mx-auto aspect-[4/4.5] max-w-md sm:aspect-[5/5.5] lg:mx-0 lg:max-w-none"
            >
              <div
                className="pointer-events-none absolute inset-[-12%] rounded-full border border-black/[0.04]"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute inset-[-24%] rounded-full border border-dashed border-black/[0.05]"
                aria-hidden="true"
              />

              {HERO_SHOWCASE.map((item, i) => {
                const layouts = [
                  "left-0 top-0 z-30 w-[82%] rotate-[-3deg]",
                  "right-0 top-[14%] z-20 w-[76%] rotate-[4deg]",
                  "bottom-0 left-[6%] z-10 w-[70%] rotate-[-1.5deg]",
                ];

                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 28, rotate: i === 1 ? 8 : -6 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      rotate: i === 1 ? 4 : i === 0 ? -3 : -1.5,
                    }}
                    transition={{
                      delay: 0.18 + i * 0.1,
                      duration: 0.75,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    whileHover={{ y: -8, rotate: 0, zIndex: 40 }}
                    className={cn(
                      "absolute overflow-hidden rounded-[1.25rem] border border-black/[0.08] bg-white shadow-[0_32px_80px_-28px_rgba(0,0,0,0.22)]",
                      layouts[i]
                    )}
                  >
                    <div className="relative aspect-[16/11] bg-zinc-50">
                      <Image
                        src={item.src}
                        alt={item.label}
                        fill
                        unoptimized
                        className="object-contain p-4 sm:p-5"
                        sizes="(max-width: 1024px) 80vw, 32vw"
                        priority={i === 0}
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent px-4 py-3.5">
                        <p
                          className="text-[12px] font-semibold tracking-[-0.02em] text-white"
                          style={{ fontFamily: "var(--font-heading)" }}
                        >
                          {item.label}
                        </p>
                        <p className="text-[9px] tracking-[0.18em] text-white/55 uppercase">
                          {item.tag}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.42 }}
                className="absolute top-2 right-2 z-40 rounded-full bg-black px-3.5 py-1.5 text-[9px] font-bold tracking-[0.18em] text-white uppercase"
              >
                Since 2018
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.48 }}
                className="absolute -bottom-3 -left-3 z-40 max-w-[200px] rounded-2xl border border-black/[0.08] bg-white px-4 py-3.5 shadow-[0_20px_50px_-24px_rgba(0,0,0,0.2)] sm:-left-6"
              >
                <p className="text-[10px] font-semibold tracking-[0.2em] text-zinc-400 uppercase">
                  What we do
                </p>
                <p
                  className="mt-1 text-[13px] font-medium leading-snug tracking-[-0.02em] text-foreground"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Design, build & launch premium web experiences.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Marquee strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55 }}
          className="relative mt-14 overflow-hidden border-y border-black/[0.06] py-5 sm:mt-16"
        >
          <div className="flex w-max animate-[marquee_28s_linear_infinite] gap-10 pr-10">
            {[...EXPERTISE_TAGS, ...EXPERTISE_TAGS].map((tag, i) => (
              <span
                key={`${tag}-${i}`}
                className="inline-flex shrink-0 items-center gap-3 text-[12px] font-medium tracking-[0.14em] text-zinc-400 uppercase"
              >
                <Sparkles className="h-3 w-3 text-zinc-300" />
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function StorySection() {
  return (
    <section className="section-padding bg-white">
      <div className="container-premium">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="mb-4 text-[11px] font-semibold tracking-[0.28em] text-zinc-400 uppercase">
              Our story
            </p>
            <h2
              className="text-[clamp(2rem,4vw,3rem)] font-semibold tracking-[-0.04em] text-foreground"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Built for brands that refuse to look ordinary.
            </h2>
            <div className="mt-6 space-y-5 text-[15px] leading-[1.85] tracking-[-0.015em] text-zinc-500 sm:text-[16px]">
              <p>
                STACKREL started with a simple belief: most business websites look
                the same because they are built the same way. We set out to change
                that — combining editorial design, product-grade engineering, and
                a relentless focus on performance.
              </p>
              <p>
                Today we partner with founders, agencies, and growing teams on
                custom builds and premium Framer & React templates. Whether you
                need a flagship launch or a polished store in weeks, we bring the
                same standard of care to every pixel.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] border border-black/[0.07] bg-zinc-100 shadow-[0_32px_80px_-36px_rgba(0,0,0,0.14)]">
              <Image
                src="/hero/microsoft-copilot-8UnGiO4yesk-unsplash.jpg"
                alt="Design and development collaboration"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </motion.div>
        </div>

        <div className="mt-12 grid gap-5 sm:mt-14 lg:mt-16 lg:grid-cols-3 lg:gap-6">
          {PRINCIPLES.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.12 + i * 0.08 }}
              whileHover={{ y: -4 }}
              className="group relative flex h-full flex-col overflow-hidden rounded-[1.35rem] border border-black/[0.07] bg-white p-7 shadow-[0_20px_50px_-32px_rgba(0,0,0,0.14)] transition-shadow duration-300 hover:shadow-[0_28px_60px_-28px_rgba(0,0,0,0.18)] sm:p-8"
            >
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange-400/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                aria-hidden
              />

              <div className="mb-6 flex items-start justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-black/[0.06] bg-[#fafafa] text-orange-500 transition-colors duration-300 group-hover:border-orange-200/60 group-hover:bg-orange-50">
                  <item.icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
                </div>
                <span className="font-mono text-[11px] font-medium tracking-[0.22em] text-zinc-300">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              <p
                className="text-[17px] font-semibold tracking-[-0.03em] text-foreground"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {item.title}
              </p>
              <p className="mt-3 max-w-[34ch] text-[14px] leading-[1.8] tracking-[-0.01em] text-zinc-500">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ValuesSection() {
  return <AboutStickyFeatures features={ABOUT_FEATURES} />;
}

function ProcessSection() {
  return (
    <section className="section-padding bg-white">
      <div className="container-premium">
        <div className="mb-10 flex flex-col gap-6 lg:mb-12 lg:flex-row lg:items-end lg:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-xl"
          >
            <p className="mb-4 text-[11px] font-semibold tracking-[0.28em] text-zinc-400 uppercase">
              How we work
            </p>
            <h2
              className="text-[clamp(2rem,4vw,3rem)] font-semibold tracking-[-0.04em] text-foreground"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              A proven process, refined over hundreds of launches.
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-md text-[15px] leading-[1.8] text-zinc-500"
          >
            Transparent milestones, weekly updates, and no surprises — from
            discovery through launch.
          </motion.p>
        </div>

        <Reveal>
          <div className="overflow-hidden rounded-2xl border border-black/[0.08] bg-[#0a0a0a] text-white">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3">
              {PROCESS_STEPS.map((step, i) => (
                <div
                  key={step.step}
                  className={cn(
                    "border-b border-dashed border-white/15 p-6 sm:p-7",
                    i < PROCESS_STEPS.length - 1 && "sm:border-r sm:[&:nth-child(2n)]:border-r-0",
                    i % 3 !== 2 && "lg:border-r"
                  )}
                >
                  <span className="text-[10px] font-bold tracking-[0.24em] text-zinc-600 uppercase">
                    {step.step}
                  </span>
                  <h3
                    className="mt-2 text-[15px] font-semibold tracking-[-0.02em] text-white"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {step.title}
                  </h3>
                  <p className="mt-1.5 text-[13px] leading-[1.65] text-zinc-500">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function TrustedSection() {
  return (
    <section className="border-y border-black/[0.06] bg-white py-14 sm:py-16">
      <div className="container-premium">
        <p className="mb-8 text-center text-[11px] font-semibold tracking-[0.28em] text-zinc-400 uppercase">
          Trusted by teams building with
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 sm:gap-x-14">
          {TRUSTED_LOGOS.map((logo) => (
            <div
              key={logo.name}
              className="flex h-8 items-center justify-center opacity-50 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
            >
              {logo.src ? (
                <Image
                  src={logo.src}
                  alt={logo.name}
                  width={100}
                  height={32}
                  className="h-7 w-auto object-contain"
                />
              ) : (
                <span className="text-[13px] font-semibold tracking-[0.12em] text-zinc-400 uppercase">
                  {logo.name}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutCta() {
  return (
    <section className="section-padding bg-secondary">
      <div className="container-premium">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-[1.75rem] px-7 py-12 sm:px-10 sm:py-14 lg:px-14 lg:py-16"
        >
          <Image
            src="/about/about-cta-bg.png"
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 1280px) 100vw, 1200px"
            priority={false}
          />
          <div
            className="pointer-events-none absolute inset-0 bg-[#0a0a0a]/72"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-0 opacity-70"
            aria-hidden="true"
            style={{
              backgroundImage:
                "radial-gradient(ellipse 55% 70% at 100% 0%, rgba(99,102,241,0.22), transparent 55%)",
            }}
          />

          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <span className="mb-5 inline-flex items-center gap-1.5 rounded-full border border-emerald-400/25 bg-emerald-400/[0.08] px-3.5 py-1.5 text-[9px] font-semibold tracking-[0.18em] text-emerald-300 uppercase">
                <Sparkles className="h-3 w-3" />
                Let&apos;s build
              </span>
              <h2
                className="text-[clamp(1.75rem,4vw,2.75rem)] font-semibold tracking-[-0.04em] text-white"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Ready to elevate your brand online?
              </h2>
              <p className="mt-4 text-[15px] leading-[1.8] text-white/55">
                Tell us about your project — custom build, template, or full
                redesign. We&apos;ll recommend the right path and respond within
                24 hours.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-[11px] font-bold tracking-[0.14em] text-black uppercase transition-all hover:bg-white/90"
              >
                Get in touch
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/pricing"
                className={cn(
                  "inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 text-[11px] font-bold tracking-[0.14em] text-white uppercase transition-all hover:bg-white/10"
                )}
              >
                View pricing
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function AboutPageContent() {
  return (
    <div className="relative min-h-screen bg-white">
      <GridBackground />
      <AboutHero />
      <StorySection />
      <ValuesSection />
      <ProcessSection />
      <TrustedSection />
      <AboutCta />
    </div>
  );
}
