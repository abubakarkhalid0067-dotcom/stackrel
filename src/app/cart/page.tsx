import type { Metadata } from "next";
import { CartPageContent } from "@/components/cart/cart-page-content";

export const metadata: Metadata = {
  title: "Cart",
  description: "Review your STACKREL cart and proceed to secure checkout.",
};

export default function CartPage() {
  return <CartPageContent />;
}
