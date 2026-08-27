"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CreditCard,
  Lock,
  Shield,
} from "lucide-react";
import { useAuth } from "@/components/providers/auth-provider";
import { useCart } from "@/components/providers/cart-provider";
import { saveOrder } from "@/lib/dashboard";
import { purchaseSchema, type PurchaseFormData } from "@/lib/schemas";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { PaymentSuccessConfetti, PaymentSuccessTick } from "@/components/purchase/payment-success-celebration";

const PAYMENT_METHODS = [
  { id: "card", label: "Credit / Debit Card" },
  { id: "paypal", label: "PayPal" },
  { id: "apple", label: "Apple Pay" },
];

export function CartCheckoutContent() {
  const router = useRouter();
  const { user } = useAuth();
  const { items, total, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [processing, setProcessing] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [orderIds, setOrderIds] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PurchaseFormData>({
    resolver: zodResolver(purchaseSchema),
  });

  useEffect(() => {
    if (items.length === 0 && !completed) {
      router.replace("/cart");
    }
  }, [items.length, completed, router]);

  const onSubmit = async () => {
    setProcessing(true);
    await new Promise((r) => setTimeout(r, 1800));
    const ids: string[] = [];

    for (const [index, item] of items.entries()) {
      const id = `SR-${Date.now().toString(36).toUpperCase()}${index}`;
      ids.push(id);
      if (user) {
        await saveOrder({
          id,
          userId: user.id,
          title: item.title,
          slug: item.slug,
          image: item.image,
          category: item.category,
          price: item.price,
          type: "template",
          status: "completed",
        });
      }
    }

    setOrderIds(ids);
    clearCart();
    setCompleted(true);
    setProcessing(false);
  };

  if (items.length === 0 && !completed) return null;

  return (
    <div className="relative min-h-screen bg-white pt-[4.5rem] sm:pt-20">
      <PaymentSuccessConfetti show={completed} />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.3]"
        aria-hidden="true"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0,0,0,0.035) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,0,0,0.035) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
        }}
      />

      <div className="container-premium relative py-8 sm:py-12">
        {completed ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto max-w-lg rounded-[1.625rem] border border-black/[0.07] bg-white px-8 py-16 text-center shadow-[0_24px_64px_-32px_rgba(0,0,0,0.12)]"
          >
            <PaymentSuccessTick className="mb-2" />
            <h1
              className="text-3xl font-semibold tracking-[-0.04em]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Payment Successful!
            </h1>
            <p className="mt-4 text-[15px] leading-relaxed text-zinc-500">
              {orderIds.length} template{orderIds.length > 1 ? "s" : ""} purchased.
              Check your email for download links.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              {user && (
                <Link
                  href="/account"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-black px-8 py-4 text-[12px] font-bold tracking-[0.12em] text-white uppercase"
                >
                  Go to Dashboard
                  <ArrowRight className="h-4 w-4" />
                </Link>
              )}
              <Link
                href="/templates"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-black/[0.12] px-8 py-4 text-[12px] font-bold tracking-[0.12em] uppercase"
              >
                Continue Shopping
              </Link>
            </div>
          </motion.div>
        ) : (
          <div className="grid gap-10 lg:grid-cols-[1fr_400px]">
            <motion.form
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={handleSubmit(onSubmit)}
              className="rounded-[1.625rem] border border-black/[0.07] bg-white p-7 shadow-[0_24px_64px_-32px_rgba(0,0,0,0.1)] sm:p-9"
            >
              <h1
                className="text-2xl font-semibold tracking-[-0.03em] sm:text-3xl"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Checkout
              </h1>
              <p className="mt-2 text-[15px] text-zinc-500">
                Complete your purchase for {items.length} item{items.length > 1 ? "s" : ""}.
              </p>

              <div className="mt-8 space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
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
                      placeholder="you@company.com"
                      {...register("email")}
                    />
                    {errors.email && (
                      <p className="text-xs text-red-500">{errors.email.message}</p>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company (optional)</Label>
                  <Input id="company" placeholder="Your company" {...register("company")} />
                </div>
              </div>

              <div className="mt-8">
                <p className="mb-3 text-[13px] font-medium">Payment method</p>
                <div className="space-y-2">
                  {PAYMENT_METHODS.map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setPaymentMethod(m.id)}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-xl border px-4 py-3.5 text-[14px] transition-colors",
                        paymentMethod === m.id
                          ? "border-black bg-black/[0.03]"
                          : "border-black/[0.08] hover:bg-zinc-50"
                      )}
                    >
                      <CreditCard className="h-4 w-4 text-zinc-500" />
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={processing}
                className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-black py-4 text-[12px] font-bold tracking-[0.12em] text-white uppercase disabled:opacity-60"
              >
                {processing ? "Processing..." : `Pay ${formatPrice(total)}`}
                {!processing && <Lock className="h-4 w-4" />}
              </button>

              <p className="mt-4 flex items-center justify-center gap-2 text-[12px] text-zinc-400">
                <Shield className="h-3.5 w-3.5" />
                Secure encrypted checkout
              </p>
            </motion.form>

            <div className="h-fit rounded-[1.625rem] border border-black/[0.07] bg-white p-7 shadow-[0_32px_80px_-32px_rgba(0,0,0,0.14)]">
              <p className="text-[10px] font-medium tracking-[0.3em] text-zinc-400 uppercase">
                Order summary
              </p>
              <p
                className="mt-3 text-[2.5rem] font-semibold leading-none tracking-[-0.05em]"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {formatPrice(total)}
              </p>

              <ul className="mt-6 space-y-4 border-t border-black/[0.06] pt-6">
                {items.map((item) => (
                  <li key={item.slug} className="flex gap-3">
                    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-zinc-100">
                      <Image src={item.image} alt={item.title} fill className="object-cover" sizes="56px" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[14px] font-medium">{item.title}</p>
                      <p className="text-[12px] text-zinc-500">{formatPrice(item.price)}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
