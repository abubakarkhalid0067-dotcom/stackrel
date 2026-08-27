import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceTemplatesPageContent } from "@/components/services/service-templates-page";
import { getServiceBySlug, getServiceSlugs } from "@/lib/service-templates";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return { title: "Service Not Found" };

  return {
    title: `${service.title} Templates`,
    description: `${service.description} Browse premium STACKREL templates for ${service.title.toLowerCase()}.`,
    openGraph: {
      title: `${service.title} Templates — STACKREL`,
      description: service.description,
    },
  };
}

export default async function ServiceTemplatesPage({ params }: PageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) notFound();

  return <ServiceTemplatesPageContent slug={slug} />;
}
