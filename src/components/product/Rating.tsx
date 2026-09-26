import { StarIcon } from "@/components/ui/Icons";

export function Rating({
  value,
  reviewCount,
  className,
}: {
  value: number;
  reviewCount?: number;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-1.5 ${className ?? ""}`}>
      <div className="flex items-center gap-0.5 text-neutral-900">
        {Array.from({ length: 5 }).map((_, i) => (
          <StarIcon key={i} filled={i < Math.round(value)} />
        ))}
      </div>
      <span className="text-xs text-neutral-500">
        {value.toFixed(1)}
        {typeof reviewCount === "number" ? ` (${reviewCount})` : ""}
      </span>
    </div>
  );
}
