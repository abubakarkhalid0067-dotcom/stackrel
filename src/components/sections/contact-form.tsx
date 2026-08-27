"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Send, CheckCircle2 } from "lucide-react";
import { contactSchema, type ContactFormData } from "@/lib/schemas";
import { SectionHeader, Reveal } from "@/components/shared/section-header";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const budgetOptions = [
  "Under $5,000",
  "$5,000 – $15,000",
  "$15,000 – $50,000",
  "$50,000+",
];

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (_data: ContactFormData) => {
    await new Promise((r) => setTimeout(r, 1200));
    setSubmitted(true);
    reset();
  };

  return (
    <section id="contact" className="section-padding bg-secondary">
      <div className="container-premium">
        <SectionHeader
          badge="Contact"
          title="Let's start your project"
          subtitle="Tell us about your vision and we'll get back to you within 24 hours with a tailored proposal."
        />

        <Reveal className="mx-auto max-w-2xl">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-2xl border border-border bg-background p-12 text-center shadow-soft"
            >
              <CheckCircle2 className="mx-auto h-12 w-12 text-accent" />
              <h3
                className="mt-4 text-xl font-semibold"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Message sent successfully!
              </h3>
              <p className="mt-2 text-muted">
                We&apos;ll be in touch within 24 hours. Thank you for reaching
                out.
              </p>
              <Button
                className="mt-6"
                variant="outline"
                onClick={() => setSubmitted(false)}
              >
                Send another message
              </Button>
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="rounded-2xl border border-border bg-background p-8 shadow-soft sm:p-10"
            >
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="John Doe" {...register("name")} />
                  {errors.name && (
                    <p className="text-xs text-red-500">{errors.name.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@company.com"
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="text-xs text-red-500">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div className="mt-6 space-y-2">
                <Label htmlFor="company">Company (optional)</Label>
                <Input
                  id="company"
                  placeholder="Your company name"
                  {...register("company")}
                />
              </div>

              <div className="mt-6 space-y-2">
                <Label htmlFor="budget">Project Budget</Label>
                <select
                  id="budget"
                  className="flex h-11 w-full rounded-xl border border-border bg-background px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  {...register("budget")}
                >
                  <option value="">Select a budget range</option>
                  {budgetOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                {errors.budget && (
                  <p className="text-xs text-red-500">{errors.budget.message}</p>
                )}
              </div>

              <div className="mt-6 space-y-2">
                <Label htmlFor="message">Project Details</Label>
                <textarea
                  id="message"
                  rows={5}
                  placeholder="Tell us about your project, goals, and timeline..."
                  className="flex w-full rounded-xl border border-border bg-background px-4 py-3 text-sm placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  {...register("message")}
                />
                {errors.message && (
                  <p className="text-xs text-red-500">{errors.message.message}</p>
                )}
              </div>

              <Button
                type="submit"
                size="lg"
                className="mt-8 w-full gap-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
                <Send className="h-4 w-4" />
              </Button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
