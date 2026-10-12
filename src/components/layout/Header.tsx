import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MessageSquare, Menu, X, ArrowUpRight } from 'lucide-react';
import { siteConfig } from '@/data/site';

interface HeaderProps {
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({ className = '' }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: 'beranda', href: '/' },
    { label: 'katalog', href: '/katalog' },
    { label: 'cara sewa', href: '#cara-sewa' },
    { label: 'faq', href: '#faq' },
    { label: 'kontak', href: '#kontak' },
  ];

  // Tutup menu saat route berganti atau tombol Escape ditekan
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  // Kunci scroll saat mobile menu terbuka
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-base ${className}`}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-4 flex items-center justify-between">
        {/* Brand Wordmark (kiri) */}
        <Link
          to="/"
          className="flex items-center gap-1.5 focus-visible:outline-2 focus-visible:outline-cyan"
          aria-label="Beranda"
        >
          <span className="font-sans font-extrabold text-xl sm:text-2xl tracking-tighter text-putih lowercase">
            {siteConfig.brandName}
            <span className="text-cyan">.</span>
          </span>
        </Link>

        {/* Kotak Navigasi Desktop (kanan atas mengikuti Gambar 1) */}
        <nav
          className="hidden md:flex items-center gap-0 border border-putih/40 bg-putih/5 backdrop-blur-sm"
          aria-label="Navigasi Utama"
        >
          {navLinks.map((item) => {
            const isActive =
              item.href === '/'
                ? location.pathname === '/'
                : location.pathname.startsWith(item.href);

            return (
              <a
                key={item.label}
                href={item.href}
                className={`px-4 py-2 text-xs font-hud tracking-widest uppercase transition-colors duration-fast border-r last:border-r-0 border-putih/30 ${
                  isActive
                    ? 'bg-hitam text-putih font-bold'
                    : 'bg-putih text-hitam hover:bg-hitam hover:text-putih'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* WhatsApp & Mobile Menu Trigger */}
        <div className="flex items-center gap-3">
          <a
            href={`https://wa.me/${siteConfig.phoneWhatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 bg-putih text-hitam hover:bg-api-tua hover:text-putih font-hud text-xs tracking-wider uppercase transition-colors duration-fast"
            aria-label="Hubungi WhatsApp"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>whatsapp</span>
          </a>

          {/* Tombol Hamburger Menu Mobile */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2.5 bg-putih text-hitam hover:bg-hitam hover:text-putih transition-colors"
            aria-expanded={isMobileMenuOpen}
            aria-label={isMobileMenuOpen ? 'Tutup Menu' : 'Buka Menu'}
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Full-Screen Menu Overlay (Panel Hitam pekat) */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-hitam text-putih z-50 flex flex-col justify-between p-6 md:hidden animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex justify-between items-center pb-6 border-b border-white/20">
            <span className="font-extrabold text-xl tracking-tighter lowercase">
              {siteConfig.brandName}
              <span className="text-cyan">.</span>
            </span>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 bg-putih text-hitam font-hud text-xs"
              aria-label="Tutup Menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <nav className="flex flex-col gap-4 py-8">
            {navLinks.map((item, idx) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-4xl font-extrabold lowercase tracking-tight hover:text-api transition-colors flex items-center justify-between border-b border-white/10 pb-3"
              >
                <span>
                  <span className="text-abu font-hud text-sm mr-4 tracking-widest font-normal">
                    0{idx + 1}
                  </span>
                  {item.label}
                </span>
                <ArrowUpRight className="w-6 h-6 text-abu" />
              </a>
            ))}
          </nav>

          <div className="space-y-4 pt-6 border-t border-white/20">
            <a
              href={`https://wa.me/${siteConfig.phoneWhatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 bg-api text-hitam font-hud text-sm font-bold tracking-wider flex items-center justify-center gap-2 uppercase"
            >
              <MessageSquare className="w-4 h-4" />
              HUBUNGI WHATSAPP
            </a>
            <p className="text-xs text-abu text-center">
              Tekan <kbd className="px-1.5 py-0.5 border border-abu/40 text-[10px]">ESC</kbd> untuk menutup
            </p>
          </div>
        </div>
      )}
    </header>
  );
};
