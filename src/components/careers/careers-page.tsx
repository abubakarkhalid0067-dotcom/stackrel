"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

const HERO_IMAGES = {
  portrait: "/careers/hero-portrait.avif",
  art: "/careers/hero-art.avif",
  office: "/careers/hero-office.avif",
  desk: "/careers/hero-desk.avif",
  team: "/careers/hero-team.avif",
  walk: "/careers/hero-walk.avif",
} as const;

const VALUES = [
  {
    title: "Autonomy",
    quote: "Own your work, shape your path.",
    description:
      "We trust you to make decisions, move fast, and take real ownership of the projects you lead — from first wireframe to final deploy.",
  },
  {
    title: "Precision",
    quote: "We sweat the small stuff.",
    description:
      "From product to process, we care deeply about doing things right. Well-crafted code, clear communication, and thoughtful design.",
  },
  {
    title: "Collaboration",
    quote: "We speak plainly and move together.",
    description:
      "No silos, no ego. Designers, developers, and strategists work side by side — honest feedback, shared wins, and real momentum.",
  },
  {
    title: "Growth",
    quote: "Learn constantly, ship confidently.",
    description:
      "You'll work on premium client builds, modern stacks, and challenging problems — with room to grow your craft every single week.",
  },
] as const;

const OPEN_ROLES = [
  {
    title: "Senior Frontend Engineer",
    team: "Engineering",
    location: "Remote · Full-time",
    type: "Engineering",
  },
  {
    title: "UI/UX Designer",
    team: "Design",
    location: "Remote · Full-time",
    type: "Design",
  },
  {
    title: "Project Manager",
    team: "Operations",
    location: "Remote · Full-time",
    type: "Operations",
  },
] as const;

const PERKS = [
  "Competitive salary & project bonuses",
  "Fully remote — work from anywhere",
  "Flexible hours across time zones",
  "Premium tools & learning budget",
  "Small team, high-impact projects",
  "Direct client exposure from day one",
] as const;

function CollageImage({
  src,
  alt,
  className,
  priority,
  rounded = "rounded-2xl",
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  rounded?: string;
}) {
  return (
    <div className={cn("relative overflow-hidden bg-[#ece8df]", rounded, className)}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 50vw, 220px"
        priority={priority}
      />
    </div>
  );
}

