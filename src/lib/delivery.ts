import { siteConfig } from "@/config/site";
import type { DeliveryOption } from "@/types";

export function computeDeliveryFee(subtotal: number, option: DeliveryOption): number {
  if (subtotal >= siteConfig.freeDeliveryThreshold) return 0;
  return option === "inside-dhaka" ? siteConfig.delivery.insideDhaka : siteConfig.delivery.outsideDhaka;
}
