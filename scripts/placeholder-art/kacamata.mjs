import { getPalette, wrapSvg } from './common.mjs';

export function renderKacamata({ mode = 'catalog', variant = 'glacier', accentColor = '#FF4513', flip = false, zoom = 1 }) {
  const width = mode === 'gallery' ? 900 : mode === 'cutout' ? 1440 : 800;
  const height = mode === 'gallery' ? 1200 : mode === 'cutout' ? 1800 : 1000;
  const p = getPalette(mode, accentColor);

  const cx = width / 2;
  const cy = height * 0.52;
  const s = width / 800;

  const content = `
    <!-- Tali Strap Elastis Kiri & Kanan -->
    <path d="M ${cx - 240 * s} ${cy - 20 * s}
             L ${cx - 320 * s} ${cy - 10 * s}
             L ${cx - 320 * s} ${cy + 30 * s}
             L ${cx - 240 * s} ${cy + 20 * s} Z"
          fill="${p.dark}" stroke="${p.line}" stroke-width="${1.5 * s}"/>
    <path d="M ${cx + 240 * s} ${cy - 20 * s}
             L ${cx + 320 * s} ${cy - 10 * s}
             L ${cx + 320 * s} ${cy + 30 * s}
             L ${cx + 240 * s} ${cy + 20 * s} Z"
          fill="${p.dark}" stroke="${p.line}" stroke-width="${1.5 * s}"/>

    <!-- Pengatur Gesper Strap PRD -->
    <rect x="${cx - 290 * s}" y="${cy - 5 * s}" width="${12 * s}" height="${30 * s}" rx="${2 * s}" fill="${p.accent}"/>

    <!-- Frame Luar Goggles Berbusa Ergonomis -->
    <path d="M ${cx - 240 * s} ${cy - 50 * s}
             Q ${cx} ${cy - 70 * s} ${cx + 240 * s} ${cy - 50 * s}
             C ${cx + 260 * s} ${cy} ${cx + 250 * s} ${cy + 70 * s} ${cx + 200 * s} ${cy + 80 * s}
             Q ${cx + 70 * s} ${cy + 70 * s} ${cx} ${cy + 40 * s}
             Q ${cx - 70 * s} ${cy + 70 * s} ${cx - 200 * s} ${cy + 80 * s}
             C ${cx - 250 * s} ${cy + 70 * s} ${cx - 260 * s} ${cy} ${cx - 240 * s} ${cy - 50 * s} Z"
          fill="${p.dark}" stroke="${p.line}" stroke-width="${2.5 * s}" stroke-linejoin="round"/>

    <!-- Lensa Goggle Polarized Shield (Mata Tunggal / Cylindrical) -->
    <path d="M ${cx - 215 * s} ${cy - 40 * s}
             Q ${cx} ${cy - 55 * s} ${cx + 215 * s} ${cy - 40 * s}
             C ${cx + 230 * s} ${cy} ${cx + 225 * s} ${cy + 55 * s} ${cx + 180 * s} ${cy + 65 * s}
             Q ${cx + 60 * s} ${cy + 55 * s} ${cx} ${cy + 30 * s}
             Q ${cx - 60 * s} ${cy + 55 * s} ${cx - 180 * s} ${cy + 65 * s}
             C ${cx - 225 * s} ${cy + 55 * s} ${cx - 230 * s} ${cy} ${cx - 215 * s} ${cy - 40 * s} Z"
          fill="${p.base}" stroke="${p.line}" stroke-width="${2 * s}"/>

    <!-- Pantulan Cahaya Reflektif Lensa Diagonal -->
    <path d="M ${cx - 150 * s} ${cy - 35 * s}
             L ${cx - 60 * s} ${cy - 40 * s}
             L ${cx - 110 * s} ${cy + 45 * s}
             L ${cx - 170 * s} ${cy + 40 * s} Z"
          fill="${p.highlight}" opacity="0.6"/>
    <path d="M ${cx + 20 * s} ${cy - 42 * s}
             L ${cx + 90 * s} ${cy - 45 * s}
             L ${cx + 50 * s} ${cy + 48 * s}
             L ${cx} ${cy + 40 * s} Z"
          fill="${p.highlight}" opacity="0.4"/>

    <!-- Lubang Ventilasi Anti-Fog Atas Frame -->
    ${[-140, -100, -60, -20, 20, 60, 100, 140]
      .map(
        (x) => `<line x1="${cx + x * s}" y1="${cy - 56 * s}" x2="${cx + (x + 15) * s}" y2="${cy - 56 * s}" stroke="${p.highlight}" stroke-width="${2 * s}"/>`
      )
      .join('\n')}
  `;

  return wrapSvg({
    width,
    height,
    mode,
    palette: p,
    flip,
    zoom,
    zoomOrigin: [cx, cy],
    content,
  });
}
