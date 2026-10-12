import React from 'react';

/**
 * Komponen aksesibilitas keyboard: Skip to main content link.
 * Tersembunyi secara visual sampai menerima fokus tab dari keyboard.
 */
export const SkipToContent: React.FC = () => {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-api focus:text-putih focus:font-hud focus:text-xs focus:uppercase focus:tracking-widest focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-cyan"
    >
      Langsung ke Konten Utama (Skip to Content)
    </a>
  );
};
