import type { Product } from "@/lib/products";

export type CartItem = {
  slug: string;
  title: string;
  price: number;
  image: string;
  category: string;
  type: "template";
  quantity: number;
};

const CART_KEY = "stackrel_cart";

export function productToCartItem(product: Product): Omit<CartItem, "quantity"> {
  return {
    slug: product.slug,
    title: product.title,
    price: product.price,
    image: product.detailImage ?? product.image,
    category: product.category,
    type: "template",
  };
}

export function readCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
}

export function writeCart(items: CartItem[]) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
}

export function getCartTotal(items: CartItem[]) {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

export function getCartCount(items: CartItem[]) {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}