function CareersHero() {
  return (
    <section className="relative overflow-hidden bg-[#fcf9f4] pt-28 pb-4 sm:pt-32 lg:pb-8">
      <div className="relative mx-auto flex min-h-[560px] max-w-[1320px] flex-col items-center justify-center px-4 sm:min-h-[620px] lg:flex-row lg:px-6">
        {/* Left mosaic */}
        <div className="hidden h-[500px] w-[34%] shrink-0 lg:grid lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:grid-rows-2 lg:gap-3">
          <CollageImage
            src={HERO_IMAGES.portrait}
            alt="Team member"
            className="-ml-10 row-span-2 min-h-0"
            priority
            rounded="rounded-[1.25rem]"
          />
          <CollageImage
            src={HERO_IMAGES.art}
            alt="Office art"
            className="min-h-0"
            rounded="rounded-[1.15rem]"
          />
          <CollageImage
            src={HERO_IMAGES.office}
            alt="Office space"
            className="min-h-0"
            rounded="rounded-[1.15rem]"
          />
        </div>

        {/* Mobile / tablet collage */}
        <div className="order-1 mb-2 grid w-full max-w-lg grid-cols-3 gap-2 sm:max-w-2xl lg:hidden">
          <CollageImage
            src={HERO_IMAGES.portrait}
            alt="Team member"
            className="col-span-1 aspect-[3/4]"
            priority
          />
          <CollageImage
            src={HERO_IMAGES.art}
            alt="Office art"
            className="aspect-square"
          />
          <CollageImage
            src={HERO_IMAGES.desk}
            alt="Working at desk"
            className="aspect-square"
          />
          <CollageImage
            src={HERO_IMAGES.office}
            alt="Office space"
            className="col-span-2 aspect-[2/1]"
          />
          <CollageImage
            src={HERO_IMAGES.team}
            alt="Team collaboration"
            className="aspect-square"
          />
        </div>

        {/* Center copy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 order-2 w-full max-w-[520px] shrink-0 px-2 py-10 text-center lg:order-none lg:px-8 lg:py-0"
        >
          <p className="mb-5 text-[11px] font-semibold tracking-[0.3em] text-[#2d2a26]/45 uppercase">
            Careers at STACKREL
          </p>
          <h1
            className="text-[clamp(2.35rem,5.2vw,3.65rem)] leading-[1.06] font-semibold tracking-[-0.04em] text-[#2d2a26]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Build a career{" "}
            <span
              className="font-normal italic"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              with purpose.
            </span>
          </h1>
          <p className="mx-auto mt-5 max-w-[420px] text-[15px] leading-[1.85] text-[#2d2a26]/58 sm:text-[16px]">
            Join a team of smart, supportive people doing the most exciting work
            of their lives — and shaping the future of premium web experiences
            while they&apos;re at it.
          </p>
          <a
            href="#open-roles"
            className="mt-9 inline-flex items-center justify-center rounded-xl bg-[#2d2a26] px-8 py-3.5 text-[12px] font-semibold tracking-[0.06em] text-white transition-opacity hover:opacity-90"
          >
            See Open Positions
          </a>
        </motion.div>

        {/* Right mosaic */}
        <div className="hidden h-[500px] w-[34%] shrink-0 lg:grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:grid-rows-2 lg:gap-3">
          <CollageImage
            src={HERO_IMAGES.desk}
            alt="Working at desk"
            className="min-h-0"
            rounded="rounded-[1.15rem]"
          />
          <CollageImage
            src={HERO_IMAGES.walk}
            alt="Office hallway"
            className="-mr-10 row-span-2 min-h-0"
            rounded="rounded-[1.25rem]"
          />
          <CollageImage
            src={HERO_IMAGES.team}
            alt="Team collaboration"
            className="min-h-0"
            rounded="rounded-[1.15rem]"
          />
        </div>
      </div>
    </section>
  );
}

