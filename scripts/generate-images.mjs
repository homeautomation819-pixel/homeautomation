// Generates branded abstract placeholder images (WebP) for the site.
// Run: npm run images
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const outDir = path.join(process.cwd(), "public", "images");

// [filename, gradient start, gradient end, accent]
const images = [
  ["smart-home-automation-toronto-hero", "#0a0e1a", "#1d3a8a", "#3b82f6"],
  ["whole-home-automation-system-toronto", "#0a0e1a", "#134e6f", "#22d3ee"],
  ["smart-lighting-installation-toronto", "#0a0e1a", "#7c2d12", "#f59e0b"],
  ["home-theatre-installation-toronto", "#0a0e1a", "#4c1d95", "#8b5cf6"],
  ["security-camera-installation-toronto", "#0a0e1a", "#14532d", "#22c55e"],
  ["home-wifi-network-installation-toronto", "#0a0e1a", "#0c4a6e", "#38bdf8"],
  ["smart-thermostat-installation-toronto", "#0a0e1a", "#7f1d1d", "#f87171"],
  ["motorized-blinds-installation-toronto", "#0a0e1a", "#713f12", "#fbbf24"],
  ["multi-room-audio-installation-toronto", "#0a0e1a", "#701a75", "#e879f9"],
  ["smart-home-project-toronto-condo", "#0a0e1a", "#1e3a8a", "#60a5fa"],
  ["home-theatre-project-vaughan", "#0a0e1a", "#581c87", "#a78bfa"],
  ["smart-lighting-project-markham", "#0a0e1a", "#78350f", "#fcd34d"],
  ["security-camera-project-scarborough", "#0a0e1a", "#064e3b", "#34d399"],
  ["mesh-wifi-project-mississauga", "#0a0e1a", "#075985", "#7dd3fc"],
  ["motorized-blinds-project-oakville", "#0a0e1a", "#854d0e", "#fde68a"],
  ["smart-home-installers-toronto-team", "#0a0e1a", "#1e293b", "#94a3b8"],
  ["home-automation-cost-toronto-guide", "#0a0e1a", "#134e4a", "#2dd4bf"],
  ["smart-home-condo-ideas-toronto", "#0a0e1a", "#312e81", "#818cf8"],
  ["matter-thread-smart-home-explained", "#0a0e1a", "#0f766e", "#5eead4"],
  ["fix-wifi-dead-zones-mesh-network", "#0a0e1a", "#1d4ed8", "#93c5fd"],
];

function svg(from, to, accent, seed) {
  const cx = 300 + (seed % 5) * 140;
  const cy = 200 + (seed % 3) * 130;
  const cx2 = 1400 - (seed % 4) * 150;
  const cy2 = 550 - (seed % 3) * 120;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${from}"/>
      <stop offset="1" stop-color="${to}"/>
    </linearGradient>
    <radialGradient id="glow1" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0" stop-color="${accent}" stop-opacity="0.55"/>
      <stop offset="1" stop-color="${accent}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glow2" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0" stop-color="#22d3ee" stop-opacity="0.35"/>
      <stop offset="1" stop-color="#22d3ee" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1600" height="900" fill="url(#bg)"/>
  <circle cx="${cx}" cy="${cy}" r="420" fill="url(#glow1)"/>
  <circle cx="${cx2}" cy="${cy2}" r="380" fill="url(#glow2)"/>
  <g stroke="${accent}" stroke-opacity="0.35" stroke-width="2" fill="none">
    <path d="M0 ${640 - (seed % 5) * 30} Q 400 ${520 - (seed % 3) * 40} 800 ${600} T 1600 ${560 + (seed % 4) * 30}"/>
    <path d="M0 ${720 - (seed % 4) * 25} Q 500 ${600} 900 ${680} T 1600 ${640}" stroke-opacity="0.2"/>
  </g>
  <g fill="${accent}" fill-opacity="0.7">
    <circle cx="${cx}" cy="${cy}" r="7"/>
    <circle cx="${cx2}" cy="${cy2}" r="6"/>
    <circle cx="${(cx + cx2) / 2}" cy="${(cy + cy2) / 2}" r="5"/>
  </g>
  <g stroke="#ffffff" stroke-opacity="0.08" stroke-width="1">
    ${Array.from({ length: 12 }, (_, i) => `<line x1="${i * 145}" y1="0" x2="${i * 145}" y2="900"/>`).join("")}
  </g>
</svg>`;
}

await mkdir(outDir, { recursive: true });

for (let i = 0; i < images.length; i++) {
  const [name, from, to, accent] = images[i];
  const buf = await sharp(Buffer.from(svg(from, to, accent, i + 3)), { density: 96 })
    .resize(1600, 900)
    .webp({ quality: 78 })
    .toBuffer();
  await sharp(buf).toFile(path.join(outDir, `${name}.webp`));
  console.log(`wrote ${name}.webp`);
}
console.log("done");
