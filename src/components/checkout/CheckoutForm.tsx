"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LinkButton } from "@/components/ui/Button";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { formatPrice } from "@/lib/format";
import { computeDeliveryFee } from "@/lib/delivery";
import { generateOrderId } from "@/lib/utils";
import { districts } from "@/data/districts";
import { siteConfig } from "@/config/site";
import type { DeliveryOption, OrderDetails } from "@/types";

export function CheckoutForm() {
  const { items, subtotal, clearCart, isHydrated } = useCart();
  const { showToast } = useToast();
  const router = useRouter();

  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [area, setArea] = useState("");
  const [district, setDistrict] = useState("Dhaka");
  const [deliveryOption, setDeliveryOption] = useState<DeliveryOption>("inside-dhaka");
  const [submitting, setSubmitting] = useState(false);

  const deliveryFee = computeDeliveryFee(subtotal, deliveryOption);
  const total = subtotal + deliveryFee;

  if (isHydrated && items.length === 0) {
    return (
      <Container>
        <div className="flex flex-col items-center gap-4 py-24 text-center">
          <h1 className="font-display text-2xl text-neutral-900">Your cart is empty</h1>
          <p className="text-sm text-neutral-500">Add a few items before checking out.</p>
          <LinkButton href="/new-arrivals" size="lg" className="mt-2">
            Continue Shopping
          </LinkButton>
        </div>
      </Container>
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!customerName.trim() || !phone.trim() || !address.trim() || !area.trim() || !district.trim()) {
      showToast("অনুগ্রহ করে সব তথ্য পূরণ করুন");
      return;
    }

    setSubmitting(true);

    const order: OrderDetails = {
      orderId: generateOrderId(),
      items,
      customerName,
      phone,
      address,
      area,
      district,
      deliveryOption,
      deliveryFee,
      subtotal,
      total,
      createdAt: new Date().toISOString(),
    };

    window.setTimeout(() => {
      try {
        window.sessionStorage.setItem("noire-last-order", JSON.stringify(order));
      } catch {
        // ignore storage errors in demo
      }
      clearCart();
      router.push("/checkout/confirmation");
    }, 500);
  }

  return (
    <Container>
      <div className="py-10 sm:py-14">
        <SectionHeading title="Checkout" />

        <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_360px]">
          <div className="flex flex-col gap-8">
            <div>
              <h3 className="mb-4 text-xs font-medium uppercase tracking-wider text-neutral-900">
                Delivery Details
              </h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="আপনার নাম" value={customerName} onChange={setCustomerName} required autoComplete="name" />
                <Field label="মোবাইল নম্বর" value={phone} onChange={setPhone} required type="tel" autoComplete="tel" />
                <Field
                  label="ঠিকানা"
                  value={address}
                  onChange={setAddress}
                  required
                  className="sm:col-span-2"
                  autoComplete="street-address"
                />
                <Field label="এলাকা" value={area} onChange={setArea} required />
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium uppercase tracking-wider text-neutral-700">
                    জেলা
                  </label>
                  <select
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="border border-neutral-300 bg-white px-3 py-3 text-sm outline-none focus:border-neutral-900"
                    required
                  >
                    {districts.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-xs font-medium uppercase tracking-wider text-neutral-900">
                Delivery Option
              </h3>
              <div className="flex flex-col gap-3">
                <label className="flex items-center justify-between border border-neutral-300 px-4 py-3.5 text-sm has-[:checked]:border-neutral-900">
                  <span className="flex items-center gap-3">
                    <input
                      type="radio"
                      checked={deliveryOption === "inside-dhaka"}
                      onChange={() => setDeliveryOption("inside-dhaka")}
                      className="h-4 w-4 accent-neutral-900"
                    />
                    Inside Dhaka
                  </span>
                  <span className="text-neutral-600">{siteConfig.currencySymbol}{siteConfig.delivery.insideDhaka}</span>
                </label>
                <label className="flex items-center justify-between border border-neutral-300 px-4 py-3.5 text-sm has-[:checked]:border-neutral-900">
                  <span className="flex items-center gap-3">
                    <input
                      type="radio"
                      checked={deliveryOption === "outside-dhaka"}
                      onChange={() => setDeliveryOption("outside-dhaka")}
                      className="h-4 w-4 accent-neutral-900"
                    />
                    Outside Dhaka
                  </span>
                  <span className="text-neutral-600">{siteConfig.currencySymbol}{siteConfig.delivery.outsideDhaka}</span>
                </label>
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-xs font-medium uppercase tracking-wider text-neutral-900">
                Payment Method
              </h3>
              <label className="flex items-center gap-3 border border-neutral-900 bg-mist px-4 py-3.5 text-sm">
                <input type="radio" checked readOnly className="h-4 w-4 accent-neutral-900" />
                Cash on Delivery
              </label>
              <p className="mt-2 text-xs text-neutral-500">
                This is a demo store — online payment is not required.
              </p>
            </div>
          </div>

          <div className="flex h-fit flex-col gap-6 bg-mist p-6">
            <h3 className="font-display text-lg text-neutral-900">Order Summary</h3>
            <ul className="flex flex-col gap-3 text-sm text-neutral-600">
              {items.map((item) => (
                <li key={`${item.productId}-${item.size}-${item.color}`} className="flex justify-between gap-3">
                  <span>
                    {item.name} <span className="text-neutral-400">&times;{item.quantity}</span>
                  </span>
                  <span className="shrink-0 text-neutral-900">{formatPrice(item.price * item.quantity)}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-2 border-t border-line pt-4 text-sm">
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
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-neutral-900 py-4 text-sm font-medium uppercase tracking-wider text-white transition-colors hover:bg-neutral-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "প্রসেসিং হচ্ছে..." : "অর্ডার নিশ্চিত করুন"}
            </button>
            <Link href="/cart" className="text-center text-xs text-neutral-500 underline underline-offset-4">
              Back to Cart
            </Link>
          </div>
        </form>
      </div>
    </Container>
  );
}

function Field({
  label,
  value,
  onChange,
  required,
  type = "text",
  className,
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  type?: string;
  className?: string;
  autoComplete?: string;
}) {
  return (
    <div className={`flex flex-col gap-1.5 ${className ?? ""}`}>
      <label className="text-xs font-medium uppercase tracking-wider text-neutral-700">{label}</label>
      <input
        type={type}
        required={required}
        value={value}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        className="border border-neutral-300 bg-white px-3 py-3 text-sm outline-none focus:border-neutral-900"
      />
    </div>
  );
}
