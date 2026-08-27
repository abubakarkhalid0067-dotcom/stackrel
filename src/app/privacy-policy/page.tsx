import type { Metadata } from "next";
import { LegalPageContent } from "@/components/legal/legal-page";
import { PRIVACY_POLICY } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: PRIVACY_POLICY.description,
  openGraph: {
    title: "Privacy Policy — STACKREL",
    description: PRIVACY_POLICY.description,
  },
};

export default function PrivacyPolicyPage() {
  return <LegalPageContent document={PRIVACY_POLICY} />;
}
