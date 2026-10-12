import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { Hiker } from './Hiker';
import { STAGE_CONFIG } from '../../data/stage.config';

interface StageSceneProps {
  /** Jarak kamera dari target (meter) */
  cameraDistance: number;
  /** Ketinggian titik pandang target (meter) */
  targetY: number;
  /** Rotasi Yaw karakter (radian) */
  yaw: number;
  /** Tampilkan sumbu 3D & titik jangkar (mode debug) */
  debugMode?: boolean;
  /** Daftar titik jangkar anotasi */
  annotations?: import('../../data/stage.config').AnchorAnnotation[];
  /** Callback untuk memproyeksikan koordinat jangkar 3D ke layar (opsional) */
  onProjectAnchors?: (projectedPoints: { id: string; screenX: number; screenY: number; visible: boolean }[]) => void;
}

export const StageScene: React.FC<StageSceneProps> = ({
  cameraDistance,
  targetY,
  yaw,
  debugMode = false,
  annotations = STAGE_CONFIG.annotations,
  onProjectAnchors,
}) => {
  const { camera, size } = useThree();
  const targetVec = useRef(new THREE.Vector3(0, targetY, 0));
  const tempVec = useRef(new THREE.Vector3());

  useFrame(() => {
    // Update target Y secara dinamis
    targetVec.current.set(0, targetY, 0);

    // Posisikan kamera langsung di sumbu Z menghadap karakter di origin
    // Karakter berputar (Yaw), sementara kamera menjaga framing
    camera.position.set(0, targetY, cameraDistance);
    camera.lookAt(targetVec.current);
    camera.updateProjectionMatrix();

    // Proyeksikan titik-titik jangkar ke koordinat layar 2D
    if (onProjectAnchors) {
      const projected = annotations.map((item) => {
        // Koordinat model dalam posisi berputar sesuai Yaw
        const [ax, ay, az] = item.anchor;
        const cosY = Math.cos(yaw);
        const sinY = Math.sin(yaw);

        // Rotasi koordinat titik mengelilingi sumbu Y
        const worldX = ax * cosY + az * sinY;
        const worldY = ay;
        const worldZ = -ax * sinY + az * cosY;

        tempVec.current.set(worldX, worldY, worldZ);
        tempVec.current.project(camera);

        // Konversi koordinat normalized device (-1 to 1) ke persen layar (0 to 100%)
        const screenX = ((tempVec.current.x + 1) * size.width) / 2;
        const screenY = ((-tempVec.current.y + 1) * size.height) / 2;

        // Normalisasi yaw ke derajat 0 - 360
        const yawDeg = (((yaw * 180) / Math.PI) % 360 + 360) % 360;
        const [minY, maxY] = item.visibleYawRange;
        const inAngle =
          minY <= maxY
            ? yawDeg >= minY && yawDeg <= maxY
            : yawDeg >= minY || yawDeg <= maxY;

        return {
          id: item.id,
          screenX,
          screenY,
          visible: inAngle && tempVec.current.z < 1,
        };
      });

      onProjectAnchors(projected);
    }
  });

  const { lighting } = STAGE_CONFIG;

  return (
    <>
      {/* Tata Cahaya Outdoor High-Contrast */}
      {/* 1. Ambient Light Rendah */}
      <ambientLight color={lighting.ambient.color} intensity={lighting.ambient.intensity} />

      {/* 2. Key Light Putih dari Kiri-Depan 45° */}
      <directionalLight
        position={lighting.key.position}
        color={lighting.key.color}
        intensity={lighting.key.intensity}
      />

      {/* 3. Rim Light Oranye Hangat dari Belakang-Kanan */}
      <directionalLight
        position={lighting.rim.position}
        color={lighting.rim.color}
        intensity={lighting.rim.intensity}
      />

      {/* 4. Soft Fill Light dari Kanan Depan */}
      <directionalLight
        position={lighting.fill.position}
        color={lighting.fill.color}
        intensity={lighting.fill.intensity}
      />

      {/* Karakter Pendaki 3D */}
      <Hiker yaw={yaw} showAxes={debugMode} />

      {/* Visualisasi Titik Jangkar (Mode Debug) */}
      {debugMode && (
        <group rotation={[0, yaw, 0]}>
          {annotations.map((item) => (
            <mesh key={item.id} position={item.anchor}>
              <sphereGeometry args={[0.035, 12, 12]} />
              <meshBasicMaterial color="#FF4513" wireframe />
            </mesh>
          ))}
        </group>
      )}
    </>
  );
};
