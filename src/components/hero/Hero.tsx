import React, { useState, useEffect, useRef } from 'react';
import { WeatherPanel } from './WeatherPanel';
import { RainCanvas } from './RainCanvas';
import { StatPill } from './StatPill';
import { MiniCard } from './MiniCard';
import { siteConfig } from '@/data/site';
import { RainOptions } from '@/lib/rain';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { StageCanvas } from '../stage/StageCanvas';
import { STAGE_CONFIG } from '@/data/stage.config';

export const Hero: React.FC = () => {
  const reducedMotion = useReducedMotion();
  const heroRef = useRef<HTMLElement | null>(null);

  // State Simulasi Hujan Uji Cuaca
  const [rainOptions, setRainOptions] = useState<RainOptions>({
    intensity: 35,
    speed: 80,
    size: 24,
  });
  const [isRainPaused, setIsRainPaused] = useState<boolean>(false);

  // Parallax Pointer Refs
  const subjectRef = useRef<HTMLDivElement | null>(null);
  const headlineRef = useRef<HTMLDivElement | null>(null);
  const arcsRef = useRef<HTMLDivElement | null>(null);
  const hudLeftRef = useRef<HTMLDivElement | null>(null);
  const hudRightRef = useRef<HTMLDivElement | null>(null);
  const brandBlockRef = useRef<HTMLDivElement | null>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement | null>(null);

  // Intro Animation & ScrollTrigger Exit Scrub
  useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      if (reducedMotion) {
        // Pada reduced-motion, langsung set semua elemen tampil statis tanpa animasi
        gsap.set(
          [
            subjectRef.current,
            headlineRef.current,
            arcsRef.current,
            hudLeftRef.current,
            hudRightRef.current,
            brandBlockRef.current,
            scrollIndicatorRef.current,
          ],
          { opacity: 1, y: 0, scale: 1 }
        );
        return;
      }

      // 1. Intro Timeline (~1.4s)
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // State awal elemen
      gsap.set(arcsRef.current, { opacity: 0, scale: 0.95 });
      gsap.set(subjectRef.current, { opacity: 0, y: 50, scale: 1.05 });
      gsap.set('.hero-line-inner', { yPercent: 120, opacity: 0 });
      gsap.set([hudLeftRef.current, hudRightRef.current, brandBlockRef.current], {
        opacity: 0,
        y: 20,
      });
      gsap.set(scrollIndicatorRef.current, { opacity: 0 });

      // Urutan masuk (Stagger & Reveal)
      tl.to(arcsRef.current, { opacity: 1, scale: 1, duration: 0.8 }, 0)
        .to(subjectRef.current, { opacity: 1, y: 0, scale: 1, duration: 1.1 }, 0.2)
        .to(
          '.hero-line-inner',
          { yPercent: 0, opacity: 1, duration: 0.8, stagger: 0.12 },
          0.3
        )
        .to(
          [hudLeftRef.current, hudRightRef.current, brandBlockRef.current],
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 },
          0.8
        )
        .to(scrollIndicatorRef.current, { opacity: 1, duration: 0.4 }, 1.2);

      // 2. ScrollTrigger Exit Scrub (Keluar dari Hero)
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;
          if (subjectRef.current) {
            gsap.set(subjectRef.current, {
              scale: 1 - progress * 0.08,
              opacity: 1 - progress * 1.5,
            });
          }
          if (headlineRef.current) {
            gsap.set(headlineRef.current, {
              y: -progress * 100,
            });
          }
          if (hudLeftRef.current && hudRightRef.current) {
            gsap.set([hudLeftRef.current, hudRightRef.current, brandBlockRef.current], {
              opacity: 1 - progress * 2,
            });
          }
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  // Pointer Parallax Effect di Desktop
  useEffect(() => {
    if (reducedMotion || window.innerWidth < 1024) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      targetX = (e.clientX - centerX) / centerX;
      targetY = (e.clientY - centerY) / centerY;
    };

    const updateParallax = () => {
      // Lerp smoothing (0.05)
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;

      if (subjectRef.current) {
        subjectRef.current.style.transform = `translate3d(${currentX * 10}px, ${currentY * 10}px, 0)`;
      }
      if (headlineRef.current) {
        headlineRef.current.style.transform = `translate3d(${currentX * 16}px, ${currentY * 16}px, 0)`;
      }
      if (arcsRef.current) {
        arcsRef.current.style.transform = `translate3d(${currentX * -24}px, ${currentY * -24}px, 0)`;
      }

      rafId = requestAnimationFrame(updateParallax);
    };

    window.addEventListener('mousemove', handleMouseMove);
    rafId = requestAnimationFrame(updateParallax);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, [reducedMotion]);

  return (
    <section
      ref={heroRef}
      className="relative w-full h-screen min-h-[640px] max-h-[1200px] bg-api text-putih overflow-hidden select-none flex flex-col justify-between"
      aria-label="Section Hero Rental Alat Outdoor"
    >
      {/* 1. Latar Busur Konsentris (--api-tua) */}
      <div
        ref={arcsRef}
        className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden z-0"
        aria-hidden="true"
      >
        <img
          src="/assets/ornaments/arcs.svg"
          alt=""
          className="w-[140vw] max-w-[1600px] h-auto object-contain opacity-70"
        />
      </div>

      {/* 2. Goresan Hujan Canvas Interaktif */}
      <RainCanvas
        options={rainOptions}
        isPaused={isRainPaused}
        reducedMotion={reducedMotion}
      />

      {/* 3. Layer Belakang Headline (z-10 di bawah subjek) */}
      <div
        ref={headlineRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 px-4"
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

      {/* 4. Subjek Pendaki 3D di Tengah (z-20) */}
      <div
        ref={subjectRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
      >
        <div className="relative w-full h-full max-w-[960px] flex items-center justify-center">
          {/* Canvas Karakter 3D Three.js */}
          <StageCanvas
            cameraDistance={STAGE_CONFIG.camera.initial.distance}
            targetY={STAGE_CONFIG.camera.initial.targetY}
            yaw={STAGE_CONFIG.camera.initial.yawDeg * (Math.PI / 180)}
            className="w-full h-full"
          />

          {/* Siku Bracket Kamera di Titik Fokus Dada/Jaket */}
          <div
            className="hidden sm:block absolute top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 pointer-events-none"
            aria-hidden="true"
          >
            <span className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-white/80" />
            <span className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-white/80" />
            <span className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-white/80" />
            <span className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-white/80" />
          </div>
        </div>
      </div>

      {/* 5. Layer Depan Headline Berlapis (z-25) */}
      {/* Di-blend dan diatur agar huruf menumpuk dan terselip dramatis di depan subjek */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-25 px-4"
        style={{
          // Masking lembut di area tengah dada subjek
          WebkitMaskImage:
            'radial-gradient(ellipse at 50% 60%, rgba(0,0,0,0.35) 0%, rgba(0,0,0,1) 70%)',
          maskImage:
            'radial-gradient(ellipse at 50% 60%, rgba(0,0,0,0.35) 0%, rgba(0,0,0,1) 70%)',
        }}
      >
        <h1 className="text-center font-sans headline-tight text-putih text-[13vw] lg:text-[11vw] tracking-tighter select-none leading-[0.82] opacity-95">
          <div>
            naik du<span className="text-cyan">lu</span>
          </div>
          <div>belinya</div>
          <div>
            nan<span className="text-cyan">ti</span>
          </div>
        </h1>
      </div>

      {/* 6. Konten HUD dan Layout Baris Atas (z-30) */}
      <div className="relative z-30 pt-20 px-4 sm:px-6 lg:px-12 flex items-start justify-between">
        {/* Panel Uji Cuaca (Kiri Atas) */}
        <div ref={hudLeftRef}>
          <WeatherPanel
            options={rainOptions}
            onChangeOptions={(opts) => setRainOptions((prev) => ({ ...prev, ...opts }))}
            isPaused={isRainPaused}
            onTogglePause={() => setIsRainPaused((prev) => !prev)}
          />
        </div>

        {/* StatPill Kebasahan Jaket (Kanan Atas-Tengah) */}
        <div ref={hudRightRef} className="pt-2">
          <StatPill intensity={rainOptions.intensity} />
        </div>
      </div>

      {/* 7. Konten HUD Baris Bawah (z-30) */}
      <div className="relative z-30 pb-6 px-4 sm:px-6 lg:px-12 flex items-end justify-between">
        {/* Blok Brand & Tagline (Kiri Bawah sesuai Gambar 1) */}
        <div
          ref={brandBlockRef}
          className="max-w-[280px] sm:max-w-sm text-left space-y-2 select-text"
        >
          {/* Wordmark logo kecil */}
          <div className="font-sans font-extrabold text-lg sm:text-xl lowercase tracking-tight">
            {siteConfig.brandName}
            <span className="text-cyan">.</span>
          </div>

          {/* Tagline tebal huruf besar */}
          <h2 className="font-sans font-extrabold text-sm sm:text-base leading-tight uppercase text-putih tracking-tight">
            {siteConfig.tagline}
          </h2>

          {/* Paragraf keterangan kecil */}
          <p className="text-[11px] sm:text-xs text-white/90 leading-relaxed font-medium">
            Dari puncak tertinggi hingga jalur sabana basah. Semua alat rental kami diinspeksi ketat, bebas rembes, dan siap menemani langkahmu.
          </p>
        </div>

        {/* Indikator Scroll di Tengah Bawah */}
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

        {/* MiniCard Kacamata (Kanan Bawah sesuai Gambar 1) */}
        <div className="flex justify-end">
          <MiniCard />
        </div>
      </div>
    </section>
  );
};
