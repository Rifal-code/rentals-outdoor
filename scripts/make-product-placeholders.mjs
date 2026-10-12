import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

import { renderJaket } from './placeholder-art/jaket.mjs';
import { renderCarrier } from './placeholder-art/carrier.mjs';
import { renderTenda } from './placeholder-art/tenda.mjs';
import { renderSepatu } from './placeholder-art/sepatu.mjs';
import { renderKacamata } from './placeholder-art/kacamata.mjs';
import { renderPole } from './placeholder-art/pole.mjs';
import { renderTidur } from './placeholder-art/tidur.mjs';
import { renderKompor } from './placeholder-art/kompor.mjs';
import { renderCookset } from './placeholder-art/cookset.mjs';
import { renderHeadlamp } from './placeholder-art/headlamp.mjs';
import { renderDrybag } from './placeholder-art/drybag.mjs';

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// Rotasi warna aksen deterministik: --api (#FF4513), --cyan (#22C3F5), --putih (#FFFFFF)
const ACCENTS = ['#FF4513', '#22C3F5', '#FFFFFF'];

function getAccentForIndex(idx) {
  return ACCENTS[idx % ACCENTS.length];
}

async function svgToWebp(svgString, outPath, quality = 80) {
  ensureDir(path.dirname(outPath));
  await sharp(Buffer.from(svgString))
    .webp({ quality, effort: 4 })
    .toFile(outPath);
}

// 1. Pemetaan 16 Produk Katalog
const catalogMapping = [
  { id: 'p-01', slug: 'jaket-hardshell-shadow', render: (m, a, f) => renderJaket({ mode: m, variant: 'hardshell', accentColor: a, flip: f }) },
  { id: 'p-02', slug: 'carrier-alpine-60', render: (m, a, f) => renderCarrier({ mode: m, variant: 'alpine-60', accentColor: a, flip: f }) },
  { id: 'p-03', slug: 'tenda-storm-veil-2p', render: (m, a, f) => renderTenda({ mode: m, variant: 'dome', accentColor: a, flip: f }) },
  { id: 'p-04', slug: 'sepatu-summit-gtx', render: (m, a, f) => renderSepatu({ mode: m, variant: 'mid', accentColor: a, flip: f }) },
  { id: 'p-05', slug: 'glacier-optics-pro', render: (m, a, f) => renderKacamata({ mode: m, variant: 'glacier', accentColor: a, flip: f }) },
  { id: 'p-06', slug: 'aero-carbon-pole', render: (m, a, f) => renderPole({ mode: m, variant: 'pair', accentColor: a, flip: f }) },
  { id: 'p-07', slug: 'sub-zero-sleeping-bag', render: (m, a, f) => renderTidur({ mode: m, variant: 'mummy', accentColor: a, flip: f }) },
  { id: 'p-08', slug: 'thermo-core-mat', render: (m, a, f) => renderTidur({ mode: m, variant: 'mat', accentColor: a, flip: f }) },
  { id: 'p-09', slug: 'blaze-canister-stove', render: (m, a, f) => renderKompor({ mode: m, variant: 'canister', accentColor: a, flip: f }) },
  { id: 'p-10', slug: 'titanium-cookset', render: (m, a, f) => renderCookset({ mode: m, variant: 'nesting', accentColor: a, flip: f }) },
  { id: 'p-11', slug: 'lumen-apex-headlamp', render: (m, a, f) => renderHeadlamp({ mode: m, variant: 'pivot', accentColor: a, flip: f }) },
  { id: 'p-12', slug: 'storm-shield-flysheet', render: (m, a, f) => renderTenda({ mode: m, variant: 'flysheet', accentColor: a, flip: f }) },
  { id: 'p-13', slug: 'ridge-carrier-40', render: (m, a, f) => renderCarrier({ mode: m, variant: 'ultralight-40', accentColor: a, flip: f }) },
  { id: 'p-14', slug: 'merino-thermal-layer', render: (m, a, f) => renderJaket({ mode: m, variant: 'thermal', accentColor: a, flip: f }) },
  { id: 'p-15', slug: 'summit-crampons', render: (m, a, f) => renderSepatu({ mode: m, variant: 'crampon', accentColor: a, flip: f }) },
  { id: 'p-16', slug: 'dry-pack-25l', render: (m, a, f) => renderDrybag({ mode: m, variant: 'rolltop', accentColor: a, flip: f }) },
];

