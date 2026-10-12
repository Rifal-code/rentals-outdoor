import React, { useState } from 'react';
import { Pause, Play, Sliders, X } from 'lucide-react';
import { RainOptions } from '@/lib/rain';

interface WeatherPanelProps {
  options: RainOptions;
  onChangeOptions: (newOptions: Partial<RainOptions>) => void;
  isPaused: boolean;
  onTogglePause: () => void;
  className?: string;
}

export const WeatherPanel: React.FC<WeatherPanelProps> = ({
  options,
  onChangeOptions,
  isPaused,
  onTogglePause,
  className = '',
}) => {
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  const sliders = [
    {
      id: 'rain-intensity',
      label: 'intensitas hujan',
      value: options.intensity,
      onChange: (val: number) => onChangeOptions({ intensity: val }),
      unit: '%',
    },
    {
      id: 'drop-speed',
      label: 'kecepatan tetes',
      value: options.speed,
      onChange: (val: number) => onChangeOptions({ speed: val }),
      unit: '%',
    },
    {
      id: 'drop-size',
      label: 'ukuran tetes',
      value: options.size,
      onChange: (val: number) => onChangeOptions({ size: val }),
      unit: '%',
    },
  ];

  return (
    <>
      {/* Tombol pemicu Drawer di Layar Mobile (<768px) */}
      <div className="md:hidden">
        <button
          type="button"
          onClick={() => setIsMobileDrawerOpen(true)}
          className="inline-flex items-center gap-2 px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/40 text-putih font-hud text-xs tracking-wider uppercase hover:bg-white/20 transition-colors"
          aria-label="Buka Pengaturan Uji Cuaca"
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>uji cuaca ({options.intensity}%)</span>
        </button>
      </div>

      {/* Panel HUD Desktop (Kiri Atas sesuai Gambar 1) */}
      <div
        className={`hidden md:block p-4 hud-panel w-64 text-putih select-none ${className}`}
      >
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/20">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-cyan animate-pulse inline-block" />
            <h3 className="font-hud text-xs tracking-widest text-putih font-bold">
              UJI KETAHANAN ALAT
            </h3>
          </div>

          <button
            type="button"
            onClick={onTogglePause}
            className={`w-6 h-6 flex items-center justify-center border transition-colors ${
              isPaused
                ? 'bg-api border-api text-white'
                : 'bg-white/10 border-white/40 text-white hover:bg-white/20'
            }`}
            aria-pressed={isPaused}
            aria-label={isPaused ? 'Lanjutkan simulasi hujan' : 'Jeda simulasi hujan'}
            title={isPaused ? 'Play rain' : 'Pause rain'}
          >
            {isPaused ? <Play className="w-2.5 h-2.5 fill-current" /> : <Pause className="w-2.5 h-2.5 fill-current" />}
          </button>
        </div>

        <div className="space-y-3">
          {sliders.map((s) => (
            <div key={s.id} className="space-y-1">
              <div className="flex justify-between items-center text-[11px] font-hud tracking-wider text-white/80">
                <span>{s.label}</span>
                <span className="font-mono text-cyan font-semibold">
                  {s.value}
                  {s.unit}
                </span>
              </div>
              <input
                id={s.id}
                type="range"
                min="0"
                max="100"
                value={s.value}
                onChange={(e) => s.onChange(Number(e.target.value))}
                className="w-full h-1 bg-white/20 appearance-none cursor-pointer accent-white focus:outline-none focus:ring-1 focus:ring-cyan"
                aria-label={s.label}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Bottom-sheet Modal Drawer */}
      {isMobileDrawerOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end md:hidden animate-in fade-in"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full bg-hitam border-t border-white/20 p-6 space-y-6 text-putih">
            <div className="flex items-center justify-between border-b border-white/15 pb-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-cyan animate-pulse inline-block" />
                <h3 className="font-hud text-sm tracking-widest font-bold">
                  SIMULASI UJI CUACA (HERO)
                </h3>
              </div>
              <button
                onClick={() => setIsMobileDrawerOpen(false)}
                className="p-2 border border-white/20 text-white"
                aria-label="Tutup Pengaturan Cuaca"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-5">
              {sliders.map((s) => (
                <div key={s.id} className="space-y-2">
                  <div className="flex justify-between items-center font-hud text-xs tracking-wider">
                    <span>{s.label}</span>
                    <span className="font-mono text-cyan font-bold text-sm">
                      {s.value}
                      {s.unit}
                    </span>
                  </div>
                  {/* Slider mobile thumb besar ≥ 44px touch target */}
                  <div className="py-2">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={s.value}
                      onChange={(e) => s.onChange(Number(e.target.value))}
                      className="w-full h-2 bg-white/20 appearance-none cursor-pointer accent-white"
                      aria-label={s.label}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 flex gap-3">
              <button
                type="button"
                onClick={onTogglePause}
                className="flex-1 py-3 border border-white/30 font-hud text-xs tracking-wider flex items-center justify-center gap-2 bg-white/10 uppercase"
                aria-pressed={isPaused}
              >
                {isPaused ? <Play className="w-3.5 h-3.5 fill-current" /> : <Pause className="w-3.5 h-3.5 fill-current" />}
                <span>{isPaused ? 'LANJUTKAN HUJAN' : 'JEDA HUJAN'}</span>
              </button>

              <button
                type="button"
                onClick={() => setIsMobileDrawerOpen(false)}
                className="px-6 py-3 bg-putih text-hitam font-hud text-xs tracking-wider font-bold uppercase"
              >
                SELESAI
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
