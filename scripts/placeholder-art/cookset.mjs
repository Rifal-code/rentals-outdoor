import { getPalette, wrapSvg } from './common.mjs';

export function renderCookset({ mode = 'catalog', variant = 'nesting', accentColor = '#FF4513', flip = false, zoom = 1 }) {
  const width = mode === 'gallery' ? 900 : mode === 'cutout' ? 1440 : 800;
  const height = mode === 'gallery' ? 1200 : mode === 'cutout' ? 1800 : 1000;
  const p = getPalette(mode, accentColor);

  const cx = width / 2;
  const cy = height * 0.54;
  const s = width / 800;

  const content = `
    <!-- Badan Panci Titanium Silinder Utama (1.2L Pot) -->
    <path d="M ${cx - 160 * s} ${cy - 80 * s}
             L ${cx - 160 * s} ${cy + 170 * s}
             C ${cx - 160 * s} ${cy + 220 * s} ${cx + 160 * s} ${cy + 220 * s} ${cx + 160 * s} ${cy + 170 * s}
             L ${cx + 160 * s} ${cy - 80 * s} Z"
          fill="${p.base}" stroke="${p.line}" stroke-width="${2 * s}"/>

    <!-- Rim / Bibir Panci Atas -->
    <ellipse cx="${cx}" cy="${cy - 80 * s}" rx="${160 * s}" ry="${35 * s}" fill="${p.highlight}" stroke="${p.line}" stroke-width="${2 * s}"/>

    <!-- Tutup Panci (Lid / Wajan Mini) -->
    <path d="M ${cx - 162 * s} ${cy - 80 * s}
             Q ${cx} ${cy - 140 * s} ${cx + 162 * s} ${cy - 80 * s}
             L ${cx + 155 * s} ${cy - 65 * s}
             Q ${cx} ${cy - 50 * s} ${cx - 155 * s} ${cy - 65 * s} Z"
          fill="${p.shadow}" stroke="${p.line}" stroke-width="${2 * s}"/>

    <!-- Ring Penarik Tutup (Lid Ring Puller) -->
    <path d="M ${cx - 20 * s} ${cy - 110 * s} Q ${cx} ${cy - 135 * s} ${cx + 20 * s} ${cy - 110 * s}"
          fill="none" stroke="${p.highlight}" stroke-width="${3 * s}"/>

    <!-- Skala Ukur Volume Embossed (Tick Marks 400ml, 800ml) -->
    <line x1="${cx - 140 * s}" y1="${cy + 80 * s}" x2="${cx - 115 * s}" y2="${cy + 80 * s}" stroke="${p.lineLight}" stroke-width="${2 * s}"/>
    <line x1="${cx - 140 * s}" y1="${cy}" x2="${cx - 110 * s}" y2="${cy}" stroke="${p.lineLight}" stroke-width="${2 * s}"/>
    <line x1="${cx - 140 * s}" y1="${cy - 40 * s}" x2="${cx - 120 * s}" y2="${cy - 40 * s}" stroke="${p.lineLight}" stroke-width="${2 * s}"/>

    <!-- Gagang Lipat Kupu-Kupu Kiri (Folding Wire Handle) -->
    <path d="M ${cx - 155 * s} ${cy - 40 * s}
             C ${cx - 240 * s} ${cy - 40 * s} ${cx - 240 * s} ${cy + 120 * s} ${cx - 155 * s} ${cy + 120 * s}"
          fill="none" stroke="${p.line}" stroke-width="${6 * s}" stroke-linecap="round"/>
    <!-- Lapisan Silikon Anti-Panas Gagang PRD -->
    <path d="M ${cx - 215 * s} ${cy - 10 * s}
             C ${cx - 245 * s} ${cy + 20 * s} ${cx - 245 * s} ${cy + 70 * s} ${cx - 215 * s} ${cy + 90 * s}"
          fill="none" stroke="${p.accent}" stroke-width="${7 * s}" stroke-linecap="round"/>

    <!-- Gagang Kanan Lipat -->
    <path d="M ${cx + 155 * s} ${cy - 40 * s}
             C ${cx + 240 * s} ${cy - 40 * s} ${cx + 240 * s} ${cy + 120 * s} ${cx + 155 * s} ${cy + 120 * s}"
          fill="none" stroke="${p.line}" stroke-width="${6 * s}" stroke-linecap="round"/>
    <path d="M ${cx + 215 * s} ${cy - 10 * s}
             C ${cx + 245 * s} ${cy + 20 * s} ${cx + 245 * s} ${cy + 70 * s} ${cx + 215 * s} ${cy + 90 * s}"
          fill="none" stroke="${p.accent}" stroke-width="${7 * s}" stroke-linecap="round"/>
  `;

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
