import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, MessageSquare } from 'lucide-react';
import { siteConfig } from '@/data/site';

export const ClosingCta: React.FC = () => {
  return (
    <section
      className="relative w-full bg-api text-putih py-28 lg:py-40 select-none overflow-hidden"
      aria-label="Section Ajakan Bertindak Penutup"
    >
      {/* Busur Konsentris Dekoratif Samar di Latar */}
      <div
        className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-40 z-0"
        aria-hidden="true"
      >
        <img
          src="/assets/ornaments/arcs.svg"
          alt=""
          className="w-[120vw] max-w-[1400px] h-auto object-contain"
        />
      </div>

      <div className="relative max-w-container mx-auto px-4 sm:px-6 lg:px-12 text-center space-y-10 z-10">
        <span className="font-hud text-xs sm:text-sm tracking-widest text-cyan uppercase font-bold block">
          SIAPKAN PETUALANGANMU // LANGKAH PERTAMA
        </span>

        {/* Satu Headline Raksasa Huruf Kecil Sesuai PRD */}
        <h2 className="headline-tight text-5xl sm:text-7xl lg:text-8xl text-putih max-w-4xl mx-auto">
          gunung sudah menunggu. alatnya biar kami yang si<span className="text-cyan">ap</span>kan.
        </h2>

        <p className="text-sm sm:text-base text-white/90 max-w-lg mx-auto font-medium leading-relaxed">
          Pilih perlengkapanmu sekarang atau tanyakan ketersediaan ukuran langsung ke tim kami via WhatsApp.
        </p>

        {/* Tombol Aksi Ganda (Pill) */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/katalog"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-putih text-hitam hover:bg-hitam hover:text-putih rounded-pill font-hud text-xs sm:text-sm tracking-widest uppercase font-extrabold transition-all duration-fast shadow-2xl focus-visible:outline-2 focus-visible:outline-cyan"
          >
            <span>LIHAT SEMUA KATALOG</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>

          <a
            href={`https://wa.me/${siteConfig.phoneWhatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 border border-white/80 bg-hitam/30 backdrop-blur-sm text-putih hover:bg-white hover:text-hitam rounded-pill font-hud text-xs sm:text-sm tracking-widest uppercase font-bold transition-all duration-fast focus-visible:outline-2 focus-visible:outline-cyan"
          >
            <MessageSquare className="w-4 h-4 text-cyan" />
            <span>KONSULTASI VIA WHATSAPP</span>
          </a>
        </div>
      </div>
    </section>
  );
};
