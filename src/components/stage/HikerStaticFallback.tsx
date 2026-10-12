import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { STAGE_CONFIG } from '../../data/stage.config';

export const HikerStaticFallback: React.FC = () => {
  return (
    <section
      className="w-full min-h-screen bg-api text-putih px-6 py-24 select-none relative overflow-hidden"
      aria-label="Outfit Showcase (Mode Aksesibilitas Statis)"
    >
      <div className="max-w-container mx-auto space-y-12">
        <div className="text-center space-y-4">
          <span className="font-hud text-xs tracking-widest text-white/80 uppercase">
            PERLENGKAPAN PENDAKI // MODE AKSESIBILITAS
          </span>
          <h2 className="headline-tight text-4xl sm:text-6xl text-putih">
            satu orang. lengkap dari kepala ke kaki.
          </h2>
          <p className="text-sm text-white/80 max-w-xl mx-auto">
            Semua perlengkapan sewa diinspeksi ketat, bebas rembes, dan teruji di cuaca gunung ekstrem.
          </p>
        </div>

        {/* Gambar Poster Statis Subjek */}
        <div className="flex justify-center">
          <div className="relative max-w-md w-full aspect-[3/4] bg-hitam/30 border border-white/20 flex items-center justify-center p-6">
            <img
              src="/assets/hero/hero-subject.svg"
              alt="Siluet perlengkapan lengkap pendaki gunung"
              className="w-full h-full object-contain filter contrast-125"
            />
          </div>
        </div>

        {/* Daftar Lengkap Perlengkapan */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-6">
          {STAGE_CONFIG.annotations.map((item) => (
            <div
              key={item.id}
              className="p-5 border border-white/30 bg-hitam/40 backdrop-blur-sm flex flex-col justify-between"
            >
              <div>
                <span className="font-hud text-xs text-cyan tracking-wider uppercase">
                  {item.kategori}
                </span>
                <h3 className="text-xl font-bold lowercase mt-1">{item.nama}</h3>
                <p className="font-hud text-sm text-white/80 mt-2">
                  RP {item.hargaPerHari}/HARI
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-white/10">
                <Link
                  to={item.href}
                  className="inline-flex items-center gap-1.5 font-hud text-xs text-putih hover:text-cyan tracking-wider uppercase font-bold"
                >
                  LIHAT DI KATALOG
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center pt-8">
          <Link
            to="/katalog"
            className="inline-flex items-center gap-2 px-8 py-4 bg-putih text-hitam hover:bg-hitam hover:text-putih font-hud text-xs tracking-wider uppercase font-bold transition-colors"
          >
            LIHAT SEMUA PERLENGKAPAN
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
