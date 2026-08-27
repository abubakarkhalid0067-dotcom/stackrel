import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/hero";

const TrustedBy = dynamic(
  () => import("@/components/sections/trusted-by").then((m) => m.TrustedBy)
);
const Services = dynamic(
  () => import("@/components/sections/services").then((m) => m.Services)
);
const AISection = dynamic(
  () => import("@/components/sections/ai-section").then((m) => m.AISection)
);
const Portfolio = dynamic(
  () => import("@/components/sections/portfolio").then((m) => m.Portfolio)
);
const Templates = dynamic(
  () => import("@/components/sections/templates").then((m) => m.Templates)
);
const WhyChoose = dynamic(
  () => import("@/components/sections/why-choose").then((m) => m.WhyChoose)
);
const Testimonials = dynamic(
  () => import("@/components/sections/testimonials").then((m) => m.Testimonials)
);
const CTA = dynamic(() => import("@/components/sections/cta").then((m) => m.CTA));

export default function Home() {
  return (
    <>
      <Hero />
      <TrustedBy />
      <Services />
      <AISection />
      <Portfolio />
      <Templates />
      <WhyChoose />
      <Testimonials />
      <CTA />
    </>
  );
}
