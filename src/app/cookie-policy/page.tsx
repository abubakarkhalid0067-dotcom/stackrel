import type { Metadata } from "next";
import { LegalPageContent } from "@/components/legal/legal-page";
import { COOKIE_POLICY } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: COOKIE_POLICY.description,
  openGraph: {
    title: "Cookie Policy — STACKREL",
    description: COOKIE_POLICY.description,
  },
};

export default function CookiePolicyPage() {
  return <LegalPageContent document={COOKIE_POLICY} />;
}
