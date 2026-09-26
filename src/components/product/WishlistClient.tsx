"use client";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductGrid } from "@/components/product/ProductGrid";
import { LinkButton } from "@/components/ui/Button";
import { useWishlist } from "@/context/WishlistContext";
import { products } from "@/data/products";

export function WishlistClient() {
  const { ids } = useWishlist();
  const wishlistedProducts = products.filter((p) => ids.includes(p.id));

  return (
    <Container>
      <div className="py-10 sm:py-14">
        <SectionHeading title="Wishlist" subtitle="Items you've saved for later." />
        <div className="mt-8">
          {wishlistedProducts.length === 0 ? (
            <div className="flex flex-col items-center gap-4 py-16 text-center">
              <p className="text-sm text-neutral-500">Your wishlist is empty.</p>
              <LinkButton href="/new-arrivals" size="lg">
                Discover Products
              </LinkButton>
            </div>
          ) : (
            <ProductGrid products={wishlistedProducts} />
          )}
        </div>
      </div>
    </Container>
  );
}
