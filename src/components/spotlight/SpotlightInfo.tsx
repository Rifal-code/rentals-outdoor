import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { SpecTable, SpecItem } from './SpecTable';

interface SpotlightInfoProps {
  slug: string;
  nama: string;
  tagline: string;
  deskripsi: string;
  spesifikasi: SpecItem[];
  hargaPerHari: string;
  className?: string;
}

export const SpotlightInfo: React.FC<SpotlightInfoProps> = ({
  slug,
  nama,
  tagline,
  deskripsi,
  spesifikasi,
  hargaPerHari,
  className = '',
}) => {
  return (
    <div
      className={`flex flex-col justify-between p-6 sm:p-10 lg:p-12 text-putih bg-api z-20 ${className}`}
    >
      <div className="space-y-6">
        {/* Tagline Kecil Produk (Saira HUD) */}
        <div>
          <span className="font-hud font-bold text-xs tracking-widest text-cyan uppercase block mb-1">
            {tagline}
          </span>
          <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-normal max-w-sm">
            {deskripsi}
          </p>
        </div>

        {/* Tabel 5 Baris Spesifikasi & Harga */}
        <SpecTable spesifikasi={spesifikasi} hargaPerHari={hargaPerHari} />
      </div>

      {/* Tombol Sewa Persegi Putih Teks Hitam dengan Panah Garis */}
      <div className="pt-8">
        <Link
          to={`/katalog?produk=${slug}`}
          className="inline-flex items-center justify-between gap-4 w-full sm:w-auto px-6 py-4 bg-putih text-hitam hover:bg-hitam hover:text-putih font-hud text-xs tracking-widest uppercase font-bold transition-colors duration-fast focus-visible:outline-2 focus-visible:outline-cyan"
          aria-label={`Sewa ${nama} sekarang di Katalog`}
        >
          <span>SEWA {nama.toUpperCase()}</span>
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};
