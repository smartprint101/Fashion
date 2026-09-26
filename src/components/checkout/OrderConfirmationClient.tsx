"use client";

import { useEffect, useState } from "react";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { formatPrice } from "@/lib/format";
import { siteConfig } from "@/config/site";
import type { OrderDetails } from "@/types";

export function OrderConfirmationClient() {
  const [order, setOrder] = useState<OrderDetails | null | undefined>(undefined);

  useEffect(() => {
    try {
      const raw = window.sessionStorage.getItem("noire-last-order");
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setOrder(raw ? JSON.parse(raw) : null);
    } catch {
      setOrder(null);
    }
  }, []);

  if (order === undefined) return null;

  if (!order) {
    return (
      <Container>
        <div className="flex flex-col items-center gap-4 py-24 text-center">
          <h1 className="font-display text-2xl text-neutral-900">No recent order found</h1>
          <p className="text-sm text-neutral-500">Place an order to see your confirmation here.</p>
          <LinkButton href="/" size="lg" className="mt-2">
            Back to Home
          </LinkButton>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 py-16 text-center sm:py-24">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
          <svg viewBox="0 0 24 24" width={32} height={32} fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12l5 5L20 6" />
          </svg>
        </div>
        <h1 className="font-display text-2xl text-neutral-900 sm:text-3xl">
          অর্ডার সফলভাবে গ্রহণ করা হয়েছে!
        </h1>
        <p className="text-sm font-medium uppercase tracking-wider text-neutral-500">
          Order ID: {order.orderId}
        </p>
        <p className="text-sm text-neutral-600">আপনার অর্ডারের জন্য ধন্যবাদ।</p>

        <div className="mt-4 w-full rounded-sm border border-line bg-mist p-6 text-left">
          <h2 className="mb-4 text-xs font-medium uppercase tracking-wider text-neutral-900">
            Order Summary
          </h2>
          <ul className="flex flex-col gap-2 text-sm text-neutral-600">
            {order.items.map((item) => (
              <li key={`${item.productId}-${item.size}-${item.color}`} className="flex justify-between gap-3">
                <span>
                  {item.name} ({item.size}/{item.color}) &times;{item.quantity}
                </span>
                <span className="text-neutral-900">{formatPrice(item.price * item.quantity)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-col gap-1.5 border-t border-line pt-4 text-sm text-neutral-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{formatPrice(order.subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery ({order.deliveryOption === "inside-dhaka" ? "Inside Dhaka" : "Outside Dhaka"})</span>
              <span>{order.deliveryFee === 0 ? "Free" : formatPrice(order.deliveryFee)}</span>
            </div>
            <div className="flex justify-between border-t border-line pt-2 text-base font-medium text-neutral-900">
              <span>Total</span>
              <span>{formatPrice(order.total)}</span>
            </div>
          </div>
          <div className="mt-4 border-t border-line pt-4 text-sm text-neutral-600">
            <p>{order.customerName} &middot; {order.phone}</p>
            <p>{order.address}, {order.area}, {order.district}</p>
            <p className="mt-1">Payment: Cash on Delivery</p>
          </div>
        </div>

        <p className="max-w-md text-xs text-neutral-400">
          This is a demonstration website. No real order has been placed and no
          courier will be dispatched. In a live store, {siteConfig.name} would send an
          SMS/email confirmation and process the order for delivery.
        </p>

        <LinkButton href="/" size="lg" className="mt-4">
          Continue Shopping
        </LinkButton>
      </div>
    </Container>
  );
}
