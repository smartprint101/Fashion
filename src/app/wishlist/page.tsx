import type { Metadata } from "next";
import { WishlistClient } from "@/components/product/WishlistClient";

export const metadata: Metadata = {
  title: "Wishlist",
  description: "Your saved NOIRÉ items.",
  robots: { index: false, follow: true },
};

export default function WishlistPage() {
  return <WishlistClient />;
}
