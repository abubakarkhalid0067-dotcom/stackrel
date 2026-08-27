"use client";

import { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { contactPageSchema, type ContactPageFormData } from "@/lib/schemas";
import { cn } from "@/lib/utils";

const CONTACT_INFO = [
  { label: "Email", value: "hello@stackrel.com", href: "mailto:hello@stackrel.com" },
  { label: "Phone number", value: "(123) 456 7890", href: "tel:+11234567890" },
  { label: "Location", value: "California, USA" },
] as const;

const fieldClass =
  "flex h-12 w-full rounded-full border border-black/[0.1] bg-white px-5 text-[15px] text-foreground placeholder:text-zinc-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/10";

const labelClass = "mb-2 block text-[13px] font-medium text-foreground";

export function ContactPageContent() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactPageFormData>({
    resolver: zodResolver(contactPageSchema),
  });

  const onSubmit = async (_data: ContactPageFormData) => {
    await new Promise((r) => setTimeout(r, 1200));
    setSubmitted(true);
    reset();
  };

  return (
    <div className="min-h-screen bg-white pt-28 pb-20 sm:pt-32 sm:pb-28">
      <div className="container-premium">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <h1
            className="text-[clamp(2.5rem,6vw,4rem)] font-semibold tracking-[-0.04em] text-foreground"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Get in Touch
          </h1>
          <p className="mt-5 max-w-xl text-[16px] leading-[1.8] tracking-[-0.015em] text-zinc-500 sm:text-[17px]">
            Have a question about a project, template, or partnership? We&apos;d
            love to hear from you and will get back soon.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16 xl:gap-20">
          {/* Left — image + contact info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-zinc-100 sm:aspect-[5/6]">
              <Image
                src="/contact/hero.jpg"
                alt="Team member ready to help with your project"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 45vw"
                priority
              />
            </div>

            <div className="mt-8 grid gap-6 sm:grid-cols-3 sm:gap-4">
              {CONTACT_INFO.map((item) => (
                <div key={item.label}>
                  <p className="text-[12px] font-medium text-zinc-400">{item.label}</p>
                  {"href" in item && item.href ? (
                    <a
                      href={item.href}
                      className="mt-1.5 block text-[14px] font-medium text-foreground transition-opacity hover:opacity-60"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="mt-1.5 text-[14px] font-medium text-foreground">
                      {item.value}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
          >
            {submitted ? (
              <div className="flex h-full min-h-[420px] flex-col items-center justify-center rounded-[1.75rem] border border-black/[0.07] bg-[#fafafa] px-8 py-12 text-center">
                <CheckCircle2 className="h-12 w-12 text-emerald-500" />
                <h2
                  className="mt-5 text-xl font-semibold tracking-[-0.03em]"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Message sent!
                </h2>
                <p className="mt-3 max-w-sm text-[15px] leading-[1.7] text-zinc-500">
                  Thanks for reaching out. Our team will get back to you within 24
                  hours.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-8 rounded-full border border-black/[0.12] px-6 py-3 text-[13px] font-medium transition-colors hover:bg-zinc-50"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label htmlFor="name" className={labelClass}>
                    Name
                  </label>
                  <input
                    id="name"
                    placeholder="Your full name"
                    className={fieldClass}
                    {...register("name")}
                  />
                  {errors.name && (
                    <p className="mt-1.5 text-xs text-red-500">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className={labelClass}>
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Your email address"
                    className={fieldClass}
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="mt-1.5 text-xs text-red-500">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className={labelClass}>
                    Phone
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="Your phone number"
                    className={fieldClass}
                    {...register("phone")}
                  />
                  {errors.phone && (
                    <p className="mt-1.5 text-xs text-red-500">{errors.phone.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className={labelClass}>
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    placeholder="Tell us about your project or question..."
                    className={cn(
                      fieldClass,
                      "h-auto min-h-[140px] resize-none rounded-[1.25rem] py-4 leading-[1.6]"
                    )}
                    {...register("message")}
                  />
                  {errors.message && (
                    <p className="mt-1.5 text-xs text-red-500">{errors.message.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-2 w-full rounded-full bg-black py-4 text-[13px] font-semibold tracking-[0.06em] text-white uppercase transition-all hover:bg-black/90 disabled:opacity-60"
                >
                  {isSubmitting ? "Sending..." : "Submit"}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
