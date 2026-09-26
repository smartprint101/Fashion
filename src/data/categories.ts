import type { ProductCategory } from "@/types";

export interface CategoryMeta {
  slug: ProductCategory;
  name: string;
  heading: string;
  description: string;
  image: string;
}

export const categories: CategoryMeta[] = [
  {
    slug: "women",
    name: "Women",
    heading: "Women",
    description: "Fashionable women's clothing.",
    image: "/images/category/women.jpg",
  },
  {
    slug: "men",
    name: "Men",
    heading: "Men",
    description: "Modern men's essentials.",
    image: "/images/category/men.jpg",
  },
  {
    slug: "accessories",
    name: "Accessories",
    heading: "Accessories",
    description: "Premium accessories and lifestyle pieces.",
    image: "/images/category/accessories.jpg",
  },
];

export interface Collection {
  slug: string;
  name: string;
  description: string;
  image: string;
  tag: string;
}

export const collections: Collection[] = [
  {
    slug: "everyday-edit",
    name: "The Everyday Edit",
    description: "Effortless staples designed for daily wear.",
    image: "/images/category/women.jpg",
    tag: "everyday",
  },
  {
    slug: "office-ready",
    name: "Office Ready",
    description: "Sharp, tailored pieces for the modern workplace.",
    image: "/images/category/men.jpg",
    tag: "office",
  },
  {
    slug: "monochrome",
    name: "The Monochrome Edit",
    description: "Timeless black, white and neutral tones.",
    image: "/images/promo/banner.jpg",
    tag: "monochrome",
  },
  {
    slug: "finishing-touches",
    name: "Finishing Touches",
    description: "Accessories that complete every outfit.",
    image: "/images/category/accessories.jpg",
    tag: "accessory-edit",
  },
];
