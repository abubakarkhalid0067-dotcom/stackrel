"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import { PRICING_PLANS } from "@/lib/constants";
import { formatPrice } from "@/lib/utils";
import { SectionHeader, Reveal } from "@/components/shared/section-header";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/effects/magnetic-button";
import { cn } from "@/lib/utils";

export function Pricing() {
  return (
    <section id="pricing" className="section-padding">
      <div className="container-premium">
        <SectionHeader
          badge="Pricing"
          title="Transparent pricing, exceptional value"
          subtitle="Choose the plan that fits your ambitions. Every package includes our premium design and development standards."
        />

        <div className="grid gap-6 lg:grid-cols-3">
          {PRICING_PLANS.map((plan, i) => (
            <Reveal key={plan.name} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -4 }}
                className={cn(
                  "relative flex h-full flex-col rounded-2xl border p-8 transition-shadow",
                  plan.highlighted
                    ? "border-accent bg-foreground text-background shadow-premium"
                    : "border-border bg-background shadow-soft hover:shadow-premium"
                )}
              >
                {plan.highlighted && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-4 py-1 text-xs font-semibold text-white">
                    Most Popular
                  </span>
                )}

                <h3
                  className="text-xl font-semibold"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {plan.name}
                </h3>
                <div className="mt-4">
                  {plan.price !== null ? (
                    <>
                      <span className="text-4xl font-bold">
                        {formatPrice(plan.price)}
                      </span>
                      <span
                        className={cn(
                          "ml-1 text-sm",
                          plan.highlighted ? "text-background/60" : "text-muted"
                        )}
                      >
                        / project
                      </span>
                    </>
                  ) : (
                    <span className="text-4xl font-bold">Custom</span>
                  )}
                </div>
                <p
                  className={cn(
                    "mt-3 text-sm leading-relaxed",
                    plan.highlighted ? "text-background/70" : "text-muted"
                  )}
                >
                  {plan.description}
                </p>

                <ul className="mt-8 flex-1 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm">
                      <Check
                        className={cn(
                          "mt-0.5 h-4 w-4 shrink-0",
                          plan.highlighted ? "text-accent" : "text-accent"
                        )}
                      />
                      <span
                        className={
                          plan.highlighted ? "text-background/90" : undefined
                        }
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <MagneticButton className="mt-8 w-full">
                  <Button
                    className="w-full"
                    variant={plan.highlighted ? "accent" : "default"}
                    asChild
                  >
                    <Link href="#contact">{plan.cta}</Link>
                  </Button>
                </MagneticButton>
              </motion.div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-12 text-center">
          <Link
            href="/pricing"
            className="group/link inline-flex items-center gap-2.5 border-b border-black/0 pb-1 text-[13px] font-medium tracking-[0.04em] text-foreground uppercase transition-all duration-300 hover:border-black/20 hover:opacity-70"
          >
            View Full Pricing
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
