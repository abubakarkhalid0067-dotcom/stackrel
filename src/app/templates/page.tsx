import type { Metadata } from "next";
import { TemplatesPageContent } from "@/components/templates/templates-page";

export const metadata: Metadata = {
  title: "Templates",
  description:
    "Premium Framer & React templates from STACKREL — production-ready, fully customizable, one-time purchase. Launch your site in hours.",
  openGraph: {
    title: "Premium Templates — STACKREL",
    description:
      "Browse premium website templates — buy once, customize freely, launch instantly.",
  },
};

export default function TemplatesPage() {
  return <TemplatesPageContent />;
}
