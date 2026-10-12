# Plan Tahap 3 — Spotlight Produk (Gambar 2)

## 1. Ringkasan & Tujuan
Tahap ini bertujuan mengimplementasikan Section 3 (**Spotlight Produk**) yang mengadaptasi komposisi *split-layout* dari **Gambar 2**. Section ini menampilkan 4 produk unggulan rental secara mendalam satu per satu (Jaket Hardshell, Carrier Alpine, Tenda Geodesic, Sepatu Summit GTX). Bagian ini di-pin oleh GSAP ScrollTrigger dengan *snap* per produk, transisi dramatis pergantian produk (headline raksasa dua warna memotong cutout, animasi angka spesifikasi naik, strip galeri vertikal), serta kontrol navigasi tombol prev/next dan indikator `"01 / 04"`.

---

## 2. Daftar Komponen & File yang Dibuat / Diubah

### File Baru:
- `src/components/spotlight/Spotlight.tsx`: Kontainer utama Section 3 (ScrollTrigger pin & snap, state produk aktif, tombol prev/next, penanda index `"01 / 04"`, transisi GSAP).
- `src/components/spotlight/SpotlightInfo.tsx`: Panel kiri (±30% desktop) berlatar `--api`, berisi tagline produk, deskripsi singkat, tombol sewa `--putih`, dan tabel spesifikasi teknis.
- `src/components/spotlight/SpecTable.tsx`: Tabel spesifikasi tipis 5 baris (angka besar bobot ringan + satuan kecil + label dipisah garis 1px putih 40%) serta harga sewa harian `"Rp [ISI NANTI] /hari"`.
- `src/components/spotlight/SpotlightCenter.tsx`: Area tengah berisi cutout hitam-putih besar produk, headline nama produk raksasa dua warna (putih + cyan) yang memotong subjek, dan bracket sudut fokus.
- `src/components/spotlight/SpotlightGallery.tsx`: Kolom kanan (±28% desktop) berlatar `--putih` berisi strip 3 foto produk vertikal berlatar `--abu-terang` (`#D4D7DC`) dengan loop gerak pelan vertikal.
- `docs/plans/tahap-3.md`: Dokumen rencana kerja Tahap 3.
- `docs/asset-briefs/tahap-3.md`: Dokumen brief kebutuhan aset Tahap 3.

### File yang Dimodifikasi:
- `src/pages/Landing.tsx`: Menyematkan `Spotlight` setelah `OutfitShowcase`.

---

## 3. Urutan Kerja Eksekusi
1. **Model Data & Persiapan Struktur (`spotlight.json`, `Spotlight.tsx`)**:
   - Memastikan 4 produk di `src/data/spotlight.json` lengkap dengan slug, nama, tagline, spesifikasi[5], hargaPerHari, cutout, galeri[3], dan alt.
   - Mengatur state `activeIndex` (0–3) dengan fungsi pergantian produk (`nextProduct()`, `prevProduct()`, `goToProduct(index)`).
2. **Panel Kiri & Tabel Spesifikasi (`SpotlightInfo.tsx`, `SpecTable.tsx`)**:
   - Format tipografi: Angka Manrope 300 (±2.5–3 rem) + satuan Saira 0.75 rem uppercase + label Manrope 500, dipisah garis 1px putih 40%.
   - Harga sewa harian `"Rp [ISI NANTI] /hari"`.
   - Tombol persegi `--putih` berteks `--hitam` uppercase *"SEWA [NAMA PRODUK] ↗"* menuju `/katalog?produk=<slug>`.
3. **Area Tengah Cutout & Headline Dua Warna (`SpotlightCenter.tsx`)**:
   - Cutout produk/pendaki berukuran besar dengan grading hitam-putih kontras tinggi.
   - Headline raksasa huruf kecil dua baris: sebagian huruf `--cyan`, sebagian `--putih`.
   - Layering headline: sebagian melintas di belakang cutout dan sebagian di depan.
   - Siku bracket kamera 24 px putih di titik fokus subjek.
4. **Kolom Kanan Galeri Vertikal (`SpotlightGallery.tsx`)**:
   - Latar belakang kolom `--putih` dengan strip foto vertikal (depan, belakang, detail) di atas latar foto `--abu-terang` (`#D4D7DC`).
   - Gerak lambat vertikal (animasi marquee/transform), melambat saat kursor hover.
5. **Timeline Transisi & ScrollTrigger Pin + Snap (`Spotlight.tsx`)**:
   - Pinning durasi 400vh (4 produk × 100vh) dengan snap ScrollTrigger per produk (durasi snap 0.6s).
   - Animasi transisi per produk (±800 ms):
     - Cutout lama bergeser ke kiri dan memudar (400ms); cutout baru masuk dari kanan (scale 1.06 → 1).
     - Headline lama keluar ke atas, headline baru masuk dari bawah.
     - Angka spesifikasi menghitung naik (*count-up* 600ms).
     - Bracket mengunci dengan scale 1.3 → 1 (300ms).
6. **Penyesuaian Responsif & Reduced Motion**:
   - Mobile (<1024px): Layout bertumpuk (headline di atas, cutout di tengah, panel info di bawah, galeri horizontal mini). Pergantian produk didukung tombol prev/next dan swipe sentuh.
   - `prefers-reduced-motion`: Pinning dan snap dimatikan; keempat produk ditampilkan sebagai blok statis berurutan secara editorial.

---

## 4. Risiko & Mitigasi
- **Risiko Bentrokan Pin ScrollTrigger Berurutan (Showcase 360° lalu Spotlight)**:
  - *Mitigasi*: Menentukan `trigger` dan `pinSpacing: true` yang terisolasi, serta memanggil `ScrollTrigger.refresh()` saat inisialisasi agar kalkulasi posisi offset tidak saling tumpang tindih.
- **Risiko Aksesibilitas Keyboard pada Section Pin**:
  - *Mitigasi*: Menyediakan tombol navigasi prev/next yang selalu terlihat dan dapat difokus dengan tombol Tab + Enter / tombol panah keyboard.
- **Risiko Layout Shift pada Transisi Galeri**:
  - *Mitigasi*: Memberikan dimensi aspek rasio eksplisit (3:4) pada kontainer gambar galeri di atas latar `--abu-terang`.

---

## 5. Kriteria Selesai (Definition of Done Tahap 3)
- [ ] Section ter-pin saat scroll memasuki Spotlight dan memiliki snap per produk untuk 4 produk unggulan.
- [ ] Tata letak split desktop sesuai Gambar 2: panel info oranye di kiri, cutout + headline raksasa di tengah, galeri putih di kanan.
- [ ] Transisi antar produk (headline, cutout, angka spesifikasi, galeri, bracket) berjalan halus sesuai spesifikasi PRD.
- [ ] Tombol prev/next dan pill penanda `"01 / 04"` berfungsi baik melalui klik kursor maupun navigasi keyboard.
- [ ] Tombol *"Sewa [nama produk] ↗"* bernavigasi ke `/katalog?produk=<slug>`.
- [ ] Pada `prefers-reduced-motion`, seluruh produk tampil berurutan tanpa pinning.
- [ ] `npm run build` berhasil tanpa error TypeScript.
