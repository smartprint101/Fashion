"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Product } from "@/types";
import { PriceTag } from "@/components/product/PriceTag";
import { DiscountBadge } from "@/components/product/DiscountBadge";
import { HeartIcon } from "@/components/ui/Icons";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useToast } from "@/context/ToastContext";
import { cn } from "@/lib/utils";

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const { addItem } = useCart();
  const { toggle, has } = useWishlist();
  const { showToast } = useToast();
  const router = useRouter();
  const wishlisted = has(product.id);
  const outOfStock = product.stock === "out-of-stock";

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    if (outOfStock) return;
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      image: product.images[0],
      price: product.price,
      size: product.sizes[0],
      color: product.colors[0]?.name ?? "Default",
      quantity: 1,
    });
    showToast("Added to cart");
  }

  function handleOrderNow(e: React.MouseEvent) {
    e.preventDefault();
    if (outOfStock) return;
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      image: product.images[0],
      price: product.price,
      size: product.sizes[0],
      color: product.colors[0]?.name ?? "Default",
      quantity: 1,
    });
    router.push("/checkout");
  }

  return (
    <div className="group relative flex flex-col">
      <Link href={`/product/${product.slug}`} className="relative block overflow-hidden bg-mist">
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-100">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            priority={priority}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          />
          {product.images[1] && (
            <Image
              src={product.images[1]}
              alt=""
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100"
            />
          )}
          <div className="absolute left-2 top-2 flex flex-col gap-1.5">
            {product.isNew && (
              <span className="bg-white px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-neutral-900">
                New
              </span>
            )}
            <DiscountBadge price={product.price} previousPrice={product.previousPrice} />
          </div>
          <button
            type="button"
            aria-label="Toggle wishlist"
            onClick={(e) => {
              e.preventDefault();
              toggle(product.id);
              showToast(wishlisted ? "Removed from wishlist" : "Added to wishlist");
            }}
            className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-neutral-800 shadow-sm transition-colors hover:bg-white"
          >
            <HeartIcon filled={wishlisted} className={cn(wishlisted && "text-neutral-900")} />
          </button>
          {outOfStock && (
            <div className="absolute inset-x-0 bottom-0 bg-neutral-900/85 py-1.5 text-center text-[11px] uppercase tracking-wider text-white">
              Out of Stock
            </div>
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-2 pt-3">
        <Link href={`/product/${product.slug}`}>
          <h3 className="text-sm font-medium text-neutral-900 sm:text-base">{product.name}</h3>
        </Link>
        <PriceTag price={product.price} previousPrice={product.previousPrice} size="sm" />

        {product.colors.length > 1 && (
          <div className="flex items-center gap-1.5">
            {product.colors.slice(0, 5).map((c) => (
              <span
                key={c.name}
                title={c.name}
                className="h-3.5 w-3.5 rounded-full border border-neutral-300"
                style={{ backgroundColor: c.hex }}
              />
            ))}
          </div>
        )}

        <div className="mt-1 grid grid-cols-2 gap-2">
          <button
            type="button"
            disabled={outOfStock}
            onClick={handleAddToCart}
            className="border border-neutral-900 px-2 py-2 text-[11px] font-medium uppercase tracking-wider text-neutral-900 transition-colors hover:bg-neutral-900 hover:text-white disabled:cursor-not-allowed disabled:border-neutral-300 disabled:text-neutral-400 disabled:hover:bg-transparent"
          >
            Add to Cart
          </button>
          <button
            type="button"
            disabled={outOfStock}
            onClick={handleOrderNow}
            className="bg-neutral-900 px-2 py-2 text-[11px] font-medium uppercase tracking-wider text-white transition-colors hover:bg-neutral-700 disabled:cursor-not-allowed disabled:bg-neutral-300"
          >
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
}
