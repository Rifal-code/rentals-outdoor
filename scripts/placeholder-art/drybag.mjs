import { getPalette, wrapSvg } from './common.mjs';

export function renderDrybag({ mode = 'catalog', variant = 'rolltop', accentColor = '#FF4513', flip = false, zoom = 1 }) {
  const width = mode === 'gallery' ? 900 : mode === 'cutout' ? 1440 : 800;
  const height = mode === 'gallery' ? 1200 : mode === 'cutout' ? 1800 : 1000;
  const p = getPalette(mode, accentColor);

  const cx = width / 2;
  const cy = height * 0.54;
  const s = width / 800;

  const content = `
    <!-- Badan Dry Bag Silinder Tahan Air (Welded Seam Tarpaulin) -->
    <path d="M ${cx - 150 * s} ${cy - 120 * s}
             L ${cx - 130 * s} ${cy + 180 * s}
             C ${cx - 130 * s} ${cy + 240 * s} ${cx + 130 * s} ${cy + 240 * s} ${cx + 130 * s} ${cy + 180 * s}
             L ${cx + 150 * s} ${cy - 120 * s} Z"
          fill="${p.base}" stroke="${p.line}" stroke-width="${2 * s}"/>

    <!-- Sambungan Las Kedap Air Vertikal (RF Welded Seam) -->
    <line x1="${cx - 100 * s}" y1="${cy - 120 * s}" x2="${cx - 90 * s}" y2="${cy + 190 * s}"
          stroke="${p.shadow}" stroke-width="${3 * s}"/>

    <!-- Dasar Oval Bawah Tas (Oval Base Floor) -->
    <ellipse cx="${cx}" cy="${cy + 190 * s}" rx="${130 * s}" ry="${35 * s}" fill="${p.shadow}" stroke="${p.line}" stroke-width="${2 * s}"/>

    <!-- Lipatan Penutup Roll-Top (Roll-Top Closure Fold) -->
    <rect x="${cx - 165 * s}" y="${cy - 160 * s}" width="${330 * s}" height="${45 * s}" rx="${8 * s}"
          fill="${p.dark}" stroke="${p.line}" stroke-width="${2 * s}"/>

    <!-- Gesper Roll-Top Melengkung Terkunci Atas (Clicked Buckle Arch) -->
    <path d="M ${cx - 150 * s} ${cy - 145 * s}
             C ${cx - 140 * s} ${cy - 240 * s} ${cx + 140 * s} ${cy - 240 * s} ${cx + 150 * s} ${cy - 145 * s}"
          fill="none" stroke="${p.dark}" stroke-width="${18 * s}" stroke-linecap="round"/>

    <!-- Gesper Quick-Release Tengah dengan Aksen PRD -->
    <rect x="${cx - 24 * s}" y="${cy - 250 * s}" width="${48 * s}" height="${22 * s}" rx="${4 * s}"
          fill="${p.accent}" stroke="${p.line}" stroke-width="${1.5 * s}"/>

    <!-- Ring D-Ring Pengait Carabiner Samping -->
    <path d="M ${cx - 160 * s} ${cy - 20 * s} Q ${cx - 185 * s} ${cy} ${cx - 160 * s} ${cy + 20 * s}"
          fill="none" stroke="${p.highlight}" stroke-width="${4 * s}"/>
    <rect x="${cx - 160 * s}" y="${cy - 15 * s}" width="${12 * s}" height="${30 * s}" rx="${2 * s}" fill="${p.line}"/>

    <path d="M ${cx + 160 * s} ${cy - 20 * s} Q ${cx + 185 * s} ${cy} ${cx + 160 * s} ${cy + 20 * s}"
          fill="none" stroke="${p.highlight}" stroke-width="${4 * s}"/>
    <rect x="${cx + 148 * s}" y="${cy - 15 * s}" width="${12 * s}" height="${30 * s}" rx="${2 * s}" fill="${p.line}"/>
  `;

  return wrapSvg({
    width,
    height,
    mode,
    palette: p,
    flip,
    zoom,
    zoomOrigin: [cx, cy - 180 * s],
    content,
  });
}
