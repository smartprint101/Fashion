"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductGrid } from "@/components/product/ProductGrid";
import { SearchIcon } from "@/components/ui/Icons";
import { searchProducts } from "@/data/products";

function SearchInner({ initialQuery }: { initialQuery: string }) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);
  const results = searchProducts(query);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    router.push(query.trim() ? `/search?q=${encodeURIComponent(query.trim())}` : "/search");
  }

  return (
    <Container>
      <div className="py-10 sm:py-14">
        <SectionHeading eyebrow="Search" title="Find Your Style" />

        <form onSubmit={handleSubmit} className="mt-6 flex items-center gap-3 border-b border-neutral-900 pb-3">
          <SearchIcon className="text-neutral-500" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for shirts, dresses, accessories..."
            className="w-full border-none bg-transparent text-lg outline-none placeholder:text-neutral-400"
            autoFocus
          />
        </form>

        <div className="mt-8">
          {query.trim() ? (
            <>
              <p className="mb-6 text-sm text-neutral-500">
                {results.length} {results.length === 1 ? "result" : "results"} for &ldquo;{query}&rdquo;
              </p>
              <ProductGrid products={results} emptyMessage="No products matched your search. Try a different keyword." />
            </>
          ) : (
            <p className="py-16 text-center text-sm text-neutral-500">
              Start typing to search across the entire NOIRÉ catalog.
            </p>
          )}
        </div>
      </div>
    </Container>
  );
}

export function SearchClient() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") ?? "";
  // Re-mount the inner component whenever the URL query changes so its
  // internal input state always reflects the current search term.
  return <SearchInner key={initialQuery} initialQuery={initialQuery} />;
}
