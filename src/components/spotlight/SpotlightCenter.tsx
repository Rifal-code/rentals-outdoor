import React from 'react';

interface SpotlightCenterProps {
  nama: string;
  cutout: string;
  alt: string;
  className?: string;
}

export const SpotlightCenter: React.FC<SpotlightCenterProps> = ({
  nama,
  cutout,
  alt,
  className = '',
}) => {
  // Pecah nama produk menjadi 2 baris (misal 'shadow' dan 'falcon 750')
  const words = nama.trim().split(' ');
  const line1 = words[0] || '';
  const line2 = words.slice(1).join(' ') || '';

  return (
    <div
      className={`relative w-full h-full flex items-center justify-center overflow-hidden select-none ${className}`}
    >
      {/* 1. Headline Nama Produk di Belakang Cutout (z-10) */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 px-4"
        aria-hidden="true"
      >
        <div className="text-center font-sans headline-tight text-[15vw] lg:text-[11vw] tracking-tighter leading-[0.82] select-none">
          <div className="text-cyan drop-shadow-md">{line1}</div>
          <div className="text-putih drop-shadow-md">{line2}</div>
        </div>
      </div>

      {/* 2. Cutout Produk / Pendaki Besar di Tengah (z-20) */}
      <div className="relative w-full max-w-[560px] lg:max-w-[680px] h-[75%] sm:h-[85%] flex items-end justify-center z-20 pointer-events-none">
        {/* Gambar Cutout */}
        <img
          src={cutout}
          alt={alt}
          className="w-full h-full object-contain object-bottom contrast-125 brightness-95 drop-shadow-[0_25px_60px_rgba(0,0,0,0.6)] transition-all duration-500"
          onError={(e) => {
            // Jika cutout webp belum ada, fallback ke SVG subjek hero
            (e.currentTarget as HTMLImageElement).src = '/assets/hero/hero-subject.svg';
          }}
        />

        {/* 3. Bracket Sudut Kamera di Titik Fokus (Corner Accents 24px) */}
        <div
          className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-44 sm:w-56 sm:h-56 pointer-events-none"
          aria-hidden="true"
        >
          <span className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-white" />
          <span className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-white" />
          <span className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-white" />
          <span className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-white" />
        </div>
      </div>

      {/* 4. Headline Nama Produk Layer Depan (z-30) */}
      {/* Menimpa tepi cutout dengan efek masking parsial */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-30 px-4"
        style={{
          WebkitMaskImage:
            'radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0.4) 0%, rgba(0,0,0,1) 65%)',
          maskImage:
            'radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0.4) 0%, rgba(0,0,0,1) 65%)',
        }}
      >
        <div className="text-center font-sans headline-tight text-[15vw] lg:text-[11vw] tracking-tighter leading-[0.82] select-none">
          <div className="text-cyan">{line1}</div>
          <div className="text-putih">{line2}</div>
        </div>
      </div>
    </div>
  );
};
