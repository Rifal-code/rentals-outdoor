import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Compass, ShieldCheck } from 'lucide-react';
import { StageCanvas } from './StageCanvas';
import { StageAnnotations, ProjectedAnchorData } from './StageAnnotations';
import { DebugPanel } from './DebugPanel';
import { HikerStaticFallback } from './HikerStaticFallback';
import { WeatherPanel } from '../hero/WeatherPanel';
import { RainCanvas } from '../hero/RainCanvas';
import { StatPill } from '../hero/StatPill';
import { MiniCard } from '../hero/MiniCard';
import { siteConfig } from '@/data/site';
import { RainOptions } from '@/lib/rain';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { STAGE_CONFIG, AnchorAnnotation, calculateCameraStage } from '@/data/stage.config';

export const HeroStage: React.FC = () => {
  const reducedMotion = useReducedMotion();
  const isMobile = useMediaQuery('(max-width: 767px)');

  const stageWrapperRef = useRef<HTMLDivElement | null>(null);
  const arcsRef = useRef<HTMLDivElement | null>(null);

  // Deteksi rasio aspek layar secara dinamis untuk kalkulasi kamera optik
  const [aspectRatio, setAspectRatio] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth / (window.innerHeight || 1);
    }
    return 16 / 9;
  });

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== 'undefined') {
        const ar = window.innerWidth / (window.innerHeight || 1);
        setAspectRatio(ar);
      }
    };
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  const dynamicCamConfig = useMemo(() => {
    return calculateCameraStage(aspectRatio);
  }, [aspectRatio]);

  // Parameter State Animasi Kamera & Model 3D
  const [cameraDistance, setCameraDistance] = useState<number>(() => {
    const initAr = typeof window !== 'undefined' ? window.innerWidth / (window.innerHeight || 1) : 16 / 9;
    return calculateCameraStage(initAr).hero.distance;
  });
  const [targetY, setTargetY] = useState<number>(() => {
    const initAr = typeof window !== 'undefined' ? window.innerWidth / (window.innerHeight || 1) : 16 / 9;
    return calculateCameraStage(initAr).hero.targetY;
  });
  const [yaw, setYaw] = useState<number>(
    STAGE_CONFIG.camera.initial.yawDeg * (Math.PI / 180)
  );
  const [yawDegDisplay, setYawDegDisplay] = useState<number>(
    STAGE_CONFIG.camera.initial.yawDeg
  );
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const scrollProgressRef = useRef<number>(0);

  // Opasitas HUD & Headline
  const [heroOpacity, setHeroOpacity] = useState<number>(1);
  const [showcaseOpacity, setShowcaseOpacity] = useState<number>(0);

  // Anotasi 3D & Titik Jangkar
  const [annotations, setAnnotations] = useState<AnchorAnnotation[]>(
    STAGE_CONFIG.annotations
  );
  const [projectedAnchors, setProjectedAnchors] = useState<
    Record<string, ProjectedAnchorData>
  >({});

  // Mode Debug (?debug=1 di URL)
  const [isDebugMode, setIsDebugMode] = useState<boolean>(false);
  const [showAxes, setShowAxes] = useState<boolean>(false);
  const [isDebugOpen, setIsDebugOpen] = useState<boolean>(false);

  // Simulasi Hujan Uji Cuaca
  const [rainOptions, setRainOptions] = useState<RainOptions>({
    intensity: 35,
    speed: 80,
    size: 24,
  });
  const [isRainPaused, setIsRainPaused] = useState<boolean>(false);

  // Parallax / Entrance Refs
  const hudLeftRef = useRef<HTMLDivElement | null>(null);
  const hudRightRef = useRef<HTMLDivElement | null>(null);
  const brandBlockRef = useRef<HTMLDivElement | null>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement | null>(null);

  // Kalkulasi Parameter Transformasi Berdasarkan Progres (0 -> 1)
  const applyProgress = useCallback((prog: number) => {
    scrollProgressRef.current = prog;
    const { scroll: scrollCfg } = STAGE_CONFIG;
    const transEnd = scrollCfg.transitionEndProgress; // 0.20
    const camCfg = dynamicCamConfig;

    if (prog <= transEnd) {
      // FASE 1: 0% -> 20% (Transisi Mundur, Turun, & Yaw 0° -> 45°)
      const t = prog / transEnd;

      const dist =
        camCfg.hero.distance +
        (camCfg.showcase.distance - camCfg.hero.distance) * t;
      const tY =
        camCfg.hero.targetY +
        (camCfg.showcase.targetY - camCfg.hero.targetY) * t;

      const currentYawDeg =
        camCfg.hero.yawDeg +
        (camCfg.showcase.startYawDeg - camCfg.hero.yawDeg) * t;

      setCameraDistance(dist);
      setTargetY(tY);
      setYaw(currentYawDeg * (Math.PI / 180));
      setYawDegDisplay(Math.round(currentYawDeg));

      const hOp = Math.max(0, 1 - t * 1.25);
      setHeroOpacity(hOp);
      setShowcaseOpacity(Math.max(0, (t - 0.5) * 2));
    } else {
      // FASE 2: 20% -> 100% (Orbit 360° Penuh: 45° -> 405°)
      const t = (prog - transEnd) / (1 - transEnd);

      setCameraDistance(camCfg.showcase.distance);
      setTargetY(camCfg.showcase.targetY);

      const currentYawDeg =
        camCfg.showcase.startYawDeg +
        (camCfg.showcase.endYawDeg - camCfg.showcase.startYawDeg) * t;

      setYaw(currentYawDeg * (Math.PI / 180));
      setYawDegDisplay(Math.round(currentYawDeg % 360));

      setHeroOpacity(0);
      setShowcaseOpacity(1);
    }
  }, [dynamicCamConfig]);

  // Deteksi mode debug dari query string
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const isDebug = params.get('debug') === '1';
      setIsDebugMode(isDebug);
      if (isDebug) {
        setShowAxes(true);
        (window as any).__setStageProgress = (prog: number) => {
          setScrollProgress(prog);
          applyProgress(prog);
        };
      }
    }
  }, [applyProgress]);

  // Callback proyeksi titik jangkar dari Three.js ke layar
  const handleProjectAnchors = useCallback(
    (
      projectedList: {
        id: string;
        screenX: number;
        screenY: number;
        visible: boolean;
      }[]
    ) => {
      const map: Record<string, ProjectedAnchorData> = {};
      for (const p of projectedList) {
        map[p.id] = p;
      }
      setProjectedAnchors(map);
    },
    []
  );

  // Update koordinat jangkar dari Debug Panel
  const handleUpdateAnchor = (id: string, newCoords: [number, number, number]) => {
    const modelH = STAGE_CONFIG.model.height || 1.8;
    const newFraction: [number, number, number] = [
      Math.round((newCoords[0] / modelH) * 1000) / 1000,
      Math.round((newCoords[1] / modelH) * 1000) / 1000,
      Math.round((newCoords[2] / modelH) * 1000) / 1000,
    ];
    setAnnotations((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, anchor: newCoords, anchorFraction: newFraction } : item
      )
    );
  };

  // Hitung ulang kamera saat rasio aspek berubah (resize / rotasi layar)
  useEffect(() => {
    applyProgress(scrollProgressRef.current);
  }, [dynamicCamConfig, applyProgress]);

  // Durasi Pinning: 700vh di Desktop, 500vh di Mobile
  const pinDistance = isMobile
    ? `+=${STAGE_CONFIG.scroll.mobileDurationVh}%`
    : `+=${STAGE_CONFIG.scroll.desktopDurationVh}%`;

  useEffect(() => {
    if (reducedMotion || !stageWrapperRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Intro Animation saat pertama kali load
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      gsap.set('.hero-line-inner', { yPercent: 120, opacity: 0 });
      gsap.set([hudLeftRef.current, hudRightRef.current, brandBlockRef.current], {
        opacity: 0,
        y: 20,
      });

      tl.to(
        '.hero-line-inner',
        { yPercent: 0, opacity: 1, duration: 0.8, stagger: 0.12 },
        0.2
      ).to(
        [hudLeftRef.current, hudRightRef.current, brandBlockRef.current],
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 },
        0.6
      );

      // 2. ScrollTrigger Pinning & Scrub Tunggal
      ScrollTrigger.create({
        trigger: stageWrapperRef.current,
        start: 'top top',
        end: pinDistance,
        pin: true,
        scrub: true, // Satu lapis smoothing yang menyatu dengan Lenis
        anticipatePin: 1,
        onUpdate: (self) => {
          const prog = self.progress;
          setScrollProgress(prog);
          applyProgress(prog);

          // Efek putaran halus pada ornamen busur latar belakang
          if (arcsRef.current) {
            gsap.set(arcsRef.current, {
              rotation: prog * 35,
            });
          }
        },
      });
    }, stageWrapperRef);

    return () => ctx.revert();
  }, [reducedMotion, isMobile, pinDistance, applyProgress]);

  // Dukungan Mode Reduced Motion (Aksesibilitas Tanpa Pinning)
  if (reducedMotion) {
    return <HikerStaticFallback />;
  }

  return (
    <div
      ref={stageWrapperRef}
      className="relative w-full h-screen h-[100svh] bg-api text-putih overflow-hidden select-none"
      style={{ height: '100svh' }}
      aria-label="Panggung Interaktif Pendaki 3D — Hero & Showcase"
    >
      {/* 1. Latar Belakang Busur Konsentris */}
      <div
        ref={arcsRef}
        className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden z-0"
        aria-hidden="true"
      >
        <img
          src="/assets/ornaments/arcs.svg"
          alt=""
          className="w-[150vw] max-w-[1800px] h-auto object-contain opacity-60"
        />
      </div>

      {/* 2. Kanvas Simulasi Hujan Diagonal */}
      <RainCanvas
        options={rainOptions}
        isPaused={isRainPaused}
        reducedMotion={reducedMotion}
      />

      {/* 3. Teks Headline Belakang (Layer Belakang Model) */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 px-4 transition-opacity duration-75"
        style={{ opacity: heroOpacity }}
        aria-hidden="true"
      >
        <div className="text-center font-sans headline-tight text-putih text-[13vw] lg:text-[11vw] tracking-tighter select-none leading-[0.82]">
          <div className="overflow-hidden">
            <div className="hero-line-inner">
              naik du<span className="text-cyan">lu</span>
            </div>
          </div>
          <div className="overflow-hidden">
            <div className="hero-line-inner">belinya</div>
          </div>
          <div className="overflow-hidden">
            <div className="hero-line-inner">
              nan<span className="text-cyan">ti</span>
            </div>
          </div>
        </div>
      </div>

      {/* Headline Showcase (Muncul saat Fase Orbit 20% -> 100%) */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 px-6 transition-opacity duration-150"
        style={{ opacity: showcaseOpacity }}
        aria-hidden="true"
      >
        <div className="text-center font-sans headline-tight text-white/80 text-[11vw] lg:text-[9.5vw] tracking-tighter select-none leading-[0.84]">
          <div>satu orang.</div>
          <div>lengkap dari</div>
          <div>
            kepala ke ka<span className="text-cyan">ki</span>.
          </div>
        </div>
      </div>

      {/* 4. Single 3D Canvas Transparan (Karakter Pendaki 3D) */}
      <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
        <StageCanvas
          cameraDistance={cameraDistance}
          targetY={targetY}
          yaw={yaw}
          debugMode={isDebugMode && showAxes}
          annotations={annotations}
          onProjectAnchors={handleProjectAnchors}
          className="w-full h-full"
        />
      </div>

      {/* 5. Teks Headline Depan Berlapis (Depth Masking) */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-25 px-4 transition-opacity duration-75"
        style={{
          opacity: heroOpacity,
          WebkitMaskImage:
            'radial-gradient(ellipse 35% 55% at 50% 50%, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 45%, rgba(0,0,0,1) 75%)',
          maskImage:
            'radial-gradient(ellipse 35% 55% at 50% 50%, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 45%, rgba(0,0,0,1) 75%)',
        }}
      >
        <h1 className="text-center font-sans headline-tight text-putih text-[13vw] lg:text-[11vw] tracking-tighter select-none leading-[0.82]">
          <div>
            naik du<span className="text-cyan">lu</span>
          </div>
          <div>belinya</div>
          <div>
            nan<span className="text-cyan">ti</span>
          </div>
        </h1>
      </div>

      {/* 6. Konten HUD Hero Baris Atas (Panel Cuaca & Stat Pill) */}
      <div
        className="relative z-30 pt-20 px-4 sm:px-6 lg:px-12 flex items-start justify-between transition-opacity duration-75"
        style={{
          opacity: heroOpacity,
          pointerEvents: heroOpacity > 0.1 ? 'auto' : 'none',
        }}
      >
        <div ref={hudLeftRef}>
          <WeatherPanel
            options={rainOptions}
            onChangeOptions={(opts) =>
              setRainOptions((prev) => ({ ...prev, ...opts }))
            }
            isPaused={isRainPaused}
            onTogglePause={() => setIsRainPaused((prev) => !prev)}
          />
        </div>

        <div ref={hudRightRef} className="pt-2">
          <StatPill intensity={rainOptions.intensity} />
        </div>
      </div>

      {/* 7. Konten HUD Hero Baris Bawah (Brand Block & MiniCard) */}
      <div
        className="relative z-30 pb-6 px-4 sm:px-6 lg:px-12 flex items-end justify-between transition-opacity duration-75 mt-auto"
        style={{
          opacity: heroOpacity,
          pointerEvents: heroOpacity > 0.1 ? 'auto' : 'none',
        }}
      >
        <div
          ref={brandBlockRef}
          className="max-w-[280px] sm:max-w-sm text-left space-y-2 select-text"
        >
          <div className="font-sans font-extrabold text-lg sm:text-xl lowercase tracking-tight">
            {siteConfig.brandName}
            <span className="text-cyan">.</span>
          </div>
          <h2 className="font-sans font-extrabold text-sm sm:text-base leading-tight uppercase text-putih tracking-tight">
            {siteConfig.tagline}
          </h2>
          <p className="text-[11px] sm:text-xs text-white/90 leading-relaxed font-medium">
            Dari puncak tertinggi hingga jalur sabana basah. Semua alat rental kami diinspeksi ketat, bebas rembes, dan siap menemani petualanganmu.
          </p>
        </div>

        <div
          ref={scrollIndicatorRef}
          className="hidden md:flex flex-col items-center gap-2 mb-2 pointer-events-none"
        >
          <span className="font-hud text-[10px] uppercase tracking-widest text-white/70">
            GULIR
          </span>
          <div className="w-[1px] h-8 bg-white/40 overflow-hidden relative">
            <span className="absolute top-0 left-0 w-full h-1/2 bg-white animate-pulse" />
          </div>
        </div>

        <div className="hidden sm:flex justify-end">
          <MiniCard />
        </div>
      </div>

      {/* 8. HUD Showcase 360° (Muncul saat Fase Orbit 20% -> 100%) */}
      <div
        className="absolute top-24 left-6 sm:left-12 z-40 flex items-center gap-3 transition-opacity duration-150"
        style={{
          opacity: showcaseOpacity,
          pointerEvents: showcaseOpacity > 0.1 ? 'auto' : 'none',
        }}
      >
        <div className="px-3.5 py-1.5 border border-white/60 bg-hitam/30 backdrop-blur-sm rounded-pill flex items-center gap-2">
          <Compass className="w-3.5 h-3.5 text-cyan animate-spin" style={{ animationDuration: '8s' }} />
          <span className="font-hud font-bold text-xs tracking-widest text-putih">
            ROTASI {String(yawDegDisplay).padStart(3, '0')}° / 360°
          </span>
        </div>
      </div>

      <div
        className="absolute top-24 right-6 sm:right-12 z-40 flex items-center gap-3 transition-opacity duration-150"
        style={{
          opacity: showcaseOpacity,
          pointerEvents: showcaseOpacity > 0.1 ? 'auto' : 'none',
        }}
      >
        <div className="hidden sm:flex items-center gap-2 font-hud text-[10px] text-white/80 tracking-widest">
          <ShieldCheck className="w-3.5 h-3.5 text-cyan" />
          <span>INSPEKSI LENGKAP 360°</span>
        </div>
        <div className="w-20 h-1.5 bg-white/20 overflow-hidden rounded-full">
          <div
            className="h-full bg-cyan transition-all duration-75"
            style={{ width: `${Math.round(scrollProgress * 100)}%` }}
          />
        </div>
      </div>

      {/* 9. Layer Anotasi Interaktif (Proyeksi 3D ke 2D Layar) */}
      <StageAnnotations
        annotations={annotations}
        projectedData={projectedAnchors}
        opacity={showcaseOpacity}
      />

      {/* 10. Panel Debug Interaktif (?debug=1) */}
      {isDebugMode && (
        <DebugPanel
          progress={scrollProgress}
          onProgressChange={(newProg) => {
            setScrollProgress(newProg);
            applyProgress(newProg);
          }}
          showAxes={showAxes}
          onToggleAxes={setShowAxes}
          annotations={annotations}
          onUpdateAnchor={handleUpdateAnchor}
          isOpen={isDebugOpen}
          onToggleOpen={() => setIsDebugOpen((prev) => !prev)}
        />
      )}
    </div>
  );
};
