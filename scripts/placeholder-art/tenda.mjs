import { getPalette, wrapSvg } from './common.mjs';

export function renderTenda({ mode = 'catalog', variant = 'dome', accentColor = '#FF4513', flip = false, zoom = 1 }) {
  const width = mode === 'gallery' ? 900 : mode === 'cutout' ? 1440 : 800;
  const height = mode === 'gallery' ? 1200 : mode === 'cutout' ? 1800 : 1000;
  const p = getPalette(mode, accentColor);

  const cx = width / 2;
  const cy = height * 0.55;
  const s = width / 800;

  let content = '';

  if (variant === 'flysheet') {
    // Tarp / Flysheet Hexagonal dengan Tiang Penyangga
    content = `
      <!-- Kain Tarp Ridge -->
      <polygon points="${cx} ${cy - 180 * s}, ${cx + 260 * s} ${cy + 60 * s}, ${cx} ${cy + 120 * s}, ${cx - 260 * s} ${cy + 60 * s}"
               fill="${p.base}" stroke="${p.line}" stroke-width="${2 * s}"/>
      <!-- Sisi Bayangan Bawah Tarp -->
      <polygon points="${cx} ${cy + 120 * s}, ${cx + 260 * s} ${cy + 60 * s}, ${cx} ${cy + 170 * s}, ${cx - 260 * s} ${cy + 60 * s}"
               fill="${p.shadow}" stroke="${p.line}" stroke-width="${1.5 * s}"/>
      <!-- Tiang Utama Ridge -->
      <line x1="${cx}" y1="${cy - 200 * s}" x2="${cx}" y2="${cy + 220 * s}" stroke="${p.lineLight}" stroke-width="${3 * s}"/>
      <!-- Guyline Tali Pengencang -->
      <line x1="${cx - 260 * s}" y1="${cy + 60 * s}" x2="${cx - 320 * s}" y2="${cy + 180 * s}" stroke="${p.lineLight}" stroke-width="${1.5 * s}" stroke-dasharray="${4 * s}"/>
      <line x1="${cx + 260 * s}" y1="${cy + 60 * s}" x2="${cx + 320 * s}" y2="${cy + 180 * s}" stroke="${p.lineLight}" stroke-width="${1.5 * s}" stroke-dasharray="${4 * s}"/>
      <!-- Aksen Tag Tarp PRD -->
      <rect x="${cx - 20 * s}" y="${cy - 120 * s}" width="${40 * s}" height="${8 * s}" fill="${p.accent}"/>
    `;
  } else {
    // Tenda Dome / Geodesic (Storm Veil 2P)
    content = `
      <!-- Kubah Belakang / Sisi Teduh -->
      <path d="M ${cx - 280 * s} ${cy + 140 * s}
               C ${cx - 260 * s} ${cy - 160 * s} ${cx + 260 * s} ${cy - 160 * s} ${cx + 280 * s} ${cy + 140 * s} Z"
            fill="${p.shadow}" stroke="${p.line}" stroke-width="${2 * s}"/>

      <!-- Kubah Utama Depan (Vestibul) -->
      <path d="M ${cx - 240 * s} ${cy + 140 * s}
               C ${cx - 180 * s} ${cy - 140 * s} ${cx + 180 * s} ${cy - 140 * s} ${cx + 240 * s} ${cy + 140 * s}
               Q ${cx} ${cy + 160 * s} ${cx - 240 * s} ${cy + 140 * s} Z"
            fill="${p.base}" stroke="${p.line}" stroke-width="${2 * s}"/>

      <!-- Bathtub Groundsheet (Lantai Tenda Tahan Air) -->
      <path d="M ${cx - 280 * s} ${cy + 140 * s}
               Q ${cx} ${cy + 175 * s} ${cx + 280 * s} ${cy + 140 * s}
               L ${cx + 260 * s} ${cy + 190 * s}
               Q ${cx} ${cy + 220 * s} ${cx - 260 * s} ${cy + 190 * s} Z"
            fill="${p.dark}" stroke="${p.line}" stroke-width="${2 * s}"/>

      <!-- Tiang Silang (Alloy Frame Poles) -->
      <path d="M ${cx - 260 * s} ${cy + 150 * s} Q ${cx - 20 * s} ${cy - 150 * s} ${cx + 250 * s} ${cy + 150 * s}"
            fill="none" stroke="${p.highlight}" stroke-width="${3 * s}"/>
      <path d="M ${cx + 260 * s} ${cy + 150 * s} Q ${cx + 20 * s} ${cy - 150 * s} ${cx - 250 * s} ${cy + 150 * s}"
            fill="none" stroke="${p.highlight}" stroke-width="${3 * s}"/>

      <!-- Pintu Vestibul Terbuka / Garis Resleting -->
      <path d="M ${cx} ${cy - 130 * s} L ${cx - 80 * s} ${cy + 145 * s}"
            stroke="${p.line}" stroke-width="${2.5 * s}"/>
      <path d="M ${cx} ${cy - 130 * s} L ${cx + 80 * s} ${cy + 145 * s}"
            stroke="${p.line}" stroke-width="${2.5 * s}"/>

      <!-- Aksen Ventilasi Atas & Webbing PRD -->
      <polygon points="${cx - 40 * s} ${cy - 130 * s}, ${cx + 40 * s} ${cy - 130 * s}, ${cx} ${cy - 160 * s}"
               fill="${p.accent}"/>

      <!-- Pasak / Guyline Simbolis -->
      <line x1="${cx - 280 * s}" y1="${cy + 140 * s}" x2="${cx - 320 * s}" y2="${cy + 170 * s}" stroke="${p.lineLight}" stroke-width="${1.5 * s}"/>
      <line x1="${cx + 280 * s}" y1="${cy + 140 * s}" x2="${cx + 320 * s}" y2="${cy + 170 * s}" stroke="${p.lineLight}" stroke-width="${1.5 * s}"/>
    `;
  }

  return wrapSvg({
    width,
    height,
    mode,
    palette: p,
    flip,
    zoom,
    zoomOrigin: [cx, cy - 20 * s],
    content,
  });
}
