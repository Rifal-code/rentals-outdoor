# Plan Tahap 7 — Polish dan QA (Quality Assurance)

## 1. Ringkasan & Tujuan
Tahap 7 merupakan tahap final untuk memastikan landing page siap rilis (production-ready), performa tinggi, aksesibel, dan lolos uji ketat "Anti AI Slop" sesuai standar PRD Bagian 8. Fokus utama tahap ini adalah:
1. Penyempurnaan SEO & metadata (Open Graph, Twitter Cards, robots.txt, sitemap.xml, JSON-LD Schema).
2. Pemasangan Skip Link dan audit aksesibilitas menyeluruh (WCAG AA, navigasi keyboard penuh, ARIA attributes).
3. Penyetelan performa animasi, loop rendering canvas rain, dan pembersihan listener saat unmount/tab tidak aktif.
4. Audit "Anti AI Slop" menyeluruh pada layout, ritme warna latar, tipografi, dan elemen visual mikro.
5. Verifikasi build akhir, penanganan rute, dan pembuatan panduan pengisian `[ISI NANTI]` untuk pemilik bisnis.

---

## 2. Matriks Pengujian & Cakupan Uji

### A. Matriks Responsif & Perangkat
| Breakpoint | Resolusi Target | Komponen Kritis yang Diuji |
|---|---|---|
| **Mobile S / M** | 360px – 390px | Hero headline wrapping, Showcase 24 frame touch scrub, Spotlight kartu tunggal, Nav mobile drawer |
| **Mobile L / Tablet Portrait** | 414px – 768px | Header sticky bar, Marquee cuplikan katalog, Step baris Cara Sewa |
| **Desktop / Laptop** | 1024px – 1440px | Headline hero 3 lapis, Showcase 48 frame + anotasi kiri/kanan, Spotlight layout 3 kolom |
| **Ultrawide** | > 1920px | Max-width container, centering, keterbacaan teks |

### B. Matriks Browser & Engine
- Chromium (Chrome / Edge): ScrollTrigger pinning, WebP decode, Canvas performance.
- WebKit (Safari Desktop & iOS): Lenis touch smooth-scroll disable fallback, fixed layer repaint.
- Gecko (Firefox): Backdrop-filter blur, CSS sticky, typography metric swap.

### C. Matriks Aksesibilitas & Sensorik
- `prefers-reduced-motion: reduce`: Verifikasi bahwa Lenis nonaktif, hujan canvas diganti goresan statis SVG, animasi ScrollTrigger di-bypass atau di-flatten, dan transisi menjadi instan/fade lembut.
- Navigasi Keyboard Penuh: Skip to content, Tab loop header menu drawer, Accordion FAQ keyboard control (`Enter`/`Space`), tombol katalog, dan link WhatsApp.
- Screen Reader: Penamaan landmark ARIA (`<header>`, `<main>`, `<footer>`, `<section aria-label="...">`), atribut `aria-expanded` pada FAQ dan Nav.

---

## 3. Daftar Tugas Rinci

1. **SEO & Metadata**:
   - Perbarui `index.html` dengan meta tag SEO komprehensif: description, canonical, OG tags (title, desc, image, url), Twitter card tags, dan JSON-LD Structured Data (`SportsActivityLocation` / `RentalBusiness`).
   - Buat `public/robots.txt` dan `public/sitemap.xml`.

2. **Aksesibilitas & Usabilitas (A11y)**:
   - Tambahkan komponen `SkipToContent` link di awal aplikasi (`#main-content`).
   - Verifikasi kontras warna pada seluruh section (terutama teks pada latar oranye `--api` menggunakan `--hitam` atau teks putih ekstra tebal sesuai aturan PRD).
   - Pastikan focus visible ring (`focus-visible:outline-*` dengan warna aksen `--cyan`) konsisten dan jelas pada seluruh tombol/tautan.

3. **Optimasi & Efisiensi Animasi**:
   - Pastikan loop hujan canvas `RainCanvas.tsx` berhenti sepenuhnya saat tab browser disembunyikan (`document.visibilityState === 'hidden'`) atau saat elemen berada di luar viewport via `IntersectionObserver`.
   - Pastikan semua instance GSAP ScrollTrigger dan event listener dibersihkan saat komponen di-unmount.

4. **Audit Anti AI Slop (Checklist PRD 8.0)**:
   - [x] Tidak ada gradient ungu-biru, neon generic, atau mesh gradient.
   - [x] Tidak ada emoji dekoratif sebagai pengganti ikon.
   - [x] Tidak ada pola 3 kartu identik generic (menggunakan editorial list, 4 baris step horizontal, dan FAQ split).
   - [x] Copywriting spesifik aktivitas outdoor pendakian gunung, tanpa bahasa klise agen pemasaran.
   - [x] HUD teknikal presisi dengan aksen buatan manusia (garis penunjuk, node kotak, barcode, koordinat, goresan hujan).

5. **Inventarisasi `[ISI NANTI]`**:
   - Dokumentasikan daftar placeholder bisnis yang siap diisi oleh tim pemilik (WhatsApp, alamat toko, daftar harga final, nama brand).

6. **Verifikasi Akhir**:
   - Jalankan `npm run check:assets` untuk verifikasi aset.
   - Jalankan `tsc -b` dan `npm run build` untuk memvalidasi zero warning/error.
   - Uji aplikasi dalam browser preview untuk memastikan tidak ada error konsol.

---

## 4. File yang Dibuat / Diubah
- `index.html` (metadata SEO, JSON-LD, canonical, Open Graph)
- `public/robots.txt` (baru)
- `public/sitemap.xml` (baru)
- `src/components/layout/SkipToContent.tsx` (baru)
- `src/components/hero/RainCanvas.tsx` (optimasi visibilityState & tab freeze)
- `src/pages/Landing.tsx` (penambahan id `main-content` dan skip target)
- `docs/INVENTARIS_ISI_NANTI.md` (baru: daftar lengkap data bisnis yang perlu diisi sebelum go-live)

---

## 5. Risiko & Mitigasi
| Risiko | Mitigasi |
|---|---|
| Visibility API canvas menyebabkan canvas hitam saat tab dibuka kembali | Simpan timestamp dan reset posisi tetesan air saat tab kembali aktif |
| Bentrok fokus keyboard pada container yang di-pin oleh GSAP ScrollTrigger | Tambahkan event scroll manual atau pastikan focusable element berada di posisi viewport yang terlihat |
| Layout shift saat font lokal di-swap | `font-display: swap` dengan metrik fallback sans-serif yang mendekati Manrope |

---

## 6. Kriteria Selesai (Definition of Done Tahap 7)
- [ ] Metadata SEO, Open Graph, Favicon, robots.txt, dan sitemap.xml terpasang lengkap.
- [ ] Skip Link terpasang dan dapat diakses melalui keyboard.
- [ ] Siklus hidup render Canvas Rain efisien (pause saat tab blur/hidden).
- [ ] Lolos checklist Anti AI Slop PRD.
- [ ] Dokumen `docs/INVENTARIS_ISI_NANTI.md` dibuat untuk panduan peluncuran bisnis.
- [ ] `tsc` dan `npm run build` berhasil 100% tanpa error.
- [ ] Landing page teruji di browser dengan 0 unhandled error.
