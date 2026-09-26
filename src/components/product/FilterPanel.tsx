"use client";

import type { ProductCategory } from "@/types";
import { formatPrice } from "@/lib/format";

export interface Filters {
  categories: ProductCategory[];
  sizes: string[];
  colors: string[];
  priceRange: string | null;
  inStockOnly: boolean;
}

export const priceRanges: { id: string; label: string; test: (price: number) => boolean }[] = [
  { id: "under-1500", label: `Under ${formatPrice(1500)}`, test: (p) => p < 1500 },
  { id: "1500-3000", label: `${formatPrice(1500)} - ${formatPrice(3000)}`, test: (p) => p >= 1500 && p <= 3000 },
  { id: "3000-5000", label: `${formatPrice(3000)} - ${formatPrice(5000)}`, test: (p) => p > 3000 && p <= 5000 },
  { id: "over-5000", label: `Over ${formatPrice(5000)}`, test: (p) => p > 5000 },
];

const categoryOptions: { id: ProductCategory; label: string }[] = [
  { id: "men", label: "Men" },
  { id: "women", label: "Women" },
  { id: "accessories", label: "Accessories" },
];

export function FilterPanel({
  filters,
  onChange,
  availableSizes,
  availableColors,
  showCategoryFilter,
  onClear,
}: {
  filters: Filters;
  onChange: (filters: Filters) => void;
  availableSizes: string[];
  availableColors: { name: string; hex: string }[];
  showCategoryFilter: boolean;
  onClear: () => void;
}) {
  function toggleArrayValue<T>(arr: T[], value: T): T[] {
    return arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];
  }

  return (
    <div className="flex flex-col gap-8">
      {showCategoryFilter && (
        <div>
          <h3 className="mb-3 text-xs font-medium uppercase tracking-wider text-neutral-900">
            Category
          </h3>
          <div className="flex flex-col gap-2">
            {categoryOptions.map((opt) => (
              <label key={opt.id} className="flex items-center gap-2.5 text-sm text-neutral-700">
                <input
                  type="checkbox"
                  checked={filters.categories.includes(opt.id)}
                  onChange={() =>
                    onChange({ ...filters, categories: toggleArrayValue(filters.categories, opt.id) })
                  }
                  className="h-4 w-4 accent-neutral-900"
                />
                {opt.label}
              </label>
            ))}
          </div>
        </div>
      )}

      {availableSizes.length > 0 && (
        <div>
          <h3 className="mb-3 text-xs font-medium uppercase tracking-wider text-neutral-900">Size</h3>
          <div className="flex flex-wrap gap-2">
            {availableSizes.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => onChange({ ...filters, sizes: toggleArrayValue(filters.sizes, size) })}
                className={`flex h-9 min-w-9 items-center justify-center border px-2 text-xs ${
                  filters.sizes.includes(size)
                    ? "border-neutral-900 bg-neutral-900 text-white"
                    : "border-neutral-300 text-neutral-700"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      {availableColors.length > 0 && (
        <div>
          <h3 className="mb-3 text-xs font-medium uppercase tracking-wider text-neutral-900">Color</h3>
          <div className="flex flex-wrap gap-3">
            {availableColors.map((c) => (
              <button
                key={c.name}
                type="button"
                title={c.name}
                onClick={() => onChange({ ...filters, colors: toggleArrayValue(filters.colors, c.name) })}
                className={`h-8 w-8 rounded-full border-2 ${
                  filters.colors.includes(c.name) ? "border-neutral-900" : "border-transparent"
                }`}
              >
                <span className="block h-full w-full rounded-full border border-black/10" style={{ backgroundColor: c.hex }} />
              </button>
            ))}
          </div>
        </div>
      )}

      <div>
        <h3 className="mb-3 text-xs font-medium uppercase tracking-wider text-neutral-900">Price</h3>
        <div className="flex flex-col gap-2">
          {priceRanges.map((range) => (
            <label key={range.id} className="flex items-center gap-2.5 text-sm text-neutral-700">
              <input
                type="radio"
                name="price-range"
                checked={filters.priceRange === range.id}
                onChange={() =>
                  onChange({ ...filters, priceRange: filters.priceRange === range.id ? null : range.id })
                }
                className="h-4 w-4 accent-neutral-900"
              />
              {range.label}
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-xs font-medium uppercase tracking-wider text-neutral-900">Availability</h3>
        <label className="flex items-center gap-2.5 text-sm text-neutral-700">
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={() => onChange({ ...filters, inStockOnly: !filters.inStockOnly })}
            className="h-4 w-4 accent-neutral-900"
          />
          In Stock Only
        </label>
      </div>

      <button
        type="button"
        onClick={onClear}
        className="w-fit text-xs font-medium uppercase tracking-wider text-neutral-500 underline underline-offset-4 hover:text-neutral-900"
      >
        Clear All Filters
      </button>
    </div>
  );
}
