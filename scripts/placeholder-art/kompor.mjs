import { getPalette, wrapSvg } from './common.mjs';

export function renderKompor({ mode = 'catalog', variant = 'canister', accentColor = '#FF4513', flip = false, zoom = 1 }) {
  const width = mode === 'gallery' ? 900 : mode === 'cutout' ? 1440 : 800;
  const height = mode === 'gallery' ? 1200 : mode === 'cutout' ? 1800 : 1000;
  const p = getPalette(mode, accentColor);

  const cx = width / 2;
  const cy = height * 0.54;
  const s = width / 800;

  const content = `
    <!-- Tabung Gas Kaleng Isobutane (Gas Canister Bawah) -->
    <path d="M ${cx - 150 * s} ${cy + 60 * s}
             Q ${cx} ${cy + 45 * s} ${cx + 150 * s} ${cy + 60 * s}
             L ${cx + 150 * s} ${cy + 220 * s}
             Q ${cx} ${cy + 250 * s} ${cx - 150 * s} ${cy + 220 * s} Z"
          fill="${p.shadow}" stroke="${p.line}" stroke-width="${2 * s}"/>

    <!-- Kubah Leher Kaleng Gas -->
    <ellipse cx="${cx}" cy="${cy + 60 * s}" rx="${150 * s}" ry="${30 * s}" fill="${p.base}" stroke="${p.line}" stroke-width="${2 * s}"/>
    <rect x="${cx - 30 * s}" y="${cy + 25 * s}" width="${60 * s}" height="${20 * s}" rx="${4 * s}" fill="${p.dark}" stroke="${p.line}" stroke-width="${1.5 * s}"/>

    <!-- Ulir Sambungan Kompor (Lindal Valve Connection) -->
    <rect x="${cx - 18 * s}" y="${cy - 10 * s}" width="${36 * s}" height="${35 * s}" fill="${p.highlight}" stroke="${p.line}" stroke-width="${1.5 * s}"/>

    <!-- Tuas Valve Pengatur Api Kawat Metalik & Kenop Aksen PRD -->
    <line x1="${cx - 15 * s}" y1="${cy + 5 * s}" x2="${cx - 110 * s}" y2="${cy + 5 * s}" stroke="${p.lineLight}" stroke-width="${3 * s}"/>
    <ellipse cx="${cx - 110 * s}" cy="${cy + 5 * s}" rx="${12 * s}" ry="${18 * s}" fill="${p.accent}" stroke="${p.line}" stroke-width="${1.5 * s}"/>

    <!-- Tiang Batang Kompor (Stem Burner) -->
    <rect x="${cx - 12 * s}" y="${cy - 90 * s}" width="${24 * s}" height="${80 * s}" fill="${p.base}" stroke="${p.line}" stroke-width="${2 * s}"/>

    <!-- Kepala Tungku Api (Micro Burner Head) -->
    <path d="M ${cx - 45 * s} ${cy - 90 * s} L ${cx + 45 * s} ${cy - 90 * s} L ${cx + 55 * s} ${cy - 130 * s} L ${cx - 55 * s} ${cy - 130 * s} Z"
          fill="${p.dark}" stroke="${p.line}" stroke-width="${2 * s}"/>
    <ellipse cx="${cx}" cy="${cy - 130 * s}" rx="${55 * s}" ry="${15 * s}" fill="${p.highlight}" stroke="${p.line}" stroke-width="${1.5 * s}"/>

    <!-- Sayap Penyangga Panci Lipat (Folding Pot Supports) -->
    <!-- Sayap Kiri -->
    <path d="M ${cx - 40 * s} ${cy - 125 * s} L ${cx - 150 * s} ${cy - 170 * s} L ${cx - 165 * s} ${cy - 195 * s}"
          fill="none" stroke="${p.highlight}" stroke-width="${5 * s}" stroke-linecap="round"/>
    <!-- Sayap Kanan -->
    <path d="M ${cx + 40 * s} ${cy - 125 * s} L ${cx + 150 * s} ${cy - 170 * s} L ${cx + 165 * s} ${cy - 195 * s}"
          fill="none" stroke="${p.highlight}" stroke-width="${5 * s}" stroke-linecap="round"/>
    <!-- Sayap Tengah / Belakang -->
    <path d="M ${cx} ${cy - 130 * s} L ${cx - 10 * s} ${cy - 200 * s} L ${cx + 10 * s} ${cy - 215 * s}"
          fill="none" stroke="${p.shadow}" stroke-width="${4 * s}" stroke-linecap="round"/>
  `;

  return wrapSvg({
    width,
    height,
    mode,
    palette: p,
    flip,
    zoom,
    zoomOrigin: [cx, cy - 110 * s],
    content,
  });
}
