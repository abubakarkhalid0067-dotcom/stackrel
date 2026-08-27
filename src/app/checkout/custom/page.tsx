import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CheckoutPageContent } from "@/components/purchase/checkout-page";
import { CUSTOM_PLAN_SLUGS, getCustomCheckout } from "@/lib/checkout";

type PageProps = {
  searchParams: Promise<{ plan?: string }>;
};

export const metadata: Metadata = {
  title: "Checkout — Custom Website",
  description: "Complete your custom website project request with STACKREL.",
};

export default async function CustomCheckoutPage({ searchParams }: PageProps) {
  const { plan } = await searchParams;
  if (!plan || !CUSTOM_PLAN_SLUGS.includes(plan.toLowerCase())) notFound();

  const data = getCustomCheckout(plan);
  if (!data) notFound();

  return <CheckoutPageContent data={data} />;
}
