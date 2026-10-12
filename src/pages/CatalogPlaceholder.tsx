import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export const CatalogPlaceholder: React.FC = () => {
  const [searchParams] = useSearchParams();
  const kategori = searchParams.get('kategori');
  const produk = searchParams.get('produk');

  return (
    <main className="min-h-screen bg-hitam text-putih flex flex-col justify-center items-center px-6 py-20 text-center">
      <div className="max-w-xl mx-auto space-y-6">
        <div className="inline-block px-3 py-1 bg-api text-hitam font-hud text-xs tracking-wider font-semibold">
          FASE BERIKUTNYA
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight lowercase">
          katalog perlengkapan
        </h1>

        {kategori && (
          <p className="font-hud text-sm text-cyan tracking-widest">
            FILTER KATEGORI: {kategori.toUpperCase()}
          </p>
        )}

        {produk && (
          <p className="font-hud text-sm text-cyan tracking-widest">
            FOKUS PRODUK: {produk.toUpperCase()}
          </p>
        )}

        <p className="text-abu max-w-md mx-auto text-sm leading-relaxed">
          Halaman katalog lengkap, ketersediaan tanggal sewa, dan filter teknis sedang dalam tahap pengembangan fase selanjutnya.
        </p>

        <div className="pt-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-putih text-hitam hover:bg-api hover:text-putih transition-colors duration-fast font-hud text-xs tracking-wider"
          >
            <ArrowLeft className="w-4 h-4" />
            KEMBALI KE BERANDA
          </Link>
        </div>
      </div>
    </main>
  );
};
