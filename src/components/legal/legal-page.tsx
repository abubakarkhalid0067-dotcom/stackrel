"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { LegalDocument } from "@/lib/legal";
import { LEGAL_PAGES } from "@/lib/legal";

function LegalNav({ currentSlug }: { currentSlug: string }) {
  return (
    <nav
      aria-label="Legal pages"
      className="mt-8 flex flex-wrap gap-2 sm:gap-3"
    >
      {LEGAL_PAGES.map((page) => {
        const isActive = page.slug === currentSlug;
        return (
          <Link
            key={page.slug}
            href={`/${page.slug}`}
            className={
              isActive
                ? "rounded-full bg-[#2d2a26] px-4 py-2 text-[12px] font-semibold tracking-[0.04em] text-white"
                : "rounded-full border border-black/[0.08] bg-white px-4 py-2 text-[12px] font-medium tracking-[0.04em] text-zinc-500 transition-colors hover:border-black/[0.14] hover:text-foreground"
            }
          >
            {page.title}
          </Link>
        );
      })}
    </nav>
  );
}

export function LegalPageContent({ document }: { document: LegalDocument }) {
  return (
    <div className="min-h-screen bg-[#fcf9f4] pt-28 pb-20 sm:pt-32 sm:pb-28">
      <div className="container-premium">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <p className="text-[11px] font-semibold tracking-[0.28em] text-[#2d2a26]/45 uppercase">
            Legal
          </p>
          <h1
            className="mt-4 text-[clamp(2.25rem,5vw,3.5rem)] font-semibold tracking-[-0.04em] text-[#2d2a26]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {document.title}
          </h1>
          <p className="mt-5 max-w-2xl text-[16px] leading-[1.85] text-[#2d2a26]/58">
            {document.description}
          </p>
          <p className="mt-4 text-[13px] text-[#2d2a26]/45">
            Last updated: {document.lastUpdated}
          </p>
          <LegalNav currentSlug={document.slug} />
        </motion.div>

        <motion.article
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-14 max-w-3xl rounded-[1.75rem] border border-black/[0.06] bg-white px-6 py-10 sm:px-10 sm:py-12 lg:px-12"
        >
          <div className="space-y-12">
            {document.sections.map((section) => (
              <section key={section.id} id={section.id}>
                <h2
                  className="text-[clamp(1.25rem,2.5vw,1.6rem)] font-semibold tracking-[-0.03em] text-[#2d2a26]"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {section.heading}
                </h2>

                {section.paragraphs?.map((paragraph, index) => (
                  <p
                    key={index}
                    className="mt-4 text-[15px] leading-[1.85] text-zinc-600"
                  >
                    {paragraph}
                  </p>
                ))}

                {section.list && (
                  <ul className="mt-4 space-y-3">
                    {section.list.map((item, index) => (
                      <li
                        key={index}
                        className="flex gap-3 text-[15px] leading-[1.75] text-zinc-600"
                      >
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#2d2a26]/30" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>
        </motion.article>
      </div>
    </div>
  );
}
