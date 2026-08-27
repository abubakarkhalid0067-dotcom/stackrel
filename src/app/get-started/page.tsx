import type { Metadata } from "next";
import { Suspense } from "react";
import { GetStartedPageContent } from "@/components/get-started/get-started-page";

export const metadata: Metadata = {
  title: "Get Started",
  description:
    "Create your free STACKREL account — purchase templates, manage orders, and collaborate on custom projects.",
  openGraph: {
    title: "Get Started — STACKREL",
    description: "Create your premium STACKREL workspace in under a minute.",
  },
};

function GetStartedFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-black/10 border-t-black" />
    </div>
  );
}

export default function GetStartedPage() {
  return (
    <Suspense fallback={<GetStartedFallback />}>
      <GetStartedPageContent />
    </Suspense>
  );
}
