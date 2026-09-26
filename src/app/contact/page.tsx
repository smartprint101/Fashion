import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with the NOIRÉ team.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <Container>
      <div className="mx-auto max-w-2xl py-14 sm:py-20">
        <SectionHeading eyebrow="Get in Touch" title="Contact Us" />
        <div className="mt-8 flex flex-col gap-4 text-sm text-neutral-700">
          <p>We&apos;d love to hear from you. Reach us through any of the channels below.</p>
          <ul className="flex flex-col gap-2">
            <li>Phone: {siteConfig.contact.phone}</li>
            <li>WhatsApp: {siteConfig.contact.whatsapp}</li>
            <li>Email: {siteConfig.contact.email}</li>
            <li>Address: {siteConfig.contact.address}</li>
          </ul>
          <p className="mt-4 text-xs text-neutral-400">
            This is a demonstration website by CodePixel Web. Contact details shown here are for demo purposes only.
          </p>
        </div>
      </div>
    </Container>
  );
}
