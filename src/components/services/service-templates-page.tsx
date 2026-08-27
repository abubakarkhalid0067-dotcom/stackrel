"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Search } from "lucide-react";
import { getServiceBySlug, getTemplatesForService } from "@/lib/service-templates";
import { TemplateCard } from "@/components/templates/templates-page";

function GridBackground() {
  return (
    <div
      className="pointer-events-none absolute inset-0 opacity-[0.35]"
      aria-hidden="true"
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(0,0,0,0.04) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(0,0,0,0.04) 1px, transparent 1px)
        `,
        backgroundSize: "72px 72px",
      }}
    />
  );
}

export function ServiceTemplatesPageContent({ slug }: { slug: string }) {
  const service = getServiceBySlug(slug)!;

  const [search, setSearch] = useState("");
  const templates = useMemo(() => getTemplatesForService(service), [service]);

  const filtered = useMemo(() => {
    if (!search.trim()) return templates;
    const q = search.toLowerCase();
    return templates.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q) ||
        t.tags.some((tag) => tag.toLowerCase().includes(q))
    );
  }, [templates, search]);

  const Icon = service.icon;

  return (
    <div className="relative min-h-screen bg-[#fafafa]">
      <GridBackground />

      <section className="relative overflow-hidden pt-28 pb-10 sm:pt-32 sm:pb-12">
        <div className="container-premium relative">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <Link
              href="/#services"
              className="inline-flex items-center gap-2 text-[13px] font-medium text-zinc-500 transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to services
            </Link>
          </motion.div>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-end lg:gap-12">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
            >
              <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-black/[0.08] bg-white py-1.5 pr-4 pl-1.5 shadow-soft">
                <span className="rounded-full bg-accent px-3 py-1 text-[10px] font-semibold tracking-widest text-white uppercase">
                  {service.tag}
                </span>
                <span className="text-xs font-medium text-zinc-500">
                  {templates.length} template{templates.length !== 1 ? "s" : ""}
                </span>
              </div>

              <h1
                className="text-[clamp(2rem,4.5vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.04em] text-foreground"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {service.title}
              </h1>
              <p className="mt-4 max-w-2xl text-[16px] leading-[1.8] text-zinc-500">
                {service.description}
              </p>
            </motion.div>

            {service.image && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.1 }}
                className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] border border-black/[0.07] bg-white shadow-[0_24px_64px_-32px_rgba(0,0,0,0.12)]"
              >
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  unoptimized
                  className="object-contain object-center p-4"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute right-4 bottom-4 flex h-11 w-11 items-center justify-center rounded-full border border-black/[0.08] bg-white shadow-soft">
                  <Icon className="h-5 w-5 text-foreground/70" />
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {templates.length > 0 && (
        <section className="border-y border-black/[0.06] bg-white py-6">
          <div className="container-premium">
            <div className="relative max-w-md">
              <Search className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-zinc-400" />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search templates..."
                className="w-full rounded-full border border-black/[0.08] bg-[#fafafa] py-3 pr-4 pl-11 text-[14px] text-foreground outline-none transition-colors placeholder:text-zinc-400 focus:border-black/20"
              />
            </div>
          </div>
        </section>
      )}

      <section className="container-premium py-12 sm:py-16">
        {filtered.length === 0 ? (
          <div className="rounded-[1.625rem] border border-black/[0.07] bg-white py-20 text-center">
            <p className="text-[16px] font-medium text-foreground">
              {templates.length === 0
                ? "Custom service — no pre-built templates"
                : "No templates found"}
            </p>
            <p className="mt-2 text-[14px] text-zinc-500">
              {templates.length === 0
                ? "This is a bespoke service. Contact us for a tailored quote."
                : "Try a different search term."}
            </p>
            <Link
              href={templates.length === 0 ? "/contact" : "/templates"}
              className="mt-6 inline-flex items-center gap-2 text-[13px] font-medium text-foreground underline-offset-2 hover:underline"
            >
              {templates.length === 0 ? "Get in touch" : "View all templates"}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {filtered.map((template, i) => (
              <TemplateCard key={template.slug} template={template} index={i} />
            ))}
          </div>
        )}
      </section>

      <section className="border-t border-black/[0.06] bg-white py-14 sm:py-16">
        <div className="container-premium text-center">
          <h2
            className="text-[clamp(1.5rem,3vw,2rem)] font-semibold tracking-[-0.03em] text-foreground"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Need a custom {service.title.toLowerCase()} build?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-[15px] leading-[1.75] text-zinc-500">
            Our team can design and develop a fully custom solution tailored to
            your brand.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3.5 text-[11px] font-bold tracking-[0.14em] text-background uppercase transition-opacity hover:opacity-90"
          >
            Get in touch
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
