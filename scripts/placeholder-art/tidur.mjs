import { getPalette, wrapSvg } from './common.mjs';

export function renderTidur({ mode = 'catalog', variant = 'mummy', accentColor = '#FF4513', flip = false, zoom = 1 }) {
  const width = mode === 'gallery' ? 900 : mode === 'cutout' ? 1440 : 800;
  const height = mode === 'gallery' ? 1200 : mode === 'cutout' ? 1800 : 1000;
  const p = getPalette(mode, accentColor);

  const cx = width / 2;
  const cy = height * 0.52;
  const s = width / 800;

  let content = '';

  if (variant === 'mat') {
    // Matras Tiup Insulated (Thermo-Core Mat)
    content = `
      <!-- Badan Matras Berbaffle Horizontal -->
      <rect x="${cx - 130 * s}" y="${cy - 300 * s}" width="${260 * s}" height="${600 * s}" rx="${30 * s}"
            fill="${p.base}" stroke="${p.line}" stroke-width="${2 * s}"/>

      <!-- Saluran Baffle Horizontal -->
      ${[-250, -200, -150, -100, -50, 0, 50, 100, 150, 200, 250]
        .map(
          (yOff) => `
        <line x1="${cx - 120 * s}" y1="${cy + yOff * s}" x2="${cx + 120 * s}" y2="${cy + yOff * s}"
              stroke="${p.shadow}" stroke-width="${3 * s}" stroke-linecap="round"/>
      `
        )
        .join('\n')}

      <!-- Katup Tiup Sudut (Air Valve) PRD -->
      <circle cx="${cx + 95 * s}" cy="${cy - 265 * s}" r="${14 * s}" fill="${p.accent}" stroke="${p.line}" stroke-width="${2 * s}"/>
      <circle cx="${cx + 95 * s}" cy="${cy - 265 * s}" r="${6 * s}" fill="${p.highlight}"/>
    `;
  } else {
    // Sleeping Bag Mummy (Sub-Zero 800)
    content = `
      <!-- Siluet Kantong Tidur Bentuk Mummy -->
      <path d="M ${cx - 70 * s} ${cy - 290 * s}
               C ${cx - 150 * s} ${cy - 250 * s} ${cx - 160 * s} ${cy - 120 * s} ${cx - 140 * s} ${cy - 30 * s}
               L ${cx - 90 * s} ${cy + 240 * s}
               Q ${cx} ${cy + 290 * s} ${cx + 90 * s} ${cy + 240 * s}
               L ${cx + 140 * s} ${cy - 30 * s}
               C ${cx + 160 * s} ${cy - 120 * s} ${cx + 150 * s} ${cy - 250 * s} ${cx + 70 * s} ${cy - 290 * s}
               Q ${cx} ${cy - 320 * s} ${cx - 70 * s} ${cy - 290 * s} Z"
            fill="${p.base}" stroke="${p.line}" stroke-width="${2 * s}"/>

      <!-- Tudung Mummy (Contoured Hood Opening) -->
      <ellipse cx="${cx}" cy="${cy - 240 * s}" rx="${50 * s}" ry="${35 * s}" fill="${p.dark}" stroke="${p.line}" stroke-width="${2 * s}"/>
      <ellipse cx="${cx}" cy="${cy - 240 * s}" rx="${30 * s}" ry="${20 * s}" fill="${p.shadow}"/>

      <!-- Jahitan Baffle Melengkung (Baffle Chambers) -->
      ${[-150, -90, -30, 30, 90, 150, 200]
        .map(
          (yOff) => `
        <path d="M ${cx - 120 * s} ${cy + yOff * s} Q ${cx} ${cy + (yOff + 25) * s} ${cx + 120 * s} ${cy + yOff * s}"
              fill="none" stroke="${p.shadow}" stroke-width="${2 * s}"/>
      `
        )
        .join('\n')}

      <!-- Garis Resleting Samping dengan Aksen PRD -->
      <path d="M ${cx + 140 * s} ${cy - 120 * s} L ${cx + 80 * s} ${cy + 180 * s}"
            stroke="${p.line}" stroke-width="${3 * s}"/>
      <circle cx="${cx + 140 * s}" cy="${cy - 120 * s}" r="${7 * s}" fill="${p.accent}"/>

      <!-- Footbox Ergonomis Bawah -->
      <ellipse cx="${cx}" cy="${cy + 250 * s}" rx="${60 * s}" ry="${20 * s}" fill="${p.shadow}" stroke="${p.line}" stroke-width="${1.5 * s}"/>
    `;
  }

  return wrapSvg({
    width,
    height,
    mode,
    palette: p,
    flip,
    zoom,
    zoomOrigin: [cx, cy - 200 * s],
    content,
  });
}
