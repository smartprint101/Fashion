import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { products } from "@/data/products";
import { collections } from "@/data/categories";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/men",
    "/women",
    "/accessories",
    "/new-arrivals",
    "/sale",
    "/collections",
    "/search",
    "/cart",
    "/contact",
    "/delivery",
    "/returns",
    "/size-guide",
    "/faq",
  ].map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
  }));

  const productRoutes = products.map((p) => ({
    url: `${siteConfig.url}/product/${p.slug}`,
    lastModified: new Date(p.createdAt),
  }));

  const collectionRoutes = collections.map((c) => ({
    url: `${siteConfig.url}/collections/${c.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...productRoutes, ...collectionRoutes];
}
