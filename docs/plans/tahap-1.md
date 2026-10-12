# Plan Tahap 1 — Hero (Gambar 1)

## 1. Ringkasan & Tujuan
Tahap ini bertujuan mengimplementasikan Section 1 (Hero) dan Header navigasi sesuai tata letak dan nuansa Gambar 1 yang telah diadaptasi untuk layanan rental outdoor. Komponen ini dirancang sangat presisi, responsif, aksesibel, dan performan dengan efek hujan canvas interaktif, headline berlapis (layering teks di balik dan di depan subjek dengan alpha mask), panel kontrol HUD uji cuaca, serta animasi intro dan parallax berbasis GSAP.

---

## 2. Daftar Komponen & File yang Dibuat / Diubah

### File Baru:
- `src/components/layout/Header.tsx`: Kotak navigasi tajam (`radius: 0`), brand mark `[ISI NANTI]`, tombol WhatsApp, serta panel navigasi mobile (full-screen modal hitam dengan aksesibilitas keyboard/Esc).
- `src/components/hero/Hero.tsx`: Kontainer utama Section 1 (tinggi 100vh desktop, latar `--api`, manajemen z-index layering headline & subjek, indikator scroll, dan exit scrub ScrollTrigger).
- `src/components/hero/WeatherPanel.tsx`: Panel HUD kiri atas dengan 3 slider interaktif (Intensitas, Kecepatan, Ukuran) berdesain teknis, tombol jeda (`aria-pressed`), serta versi mobile drawer / bottom-sheet.
- `src/components/hero/RainCanvas.tsx`: Render canvas 2D murni untuk partikel hujan diagonal beranggaran ≤ 2 ms/frame, berhenti saat tab tidak aktif (`visibilitychange`) atau saat hero di luar viewport (`IntersectionObserver`).
- `src/components/hero/StatPill.tsx`: Pill outline putih dengan nilai persen kebasahan dinamis (simulasi 0–3%) yang terhubung via garis SVG penunjuk 1px ke titik jaket.
- `src/components/hero/MiniCard.tsx`: Kartu kacamata gunung di kanan bawah dengan outline `--api-tua`, strip barcode SVG, dan tautan ke `/katalog?kategori=kacamata`.
- `src/lib/rain.ts`: Engine partikel hujan (posisi, sudut miring 20°, bounding box mask tetesan air pada jaket).
- `docs/plans/tahap-1.md`: Dokumen rencana kerja Tahap 1.
- `docs/asset-briefs/tahap-1.md`: Dokumen brief kebutuhan aset Tahap 1.

### File yang Dimodifikasi:
- `src/pages/Landing.tsx`: Menyematkan `Header` dan `Hero` di halaman utama.

---

## 3. Urutan Kerja Eksekusi
1. **Engine Hujan & Utilitas Canvas (`src/lib/rain.ts`, `RainCanvas.tsx`)**:
   - Membangun loop canvas 2D tanpa library eksternal.
   - Mengatur batas partikel (maks 220 di desktop, 80 di mobile) dengan sudut diagonal ±20°.
   - Integrasi `IntersectionObserver` dan `visibilitychange` agar partikel berhenti saat keluar viewport/tab blur.
2. **Komponen Header & Navigasi (`Header.tsx`)**:
   - Pola NavBox: kotak `--putih` teks `--hitam`, item aktif terbalik warna (`--hitam` teks putih).
   - Mode mobile (<768px): tombol hamburger dengan panel overlay penuh `--hitam`, trap focus dasar, dan `Esc` untuk menutup.
3. **Komponen HUD Hero (`WeatherPanel.tsx`, `StatPill.tsx`, `MiniCard.tsx`)**:
   - Panel HUD semi-transparan (putih 8%, border 1px putih 40%).
   - Tiga slider teknis pengatur intensitas, kecepatan, dan ukuran tetesan hujan secara reaktif.
   - StatPill dengan garis SVG 1px dan node kotak 6x6px yang menunjuk ke jaket.
   - MiniCard dengan barcode SVG dan hover shift 4px.
4. **Headline Berlapis & Struktur Subjek (`Hero.tsx`)**:
   - Susunan Layer:
     - Layer 0: Background solid `--api` + busur konsentris `--api-tua` SVG + partikel hujan canvas.
     - Layer 1: Headline belakang (Manrope 800, lowercase, line-height 0.85).
     - Layer 2: Subjek pendaki cutout hitam-putih.
     - Layer 3: Headline depan yang di-masking menggunakan alpha channel subjek (CSS `mask-image`).
     - Layer 4: Elemen HUD (WeatherPanel, StatPill, MiniCard, Nav).
5. **Animasi Masuk (Intro Timeline GSAP), Parallax Pointer, & Exit Scrub**:
   - Timeline intro 1.4s: busur stroke draw (600ms), subjek reveal scale 1.04 → 1 (900ms), headline mask reveal naik per baris (700ms), HUD stagger (300ms), garis penunjuk SVG (500ms).
   - Pointer parallax desktop (subjek ±10px, headline ±16px, busur ±24px) dengan lerp/lag halus.
   - ScrollTrigger exit scrub: subjek menyusut 8%, headline naik cepat, HUD memudar saat user menggulir ke section berikutnya.
6. **Aksesibilitas & Pengujian Reduced-Motion**:
   - Jika `prefers-reduced-motion` aktif: intro timeline diskip langsung ke state akhir, parallax dimatikan, canvas hujan dimatikan (hujan dapat dinyalakan manual via tombol jeda), fallback garis hujan statis SVG ditampilkan.
   - Pengecekan kontras WCAG AA (teks kecil menggunakan `--hitam` di atas latar oranye).

---

## 4. Risiko & Mitigasi
- **Risiko Performa Canvas Hujan**: Jumlah partikel berlebih dapat menyebabkan frame drop di CPU/GPU mobile.
  - *Mitigasi*: Partikel dibatasi ketat (max 220 desktop, 80 mobile); loop berhenti total saat hero tidak terlihat (IntersectionObserver threshold 0).
- **Risiko Headline Layering Masking**: Perbedaan dukungan browser pada `mask-image` (WebKit vs Blink).
  - *Mitigasi*: Gunakan kombinasi `-webkit-mask-image` dan `mask-image`, dengan fallback CSS z-index standar jika mask gagal dimuat.
- **Risiko Layout Collision di Layar Pendek**: Di layar HP landscape atau monitor beresolusi pendek (<600px height), elemen HUD bawah bisa menabrak headline.
  - *Mitigasi*: Media query `@media (max-height: 650px)` untuk menyembunyikan sementara kartu mini dan indikator scroll agar headline tetap lapang.

---

## 5. Kriteria Selesai (Definition of Done Tahap 1)
- [ ] Layout dan hierarki visual hero setara dengan karakter Gambar 1 di resolusi 375px, 768px, 1280px, dan 1440px.
- [ ] Canvas hujan berjalan mulus (≥ 55 fps di desktop), slider secara dinamis mengubah intensitas partikel tanpa re-render halaman.
- [ ] Tombol jeda hujan berfungsi dan memiliki atribut `aria-pressed`.
- [ ] Headline teks raksasa bertumpuk rapi di belakang dan depan subjek.
- [ ] Navigasi kotak berfungsi, menu mobile dapat dibuka/ditutup (termasuk tombol Escape).
- [ ] Saat `prefers-reduced-motion` aktif, animasi intro bergerak dan parallax mati secara otomatis.
- [ ] Klik MiniCard kacamata berhasil menavigasi ke `/katalog?kategori=kacamata`.
- [ ] Pengujian build produksi (`npm run build`) sukses tanpa error TypeScript.
