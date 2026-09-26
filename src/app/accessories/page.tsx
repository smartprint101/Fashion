import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { CategoryListingClient } from "@/components/product/CategoryListingClient";
import { products } from "@/data/products";

export const metadata: Metadata = {
  title: "Accessories",
  description: "Premium accessories and lifestyle pieces from NOIRÉ.",
  alternates: { canonical: "/accessories" },
};

export default function AccessoriesPage() {
  const accessoryProducts = products.filter((p) => p.category === "accessories");

  return (
    <Container>
      <CategoryListingClient
        products={accessoryProducts}
        eyebrow="Category"
        title="Accessories"
        description="Premium accessories and lifestyle pieces."
      />
    </Container>
  );
}
