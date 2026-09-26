"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Container } from "@/components/ui/Container";
import {
  BagIcon,
  HeartIcon,
  MenuIcon,
  SearchIcon,
  UserIcon,
} from "@/components/ui/Icons";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { SearchOverlay } from "@/components/layout/SearchOverlay";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "New Arrivals", href: "/new-arrivals" },
  { label: "Men", href: "/men" },
  { label: "Women", href: "/women" },
  { label: "Collections", href: "/collections" },
  { label: "Sale", href: "/sale" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { itemCount } = useCart();
  const { count: wishlistCount } = useWishlist();
  const pathname = usePathname();

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 12);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b bg-white/95 backdrop-blur transition-shadow duration-300",
        scrolled ? "border-line shadow-[0_1px_0_0_rgba(0,0,0,0.04)]" : "border-transparent"
      )}
    >
      <Container>
        <div className="relative flex h-16 items-center justify-between sm:h-20">
          <button
            aria-label="Open menu"
            onClick={() => setMobileOpen(true)}
            className="flex items-center text-neutral-800 lg:hidden"
          >
            <MenuIcon />
          </button>

          <Link
            href="/"
            className="font-display absolute left-1/2 -translate-x-1/2 text-xl font-semibold tracking-[0.15em] text-neutral-900 sm:text-2xl lg:static lg:left-0 lg:translate-x-0"
          >
            {siteConfig.name}
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setSearchOpen(false)}
                className={cn(
                  "text-xs font-medium uppercase tracking-wider text-neutral-700 transition-colors hover:text-neutral-950",
                  pathname === link.href && "text-neutral-950"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3 sm:gap-4">
            <button
              aria-label="Search"
              onClick={() => setSearchOpen((v) => !v)}
              className="text-neutral-800 hover:text-neutral-500"
            >
              <SearchIcon />
            </button>
            <Link href="/account" aria-label="Account" className="hidden text-neutral-800 hover:text-neutral-500 sm:block">
              <UserIcon />
            </Link>
            <Link href="/wishlist" aria-label="Wishlist" className="relative hidden text-neutral-800 hover:text-neutral-500 sm:block">
              <HeartIcon />
              {wishlistCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-neutral-900 text-[9px] text-white">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <Link href="/cart" aria-label="Cart" className="relative text-neutral-800 hover:text-neutral-500">
              <BagIcon />
              {itemCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-neutral-900 text-[9px] text-white">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </Container>
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}
