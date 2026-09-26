import { siteConfig } from "@/config/site";

export function AnnouncementBar() {
  return (
    <div className="bg-neutral-900 py-2 text-center text-[11px] font-medium uppercase tracking-wider text-white sm:text-xs">
      Free Delivery on orders over {siteConfig.currencySymbol}
      {siteConfig.freeDeliveryThreshold.toLocaleString("en-US")}
    </div>
  );
}
