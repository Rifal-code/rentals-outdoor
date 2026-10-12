import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const HowToRent: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'pilih alat di katalog',
      label: 'SELEKSI PERLENGKAPAN',
      desc: 'Tentukan tenda, carrier, jaket, atau paket pendakian sesuai ketinggian gunung dan durasi perjalananmu. Semua spesifikasi teknis tertera transparan.',
    },
    {
      step: '02',
      title: 'booking tanggal & durasi',
      label: 'PENJADWALAN AMAN',
      desc: 'Pilih tanggal ambil dan tanggal kembali. Unit langsung dikunci untukmu tanpa risiko bentrok jadwal dengan pendaki lain.',
    },
    {
      step: '03',
      title: 'ambil di tempat atau diantar',
      label: 'DISTRIBUSI FLEKSIBEL',
      desc: 'Ambil mandiri di gudang operasional kami di [ISI NANTI: ALAMAT GUDANG] atau gunakan opsi pengantaran kurir langsung ke alamatmu.',
    },
    {
      step: '04',
      title: 'kembalikan & lepas jaminan',
      label: 'SELESAI EKSPEDISI',
      desc: 'Cukup bersihkan kotoran tanah kasar; tim kami yang menangani sanitasi dan perawatan waterproofing DWR. Dokumen jaminanmu langsung dikembalikan.',
    },
  ];

  return (
    <section
      id="cara-sewa"
      className="w-full bg-putih text-hitam py-20 lg:py-28 select-none"
      aria-label="Section Cara Sewa Alat Outdoor"
    >
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-12 space-y-16">
        {/* Header Editorial Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-hitam/20">
          <div className="space-y-2">
            <span className="font-hud text-xs tracking-widest text-api font-bold uppercase block">
              ALUR TRANSAKSI // 4 LANGKAH MUDAH
            </span>
            <h2 className="headline-tight text-4xl sm:text-6xl text-hitam">
              cara sewa. tanpa repot, tinggal jalan.
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-hitam/70 max-w-xs leading-relaxed font-medium">
            Proses peminjaman dirancang cepat dan transparan agar kamu bisa fokus mempersiapkan fisik dan logistik pendakian.
          </p>
        </div>

        {/* 4 Baris Besar Bernomor Raksasa Sesuai Prinsip Anti-Slop PRD */}
        <div className="divide-y divide-hitam/20 border-t border-b border-hitam/20">
          {steps.map((s) => (
            <div
              key={s.step}
              className="py-8 sm:py-12 grid grid-cols-1 md:grid-cols-12 gap-6 items-baseline group hover:bg-black/[0.02] transition-colors px-2 sm:px-4"
            >
              {/* Kolom Angka Raksasa (01-04) */}
              <div className="md:col-span-3 flex items-baseline gap-4">
                <span className="font-sans font-extrabold text-5xl sm:text-7xl text-hitam tracking-tighter leading-none group-hover:text-api transition-colors">
                  {s.step}
                </span>
                <span className="font-hud text-[11px] font-bold text-hitam/50 tracking-widest uppercase">
                  {s.label}
                </span>
              </div>

              {/* Kolom Judul Langkah */}
              <div className="md:col-span-4">
                <h3 className="font-sans font-extrabold text-2xl sm:text-3xl text-hitam lowercase tracking-tight leading-snug">
                  {s.title}
                </h3>
              </div>

              {/* Kolom Deskripsi & Garis Penunjuk */}
              <div className="md:col-span-5 flex items-start gap-4">
                <div className="hidden lg:block w-8 h-[1px] bg-hitam/30 mt-3 flex-shrink-0" />
                <p className="text-xs sm:text-sm text-hitam/80 leading-relaxed font-normal">
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Action Link Tambahan */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
          <span className="font-hud text-xs text-hitam/60 tracking-wider">
            BUTUH PANDUAN UKURAN CARRIER ATAU SEPATU?
          </span>
          <Link
            to="/katalog"
            className="inline-flex items-center gap-2 font-hud text-xs text-hitam hover:text-api tracking-wider uppercase font-bold transition-colors"
          >
            <span>MULAI PILIH ALAT DI KATALOG</span>
            <ArrowUpRight className="w-4 h-4 text-api" />
          </Link>
        </div>
      </div>
    </section>
  );
};
