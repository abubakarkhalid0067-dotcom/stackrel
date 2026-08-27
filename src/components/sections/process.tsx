"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROCESS_STEPS } from "@/lib/constants";
import { SectionHeader } from "@/components/shared/section-header";

gsap.registerPlugin(ScrollTrigger);

export function Process() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".process-step").forEach((step, i) => {
        gsap.fromTo(
          step,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: step,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
            delay: i * 0.1,
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="section-padding">
      <div className="container-premium" ref={sectionRef}>
        <SectionHeader
          badge="Process"
          title="How we bring your vision to life"
          subtitle="A proven six-step process that ensures quality, transparency, and on-time delivery every time."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PROCESS_STEPS.map((step) => (
            <div
              key={step.step}
              className="process-step group relative overflow-hidden rounded-2xl border border-border bg-background p-8 shadow-soft transition-shadow hover:shadow-premium"
            >
              <span className="text-5xl font-bold text-foreground/5 transition-colors group-hover:text-accent/10">
                {step.step}
              </span>
              <h3
                className="mt-2 text-xl font-semibold"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {step.description}
              </p>
              <div className="absolute -right-4 -bottom-4 h-24 w-24 rounded-full bg-accent/5 transition-transform duration-500 group-hover:scale-150" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
