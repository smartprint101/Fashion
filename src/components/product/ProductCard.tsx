"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Product } from "@/types";
import { PriceTag } from "@/components/product/PriceTag";
import { DiscountBadge } from "@/components/product/DiscountBadge";
import { HeartIcon, BoltIcon, CartPlusIcon } from "@/components/ui/Icons";
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
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-line/70 bg-white p-2.5 shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_18px_40px_-18px_rgba(20,20,20,0.28)]">
      <Link href={`/product/${product.slug}`} className="relative block overflow-hidden rounded-xl bg-mist">
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-neutral-100">
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
          <div className="absolute left-2.5 top-2.5 flex flex-col gap-1.5">
            {product.isNew && (
              <span className="inline-flex items-center rounded-full bg-gradient-to-r from-emerald to-[#245640] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white shadow-sm">
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
            className={cn(
              "absolute right-2.5 top-2.5 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-neutral-800 shadow-sm backdrop-blur transition-all hover:scale-110 hover:bg-white",
              wishlisted && "text-rose"
            )}
          >
            <HeartIcon filled={wishlisted} className={cn(wishlisted && "text-rose")} />
          </button>
          {outOfStock && (
            <div className="absolute inset-x-0 bottom-0 bg-neutral-900/85 py-1.5 text-center text-[11px] uppercase tracking-wider text-white">
              Out of Stock
            </div>
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-2 px-1 pb-1 pt-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-accent">
          {product.subcategory}
        </span>
        <Link href={`/product/${product.slug}`}>
          <h3 className="text-sm font-medium text-neutral-900 transition-colors hover:text-accent sm:text-base">
            {product.name}
          </h3>
        </Link>
        <PriceTag price={product.price} previousPrice={product.previousPrice} size="sm" />

        {product.colors.length > 1 && (
          <div className="flex items-center gap-1.5">
            {product.colors.slice(0, 5).map((c) => (
              <span
                key={c.name}
                title={c.name}
                className="h-3.5 w-3.5 rounded-full border border-neutral-300 ring-1 ring-inset ring-white"
                style={{ backgroundColor: c.hex }}
              />
            ))}
          </div>
        )}

        <div className="mt-auto grid grid-cols-2 gap-2 pt-2">
          <button
            type="button"
            disabled={outOfStock}
            onClick={handleAddToCart}
            className="inline-flex items-center justify-center gap-1.5 rounded-full border border-neutral-900 px-2 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-neutral-900 transition-all hover:bg-neutral-900 hover:text-white disabled:cursor-not-allowed disabled:border-neutral-300 disabled:text-neutral-400 disabled:hover:bg-transparent"
          >
            <CartPlusIcon />
            <span>Cart</span>
          </button>
          <button
            type="button"
            disabled={outOfStock}
            onClick={handleOrderNow}
            className="btn-gold inline-flex items-center justify-center gap-1.5 rounded-full px-2 py-2.5 text-[11px] font-bold uppercase tracking-wider shadow-sm transition-all hover:shadow-md disabled:cursor-not-allowed disabled:bg-none disabled:bg-neutral-300 disabled:text-neutral-500"
          >
            <BoltIcon />
            Order
          </button>
        </div>
      </div>
    </div>
  );
}
