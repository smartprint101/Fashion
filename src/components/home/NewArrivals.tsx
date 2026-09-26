import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LinkButton } from "@/components/ui/Button";
import { ProductGrid } from "@/components/product/ProductGrid";
import { products } from "@/data/products";

export function NewArrivals() {
  const featured = [...products]
    .sort((a, b) => (a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1))
    .slice(0, 8);

  return (
    <section className="py-16 sm:py-24">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Just In"
            title="New Arrivals"
            subtitle="Fresh styles, carefully selected for the new season."
          />
          <LinkButton href="/new-arrivals" variant="outline" size="sm">
            View All
          </LinkButton>
        </div>
        <div className="mt-10">
          <ProductGrid products={featured} />
        </div>
      </Container>
    </section>
  );
}
