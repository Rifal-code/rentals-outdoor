import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

export interface ProductItem {
  id: string;
  nama: string;
  kategori: string;
  hargaPerHari: string;
  foto: string;
  alt: string;
  slug: string;
}

interface ProductCardProps {
  product: ProductItem;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  className = '',
}) => {
  const [imgError, setImgError] = useState(false);

  return (
    <Link
      to={`/katalog?kategori=${product.kategori}&produk=${product.slug}`}
      className={`group block bg-hitam border border-abu/40 hover:border-api p-3 sm:p-4 select-none transition-all duration-base focus-visible:outline-2 focus-visible:outline-cyan ${className}`}
      aria-label={`Sewa ${product.nama}: ${product.hargaPerHari} per hari`}
    >
      {/* 1. Foto Produk Rasio 4:5 di Latar Gelap Netral */}
      <div className="relative aspect-[4/5] bg-[#161616] border border-white/5 overflow-hidden flex items-center justify-center">
        {!imgError ? (
          <img
            src={product.foto}
            alt={product.alt}
            loading="lazy"
            className="w-full h-full object-cover grayscale contrast-125 transition-transform duration-500 group-hover:scale-105"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center bg-white/[0.04]">
            <span className="font-hud text-xs text-white/40 uppercase tracking-widest font-bold">
              {product.kategori}
            </span>
            <span className="font-sans text-[11px] text-white/30 lowercase mt-1">
              {product.nama}
            </span>
          </div>
        )}

        {/* Sudut Bracket Mini Akses Visual */}
        <span className="absolute top-1.5 left-1.5 w-2 h-2 border-t border-l border-white/40 group-hover:border-api transition-colors" />
        <span className="absolute top-1.5 right-1.5 w-2 h-2 border-t border-r border-white/40 group-hover:border-api transition-colors" />
        <span className="absolute bottom-1.5 left-1.5 w-2 h-2 border-b border-l border-white/40 group-hover:border-api transition-colors" />
        <span className="absolute bottom-1.5 right-1.5 w-2 h-2 border-b border-r border-white/40 group-hover:border-api transition-colors" />

        {/* Badge Kategori Kecil di Pojok Kiri Atas */}
        <div className="absolute top-2.5 left-2.5 px-2 py-0.5 bg-hitam/80 backdrop-blur-sm border border-white/10 font-hud text-[9px] uppercase tracking-wider text-white/90">
          {product.kategori}
        </div>

        {/* Hover Arrow Indicator di Kanan Bawah */}
        <div className="absolute bottom-2.5 right-2.5 p-1 bg-hitam/90 text-white opacity-0 group-hover:opacity-100 group-hover:bg-api transition-all duration-fast">
          <ArrowUpRight className="w-3.5 h-3.5 text-hitam" />
        </div>
      </div>

      {/* 2. Informasi Nama Produk & Harga Sewa */}
      <div className="mt-3 space-y-1">
        <h3 className="font-sans font-bold text-xs sm:text-sm text-putih lowercase tracking-tight line-clamp-1 group-hover:text-cyan transition-colors">
          {product.nama}
        </h3>

        <div className="flex items-baseline justify-between pt-1 border-t border-white/10">
          <span className="font-hud text-[10px] text-abu tracking-wider uppercase">
            SEWA HARIAN
          </span>
          <div className="flex items-baseline gap-1">
            <span className="font-hud text-xs font-bold text-api">
              RP {product.hargaPerHari}
            </span>
            <span className="font-hud text-[9px] text-abu">/HARI</span>
          </div>
        </div>
      </div>
    </Link>
  );
};
