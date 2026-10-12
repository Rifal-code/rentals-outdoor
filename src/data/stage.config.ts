export interface CameraStageConfig {
  fov: number;
  near: number;
  far: number;
  initial: {
    distance: number;
    targetY: number;
    yawDeg: number;
  };
  showcase: {
    distance: number;
    targetY: number;
    startYawDeg: number;
    endYawDeg: number;
  };
}

export interface LightingStageConfig {
  ambient: {
    color: string;
    intensity: number;
  };
  key: {
    color: string;
    intensity: number;
    position: [number, number, number];
  };
  rim: {
    color: string;
    intensity: number;
    position: [number, number, number];
  };
  fill: {
    color: string;
    intensity: number;
    position: [number, number, number];
  };
}

export interface AnchorAnnotation {
  id: string;
  nama: string;
  kategori: string;
  hargaPerHari: string;
  href: string;
  /** Koordinat [fx, fy, fz] dalam fraksi tinggi model (y = fy * modelHeight) */
  anchorFraction: [number, number, number];
  /** Koordinat world [x, y, z] di model space (meter, origin di antara kedua telapak kaki) */
  anchor: [number, number, number];
  /** Sudut tampak Yaw (0° - 360°) di mana item terlihat jelas */
  visibleYawRange: [number, number];
  defaultSide: 'left' | 'right';
}

export interface ModelStageConfig {
  /** Tinggi target model dalam meter */
  height: number;
  /** Path ke file GLB */
  glbPath: string;
  /** Rotasi Yaw kompensasi hadap awal (derajat, 0° = menghadap kamera) */
  modelYawOffset: number;
  /** Offset tambahan translasi [x, y, z] */
  modelOffset: [number, number, number];
}

export interface StageConfig {
  camera: CameraStageConfig;
  lighting: LightingStageConfig;
  scroll: {
    desktopDurationVh: number;
    mobileDurationVh: number;
    scrub: number;
    transitionEndProgress: number; // 0.2 (20% scroll)
  };
  model: ModelStageConfig;
  annotations: AnchorAnnotation[];
}

const DEFAULT_MODEL_HEIGHT = 1.8;

export const STAGE_CONFIG: StageConfig = {
  camera: {
    fov: 30,
    near: 0.1,
    far: 100,
    initial: {
      distance: 1.49,
      targetY: 1.50,
      yawDeg: 0,
    },
    showcase: {
      distance: 4.10,
      targetY: 0.94,
      startYawDeg: 45,
      endYawDeg: 405, // 45° + 360° orbit penuh
    },
  },
  lighting: {
    ambient: {
      color: '#2a201b',
      intensity: 0.55,
    },
    key: {
      color: '#ffffff',
      intensity: 3.2,
      position: [-2.5, 3.2, 3.2], // 45° kiri-depan atas
    },
    rim: {
      color: '#ff9944',
      intensity: 4.8,
      position: [2.8, 2.5, -2.2], // Rim light dari belakang-kanan
    },
    fill: {
      color: '#ffe5cc',
      intensity: 0.6,
      position: [2.0, 1.2, 1.8],
    },
  },
  scroll: {
    desktopDurationVh: 700,
    mobileDurationVh: 500,
    scrub: 0.6,
    transitionEndProgress: 0.2,
  },
  model: {
    height: DEFAULT_MODEL_HEIGHT,
    glbPath: '/assets/model/hiker.glb',
    modelYawOffset: 0, // Model asli sudah menghadap +Z (lurus ke kamera pada yaw 0°)
    modelOffset: [0, 0, 0],
  },
  annotations: [
    {
      id: 'item-goggles',
      nama: 'Kacamata Gunung',
      kategori: 'kacamata',
      hargaPerHari: '[ISI NANTI]',
      href: '/katalog?kategori=kacamata',
      anchorFraction: [0.0, 0.906, 0.067],
      anchor: [0.0, 1.63, 0.12],
      visibleYawRange: [315, 45], // Depan
      defaultSide: 'right',
    },
    {
      id: 'item-jacket',
      nama: 'Jaket Hardshell 3L',
      kategori: 'jaket',
      hargaPerHari: '[ISI NANTI]',
      href: '/katalog?kategori=jaket',
      anchorFraction: [0.044, 0.711, 0.067],
      anchor: [0.08, 1.28, 0.12],
      visibleYawRange: [330, 75], // Depan ke serong kanan
      defaultSide: 'left',
    },
    {
      id: 'item-carrier',
      nama: 'Carrier 50+10L',
      kategori: 'carrier',
      hargaPerHari: '[ISI NANTI]',
      href: '/katalog?kategori=carrier',
      anchorFraction: [-0.033, 0.694, -0.144],
      anchor: [-0.06, 1.25, -0.26],
      visibleYawRange: [120, 240], // Belakang
      defaultSide: 'right',
    },
    {
      id: 'item-pole',
      nama: 'Trekking Pole Carbon',
      kategori: 'pole',
      hargaPerHari: '[ISI NANTI]',
      href: '/katalog?kategori=pole',
      anchorFraction: [-0.211, 0.633, 0.022],
      anchor: [-0.38, 1.14, 0.04],
      visibleYawRange: [225, 315], // Samping kiri
      defaultSide: 'left',
    },
    {
      id: 'item-shoes',
      nama: 'Sepatu Gunung Mid',
      kategori: 'sepatu',
      hargaPerHari: '[ISI NANTI]',
      href: '/katalog?kategori=sepatu',
      anchorFraction: [0.094, 0.044, 0.050],
      anchor: [0.17, 0.08, 0.09],
      visibleYawRange: [45, 135], // Samping kanan
      defaultSide: 'right',
    },
    {
      id: 'item-buff',
      nama: 'Buff & Beanie Merino',
      kategori: 'aksesori',
      hargaPerHari: '[ISI NANTI]',
      href: '/katalog?kategori=aksesori',
      anchorFraction: [0.0, 0.833, 0.056],
      anchor: [0.0, 1.50, 0.10],
      visibleYawRange: [255, 330], // Serong kiri depan
      defaultSide: 'left',
    },
  ],
};

