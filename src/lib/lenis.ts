import Lenis from 'lenis';
import { gsap, ScrollTrigger } from './gsap';

let lenisInstance: Lenis | null = null;
let rafCallback: ((time: number) => void) | null = null;

export interface LenisOptions {
  disabled?: boolean;
}

/**
 * Inisialisasi Lenis Smooth Scroll yang terintegrasi dengan GSAP ScrollTrigger.
 * Jika `disabled` bernilai true (misalnya pada prefers-reduced-motion), Lenis tidak akan dijalankan.
 */
export function initLenis(options: LenisOptions = {}): Lenis | null {
  if (typeof window === 'undefined') return null;

  // Hancurkan instance lama jika ada
  destroyLenis();

  if (options.disabled) {
    return null;
  }

  // Buat instance Lenis
  lenisInstance = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    touchMultiplier: 1.5,
  });

  // Hubungkan event scroll Lenis ke GSAP ScrollTrigger
  lenisInstance.on('scroll', ScrollTrigger.update);

  // Jalankan ticker GSAP untuk memperbarui Lenis setiap frame
  rafCallback = (time: number) => {
    lenisInstance?.raf(time * 1000);
  };
  gsap.ticker.add(rafCallback);
  gsap.ticker.lagSmoothing(0);

  return lenisInstance;
}

/**
 * Menghentikan dan membersihkan instance Lenis.
 */
export function destroyLenis(): void {
  if (rafCallback) {
    gsap.ticker.remove(rafCallback);
    rafCallback = null;
  }
  if (lenisInstance) {
    lenisInstance.destroy();
    lenisInstance = null;
  }
}

/**
 * Mendapatkan instance Lenis aktif (bisa bernilai null jika dinonaktifkan).
 */
export function getLenis(): Lenis | null {
  return lenisInstance;
}
