import { Hero } from "@/components/sections/hero";
import { TrustedBy } from "@/components/sections/trusted-by";
import { Services } from "@/components/sections/services";
import { Portfolio } from "@/components/sections/portfolio";
import { Templates } from "@/components/sections/templates";
import { WhyChoose } from "@/components/sections/why-choose";
import { Testimonials } from "@/components/sections/testimonials";
import { CTA } from "@/components/sections/cta";
import { AISection } from "@/components/sections/ai-section";

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
