"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/effects/magnetic-button";
import { Reveal } from "@/components/shared/section-header";

export function CTA() {
  return (
    <section className="section-padding">
      <div className="container-premium">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-foreground px-8 py-16 text-center sm:px-16 sm:py-24">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(37,99,235,0.3),transparent_60%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(124,58,237,0.2),transparent_60%)]" />

            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              className="absolute -top-32 -right-32 h-64 w-64 rounded-full border border-white/5"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full border border-white/5"
            />

            <div className="relative z-10">
              <h2
                className="text-3xl font-bold tracking-tight text-background sm:text-4xl lg:text-5xl"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Ready to Build Something Amazing?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-base text-background/70 sm:text-lg">
                Let&apos;s turn your vision into a premium digital experience
                that drives real business results. Book a free consultation today.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <MagneticButton>
                  <Button size="xl" variant="accent" asChild>
                    <Link href="/contact">
                      <Calendar className="h-4 w-4" />
                      Book a Free Consultation
                    </Link>
                  </Button>
                </MagneticButton>
                <MagneticButton>
                  <Button
                    size="xl"
                    variant="outline"
                    className="border-white/20 bg-transparent text-background hover:bg-white/10"
                    asChild
                  >
                    <Link href="/portfolio">
                      View Our Work
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </MagneticButton>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
