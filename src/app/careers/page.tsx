import type { Metadata } from "next";
import { CareersPageContent } from "@/components/careers/careers-page";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join STACKREL — build a career with purpose. Remote roles in design, engineering, and project management for premium web experiences.",
  openGraph: {
    title: "Careers at STACKREL",
    description:
      "Join a team building premium web experiences. See open positions and apply today.",
  },
};

export default function CareersPage() {
  return <CareersPageContent />;
}
