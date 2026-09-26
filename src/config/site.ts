/**
 * Centralized site configuration.
 * Update brand, contact, delivery and WhatsApp details here in one place.
 */
export const siteConfig = {
  name: "NOIRÉ",
  shortName: "NOIRÉ",
  tagline: "Modern Fashion. Timeless Style.",
  title: "NOIRÉ — Modern Fashion Store",
  description:
    "A premium fashion e-commerce demo website by CodePixel Web.",
  url: "https://noire-demo.vercel.app",
  currencySymbol: "৳",
  freeDeliveryThreshold: 3000,
  delivery: {
    insideDhaka: 70,
    outsideDhaka: 130,
  },
  agency: {
    name: "CodePixel Web",
    url: "#",
  },
  social: {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    tiktok: "https://tiktok.com",
  },
  contact: {
    phone: "+880 1700-000000",
    whatsapp: "+880 1700-000000",
    email: "hello@noire-demo.com",
    address: "Gulshan Avenue, Dhaka, Bangladesh",
  },
} as const;

/**
 * Centralized WhatsApp configuration.
 * Change the number here to update it across the entire website.
 */
export const whatsappConfig = {
  /** Number in international format without + or spaces, used for wa.me links */
  number: "8801700000000",
  message:
    "আসসালামু আলাইকুম। আমি NOIRÉ Fashion Demo Website দেখে যোগাযোগ করছি। আমার ব্যবসার জন্য এমন একটি Website তৈরি করতে চাই।",
};

export function getWhatsappLink(): string {
  return `https://wa.me/${whatsappConfig.number}?text=${encodeURIComponent(
    whatsappConfig.message
  )}`;
}
