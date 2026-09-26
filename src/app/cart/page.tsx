import type { Metadata } from "next";
import { CartPageClient } from "@/components/cart/CartPageClient";

export const metadata: Metadata = {
  title: "Your Cart",
  description: "Review the items in your NOIRÉ shopping cart.",
  alternates: { canonical: "/cart" },
};

export default function CartPage() {
  return <CartPageClient />;
}
