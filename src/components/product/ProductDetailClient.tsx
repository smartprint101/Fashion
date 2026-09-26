"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Product } from "@/types";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ColorSwatches } from "@/components/product/ColorSwatches";
import { SizeSelector } from "@/components/product/SizeSelector";
import { QuantitySelector } from "@/components/product/QuantitySelector";
import { SizeGuideModal } from "@/components/product/SizeGuideModal";
import { Accordion } from "@/components/product/Accordion";
import { Rating } from "@/components/product/Rating";
import { PriceTag } from "@/components/product/PriceTag";
import { DiscountBadge } from "@/components/product/DiscountBadge";
import { HeartIcon } from "@/components/ui/Icons";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useToast } from "@/context/ToastContext";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

const stockLabel: Record<Product["stock"], { label: string; className: string }> = {
  "in-stock": { label: "In Stock", className: "text-emerald-700" },
  "low-stock": { label: "Low Stock — Only a few left", className: "text-amber-700" },
  "out-of-stock": { label: "Out of Stock", className: "text-red-600" },
};

export function ProductDetailClient({ product }: { product: Product }) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name ?? "Default");
  const [selectedSize, setSelectedSize] = useState<string | null>(
    product.sizes.length === 1 ? product.sizes[0] : null
  );
  const [quantity, setQuantity] = useState(1);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const { addItem } = useCart();
  const { toggle, has } = useWishlist();
  const { showToast } = useToast();
  const router = useRouter();

  const outOfStock = product.stock === "out-of-stock";
  const wishlisted = has(product.id);

  const galleryImages = useMemo(() => {
    const colorImage = product.colors.find((c) => c.name === selectedColor)?.image;
    if (colorImage) {
      return [colorImage, ...product.images.filter((img) => img !== colorImage)];
    }
    return product.images;
  }, [product, selectedColor]);

  function validateSize(): boolean {
    if (!selectedSize) {
      showToast("অনুগ্রহ করে একটি Size নির্বাচন করুন");
      return false;
    }
    return true;
  }

  function handleAddToCart() {
    if (outOfStock) return;
    if (!validateSize()) return;
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      image: galleryImages[0],
      price: product.price,
      size: selectedSize as string,
      color: selectedColor,
      quantity,
    });
    showToast("Added to cart");
  }

  function handleOrderNow() {
    if (outOfStock) return;
    if (!validateSize()) return;
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      image: galleryImages[0],
      price: product.price,
      size: selectedSize as string,
      color: selectedColor,
      quantity,
    });
    router.push("/checkout");
  }

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
      <ProductGallery images={galleryImages} productName={product.name} />

      <div className="flex flex-col gap-6">
        <div>
          <Link
            href={`/${product.category}`}
            className="text-xs font-medium uppercase tracking-wider text-neutral-500 hover:text-neutral-900"
          >
            {product.category}
          </Link>
          <div className="mt-2 flex items-start justify-between gap-4">
            <h1 className="font-display text-2xl font-medium text-neutral-900 sm:text-3xl">
              {product.name}
            </h1>
            <button
              type="button"
              aria-label="Toggle wishlist"
              onClick={() => {
                toggle(product.id);
                showToast(wishlisted ? "Removed from wishlist" : "Added to wishlist");
              }}
              className="mt-1 shrink-0 text-neutral-700 hover:text-neutral-900"
            >
              <HeartIcon filled={wishlisted} />
            </button>
          </div>
          <div className="mt-2">
            <Rating value={product.rating} reviewCount={product.reviewCount} />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <PriceTag price={product.price} previousPrice={product.previousPrice} size="lg" />
          <DiscountBadge price={product.price} previousPrice={product.previousPrice} />
        </div>

        <p className="text-sm leading-relaxed text-neutral-600">{product.shortDescription}</p>

        <ColorSwatches
          colors={product.colors}
          selected={selectedColor}
          onSelect={setSelectedColor}
        />

        <SizeSelector
          sizes={product.sizes}
          selected={selectedSize}
          onSelect={setSelectedSize}
          onOpenGuide={product.sizes[0] !== "One Size" ? () => setSizeGuideOpen(true) : undefined}
        />

        <QuantitySelector quantity={quantity} onChange={setQuantity} />

        <p className={cn("text-sm font-medium", stockLabel[product.stock].className)}>
          {stockLabel[product.stock].label}
        </p>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <button
            type="button"
            disabled={outOfStock}
            onClick={handleAddToCart}
            className="border border-neutral-900 px-6 py-4 text-sm font-medium uppercase tracking-wider text-neutral-900 transition-colors hover:bg-neutral-900 hover:text-white disabled:cursor-not-allowed disabled:border-neutral-300 disabled:text-neutral-400"
          >
            Add to Cart
          </button>
          <button
            type="button"
            disabled={outOfStock}
            onClick={handleOrderNow}
            className="bg-neutral-900 px-6 py-4 text-sm font-medium uppercase tracking-wider text-white transition-colors hover:bg-neutral-700 disabled:cursor-not-allowed disabled:bg-neutral-300"
          >
            Order Now
          </button>
        </div>

        <div className="flex flex-col gap-1 border border-line bg-mist px-4 py-3 text-sm text-neutral-700">
          <span>
            Inside Dhaka: <strong className="text-neutral-900">{siteConfig.currencySymbol}{siteConfig.delivery.insideDhaka}</strong>
          </span>
          <span>
            Outside Dhaka: <strong className="text-neutral-900">{siteConfig.currencySymbol}{siteConfig.delivery.outsideDhaka}</strong>
          </span>
        </div>

        <Accordion
          defaultOpenIndex={0}
          items={[
            { title: "Description", content: <p>{product.description}</p> },
            {
              title: "Size Guide",
              content: (
                <div className="flex flex-col gap-2">
                  <p>Refer to our size chart for the best fit.</p>
                  <button
                    type="button"
                    onClick={() => setSizeGuideOpen(true)}
                    className="w-fit text-neutral-900 underline underline-offset-2"
                  >
                    View Size Chart
                  </button>
                </div>
              ),
            },
            {
              title: "Delivery Information",
              content: (
                <ul className="flex flex-col gap-1">
                  <li>Inside Dhaka: {siteConfig.currencySymbol}{siteConfig.delivery.insideDhaka} (1-2 business days)</li>
                  <li>Outside Dhaka: {siteConfig.currencySymbol}{siteConfig.delivery.outsideDhaka} (3-5 business days)</li>
                  <li>Free delivery on orders over {siteConfig.currencySymbol}{siteConfig.freeDeliveryThreshold.toLocaleString("en-US")}</li>
                </ul>
              ),
            },
            {
              title: "Return Policy",
              content: (
                <p>
                  This is a demo store, so returns are not processed. In a live
                  store, items are eligible for exchange within 7 days of delivery
                  provided tags remain attached and items are unworn.
                </p>
              ),
            },
          ]}
        />
      </div>

      <SizeGuideModal open={sizeGuideOpen} onClose={() => setSizeGuideOpen(false)} />
    </div>
  );
}
