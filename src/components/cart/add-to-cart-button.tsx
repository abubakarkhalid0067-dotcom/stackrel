"use client";

import { useState } from "react";
import { ShoppingCart, Check } from "lucide-react";
import type { Product } from "@/lib/products";
import { useCart } from "@/components/providers/cart-provider";
import { cn } from "@/lib/utils";

type AddToCartButtonProps = {
  product: Product;
  className?: string;
  variant?: "default" | "outline" | "compact";
  showIcon?: boolean;
  label?: string;
};

export function AddToCartButton({
  product,
  className,
  variant = "default",
  showIcon = true,
  label = "Add to Cart",
}: AddToCartButtonProps) {
  const { addItem, items } = useCart();
  const [feedback, setFeedback] = useState<"added" | "exists" | null>(null);
  const inCart = items.some((i) => i.slug === product.slug);

  const handleClick = () => {
    const result = addItem(product);
    setFeedback(result.ok ? "added" : "exists");
    setTimeout(() => setFeedback(null), 2000);
  };

  const styles = {
    default:
      "w-full items-center justify-center gap-2 rounded-full border border-black/[0.1] bg-white py-[1.125rem] text-[11px] font-semibold tracking-[0.14em] text-foreground uppercase transition-all hover:border-black/20 hover:bg-zinc-50",
    outline:
      "inline-flex items-center gap-2 rounded-full border border-black/[0.1] px-5 py-2.5 text-[11px] font-semibold tracking-[0.1em] text-foreground uppercase transition-colors hover:bg-zinc-50",
    compact:
      "inline-flex flex-1 items-center justify-center gap-1.5 rounded-full border border-black/[0.1] py-3 text-[11px] font-semibold tracking-[0.08em] uppercase transition-colors hover:bg-zinc-50",
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn("flex", styles[variant], inCart && "border-emerald-200 bg-emerald-50/50", className)}
    >
      {feedback === "added" ? (
        <>
          <Check className="h-3.5 w-3.5 text-emerald-600" />
          <span className="text-emerald-700">Added!</span>
        </>
      ) : feedback === "exists" ? (
        <>
          <ShoppingCart className="h-3.5 w-3.5" />
          <span>In cart</span>
        </>
      ) : (
        <>
          {showIcon && <ShoppingCart className="h-3.5 w-3.5" />}
          {inCart ? "In Cart" : label}
        </>
      )}
    </button>
  );
}
