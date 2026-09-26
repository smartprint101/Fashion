/**
 * Generates elegant, on-brand editorial placeholder imagery for products
 * that do not yet have dedicated photography. This keeps the catalog
 * visually consistent while real photography can be swapped in later by
 * simply replacing files in public/images/products/{slug}-1.jpg / -2.jpg.
 *
 * Run with: node scripts/generate-placeholders.mjs
 */
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const outDir = path.join(root, "public", "images", "products");

// Minimal inline copy of product slugs/subcategories/category to avoid
// importing TypeScript from a plain node script.
const catalog = [
  ["relaxed-fit-t-shirt", "Relaxed Fit T-Shirt", "T-SHIRT", "men"],
  ["essential-oversized-tee", "Essential Oversized Tee", "OVERSIZED TEE", "men"],
  ["premium-polo", "Premium Polo", "POLO", "men"],
  ["straight-fit-denim", "Straight Fit Denim", "DENIM", "men"],
  ["classic-chino", "Classic Chino", "CHINO", "men"],
  ["modern-cargo-pant", "Modern Cargo Pant", "CARGO", "men"],
  ["signature-panjabi", "Signature Panjabi", "PANJABI", "men"],
  ["premium-kurta", "Premium Kurta", "KURTA", "men"],
  ["womens-linen-dress", "Women's Linen Dress", "LINEN DRESS", "women"],
  ["minimal-abaya", "Minimal Abaya", "ABAYA", "women"],
  ["classic-long-dress", "Classic Long Dress", "LONG DRESS", "women"],
  ["everyday-co-ord-set", "Everyday Co-Ord Set", "CO-ORD SET", "women"],
  ["womens-oversized-blazer", "Women's Oversized Blazer", "BLAZER", "women"],
  ["womens-relaxed-trousers", "Women's Relaxed Trousers", "TROUSERS", "women"],
  ["womens-silk-blouse", "Women's Silk Blouse", "BLOUSE", "women"],
  ["womens-knit-sweater", "Women's Knit Sweater", "KNITWEAR", "women"],
  ["premium-handbag", "Premium Handbag", "HANDBAG", "accessories"],
  ["leather-belt", "Leather Belt", "BELT", "accessories"],
  ["minimal-wallet", "Minimal Wallet", "WALLET", "accessories"],
  ["classic-sunglasses", "Classic Sunglasses", "EYEWEAR", "accessories"],
  ["premium-scarf", "Premium Scarf", "SCARF", "accessories"],
  ["everyday-sneakers", "Everyday Sneakers", "SNEAKERS", "accessories"],
];

const palettes = {
  men: { from: "#eceeee", to: "#dadde0", text: "#20242a" },
  women: { from: "#f4ede3", to: "#e6d9c7", text: "#2a2320" },
  accessories: { from: "#f1ece1", to: "#e3d6c1", text: "#241f18" },
};

const WIDTH = 1000;
const HEIGHT = 1250;

function buildSvg({ label, name, tint, variant }) {
  const angle = variant === 1 ? -8 : 6;
  const align = variant === 1 ? "middle" : "middle";
  const textY = variant === 1 ? HEIGHT / 2 : HEIGHT / 2;
  const captionY = variant === 1 ? HEIGHT - 120 : 130;
  const kicker = variant === 1 ? "NOIRÉ ATELIER" : "DETAIL";

  return `
  <svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${tint.from}" />
        <stop offset="100%" stop-color="${tint.to}" />
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#bg)" />
    <rect x="36" y="36" width="${WIDTH - 72}" height="${HEIGHT - 72}" fill="none" stroke="${tint.text}" stroke-opacity="0.18" stroke-width="1.5" />
    <g transform="translate(${WIDTH / 2}, ${textY}) rotate(${angle})">
      <text text-anchor="${align}" font-family="Georgia, 'Times New Roman', serif" font-size="92" letter-spacing="6" fill="${tint.text}" fill-opacity="0.10" font-weight="600">${label}</text>
    </g>
    <text x="${WIDTH / 2}" y="${captionY}" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="16" letter-spacing="4" fill="${tint.text}" fill-opacity="0.55">${kicker}</text>
    <text x="${WIDTH / 2}" y="${captionY + 34}" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="30" fill="${tint.text}" fill-opacity="0.92">${name}</text>
    <circle cx="80" cy="80" r="22" fill="none" stroke="${tint.text}" stroke-opacity="0.35" stroke-width="1.2" />
    <text x="80" y="88" text-anchor="middle" font-family="Georgia, serif" font-size="20" fill="${tint.text}" fill-opacity="0.55">N</text>
  </svg>`;
}

async function run() {
  fs.mkdirSync(outDir, { recursive: true });
  for (const [slug, name, label, category] of catalog) {
    const tint = palettes[category];
    for (const variant of [1, 2]) {
      const svg = buildSvg({ label, name, tint, variant });
      const outPath = path.join(outDir, `${slug}-${variant}.jpg`);
      await sharp(Buffer.from(svg)).jpeg({ quality: 82 }).toFile(outPath);
      console.log("generated", outPath);
    }
  }
}

run();
