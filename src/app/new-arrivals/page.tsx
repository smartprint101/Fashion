import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { CategoryListingClient } from "@/components/product/CategoryListingClient";
import { products } from "@/data/products";

export const metadata: Metadata = {
  title: "New Arrivals",
  description: "Fresh styles, carefully selected for the new season.",
  alternates: { canonical: "/new-arrivals" },
};

export default function NewArrivalsPage() {
  const newProducts = products.filter((p) => p.isNew);

  return (
    <Container>
      <CategoryListingClient
        products={newProducts}
        eyebrow="Just In"
        title="New Arrivals"
        description="Fresh styles, carefully selected for the new season."
        showCategoryFilter
      />
    </Container>
  );
}
