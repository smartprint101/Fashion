import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { CategoryListingClient } from "@/components/product/CategoryListingClient";
import { collections } from "@/data/categories";
import { products } from "@/data/products";
import type { Product } from "@/types";

const neutralTones = ["Black", "White", "Charcoal", "Gray", "Stone", "Ivory", "Off White", "Cream"];

function getCollectionProducts(tag: string): Product[] {
  switch (tag) {
    case "everyday":
      return products.filter((p) => p.tags.includes("everyday"));
    case "office":
      return products.filter((p) => p.tags.includes("office"));
    case "monochrome":
      return products.filter((p) => p.colors.some((c) => neutralTones.includes(c.name)));
    case "accessory-edit":
      return products.filter((p) => p.category === "accessories");
    default:
      return [];
  }
}

export function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const collection = collections.find((c) => c.slug === slug);
  if (!collection) return {};
  return {
    title: collection.name,
    description: collection.description,
    alternates: { canonical: `/collections/${collection.slug}` },
  };
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const collection = collections.find((c) => c.slug === slug);
  if (!collection) notFound();

  const collectionProducts = getCollectionProducts(collection.tag);

  return (
    <Container>
      <CategoryListingClient
        products={collectionProducts}
        eyebrow="Collection"
        title={collection.name}
        description={collection.description}
        showCategoryFilter
      />
    </Container>
  );
}
