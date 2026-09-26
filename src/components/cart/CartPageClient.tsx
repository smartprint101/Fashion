"use client";

import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CartItemRow } from "@/components/cart/CartItemRow";
import { CartSummary } from "@/components/cart/CartSummary";
import { LinkButton } from "@/components/ui/Button";
import { useCart } from "@/context/CartContext";

export function CartPageClient() {
  const { items, subtotal, isHydrated } = useCart();

  if (isHydrated && items.length === 0) {
    return (
      <Container>
        <div className="flex flex-col items-center gap-4 py-24 text-center">
          <h1 className="font-display text-2xl text-neutral-900">Your cart is empty</h1>
          <p className="text-sm text-neutral-500">Looks like you haven&apos;t added anything yet.</p>
          <LinkButton href="/new-arrivals" size="lg" className="mt-2">
            Continue Shopping
          </LinkButton>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="py-10 sm:py-14">
        <SectionHeading title="Shopping Cart" />
        <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_360px]">
          <div>
            {items.map((item) => (
              <CartItemRow key={`${item.productId}-${item.size}-${item.color}`} item={item} />
            ))}
            <Link href="/new-arrivals" className="mt-6 inline-block text-sm text-neutral-600 underline underline-offset-4 hover:text-neutral-900">
              Continue Shopping
            </Link>
          </div>
          <div>
            <CartSummary subtotal={subtotal} />
          </div>
        </div>
      </div>
    </Container>
  );
}
