import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { AnchorAnnotation } from '../../data/stage.config';

export interface ProjectedAnchorData {
  id: string;
  screenX: number; // pixel dari kiri viewport
  screenY: number; // pixel dari atas viewport
  visible: boolean;
}

interface StageAnnotationsProps {
  annotations: AnchorAnnotation[];
  projectedData: Record<string, ProjectedAnchorData>;
  /** Hanya tampil saat fase orbit (progress > 0.20) */
  opacity: number;
}

export const StageAnnotations: React.FC<StageAnnotationsProps> = ({
  annotations,
  projectedData,
  opacity,
}) => {
  if (opacity <= 0.05) return null;

  // Filter hanya anotasi yang saat ini terlihat (berdasarkan sudut Yaw & di depan kamera)
  const visibleItems = annotations.filter(
    (item) => projectedData[item.id]?.visible
  );

  // Batasi maksimal 2-3 label aktif sekaligus agar tidak menumpuk
  const activeItems = visibleItems.slice(0, 3);

  return (
    <div
      className="absolute inset-0 pointer-events-none z-30 overflow-hidden"
      style={{ opacity }}
    >
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {activeItems.map((item) => {
          const proj = projectedData[item.id];
          if (!proj) return null;

          const isLeft = item.defaultSide === 'left';
          const lineLength = isLeft ? -90 : 90;
          const labelTargetX = proj.screenX + lineLength;
          const labelTargetY = proj.screenY - 24;

          return (
            <g key={`line-${item.id}`}>
              {/* Titik jangkar 3D di tubuh model */}
              <circle
                cx={proj.screenX}
                cy={proj.screenY}
                r="4"
                fill="#00F0FF"
                stroke="#FFFFFF"
                strokeWidth="1.5"
              />
              <circle
                cx={proj.screenX}
                cy={proj.screenY}
                r="7"
                fill="none"
                stroke="#00F0FF"
                strokeWidth="1"
                opacity="0.6"
              />

              {/* Garis penunjuk diagonal ke label HTML */}
              <polyline
                points={`
                  ${proj.screenX},${proj.screenY}
                  ${proj.screenX + (isLeft ? -30 : 30)},${labelTargetY}
                  ${labelTargetX},${labelTargetY}
                `}
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="1.2"
                strokeDasharray="3 2"
                opacity="0.85"
              />
            </g>
          );
        })}
      </svg>

      {/* Label HTML (Pill interaktif dengan kontras tinggi) */}
      {activeItems.map((item) => {
        const proj = projectedData[item.id];
        if (!proj) return null;

        const isLeft = item.defaultSide === 'left';
        const labelX = proj.screenX + (isLeft ? -100 : 100);
        const labelY = proj.screenY - 36;

        return (
          <div
            key={`label-${item.id}`}
            className="absolute pointer-events-auto transition-transform duration-100 ease-out"
            style={{
              left: `${labelX}px`,
              top: `${labelY}px`,
              transform: isLeft ? 'translateX(-100%)' : 'translateX(0)',
            }}
          >
            <Link
              to={item.href}
              className="group block p-2.5 bg-hitam/90 border border-white/60 hover:border-cyan rounded shadow-2xl transition-all duration-200 select-none max-w-[190px]"
              aria-label={`Lihat detail ${item.nama} di katalog`}
            >
              <div className="flex items-center justify-between gap-2 pb-1 border-b border-white/20">
                <span className="font-hud text-[9px] font-bold text-cyan uppercase tracking-wider">
                  {item.kategori}
                </span>
                <ArrowUpRight className="w-3 h-3 text-white/70 group-hover:text-cyan transition-colors" />
              </div>
              <h4 className="font-sans font-bold text-xs text-putih lowercase mt-1 group-hover:text-cyan transition-colors leading-tight">
                {item.nama}
              </h4>
              <p className="font-hud text-[10px] text-white/80 mt-1">
                RP {item.hargaPerHari}/HARI
              </p>
            </Link>
          </div>
        );
      })}
    </div>
  );
};
