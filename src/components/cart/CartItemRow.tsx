"use client";

import Image from "next/image";
import Link from "next/link";
import type { CartItem } from "@/types";
import { formatPrice } from "@/lib/format";
import { MinusIcon, PlusIcon, TrashIcon } from "@/components/ui/Icons";
import { useCart } from "@/context/CartContext";

export function CartItemRow({ item }: { item: CartItem }) {
  const { updateQuantity, removeItem } = useCart();

  return (
    <div className="flex gap-4 border-b border-line py-6 first:pt-0">
      <Link href={`/product/${item.slug}`} className="relative h-28 w-24 shrink-0 overflow-hidden bg-neutral-100 sm:h-32 sm:w-28">
        <Image src={item.image} alt={item.name} fill sizes="120px" className="object-cover" />
      </Link>

      <div className="flex flex-1 flex-col justify-between">
        <div className="flex items-start justify-between gap-3">
          <div>
            <Link href={`/product/${item.slug}`} className="text-sm font-medium text-neutral-900 sm:text-base">
              {item.name}
            </Link>
            <p className="mt-1 text-xs text-neutral-500">
              Size: {item.size} &middot; Color: {item.color}
            </p>
          </div>
          <button
            type="button"
            aria-label="Remove item"
            onClick={() => removeItem(item.productId, item.size, item.color)}
            className="text-neutral-400 hover:text-neutral-900"
          >
            <TrashIcon />
          </button>
        </div>

        <div className="flex items-end justify-between">
          <div className="flex h-9 w-fit items-center border border-neutral-300">
            <button
              type="button"
              aria-label="Decrease quantity"
              onClick={() => updateQuantity(item.productId, item.size, item.color, item.quantity - 1)}
              className="flex h-full w-8 items-center justify-center text-neutral-700"
            >
              <MinusIcon />
            </button>
            <span className="w-8 text-center text-sm">{item.quantity}</span>
            <button
              type="button"
              aria-label="Increase quantity"
              onClick={() => updateQuantity(item.productId, item.size, item.color, item.quantity + 1)}
              className="flex h-full w-8 items-center justify-center text-neutral-700"
            >
              <PlusIcon />
            </button>
          </div>
          <span className="text-sm font-medium text-neutral-900">
            {formatPrice(item.price * item.quantity)}
          </span>
        </div>
      </div>
    </div>
  );
}
