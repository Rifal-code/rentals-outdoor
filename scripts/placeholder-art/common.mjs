/**
 * Helper bersama untuk template placeholder SVG
 */
export function getPalette(mode, accentColor = '#FF4513') {
  if (mode === 'catalog') {
    return {
      bg: '#1A1A1A',
      base: '#CBD0D8',
      shadow: '#8C929D',
      dark: '#585D67',
      highlight: '#F0F2F5',
      line: '#1A1A1A',
      lineLight: '#A4ABB6',
      accent: accentColor,
    };
  }
  if (mode === 'gallery') {
    return {
      bg: '#D4D7DC',
      base: '#2D3035',
      shadow: '#1E2023',
      dark: '#141517',
      highlight: '#484D55',
      line: '#D4D7DC',
      lineLight: '#656A73',
      accent: '#2D3035', // Charcoal tone
    };
  }
  // Cutout: Latar transparan, kontras tinggi
  return {
    bg: 'none',
    base: '#E5E8EC',
    shadow: '#6A707B',
    dark: '#1F2226',
    highlight: '#FFFFFF',
    line: '#0D0E10',
    lineLight: '#CBD0D8',
    accent: '#0D0E10',
  };
}

export function wrapSvg({ width, height, mode, palette, flip, zoom = 1, zoomOrigin = [width / 2, height / 2], content }) {
  const bgRect = mode === 'cutout'
    ? ''
    : `<rect width="${width}" height="${height}" fill="${palette.bg}"/>`;

  let transform = '';
  if (zoom !== 1) {
    const [ox, oy] = zoomOrigin;
    transform += `translate(${ox}, ${oy}) scale(${zoom}) translate(${-ox}, ${-oy}) `;
  }
  if (flip) {
    transform += `translate(${width}, 0) scale(-1, 1) `;
  }

  const inner = transform ? `<g transform="${transform.trim()}">${content}</g>` : content;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
  ${bgRect}
  ${inner}
</svg>`;
}
