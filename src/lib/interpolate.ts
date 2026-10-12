export interface KeyframePoint {
  frame: number;
  x: number;
  y: number;
  labelSide: 'left' | 'right';
}

export interface AnnotationItem {
  id: string;
  nama: string;
  kategori: string;
  hargaPerHari: string;
  href: string;
  visibleRange: [number, number]; // [frameStart, frameEnd]
  keyframes: KeyframePoint[];
}

/**
 * Menghitung derajat rotasi (0° hingga 360°) berdasarkan indeks frame saat ini.
 * Total 48 frame: 0 = 0°, 12 = 90°, 24 = 180°, 36 = 270°, 47 = 352.5°
 */
export function frameToDegrees(frameIndex: number, totalFrames: number = 48): number {
  if (totalFrames <= 0) return 0;
  const normalized = ((frameIndex % totalFrames) + totalFrames) % totalFrames;
  return Math.round((normalized / totalFrames) * 360);
}

/**
 * Memeriksa apakah frame saat ini berada di dalam jendela visibleRange.
 * Menangani kasus rentang yang melintasi frame 0 (misalnya 42 s/d 6).
 */
export function isFrameInRange(
  currentFrame: number,
  startFrame: number,
  endFrame: number,
  _totalFrames: number = 48
): boolean {
  if (startFrame <= endFrame) {
    return currentFrame >= startFrame && currentFrame <= endFrame;
  }
  // Rentang melintasi frame 0 (misalnya 42 s/d 6)
  return currentFrame >= startFrame || currentFrame <= endFrame;
}

/**
 * Menginterpolasi posisi (x, y) dan labelSide dari keyframe terdekat.
 */
export function interpolateKeyframe(
  currentFrame: number,
  keyframes: KeyframePoint[],
  totalFrames: number = 48
): { x: number; y: number; labelSide: 'left' | 'right' } {
  if (!keyframes || keyframes.length === 0) {
    return { x: 50, y: 50, labelSide: 'right' };
  }

  if (keyframes.length === 1) {
    return {
      x: keyframes[0].x,
      y: keyframes[0].y,
      labelSide: keyframes[0].labelSide,
    };
  }

  // Cari keyframe terdekat berdasarkan jarak circular
  let closest = keyframes[0];
  let minDiff = 999;

  for (const kf of keyframes) {
    let diff = Math.abs(kf.frame - currentFrame);
    if (diff > totalFrames / 2) {
      diff = totalFrames - diff;
    }
    if (diff < minDiff) {
      minDiff = diff;
      closest = kf;
    }
  }

  return {
    x: closest.x,
    y: closest.y,
    labelSide: closest.labelSide,
  };
}
