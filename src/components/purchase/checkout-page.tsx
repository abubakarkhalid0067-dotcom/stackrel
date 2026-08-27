"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CreditCard,
  Lock,
  Shield,
  Sparkles,
  Zap,
} from "lucide-react";
import type { CheckoutData } from "@/lib/checkout";
import { saveOrder } from "@/lib/dashboard";
import { useAuth } from "@/components/providers/auth-provider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { purchaseSchema, type PurchaseFormData } from "@/lib/schemas";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { PaymentSuccessConfetti, PaymentSuccessTick } from "@/components/purchase/payment-success-celebration";

const PAYMENT_METHODS = [
  { id: "card", label: "Credit / Debit Card", hasIcon: true },
  { id: "paypal", label: "PayPal", hasIcon: false },
  { id: "apple", label: "Apple Pay", hasIcon: false },
] as const;

function GridBackground() {
  return (
    <>
      <div className="pointer-events-none absolute inset-0 bg-white" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        aria-hidden="true"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0,0,0,0.035) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,0,0,0.035) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
          maskImage: "linear-gradient(to bottom, black 0%, black 40%, transparent 85%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 40%, transparent 85%)",
        }}
      />
    </>
  );
}

function OrderSummaryPanel({ data }: { data: CheckoutData }) {
  return (
    <div className="relative overflow-hidden rounded-[1.625rem] border border-black/[0.07] bg-white p-7 shadow-[0_32px_80px_-32px_rgba(0,0,0,0.14)] sm:p-8">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <p className="text-[10px] font-medium tracking-[0.3em] text-zinc-400 uppercase">
            Order summary
          </p>
          <p
            className="mt-3 text-[2.75rem] font-semibold leading-[0.95] tracking-[-0.055em]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {data.price !== null ? formatPrice(data.price) : "Custom"}
          </p>
        </div>
        <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-emerald-200/80 bg-emerald-50 px-3.5 py-1.5 text-[9px] font-semibold tracking-[0.2em] text-emerald-700 uppercase">
          <Sparkles className="h-3 w-3 text-emerald-600" />
          Premium
        </span>
      </div>

      {data.image && (
        <div className="relative mb-6 aspect-[16/10] overflow-hidden rounded-xl bg-zinc-100">
          <Image
            src={data.image}
            alt={data.title}
            fill
            unoptimized={data.image.startsWith("/")}
            className="object-cover"
            sizes="400px"
          />
        </div>
      )}

      <div className="mb-6">
        {data.category && (
          <p className="text-[10px] font-bold tracking-[0.18em] text-zinc-400 uppercase">
            {data.category}
          </p>
        )}
        <p
          className="mt-1 text-xl font-semibold tracking-[-0.03em]"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {data.title}
        </p>
      </div>

      <div className="mb-6 overflow-hidden rounded-2xl border border-black/[0.06] bg-zinc-50/60">
        <div className="grid grid-cols-2 divide-x divide-y divide-black/[0.05]">
          {data.specs.map((spec) => (
            <div key={spec.label} className="bg-white px-4 py-4">
              <p className="text-[9px] font-medium tracking-[0.24em] text-zinc-400 uppercase">
                {spec.label}
              </p>
              <p
                className="mt-2 text-[13px] font-medium tracking-[-0.02em]"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {spec.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3.5 border-t border-black/[0.06] pt-6">
        {[
          { icon: Zap, text: "Instant download after purchase" },
          { icon: Shield, text: "30-day money-back guarantee" },
          { icon: Lock, text: "Secure encrypted checkout" },
        ].map(({ icon: Icon, text }) => (
          <p
            key={text}
            className="flex items-center gap-3 text-[12px] tracking-[-0.01em] text-zinc-500"
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-black/[0.06] bg-zinc-50">
              <Icon className="h-3.5 w-3.5 text-zinc-400" strokeWidth={1.5} />
            </span>
            {text}
          </p>
        ))}
      </div>
    </div>
  );
}

function StepIndicator({ step, total }: { step: number; total: number }) {
  const labels = ["Details", "Payment", "Complete"];
  return (
    <div className="mb-10">
      <div className="flex items-center gap-2">
        {Array.from({ length: total }).map((_, i) => (
          <div key={i} className="flex flex-1 flex-col gap-2">
            <div
              className={cn(
                "h-1 rounded-full transition-all duration-500",
                i <= step ? "bg-black" : "bg-black/[0.08]"
              )}
            />
            <span
              className={cn(
                "text-[10px] font-semibold tracking-[0.14em] uppercase",
                i <= step ? "text-foreground" : "text-zinc-400"
              )}
            >
              {labels[i] ?? `Step ${i + 1}`}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function CheckoutPageContent({ data }: { data: CheckoutData }) {
  const { user } = useAuth();
  const isCustom = data.price === null || data.type === "custom";
  const formSteps = isCustom ? 1 : 2;

  const [step, setStep] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [processing, setProcessing] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [completed, setCompleted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PurchaseFormData>({
    resolver: zodResolver(purchaseSchema),
  });

  const persistOrder = async (id: string) => {
    if (!user) return;
    await saveOrder({
      id,
      userId: user.id,
      title: data.title,
      slug: data.slug,
      image: data.image,
      category: data.category,
      price: data.price,
      type: data.type,
      status: isCustom ? "pending" : "completed",
    });
  };

  const onSubmitDetails = async () => {
    if (isCustom) {
      setProcessing(true);
      await new Promise((r) => setTimeout(r, 1400));
      const id = `SR-${Date.now().toString(36).toUpperCase()}`;
      setOrderId(id);
      await persistOrder(id);
      setCompleted(true);
      setProcessing(false);
      return;
    }
    setStep(1);
  };

  const onCompletePayment = async () => {
    setProcessing(true);
    await new Promise((r) => setTimeout(r, 1800));
    const id = `SR-${Date.now().toString(36).toUpperCase()}`;
    setOrderId(id);
    await persistOrder(id);
    setCompleted(true);
    setProcessing(false);
  };

  return (
    <div className="relative min-h-screen bg-white pt-[4.5rem] sm:pt-20">
      <PaymentSuccessConfetti show={completed} />
      <GridBackground />

      <div className="container-premium relative py-8 sm:py-12">
        {!completed && (
          <div className="mb-8 lg:hidden">
            <StepIndicator step={step} total={formSteps} />
          </div>
        )}

        <div className="grid gap-10 lg:grid-cols-[1fr_400px] lg:gap-14 xl:grid-cols-[1fr_420px]">
          {/* Main form */}
          <div className="order-2 lg:order-1">
            <AnimatePresence mode="wait">
              {completed ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-[1.625rem] border border-black/[0.07] bg-white px-8 py-16 text-center shadow-[0_24px_64px_-32px_rgba(0,0,0,0.12)] sm:px-12"
                >
                  <PaymentSuccessTick className="mb-2" />
                  <h1
                    className="text-3xl font-semibold tracking-[-0.04em] sm:text-4xl"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {isCustom ? "Request Received!" : "Payment Successful!"}
                  </h1>
                  <p className="mx-auto mt-4 max-w-md text-[16px] leading-relaxed text-zinc-500">
                    {isCustom
                      ? "Our team will contact you within 24 hours with a tailored proposal."
                      : "Check your email for the download link and license details."}
                  </p>
                  {orderId && (
                    <p className="mt-6 font-mono text-sm text-zinc-400">Order ID: {orderId}</p>
                  )}
                  <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                    {user && (
                      <Link
                        href="/account"
                        className="inline-flex items-center gap-2 rounded-full bg-black px-8 py-4 text-[12px] font-bold tracking-[0.12em] text-white uppercase transition-all hover:bg-black/90"
                      >
                        Go to Dashboard
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    )}
                    <Link
                      href={data.backHref}
                      className={cn(
                        "inline-flex items-center gap-2 rounded-full px-8 py-4 text-[12px] font-bold tracking-[0.12em] uppercase transition-all",
                        user
                          ? "border border-black/[0.12] text-foreground hover:bg-zinc-50"
                          : "bg-black text-white hover:bg-black/90"
                      )}
                    >
                      Continue
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key={`step-${step}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-[1.625rem] border border-black/[0.07] bg-white p-7 shadow-[0_24px_64px_-32px_rgba(0,0,0,0.1)] sm:p-9"
                >
                  <div className="hidden lg:block">
                    <StepIndicator step={step} total={formSteps} />
                  </div>

                  {step === 0 && (
                    <form onSubmit={handleSubmit(onSubmitDetails)} className="space-y-6">
                      <div>
                        <h1
                          className="text-2xl font-semibold tracking-[-0.03em] sm:text-3xl"
                          style={{ fontFamily: "var(--font-heading)" }}
                        >
                          Your Details
                        </h1>
                        <p className="mt-2 text-[15px] text-zinc-500">
                          Enter your information to complete the purchase.
                        </p>
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            placeholder="John Doe"
                            {...register("name")}
                            className="h-12 rounded-xl border-black/[0.08]"
                          />
                          {errors.name && (
                            <p className="text-xs text-red-500">{errors.name.message}</p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="you@company.com"
                            {...register("email")}
                            className="h-12 rounded-xl border-black/[0.08]"
                          />
                          {errors.email && (
                            <p className="text-xs text-red-500">{errors.email.message}</p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="company">
                            Company <span className="text-zinc-400">(optional)</span>
                          </Label>
                          <Input
                            id="company"
                            placeholder="Your company"
                            {...register("company")}
                            className="h-12 rounded-xl border-black/[0.08]"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={processing}
                        className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-black py-4 text-[12px] font-bold tracking-[0.14em] text-white uppercase transition-all hover:bg-black/90 disabled:opacity-60"
                      >
                        <span
                          className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-[100%]"
                          aria-hidden="true"
                        />
                        <span className="relative">
                          {processing
                            ? "Processing..."
                            : isCustom
                              ? "Submit Request"
                              : "Continue to Payment"}
                        </span>
                        {!processing && <ArrowRight className="relative h-4 w-4" />}
                      </button>
                    </form>
                  )}

                  {step === 1 && !isCustom && (
                    <div className="space-y-6">
                      <div>
                        <h1
                          className="text-2xl font-semibold tracking-[-0.03em] sm:text-3xl"
                          style={{ fontFamily: "var(--font-heading)" }}
                        >
                          Payment
                        </h1>
                        <p className="mt-2 text-[15px] text-zinc-500">
                          Choose your payment method and complete your order.
                        </p>
                      </div>

                      <div className="space-y-2.5">
                        {PAYMENT_METHODS.map((method) => (
                          <button
                            key={method.id}
                            type="button"
                            onClick={() => setPaymentMethod(method.id)}
                            className={cn(
                              "flex w-full items-center gap-3 rounded-xl border px-4 py-4 text-left transition-all",
                              paymentMethod === method.id
                                ? "border-black bg-black/[0.02] ring-1 ring-black"
                                : "border-black/[0.08] hover:border-black/20"
                            )}
                          >
                            <span
                              className={cn(
                                "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2",
                                paymentMethod === method.id
                                  ? "border-black bg-black"
                                  : "border-zinc-300"
                              )}
                            >
                              {paymentMethod === method.id && (
                                <Check className="h-3 w-3 text-white" strokeWidth={3} />
                              )}
                            </span>
                            {method.hasIcon && (
                              <CreditCard className="h-5 w-5 text-zinc-600" />
                            )}
                            <span className="text-sm font-medium text-zinc-700">
                              {method.label}
                            </span>
                          </button>
                        ))}
                      </div>

                      {paymentMethod === "card" && (
                        <div className="space-y-3 rounded-xl border border-black/[0.06] bg-[#fafafa] p-5">
                          <Input
                            placeholder="Card number"
                            className="h-12 rounded-xl border-black/[0.08] bg-white"
                          />
                          <div className="grid grid-cols-2 gap-3">
                            <Input
                              placeholder="MM / YY"
                              className="h-12 rounded-xl border-black/[0.08] bg-white"
                            />
                            <Input
                              placeholder="CVC"
                              className="h-12 rounded-xl border-black/[0.08] bg-white"
                            />
                          </div>
                        </div>
                      )}

                      <p className="flex items-center gap-2 text-[12px] text-zinc-400">
                        <Lock className="h-3.5 w-3.5" />
                        256-bit SSL encrypted · Powered by Stripe
                      </p>

                      <div className="flex gap-3">
                        <button
                          type="button"
                          onClick={() => setStep(0)}
                          className="flex flex-1 items-center justify-center gap-2 rounded-full border border-black/[0.1] py-4 text-[11px] font-semibold tracking-[0.12em] uppercase transition-colors hover:bg-zinc-50"
                        >
                          <ArrowLeft className="h-4 w-4" />
                          Back
                        </button>
                        <button
                          type="button"
                          onClick={onCompletePayment}
                          disabled={processing}
                          className="group relative flex flex-[2] items-center justify-center gap-2 overflow-hidden rounded-full bg-black py-4 text-[12px] font-bold tracking-[0.14em] text-white uppercase transition-all hover:bg-black/90 disabled:opacity-60"
                        >
                          <span className="relative">
                            {processing
                              ? "Processing..."
                              : `Pay ${data.price !== null ? formatPrice(data.price) : ""}`}
                          </span>
                        </button>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar summary */}
          <div className="order-1 lg:order-2 lg:sticky lg:top-28 lg:self-start">
            <OrderSummaryPanel data={data} />
          </div>
        </div>
      </div>
    </div>
  );
}
