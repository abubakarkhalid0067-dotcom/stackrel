import type { Metadata } from "next";
import { AboutPageContent } from "@/components/about/about-page";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about STACKREL — a premium web development studio building custom websites, ecommerce, SaaS, AI experiences, and production-ready templates.",
  openGraph: {
    title: "About — STACKREL",
    description:
      "Design × engineering for ambitious brands. Custom builds and premium templates that launch faster without compromising quality.",
  },
};

export default function AboutPage() {
  return <AboutPageContent />;
}
