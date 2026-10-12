import React, { useState } from 'react';
import { Sliders, Copy, Check, Eye } from 'lucide-react';
import { AnchorAnnotation } from '../../data/stage.config';

interface DebugPanelProps {
  progress: number;
  onProgressChange: (prog: number) => void;
  showAxes: boolean;
  onToggleAxes: (val: boolean) => void;
  annotations: AnchorAnnotation[];
  onUpdateAnchor: (id: string, anchor: [number, number, number]) => void;
  isOpen: boolean;
  onToggleOpen: () => void;
}

export const DebugPanel: React.FC<DebugPanelProps> = ({
  progress,
  onProgressChange,
  showAxes,
  onToggleAxes,
  annotations,
  onUpdateAnchor,
  isOpen,
  onToggleOpen,
}) => {
  const [selectedId, setSelectedId] = useState<string>(annotations[0]?.id || '');
  const [copied, setCopied] = useState<boolean>(false);

  const selectedItem = annotations.find((a) => a.id === selectedId);

  const handleCoordinateChange = (axisIdx: number, val: number) => {
    if (!selectedItem) return;
    const newAnchor = [...selectedItem.anchor] as [number, number, number];
    newAnchor[axisIdx] = Math.round(val * 1000) / 1000;
    onUpdateAnchor(selectedItem.id, newAnchor);
  };

  const handleCopyConfig = () => {
    const formatted = annotations.map((a) => ({
      id: a.id,
      nama: a.nama,
      kategori: a.kategori,
      hargaPerHari: a.hargaPerHari,
      href: a.href,
      anchorFraction: [
        Math.round((a.anchor[0] / 1.8) * 1000) / 1000,
        Math.round((a.anchor[1] / 1.8) * 1000) / 1000,
        Math.round((a.anchor[2] / 1.8) * 1000) / 1000,
      ],
      anchor: a.anchor,
      visibleYawRange: a.visibleYawRange,
      defaultSide: a.defaultSide,
    }));
    const jsonStr = JSON.stringify(formatted, null, 2);
    navigator.clipboard.writeText(jsonStr).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <button
          type="button"
          onClick={onToggleOpen}
          className="flex items-center gap-2 px-3 py-2 bg-hitam/90 border border-cyan text-cyan font-mono text-xs shadow-xl hover:bg-cyan hover:text-hitam transition-colors"
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>DEBUG 3D</span>
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-80 p-4 bg-hitam/95 border border-cyan/80 text-putih font-mono text-xs shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto">
      <div className="flex items-center justify-between pb-2 border-b border-white/20">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan animate-pulse" />
          <span className="font-bold text-cyan">MODE DEBUG 3D</span>
        </div>
        <button
          type="button"
          onClick={onToggleOpen}
          className="text-white/60 hover:text-white"
        >
          ✕
        </button>
      </div>

      {/* 1. Kontrol Progres Scroll Manual */}
      <div className="space-y-1">
        <div className="flex justify-between items-center text-white/80">
          <span>Scroll Progress:</span>
          <span className="text-cyan font-bold">
            {Math.round(progress * 100)}%
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="1"
          step="0.005"
          value={progress}
          onChange={(e) => onProgressChange(parseFloat(e.target.value))}
          className="w-full h-1.5 bg-white/20 appearance-none cursor-pointer accent-cyan"
        />
      </div>

      {/* 2. Toggle Tampilan Sumbu 3D & Wireframe Jangkar */}
      <div className="flex items-center justify-between pt-1">
        <span className="text-white/80">Visualisasi Sumbu & Jangkar:</span>
        <button
          type="button"
          onClick={() => onToggleAxes(!showAxes)}
          className={`px-2.5 py-1 text-[11px] border flex items-center gap-1.5 transition-colors ${
            showAxes
              ? 'bg-cyan border-cyan text-hitam font-bold'
              : 'border-white/30 text-white/60 hover:text-white'
          }`}
        >
          <Eye className="w-3 h-3" />
          <span>{showAxes ? 'AKTIF' : 'NONAKTIF'}</span>
        </button>
      </div>

      {/* 3. Selector Jangkar Anotasi */}
      <div className="space-y-2 pt-2 border-t border-white/10">
        <span className="text-white/80 block">Pilih Titik Jangkar:</span>
        <select
          value={selectedId}
          onChange={(e) => setSelectedId(e.target.value)}
          className="w-full p-1.5 bg-white/10 border border-white/30 text-white text-xs focus:outline-none focus:border-cyan"
        >
          {annotations.map((item) => (
            <option key={item.id} value={item.id} className="bg-hitam text-white">
              {item.nama} ({item.id})
            </option>
          ))}
        </select>
      </div>

      {/* 4. Kontrol Koordinat XYZ */}
      {selectedItem && (
        <div className="space-y-2 bg-white/5 p-2.5 border border-white/10 rounded">
          <div className="text-[11px] text-cyan font-bold">
            Koordinat Model (meter):
          </div>

          {(['X', 'Y', 'Z'] as const).map((axis, idx) => (
            <div key={axis} className="flex items-center justify-between gap-2">
              <span className="w-4 text-white/70">{axis}:</span>
              <input
                type="number"
                step="0.02"
                value={selectedItem.anchor[idx]}
                onChange={(e) =>
                  handleCoordinateChange(idx, parseFloat(e.target.value) || 0)
                }
                className="w-20 p-1 bg-white/10 border border-white/30 text-center text-white text-xs font-mono"
              />
              <input
                type="range"
                min={idx === 1 ? '0' : '-1'}
                max={idx === 1 ? '2' : '1'}
                step="0.01"
                value={selectedItem.anchor[idx]}
                onChange={(e) =>
                  handleCoordinateChange(idx, parseFloat(e.target.value))
                }
                className="flex-1 h-1 bg-white/20 appearance-none accent-cyan cursor-pointer"
              />
            </div>
          ))}

          <div className="pt-1 border-t border-white/10 text-[10px] text-white/70 flex justify-between">
            <span>Fraksi Tinggi (h=1.8m):</span>
            <span className="text-cyan font-mono">
              [{(selectedItem.anchor[0] / 1.8).toFixed(3)}, {(selectedItem.anchor[1] / 1.8).toFixed(3)}, {(selectedItem.anchor[2] / 1.8).toFixed(3)}]
            </span>
          </div>
        </div>
      )}

      {/* 5. Tombol Salin Konfigurasi */}
      <div className="pt-2">
        <button
          type="button"
          onClick={handleCopyConfig}
          className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-white/10 border border-white/40 hover:border-cyan hover:bg-cyan/20 text-white text-xs font-bold transition-all"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-cyan" />
              <span className="text-cyan">TERSALIN KE CLIPBOARD!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>SALIN KE stage.config.ts</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
