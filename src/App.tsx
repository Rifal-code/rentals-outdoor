import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes';
import { initLenis, destroyLenis } from './lib/lenis';
import { useReducedMotion } from './hooks/useReducedMotion';

export const App: React.FC = () => {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    // Jalankan Lenis hanya jika reduced motion tidak aktif
    if (!reducedMotion) {
      initLenis();
    } else {
      destroyLenis();
    }

    return () => {
      destroyLenis();
    };
  }, [reducedMotion]);

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};
