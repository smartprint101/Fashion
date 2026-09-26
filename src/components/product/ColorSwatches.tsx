"use client";

import type { ColorOption } from "@/types";
import { cn } from "@/lib/utils";
import { CheckIcon } from "@/components/ui/Icons";

function isLightColor(hex: string): boolean {
  const value = hex.replace("#", "");
  const r = parseInt(value.substring(0, 2), 16);
  const g = parseInt(value.substring(2, 4), 16);
  const b = parseInt(value.substring(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.6;
}

export function ColorSwatches({
  colors,
  selected,
  onSelect,
}: {
  colors: ColorOption[];
  selected: string;
  onSelect: (name: string) => void;
}) {
  if (colors.length <= 1) return null;

  return (
    <div className="flex flex-col gap-2.5">
      <span className="text-xs font-medium uppercase tracking-wider text-neutral-700">
        Color: <span className="font-normal normal-case text-neutral-500">{selected}</span>
      </span>
      <div className="flex flex-wrap items-center gap-3">
        {colors.map((c) => {
          const isSelected = c.name === selected;
          const isLight = isLightColor(c.hex);
          return (
            <button
              key={c.name}
              type="button"
              title={c.name}
              onClick={() => onSelect(c.name)}
              aria-pressed={isSelected}
              className={cn(
                "relative flex h-9 w-9 items-center justify-center rounded-full border transition-all",
                isSelected ? "border-neutral-900 ring-1 ring-neutral-900 ring-offset-2" : "border-neutral-300"
              )}
            >
              <span
                className="h-6 w-6 rounded-full border border-black/10"
                style={{ backgroundColor: c.hex }}
              />
              {isSelected && (
                <CheckIcon
                  className={cn(
                    "absolute h-3.5 w-3.5",
                    isLight ? "text-neutral-900" : "text-white"
                  )}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
