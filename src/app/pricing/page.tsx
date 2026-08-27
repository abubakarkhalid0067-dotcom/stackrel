import type { Metadata } from "next";
import { PricingPageContent } from "@/components/pricing/pricing-page";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Custom website development pricing and premium template products. Transparent plans for businesses and instant-buy templates from STACKREL.",
  openGraph: {
    title: "Pricing — STACKREL",
    description:
      "Custom website packages and premium templates — simple, transparent pricing.",
  },
};

export default function PricingPage() {
  return <PricingPageContent />;
}
