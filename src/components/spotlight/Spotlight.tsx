import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Layers } from 'lucide-react';
import { SpotlightInfo } from './SpotlightInfo';
import { SpotlightCenter } from './SpotlightCenter';
import { SpotlightGallery } from './SpotlightGallery';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import rawSpotlightData from '@/data/spotlight.json';

export interface SpotlightProduct {
  id: string;
  slug: string;
  nama: string;
  kategori: string;
  tagline: string;
  deskripsi: string;
  hargaPerHari: string;
  cutout: string;
  galeri: string[];
  spesifikasi: { nilai: string; satuan: string; label: string }[];
  alt: string;
}

const products = rawSpotlightData as SpotlightProduct[];

export const Spotlight: React.FC = () => {
  const reducedMotion = useReducedMotion();
  const isMobile = useMediaQuery('(max-width: 1023px)');
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const sectionRef = useRef<HTMLElement | null>(null);
  const centerContentRef = useRef<HTMLDivElement | null>(null);

  const activeProduct = products[activeIndex] || products[0];

  // Navigasi manual prev / next
  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : products.length - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev < products.length - 1 ? prev + 1 : 0));
  };

  // Keyboard navigation panah kiri/kanan saat fokus
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement?.closest('#section-spotlight')) {
        if (e.key === 'ArrowLeft') handlePrev();
        if (e.key === 'ArrowRight') handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Animasi Transisi Halus Saat Produk Berganti
  useEffect(() => {
    if (reducedMotion || !centerContentRef.current) return;

    gsap.fromTo(
      centerContentRef.current,
      { opacity: 0.6, scale: 0.98 },
      { opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out' }
    );
  }, [activeIndex, reducedMotion]);

  // ScrollTrigger Pin & Snap
  useEffect(() => {
    if (reducedMotion || isMobile || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: `+=${products.length * 100}%`,
        pin: true,
        scrub: 0.6,
        snap: {
          snapTo: 1 / (products.length - 1),
          duration: 0.6,
          ease: 'power1.inOut',
        },
        anticipatePin: 1,
        onUpdate: (self) => {
          const prog = self.progress;
          // Petakan progress 0..1 ke indeks 0..3
          const targetIdx = Math.min(
            products.length - 1,
            Math.round(prog * (products.length - 1))
          );
          setActiveIndex(targetIdx);
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion, isMobile]);

  // Mode Reduced Motion: Tampilan 4 Produk Statis Berurutan Tanpa Pinning
  if (reducedMotion) {
    return (
      <section
        id="section-spotlight"
        className="w-full bg-hitam text-putih px-6 py-24 select-none space-y-32"
        aria-label="Spotlight Produk Unggulan (Mode Aksesibilitas Statis)"
      >
        <div className="max-w-container mx-auto text-center space-y-3">
          <span className="font-hud text-xs tracking-widest text-cyan uppercase">
            SPOTLIGHT PRODUK UNGGULAN
          </span>
          <h2 className="headline-tight text-4xl sm:text-6xl text-putih">
            alat ekspedisi pilihan
          </h2>
        </div>

        {products.map((p) => (
          <div
            key={p.id}
            className="max-w-container mx-auto grid grid-cols-1 lg:grid-cols-3 border border-white/20 bg-api overflow-hidden"
          >
            <SpotlightInfo
              slug={p.slug}
              nama={p.nama}
              tagline={p.tagline}
              deskripsi={p.deskripsi}
              spesifikasi={p.spesifikasi}
              hargaPerHari={p.hargaPerHari}
              className="lg:col-span-1"
            />
            <div className="lg:col-span-1 min-h-[420px] flex items-center justify-center p-8 bg-api-tua">
              <SpotlightCenter nama={p.nama} cutout={p.cutout} alt={p.alt} />
            </div>
            <SpotlightGallery
              galeri={p.galeri}
              nama={p.nama}
              className="lg:col-span-1"
            />
          </div>
        ))}
      </section>
    );
  }

  return (
    <section
      id="section-spotlight"
      ref={sectionRef}
      className="relative w-full h-screen bg-api text-putih overflow-hidden select-none focus:outline-none"
      tabIndex={0}
      aria-label="Section Spotlight Produk Pilihan Rental"
    >
      {/* HUD Header Bar: Penanda Indeks '01 / 04' & Tombol Prev/Next */}
      <div className="absolute top-20 left-6 sm:left-12 right-6 sm:right-12 z-40 flex items-center justify-between pointer-events-none">
        {/* Penanda Nomor Index Produk */}
        <div className="pointer-events-auto flex items-center gap-3">
          <div className="px-3.5 py-1.5 border border-white/70 bg-hitam/30 backdrop-blur-sm rounded-pill flex items-center gap-2">
            <Layers className="w-3.5 h-3.5 text-cyan" />
            <span className="font-hud font-bold text-xs tracking-widest text-putih">
              0{activeIndex + 1} / 0{products.length}
            </span>
          </div>
          <span className="hidden sm:inline-block font-hud text-[11px] text-white/80 uppercase tracking-wider">
            {activeProduct.kategori}
          </span>
        </div>

        {/* Tombol Navigasi Prev & Next (Keyboard / Sentuh) */}
        <div className="pointer-events-auto flex items-center gap-1.5">
          <button
            type="button"
            onClick={handlePrev}
            className="p-2.5 bg-hitam/60 hover:bg-putih hover:text-hitam border border-white/40 text-putih transition-colors duration-fast focus-visible:outline-2 focus-visible:outline-cyan"
            aria-label="Produk Sebelumnya"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="p-2.5 bg-hitam/60 hover:bg-putih hover:text-hitam border border-white/40 text-putih transition-colors duration-fast focus-visible:outline-2 focus-visible:outline-cyan"
            aria-label="Produk Selanjutnya"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Grid Split Layout Sesuai Gambar 2 (Desktop: Kiri 30%, Tengah 42%, Kanan 28%) */}
      <div className="relative w-full h-full grid grid-cols-1 lg:grid-cols-12 pt-16 lg:pt-0">
        {/* Kolom Kiri: Panel Oranye (--api) dengan Info & Spesifikasi */}
        <div className="lg:col-span-4 h-full flex flex-col justify-center">
          <SpotlightInfo
            slug={activeProduct.slug}
            nama={activeProduct.nama}
            tagline={activeProduct.tagline}
            deskripsi={activeProduct.deskripsi}
            spesifikasi={activeProduct.spesifikasi}
            hargaPerHari={activeProduct.hargaPerHari}
            className="h-full pt-20 lg:pt-28"
          />
        </div>

        {/* Kolom Tengah: Cutout Besar + Headline Raksasa Dua Warna */}
        <div
          ref={centerContentRef}
          className="lg:col-span-5 h-full relative flex items-center justify-center bg-api"
        >
          <SpotlightCenter
            nama={activeProduct.nama}
            cutout={activeProduct.cutout}
            alt={activeProduct.alt}
          />
        </div>

        {/* Kolom Kanan: Kolom Putih dengan Galeri Foto Vertikal */}
        <div className="hidden lg:flex lg:col-span-3 h-full">
          <SpotlightGallery
            galeri={activeProduct.galeri}
            nama={activeProduct.nama}
            className="w-full h-full pt-24"
          />
        </div>
      </div>
    </section>
  );
};
