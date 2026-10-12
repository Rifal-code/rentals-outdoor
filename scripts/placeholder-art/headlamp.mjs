import { getPalette, wrapSvg } from './common.mjs';

export function renderHeadlamp({ mode = 'catalog', variant = 'pivot', accentColor = '#FF4513', flip = false, zoom = 1 }) {
  const width = mode === 'gallery' ? 900 : mode === 'cutout' ? 1440 : 800;
  const height = mode === 'gallery' ? 1200 : mode === 'cutout' ? 1800 : 1000;
  const p = getPalette(mode, accentColor);

  const cx = width / 2;
  const cy = height * 0.52;
  const s = width / 800;

  const content = `
    <!-- Tali Headband Elastis Belakang Melengkung -->
    <path d="M ${cx - 300 * s} ${cy}
             C ${cx - 320 * s} ${cy - 120 * s} ${cx + 320 * s} ${cy - 120 * s} ${cx + 300 * s} ${cy}
             L ${cx + 250 * s} ${cy + 20 * s}
             C ${cx + 260 * s} ${cy - 80 * s} ${cx - 260 * s} ${cy - 80 * s} ${cx - 250 * s} ${cy + 20 * s} Z"
          fill="${p.dark}" stroke="${p.line}" stroke-width="${1.5 * s}"/>

    <!-- Plat Penopang Dahi (Forehead Backplate) -->
    <path d="M ${cx - 180 * s} ${cy - 20 * s}
             Q ${cx} ${cy - 35 * s} ${cx + 180 * s} ${cy - 20 * s}
             L ${cx + 160 * s} ${cy + 90 * s}
             Q ${cx} ${cy + 110 * s} ${cx - 160 * s} ${cy + 90 * s} Z"
          fill="${p.shadow}" stroke="${p.line}" stroke-width="${2 * s}"/>

    <!-- Casing Lampu Pivoting Depan -->
    <rect x="${cx - 130 * s}" y="${cy - 10 * s}" width="${260 * s}" height="${140 * s}" rx="${16 * s}"
          fill="${p.base}" stroke="${p.line}" stroke-width="${2.5 * s}"/>

    <!-- Tombol Daya Karet Atas (Power Switch) PRD -->
    <rect x="${cx - 45 * s}" y="${cy - 24 * s}" width="${90 * s}" height="${16 * s}" rx="${5 * s}"
          fill="${p.accent}" stroke="${p.line}" stroke-width="${1.5 * s}"/>

    <!-- Frame Lensa Depan (Bezel) -->
    <rect x="${cx - 105 * s}" y="${cy + 15 * s}" width="${210 * s}" height="${90 * s}" rx="${10 * s}"
          fill="${p.dark}" stroke="${p.line}" stroke-width="${2 * s}"/>

    <!-- Lensa Utama Spot Optic (Kiri) -->
    <circle cx="${cx - 45 * s}" cy="${cy + 60 * s}" r="${30 * s}" fill="${p.highlight}" stroke="${p.line}" stroke-width="${1.5 * s}"/>
    <circle cx="${cx - 45 * s}" cy="${cy + 60 * s}" r="${14 * s}" fill="${p.base}"/>

    <!-- Lensa Flood / Red LED (Kanan) -->
    <circle cx="${cx + 45 * s}" cy="${cy + 60 * s}" r="${22 * s}" fill="${p.highlight}" stroke="${p.line}" stroke-width="${1.5 * s}"/>
    <circle cx="${cx + 45 * s}" cy="${cy + 60 * s}" r="${10 * s}" fill="${p.accent}"/>

    <!-- Garis Engsel Kemiringan (Tilt Ratchet Hinge) -->
    <line x1="${cx - 120 * s}" y1="${cy + 10 * s}" x2="${cx - 120 * s}" y2="${cy + 120 * s}" stroke="${p.lineLight}" stroke-width="${2 * s}"/>
    <line x1="${cx + 120 * s}" y1="${cy + 10 * s}" x2="${cx + 120 * s}" y2="${cy + 120 * s}" stroke="${p.lineLight}" stroke-width="${2 * s}"/>
  `;

  return wrapSvg({
    width,
    height,
    mode,
    palette: p,
    flip,
    zoom,
    zoomOrigin: [cx, cy + 50 * s],
    content,
  });
}
