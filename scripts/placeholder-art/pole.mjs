import { getPalette, wrapSvg } from './common.mjs';

export function renderPole({ mode = 'catalog', variant = 'pair', accentColor = '#FF4513', flip = false, zoom = 1 }) {
  const width = mode === 'gallery' ? 900 : mode === 'cutout' ? 1440 : 800;
  const height = mode === 'gallery' ? 1200 : mode === 'cutout' ? 1800 : 1000;
  const p = getPalette(mode, accentColor);

  const cx = width / 2;
  const cy = height * 0.52;
  const s = width / 800;

  function singlePole(offsetX, angleDeg) {
    return `
      <g transform="translate(${cx + offsetX * s}, ${cy}) rotate(${angleDeg})">
        <!-- Wrist Strap (Tali Pergelangan Tangan) -->
        <path d="M -8 -300 Q -60 -260 -20 -220 Q -5 -250 -8 -290" fill="none" stroke="${p.accent}" stroke-width="${6 * s}"/>

        <!-- Grip Busa EVA / Cork Ergonomis -->
        <path d="M -12 -310 C -25 -300 -22 -230 -14 -170 C -12 -160 -12 -130 -8 -130 L 8 -130 C 12 -130 12 -160 14 -170 C 22 -230 25 -300 12 -310 Z"
              fill="${p.dark}" stroke="${p.line}" stroke-width="${2 * s}"/>

        <!-- Shaft Section 1 (Karbon Tebal Atas) -->
        <rect x="-8" y="-130" width="16" height="180" fill="${p.base}" stroke="${p.line}" stroke-width="${1.5 * s}"/>

        <!-- Cam-Lock / Flip-Lock 1 -->
        <rect x="-11" y="45" width="22" height="22" rx="3" fill="${p.shadow}" stroke="${p.line}" stroke-width="${1.5 * s}"/>
        <rect x="5" y="49" width="10" height="14" rx="2" fill="${p.accent}"/>

        <!-- Shaft Section 2 (Tengah) -->
        <rect x="-6" y="65" width="12" height="180" fill="${p.highlight}" stroke="${p.line}" stroke-width="${1.5 * s}"/>

        <!-- Cam-Lock / Flip-Lock 2 -->
        <rect x="-9" y="240" width="18" height="20" rx="3" fill="${p.shadow}" stroke="${p.line}" stroke-width="${1.5 * s}"/>
        <rect x="4" y="243" width="9" height="14" rx="2" fill="${p.accent}"/>

        <!-- Shaft Section 3 (Bawah) -->
        <rect x="-4.5" y="258" width="9" height="160" fill="${p.base}" stroke="${p.line}" stroke-width="${1.5 * s}"/>

        <!-- Trekking / Mud Basket -->
        <ellipse cx="0" cy="385" rx="32" ry="8" fill="${p.dark}" stroke="${p.line}" stroke-width="${1.5 * s}"/>

        <!-- Tungsten Carbide Tip -->
        <polygon points="-4 410, 4 410, 0 435" fill="${p.highlight}" stroke="${p.line}" stroke-width="${1.5 * s}"/>
      </g>
    `;
  }

  const content = `
    ${singlePole(-40, -6)}
    ${variant === 'pair' ? singlePole(40, 6) : ''}
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
