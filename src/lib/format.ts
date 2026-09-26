import { siteConfig } from "@/config/site";

export function formatPrice(value: number): string {
  const formatted = new Intl.NumberFormat("en-US").format(Math.round(value));
  return `${siteConfig.currencySymbol}${formatted}`;
}

export function calculateDiscountPercent(
  price: number,
  previousPrice?: number
): number {
  if (!previousPrice || previousPrice <= price) return 0;
  return Math.round(((previousPrice - price) / previousPrice) * 100);
}
