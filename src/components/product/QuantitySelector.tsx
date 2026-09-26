"use client";

import { MinusIcon, PlusIcon } from "@/components/ui/Icons";

export function QuantitySelector({
  quantity,
  onChange,
}: {
  quantity: number;
  onChange: (value: number) => void;
}) {
  return (
    <div className="flex flex-col gap-2.5">
      <span className="text-xs font-medium uppercase tracking-wider text-neutral-700">
        Quantity
      </span>
      <div className="flex h-11 w-32 items-center justify-between border border-neutral-300">
        <button
          type="button"
          aria-label="Decrease quantity"
          onClick={() => onChange(Math.max(1, quantity - 1))}
          className="flex h-full w-10 items-center justify-center text-neutral-700 hover:text-neutral-950"
        >
          <MinusIcon />
        </button>
        <span className="text-sm font-medium text-neutral-900">{quantity}</span>
        <button
          type="button"
          aria-label="Increase quantity"
          onClick={() => onChange(quantity + 1)}
          className="flex h-full w-10 items-center justify-center text-neutral-700 hover:text-neutral-950"
        >
          <PlusIcon />
        </button>
      </div>
    </div>
  );
}
