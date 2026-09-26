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
        "inline-flex items-center rounded-full bg-gradient-to-r from-rose to-plum px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white shadow-sm",
        className
      )}
    >
      -{percent}%
    </span>
  );
}