/**
 * LANGKAH 3: Kalkulasi Jarak & Target Kamera Berdasarkan FOV dan Aspek Rasio Layar
 *
 * Rumus optik:
 * jarak = (areaTinggi / 2) / tan(FOV / 2)
 *
 * Framing target:
 * - Hero (progres 0):
 *   Puncak kerudung ~12-14% viewport top, kacamata ~34-35%, pinggang terpotong di tepi bawah.
 *   Lebar model di desktop ~40-45% lebar viewport. Di portrait <= 90%.
 * - Showcase (progres 0.2-1.0):
 *   Puncak kerudung ~10-12% top, telapak sepatu ~6-8% bottom (tinggi total ~82% viewport).
 *   Model tidak terpotong di sudut orbit mana pun (0°-360°).
 */
export function calculateCameraStage(
  aspectRatio: number,
  fov = STAGE_CONFIG.camera.fov,
  modelHeight = STAGE_CONFIG.model.height
) {
  const tanHalfFov = Math.tan(((fov * Math.PI) / 180) / 2);

  // 1. Showcase (Orbit 360°)
  // Vertikal: model height = 82% dari viewport height
  const showcaseVisibleHeightV = modelHeight / 0.82; // ~2.195m
  // Horizontal (Mobile portrait): lebar bounding box model saat orbit (~0.85m) <= 88% viewport width
  const maxModelOrbitWidth = 0.85;
  const showcaseVisibleHeightH = maxModelOrbitWidth / (0.88 * Math.max(0.1, aspectRatio));
  const showcaseVisibleHeight = Math.max(showcaseVisibleHeightV, showcaseVisibleHeightH);

  const showcaseDistance = showcaseVisibleHeight / (2 * tanHalfFov);
  // Agar puncak kerudung (y = modelHeight) berada di ~11% dari atas:
  // (0.5 - (modelHeight - targetY) / visibleHeight) = 0.11 => targetY = modelHeight - 0.39 * visibleHeight
  const showcaseTargetY = modelHeight - 0.39 * showcaseVisibleHeight;

  // 2. Hero (Progres 0, hadap lurus ke depan)
  // Vertikal: area fokus atas 0.80m (dari kepala 1.80m ke pinggang 1.00m)
  const heroVisibleHeightV = 0.80;
  // Horizontal: lebar bahu/lengan (~0.60m) <= 85% viewport width di mobile
  const heroModelWidth = 0.60;
  const heroVisibleHeightH = heroModelWidth / (0.85 * Math.max(0.1, aspectRatio));
  const heroVisibleHeight = Math.max(heroVisibleHeightV, heroVisibleHeightH);

  const heroDistance = heroVisibleHeight / (2 * tanHalfFov);
  // Agar puncak kerudung (y = modelHeight) berada di ~12.5% dari atas:
  // (0.5 - (modelHeight - targetY) / visibleHeight) = 0.125 => targetY = modelHeight - 0.375 * visibleHeight
  const heroTargetY = modelHeight - 0.375 * heroVisibleHeight;

  return {
    hero: {
      distance: heroDistance,
      targetY: heroTargetY,
      yawDeg: STAGE_CONFIG.camera.initial.yawDeg,
    },
    showcase: {
      distance: showcaseDistance,
      targetY: showcaseTargetY,
      startYawDeg: STAGE_CONFIG.camera.showcase.startYawDeg,
      endYawDeg: STAGE_CONFIG.camera.showcase.endYawDeg,
    },
  };
}
