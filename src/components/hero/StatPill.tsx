import React from 'react';
import { Droplet } from 'lucide-react';

interface StatPillProps {
  intensity: number; // 0 - 100%
  className?: string;
}

export const StatPill: React.FC<StatPillProps> = ({ intensity, className = '' }) => {
  // Simulasi kebasahan 0 - 3%
  const wetnessPercent = Math.min(3, Math.max(0, Math.round((intensity / 100) * 3)));
  const formattedPercent = `0${wetnessPercent}%`;

  return (
    <div
      className={`relative inline-flex items-center gap-3 select-none ${className}`}
      aria-label={`Simulasi kebasahan permukaan jaket: ${formattedPercent}`}
    >
      {/* Icon tetesan air mini */}
      <Droplet className="w-3.5 h-3.5 text-cyan fill-cyan/20 animate-pulse" />

      {/* Pill Data Outline Putih (Saira 600) */}
      <div className="px-4 py-1.5 border border-white/80 rounded-pill bg-white/5 backdrop-blur-sm flex items-center justify-center">
        <span className="font-hud font-bold text-2xl md:text-3xl tracking-tight text-putih">
          {formattedPercent}
        </span>
      </div>

      {/* Label Keterangan & Garis Penunjuk SVG */}
      <div className="hidden lg:flex items-center">
        {/* Garis SVG 1px dengan diagonal penunjuk ke jaket */}
        <svg
          className="w-24 h-12 overflow-visible pointer-events-none"
          viewBox="0 0 96 48"
          fill="none"
        >
          {/* Garis penunjuk putih 1px dengan tekuk diagonal */}
          <path
            d="M 0 24 L 40 24 L 88 44"
            stroke="#FFFFFF"
            strokeWidth="1"
            strokeOpacity="0.8"
          />
          {/* Node kotak putih 6x6 px di ujung jaket */}
          <rect
            x="85"
            y="41"
            width="6"
            height="6"
            fill="#FFFFFF"
          />
        </svg>

        <div className="text-left ml-2 max-w-[140px]">
          <span className="font-hud text-[9px] uppercase tracking-wider text-white/90 block leading-tight">
            KEBASAHAN PERMUKAAN JAKET
          </span>
          <span className="font-hud text-[8px] uppercase tracking-widest text-cyan block opacity-90">
            (SIMULASI)
          </span>
        </div>
      </div>
    </div>
  );
};
