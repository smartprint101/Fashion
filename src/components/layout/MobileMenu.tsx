"use client";

import Link from "next/link";
import { CloseIcon } from "@/components/ui/Icons";
import { siteConfig } from "@/config/site";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "New Arrivals", href: "/new-arrivals" },
  { label: "Men", href: "/men" },
  { label: "Women", href: "/women" },
  { label: "Collections", href: "/collections" },
  { label: "Sale", href: "/sale" },
];

export function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <div
      className={`fixed inset-0 z-[70] lg:hidden ${open ? "pointer-events-auto" : "pointer-events-none"}`}
      aria-hidden={!open}
    >
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-neutral-900/40 transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />
      <div
        className={`absolute left-0 top-0 flex h-full w-[84%] max-w-xs flex-col bg-white shadow-xl transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-line px-5 py-5">
          <span className="font-display text-xl tracking-wide">{siteConfig.name}</span>
          <button aria-label="Close menu" onClick={onClose} className="text-neutral-700">
            <CloseIcon />
          </button>
        </div>
        <nav className="flex flex-col gap-1 px-5 py-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="border-b border-line py-3.5 text-sm font-medium uppercase tracking-wider text-neutral-800"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto flex flex-col gap-3 px-5 py-6 text-sm text-neutral-500">
          <Link href="/account" onClick={onClose}>Account</Link>
          <Link href="/wishlist" onClick={onClose}>Wishlist</Link>
        </div>
      </div>
    </div>
  );
}
