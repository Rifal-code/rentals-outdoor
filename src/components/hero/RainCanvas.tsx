import React, { useEffect, useRef } from 'react';
import { RainSimulation, RainOptions } from '@/lib/rain';

interface RainCanvasProps {
  options: RainOptions;
  isPaused: boolean;
  reducedMotion: boolean;
}

export const RainCanvas: React.FC<RainCanvasProps> = ({
  options,
  isPaused,
  reducedMotion,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const simRef = useRef<RainSimulation | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Buat engine simulasi
    const sim = new RainSimulation(canvas, options);
    simRef.current = sim;
    sim.resize();

    // Start jika tidak dipause dan tidak reduced motion
    if (!isPaused && !reducedMotion) {
      sim.start();
    }

    const handleResize = () => {
      sim.resize();
    };

    // IntersectionObserver untuk berhenti saat hero keluar viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!isPaused && !reducedMotion) sim.start();
          } else {
            sim.stop();
          }
        });
      },
      { threshold: 0 }
    );

    observer.observe(canvas);

    // Event saat tab tidak aktif
    const handleVisibilityChange = () => {
      if (document.hidden) {
        sim.stop();
      } else if (!isPaused && !reducedMotion) {
        sim.start();
      }
    };

    window.addEventListener('resize', handleResize);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      observer.disconnect();
      sim.destroy();
      simRef.current = null;
    };
  }, []);

  // Update opsi reaktif saat slider digeser
  useEffect(() => {
    if (simRef.current) {
      simRef.current.updateOptions(options);
    }
  }, [options]);

  // Handle jeda atau reduced motion
  useEffect(() => {
    if (!simRef.current) return;
    if (isPaused || reducedMotion) {
      simRef.current.stop();
    } else {
      simRef.current.start();
    }
  }, [isPaused, reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-10"
      aria-hidden="true"
    />
  );
};
