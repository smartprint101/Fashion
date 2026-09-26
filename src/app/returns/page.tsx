import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Returns & Exchanges",
  description: "NOIRÉ returns and exchange policy.",
  alternates: { canonical: "/returns" },
};

export default function ReturnsPage() {
  return (
    <Container>
      <div className="mx-auto max-w-2xl py-14 sm:py-20">
        <SectionHeading eyebrow="Support" title="Returns & Exchanges" />
        <div className="mt-8 flex flex-col gap-4 text-sm leading-relaxed text-neutral-700">
          <p>
            In a live store, items would be eligible for exchange within 7 days
            of delivery, provided tags remain attached and items are unworn and
            unwashed.
          </p>
          <p>
            Accessories, sale items, and intimate apparel are typically final
            sale and not eligible for return.
          </p>
          <p className="mt-4 text-xs text-neutral-400">
            This is a demonstration website by CodePixel Web. No returns are processed here.
          </p>
        </div>
      </div>
    </Container>
  );
}
