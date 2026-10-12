/**
 * swap-assets.mjs
 *
 * Mengganti placeholder di public/assets/ dengan aset final dari folder sumber.
 *
 * Cara pakai:
 *   node scripts/swap-assets.mjs ./incoming-assets
 *
 * Struktur folder sumber harus mengikuti konvensi:
 *   incoming-assets/
 *   ├── hero/
 *   │   ├── hero-subject.webp
 *   │   └── hero-subject-mask.png
 *   ├── showcase/
 *   │   ├── frame-000.webp ... frame-047.webp   (desktop 48 frames)
 *   │   └── m/
 *   │       └── frame-000.webp ... frame-023.webp (mobile 24 frames)
 *   ├── spotlight/
 *   │   ├── spotlight-main.webp
 *   │   └── spotlight-secondary.webp
 *   ├── products/
 *   │   └── p-01.webp ... p-16.webp
 *   └── og/
 *       └── og-image.jpg
 *
 * File yang cocok akan disalin ke public/assets/ menimpa placeholder.
 * File yang tidak cocok akan dilewati dengan peringatan.
 */

import fs from 'fs';
import path from 'path';

const RESET = '\x1b[0m';
const GREEN = '\x1b[32m';
const RED = '\x1b[31m';
const YELLOW = '\x1b[33m';
const CYAN = '\x1b[36m';
const DIM = '\x1b[2m';

const sourceDir = process.argv[2];

if (!sourceDir) {
  console.error(`${RED}Usage: node scripts/swap-assets.mjs <source-directory>${RESET}`);
  console.error(`\nContoh: node scripts/swap-assets.mjs ./incoming-assets`);
  process.exit(1);
}

if (!fs.existsSync(sourceDir)) {
  console.error(`${RED}Directory not found: ${sourceDir}${RESET}`);
  process.exit(1);
}

const TARGET = 'public/assets';

const expectedFiles = [
  { src: 'hero/hero-subject.webp',      dst: 'hero/hero-subject.webp' },
  { src: 'hero/hero-subject-mask.png',   dst: 'hero/hero-subject-mask.png' },
  { src: 'hero/mini-goggle.webp',        dst: 'hero/mini-goggle.webp' },
  { src: 'og/og-image.jpg',             dst: 'og/og-image.jpg' },
];

// Spotlight per-slug
const spotlightSlugs = [
  'jaket-hardshell-shadow',
  'carrier-alpine-60',
  'tenda-storm-veil-2p',
  'sepatu-summit-gtx',
];
for (const slug of spotlightSlugs) {
  for (const file of ['cutout.webp', 'gallery-1.webp', 'gallery-2.webp', 'gallery-3.webp']) {
    expectedFiles.push({ src: `spotlight/${slug}/${file}`, dst: `spotlight/${slug}/${file}` });
  }
}

// Showcase frames
for (let i = 0; i < 48; i++) {
  const name = `frame-${String(i).padStart(3, '0')}.webp`;
  expectedFiles.push({ src: `showcase/${name}`, dst: `showcase/${name}` });
}
for (let i = 0; i < 24; i++) {
  const name = `frame-${String(i).padStart(3, '0')}.webp`;
  expectedFiles.push({ src: `showcase/m/${name}`, dst: `showcase/m/${name}` });
}

// Product images
for (let i = 1; i <= 16; i++) {
  const name = `p-${String(i).padStart(2, '0')}.webp`;
  expectedFiles.push({ src: `products/${name}`, dst: `products/${name}` });
}

console.log(`\n${CYAN}╔══════════════════════════════════════════╗${RESET}`);
console.log(`${CYAN}║         ASSET SWAP TOOL v1.0             ║${RESET}`);
console.log(`${CYAN}╚══════════════════════════════════════════╝${RESET}\n`);
console.log(`  Source: ${CYAN}${path.resolve(sourceDir)}${RESET}`);
console.log(`  Target: ${CYAN}${path.resolve(TARGET)}${RESET}\n`);

let swapped = 0;
let skipped = 0;
let notFound = 0;

for (const file of expectedFiles) {
  const srcPath = path.join(sourceDir, file.src);
  const dstPath = path.join(TARGET, file.dst);

  if (!fs.existsSync(srcPath)) {
    notFound++;
    continue;
  }

  // Validate format matches expected extension
  const srcExt = path.extname(srcPath).toLowerCase();
  const dstExt = path.extname(dstPath).toLowerCase();

  if (srcExt !== dstExt) {
    console.log(`  ${YELLOW}SKIP${RESET} ${file.src} ${DIM}(expected ${dstExt}, got ${srcExt})${RESET}`);
    skipped++;
    continue;
  }

  // Validate file is not empty
  const stats = fs.statSync(srcPath);
  if (stats.size === 0) {
    console.log(`  ${YELLOW}SKIP${RESET} ${file.src} ${DIM}(empty file)${RESET}`);
    skipped++;
    continue;
  }

  // Ensure target directory exists
  const dstDir = path.dirname(dstPath);
  if (!fs.existsSync(dstDir)) {
    fs.mkdirSync(dstDir, { recursive: true });
  }

  // Copy file
  fs.copyFileSync(srcPath, dstPath);
  const kb = (stats.size / 1024).toFixed(1);
  console.log(`  ${GREEN}SWAP${RESET} ${file.dst} ${DIM}(${kb} KB)${RESET}`);
  swapped++;
}

console.log(`\n${CYAN}═══════════════════════════════════════════${RESET}`);
console.log(`  Swapped:   ${GREEN}${swapped}${RESET}`);
console.log(`  Skipped:   ${YELLOW}${skipped}${RESET}`);
console.log(`  Not found: ${DIM}${notFound}${RESET} ${DIM}(not in source dir, placeholder kept)${RESET}`);
console.log(`${CYAN}═══════════════════════════════════════════${RESET}`);

if (swapped > 0) {
  console.log(`\n${GREEN}✓ ${swapped} assets swapped successfully.${RESET}`);
  console.log(`${DIM}Run "node scripts/check-assets.mjs" to verify integrity.${RESET}\n`);
} else {
  console.log(`\n${YELLOW}No matching assets found in source directory.${RESET}\n`);
}
