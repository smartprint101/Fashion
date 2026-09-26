"use client";

import type { SortOption } from "@/types";

const options: { id: SortOption; label: string }[] = [
  { id: "featured", label: "Featured" },
  { id: "newest", label: "Newest" },
  { id: "price-low-high", label: "Price: Low to High" },
  { id: "price-high-low", label: "Price: High to Low" },
];

export function SortDropdown({
  value,
  onChange,
}: {
  value: SortOption;
  onChange: (value: SortOption) => void;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as SortOption)}
      className="border border-neutral-300 bg-white px-3 py-2.5 text-xs uppercase tracking-wider text-neutral-800 outline-none focus:border-neutral-900"
      aria-label="Sort products"
    >
      {options.map((opt) => (
        <option key={opt.id} value={opt.id}>
          Sort: {opt.label}
        </option>
      ))}
    </select>
  );
}
