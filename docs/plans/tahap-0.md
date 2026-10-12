# Plan Tahap 0 — Setup Proyek

## 1. Ringkasan & Tujuan
Tahap ini bertujuan membangun fondasi teknis dan struktur arsitektur proyek agar siap digunakan untuk seluruh tahap berikutnya (Tahap 1 hingga Tahap 7). Tidak ada penulisan kode komponen UI akhir di tahap ini; fokusnya adalah konfigurasi build tool, styling token, integrasi animasi inti, font self-hosting, utilitas aksesibilitas, dan skrip pendukung aset placeholder.

---

## 2. Daftar Tugas
1. **Inisialisasi Proyek Vite + React + TypeScript**:
   - Konfigurasi `package.json`, `tsconfig.json`, `vite.config.ts`.
   - Setup React 18/19 dan React Router DOM untuk route `/` dan route placeholder `/katalog`.
2. **Setup TailwindCSS & Design Tokens**:
   - Pasang TailwindCSS dan PostCSS.
   - Konfigurasi `tailwind.config.ts` dan `src/styles/tokens.css` serta `src/styles/index.css` sesuai spesifikasi Bagian 2 PRD (`--api`, `--api-tua`, `--hitam`, `--putih`, `--abu-terang`, `--abu`, `--cyan`, radius, durasi animasi).
3. **Setup Self-hosted Web Fonts**:
   - Download/siapkan file WOFF2 untuk **Manrope** (variable 400-800) dan **Saira Semi Condensed** (400, 600) di `public/fonts/`.
   - Konfigurasi `@font-face` dengan `font-display: swap`.
4. **Integrasi GSAP, ScrollTrigger, & Lenis**:
   - Pasang GSAP dan Lenis.
   - Buat helper inisialisasi singleton di `src/lib/gsap.ts` dan `src/lib/lenis.ts` yang terintegrasi (Lenis scroll mengupdate ScrollTrigger).
   - Hook deteksi aksesibilitas `useReducedMotion` di `src/hooks/useReducedMotion.ts` untuk mematikan Lenis dan animasi secara otomatis.
5. **Setup Struktur Direktori & Placeholder Data**:
   - Bangun struktur folder sesuai Bagian 7 PRD (`src/components/`, `src/hooks/`, `src/lib/`, `src/data/`, `src/pages/`, `public/assets/`).
   - Buat file mock data awal dengan placeholder `[ISI NANTI]` di `src/data/`.
6. **Skrip Otomasi Placeholder & Asset Checker**:
   - Buat skrip Node.js `scripts/make-placeholders.mjs` untuk menghasilkan placeholder frame 360°, cutout hero/spotlight, dan produk katalog (SVG/Canvas).
   - Buat skrip `scripts/check-assets.mjs` untuk validasi ukuran, format WebP, alpha channel, dan rasio aset.
7. **Halaman Uji (Testbed / Smoke Test)**:
   - Halaman uji sederhana di route `/` yang menampilkan swatch token warna, uji kontras teks, rendering font Manrope & Saira, indikator status Lenis/GSAP, dan tombol simulasi `prefers-reduced-motion`.
8. **Linting & Code Quality**:
   - Konfigurasi ESLint & Prettier dasar agar standar kode rapi dan konsisten.

---

## 3. File yang Dibuat / Diubah
- `package.json`, `package-lock.json`
- `tsconfig.json`, `tsconfig.node.json`
- `vite.config.ts`
- `index.html`
- `tailwind.config.ts`, `postcss.config.js`
- `public/fonts/` (Manrope, Saira Semi Condensed woff2)
- `src/styles/tokens.css`, `src/styles/index.css`
- `src/main.tsx`, `src/App.tsx`, `src/routes.tsx`
- `src/lib/gsap.ts`, `src/lib/lenis.ts`
- `src/hooks/useReducedMotion.ts`, `src/hooks/useMediaQuery.ts`
- `src/pages/Landing.tsx`, `src/pages/CatalogPlaceholder.tsx`, `src/pages/DevTestbed.tsx`
- `src/data/site.ts`, `src/data/annotations.json`, `src/data/spotlight.json`, `src/data/products.json`, `src/data/faq.json`
- `scripts/make-placeholders.mjs`, `scripts/check-assets.mjs`

---

## 4. Urutan Kerja
1. Jalankan inisialisasi scaffold Vite React TS di direktori proyek.
2. Pasang dependensi: `gsap`, `lenis`, `react-router-dom`, `lucide-react`, `tailwindcss`, `postcss`, `autoprefixer`.
3. Tulis konfigurasi Tailwind, `tokens.css`, dan load font di `index.css`.
4. Implementasikan inisialisasi GSAP + ScrollTrigger + Lenis serta hook `useReducedMotion`.
5. Siapkan struktur direktori dan mock data skeleton.
6. Buat skrip generator placeholder dan validator aset.
7. Bangun halaman smoke-test (DevTestbed) untuk validasi token, font, smooth-scroll, dan reduced motion.
8. Uji build produksi (`npm run build`) dan jalankan verifikasi lokal.

---

## 5. Risiko & Mitigasi
- **Risiko Lisensi/Package GSAP**: Penggunaan GSAP dasar dan ScrollTrigger gratis untuk web publik umum. Kita gunakan versi core resmi npm `gsap`.
- **Risiko Integrasi Lenis vs ScrollTrigger**: Lenis bisa menyebabkan desinkronisasi scroll position jika tidak dihubungkan dengan `ScrollTrigger.update`. Mitigasi: kaitkan Lenis scroll event langsung ke `ScrollTrigger.update` dan tambahkan `gsap.ticker.add((time) => lenis.raf(time * 1000))`.
- **Risiko Kontras Warna Token**: Teks putih pada oranye `--api` (#FF4513) memiliki rasio kontras 3.4:1 (gagal WCAG AA untuk teks reguler < 18pt). Mitigasi: di `tokens.css` dan testbed, dokumentasikan aturan bahwa teks kecil di atas `--api` wajib menggunakan `--hitam` (#0F0F0F) atau pill pembungkus.

---

## 6. Kriteria Selesai (Definition of Done Tahap 0)
- [ ] `npm run build` berjalan sukses tanpa error TypeScript/Vite.
- [ ] `npm run dev` berjalan lancar di browser lokal.
- [ ] Design token warna (`--api`, `--hitam`, dll.) terdefinisi dan tampil presisi di halaman testbed.
- [ ] Font Manrope dan Saira Semi Condensed ter-render dengan benar dari asset lokal (self-hosted).
- [ ] Lenis smooth scroll aktif secara default dan otomatis mati saat `prefers-reduced-motion` aktif.
- [ ] Route `/` dan `/katalog` dapat dinavigasi via React Router.
- [ ] Skrip `scripts/make-placeholders.mjs` dan `scripts/check-assets.mjs` dapat dieksekusi tanpa error.
- [ ] Hasil verifikasi dilaporkan secara transparan sebelum lanjut ke Tahap 1.
