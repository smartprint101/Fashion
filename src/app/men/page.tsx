import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { CategoryListingClient } from "@/components/product/CategoryListingClient";
import { products } from "@/data/products";

export const metadata: Metadata = {
  title: "Men",
  description: "Modern men's essentials from NOIRÉ — shirts, denim, kurtas and more.",
  alternates: { canonical: "/men" },
};

export default function MenPage() {
  const menProducts = products.filter((p) => p.category === "men");

  return (
    <Container>
      <CategoryListingClient
        products={menProducts}
        eyebrow="Category"
        title="Men"
        description="Modern men's essentials."
      />
    </Container>
  );
}
