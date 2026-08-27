import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CheckoutPageContent } from "@/components/purchase/checkout-page";
import { getTemplateCheckout } from "@/lib/checkout";
import { PRODUCTS } from "@/lib/products";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = getTemplateCheckout(slug);
  if (!data) return { title: "Checkout" };

  return {
    title: `Checkout — ${data.title}`,
    description: `Complete your purchase of ${data.title}.`,
  };
}

export default async function TemplateCheckoutPage({ params }: PageProps) {
  const { slug } = await params;
  const data = getTemplateCheckout(slug);
  if (!data) notFound();

  return <CheckoutPageContent data={data} />;
}
