import type { Metadata } from "next";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Complete your NOIRÉ order.",
  alternates: { canonical: "/checkout" },
};

export default function CheckoutPage() {
  return <CheckoutForm />;
}
