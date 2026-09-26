import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { CategoryListingClient } from "@/components/product/CategoryListingClient";
import { products } from "@/data/products";

export const metadata: Metadata = {
  title: "Sale",
  description: "Limited-time discounts on selected NOIRÉ favorites.",
  alternates: { canonical: "/sale" },
};

export default function SalePage() {
  const saleProducts = products.filter(
    (p) => p.previousPrice && p.previousPrice > p.price
  );

  return (
    <Container>
      <CategoryListingClient
        products={saleProducts}
        eyebrow="Limited Time"
        title="Sale"
        description="Enjoy special prices on selected pieces while stocks last."
        showCategoryFilter
      />
    </Container>
  );
}
