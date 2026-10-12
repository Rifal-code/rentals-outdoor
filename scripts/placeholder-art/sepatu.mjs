import { getPalette, wrapSvg } from './common.mjs';

export function renderSepatu({ mode = 'catalog', variant = 'mid', accentColor = '#FF4513', flip = false, zoom = 1 }) {
  const width = mode === 'gallery' ? 900 : mode === 'cutout' ? 1440 : 800;
  const height = mode === 'gallery' ? 1200 : mode === 'cutout' ? 1800 : 1000;
  const p = getPalette(mode, accentColor);

  const cx = width / 2;
  const cy = height * 0.54;
  const s = width / 800;

  const isCrampon = variant === 'crampon';
  const isLow = variant === 'low';
  const collarY = isLow ? cy - 30 * s : cy - 120 * s;

  const content = `
    <!-- Kerah Pergelangan Kaki (Ankle Collar) -->
    <path d="M ${cx - 130 * s} ${collarY}
             C ${cx - 100 * s} ${collarY - 30 * s} ${cx + 10 * s} ${collarY - 20 * s} ${cx + 30 * s} ${collarY + 40 * s}
             L ${cx - 70 * s} ${collarY + 40 * s} Z"
          fill="${p.dark}" stroke="${p.line}" stroke-width="${2 * s}"/>

    <!-- Upper Body Sepatu (Kulit / Sintetis) -->
    <path d="M ${cx - 130 * s} ${collarY}
             C ${cx - 170 * s} ${cy + 60 * s} ${cx - 150 * s} ${cy + 100 * s} ${cx - 120 * s} ${cy + 130 * s}
             L ${cx + 200 * s} ${cy + 130 * s}
             C ${cx + 260 * s} ${cy + 120 * s} ${cx + 240 * s} ${cy + 60 * s} ${cx + 160 * s} ${cy + 20 * s}
             L ${cx + 30 * s} ${collarY + 40 * s} Z"
          fill="${p.base}" stroke="${p.line}" stroke-width="${2 * s}" stroke-linejoin="round"/>

    <!-- Rubber Rand (Pelindung Karet Keliling Bawah & Ujung Jari) -->
    <path d="M ${cx - 120 * s} ${cy + 130 * s}
             L ${cx - 130 * s} ${cy + 90 * s}
             Q ${cx} ${cy + 95 * s} ${cx + 170 * s} ${cy + 65 * s}
             C ${cx + 240 * s} ${cy + 70 * s} ${cx + 240 * s} ${cy + 115 * s} ${cx + 200 * s} ${cy + 130 * s} Z"
          fill="${p.shadow}" stroke="${p.line}" stroke-width="${1.5 * s}"/>

    <!-- Tali Sepatu & Speed Hooks Metalik -->
    ${[0, 25, 50, 75]
      .map(
        (step) => `
        <circle cx="${cx - 10 * s + step * 1.5 * s}" cy="${collarY + 25 * s + step * s}" r="${3.5 * s}" fill="${p.highlight}"/>
        <circle cx="${cx + 40 * s + step * 1.2 * s}" cy="${collarY + 30 * s + step * s}" r="${3.5 * s}" fill="${p.highlight}"/>
        <line x1="${cx - 10 * s + step * 1.5 * s}" y1="${collarY + 25 * s + step * s}" x2="${cx + 40 * s + step * 1.2 * s}" y2="${collarY + 30 * s + step * s}" stroke="${p.lineLight}" stroke-width="${2 * s}"/>
      `
      )
      .join('\n')}

    <!-- Aksen Loop Tumit (Heel Pull Loop) PRD -->
    <path d="M ${cx - 130 * s} ${collarY + 10 * s} Q ${cx - 165 * s} ${collarY + 20 * s} ${cx - 135 * s} ${collarY + 40 * s}"
          fill="none" stroke="${p.accent}" stroke-width="${4 * s}"/>

    <!-- Outsole Tebal & Lug Traksi Gunung (Gerigi Vibram) -->
    <path d="M ${cx - 120 * s} ${cy + 130 * s}
             L ${cx + 200 * s} ${cy + 130 * s}
             L ${cx + 195 * s} ${cy + 165 * s}
             L ${cx - 110 * s} ${cy + 165 * s} Z"
          fill="${p.dark}" stroke="${p.line}" stroke-width="${2 * s}"/>

    <!-- Gerigi Lug Outsole Bawah -->
    ${[-90, -50, -10, 30, 70, 110, 150]
      .map(
        (xOff) => `
      <polygon points="${cx + xOff * s} ${cy + 165 * s}, ${cx + (xOff + 20) * s} ${cy + 165 * s}, ${cx + (xOff + 10) * s} ${cy + 180 * s}" fill="${p.line}"/>
    `
      )
      .join('\n')}

    ${
      isCrampon
        ? `
      <!-- Rangka Besi Crampons & Taji Depan -->
      <path d="M ${cx - 130 * s} ${cy + 175 * s} L ${cx + 210 * s} ${cy + 175 * s}" stroke="${p.highlight}" stroke-width="${4 * s}"/>
      <polygon points="${cx + 205 * s} ${cy + 170 * s}, ${cx + 245 * s} ${cy + 185 * s}, ${cx + 205 * s} ${cy + 185 * s}" fill="${p.accent}"/>
      <polygon points="${cx + 200 * s} ${cy + 175 * s}, ${cx + 220 * s} ${cy + 210 * s}, ${cx + 190 * s} ${cy + 180 * s}" fill="${p.highlight}"/>
      <polygon points="${cx - 120 * s} ${cy + 175 * s}, ${cx - 145 * s} ${cy + 205 * s}, ${cx - 105 * s} ${cy + 180 * s}" fill="${p.highlight}"/>
    `
        : ''
    }
  `;

  return wrapSvg({
    width,
    height,
    mode,
    palette: p,
    flip,
    zoom,
    zoomOrigin: [cx + 60 * s, cy + 120 * s],
    content,
  });
}
