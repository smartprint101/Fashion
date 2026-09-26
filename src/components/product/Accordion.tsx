"use client";

import { useState } from "react";
import { ChevronDownIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";

interface AccordionItem {
  title: string;
  content: React.ReactNode;
}

export function Accordion({ items, defaultOpenIndex = 0 }: { items: AccordionItem[]; defaultOpenIndex?: number | null }) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex);

  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={item.title}>
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="flex w-full items-center justify-between py-4 text-left"
              aria-expanded={isOpen}
            >
              <span className="text-sm font-medium uppercase tracking-wider text-neutral-900">
                {item.title}
              </span>
              <ChevronDownIcon
                className={cn("text-neutral-500 transition-transform duration-200", isOpen && "rotate-180")}
              />
            </button>
            <div
              className={cn(
                "grid overflow-hidden transition-all duration-300 ease-in-out",
                isOpen ? "grid-rows-[1fr] pb-5 opacity-100" : "grid-rows-[0fr] opacity-0"
              )}
            >
              <div className="overflow-hidden text-sm leading-relaxed text-neutral-600">
                {item.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
