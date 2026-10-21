// Generates public/images/og-image.jpg (1200x630) — branded link-preview card.
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const outDir = path.join(process.cwd(), "public", "images");

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#ffffff"/>
      <stop offset="1" stop-color="#eef4ff"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect x="0" y="0" width="1200" height="10" fill="#2563eb"/>
  <circle cx="1050" cy="120" r="220" fill="#3b82f6" opacity="0.08"/>
  <circle cx="150" cy="540" r="180" fill="#f59e0b" opacity="0.08"/>
  <g>
    <rect x="80" y="150" width="96" height="96" rx="24" fill="#2563eb"/>
    <text x="128" y="218" font-family="Arial, Helvetica, sans-serif" font-size="56" font-weight="bold" fill="#ffffff" text-anchor="middle">C</text>
  </g>
  <text x="200" y="200" font-family="Arial, Helvetica, sans-serif" font-size="44" font-weight="bold" fill="#0f172a">Chrisko <tspan fill="#2563eb">Home Automation</tspan></text>
  <text x="200" y="245" font-family="Arial, Helvetica, sans-serif" font-size="24" fill="#475569">Professional furniture assembly in Toronto &amp; the GTA</text>
  <text x="80" y="350" font-family="Arial, Helvetica, sans-serif" font-size="56" font-weight="bold" fill="#0f172a">Furniture Assembly Services</text>
  <text x="80" y="420" font-family="Arial, Helvetica, sans-serif" font-size="56" font-weight="bold" fill="#0f172a">in Toronto &amp; the GTA</text>
  <g font-family="Arial, Helvetica, sans-serif" font-size="26" fill="#334155">
    <text x="80" y="500">$2M insured  ·  Upfront pricing from $199+HST  ·  12-month warranty</text>
  </g>
  <g>
    <rect x="80" y="530" width="360" height="60" rx="30" fill="#2563eb"/>
    <text x="260" y="570" font-family="Arial, Helvetica, sans-serif" font-size="26" font-weight="bold" fill="#ffffff" text-anchor="middle">+1 (437) 870-1113</text>
    <text x="470" y="570" font-family="Arial, Helvetica, sans-serif" font-size="26" font-weight="bold" fill="#2563eb">www.chriskohomeautomation.com</text>
  </g>
</svg>`;

await mkdir(outDir, { recursive: true });
await sharp(Buffer.from(svg), { density: 96 })
  .resize(1200, 630)
  .jpeg({ quality: 88 })
  .toFile(path.join(outDir, "og-image.jpg"));
console.log("wrote og-image.jpg");
