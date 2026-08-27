"use client";

import Lottie from "lottie-react";
import fireAnimation from "@/assets/lottie/fire.json";
import { cn } from "@/lib/utils";

const FIRE_ASPECT = 500 / 690;

type BrandLogoProps = {
  size?: number;
  showText?: boolean;
  className?: string;
  textClassName?: string;
  variant?: "serif" | "heading";
};

export function BrandLogo({
  size = 36,
  showText = true,
  className,
  textClassName,
  variant = "serif",
}: BrandLogoProps) {
  const height = size;
  const width = Math.round(size * FIRE_ASPECT);

  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span className="relative shrink-0 -translate-y-[3px]">
        <Lottie
          animationData={fireAnimation}
          loop
          className="block"
          style={{ width, height }}
        />
      </span>
      {showText && (
        <span
          className={cn("leading-none", textClassName)}
          style={{
            fontFamily:
              variant === "serif" ? "var(--font-serif)" : "var(--font-heading)",
          }}
        >
          STACKREL
        </span>
      )}
    </span>
  );
}

export function BrandMark({ size = 36, className }: { size?: number; className?: string }) {
  return <BrandLogo size={size} showText={false} className={className} />;
}
