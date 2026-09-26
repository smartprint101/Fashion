import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Delivery Information",
  description: "NOIRÉ delivery charges and timelines across Bangladesh.",
  alternates: { canonical: "/delivery" },
};

export default function DeliveryPage() {
  return (
    <Container>
      <div className="mx-auto max-w-2xl py-14 sm:py-20">
        <SectionHeading eyebrow="Support" title="Delivery Information" />
        <div className="mt-8 flex flex-col gap-4 text-sm text-neutral-700">
          <p>
            We deliver across Bangladesh with the following estimated timelines
            and charges.
          </p>
          <ul className="flex flex-col gap-2">
            <li>
              Inside Dhaka: {siteConfig.currencySymbol}
              {siteConfig.delivery.insideDhaka} — 1 to 2 business days
            </li>
            <li>
              Outside Dhaka: {siteConfig.currencySymbol}
              {siteConfig.delivery.outsideDhaka} — 3 to 5 business days
            </li>
            <li>
              Free delivery on all orders over {siteConfig.currencySymbol}
              {siteConfig.freeDeliveryThreshold.toLocaleString("en-US")}
            </li>
          </ul>
          <p className="mt-4 text-xs text-neutral-400">
            This is a demonstration website. No real courier is dispatched for orders placed here.
          </p>
        </div>
      </div>
    </Container>
  );
}
