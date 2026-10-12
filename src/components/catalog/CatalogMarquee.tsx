import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Compass } from 'lucide-react';
import { MarqueeColumn } from './MarqueeColumn';
import { ProductItem } from './ProductCard';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import rawProducts from '@/data/products.json';

const products = rawProducts as ProductItem[];

export const CatalogMarquee: React.FC = () => {
  const reducedMotion = useReducedMotion();
  const [isTabActive, setIsTabActive] = useState<boolean>(true);

  // Tab blur / visibilitychange listener
  useEffect(() => {
    const handleVisibility = () => {
      setIsTabActive(!document.hidden);
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  // Bagi 16 produk ke dalam 4 kolom (masing-masing 4 produk)
  const col1 = products.slice(0, 4);
  const col2 = products.slice(4, 8);
  const col3 = products.slice(8, 12);
  const col4 = products.slice(12, 16);

  return (
    <section
      id="section-katalog"
      className="relative w-full bg-hitam text-putih py-20 lg:py-28 select-none overflow-hidden"
      aria-label="Section Cuplikan Katalog Produk Outdoor"
    >
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-12 space-y-12">
        {/* Header Editorial Section 4 */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Compass className="w-3.5 h-3.5 text-api" />
              <span className="font-hud text-xs tracking-widest text-cyan uppercase font-bold">
                KATALOG PERLENGKAPAN // SIAP PAKAI
              </span>
            </div>
            <h2 className="headline-tight text-3xl sm:text-5xl lg:text-6xl text-putih">
              semua alat yang kamu bu<span className="text-cyan">tuh</span>kan ada di sini.
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-abu max-w-xs leading-relaxed">
            Dari tenda badai hingga kompor mini. Alat telah melalui uji fungsi dan sanitasi menyeluruh sebelum disewa.
          </p>
        </div>

        {/* Grid Marquee ±90vh dengan Masking Gradien Atas & Bawah */}
        <div
          className="relative h-[80vh] min-h-[580px] max-h-[900px] overflow-hidden"
          style={{
            // Masking gradien halus pudar di atas dan bawah
            WebkitMaskImage:
              'linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)',
            maskImage:
              'linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)',
          }}
        >
          {/* Kolom 4 (Desktop ≥ 1024px) / 3 (Tablet) / 2 (Mobile) */}
          <div
            className={`h-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 ${
              !isTabActive ? '[&_.marquee-track]:[animation-play-state:paused]' : ''
            }`}
          >
            {/* Kolom 1: Atas -> Bawah (60s) */}
            <MarqueeColumn
              items={col1}
              direction="down"
              durationSeconds={60}
              reducedMotion={reducedMotion}
              className="h-full"
            />

            {/* Kolom 2: Bawah -> Atas (72s) */}
            <MarqueeColumn
              items={col2}
              direction="up"
              durationSeconds={72}
              reducedMotion={reducedMotion}
              className="h-full"
            />

            {/* Kolom 3: Atas -> Bawah (66s) */}
            <MarqueeColumn
              items={col3}
              direction="down"
              durationSeconds={66}
              reducedMotion={reducedMotion}
              className="hidden md:block h-full"
            />

            {/* Kolom 4: Bawah -> Atas (80s) */}
            <MarqueeColumn
              items={col4}
              direction="up"
              durationSeconds={80}
              reducedMotion={reducedMotion}
              className="hidden lg:block h-full"
            />
          </div>
        </div>

        {/* Tombol CTA Besar Pill --api Menuju /katalog */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-white/10">
          <div className="flex items-center gap-2 font-hud text-xs text-abu tracking-widest">
            <span className="w-2 h-2 rounded-full bg-api" />
            <span>TOTAL 16+ ITEM TERSEDIA DALAM SISTEM</span>
          </div>

          <Link
            to="/katalog"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-api text-hitam hover:bg-putih rounded-pill font-hud text-xs sm:text-sm tracking-widest uppercase font-extrabold transition-all duration-fast shadow-xl focus-visible:outline-2 focus-visible:outline-cyan"
            aria-label="Buka Halaman Katalog Lengkap"
          >
            <span>LIHAT SEMUA KATALOG</span>
            <ArrowUpRight className="w-4 h-4 text-hitam" />
          </Link>
        </div>
      </div>
    </section>
  );
};
