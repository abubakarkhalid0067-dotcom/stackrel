"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { WHY_CHOOSE } from "@/lib/constants";
import { SectionHeader, Reveal } from "@/components/shared/section-header";

gsap.registerPlugin(ScrollTrigger);

export function WhyChoose() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!timelineRef.current || !lineRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 70%",
            end: "bottom 60%",
            scrub: 1,
          },
        }
      );
    }, timelineRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="section-padding bg-secondary">
      <div className="container-premium">
        <SectionHeader
          badge="Why STACKREL"
          title="Built different. Built better."
          subtitle="We combine world-class design with engineering excellence to deliver websites that outperform the competition."
        />

        <div ref={timelineRef} className="relative mx-auto max-w-3xl">
          <div className="absolute top-0 left-6 h-full w-px origin-top bg-border md:left-1/2 md:-translate-x-px">
            <div
              ref={lineRef}
              className="h-full w-full origin-top bg-accent"
            />
          </div>

          <div className="space-y-12">
            {WHY_CHOOSE.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.08}>
                <div
                  className={`relative flex items-start gap-6 md:gap-0 ${
                    i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div className="hidden flex-1 md:block" />
                  <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-accent bg-background shadow-soft md:absolute md:left-1/2 md:-translate-x-1/2">
                    <item.icon className="h-5 w-5 text-accent" />
                  </div>
                  <div
                    className={`flex-1 rounded-2xl border border-border bg-background p-6 shadow-soft md:max-w-[calc(50%-3rem)] ${
                      i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12 md:ml-auto"
                    }`}
                  >
                    <h3
                      className="mb-2 font-semibold"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted">
                      {item.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
