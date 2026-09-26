"use client";

import { useState } from "react";
import { formatPrice } from "@/lib/format";
import { computeDeliveryFee } from "@/lib/delivery";
import type { DeliveryOption } from "@/types";
import { siteConfig } from "@/config/site";
import { LinkButton } from "@/components/ui/Button";

export function CartSummary({ subtotal }: { subtotal: number }) {
  const [deliveryOption, setDeliveryOption] = useState<DeliveryOption>("inside-dhaka");
  const deliveryFee = computeDeliveryFee(subtotal, deliveryOption);
  const total = subtotal + deliveryFee;

  return (
    <div className="flex flex-col gap-6 bg-mist p-6">
      <h3 className="font-display text-lg text-neutral-900">Order Summary</h3>

      <div className="flex flex-col gap-2 text-sm">
        <label className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-neutral-700">
            <input
              type="radio"
              checked={deliveryOption === "inside-dhaka"}
              onChange={() => setDeliveryOption("inside-dhaka")}
              className="h-4 w-4 accent-neutral-900"
            />
            Inside Dhaka
          </span>
          <span className="text-neutral-500">{formatPrice(siteConfig.delivery.insideDhaka)}</span>
        </label>
        <label className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-neutral-700">
            <input
              type="radio"
              checked={deliveryOption === "outside-dhaka"}
              onChange={() => setDeliveryOption("outside-dhaka")}
              className="h-4 w-4 accent-neutral-900"
            />
            Outside Dhaka
          </span>
          <span className="text-neutral-500">{formatPrice(siteConfig.delivery.outsideDhaka)}</span>
        </label>
      </div>

      <div className="flex flex-col gap-3 border-t border-line pt-4 text-sm">
        <div className="flex justify-between text-neutral-600">
          <span>Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between text-neutral-600">
          <span>Delivery Charge</span>
          <span>{deliveryFee === 0 ? "Free" : formatPrice(deliveryFee)}</span>
        </div>
        <div className="flex justify-between border-t border-line pt-3 text-base font-medium text-neutral-900">
          <span>Total</span>
          <span>{formatPrice(total)}</span>
        </div>
      </div>

      <LinkButton href="/checkout" size="lg" className="w-full">
        Proceed to Checkout
      </LinkButton>
    </div>
  );
}
