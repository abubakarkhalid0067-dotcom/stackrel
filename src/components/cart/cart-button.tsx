"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/components/providers/cart-provider";
import { cn } from "@/lib/utils";

type CartButtonProps = {
  className?: string;
  variant?: "default" | "dark" | "minimal";
};

export function CartButton({ className, variant = "default" }: CartButtonProps) {
  const { toggleCart, itemCount } = useCart();

  const styles = {
    default:
      "relative flex h-9 w-9 items-center justify-center rounded-full border border-black/[0.08] bg-white transition-colors hover:bg-zinc-50",
    dark: "relative flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10",
    minimal:
      "relative flex h-9 w-9 items-center justify-center rounded-full border border-black/[0.08] transition-colors hover:bg-zinc-50",
  };

  return (
    <button
      type="button"
      onClick={toggleCart}
      className={cn(styles[variant], className)}
      aria-label={`Cart, ${itemCount} items`}
    >
      <ShoppingBag className={cn("h-4 w-4", variant === "dark" ? "text-white" : "text-zinc-600")} />
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-black px-1 text-[10px] font-bold text-white">
          {itemCount > 9 ? "9+" : itemCount}
        </span>
      )}
    </button>
  );
}

export function CartLink({ className }: { className?: string }) {
  const { itemCount } = useCart();

  return (
    <Link
      href="/cart"
      className={cn(
        "relative inline-flex items-center gap-2 rounded-full border border-black/[0.08] px-4 py-2 text-[12px] font-medium transition-colors hover:bg-zinc-50",
        className
      )}
    >
      <ShoppingBag className="h-3.5 w-3.5" />
      Cart
      {itemCount > 0 && (
        <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-black px-1 text-[10px] font-bold text-white">
          {itemCount}
        </span>
      )}
    </Link>
  );
}
