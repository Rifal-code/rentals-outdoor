import React from 'react';

export interface SpecItem {
  nilai: string;
  satuan: string;
  label: string;
}

interface SpecTableProps {
  spesifikasi: SpecItem[];
  hargaPerHari: string;
  className?: string;
}

export const SpecTable: React.FC<SpecTableProps> = ({
  spesifikasi,
  hargaPerHari,
  className = '',
}) => {
  return (
    <div className={`space-y-6 text-putih select-none ${className}`}>
      {/* Tabel 5 Baris Spesifikasi Teknis Tipis */}
      <div className="border-t border-white/40 divide-y divide-white/40">
        {spesifikasi.map((spec, idx) => (
          <div
            key={idx}
            className="py-2.5 flex items-baseline justify-between gap-4 transition-all duration-base"
          >
            {/* Nilai Besar Ringan (Manrope 300) + Satuan HUD (Saira) */}
            <div className="flex items-baseline gap-1.5">
              <span className="font-sans font-light text-2xl sm:text-3xl tracking-tight text-putih leading-none">
                {spec.nilai}
              </span>
              {spec.satuan && (
                <span className="font-hud font-normal text-[11px] text-white/80 tracking-wider">
                  {spec.satuan}
                </span>
              )}
            </div>

            {/* Label Spesifikasi Manrope 500 Rata Kanan */}
            <span className="font-sans font-medium text-xs sm:text-sm text-white/90 text-right">
              {spec.label}
            </span>
          </div>
        ))}
      </div>

      {/* Harga Sewa Harian Sesuai Gambar 2 */}
      <div className="pt-2">
        <div className="font-hud text-[10px] tracking-widest text-white/70 uppercase">
          TARIF SEWA HARIAN
        </div>
        <div className="flex items-baseline gap-2 mt-1">
          <span className="font-hud text-sm font-bold text-white/80">Rp</span>
          <span className="font-sans font-light text-4xl sm:text-5xl text-putih tracking-tight leading-none">
            {hargaPerHari}
          </span>
          <span className="font-hud text-xs text-white/70 tracking-wider">/hari</span>
        </div>
      </div>
    </div>
  );
};
