"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ShoppingBag, Trash2, X } from "lucide-react";
import { useCart } from "@/components/providers/cart-provider";
import { formatPrice } from "@/lib/utils";

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, total, itemCount } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-[2px]"
            onClick={closeCart}
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 32, stiffness: 360 }}
            className="fixed inset-y-0 right-0 z-[70] flex w-full max-w-md flex-col border-l border-black/[0.08] bg-white shadow-[-24px_0_80px_-24px_rgba(0,0,0,0.15)]"
          >
            <div className="flex items-center justify-between border-b border-black/[0.06] px-6 py-5">
              <div>
                <h2
                  className="text-lg font-semibold tracking-[-0.03em]"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Your Cart
                </h2>
                <p className="text-[13px] text-zinc-500">
                  {itemCount} {itemCount === 1 ? "item" : "items"}
                </p>
              </div>
              <button
                type="button"
                onClick={closeCart}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-black/[0.08] transition-colors hover:bg-zinc-50"
                aria-label="Close cart"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-black/[0.08] bg-[#fafafa]">
                    <ShoppingBag className="h-7 w-7 text-zinc-300" />
                  </div>
                  <p className="mt-5 text-[15px] font-medium">Your cart is empty</p>
                  <p className="mt-1 text-[13px] text-zinc-500">
                    Add premium templates to get started.
                  </p>
                  <Link
                    href="/templates"
                    onClick={closeCart}
                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-[11px] font-semibold tracking-[0.1em] text-white uppercase"
                  >
                    Browse Templates
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              ) : (
                <ul className="space-y-4">
                  {items.map((item) => (
                    <li
                      key={item.slug}
                      className="flex gap-4 rounded-[1.125rem] border border-black/[0.07] p-3"
                    >
                      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-zinc-100">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[14px] font-semibold">{item.title}</p>
                        <p className="text-[11px] text-zinc-500">{item.category}</p>
                        <p className="mt-2 text-[15px] font-semibold">
                          {formatPrice(item.price)}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.slug)}
                        className="flex h-8 w-8 shrink-0 items-center justify-center self-start rounded-full text-zinc-400 transition-colors hover:bg-red-50 hover:text-red-500"
                        aria-label={`Remove ${item.title}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-black/[0.06] p-6">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-[14px] text-zinc-500">Subtotal</span>
                  <span
                    className="text-xl font-semibold tracking-[-0.03em]"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {formatPrice(total)}
                  </span>
                </div>
                <Link
                  href="/cart"
                  onClick={closeCart}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-black py-4 text-[12px] font-bold tracking-[0.1em] text-white uppercase transition-all hover:bg-black/90"
                >
                  View Cart & Checkout
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/templates"
                  onClick={closeCart}
                  className="mt-3 flex w-full items-center justify-center py-2 text-[13px] font-medium text-zinc-500 hover:text-foreground"
                >
                  Continue shopping
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
