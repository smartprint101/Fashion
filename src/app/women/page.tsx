import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { CategoryListingClient } from "@/components/product/CategoryListingClient";
import { products } from "@/data/products";

export const metadata: Metadata = {
  title: "Women",
  description: "Fashionable women's clothing from NOIRÉ — dresses, sets and everyday essentials.",
  alternates: { canonical: "/women" },
};

export default function WomenPage() {
  const womenProducts = products.filter((p) => p.category === "women");

  return (
    <Container>
      <CategoryListingClient
        products={womenProducts}
        eyebrow="Category"
        title="Women"
        description="Fashionable women's clothing."
      />
    </Container>
  );
}
