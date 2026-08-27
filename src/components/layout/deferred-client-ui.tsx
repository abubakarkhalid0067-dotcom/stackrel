"use client";

import dynamic from "next/dynamic";

const CustomCursor = dynamic(
  () => import("@/components/effects/custom-cursor").then((m) => m.CustomCursor),
  { ssr: false }
);

const PremiumEffects = dynamic(
  () =>
    import("@/components/effects/premium-effects").then((m) => m.PremiumEffects),
  { ssr: false }
);

export const DeferredCartDrawer = dynamic(
  () => import("@/components/cart/cart-drawer").then((m) => m.CartDrawer),
  { ssr: false }
);

export function DeferredEffects() {
  return (
    <>
      <CustomCursor />
      <PremiumEffects />
    </>
  );
}
