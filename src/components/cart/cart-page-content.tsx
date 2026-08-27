"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "@/components/providers/cart-provider";
import { formatPrice } from "@/lib/utils";

type CartPageContentProps = {
  embedded?: boolean;
  onCheckout?: () => void;
};

export function CartPageContent({ embedded = false }: CartPageContentProps) {
  const { items, removeItem, total, itemCount } = useCart();

  const inner = (
    <>
      {!embedded && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <span className="inline-flex items-center rounded-full border border-black/[0.08] bg-white px-3.5 py-1.5 text-[10px] font-semibold tracking-[0.16em] text-zinc-500 uppercase">
            Shopping Cart
          </span>
          <h1
            className="mt-4 text-[clamp(2rem,5vw,2.75rem)] font-semibold tracking-[-0.04em]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Your Cart
          </h1>
          <p className="mt-2 text-[15px] text-zinc-500">
            {itemCount > 0
              ? `${itemCount} premium template${itemCount > 1 ? "s" : ""} ready for checkout.`
              : "No items yet — explore our template library."}
          </p>
        </motion.div>
      )}

      {embedded && (
        <div className="mb-6">
          <h1
            className="text-[clamp(1.75rem,4vw,2.25rem)] font-semibold tracking-[-0.04em]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Shopping Cart
          </h1>
          <p className="mt-2 text-[15px] text-zinc-500">
            Review items before checkout.
          </p>
        </div>
      )}

      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="rounded-[1.625rem] border border-black/[0.07] bg-white p-6 shadow-[0_24px_64px_-32px_rgba(0,0,0,0.1)] sm:p-8">
          {items.length === 0 ? (
            <div className="flex flex-col items-center py-16 text-center">
              <ShoppingBag className="h-12 w-12 text-zinc-300" />
              <p className="mt-4 text-[16px] font-medium">Cart is empty</p>
              <Link
                href="/templates"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-[11px] font-semibold tracking-[0.1em] text-white uppercase"
              >
                Browse Templates
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-black/[0.06]">
              {items.map((item, i) => (
                <motion.li
                  key={item.slug}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex gap-5 py-6 first:pt-0 last:pb-0"
                >
                  <Link
                    href={`/templates/${item.slug}`}
                    className="relative h-24 w-32 shrink-0 overflow-hidden rounded-xl bg-zinc-100 sm:h-28 sm:w-36"
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform hover:scale-105"
                      sizes="144px"
                    />
                  </Link>
                  <div className="min-w-0 flex-1">
                    <Link
                      href={`/templates/${item.slug}`}
                      className="text-[16px] font-semibold tracking-[-0.02em] hover:opacity-70"
                    >
                      {item.title}
                    </Link>
                    <p className="mt-1 text-[12px] text-zinc-500">{item.category}</p>
                    <p className="mt-3 text-[11px] font-medium tracking-[0.12em] text-zinc-400 uppercase">
                      One-time license
                    </p>
                  </div>
                  <div className="flex flex-col items-end justify-between gap-2">
                    <p className="text-[17px] font-semibold">{formatPrice(item.price)}</p>
                    <button
                      type="button"
                      onClick={() => removeItem(item.slug)}
                      className="inline-flex items-center gap-1.5 text-[12px] text-zinc-400 transition-colors hover:text-red-500"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      Remove
                    </button>
                  </div>
                </motion.li>
              ))}
            </ul>
          )}
        </div>

        <div className="h-fit rounded-[1.625rem] border border-black/[0.07] bg-white p-6 shadow-[0_24px_64px_-32px_rgba(0,0,0,0.1)] sm:p-8 lg:sticky lg:top-24">
          <p className="text-[10px] font-semibold tracking-[0.2em] text-zinc-400 uppercase">
            Order Summary
          </p>

          <div className="mt-6 space-y-3 border-b border-black/[0.06] pb-6">
            <div className="flex justify-between text-[14px]">
              <span className="text-zinc-500">Subtotal ({itemCount} items)</span>
              <span className="font-medium">{formatPrice(total)}</span>
            </div>
            <div className="flex justify-between text-[14px]">
              <span className="text-zinc-500">License</span>
              <span className="font-medium text-emerald-600">Lifetime</span>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <span className="text-[15px] font-medium">Total</span>
            <span
              className="text-2xl font-semibold tracking-[-0.04em]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {formatPrice(total)}
            </span>
          </div>

          {items.length > 0 ? (
            <>
              <Link
                href="/checkout/cart"
                className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-black py-4 text-[12px] font-bold tracking-[0.1em] text-white uppercase transition-all hover:bg-black/90"
              >
                Proceed to Checkout
                <ArrowRight className="h-4 w-4" />
              </Link>
              <p className="mt-4 text-center text-[12px] leading-relaxed text-zinc-400">
                Secure checkout · Instant download · 30-day guarantee
              </p>
            </>
          ) : (
            <p className="mt-8 text-center text-[13px] text-zinc-400">
              Add templates to proceed
            </p>
          )}
        </div>
      </div>
    </>
  );

  if (embedded) return <div>{inner}</div>;

  return (
    <div className="relative min-h-screen bg-[#fafafa] pt-28 pb-20 sm:pt-32 sm:pb-28">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        aria-hidden="true"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0,0,0,0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,0,0,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "72px 72px",
          maskImage: "linear-gradient(to bottom, black 0%, black 45%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 45%, transparent 100%)",
        }}
      />
      <div className="container-premium relative">{inner}</div>
    </div>
  );
}
