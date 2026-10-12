import fs from 'fs';
import path from 'path';

const RESET = '\x1b[0m';
const GREEN = '\x1b[32m';
const RED = '\x1b[31m';
const YELLOW = '\x1b[33m';
const CYAN = '\x1b[36m';
const DIM = '\x1b[2m';

function badge(ok) {
  return ok ? `${GREEN}PASS${RESET}` : `${RED}FAIL${RESET}`;
}

console.log(`\n${CYAN}╔══════════════════════════════════════════╗${RESET}`);
console.log(`${CYAN}║       ASSET INTEGRITY CHECK v2.0         ║${RESET}`);
console.log(`${CYAN}╚══════════════════════════════════════════╝${RESET}\n`);

const singleAssets = [
  { name: 'Hero Subject',    path: 'public/assets/hero/hero-subject.webp',      maxKb: 220, format: 'webp' },
  { name: 'Hero Mask',       path: 'public/assets/hero/hero-subject-mask.png',   maxKb: 30,  format: 'png' },
  { name: 'Mini Goggle',     path: 'public/assets/hero/mini-goggle.webp',        maxKb: 40,  format: 'webp' },
  { name: 'Arcs SVG',        path: 'public/assets/ornaments/arcs.svg',           maxKb: 15,  format: 'svg' },
  { name: 'Rain Streaks',    path: 'public/assets/ornaments/rain-streaks.svg',   maxKb: 20,  format: 'svg' },
  { name: 'Barcode SVG',     path: 'public/assets/ornaments/barcode.svg',        maxKb: 5,   format: 'svg' },
  { name: 'Grain Texture',   path: 'public/assets/textures/grain.png',           maxKb: 40,  format: 'png' },
  { name: 'Brand Logo',      path: 'public/assets/brand/logo.svg',              maxKb: 10,  format: 'svg' },
];

let totalSize = 0;
let allPassed = true;
const results = [];

console.log(`${DIM}── Single Assets ──${RESET}`);
for (const asset of singleAssets) {
  if (!fs.existsSync(asset.path)) {
    console.log(`  ${badge(false)} ${asset.name}: ${RED}MISSING${RESET} ${DIM}(${asset.path})${RESET}`);
    results.push({ name: asset.name, status: 'MISSING', kb: 0 });
    allPassed = false;
  } else {
    const stats = fs.statSync(asset.path);
    const kb = stats.size / 1024;
    totalSize += stats.size;
    const extOk = asset.path.endsWith(`.${asset.format}`);
    const sizeOk = kb <= asset.maxKb;
    const ok = extOk && sizeOk;
    if (!ok) allPassed = false;

    let detail = `${kb.toFixed(1)} KB`;
    if (!sizeOk) detail += ` ${RED}(max ${asset.maxKb} KB)${RESET}`;
    if (!extOk) detail += ` ${RED}(wrong format)${RESET}`;

    console.log(`  ${badge(ok)} ${asset.name}: ${detail}`);
    results.push({ name: asset.name, status: ok ? 'OK' : 'ISSUE', kb });
  }
}

console.log(`\n${DIM}── Showcase Frames (Desktop 48 / Mobile 24) ──${RESET}`);
let showcaseDesktopPresent = 0;
let showcaseDesktopSize = 0;
for (let i = 0; i < 48; i++) {
  const p = `public/assets/showcase/frame-${String(i).padStart(3, '0')}.webp`;
  if (fs.existsSync(p)) {
    showcaseDesktopPresent++;
    showcaseDesktopSize += fs.statSync(p).size;
  }
}
totalSize += showcaseDesktopSize;

let showcaseMobilePresent = 0;
let showcaseMobileSize = 0;
for (let i = 0; i < 24; i++) {
  const p = `public/assets/showcase/m/frame-${String(i).padStart(3, '0')}.webp`;
  if (fs.existsSync(p)) {
    showcaseMobilePresent++;
    showcaseMobileSize += fs.statSync(p).size;
  }
}
totalSize += showcaseMobileSize;

const dOk = showcaseDesktopPresent === 48;
const mOk = showcaseMobilePresent === 24;
if (!dOk || !mOk) allPassed = false;

console.log(`  ${badge(dOk)} Desktop: ${showcaseDesktopPresent}/48 frames (${(showcaseDesktopSize / 1024).toFixed(1)} KB total)`);
console.log(`  ${badge(mOk)} Mobile:  ${showcaseMobilePresent}/24 frames (${(showcaseMobileSize / 1024).toFixed(1)} KB total)`);

