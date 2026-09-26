import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/config/site";
import { Newsletter } from "@/components/home/Newsletter";

const shopLinks = [
  { label: "Men", href: "/men" },
  { label: "Women", href: "/women" },
  { label: "Accessories", href: "/accessories" },
  { label: "New Arrivals", href: "/new-arrivals" },
  { label: "Sale", href: "/sale" },
];

const careLinks = [
  { label: "Contact", href: "/contact" },
  { label: "Delivery", href: "/delivery" },
  { label: "Returns", href: "/returns" },
  { label: "Size Guide", href: "/size-guide" },
  { label: "FAQ", href: "/faq" },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-white">
      <Container className="py-14">
        <Newsletter />

        <div className="mt-14 grid grid-cols-2 gap-10 border-t border-line pt-14 sm:grid-cols-2 lg:grid-cols-5">
          <div className="col-span-2 flex flex-col gap-4 lg:col-span-2">
            <span className="font-display text-2xl tracking-[0.15em] text-neutral-900">
              {siteConfig.name}
            </span>
            <p className="max-w-xs text-sm text-neutral-600">
              {siteConfig.tagline} Thoughtfully designed fashion essentials for
              modern everyday living, crafted for the way Bangladesh shops online.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-medium uppercase tracking-wider text-neutral-900">
              Shop
            </h4>
            <ul className="flex flex-col gap-2.5">
              {shopLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-neutral-600 hover:text-neutral-950">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-medium uppercase tracking-wider text-neutral-900">
              Customer Care
            </h4>
            <ul className="flex flex-col gap-2.5">
              {careLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-neutral-600 hover:text-neutral-950">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-medium uppercase tracking-wider text-neutral-900">
              Contact
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm text-neutral-600">
              <li>{siteConfig.contact.phone}</li>
              <li>WhatsApp: {siteConfig.contact.whatsapp}</li>
              <li>{siteConfig.contact.email}</li>
              <li>{siteConfig.contact.address}</li>
            </ul>
            <h4 className="mb-3 mt-6 text-xs font-medium uppercase tracking-wider text-neutral-900">
              Follow Us
            </h4>
            <ul className="flex items-center gap-4 text-sm text-neutral-600">
              <li>
                <a href={siteConfig.social.facebook} target="_blank" rel="noreferrer" className="hover:text-neutral-950">
                  Facebook
                </a>
              </li>
              <li>
                <a href={siteConfig.social.instagram} target="_blank" rel="noreferrer" className="hover:text-neutral-950">
                  Instagram
                </a>
              </li>
              <li>
                <a href={siteConfig.social.tiktok} target="_blank" rel="noreferrer" className="hover:text-neutral-950">
                  TikTok
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-line pt-6 text-center text-xs text-neutral-500 sm:flex-row sm:text-left">
          <p>
            &copy; {new Date().getFullYear()} {siteConfig.name}. This is a
            demonstration website created by CodePixel Web.
          </p>
          <p className="text-neutral-400">Demo Website by CodePixel Web</p>
        </div>
      </Container>
    </footer>
  );
}
