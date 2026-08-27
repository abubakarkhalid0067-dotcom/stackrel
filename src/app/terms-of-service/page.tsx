import type { Metadata } from "next";
import { LegalPageContent } from "@/components/legal/legal-page";
import { TERMS_OF_SERVICE } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: TERMS_OF_SERVICE.description,
  openGraph: {
    title: "Terms of Service — STACKREL",
    description: TERMS_OF_SERVICE.description,
  },
};

export default function TermsOfServicePage() {
  return <LegalPageContent document={TERMS_OF_SERVICE} />;
}
