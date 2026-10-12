import React from 'react';
import { SkipToContent } from '@/components/layout/SkipToContent';
import { Header } from '@/components/layout/Header';
import { HeroStage } from '@/components/stage/HeroStage';
import { Spotlight } from '@/components/spotlight/Spotlight';
import { CatalogMarquee } from '@/components/catalog/CatalogMarquee';
import { HowToRent } from '@/components/sections/HowToRent';
import { WhyUs } from '@/components/sections/WhyUs';
import { Faq } from '@/components/sections/Faq';
import { ClosingCta } from '@/components/sections/ClosingCta';
import { Footer } from '@/components/layout/Footer';

export const Landing: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-hitam text-putih selection:bg-cyan selection:text-hitam">
      {/* Aksesibilitas: Tautan pintas ke konten utama */}
      <SkipToContent />

      {/* 4.0 Navigasi Header */}
      <Header />

      {/* Konten Utama Landmark */}
      <main id="main-content" tabIndex={-1} className="outline-none">
        {/* 4.1 & 4.2 Panggung Ter-Pin: Hero + Outfit Showcase 3D */}
        <HeroStage />

        {/* 4.3 Section 3: Spotlight Produk (Gambar 2) */}
        <Spotlight />

        {/* 4.4 Section 4: Cuplikan Katalog (Marquee 4 Kolom) */}
        <CatalogMarquee />

        {/* 4.5 Section 5a: Cara Sewa (4 Baris Bernomor) */}
        <HowToRent />

        {/* 4.5 Section 5b: Kenapa Kami (Editorial) */}
        <WhyUs />

        {/* 4.5 Section 5c: FAQ Accordion */}
        <Faq />

        {/* 4.5 Section 5d: CTA Penutup */}
        <ClosingCta />
      </main>

      {/* 4.6 Section Footer Lengkap */}
      <Footer />
    </div>
  );
};
