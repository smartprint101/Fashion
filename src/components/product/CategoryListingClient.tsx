"use client";

import { useMemo, useState } from "react";
import type { Product, SortOption } from "@/types";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductGrid } from "@/components/product/ProductGrid";
import { SortDropdown } from "@/components/product/SortDropdown";
import { FilterPanel, priceRanges, type Filters } from "@/components/product/FilterPanel";
import { CloseIcon } from "@/components/ui/Icons";

const emptyFilters: Filters = {
  categories: [],
  sizes: [],
  colors: [],
  priceRange: null,
  inStockOnly: false,
};

export function CategoryListingClient({
  products,
  eyebrow,
  title,
  description,
  showCategoryFilter = false,
}: {
  products: Product[];
  eyebrow?: string;
  title: string;
  description: string;
  showCategoryFilter?: boolean;
}) {
  const [filters, setFilters] = useState<Filters>(emptyFilters);
  const [sort, setSort] = useState<SortOption>("featured");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const availableSizes = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => p.sizes.forEach((s) => set.add(s)));
    const arr = Array.from(set);
    return arr.length === 1 && arr[0] === "One Size" ? [] : arr.filter((s) => s !== "One Size");
  }, [products]);

  const availableColors = useMemo(() => {
    const map = new Map<string, string>();
    products.forEach((p) => p.colors.forEach((c) => map.set(c.name, c.hex)));
    return Array.from(map.entries()).map(([name, hex]) => ({ name, hex }));
  }, [products]);

  const filtered = useMemo(() => {
    let result = [...products];

    if (showCategoryFilter && filters.categories.length > 0) {
      result = result.filter((p) => filters.categories.includes(p.category));
    }
    if (filters.sizes.length > 0) {
      result = result.filter((p) => p.sizes.some((s) => filters.sizes.includes(s)));
    }
    if (filters.colors.length > 0) {
      result = result.filter((p) => p.colors.some((c) => filters.colors.includes(c.name)));
    }
    if (filters.priceRange) {
      const range = priceRanges.find((r) => r.id === filters.priceRange);
      if (range) result = result.filter((p) => range.test(p.price));
    }
    if (filters.inStockOnly) {
      result = result.filter((p) => p.stock !== "out-of-stock");
    }

    switch (sort) {
      case "newest":
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case "price-low-high":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high-low":
        result.sort((a, b) => b.price - a.price);
        break;
      default:
        result.sort((a, b) => (a.isFeatured === b.isFeatured ? 0 : a.isFeatured ? -1 : 1));
    }

    return result;
  }, [products, filters, sort, showCategoryFilter]);

  return (
    <div className="py-10 sm:py-14">
      <SectionHeading eyebrow={eyebrow} title={title} subtitle={description} />

      <div className="mt-8 flex items-center justify-between gap-4 border-b border-line pb-4">
        <button
          type="button"
          onClick={() => setMobileFiltersOpen(true)}
          className="border border-neutral-900 px-4 py-2.5 text-xs font-medium uppercase tracking-wider text-neutral-900 lg:hidden"
        >
          Filter
        </button>
        <p className="hidden text-xs text-neutral-500 lg:block">
          {filtered.length} {filtered.length === 1 ? "product" : "products"}
        </p>
        <SortDropdown value={sort} onChange={setSort} />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[240px_1fr]">
        <aside className="hidden lg:block">
          <FilterPanel
            filters={filters}
            onChange={setFilters}
            availableSizes={availableSizes}
            availableColors={availableColors}
            showCategoryFilter={showCategoryFilter}
            onClear={() => setFilters(emptyFilters)}
          />
        </aside>

        <div>
          <ProductGrid products={filtered} emptyMessage="No products match the selected filters." />
        </div>
      </div>

      <div
        className={`fixed inset-0 z-[70] lg:hidden ${mobileFiltersOpen ? "pointer-events-auto" : "pointer-events-none"}`}
      >
        <div
          onClick={() => setMobileFiltersOpen(false)}
          className={`absolute inset-0 bg-neutral-950/40 transition-opacity duration-300 ${
            mobileFiltersOpen ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          className={`absolute right-0 top-0 flex h-full w-[86%] max-w-sm flex-col overflow-y-auto bg-white p-6 shadow-xl transition-transform duration-300 ease-out ${
            mobileFiltersOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="mb-6 flex items-center justify-between">
            <h3 className="font-display text-lg">Filters</h3>
            <button aria-label="Close filters" onClick={() => setMobileFiltersOpen(false)}>
              <CloseIcon />
            </button>
          </div>
          <FilterPanel
            filters={filters}
            onChange={setFilters}
            availableSizes={availableSizes}
            availableColors={availableColors}
            showCategoryFilter={showCategoryFilter}
            onClear={() => setFilters(emptyFilters)}
          />
          <button
            type="button"
            onClick={() => setMobileFiltersOpen(false)}
            className="mt-8 bg-neutral-900 py-3.5 text-sm font-medium uppercase tracking-wider text-white"
          >
            Show {filtered.length} Results
          </button>
        </div>
      </div>
    </div>
  );
}
