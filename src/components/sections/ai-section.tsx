"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useState } from "react";
import {
  ArrowRight,
  AudioLines,
  Bot,
  Cpu,
  Languages,
  Mic,
  Pause,
  Play,
  Sparkles,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { LineReveal } from "@/components/effects/text-reveal";
import { MagneticButton } from "@/components/effects/magnetic-button";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/shared/section-header";
import { cn } from "@/lib/utils";
import { VoiceAICard } from "@/components/sections/ai/voice-ai-card";
import { AIDevCodeDemo } from "@/components/sections/ai/ai-dev-code-demo";

function BentoCell({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "border-b border-dashed border-white/15 p-8 sm:p-10 lg:p-12",
        className
      )}
    >
      {children}
    </div>
  );
}

function PlayCircle({
  label,
  src,
  audioSrc,
}: {
  label: string;
  src: string;
  audioSrc?: string;
}) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleClick = async () => {
    if (!audioSrc || !audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      return;
    }

    try {
      audioRef.current.currentTime = 0;
      await audioRef.current.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-3">
      {audioSrc && (
        <audio
          ref={audioRef}
          src={audioSrc}
          preload="none"
          onEnded={() => setIsPlaying(false)}
          className="hidden"
        />
      )}
      <button
        type="button"
        onClick={audioSrc ? handleClick : undefined}
        className="group relative flex h-36 w-36 items-center justify-center overflow-hidden rounded-full sm:h-44 sm:w-44"
        aria-label={isPlaying ? `Pause ${label}` : `Play ${label}`}
      >
        <Image
          src={src}
          alt={label}
          fill
          loading="lazy"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="176px"
        />
        <div className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-black/20" />
        <div
          className={cn(
            "relative flex h-9 w-9 items-center justify-center rounded-full border border-white/40 bg-white/90 shadow-[0_4px_24px_rgba(0,0,0,0.18)] backdrop-blur-md transition-all duration-300 group-hover:scale-105 group-hover:bg-white sm:h-10 sm:w-10",
            isPlaying && "border-white/60 bg-white shadow-[0_4px_28px_rgba(0,0,0,0.25)]"
          )}
        >
          {isPlaying ? (
            <Pause className="h-3 w-3 fill-zinc-900 text-zinc-900" />
          ) : (
            <Play className="ml-0.5 h-3 w-3 fill-zinc-900 text-zinc-900" />
          )}
        </div>
      </button>
      <span className="text-sm text-zinc-500">{label}</span>
    </div>
  );
}

function FeatureRow({
  items,
}: {
  items: { icon: LucideIcon; title: string; description: string }[];
}) {
  return (
    <div className="grid border-t border-dashed border-white/15 md:grid-cols-3">
      {items.map((item, i) => (
        <BentoCell
          key={item.title}
          className={cn(i < 2 && "md:border-r")}
        >
          <item.icon className="mb-4 h-5 w-5 text-white/60" strokeWidth={1.5} />
          <h3 className="mb-2 text-base font-semibold">{item.title}</h3>
          <p className="text-sm leading-relaxed text-zinc-500">{item.description}</p>
        </BentoCell>
      ))}
    </div>
  );
}

const VOICE_FEATURES = [
  {
    icon: AudioLines,
    title: "Cinematic Voice Clarity",
    description:
      "Crystal-clear voice synthesis and transcription powered by cutting-edge AI models.",
  },
  {
    icon: Languages,
    title: "Real-Time Translation",
    description:
      "Instant multilingual speech across 70+ languages with natural tone and accent.",
  },
  {
    icon: Mic,
    title: "Natural Speech Synthesis",
    description:
      "Expressive, controllable TTS that sounds human — perfect for support and IVR.",
  },
] as const;

const AI_DEV_FEATURES = [
  {
    icon: Workflow,
    title: "Automation",
    description:
      "n8n workflows and AI-driven pipelines that eliminate manual work.",
  },
  {
    icon: Bot,
    title: "Agents",
    description:
      "Autonomous agents that research, plan, and execute complex tasks.",
  },
  {
    icon: Cpu,
    title: "RAG Systems",
    description:
      "Chat with your documents and data with accurate, cited answers.",
  },
] as const;

