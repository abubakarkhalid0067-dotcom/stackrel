import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/templates/product-detail";
import { PRODUCTS, getProductBySlug } from "@/lib/products";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return PRODUCTS.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product Not Found" };

  return {
    title: product.title,
    description: product.shortDescription,
    openGraph: {
      title: `${product.title} — STACKREL Template`,
      description: product.shortDescription,
      images: [{ url: product.image }],
    },
  };
}

export default async function TemplateProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) notFound();

  return <ProductDetail product={product} />;
}
