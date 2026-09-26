"use client";

import { WhatsAppIcon } from "@/components/ui/Icons";
import { getWhatsappLink, whatsappConfig } from "@/config/site";

export function WhatsAppButton() {
  return (
    <div className="fixed bottom-5 right-5 z-[60] flex items-center gap-3 sm:bottom-6 sm:right-6">
      {/* Label pill — simple call to action */}
      <a
        href={getWhatsappLink()}
        target="_blank"
        rel="noreferrer"
        className="wa-label-in hidden max-w-[230px] items-center rounded-full border border-[#25D366]/30 bg-white/95 px-4 py-2.5 text-right text-[12px] font-semibold leading-snug text-neutral-800 shadow-lg backdrop-blur transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl sm:flex"
      >
        {whatsappConfig.label}
      </a>

      {/* Round WhatsApp button */}
      <a
        href={getWhatsappLink()}
        target="_blank"
        rel="noreferrer"
        aria-label={whatsappConfig.label}
        className="wa-pulse group relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#4ae07c] to-[#128C3E] text-white shadow-xl ring-2 ring-white/40 transition-transform duration-200 hover:scale-110"
      >
        <WhatsAppIcon />
        {/* Mobile-only floating hint */}
        <span className="pointer-events-none absolute -top-2 -left-2 flex h-4 w-4 items-center justify-center rounded-full bg-rose text-[9px] font-bold text-white sm:hidden">
          1
        </span>
      </a>
    </div>
  );
}
