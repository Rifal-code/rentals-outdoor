import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

interface MiniCardProps {
  className?: string;
}

export const MiniCard: React.FC<MiniCardProps> = ({ className = '' }) => {
  return (
    <Link
      to="/katalog?kategori=kacamata"
      className={`group block p-2.5 bg-hitam/20 border border-api-tua hover:border-putih hover:-translate-y-1 transition-all duration-fast w-48 sm:w-56 select-none focus-visible:outline-2 focus-visible:outline-cyan ${className}`}
      aria-label="Lihat detail Kacamata Gunung di Katalog"
    >
      {/* Siku Bracket Kamera (Corner Accents) */}
      <div className="relative">
        <div className="aspect-square bg-abu-terang/20 border border-white/20 overflow-hidden relative flex items-center justify-center">
          {/* Foto Kacamata Mini */}
          <img
            src="/assets/hero/mini-goggle.webp"
            alt="Kacamata gunung perlindungan salju dan angin"
            className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 transition-transform duration-base"
            onError={(e) => {
              // Fallback siluet jika gambar belum dimuat
              (e.currentTarget as HTMLElement).style.display = 'none';
            }}
          />

          {/* Fallback graphic jika foto placeholder */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-2 text-center text-white/60 pointer-events-none">
            <span className="font-hud text-[10px] tracking-widest text-cyan uppercase font-bold">
              KACAMATA GUNUNG
            </span>
            <span className="font-hud text-[8px] text-white/50 tracking-wider">
              LENSA POLARIZED UV400
            </span>
          </div>

          {/* Sudut bracket kamera tipis */}
          <span className="absolute top-1 left-1 w-2 h-2 border-t border-l border-white/80" />
          <span className="absolute top-1 right-1 w-2 h-2 border-t border-r border-white/80" />
          <span className="absolute bottom-1 left-1 w-2 h-2 border-b border-l border-white/80" />
          <span className="absolute bottom-1 right-1 w-2 h-2 border-b border-r border-white/80" />

          {/* Indikator link keluar mini */}
          <div className="absolute bottom-1.5 right-1.5 p-1 bg-hitam/80 text-white opacity-0 group-hover:opacity-100 transition-opacity">
            <ArrowUpRight className="w-3 h-3 text-cyan" />
          </div>
        </div>
      </div>

      {/* Barcode Strip SVG */}
      <div className="mt-2 pt-1 border-t border-white/10">
        <img
          src="/assets/ornaments/barcode.svg"
          alt=""
          className="h-3 w-full object-cover opacity-80"
          aria-hidden="true"
        />
      </div>

      {/* Caption teks teknis rata kanan sesuai Gambar 1 */}
      <div className="mt-2 text-right">
        <p className="font-hud text-[9px] uppercase tracking-wider text-white/90 leading-tight">
          PERFORMANCE EYEWEAR
        </p>
        <p className="font-hud text-[8px] uppercase tracking-widest text-white/60">
          ENGINEERED FOR HARSH CONDITIONS
        </p>
      </div>
    </Link>
  );
};
