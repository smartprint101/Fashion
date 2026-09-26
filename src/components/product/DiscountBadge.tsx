import { calculateDiscountPercent } from "@/lib/format";
import { cn } from "@/lib/utils";

export function DiscountBadge({
  price,
  previousPrice,
  className,
}: {
  price: number;
  previousPrice?: number;
  className?: string;
}) {
  const percent = calculateDiscountPercent(price, previousPrice);
  if (percent <= 0) return null;

  return (
    <span
      className={cn(
        "inline-flex items-center bg-neutral-900 px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-white",
        className
      )}
    >
      {percent}% OFF
    </span>
  );
}