export function AISection() {
  return (
    <section id="ai" className="section-padding bg-black text-white">
      <div className="container-premium">
        <div className="mb-14 text-center sm:mb-20">
          <LineReveal>
            <p className="mb-6 text-[11px] font-medium tracking-[0.25em] text-zinc-500 uppercase">
              Intelligent Solutions
            </p>
          </LineReveal>

          <LineReveal delay={0.08}>
            <h2
              className="mx-auto max-w-4xl text-[clamp(2rem,4.8vw,3.5rem)] leading-[1.12] font-medium tracking-[-0.03em] text-white"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Everything you need to build with
              <br />
              <span
                className="mt-1 inline-block text-[clamp(2.25rem,5.2vw,4rem)] font-normal italic tracking-[-0.02em] text-white/95"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                AI
              </span>
            </h2>
          </LineReveal>

          <LineReveal delay={0.16}>
            <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-zinc-500 sm:text-base">
              Enterprise-grade AI development for teams that move fast and
              build what&apos;s next.
            </p>
          </LineReveal>
        </div>

        <Reveal>
          <div className="overflow-hidden rounded-2xl border border-dashed border-white/20">
            {/* Row 1 — Voice AI | GPT Apps */}
            <div className="grid lg:grid-cols-2">
              <BentoCell className="lg:border-r">
                <VoiceAICard />
                <h3 className="mb-2 text-xl font-semibold">One Click. Any Language.</h3>
                <p className="max-w-md text-sm leading-relaxed text-zinc-500">
                  Voice AI agents that speak naturally, translate in real-time,
                  and handle customer conversations 24/7.
                </p>
              </BentoCell>

              <BentoCell>
                <div className="mb-6 flex items-center gap-2.5">
                  <Image
                    src="/ai/openai-logo.png"
                    alt="OpenAI"
                    width={22}
                    height={22}
                    className="invert opacity-90"
                  />
                  <span className="text-sm font-medium tracking-[-0.01em] text-zinc-400">
                    GPT Apps
                  </span>
                </div>
                <div className="mb-8 flex items-center justify-center gap-10 sm:gap-14">
                  <PlayCircle
                    label="Standard"
                    src="/ai/standard.avif"
                    audioSrc="/ai/standard-audio.mp4"
                  />
                  <PlayCircle
                    label="AI Enhanced"
                    src="/ai/ai-enhanced.png"
                    audioSrc="/ai/ai-enhanced-audio.mp4"
                  />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Smart Apps, Instantly</h3>
                <p className="max-w-md text-sm leading-relaxed text-zinc-500">
                  <span className="inline-flex items-start gap-2">
                    <Image
                      src="/ai/openai-logo.png"
                      alt=""
                      width={16}
                      height={16}
                      className="mt-0.5 shrink-0 invert opacity-80"
                      aria-hidden
                    />
                    <span>
                      GPT-powered apps with custom knowledge bases, streaming
                      responses, and branded chat experiences your users will love.
                    </span>
                  </span>
                </p>
              </BentoCell>
            </div>

            {/* Voice — 3 features */}
            <FeatureRow items={[...VOICE_FEATURES]} />

            {/* AI Development code demo */}
            <BentoCell className="border-t">
              <AIDevCodeDemo />
              <h3 className="mt-8 mb-2 text-xl font-semibold">AI Development</h3>
              <p className="max-w-2xl text-sm leading-relaxed text-zinc-500">
                Production-grade LLM products with embeddings, agents, and scalable
                architecture — generated and refined in seconds.
              </p>
            </BentoCell>

            {/* AI Dev — 3 features */}
            <FeatureRow items={[...AI_DEV_FEATURES]} />

            {/* Tech stack */}
            <div className="grid border-t border-dashed border-white/15 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { name: "OpenAI", logo: "/ai/openai-logo.png", desc: "GPT-4 & Assistants API" },
                { name: "Claude", icon: Sparkles, desc: "Anthropic models" },
                { name: "n8n", icon: Workflow, desc: "Workflow automation" },
                { name: "MCP", icon: Bot, desc: "Context Protocol" },
              ].map((tool) => (
                <BentoCell
                  key={tool.name}
                  className="border-r border-dashed border-white/15 py-8 text-center last:border-r-0 sm:[&:nth-child(2n)]:border-r-0 lg:[&:nth-child(2n)]:border-r lg:[&:nth-child(4n)]:border-r-0 sm:py-10"
                >
                  {"logo" in tool && tool.logo ? (
                    <Image
                      src={tool.logo}
                      alt={tool.name}
                      width={20}
                      height={20}
                      className="mx-auto mb-3 invert opacity-70"
                    />
                  ) : (
                    tool.icon && (
                      <tool.icon className="mx-auto mb-3 h-5 w-5 text-white/50" strokeWidth={1.5} />
                    )
                  )}
                  <p className="font-semibold">{tool.name}</p>
                  <p className="mt-1 text-xs text-zinc-500">{tool.desc}</p>
                </BentoCell>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal className="mt-12 text-center">
          <MagneticButton>
            <Button
              size="lg"
              className="rounded-full bg-white text-black hover:bg-white/90"
              asChild
            >
              <Link href="#contact">
                Start Your AI Project
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </MagneticButton>
        </Reveal>
      </div>
    </section>
  );
}
