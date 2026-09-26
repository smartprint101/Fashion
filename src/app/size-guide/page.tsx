import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Size Guide",
  description: "Find your perfect NOIRÉ fit with our size guide.",
  alternates: { canonical: "/size-guide" },
};

const rows = [
  { size: "S", chest: "36-38", waist: "30-32", length: "27" },
  { size: "M", chest: "39-41", waist: "33-35", length: "28" },
  { size: "L", chest: "42-44", waist: "36-38", length: "29" },
  { size: "XL", chest: "45-47", waist: "39-41", length: "30" },
  { size: "XXL", chest: "48-50", waist: "42-44", length: "31" },
];

export default function SizeGuidePage() {
  return (
    <Container>
      <div className="mx-auto max-w-2xl py-14 sm:py-20">
        <SectionHeading eyebrow="Support" title="Size Guide" />
        <p className="mt-6 text-sm text-neutral-600">
          All measurements are in inches. For the best fit, measure a similar
          garment you already own and compare with the chart below.
        </p>
        <table className="mt-8 w-full border-collapse text-sm">
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
    </Container>
  );
}
