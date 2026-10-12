import React from 'react';
import { Shield, Sparkles, RefreshCw } from 'lucide-react';

export const WhyUs: React.FC = () => {
  const points = [
    {
      pill: '100% INSPECTED',
      title: 'inspeksi fungsi sebelum diserahkan',
      desc: 'Setiap tenda dicek kelengkapan pasak dan frame tiangnya. Ritsleting jaket dan strap carrier diuji beban sebelum diserahkan ke tanganmu. Tidak ada alat rusak yang keluar gudang.',
      icon: Shield,
    },
    {
      pill: 'HYGIENIC DWR',
      title: 'sanitasi steril & restorasi lapisan anti-air',
      desc: 'Sleeping bag dan jaket dicuci dengan sabun khusus kain teknis nikwax, bebas bau apek dan higienis. Lapisan DWR diuji kedap air secara berkala agar tidak rembes saat badai.',
      icon: Sparkles,
    },
    {
      pill: 'BACKUP POLICY',
      title: 'garansi ganti unit jika ada kendala di awal',
      desc: 'Jika ada komponen yang kurang pas sebelum kamu melangkah naik, tim kami siap menukar unit seketika di titik temu gudang: [ISI NANTI: KEBIJAKAN TUKAR ALAT].',
      icon: RefreshCw,
    },
  ];

  return (
    <section
      id="kenapa-kami"
      className="w-full bg-api-tua text-putih py-20 lg:py-28 select-none"
      aria-label="Section Kenapa Kami Rental Outdoor"
    >
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-12 space-y-16">
        {/* Editorial Single Column Header */}
        <div className="max-w-2xl space-y-4">
          <span className="font-hud text-xs tracking-widest text-cyan uppercase font-bold block">
            STANDAR KUALITAS // FAKTA OPERASIONAL
          </span>
          <h2 className="headline-tight text-4xl sm:text-6xl text-putih">
            dikelola oleh orang yang benar-benar mendaki.
          </h2>
          <p className="text-sm sm:text-base text-white/90 leading-relaxed font-normal">
            Kami tahu rasanya kedinginan di pos 3 karena sleeping bag basah atau pundak lecet karena carrier salah setelan. Itu sebabnya kami memperlakukan setiap alat rental seperti alat pribadi kami sendiri.
          </p>
        </div>

        {/* Baris Editorial Poin Keunggulan (Bukan Grid Ikon Seragam) */}
        <div className="border-t border-white/20 divide-y divide-white/20">
          {points.map((p, idx) => (
            <div
              key={idx}
              className="py-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-baseline"
            >
              {/* Pill Data Outline HUD */}
              <div className="md:col-span-4 flex items-center gap-3">
                <span className="px-3.5 py-1.5 border border-white/60 rounded-pill font-hud text-xs tracking-wider text-putih uppercase bg-white/5 backdrop-blur-sm font-semibold">
                  {p.pill}
                </span>
                <span className="font-hud text-[10px] text-white/60 tracking-widest">
                  STANDAR 0{idx + 1}
                </span>
              </div>

              {/* Judul & Deskripsi Faktual */}
              <div className="md:col-span-8 space-y-2">
                <h3 className="font-sans font-extrabold text-2xl sm:text-3xl text-putih lowercase tracking-tight">
                  {p.title}
                </h3>
                <p className="text-xs sm:text-sm text-white/80 leading-relaxed max-w-xl font-normal">
                  {p.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