// 2. Pemetaan 4 Produk Spotlight
const spotlightMapping = [
  {
    slug: 'jaket-hardshell-shadow',
    renderCutout: () => renderJaket({ mode: 'cutout', variant: 'hardshell' }),
    renderG1: () => renderJaket({ mode: 'gallery', variant: 'hardshell', flip: false, zoom: 1 }),
    renderG2: () => renderJaket({ mode: 'gallery', variant: 'hardshell', flip: true, zoom: 1 }),
    renderG3: () => renderJaket({ mode: 'gallery', variant: 'hardshell', flip: false, zoom: 2.2 }),
  },
  {
    slug: 'carrier-alpine-60',
    renderCutout: () => renderCarrier({ mode: 'cutout', variant: 'alpine-60' }),
    renderG1: () => renderCarrier({ mode: 'gallery', variant: 'alpine-60', flip: false, zoom: 1 }),
    renderG2: () => renderCarrier({ mode: 'gallery', variant: 'alpine-60', flip: true, zoom: 1 }),
    renderG3: () => renderCarrier({ mode: 'gallery', variant: 'alpine-60', flip: false, zoom: 2.2 }),
  },
  {
    slug: 'tenda-storm-veil-2p',
    renderCutout: () => renderTenda({ mode: 'cutout', variant: 'dome' }),
    renderG1: () => renderTenda({ mode: 'gallery', variant: 'dome', flip: false, zoom: 1 }),
    renderG2: () => renderTenda({ mode: 'gallery', variant: 'dome', flip: true, zoom: 1 }),
    renderG3: () => renderTenda({ mode: 'gallery', variant: 'dome', flip: false, zoom: 2.2 }),
  },
  {
    slug: 'sepatu-summit-gtx',
    renderCutout: () => renderSepatu({ mode: 'cutout', variant: 'mid' }),
    renderG1: () => renderSepatu({ mode: 'gallery', variant: 'mid', flip: false, zoom: 1 }),
    renderG2: () => renderSepatu({ mode: 'gallery', variant: 'mid', flip: true, zoom: 1 }),
    renderG3: () => renderSepatu({ mode: 'gallery', variant: 'mid', flip: false, zoom: 2.2 }),
  },
];

async function main() {
  console.log('=== MEMPROSES PLACEHOLDER KATALOG (16 ITEM) ===');
  let totalBytes = 0;

  for (let i = 0; i < catalogMapping.length; i++) {
    const item = catalogMapping[i];
    const accent = getAccentForIndex(i);
    const flip = i % 2 === 1; // Variasi cermin horizontal deterministik
    const svg = item.render('catalog', accent, flip);
    const outPath = `public/assets/products/${item.id}.webp`;

    await svgToWebp(svg, outPath, 80);
    const size = fs.statSync(outPath).size;
    totalBytes += size;
    console.log(`[OK] ${item.id}.webp (${item.slug}) -> ${(size / 1024).toFixed(1)} KB [accent: ${accent}, flip: ${flip}]`);
  }

  console.log('\n=== MEMPROSES PLACEHOLDER SPOTLIGHT (4 PRODUK x 4 GAMBAR) ===');
  for (const item of spotlightMapping) {
    const dir = `public/assets/spotlight/${item.slug}`;

    // Cutout (1440x1800, Transparan)
    const svgCutout = item.renderCutout();
    const cutoutPath = `${dir}/cutout.webp`;
    await svgToWebp(svgCutout, cutoutPath, 85);
    const sCutout = fs.statSync(cutoutPath).size;
    totalBytes += sCutout;

    // Gallery 1..3 (900x1200, Latar #D4D7DC)
    const g1Path = `${dir}/gallery-1.webp`;
    await svgToWebp(item.renderG1(), g1Path, 80);
    const sG1 = fs.statSync(g1Path).size;
    totalBytes += sG1;

    const g2Path = `${dir}/gallery-2.webp`;
    await svgToWebp(item.renderG2(), g2Path, 80);
    const sG2 = fs.statSync(g2Path).size;
    totalBytes += sG2;

    const g3Path = `${dir}/gallery-3.webp`;
    await svgToWebp(item.renderG3(), g3Path, 80);
    const sG3 = fs.statSync(g3Path).size;
    totalBytes += sG3;

    console.log(`[OK] Spotlight: ${item.slug}`);
    console.log(`     - cutout: ${(sCutout / 1024).toFixed(1)} KB`);
    console.log(`     - g1: ${(sG1 / 1024).toFixed(1)} KB, g2: ${(sG2 / 1024).toFixed(1)} KB, g3: ${(sG3 / 1024).toFixed(1)} KB`);
  }

  console.log(`\nSELESAI! Total Ukuran Keseluruhan: ${(totalBytes / 1024).toFixed(1)} KB (${(totalBytes / (1024 * 1024)).toFixed(2)} MB)`);
}

main().catch((err) => {
  console.error('Error generating placeholders:', err);
  process.exit(1);
});
