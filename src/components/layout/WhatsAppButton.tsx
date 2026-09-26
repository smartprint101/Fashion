"use client";

import { WhatsAppIcon } from "@/components/ui/Icons";
import { getWhatsappLink } from "@/config/site";

export function WhatsAppButton() {
  return (
    <a
      href={getWhatsappLink()}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform duration-200 hover:scale-105 sm:bottom-6 sm:right-6"
    >
      <WhatsAppIcon />
    </a>
  );
}
