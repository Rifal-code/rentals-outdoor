import React, { useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';
import { STAGE_CONFIG } from '../../data/stage.config';

interface HikerProps {
  yaw?: number; // dalam radian
  showAxes?: boolean;
}

/**
 * Karakter Prosedural Pendaki Gunung Stylized
 * Dibangun menggunakan geometri Three.js dengan proporsi realistis (tinggi ~1.8m).
 * Siluet kerudung besar, kacamata gunung metalik, carrier, dan trekking pole.
 */
function ProceduralHiker() {
  // Material Palette - Hitam matte outdoor technical apparel
  const materials = useMemo(() => {
    return {
      jacket: new THREE.MeshStandardMaterial({
        color: '#18181a',
        roughness: 0.85,
        metalness: 0.08,
      }),
      hood: new THREE.MeshStandardMaterial({
        color: '#141416',
        roughness: 0.88,
        metalness: 0.05,
      }),
      pants: new THREE.MeshStandardMaterial({
        color: '#121214',
        roughness: 0.9,
        metalness: 0.04,
      }),
      boots: new THREE.MeshStandardMaterial({
        color: '#1a1816',
        roughness: 0.8,
        metalness: 0.15,
      }),
      sole: new THREE.MeshStandardMaterial({
        color: '#262420',
        roughness: 0.95,
        metalness: 0.05,
      }),
      carrier: new THREE.MeshStandardMaterial({
        color: '#16161c',
        roughness: 0.78,
        metalness: 0.12,
      }),
      straps: new THREE.MeshStandardMaterial({
        color: '#222226',
        roughness: 0.7,
        metalness: 0.2,
      }),
      goggleFrame: new THREE.MeshStandardMaterial({
        color: '#0e0e10',
        roughness: 0.5,
        metalness: 0.3,
      }),
      goggleLens: new THREE.MeshStandardMaterial({
        color: '#ffb244', // Amber/gold reflective glacier eyewear
        roughness: 0.05,
        metalness: 0.98,
        emissive: new THREE.Color('#3a1e05'),
      }),
      faceVoid: new THREE.MeshBasicMaterial({
        color: '#050505', // Anonim, interior kerudung gelap
      }),
      buff: new THREE.MeshStandardMaterial({
        color: '#1f1e20',
        roughness: 0.92,
        metalness: 0.02,
      }),
      poleShaft: new THREE.MeshStandardMaterial({
        color: '#2a2a2a',
        roughness: 0.35,
        metalness: 0.8,
      }),
      poleGrip: new THREE.MeshStandardMaterial({
        color: '#1c1b18',
        roughness: 0.95,
        metalness: 0.05,
      }),
      orangeAccent: new THREE.MeshStandardMaterial({
        color: '#FF4513',
        roughness: 0.5,
        metalness: 0.1,
      }),
    };
  }, []);

  return (
    <group position={[0, 0, 0]}>
      {/* ============================================================== */}
      {/* 1. KEPALA, KERUDUNG (HOOD), KACAMATA & BUFF                    */}
      {/* ============================================================== */}
      <group position={[0, 1.55, 0]}>
        {/* Interior Gelap Kerudung (Sosok Anonim) */}
        <mesh position={[0, 0.02, 0.04]} material={materials.faceVoid}>
          <sphereGeometry args={[0.13, 16, 16]} />
        </mesh>

        {/* Buff / Leher */}
        <mesh position={[0, -0.08, 0.06]} material={materials.buff}>
          <cylinderGeometry args={[0.11, 0.12, 0.12, 16]} />
        </mesh>

        {/* Kerudung Hardshell Luar (Bervolume Besar) */}
        <mesh position={[0, 0.04, -0.03]} material={materials.hood}>
          <sphereGeometry args={[0.185, 24, 24, 0, Math.PI * 2, 0, Math.PI * 0.85]} />
        </mesh>
        {/* Lid / Peak Kerudung Depan */}
        <mesh position={[0, 0.13, 0.12]} rotation={[-0.25, 0, 0]} material={materials.hood}>
          <boxGeometry args={[0.22, 0.03, 0.14]} />
        </mesh>
        {/* Sisi Samping Kerudung */}
        <mesh position={[-0.14, 0.02, 0.02]} rotation={[0, 0.2, 0]} material={materials.hood}>
          <boxGeometry args={[0.06, 0.18, 0.16]} />
        </mesh>
        <mesh position={[0.14, 0.02, 0.02]} rotation={[0, -0.2, 0]} material={materials.hood}>
          <boxGeometry args={[0.06, 0.18, 0.16]} />
        </mesh>

        {/* Kacamata Gunung (Glacier Eyewear) */}
        <group position={[0, 0.04, 0.15]} rotation={[-0.05, 0, 0]}>
          {/* Frame Kacamata */}
          <mesh material={materials.goggleFrame}>
            <boxGeometry args={[0.19, 0.065, 0.03]} />
          </mesh>
          {/* Lensa Mengilap (Mirror Gold/Amber) */}
          <mesh position={[0, 0, 0.015]} material={materials.goggleLens}>
            <boxGeometry args={[0.175, 0.055, 0.01]} />
          </mesh>
          {/* Strap Kacamata melingkar ke belakang kepala */}
          <mesh position={[-0.105, 0, -0.06]} rotation={[0, -0.4, 0]} material={materials.straps}>
            <boxGeometry args={[0.02, 0.03, 0.14]} />
          </mesh>
          <mesh position={[0.105, 0, -0.06]} rotation={[0, 0.4, 0]} material={materials.straps}>
            <boxGeometry args={[0.02, 0.03, 0.14]} />
          </mesh>
        </group>
      </group>

      {/* ============================================================== */}
      {/* 2. BADAN & JAKET HARDSHELL 3L (TORSO)                          */}
      {/* ============================================================== */}
      <group position={[0, 1.22, 0]}>
        {/* Kerah Badai Tinggi (Storm Collar) */}
        <mesh position={[0, 0.22, 0.02]} material={materials.jacket}>
          <cylinderGeometry args={[0.14, 0.17, 0.12, 16]} />
        </mesh>

        {/* Torso Atas / Dada */}
        <mesh position={[0, 0.08, 0.01]} material={materials.jacket}>
          <boxGeometry args={[0.42, 0.28, 0.26]} />
        </mesh>

        {/* Torso Bawah / Pinggang */}
        <mesh position={[0, -0.16, 0]} material={materials.jacket}>
          <boxGeometry args={[0.39, 0.24, 0.25]} />
        </mesh>

        {/* Hem / Ekor Jaket Menutupi Pinggul */}
        <mesh position={[0, -0.32, 0]} material={materials.jacket}>
          <boxGeometry args={[0.41, 0.12, 0.26]} />
        </mesh>

        {/* Ritsleting Depan & Storm Flap */}
        <mesh position={[0, -0.05, 0.135]} material={materials.straps}>
          <boxGeometry args={[0.025, 0.52, 0.015]} />
        </mesh>
        {/* Aksen Tarikan Ritsleting Oranye */}
        <mesh position={[0.02, 0.15, 0.145]} material={materials.orangeAccent}>
          <boxGeometry args={[0.01, 0.035, 0.01]} />
        </mesh>
        {/* Saku Dada Miring Kiri */}
        <mesh position={[-0.12, 0.1, 0.135]} rotation={[0, 0, 0.2]} material={materials.straps}>
          <boxGeometry args={[0.1, 0.015, 0.01]} />
        </mesh>

        {/* Tali Dada Carrier (Chest Harness Strap) */}
        <mesh position={[0, 0.12, 0.133]} material={materials.straps}>
          <boxGeometry args={[0.26, 0.025, 0.01]} />
        </mesh>
        <mesh position={[0, 0.12, 0.14]} material={materials.goggleFrame}>
          <boxGeometry args={[0.035, 0.035, 0.01]} />
        </mesh>
      </group>

      {/* ============================================================== */}
      {/* 3. CARRIER / BACKPACK (TAS GUNUNG 50+10L)                       */}
      {/* ============================================================== */}
      <group position={[0, 1.25, -0.22]}>
        {/* Badan Utama Carrier */}
        <mesh material={materials.carrier}>
          <boxGeometry args={[0.38, 0.58, 0.25]} />
        </mesh>

        {/* Top Lid / Tutup Atas Tas */}
        <mesh position={[0, 0.33, 0.01]} rotation={[-0.1, 0, 0]} material={materials.carrier}>
          <boxGeometry args={[0.39, 0.14, 0.27]} />
        </mesh>

        {/* Kantong Depan / Shovel Pocket */}
        <mesh position={[0, -0.04, -0.14]} material={materials.carrier}>
          <boxGeometry args={[0.3, 0.36, 0.06]} />
        </mesh>

        {/* Kantong Samping Kiri & Kanan */}
        <mesh position={[-0.2, -0.05, -0.02]} material={materials.carrier}>
          <boxGeometry args={[0.06, 0.32, 0.18]} />
        </mesh>
        <mesh position={[0.2, -0.05, -0.02]} material={materials.carrier}>
          <boxGeometry args={[0.06, 0.32, 0.18]} />
        </mesh>

        {/* Matras Gulung / Sleeping Pad di Bawah Carrier */}
        <mesh position={[0, -0.34, -0.02]} rotation={[0, 0, Math.PI / 2]} material={materials.jacket}>
          <cylinderGeometry args={[0.075, 0.075, 0.44, 16]} />
        </mesh>
        {/* Tali Pengikat Matras */}
        <mesh position={[-0.12, -0.34, -0.02]} rotation={[0, 0, Math.PI / 2]} material={materials.orangeAccent}>
          <cylinderGeometry args={[0.078, 0.078, 0.02, 16]} />
        </mesh>
        <mesh position={[0.12, -0.34, -0.02]} rotation={[0, 0, Math.PI / 2]} material={materials.orangeAccent}>
          <cylinderGeometry args={[0.078, 0.078, 0.02, 16]} />
        </mesh>

        {/* Tali Kompresi Carrier di Belakang */}
        <mesh position={[0, 0.08, -0.17]} material={materials.straps}>
          <boxGeometry args={[0.26, 0.018, 0.01]} />
        </mesh>
        <mesh position={[0, -0.16, -0.17]} material={materials.straps}>
          <boxGeometry args={[0.26, 0.018, 0.01]} />
        </mesh>
      </group>

      {/* ============================================================== */}
      {/* 4. LENGAN KIRI & TREKKING POLE (TANGAN KIRI)                    */}
      {/* ============================================================== */}
      <group position={[-0.25, 1.25, 0]}>
        {/* Bahu Kiri */}
        <mesh position={[-0.04, 0.06, 0]} material={materials.jacket}>
          <sphereGeometry args={[0.1, 16, 16]} />
        </mesh>
        {/* Lengan Atas Kiri */}
        <mesh position={[-0.07, -0.1, 0.04]} rotation={[0.4, 0, 0.2]} material={materials.jacket}>
          <cylinderGeometry args={[0.08, 0.075, 0.26, 16]} />
        </mesh>
        {/* Lengan Bawah Kiri (Ditekuk ke Depan Memegang Pole) */}
        <mesh position={[-0.12, -0.24, 0.16]} rotation={[1.1, 0.2, -0.1]} material={materials.jacket}>
          <cylinderGeometry args={[0.07, 0.065, 0.26, 16]} />
        </mesh>
        {/* Sarung Tangan Kiri */}
        <mesh position={[-0.14, -0.28, 0.26]} material={materials.boots}>
          <boxGeometry args={[0.08, 0.08, 0.1]} />
        </mesh>

        {/* Trekking Pole Carbon */}
        <group position={[-0.16, -0.3, 0.28]}>
          {/* Gagang / Grip */}
          <mesh position={[0, 0.05, 0]} material={materials.poleGrip}>
            <cylinderGeometry args={[0.02, 0.018, 0.16, 12]} />
          </mesh>
          {/* Batang Karbon Pole (Shaft) */}
          <mesh position={[0, -0.48, 0]} material={materials.poleShaft}>
            <cylinderGeometry args={[0.01, 0.008, 0.95, 12]} />
          </mesh>
          {/* Cincin Kuncian Oranye */}
          <mesh position={[0, -0.2, 0]} material={materials.orangeAccent}>
            <cylinderGeometry args={[0.014, 0.014, 0.025, 12]} />
          </mesh>
          {/* Basket Salju/Lumpur di Bawah */}
          <mesh position={[0, -0.88, 0]} material={materials.poleGrip}>
            <cylinderGeometry args={[0.045, 0.045, 0.01, 12]} />
          </mesh>
          {/* Ujung Karbida (Carbide Tip) di Tanah */}
          <mesh position={[0, -0.94, 0]} material={materials.poleShaft}>
            <coneGeometry args={[0.006, 0.04, 12]} />
          </mesh>
        </group>
      </group>

      {/* ============================================================== */}
      {/* 5. LENGAN KANAN (Rileks di Samping)                             */}
      {/* ============================================================== */}
      <group position={[0.25, 1.25, 0]}>
        {/* Bahu Kanan */}
        <mesh position={[0.04, 0.06, 0]} material={materials.jacket}>
          <sphereGeometry args={[0.1, 16, 16]} />
        </mesh>
        {/* Lengan Atas Kanan */}
        <mesh position={[0.07, -0.1, 0.01]} rotation={[-0.05, 0, -0.15]} material={materials.jacket}>
          <cylinderGeometry args={[0.08, 0.075, 0.26, 16]} />
        </mesh>
        {/* Lengan Bawah Kanan */}
        <mesh position={[0.1, -0.32, 0.04]} rotation={[0.2, 0, -0.1]} material={materials.jacket}>
          <cylinderGeometry args={[0.07, 0.065, 0.26, 16]} />
        </mesh>
        {/* Sarung Tangan Kanan */}
        <mesh position={[0.12, -0.48, 0.08]} material={materials.boots}>
          <boxGeometry args={[0.075, 0.1, 0.08]} />
        </mesh>
      </group>

      {/* ============================================================== */}
      {/* 6. KAKI & CELANA KARGO HIKING (LEGS)                            */}
      {/* ============================================================== */}
      {/* Kaki Kiri */}
      <group position={[-0.12, 0.54, 0]}>
        {/* Paha Kiri */}
        <mesh position={[0, 0.18, 0.01]} rotation={[0.05, 0, 0.04]} material={materials.pants}>
          <cylinderGeometry args={[0.11, 0.095, 0.36, 16]} />
        </mesh>
        {/* Saku Kargo Paha Kiri */}
        <mesh position={[-0.1, 0.16, 0.02]} rotation={[0, 0, 0.04]} material={materials.pants}>
          <boxGeometry args={[0.035, 0.14, 0.12]} />
        </mesh>
        {/* Lutut Kiri */}
        <mesh position={[0, -0.03, 0.02]} material={materials.pants}>
          <sphereGeometry args={[0.09, 14, 14]} />
        </mesh>
        {/* Betis Kiri */}
        <mesh position={[0, -0.22, 0]} rotation={[-0.03, 0, 0.02]} material={materials.pants}>
          <cylinderGeometry args={[0.09, 0.085, 0.32, 16]} />
        </mesh>
      </group>

      {/* Kaki Kanan */}
      <group position={[0.12, 0.54, 0]}>
        {/* Paha Kanan */}
        <mesh position={[0, 0.18, 0.01]} rotation={[0.05, 0, -0.04]} material={materials.pants}>
          <cylinderGeometry args={[0.11, 0.095, 0.36, 16]} />
        </mesh>
        {/* Saku Kargo Paha Kanan */}
        <mesh position={[0.1, 0.16, 0.02]} rotation={[0, 0, -0.04]} material={materials.pants}>
          <boxGeometry args={[0.035, 0.14, 0.12]} />
        </mesh>
        {/* Lutut Kanan */}
        <mesh position={[0, -0.03, 0.02]} material={materials.pants}>
          <sphereGeometry args={[0.09, 14, 14]} />
        </mesh>
        {/* Betis Kanan */}
        <mesh position={[0, -0.22, 0]} rotation={[-0.03, 0, -0.02]} material={materials.pants}>
          <cylinderGeometry args={[0.09, 0.085, 0.32, 16]} />
        </mesh>
      </group>

      {/* ============================================================== */}
      {/* 7. SEPATU GUNUNG (HIKING BOOTS)                                */}
      {/* ============================================================== */}
      {/* Sepatu Kiri */}
      <group position={[-0.13, 0.1, 0.03]}>
        {/* Pergelangan Sepatu */}
        <mesh position={[0, 0.06, -0.02]} material={materials.boots}>
          <boxGeometry args={[0.12, 0.12, 0.16]} />
        </mesh>
        {/* Bagian Depan Sepatu */}
        <mesh position={[0, -0.02, 0.05]} material={materials.boots}>
          <boxGeometry args={[0.12, 0.08, 0.18]} />
        </mesh>
        {/* Sol Vibram Tebal Bergerigi */}
        <mesh position={[0, -0.075, 0.03]} material={materials.sole}>
          <boxGeometry args={[0.13, 0.05, 0.28]} />
        </mesh>
        {/* Tali Sepatu Aksen Oranye */}
        <mesh position={[0, 0.03, 0.07]} rotation={[0.4, 0, 0]} material={materials.orangeAccent}>
          <boxGeometry args={[0.06, 0.015, 0.08]} />
        </mesh>
      </group>

      {/* Sepatu Kanan */}
      <group position={[0.13, 0.1, 0.03]}>
        {/* Pergelangan Sepatu */}
        <mesh position={[0, 0.06, -0.02]} material={materials.boots}>
          <boxGeometry args={[0.12, 0.12, 0.16]} />
        </mesh>
        {/* Bagian Depan Sepatu */}
        <mesh position={[0, -0.02, 0.05]} material={materials.boots}>
          <boxGeometry args={[0.12, 0.08, 0.18]} />
        </mesh>
        {/* Sol Vibram Tebal Bergerigi */}
        <mesh position={[0, -0.075, 0.03]} material={materials.sole}>
          <boxGeometry args={[0.13, 0.05, 0.28]} />
        </mesh>
        {/* Tali Sepatu Aksen Oranye */}
        <mesh position={[0, 0.03, 0.07]} rotation={[0.4, 0, 0]} material={materials.orangeAccent}>
          <boxGeometry args={[0.06, 0.015, 0.08]} />
        </mesh>
      </group>
    </group>
  );
}

/**
 * Komponen GLTF Loader dengan Normalisasi Otomatis (Box3)
 * 1. Skala seragam sehingga tinggi model = STAGE_CONFIG.model.height (1.8m)
 * 2. Posisi telapak kaki (min.y) tepat di y = 0
 * 3. Pusat bounding box X dan Z di 0 (agar orbit 360° stabil tanpa goyang)
 * 4. Kompensasi rotasi yaw awal sesuai STAGE_CONFIG.model.modelYawOffset
 */
function GlbHikerModel({ url }: { url: string }) {
  const { scene } = useGLTF(url);

  const { scale, offset, box, size } = useMemo(() => {
    const b = new THREE.Box3().setFromObject(scene);
    const sz = new THREE.Vector3();
    b.getSize(sz);
    const ctr = new THREE.Vector3();
    b.getCenter(ctr);

    const targetHeight = STAGE_CONFIG.model.height || 1.8;
    const s = sz.y > 0 ? targetHeight / sz.y : 1;

    const ox = -ctr.x * s + (STAGE_CONFIG.model.modelOffset[0] || 0);
    const oy = -b.min.y * s + (STAGE_CONFIG.model.modelOffset[1] || 0);
    const oz = -ctr.z * s + (STAGE_CONFIG.model.modelOffset[2] || 0);

    return {
      scale: s,
      offset: [ox, oy, oz] as [number, number, number],
      box: b,
      size: sz,
    };
  }, [scene]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isDebug = window.location.search.includes('debug=1');
      if (isDebug) {
        console.group('[3D MODEL NORMALIZATION DIAGNOSTIC]');
        console.log('Raw Bounding Box Min:', box.min.toArray());
        console.log('Raw Bounding Box Max:', box.max.toArray());
        console.log('Raw Dimensions (w, h, d):', size.toArray());
        console.log('Scale factor applied:', scale);
        console.log('Normalized Height:', size.y * scale);
        console.log('Offset applied (feet to y=0, center to xz=0):', offset);
        console.log('Model Yaw Offset Deg:', STAGE_CONFIG.model.modelYawOffset);
        console.groupEnd();
      }
    }
  }, [box, size, scale, offset]);

  const yawOffsetRad = (STAGE_CONFIG.model.modelYawOffset * Math.PI) / 180;

  return (
    <group rotation={[0, yawOffsetRad, 0]}>
      <group position={offset} scale={scale}>
        <primitive object={scene} />
      </group>
    </group>
  );
}

useGLTF.preload(STAGE_CONFIG.model.glbPath);

/**
 * ErrorBoundary untuk menangkap kegagalan loading GLB
 * (MIME type salah di Vercel, network error, dsb.)
 * Suspense hanya menangkap promise (loading), bukan error.
 */
class GlbErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.warn('[Hiker] GLB loading failed, using procedural fallback:', error.message);
  }

  render() {
    if (this.state.hasError) {
      return <ProceduralHiker />;
    }
    return this.props.children;
  }
}

/**
 * Komponen Utama Karakter Hiker
 * Memuat hiker.glb secara langsung dengan normalisasi Box3,
 * menampilkan ProceduralHiker sebagai fallback saat loading atau error.
 */
export const Hiker: React.FC<HikerProps> = ({ yaw = 0, showAxes = false }) => {
  return (
    <group rotation={[0, yaw, 0]}>
      <GlbErrorBoundary>
        <React.Suspense fallback={<ProceduralHiker />}>
          <GlbHikerModel url={STAGE_CONFIG.model.glbPath} />
        </React.Suspense>
      </GlbErrorBoundary>

      {showAxes && <axesHelper args={[2]} />}
    </group>
  );
};
