# Plan Tahap 2 — Outfit Showcase (Rotasi 360°)

## 1. Ringkasan & Tujuan
Tahap ini bertujuan membangun interaksi sentral landing page: **Outfit Showcase** dengan rotasi pendaki 360° yang terikat secara presisi pada pergerakan scroll (*ScrollTrigger pin & scrub*). Mekanisme ini menggunakan *image sequence* berbasis Canvas 2D (48 frame desktop, 24 frame mobile), indikator derajat HUD 0°–360°, elips lantai interaktif, serta sistem anotasi HUD dinamis yang terhubung ke rute `/katalog?kategori=...`.

---

## 2. Urutan Kerja & Arsitektur Komponen
Sesuai instruksi PRD Bagian 8 (Tahap 2), urutan kerja dibagi menjadi 4 pilar terstruktur:

1. **Pilar 1 — Pin Section & Scrub Canvas Engine (`FrameCanvas.tsx`, `useFramePreload.ts`)**:
   - Membangun hook `useFramePreload` untuk memuat bertahap (frame depan 000 dimuat instan, frame sisanya dimuat di background; fallback ke frame terdekat bila frame belum selesai dimuat).
   - Canvas 2D yang merender frame sesuai progres scroll (`Math.round(progress * (N - 1))`).
   - Pinning `100vh` dengan panjang scrub 450vh (desktop) dan 350vh (mobile) menggunakan GSAP ScrollTrigger (`scrub: 0.6`).
2. **Pilar 2 — Sistem Anotasi HUD & Interpolasi Posisi (`AnnotationLayer.tsx`, `AnnotationLabel.tsx`)**:
   - Membaca data `annotations.json` (rentang derajat/frame: Kacamata, Jaket, Sepatu, Carrier, Trekking Pole, Buff).
   - Menghitung visibilitas per frame (maksimal 2–3 label tampil bersamaan agar tidak ramai).
   - Animasi garis SVG 1px terarah (`stroke-dashoffset`) dan node kotak putih 6×6 px, disambung pill outline putih.
3. **Pilar 3 — Navigasi & Akhir Rotasi**:
   - Setiap label anotasi dapat diklik atau difokus melalui keyboard (`Enter` → `/katalog?kategori=<slug>`) dengan outline `--cyan` 2px.
   - Pada progres akhir (100% / frame 047 → 000), muncul pill CTA *"lihat semua perlengkapan ↗"* menuju `/katalog` sebelum pin dilepaskan.
   - Putaran mundur (scroll ke atas) berjalan mulus tanpa glitch.
4. **Pilar 4 — Adaptasi Mobile & Aksesibilitas Reduced Motion**:
   - Pada layar mobile (<768px): menggunakan mode 24 frame (`showcase/m/`), membagi jalur label menjadi kiri dan kanan model dengan tap target ≥ 44×44 px.
   - Pada `prefers-reduced-motion`: mematikan pin dan scrub; menampilkan model statis tampak depan ditambah daftar item anotasi berupa kartu horizontal/grid aksesibel.

---

## 3. File yang Dibuat / Diubah

### File Baru:
- `src/components/showcase/OutfitShowcase.tsx`: Kontainer utama section 2 (pinning ScrollTrigger, latar `--api`, headline raksasa statis di belakang model, indikator derajat HUD, elips lantai, tombol CTA akhir).
- `src/components/showcase/FrameCanvas.tsx`: Komponen render Canvas 2D untuk frame sequence 360° dengan `requestAnimationFrame` dan penyesuaian DPR layar.
- `src/components/showcase/AnnotationLayer.tsx`: Layer SVG & HTML overlay untuk garis penunjuk 1px, node kotak, dan penempatan label.
- `src/components/showcase/AnnotationLabel.tsx`: Komponen pill HUD untuk item outfit (nama, harga/hari `[ISI NANTI]`, aksesibilitas keyboard).
- `src/hooks/useFramePreload.ts`: Hook pengatur pemuatan bertahap frame WebP dan cache gambar.
- `src/lib/interpolate.ts`: Utilitas kalkulasi sudut derajat 0°–360° dan interpolasi koordinat keyframe anotasi.
- `docs/plans/tahap-2.md`: Dokumen rencana kerja Tahap 2.
- `docs/asset-briefs/tahap-2.md`: Dokumen brief kebutuhan aset Tahap 2.

### File yang Dimodifikasi:
- `src/pages/Landing.tsx`: Menyematkan `OutfitShowcase` setelah `Hero`.

---

## 4. Risiko & Mitigasi
- **Risiko Konsumsi Memori & Bandwidth (48 Frame WebP)**:
  - *Mitigasi*: Preload bertahap (frame 000 dimuat pertama, sisa frame dimuat bertahap saat idle); pada mobile digunakan 24 frame resolusi 720×960.
- **Risiko Benturan Label di Layar Kecil (375px)**:
  - *Mitigasi*: Algoritma pemisah jalur kiri/kanan di `AnnotationLayer` dengan batas maksimal 2 label aktif secara bersamaan.
- **Risiko Glitch Interpolasi Saat Scroll Cepat**:
  - *Mitigasi*: Penggunaan fungsi fallback frame clamp dan interpolasi linier posisi x,y antar keyframe di `interpolate.ts`.

---

## 5. Kriteria Selesai (Definition of Done Tahap 2)
- [ ] Section ter-pin saat scroll memasuki Outfit Showcase dan memutar pendaki 360° (0° hingga 360°) mengikuti scrub kursor/touch.
- [ ] Angka derajat HUD (0°–360°) dan indikator titik pada elips lantai bergerak sinkron dengan rotasi frame.
- [ ] Anotasi produk muncul dan menghilang sesuai jendela sudut di PRD (Kacamata, Jaket, Sepatu, Carrier, Pole, Buff).
- [ ] Maksimal 2–3 anotasi aktif bersamaan; garis penunjuk 1px dan node 6×6 px menempel tepat.
- [ ] Label anotasi dapat diakses via keyboard dan bernavigasi ke `/katalog?kategori=...`.
- [ ] Mode `prefers-reduced-motion` menampilkan satu gambar tampak depan + daftar perlengkapan statis tanpa pinning.
- [ ] `npm run build` berhasil tanpa error TypeScript.
