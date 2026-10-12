import React from 'react';

interface SpotlightGalleryProps {
  galeri: string[];
  nama: string;
  className?: string;
}

export const SpotlightGallery: React.FC<SpotlightGalleryProps> = ({
  galeri,
  nama,
  className = '',
}) => {
  const labels = ['Tampak Depan', 'Tampak Belakang', 'Detail Teknis'];

  return (
    <div
      className={`bg-putih text-hitam p-6 sm:p-8 flex flex-col justify-between overflow-hidden select-none z-20 ${className}`}
    >
      <div className="flex items-center justify-between pb-4 border-b border-hitam/10">
        <span className="font-hud font-bold text-xs tracking-widest text-hitam uppercase">
          STRIP GALERI PRODUK
        </span>
        <span className="font-hud text-[10px] text-abu tracking-wider">
          3-ANGLE INSPECTION
        </span>
      </div>

      {/* Strip Foto Vertikal di Latar Abu Terang (#D4D7DC) */}
      <div className="py-4 space-y-4 overflow-y-auto no-scrollbar max-h-[75vh]">
        {galeri.map((foto, idx) => (
          <div
            key={idx}
            className="group relative aspect-[3/4] bg-abu-terang border border-black/10 overflow-hidden flex items-center justify-center transition-transform duration-base hover:scale-[1.02]"
          >
            {/* Foto Galeri */}
            <img
              src={foto}
              alt={`${nama} - ${labels[idx] || 'Foto'}`}
              className="w-full h-full object-cover grayscale contrast-125 transition-transform duration-500 group-hover:scale-105"
              onError={(e) => {
                // Sembunyikan jika placeholder rusak
                (e.currentTarget as HTMLElement).style.opacity = '0.3';
              }}
            />

            {/* Placeholder Visual Graphic jika belum ada foto final */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-3 text-center pointer-events-none">
              <span className="font-hud text-[10px] font-bold tracking-widest text-hitam/80 uppercase">
                {labels[idx] || `FOTO 0${idx + 1}`}
              </span>
              <span className="font-hud text-[8px] text-hitam/50 tracking-wider mt-1 uppercase">
                LATAR --ABU-TERANG
              </span>
            </div>

            {/* Label Badge di Bawah Foto */}
            <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-hitam text-putih font-hud text-[9px] tracking-wider uppercase font-semibold">
              0{idx + 1} // {labels[idx]}
            </div>
          </div>
        ))}
      </div>

      <div className="pt-3 border-t border-hitam/10 flex items-center justify-between font-hud text-[10px] text-abu">
        <span>RESOLUSI 3:4</span>
        <span>DETAIL INSPEKSI</span>
      </div>
    </div>
  );
};
