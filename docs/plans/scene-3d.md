# Rencana Implementasi — Scene 3D Karakter Pendaki (Pengganti Image Sequence)

Dokumen ini menyusun rencana migrasi arsitektur visual landing page dari *image sequence 2D* (PRD 3.3, 6.3, Lampiran B) ke **Scene 3D interaktif Three.js**, sesuai instruksi penggantian aset dan analisis video referensi `docs/referensi/2026-10-12 00-45-30.mkv`.

---

## 0. Ringkasan Analisis Gerakan Video Referensi

Dari 62 frame ekstraksi video referensi (`motionsites.ai/shadow-3d`), berikut alur gerak dan visual yang dipelajari:

### A. Fase Awal (Hero — Scroll 0%)
- **Framing Kamera**: Sosok berkerudung dan berkacamata gunung dibingkai *close-up* (dada ke atas hingga puncak kerudung). Kamera berhadapan langsung dengan karakter (Yaw 0°).
- **Headline Berlapis (Layered Depth)**: Teks raksasa "never stop exploring" diposisikan beririsan dengan tubuh karakter. Sebagian huruf berada di belakang tubuh karakter, dan sebagian huruf berada di depan tubuh karakter (efek interleaving visual).
- **Elemen HUD**: Panel kontrol cuaca (kiri atas), stat pill (kanan atas), branding teks (kiri bawah), dan mini kartu kacamata (kanan bawah).
- **Efek Hujan**: Kanvas partikel tetesan hujan diagonal menutupi viewport dengan efek tetesan pada jaket di area tengah.
- **Latar Belakang**: Latar oranye jenuh `--api` (#FF4513) dengan aksen busur konsentris di belakang.

### B. Fase Transisi Kamera & Karakter (Scroll 0% → ~20%)
- **Kamera Mundur dan Menunduk**: Kamera menjauh (zoom-out) dan turun perlahan sehingga pandangan melebar dari dada-ke-atas menjadi tubuh utuh (kepala sampai sepatu) dengan margin vertikal sekitar ±6%.
- **Rotasi Awal**: Karakter berputar dari hadap depan (Yaw 0°) ke arah 3/4 samping (Yaw ~45°).
- **Memudarnya HUD & Headline**: Teks headline raksasa, HUD panel cuaca, stat pill, dan kartu mini memudar (opacity 1 → 0) secara proporsional terhadap scroll. Pada scroll ~20%, seluruh HUD hero sudah bersih.
- **Interaksi Halus**: Gerakan scrub 1 lapis smoothing terikat erat dengan posisi scrollbar pengguna dan dapat di-scroll balik ke atas (reversible).

### C. Fase Orbit 360° & Anotasi (Scroll 20% → 100%)
- **Orbit 360° Penuh**: Karakter berputar kontinu dari Yaw 45° hingga 405° (satu putaran penuh 360° ditambah 45° awal). Radius, ketinggian, dan target pandang kamera stabil.
- **Tampilan Penuh**: Karakter berdiri tegap dengan proporsi penuh di tengah panggung.
- **Anotasi Perlengkapan Interaktif**: Label pill HTML + garis penunjuk jangkar muncul sesuai sudut orientasi kamera (berdasarkan tabel sudut PRD 6.3 dalam derajat Yaw, bukan nomor frame). Maksimal 2–3 label tampil bersamaan, tanpa blur latar yang merusak kontras, dan langsung dapat diklik menuju katalog sewa.

---

## 1. Audit Kode Eksisting

### A. Kode / Aset yang Dihapus atau Dinonaktifkan:
- `src/components/showcase/FrameCanvas.tsx`: Kanvas render 2D image sequence lama.
- `src/hooks/useFramePreload.ts`: Hook preload 48/72 frame gambar.
- `src/config/sequence.config.ts`: Konfigurasi frame sequence lama.
- Ketergantungan pada draft folder `public/assets/sequence/`.

### B. Kode yang Diperbarui / Dimodifikasi:
- `src/components/hero/Hero.tsx`: Diubah agar menyatu dalam satu panggung ter-pin bersama showcase (`HeroStage` tunggal).
- `src/components/showcase/OutfitShowcase.tsx`: Bergabung ke dalam section terintegrasi.
- `src/components/hero/WeatherPanel.tsx`: Bahasa disesuaikan ke Bahasa Indonesia ("Uji Ketahanan Alat", "Intensitas Hujan", dll).
- `src/components/hero/StatPill.tsx`: Bahasa disesuaikan ke Bahasa Indonesia (menghapus klaim non-realistis seperti "CAT. 4 PROTECTION").
- `src/components/hero/MiniCard.tsx`: Disesuaikan dengan placeholder gambar/SVG yang rapi.
- `src/components/hero/RainCanvas.tsx`: Masking tetesan dibatasi pada proyeksi area tubuh.
- `src/data/annotations.json` & `src/lib/interpolate.ts`: Diperbarui untuk mendukung koordinat jangkar 3D dan orientasi sudut Yaw.

### C. Kode Baru yang Dibuat:
- `src/data/stage.config.ts`: Konfigurasi parameter kamera (FOV 30°, jarak awal 1.9m, target awal y 1.4m, jarak akhir 3.8m, target akhir y 0.9m), durasi scroll (700vh desktop / 500vh mobile), rentang sudut anotasi, dan titik jangkar model 3D.
- `src/components/stage/StageCanvas.tsx`: Wrapper `<Canvas>` React Three Fiber dengan konfigurasi DPR (maks 2 desktop, maks 1.5 mobile), WebGL renderer transparan, dan optimasi performa.
- `src/components/stage/StageScene.tsx`: Scene 3D berisi tata cahaya (key light kiri-depan 45°, rim light belakang-kanan, ambient rendah), kamera rig, karakter pendaki, dan proyektor titik jangkar.
- `src/components/stage/Hiker.tsx`: Komponen karakter pendaki berbasis Three.js prosedural (jaket hardshell berkerudung besar, kacamata gunung metalik reflektif, buff, celana, carrier di punggung, trekking pole di tangan kiri), dilengkapi loader fleksibel untuk `public/assets/model/hiker.glb` jika tersedia di masa depan.
- `src/components/stage/HeroStage.tsx`: Kontainer scroll pin utama yang menggabungkan Hero dan Outfit Showcase dalam satu pengalaman pin kontinu (700vh desktop / 500vh mobile).
- `src/components/stage/LayeredHeadline.tsx`: Komponen teks headline raksasa dengan teknik depth interleaving.
- `src/components/stage/StageAnnotations.tsx`: Proyeksi koordinat 3D ke 2D viewport untuk rendering pill label dan connector lines.
- `src/components/stage/DebugPanel.tsx`: Kontrol overlay (`?debug=1`) untuk menguji scroll progress, visualisasi sumbu 3D/jangkar, dan tombol salin konfigurasi jangkar.
- `src/components/stage/HikerStaticFallback.tsx`: Fallback poster statis untuk `prefers-reduced-motion` atau perangkat tanpa dukungan WebGL.
- `docs/spesifikasi-model-3d.md`: Dokumentasi panduan teknis model GLB (ukuran, orientasi, kompresi Draco, batas ≤ 5 MB).

---

## 2. Usulan Teknis: Layered Headline (Teks di Belakang & Sebagian di Depan Tubuh)

Untuk menghadirkan efek teks raksasa "SEWA ALAT OUTDOOR / JELAJAH TANPA BATAS" yang berlapis (sebagian huruf di belakang badan dan sebagian di depan badan karakter 3D):

1. **Opsi Rekomendasi (Dual-Layer DOM + Canvas)**:
   - **Layer 1 (Latar Belakang Canvas)**: Teks headline lengkap dirender di elemen DOM di bawah canvas WebGL (`z-index: 1`). Tubuh karakter 3D di `<Canvas>` (`z-index: 2`) secara alami menutupi huruf-huruf yang berada di belakangnya.
   - **Layer 2 (Di Atas Canvas)**: Huruf-huruf tertentu yang ingin ditampilkan *di depan* tubuh karakter (misalnya kata kunci tertentu atau potongan huruf beririsan) dirender di layer DOM terpisah di atas Canvas (`z-index: 3`) dengan penyesuaian posisi presisi atau efek teks 3D `<Text>` R3F / Troika di dalam scene pada koordinat Z tepat di depan dada karakter.
2. **Opsi 3D Troika / Text3D di Scene**:
   - Menempatkan teks langsung sebagai objek Three.js di dalam scene dengan koordinat Z yang melintasi karakter (huruf kiri berada di z = -0.2 m di belakang torso, huruf kanan berada di z = +0.2 m di depan torso). Hasilnya berinteraksi langsung dengan depth buffer GPU WebGL secara sempurna.

---

## 3. Rencana Eksekusi Bertahap

### Sub-Tahap A: Scene Dasar, Karakter Prosedural, & Lighting Rig (Tanpa Scroll)
- Instalasi dependensi: `three`, `@react-three/fiber`, `@react-three/drei`, dan `@types/three`.
- Buat `src/data/stage.config.ts` dengan parameter awal kamera dan pencahayaan.
- Buat `src/components/stage/Hiker.tsx` dengan siluet khas pendaki gunung:
  - Hood hardshell bervolume besar, jaket hitam matte dengan lipatan stylized.
  - Goggles/kacamata gunung dengan lensa amber/metalik reflektif.
  - Carrier tas gunung di punggung dengan strap dada.
  - Trekking pole di tangan kiri, sarung tangan, buff, celana kargo, sepatu hiking kokoh.
  - Dukungan fallback GLB loader (`public/assets/model/hiker.glb`).
- Setup lighting rig (Key light 45° kiri-depan, rim light oranye/putih belakang-kanan, ambient rendah).
- Siapkan dokumen spesifikasi model `docs/spesifikasi-model-3d.md`.
- **Verifikasi & Demo Browser**: Tampilkan render awal karakter 3D di hero.

### Sub-Tahap B: Integrasi Scroll Scrub & Panggung Pinned (0% → 100%)
- Bangun kontainer `HeroStage.tsx` dengan panjang scroll 700vh (desktop) / 500vh (mobile).
- Integrasikan dengan ScrollTrigger GSAP (satu lapis smoothing scrub 0.6).
- Animasi kamera:
  - Scroll 0% → 20%: Kamera mundur dari jarak 1.9m ke 3.8m, target Y turun dari 1.4m ke 0.9m, Yaw karakter 0° → 45°.
  - Scroll 20% → 100%: Yaw karakter berputar kontinu 45° → 405° (orbit 360° penuh).
- **Verifikasi & Demo Browser**: Uji kehalusan scrub bolak-balik (maju dan mundur).

### Sub-Tahap C: Headline Berlapis, Transisi HUD, & Bahasa Indonesia
- Implementasikan Headline berlapis (Layered Headline) dengan teks bahasa Indonesia.
- Hubungkan opasitas elemen HUD (Panel Cuaca, Stat Pill, Headline, MiniCard) agar memudar halus pada scroll 0% → 20%.
- Lokalisasi total teks antarmuka:
  - "TEST YOUR GEAR" → "Uji Ketahanan Alat"
  - "RAIN INTENSITY" → "Intensitas Hujan"
  - "CAT. 4 PROTECTION" → "Perlindungan UV Maksimal"
- Sambungkan RainCanvas agar partikel tetesan terfokus pada proyeksi tubuh karakter.
- **Verifikasi & Demo Browser**: Uji transisi memudarnya HUD saat mulai scroll.

### Sub-Tahap D: Proyeksi Anotasi Interaktif & Mode Debug
- Hitung proyeksi koordinat 3D jangkar model ke koordinat 2D layar via Three.js Vector3 `project(camera)`.
- Render label pill interaktif dengan connector line sesuai jendela sudut Yaw (tabel 6.3 PRD).
- Batasi tampilan label maksimal 2–3 item secara simultan. Label dapat diklik ke `/katalog?kategori=...`.
- Buat `src/components/stage/DebugPanel.tsx` (aktif jika URL memiliki `?debug=1`):
  - Slider kontrol progress scroll manual.
  - Toggle axes & anchor helper dots di viewport 3D.
  - Slider modifikasi koordinat jangkar XYZ dengan tombol "Salin ke stage.config.ts".
- **Verifikasi & Demo Browser**: Uji interaksi klik anotasi dan mode debug.

### Sub-Tahap E: Fallback Performa, Pembersihan Aset Lama, & Pengukuran Bundle
- Implementasikan pembatasan DPR (maks 2.0 desktop, 1.5 mobile) dan lazy initialization WebGL.
- Implementasikan fallback poster statis untuk `prefers-reduced-motion` atau error WebGL context.
- Bersihkan kode dan aset lama (`FrameCanvas`, `useFramePreload`, `sequence.config.ts`).
- Ukur ukuran bundle sebelum dan sesudah migrasi serta verifikasi skor Lighthouse.

---

## 4. Matriks Risiko & Mitigasi

| Risiko | Dampak | Strategi Mitigasi |
|---|---|---|
| Performa WebGL drop pada GPU terintegrasi / mobile | Frame rate turun saat scroll | Batasi DPR (1.5 di mobile), matikan antialias pada perangkat low-power, gunakan geometri bertaraf poligon rendah (low/mid-poly). |
| Tabrakan smoothing antara GSAP ScrollTrigger dan R3F | Gerakan tersendat atau bergetar | Gunakan satu sumber kebenaran (single source of truth): variabel progress dari ScrollTrigger diteruskan ke state render R3F `useFrame` dengan lerp internal. |
| Koordinat anotasi meleset saat resize layar | Label tidak menempel pada bagian tubuh | Hitung ulang proyeksi koordinat setiap frame di dalam `useFrame` berbasis aspect ratio kamera saat ini. |
| Pengguna dengan prefers-reduced-motion | Pusing karena animasi putar | Deteksi media query dan tampilkan `HikerStaticFallback` tanpa ScrollTrigger pinning. |

---

## 5. Kriteria Selesai (Definition of Done)
1. Single stage pinned (700vh desktop / 500vh mobile) menggantikan Hero + Outfit Showcase lama secara mulus.
2. Karakter 3D memiliki bentuk berkerudung khas dengan kacamata, carrier, trekking pole, serta pencahayaan kontras key-rim.
3. Kamera dan karakter bertransisi mulus dari dada-ke-atas ke putaran 360° penuh seluruh tubuh.
4. Headline berlapis dengan efek depth interleaving terlihat di hero.
5. HUD dan headline memudar sempurna pada scroll 0% → 20%.
6. Seluruh teks antarmuka menggunakan Bahasa Indonesia yang tepat tanpa istilah asing yang dilarang.
7. Anotasi interaktif muncul sesuai sudut Yaw dan dapat diklik.
8. Mode debug (`?debug=1`) berfungsi untuk tuning jangkar.
9. Fallback statis berfungsi jika motion dinonaktifkan.
10. Tidak ada error console atau bundle bloat yang tidak perlu.
