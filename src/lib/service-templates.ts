import { SERVICES, type Service } from "@/lib/constants";
import { TEMPLATE_LIST } from "@/lib/products";

export function getServiceBySlug(slug: string): Service | undefined {
  return SERVICES.find((service) => service.slug === slug);
}

export function getServiceSlugs(): string[] {
  return SERVICES.map((service) => service.slug);
}

export function getTemplatesForService(service: Service) {
  if (service.templateSlugs.length === 0) return [];

  const allowed = new Set(service.templateSlugs);
  return TEMPLATE_LIST.filter((template) => allowed.has(template.slug));
}
