"use client";

import { CloseIcon } from "@/components/ui/Icons";

const rows = [
  { size: "S", chest: "36-38", waist: "30-32", length: "27" },
  { size: "M", chest: "39-41", waist: "33-35", length: "28" },
  { size: "L", chest: "42-44", waist: "36-38", length: "29" },
  { size: "XL", chest: "45-47", waist: "39-41", length: "30" },
  { size: "XXL", chest: "48-50", waist: "42-44", length: "31" },
];

export function SizeGuideModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center bg-neutral-950/50 sm:items-center">
      <div className="w-full max-w-lg animate-fade-in-up bg-white p-6 sm:p-8">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="font-display text-xl text-neutral-900">Size Guide</h3>
          <button aria-label="Close" onClick={onClose} className="text-neutral-500 hover:text-neutral-900">
            <CloseIcon />
          </button>
        </div>
        <p className="mb-4 text-xs text-neutral-500">All measurements are in inches. For the best fit, measure a similar garment you already own.</p>
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-line text-left text-xs uppercase tracking-wider text-neutral-500">
              <th className="py-2">Size</th>
              <th className="py-2">Chest</th>
              <th className="py-2">Waist</th>
              <th className="py-2">Length</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.size} className="border-b border-line text-neutral-800">
                <td className="py-2.5 font-medium">{row.size}</td>
                <td className="py-2.5">{row.chest}</td>
                <td className="py-2.5">{row.waist}</td>
                <td className="py-2.5">{row.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
