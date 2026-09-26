"use client";

import { cn } from "@/lib/utils";

export function SizeSelector({
  sizes,
  selected,
  onSelect,
  onOpenGuide,
}: {
  sizes: string[];
  selected: string | null;
  onSelect: (size: string) => void;
  onOpenGuide?: () => void;
}) {
  const isOneSize = sizes.length === 1 && sizes[0] === "One Size";

  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wider text-neutral-700">
          Size
        </span>
        {!isOneSize && onOpenGuide && (
          <button
            type="button"
            onClick={onOpenGuide}
            className="text-xs text-neutral-500 underline underline-offset-2 hover:text-neutral-900"
          >
            Size Guide
          </button>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {sizes.map((size) => (
          <button
            key={size}
            type="button"
            onClick={() => onSelect(size)}
            aria-pressed={selected === size}
            className={cn(
              "flex h-11 min-w-11 items-center justify-center border px-3 text-sm transition-colors",
              selected === size
                ? "border-neutral-900 bg-neutral-900 text-white"
                : "border-neutral-300 text-neutral-800 hover:border-neutral-900"
            )}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
}
