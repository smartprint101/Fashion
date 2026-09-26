# NOIRÉ — Premium Fashion E-commerce Demo

A production-quality **fashion e-commerce demo website** built by **CodePixel Web** to
showcase full-stack frontend capability for prospective clients. NOIRÉ is a fictional,
minimal, premium fashion brand tailored for the Bangladeshi online shopping audience.

> This is a **demo website**. There is no real payment gateway, courier API, or backend —
> all shopping functionality (cart, checkout, wishlist, orders) runs entirely on the
> frontend using mock data and browser storage.

## Tech Stack

- [Next.js 16](https://nextjs.org/) (App Router, TypeScript)
- [Tailwind CSS v4](https://tailwindcss.com/)
- Reusable, composable React components
- Zero unnecessary third-party UI/state libraries (Context API + `localStorage`)
- Fully static build (SSG) — ready for Vercel

## Getting Started

```bash
npm install
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000).

## Production Build

```bash
npm run build
npm start
```

The project builds to fully static pages and is ready to deploy on **Vercel** by simply
importing the GitHub repository — no environment variables or extra configuration
required.

## Project Structure

```
src/
  app/               Next.js App Router pages (routes)
  components/        Reusable UI, layout, product, cart & checkout components
  context/           Cart, Wishlist and Toast state (Context API + localStorage)
  data/              Centralized mock data (products, categories, districts)
  config/site.ts     Brand, contact info, delivery fees & WhatsApp configuration
  lib/               Formatting & utility helpers
  types/             Shared TypeScript types
scripts/             One-off scripts (placeholder image generation)
public/images/       Product, hero, category & promo imagery
```

## Key Customization Points

- **Brand & delivery settings** — `src/config/site.ts`
- **WhatsApp number & default message** — `src/config/site.ts` (`whatsappConfig`)
- **Product catalog** — `src/data/products.ts` (single source of truth for all 24 products)
- **Categories & curated collections** — `src/data/categories.ts`

## Features Implemented

- Sticky header with announcement bar, search, account, wishlist & cart
- Editorial homepage hero, category showcase, new arrivals, promo banner, trust section, newsletter
- 24 realistic products with pricing, discounts, colors, sizes and stock status
- Product detail page with gallery, color/size selection, quantity, accordions
- Cart & checkout flow with Bangla-localized fields, Cash on Delivery, and delivery fee logic
- Toast-based validation (no native browser alerts)
- Category pages (Men, Women, Accessories, New Arrivals, Sale) with filtering & sorting
- Full-text search
- Floating WhatsApp contact button
- Mobile-first, responsive design with subtle premium animation
- Basic SEO: metadata, Open Graph, sitemap.xml, robots.txt

---

Demo Website by **CodePixel Web**.
