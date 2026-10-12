import { getPalette, wrapSvg } from './common.mjs';

export function renderJaket({ mode = 'catalog', variant = 'hardshell', accentColor = '#FF4513', flip = false, zoom = 1 }) {
  const width = mode === 'gallery' ? 900 : mode === 'cutout' ? 1440 : 800;
  const height = mode === 'gallery' ? 1200 : mode === 'cutout' ? 1800 : 1000;
  const p = getPalette(mode, accentColor);

  const cx = width / 2;
  const cy = height * 0.52;
  const s = width / 800; // scale factor

  // Hood, Torso, Lengan, Resleting & Aksen
  const isThermal = variant === 'thermal';
  const hoodHeight = isThermal ? 110 * s : 140 * s;

  const content = `
    <!-- Torso Utama -->
    <path d="M ${cx - 160 * s} ${cy - 80 * s} 
             Q ${cx - 120 * s} ${cy - 180 * s} ${cx} ${cy - 180 * s}
             Q ${cx + 120 * s} ${cy - 180 * s} ${cx + 160 * s} ${cy - 80 * s}
             L ${cx + 190 * s} ${cy + 180 * s}
             Q ${cx} ${cy + 220 * s} ${cx - 190 * s} ${cy + 180 * s} Z"
          fill="${p.base}" stroke="${p.line}" stroke-width="${2 * s}" stroke-linejoin="round"/>

    <!-- Lengan Kiri -->
    <path d="M ${cx - 150 * s} ${cy - 100 * s}
             L ${cx - 270 * s} ${cy + 80 * s}
             L ${cx - 230 * s} ${cy + 120 * s}
             L ${cx - 130 * s} ${cy - 20 * s} Z"
          fill="${p.shadow}" stroke="${p.line}" stroke-width="${2 * s}" stroke-linejoin="round"/>

    <!-- Lengan Kanan -->
    <path d="M ${cx + 150 * s} ${cy - 100 * s}
             L ${cx + 270 * s} ${cy + 80 * s}
             L ${cx + 230 * s} ${cy + 120 * s}
             L ${cx + 130 * s} ${cy - 20 * s} Z"
          fill="${p.shadow}" stroke="${p.line}" stroke-width="${2 * s}" stroke-linejoin="round"/>

    <!-- Hood / Tudung Kepala -->
    <path d="M ${cx - 90 * s} ${cy - 170 * s}
             C ${cx - 110 * s} ${cy - 300 * s} ${cx + 110 * s} ${cy - 300 * s} ${cx + 90 * s} ${cy - 170 * s}
             Q ${cx} ${cy - 140 * s} ${cx - 90 * s} ${cy - 170 * s} Z"
          fill="${p.dark}" stroke="${p.line}" stroke-width="${2 * s}"/>

    <!-- Kerah & Neck Opening -->
    <ellipse cx="${cx}" cy="${cy - 180 * s}" rx="${60 * s}" ry="${35 * s}" fill="${p.shadow}"/>

    <!-- Garis Resleting Utama (Storm Flap) -->
    <line x1="${cx}" y1="${cy - 160 * s}" x2="${cx}" y2="${cy + 200 * s}"
          stroke="${p.line}" stroke-width="${4 * s}"/>
    <line x1="${cx - 2 * s}" y1="${cy - 160 * s}" x2="${cx - 2 * s}" y2="${cy + 200 * s}"
          stroke="${p.highlight}" stroke-width="${1.5 * s}" stroke-dasharray="${6 * s} ${4 * s}"/>

    <!-- Saku Dada dengan Aksen Warna PRD -->
    <rect x="${cx - 90 * s}" y="${cy - 60 * s}" width="${55 * s}" height="${80 * s}" rx="${4 * s}"
          fill="${p.dark}" stroke="${p.line}" stroke-width="${1.5 * s}"/>
    <line x1="${cx - 85 * s}" y1="${cy - 20 * s}" x2="${cx - 40 * s}" y2="${cy - 20 * s}"
          stroke="${p.accent}" stroke-width="${3 * s}"/>

    <!-- Cinch Cord / Hem Detil -->
    <path d="M ${cx - 170 * s} ${cy + 175 * s} Q ${cx} ${cy + 205 * s} ${cx + 170 * s} ${cy + 175 * s}"
          fill="none" stroke="${p.lineLight}" stroke-width="${1.5 * s}"/>
  `;

  return wrapSvg({
    width,
    height,
    mode,
    palette: p,
    flip,
    zoom,
    zoomOrigin: [cx, cy - 80 * s],
    content,
  });
}
