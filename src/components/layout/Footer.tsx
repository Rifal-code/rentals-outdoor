import React from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from '@/data/site';
import { MessageSquare, Mail, MapPin, Clock, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="kontak"
      className="w-full bg-hitam text-putih pt-20 pb-12 border-t border-white/10 select-none"
      aria-label="Footer Navigasi dan Kontak"
    >
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-12 space-y-16">
        {/* Baris 4 Kolom Tidak Seragam di Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Kolom 1 (lg:col-span-4): Brand & Deskripsi */}
          <div className="lg:col-span-4 space-y-4">
            <Link
              to="/"
              className="inline-block font-sans font-extrabold text-3xl tracking-tighter lowercase focus-visible:outline-2 focus-visible:outline-cyan"
            >
              {siteConfig.brandName}
              <span className="text-cyan">.</span>
            </Link>
            <p className="text-xs sm:text-sm text-abu leading-relaxed max-w-sm font-normal">
              Layanan rental alat outdoor premium siap pakai. Carrier, tenda ekspedisi, jaket hardshell, dan perlengkapan gunung terinspeksi ketat untuk setiap puncak dan jalur pendakian.
            </p>
          </div>

          {/* Kolom 2 (lg:col-span-2): Navigasi Cepat */}
          <div className="lg:col-span-2 space-y-3">
            <span className="font-hud text-xs text-cyan uppercase tracking-widest block font-bold">
              NAVIGASI
            </span>
            <ul className="space-y-2 text-xs font-hud tracking-wider">
              <li>
                <Link to="/" className="text-white/80 hover:text-api transition-colors">
                  BERANDA
                </Link>
              </li>
              <li>
                <Link to="/katalog" className="text-white/80 hover:text-api transition-colors">
                  KATALOG LENGKAP
                </Link>
              </li>
              <li>
                <a href="#cara-sewa" className="text-white/80 hover:text-api transition-colors">
                  CARA SEWA
                </a>
              </li>
              <li>
                <a href="#kenapa-kami" className="text-white/80 hover:text-api transition-colors">
                  KENAPA KAMI
                </a>
              </li>
              <li>
                <a href="#faq" className="text-white/80 hover:text-api transition-colors">
                  FAQ // BANTUAN
                </a>
              </li>
            </ul>
          </div>

          {/* Kolom 3 (lg:col-span-3): Kontak & Gudang */}
          <div className="lg:col-span-3 space-y-3">
            <span className="font-hud text-xs text-cyan uppercase tracking-widest block font-bold">
              OPERASIONAL & KONTAK
            </span>
            <ul className="space-y-2.5 text-xs text-white/80 font-normal">
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-api flex-shrink-0 mt-0.5" />
                <span>{siteConfig.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-api flex-shrink-0" />
                <span>{siteConfig.operationalHours}</span>
              </li>
              <li className="flex items-center gap-2">
                <MessageSquare className="w-3.5 h-3.5 text-api flex-shrink-0" />
                <span>WhatsApp: {siteConfig.phoneWhatsapp}</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-api flex-shrink-0" />
                <span>{siteConfig.email}</span>
              </li>
            </ul>
          </div>

          {/* Kolom 4 (lg:col-span-3): Sosial Media & Legal */}
          <div className="lg:col-span-3 space-y-3">
            <span className="font-hud text-xs text-cyan uppercase tracking-widest block font-bold">
              MEDIA SOSIAL & LEGAL
            </span>
            <ul className="space-y-2 text-xs font-hud tracking-wider">
              <li>
                <a
                  href={`https://instagram.com/${siteConfig.socials.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-api transition-colors inline-flex items-center gap-1"
                >
                  <span>INSTAGRAM: {siteConfig.socials.instagram}</span>
                  <ArrowUpRight className="w-3 h-3 text-abu" />
                </a>
              </li>
              <li>
                <a
                  href={`https://tiktok.com/@${siteConfig.socials.tiktok}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-api transition-colors inline-flex items-center gap-1"
                >
                  <span>TIKTOK: {siteConfig.socials.tiktok}</span>
                  <ArrowUpRight className="w-3 h-3 text-abu" />
                </a>
              </li>
              <li className="pt-2 text-[11px] text-abu font-sans">
                <a href="#syarat-ketentuan" className="hover:text-white underline">
                  Syarat & Ketentuan Sewa [ISI NANTI]
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Wordmark Raksasa Penutup Halaman Sesuai PRD 4.6 */}
        <div className="pt-12 border-t border-white/10 overflow-hidden">
          <div className="font-sans font-extrabold text-[14vw] tracking-tighter text-white/[0.08] lowercase leading-none select-none text-center">
            {siteConfig.brandName}
            <span className="text-cyan">.</span>
          </div>
        </div>

        {/* Baris Bawah Hak Cipta */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-hud text-abu tracking-wider">
          <p>© {currentYear} {siteConfig.brandName}. SELURUH HAK CIPTA DILINDUNGI.</p>
          <p className="text-[10px] text-white/40">
            DIBANGUN DENGAN VITE · REACT · GSAP · LENIS · TAILWIND
          </p>
        </div>
      </div>
    </footer>
  );
};
