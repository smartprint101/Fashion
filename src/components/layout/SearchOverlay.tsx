"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { CloseIcon, SearchIcon } from "@/components/ui/Icons";
import { Container } from "@/components/ui/Container";

export function SearchOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(t);
    }
  }, [open]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    onClose();
  }

  if (!open) return null;

  return (
    <div className="absolute inset-x-0 top-full z-40 border-b border-line bg-white shadow-sm animate-fade-in">
      <Container className="py-5">
        <form onSubmit={handleSubmit} className="flex items-center gap-3">
          <SearchIcon className="shrink-0 text-neutral-500" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for products..."
            className="w-full border-none bg-transparent text-base text-neutral-900 outline-none placeholder:text-neutral-400 sm:text-lg"
          />
          <button
            type="button"
            aria-label="Close search"
            onClick={onClose}
            className="shrink-0 text-neutral-500 hover:text-neutral-900"
          >
            <CloseIcon />
          </button>
        </form>
      </Container>
    </div>
  );
}