function ValuesCarousel() {
  const [active, setActive] = useState(0);
  const [layout, setLayout] = useState({ step: 0, cardWidth: 0 });
  const viewportRef = useRef<HTMLDivElement>(null);
  const maxIndex = Math.max(0, VALUES.length - 2);

  useEffect(() => {
    const measure = () => {
      const viewport = viewportRef.current;
      if (!viewport) return;
      const gap = window.innerWidth >= 640 ? 20 : 16;
      const cardWidth =
        window.innerWidth >= 640
          ? (viewport.offsetWidth - gap) / 2
          : viewport.offsetWidth - 40;
      setLayout({ step: cardWidth + gap, cardWidth });
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const prev = () => setActive((i) => Math.max(0, i - 1));
  const next = () => setActive((i) => Math.min(maxIndex, i + 1));

  return (
    <section className="bg-[#fcf9f4] py-16 sm:py-20 lg:py-24">
      <div className="container-premium">
        <h2
          className="mb-10 text-[clamp(2rem,4vw,3rem)] font-semibold tracking-[-0.04em] text-[#2d2a26] sm:mb-12"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          What guides us at STACKREL?
        </h2>

        <div ref={viewportRef} className="overflow-hidden">
          <motion.div
            className="flex gap-4 sm:gap-5"
            animate={{ x: -active * layout.step }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            {VALUES.map((value) => (
              <article
                key={value.title}
                style={layout.cardWidth ? { width: layout.cardWidth } : undefined}
                className="flex w-[calc(100%-2.5rem)] shrink-0 flex-col justify-between rounded-[1.75rem] bg-[#2d2a26] p-8 sm:min-h-[340px] sm:w-auto sm:p-10 lg:min-h-[360px] lg:p-12"
              >
                <div>
                  <h3
                    className="text-[clamp(1.65rem,2.8vw,2.15rem)] font-semibold tracking-[-0.03em] text-white"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {value.title}
                  </h3>
                  <p
                    className="mt-4 text-[clamp(1.25rem,2.2vw,1.65rem)] leading-[1.35] font-normal italic text-white/92"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {value.quote}
                  </p>
                </div>
                <p className="mx-auto mt-10 max-w-[300px] text-center text-[13px] leading-[1.75] text-white/42 sm:mt-12 sm:text-[14px]">
                  {value.description}
                </p>
              </article>
            ))}
          </motion.div>
        </div>

        <div className="mt-6 flex items-center gap-3">
          <button
            type="button"
            onClick={prev}
            disabled={active === 0}
            aria-label="Previous value"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-black/[0.1] bg-white text-[#2d2a26] transition-colors hover:bg-[#f0ece3] disabled:cursor-not-allowed disabled:opacity-35"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={next}
            disabled={active >= maxIndex}
            aria-label="Next value"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-black/[0.1] bg-white text-[#2d2a26] transition-colors hover:bg-[#f0ece3] disabled:cursor-not-allowed disabled:opacity-35"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

export function CareersPageContent() {
  return (
    <div className="min-h-screen bg-[#fcf9f4]">
      <CareersHero />

      <ValuesCarousel />

      {/* Perks */}
      <section className="border-y border-black/[0.06] bg-white py-16 sm:py-20">
        <div className="container-premium">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
            <div>
              <p className="mb-4 text-[11px] font-semibold tracking-[0.28em] text-zinc-400 uppercase">
                Why STACKREL
              </p>
              <h2
                className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold tracking-[-0.04em] text-foreground"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Work that matters, on a team that cares.
              </h2>
              <p className="mt-4 text-[15px] leading-[1.8] text-zinc-500">
                We&apos;re a small, focused agency building premium websites for
                brands that refuse to look ordinary. Every project is an opportunity
                to push your craft further.
              </p>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {PERKS.map((perk) => (
                <li
                  key={perk}
                  className="flex items-start gap-3 rounded-2xl border border-black/[0.06] bg-[#fafafa] px-4 py-3.5 text-[14px] leading-snug text-zinc-600"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  {perk}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Open roles */}
      <section id="open-roles" className="py-16 sm:py-20 lg:py-24">
        <div className="container-premium">
          <p className="mb-4 text-center text-[11px] font-semibold tracking-[0.28em] text-[#2d2a26]/45 uppercase">
            Open positions
          </p>
          <h2
            className="mb-12 text-center text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold tracking-[-0.04em] text-[#2d2a26]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Current openings
          </h2>

          <div className="mx-auto max-w-3xl space-y-3">
            {OPEN_ROLES.map((role, i) => (
              <motion.div
                key={role.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Link
                  href="/contact"
                  className="group flex items-center justify-between gap-4 rounded-2xl border border-black/[0.08] bg-white px-6 py-5 transition-all hover:-translate-y-0.5 hover:shadow-[0_16px_40px_-20px_rgba(0,0,0,0.12)] sm:px-8"
                >
                  <div>
                    <p
                      className="text-[17px] font-semibold tracking-[-0.02em] text-[#2d2a26] transition-colors group-hover:text-accent"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {role.title}
                    </p>
                    <div className="mt-1.5 flex flex-wrap items-center gap-3 text-[13px] text-zinc-500">
                      <span>{role.team}</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {role.location}
                      </span>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 shrink-0 text-zinc-400 transition-transform group-hover:translate-x-1 group-hover:text-[#2d2a26]" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-black/[0.06] bg-[#2d2a26] py-16 sm:py-20">
        <div className="container-premium text-center">
          <h2
            className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold tracking-[-0.04em] text-white"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Don&apos;t see your role?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-[15px] leading-[1.8] text-white/55">
            We&apos;re always looking for talented people. Send us your portfolio
            and tell us what you&apos;d love to work on.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-[11px] font-bold tracking-[0.14em] text-[#2d2a26] uppercase transition-opacity hover:opacity-90"
          >
            Get in touch
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
