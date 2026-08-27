"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FOOTER_LINKS, SOCIAL_LINKS } from "@/lib/constants";
import {
  IconTwitter,
  IconLinkedIn,
  IconInstagram,
  IconDribbble,
} from "@/components/icons/social";
import { newsletterSchema, type NewsletterFormData } from "@/lib/schemas";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/shared/section-header";
import { BrandLogo } from "@/components/shared/brand-logo";

const socialIcons = {
  Twitter: IconTwitter,
  LinkedIn: IconLinkedIn,
  Instagram: IconInstagram,
  Dribbble: IconDribbble,
} as const;

export function Footer() {
  const pathname = usePathname();
  const hideFooter =
    pathname.startsWith("/checkout") ||
    pathname === "/get-started" ||
    pathname === "/account" ||
    pathname === "/admin" ||
    pathname === "/cart";

  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
  });

  const onSubmit = async (_data: NewsletterFormData) => {
    await new Promise((r) => setTimeout(r, 800));
    setSubmitted(true);
    reset();
    setTimeout(() => setSubmitted(false), 3000);
  };

  if (hideFooter) return null;

  return (
    <footer className="border-t border-border bg-secondary">
      <div className="container-premium section-padding">
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <Link href="#home">
              <BrandLogo
                size={34}
                variant="heading"
                textClassName="text-2xl font-bold tracking-tight"
                className="text-foreground"
              />
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
              Premium web development agency crafting high-performance digital
              experiences for ambitious brands worldwide.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
              <p className="mb-3 text-sm font-medium">Subscribe to our newsletter</p>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="you@company.com"
                  className="bg-background"
                  {...register("email")}
                />
                <Button type="submit" disabled={isSubmitting}>
                  {submitted ? "Done!" : "Join"}
                </Button>
              </div>
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
              )}
            </form>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-7">
            <div className="grid gap-8 sm:grid-cols-3">
              <div>
                <h4 className="mb-4 text-sm font-semibold">Company</h4>
                <ul className="space-y-3">
                  {FOOTER_LINKS.company.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="mb-4 text-sm font-semibold">Resources</h4>
                <ul className="space-y-3">
                  {FOOTER_LINKS.resources.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="mb-4 text-sm font-semibold">Legal</h4>
                <ul className="space-y-3">
                  {FOOTER_LINKS.legal.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-border pt-8 sm:flex-row">
          <p className="text-sm text-muted">
            &copy; {new Date().getFullYear()} STACKREL. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {SOCIAL_LINKS.map((social) => {
              const Icon = socialIcons[social.label as keyof typeof socialIcons];
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-muted transition-all hover:border-foreground/20 hover:text-foreground"
                  aria-label={social.label}
                >
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
