import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Accordion } from "@/components/product/Accordion";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about shopping at NOIRÉ.",
  alternates: { canonical: "/faq" },
};

const faqs = [
  {
    title: "Is this a real online store?",
    content: (
      <p>
        No. NOIRÉ is a demonstration fashion e-commerce website built by
        CodePixel Web to showcase our web development capabilities. No real
        orders or payments are processed.
      </p>
    ),
  },
  {
    title: "What payment methods are supported?",
    content: <p>This demo simulates Cash on Delivery only, as is common for e-commerce in Bangladesh.</p>,
  },
  {
    title: "How long does delivery take?",
    content: <p>Inside Dhaka typically takes 1-2 business days, while outside Dhaka takes 3-5 business days.</p>,
  },
  {
    title: "Can I build a real store like this?",
    content: <p>Yes — reach out to CodePixel Web via the WhatsApp button to discuss your project.</p>,
  },
];

export default function FaqPage() {
  return (
    <Container>
      <div className="mx-auto max-w-2xl py-14 sm:py-20">
        <SectionHeading eyebrow="Support" title="Frequently Asked Questions" />
        <div className="mt-8">
          <Accordion items={faqs} defaultOpenIndex={null} />
        </div>
      </div>
    </Container>
  );
}
