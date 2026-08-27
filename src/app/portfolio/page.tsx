import type { Metadata } from "next";
import { PortfolioPageContent } from "@/components/portfolio/portfolio-page";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Explore STACKREL portfolio — live client sites, SaaS dashboards, ecommerce builds, and AI-powered demos. Real work, premium craft.",
  openGraph: {
    title: "Portfolio & Case Studies — STACKREL",
    description:
      "Live client projects and concept demos — see the quality we deliver for freight, SaaS, ecommerce, and AI.",
  },
};

export default function PortfolioPage() {
  return <PortfolioPageContent />;
}
