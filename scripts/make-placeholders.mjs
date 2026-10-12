import fs from 'fs';
import path from 'path';
import { createSolidPng } from './png-helper.mjs';

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// 1x1 base64 valid WebP
const DUMMY_WEBP = Buffer.from(
  'UklGRkAAAABXRUJQVlA4IDQAAADwAQCdASoBAAEAAkA4JaQAA3AA/vsP/wAAAAD+0v4A/vAA/wAAAAAAAAAAAAAAAAAAAAAA',
  'base64'
);

console.log('--- Generating Asset Placeholders ---');

// 1. Hero
ensureDir('public/assets/hero');
fs.writeFileSync('public/assets/hero/hero-subject.webp', DUMMY_WEBP);
fs.writeFileSync(
  'public/assets/hero/hero-subject-mask.png',
  createSolidPng(100, 100, [255, 255, 255, 255])
);
fs.writeFileSync('public/assets/hero/mini-goggle.webp', DUMMY_WEBP);

// 2. Ornaments
ensureDir('public/assets/ornaments');
const arcsSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" fill="none">
  <circle cx="400" cy="400" r="180" stroke="#D93A0B" stroke-width="2" opacity="0.6"/>
  <circle cx="400" cy="400" r="280" stroke="#D93A0B" stroke-width="2" opacity="0.4"/>
  <circle cx="400" cy="400" r="380" stroke="#D93A0B" stroke-width="1.5" stroke-dasharray="8 8" opacity="0.3"/>
</svg>`;
fs.writeFileSync('public/assets/ornaments/arcs.svg', arcsSvg.trim());

const rainStreaksSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" fill="none">
  <line x1="20" y1="0" x2="0" y2="40" stroke="#FFFFFF" stroke-width="1" opacity="0.25"/>
  <line x1="80" y1="10" x2="60" y2="50" stroke="#FFFFFF" stroke-width="1" opacity="0.2"/>
  <line x1="140" y1="0" x2="120" y2="40" stroke="#FFFFFF" stroke-width="1" opacity="0.3"/>
  <line x1="190" y1="30" x2="170" y2="70" stroke="#FFFFFF" stroke-width="1" opacity="0.2"/>
</svg>`;
fs.writeFileSync('public/assets/ornaments/rain-streaks.svg', rainStreaksSvg.trim());

const barcodeSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 24" fill="#FFFFFF">
  <rect x="0" y="0" width="2" height="24"/>
  <rect x="4" y="0" width="4" height="24"/>
  <rect x="10" y="0" width="1" height="24"/>
  <rect x="13" y="0" width="3" height="24"/>
  <rect x="18" y="0" width="6" height="24"/>
  <rect x="26" y="0" width="2" height="24"/>
  <rect x="30" y="0" width="4" height="24"/>
  <rect x="36" y="0" width="1" height="24"/>
  <rect x="40" y="0" width="5" height="24"/>
  <rect x="48" y="0" width="2" height="24"/>
  <rect x="52" y="0" width="3" height="24"/>
  <rect x="58" y="0" width="6" height="24"/>
  <rect x="66" y="0" width="1" height="24"/>
  <rect x="70" y="0" width="4" height="24"/>
  <rect x="76" y="0" width="2" height="24"/>
  <rect x="80" y="0" width="5" height="24"/>
  <rect x="88" y="0" width="3" height="24"/>
  <rect x="94" y="0" width="1" height="24"/>
  <rect x="98" y="0" width="4" height="24"/>
  <rect x="104" y="0" width="2" height="24"/>
  <rect x="108" y="0" width="5" height="24"/>
  <rect x="116" y="0" width="2" height="24"/>
</svg>`;
fs.writeFileSync('public/assets/ornaments/barcode.svg', barcodeSvg.trim());

// 3. Showcase 360 frames (48 desktop, 24 mobile)
ensureDir('public/assets/showcase');
ensureDir('public/assets/showcase/m');

for (let i = 0; i < 48; i++) {
  const frameNum = String(i).padStart(3, '0');
  fs.writeFileSync(`public/assets/showcase/frame-${frameNum}.webp`, DUMMY_WEBP);
}

for (let i = 0; i < 24; i++) {
  const frameNum = String(i).padStart(3, '0');
  fs.writeFileSync(`public/assets/showcase/m/frame-${frameNum}.webp`, DUMMY_WEBP);
}

// 4. Spotlight
const spotlightSlugs = [
  'jaket-hardshell-shadow',
  'carrier-alpine-60',
  'tenda-storm-veil-2p',
  'sepatu-summit-gtx',
];

for (const slug of spotlightSlugs) {
  const sDir = `public/assets/spotlight/${slug}`;
  ensureDir(sDir);
  fs.writeFileSync(`${sDir}/cutout.webp`, DUMMY_WEBP);
  fs.writeFileSync(`${sDir}/gallery-1.webp`, DUMMY_WEBP);
  fs.writeFileSync(`${sDir}/gallery-2.webp`, DUMMY_WEBP);
  fs.writeFileSync(`${sDir}/gallery-3.webp`, DUMMY_WEBP);
}

// 5. Products catalog (16 items)
ensureDir('public/assets/products');
for (let i = 1; i <= 16; i++) {
  const pNum = String(i).padStart(2, '0');
  fs.writeFileSync(`public/assets/products/p-${pNum}.webp`, DUMMY_WEBP);
}

// 6. Textures
ensureDir('public/assets/textures');
fs.writeFileSync(
  'public/assets/textures/grain.png',
  createSolidPng(32, 32, [128, 128, 128, 15])
);

// 7. Brand
ensureDir('public/assets/brand');
const logoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 40" fill="none">
  <text x="0" y="28" font-family="Manrope, sans-serif" font-weight="800" font-size="24" fill="#FFFFFF" letter-spacing="-0.04em">
    [brand]<tspan fill="#22C3F5">.</tspan>
  </text>
</svg>`;
fs.writeFileSync('public/assets/brand/logo.svg', logoSvg.trim());

// 8. OG & Favicon
ensureDir('public/assets/og');
fs.writeFileSync(
  'public/assets/og/og-image.jpg',
  createSolidPng(50, 50, [255, 69, 19, 255])
);

console.log('Asset placeholders generated successfully!');
