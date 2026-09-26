import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";

export function PriceTag({
  price,
  previousPrice,
  size = "md",
  className,
}: {
  price: number;
  previousPrice?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const sizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-2xl",
  };
  const prevSizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  return (
    <div className={cn("flex flex-wrap items-baseline gap-2", className)}>
      <span className={cn("font-medium text-neutral-900", sizeClasses[size])}>
        {formatPrice(price)}
      </span>
      {previousPrice && previousPrice > price && (
        <span
          className={cn(
            "text-neutral-400 line-through",
            prevSizeClasses[size]
          )}
        >
          {formatPrice(previousPrice)}
        </span>
      )}
    </div>
  );
}