console.log(`\n${DIM}── Spotlight Cutouts & Gallery ──${RESET}`);
console.log(`\n${DIM}── Spotlight Cutouts & Gallery Verification (Sharp Dimensions & Alpha) ──${RESET}`);
const spotlightSlugs = [
  'jaket-hardshell-shadow',
  'carrier-alpine-60',
  'tenda-storm-veil-2p',
  'sepatu-summit-gtx',
];

import sharp from 'sharp';

for (const slug of spotlightSlugs) {
  // 1. Cutout: 1440x1800, hasAlpha, max 60 KB
  const cutoutPath = `public/assets/spotlight/${slug}/cutout.webp`;
  if (fs.existsSync(cutoutPath)) {
    const stats = fs.statSync(cutoutPath);
    const meta = await sharp(cutoutPath).metadata();
    totalSize += stats.size;
    const dimOk = meta.width === 1440 && meta.height === 1800;
    const alphaOk = meta.hasAlpha === true;
    const sizeOk = stats.size <= 60 * 1024;
    const ok = dimOk && alphaOk && sizeOk;
    if (!ok) allPassed = false;
    console.log(`  ${badge(ok)} ${slug}/cutout.webp: ${(stats.size / 1024).toFixed(1)} KB [${meta.width}x${meta.height}, alpha: ${meta.hasAlpha}]`);
  } else {
    console.log(`  ${badge(false)} ${slug}/cutout.webp: ${RED}MISSING${RESET}`);
    allPassed = false;
  }

  // 2. Galleries: 900x1200, max 40 KB
  for (let g = 1; g <= 3; g++) {
    const gPath = `public/assets/spotlight/${slug}/gallery-${g}.webp`;
    if (fs.existsSync(gPath)) {
      const stats = fs.statSync(gPath);
      const meta = await sharp(gPath).metadata();
      totalSize += stats.size;
      const dimOk = meta.width === 900 && meta.height === 1200;
      const sizeOk = stats.size <= 40 * 1024;
      const ok = dimOk && sizeOk;
      if (!ok) allPassed = false;
      console.log(`  ${badge(ok)} ${slug}/gallery-${g}.webp: ${(stats.size / 1024).toFixed(1)} KB [${meta.width}x${meta.height}]`);
    } else {
      console.log(`  ${badge(false)} ${slug}/gallery-${g}.webp: ${RED}MISSING${RESET}`);
      allPassed = false;
    }
  }
}

console.log(`\n${DIM}── Catalog Products Verification (800x1000, Max 30 KB) ──${RESET}`);
let productsPresent = 0;
let productsSize = 0;
for (let i = 1; i <= 16; i++) {
  const p = `public/assets/products/p-${String(i).padStart(2, '0')}.webp`;
  if (fs.existsSync(p)) {
    const stats = fs.statSync(p);
    const meta = await sharp(p).metadata();
    productsPresent++;
    productsSize += stats.size;
    const dimOk = meta.width === 800 && meta.height === 1000;
    const sizeOk = stats.size <= 30 * 1024;
    const ok = dimOk && sizeOk;
    if (!ok) allPassed = false;
  }
}
totalSize += productsSize;
const pOk = productsPresent === 16;
if (!pOk) allPassed = false;
console.log(`  ${badge(pOk)} Products: ${productsPresent}/16 items [800x1000, all <= 30 KB] (${(productsSize / 1024).toFixed(1)} KB total)`);

console.log(`\n${DIM}── OG Image ──${RESET}`);
const ogPath = 'public/assets/og/og-image.jpg';
if (fs.existsSync(ogPath)) {
  const stats = fs.statSync(ogPath);
  totalSize += stats.size;
  console.log(`  ${badge(true)} og-image.jpg: ${(stats.size / 1024).toFixed(1)} KB`);
} else {
  console.log(`  ${badge(false)} og-image.jpg: ${YELLOW}MISSING (optional)${RESET}`);
}

console.log(`\n${CYAN}═══════════════════════════════════════════${RESET}`);
console.log(`  Total asset size: ${CYAN}${(totalSize / 1024 / 1024).toFixed(2)} MB${RESET}`);

const maxTotalMb = 2; // Anggaran ketat placeholder <= 2 MB
const budgetOk = (totalSize / 1024 / 1024) <= maxTotalMb;
console.log(`  Placeholder budget (<= ${maxTotalMb} MB): ${badge(budgetOk)}`);
if (!budgetOk) allPassed = false;

console.log(`${CYAN}═══════════════════════════════════════════${RESET}`);

if (allPassed) {
  console.log(`\n${GREEN}✓ All asset checks passed!${RESET}\n`);
  process.exit(0);
} else {
  console.log(`\n${YELLOW}⚠ Some assets need attention (see above).${RESET}\n`);
  process.exit(1);
}
