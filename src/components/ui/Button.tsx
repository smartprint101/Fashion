import Link from "next/link";
import { cn } from "@/lib/utils";

type BaseProps = {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "gold";
  size?: "sm" | "md" | "lg";
  className?: string;
  children: React.ReactNode;
};

const variantClasses: Record<string, string> = {
  primary: "bg-neutral-900 text-white hover:bg-neutral-800 shadow-sm hover:shadow-md",
  secondary: "bg-white text-neutral-900 hover:bg-neutral-100 shadow-sm hover:shadow-md",
  outline: "border border-neutral-900 text-neutral-900 hover:bg-neutral-900 hover:text-white",
  ghost: "text-neutral-900 hover:bg-neutral-100",
  gold: "btn-gold shadow-md hover:shadow-lg hover:-translate-y-0.5",
};

const sizeClasses: Record<string, string> = {
  sm: "px-5 py-2.5 text-xs rounded-full",
  md: "px-7 py-3 text-sm rounded-full",
  lg: "px-9 py-4 text-sm rounded-full",
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: BaseProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold uppercase tracking-wider transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
}

export function LinkButton({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
}: BaseProps & { href: string }) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold uppercase tracking-wider transition-all duration-200",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
    >
      {children}
    </Link>
  );
}
