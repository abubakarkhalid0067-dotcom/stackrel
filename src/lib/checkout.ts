import { PRICING_PLANS } from "@/lib/constants";
import { getProductBySlug } from "@/lib/products";

export type CheckoutData = {
  title: string;
  slug?: string;
  price: number | null;
  image?: string;
  category?: string;
  specs: { label: string; value: string }[];
  type: "template" | "custom";
  backHref: string;
};

export function getTemplateCheckout(slug: string): CheckoutData | null {
  const product = getProductBySlug(slug);
  if (!product) return null;

  return {
    title: product.title,
    slug: product.slug,
    price: product.price,
    image: product.detailImage ?? product.image,
    category: product.category,
    specs: product.specs,
    type: "template",
    backHref: `/templates/${product.slug}`,
  };
}

export function getCustomCheckout(planSlug: string): CheckoutData | null {
  const plan = PRICING_PLANS.find(
    (p) => p.name.toLowerCase() === planSlug.toLowerCase()
  );
  if (!plan) return null;

  return {
    title: `${plan.name} — Custom Website`,
    slug: planSlug.toLowerCase(),
    price: plan.price,
    category: "Custom Development",
    specs: [
      { label: "Plan", value: plan.name },
      { label: "Type", value: "Custom Website" },
      { label: "Delivery", value: plan.name === "Enterprise" ? "Priority" : "Standard" },
      { label: "License", value: "Full Ownership" },
    ],
    type: "custom",
    backHref: "/pricing",
  };
}

export const CUSTOM_PLAN_SLUGS = PRICING_PLANS.map((p) => p.name.toLowerCase());
