import { getPalette, wrapSvg } from './common.mjs';

export function renderCarrier({ mode = 'catalog', variant = 'alpine-60', accentColor = '#FF4513', flip = false, zoom = 1 }) {
  const width = mode === 'gallery' ? 900 : mode === 'cutout' ? 1440 : 800;
  const height = mode === 'gallery' ? 1200 : mode === 'cutout' ? 1800 : 1000;
  const p = getPalette(mode, accentColor);

  const cx = width / 2;
  const cy = height * 0.52;
  const s = width / 800;

  const is60L = variant === 'alpine-60';
  const packTop = is60L ? cy - 250 * s : cy - 200 * s;

  const content = `
    <!-- Badan Carrier Utama -->
    <path d="M ${cx - 120 * s} ${packTop + 80 * s}
             L ${cx - 140 * s} ${cy + 180 * s}
             Q ${cx} ${cy + 220 * s} ${cx + 140 * s} ${cy + 180 * s}
             L ${cx + 120 * s} ${packTop + 80 * s} Z"
          fill="${p.base}" stroke="${p.line}" stroke-width="${2 * s}"/>

    <!-- Top Lid (Kepala Carrier) -->
    <path d="M ${cx - 130 * s} ${packTop + 80 * s}
             C ${cx - 140 * s} ${packTop} ${cx + 140 * s} ${packTop} ${cx + 130 * s} ${packTop + 80 * s}
             Q ${cx} ${packTop + 95 * s} ${cx - 130 * s} ${packTop + 80 * s} Z"
          fill="${p.dark}" stroke="${p.line}" stroke-width="${2 * s}"/>

    <!-- Panel Depan / Kanguru Pocket -->
    <path d="M ${cx - 85 * s} ${packTop + 130 * s}
             L ${cx - 95 * s} ${cy + 130 * s}
             Q ${cx} ${cy + 160 * s} ${cx + 95 * s} ${cy + 130 * s}
             L ${cx + 85 * s} ${packTop + 130 * s} Z"
          fill="${p.shadow}" stroke="${p.line}" stroke-width="${1.5 * s}"/>

    <!-- Tali Kompresi Horizontal Kiri & Kanan -->
    <line x1="${cx - 135 * s}" y1="${cy - 30 * s}" x2="${cx - 85 * s}" y2="${cy - 30 * s}"
          stroke="${p.lineLight}" stroke-width="${3 * s}"/>
    <line x1="${cx + 85 * s}" y1="${cy - 30 * s}" x2="${cx + 135 * s}" y2="${cy - 30 * s}"
          stroke="${p.lineLight}" stroke-width="${3 * s}"/>
    <line x1="${cx - 138 * s}" y1="${cy + 60 * s}" x2="${cx - 90 * s}" y2="${cy + 60 * s}"
          stroke="${p.lineLight}" stroke-width="${3 * s}"/>
    <line x1="${cx + 90 * s}" y1="${cy + 60 * s}" x2="${cx + 138 * s}" y2="${cy + 60 * s}"
          stroke="${p.lineLight}" stroke-width="${3 * s}"/>

    <!-- Daisy Chain Sentral Vertikal -->
    <line x1="${cx}" y1="${packTop + 140 * s}" x2="${cx}" y2="${cy + 130 * s}"
          stroke="${p.line}" stroke-width="${4 * s}"/>
    ${[0, 35, 70, 105, 140, 175]
      .map(
        (offset) =>
          `<line x1="${cx - 12 * s}" y1="${packTop + (150 + offset) * s}" x2="${cx + 12 * s}" y2="${packTop + (150 + offset) * s}" stroke="${p.highlight}" stroke-width="${1.5 * s}"/>`
      )
      .join('\n')}

    <!-- Aksen Loop Webbing PRD -->
    <rect x="${cx - 15 * s}" y="${cy + 110 * s}" width="${30 * s}" height="${8 * s}" rx="${2 * s}"
          fill="${p.accent}"/>

    <!-- Hipbelt Wings (Sayap Sabuk Pinggang) -->
    <path d="M ${cx - 130 * s} ${cy + 160 * s}
             C ${cx - 200 * s} ${cy + 170 * s} ${cx - 210 * s} ${cy + 240 * s} ${cx - 120 * s} ${cy + 220 * s} Z"
          fill="${p.dark}" stroke="${p.line}" stroke-width="${2 * s}"/>
    <path d="M ${cx + 130 * s} ${cy + 160 * s}
             C ${cx + 200 * s} ${cy + 170 * s} ${cx + 210 * s} ${cy + 240 * s} ${cx + 120 * s} ${cy + 220 * s} Z"
          fill="${p.dark}" stroke="${p.line}" stroke-width="${2 * s}"/>
    <line x1="${cx - 120 * s}" y1="${cy + 215 * s}" x2="${cx + 120 * s}" y2="${cy + 215 * s}"
          stroke="${p.lineLight}" stroke-width="${3 * s}"/>
    <rect x="${cx - 18 * s}" y="${cy + 208 * s}" width="${36 * s}" height="${14 * s}" rx="${2 * s}"
          fill="${p.line}"/>
  `;

  return wrapSvg({
    width,
    height,
    mode,
    palette: p,
    flip,
    zoom,
    zoomOrigin: [cx, cy - 50 * s],
    content,
  });
}
