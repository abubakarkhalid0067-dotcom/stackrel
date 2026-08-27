import type { Metadata } from "next";
import { CartCheckoutContent } from "@/components/cart/cart-checkout-content";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Complete your STACKREL cart purchase securely.",
  robots: { index: false, follow: false },
};

export default function CartCheckoutPage() {
  return <CartCheckoutContent />;
}
