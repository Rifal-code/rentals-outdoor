import React, { Suspense, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { StageScene } from './StageScene';
import { STAGE_CONFIG } from '../../data/stage.config';

interface StageCanvasProps {
  cameraDistance: number;
  targetY: number;
  yaw: number;
  debugMode?: boolean;
  annotations?: import('../../data/stage.config').AnchorAnnotation[];
  onProjectAnchors?: (projectedPoints: { id: string; screenX: number; screenY: number; visible: boolean }[]) => void;
  className?: string;
}

export const StageCanvas: React.FC<StageCanvasProps> = ({
  cameraDistance,
  targetY,
  yaw,
  debugMode = false,
  annotations,
  onProjectAnchors,
  className = '',
}) => {
  // Batasi DPR: maksimal 2.0 di desktop, maksimal 1.5 di mobile untuk menjaga performa 60fps
  const dprRange = useMemo<[number, number]>(() => {
    if (typeof window === 'undefined') return [1, 2];
    const isMobile = window.innerWidth < 768;
    const maxDpr = isMobile ? 1.5 : 2.0;
    return [1, Math.min(window.devicePixelRatio || 1, maxDpr)];
  }, []);

  return (
    <div className={`relative w-full h-full pointer-events-none ${className}`}>
      <Canvas
        camera={{
          fov: STAGE_CONFIG.camera.fov,
          near: STAGE_CONFIG.camera.near,
          far: STAGE_CONFIG.camera.far,
          position: [0, targetY, cameraDistance],
        }}
        dpr={dprRange}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance',
          preserveDrawingBuffer: false,
        }}
        style={{ pointerEvents: 'none' }}
      >
        <Suspense fallback={null}>
          <StageScene
            cameraDistance={cameraDistance}
            targetY={targetY}
            yaw={yaw}
            debugMode={debugMode}
            annotations={annotations}
            onProjectAnchors={onProjectAnchors}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};
