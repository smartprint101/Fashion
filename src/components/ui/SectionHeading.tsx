import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" && "items-center text-center",
        className
      )}
    >
      {eyebrow && (
        <span
          className={cn(
            "inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-accent",
            align === "center" && "justify-center"
          )}
        >
          <span className="h-px w-6 bg-accent/50" aria-hidden />
          {eyebrow}
        </span>
      )}
      <h2 className="font-display text-3xl font-medium tracking-tight text-neutral-900 sm:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="max-w-xl text-sm text-neutral-600 sm:text-base">{subtitle}</p>
      )}
    </div>
  );
}
