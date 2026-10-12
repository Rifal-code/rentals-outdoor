# Brief Kebutuhan Aset — Tahap 2 (Outfit Showcase 360°)

*Catatan: Selama pengembangan Tahap 2, sistem menggunakan 48 frame placeholder yang telah disiapkan secara otomatis. Anda dapat memproduksi aset 360° ini secara bertahap untuk integrasi final di Tahap 6.*

---

## 1. Spesifikasi Teknis Frame 360°

- **Nama File Desktop**: `public/assets/showcase/frame-000.webp` s/d `frame-047.webp`
  - **Jumlah**: 48 frame (interval setiap 7,5°)
  - **Rasio Aspek**: 3:4
  - **Resolusi**: 1200 × 1600 px
  - **Format**: WebP dengan **Alpha Channel (Transparan)**
  - **Target Ukuran**: ≤ 60 KB per frame (total desktop ≈ 2–3 MB)
- **Nama File Mobile**: `public/assets/showcase/m/frame-000.webp` s/d `frame-023.webp`
  - **Jumlah**: 24 frame (interval setiap 15° — diambil dari frame genap desktop: 000, 002, ..., 046)
  - **Resolusi**: 720 × 960 px
  - **Target Ukuran**: ≤ 30 KB per frame (total mobile ≈ 1 MB)

---

## 2. Checklist 8 Sudut Kunci (Validasi Awal)
*Disarankan memproduksi dan menyetujui 8 sudut ini terlebih dahulu sebelum mengekspor 48 frame:*

- [ ] **Sudut 0° (Frame 000 — Depan Penuh)**:
  - Wajah & kacamata gunung, ritsleting jaket, strap dada carrier, ujung sepatu gunung.
- [ ] **Sudut 45° (Frame 006 — Depan-Kanan)**:
  - Jaket, bahu kanan, sisi kanan carrier mulai tampak.
- [ ] **Sudut 90° (Frame 012 — Sisi Kanan / Profil)**:
  - Ketebalan carrier samping, kantong carrier, sepatu kanan.
- [ ] **Sudut 135° (Frame 018 — Belakang-Kanan)**:
  - Punggung carrier, strap pinggang kanan.
- [ ] **Sudut 180° (Frame 024 — Belakang Penuh)**:
  - Punggung penuh carrier, tutup atas (lid), tali kompresi, tumit kedua sepatu.
- [ ] **Sudut 225° (Frame 030 — Belakang-Kiri)**:
  - Sisi kiri carrier, trekking pole di tangan kiri terlihat jelas.
- [ ] **Sudut 270° (Frame 036 — Sisi Kiri / Profil)**:
  - Profil kiri, trekking pole, buff/beanie di leher/kepala.
- [ ] **Sudut 315° (Frame 042 — Depan-Kiri)**:
  - Dada dan bahu kiri, kacamata gunung dari samping.

---

## 3. Aturan Produksi (Kunci Konsistensi AI)
1. **Kamera Diam**: Ketinggian kamera tetap setinggi dada; jarak dan skala sama persis di setiap sudut agar model tidak "berguncang" (*no wobble*).
2. **Dasar Pijakan Tetap**: Telapak kaki selalu berada pada garis horizontal dasar yang sama (posisi Y konstan).
3. **Pencahayaan Tetap**: Cahaya lembut dari arah kiri-depan 45° dan tidak ikut berputar dengan subjek, sehingga bayangan kain berubah wajar saat tubuh berputar.
4. **Latar Transparan**: Latar belakang tanpa bayangan jatuh buatan (bayangan lantai ditangani oleh kode CSS).
5. **Grading Seragam**: Hitam-putih kontras tinggi dengan butiran film halus (*fine grain*), tanpa logo merek asli.

---

## 4. Alur Kerja Rekomendasi (Paling Konsisten)
1. **Buat Gambar Depan Final**: Hasilkan gambar pendaki tampak depan yang disetujui.
2. **Video Turntable (AI Image-to-Video)**: Masukkan gambar depan ke generator video AI dengan instruksi kamera mengorbit 360° mengelilingi karakter yang diam (cahaya tetap).
3. **Ekstrak Frame**: Gunakan FFmpeg untuk mengekstrak 48 frame seragam:
   ```bash
   ffmpeg -i turntable.mp4 -vf "fps=48/DURATION,scale=1200:1600" frame-%03d.png
   ```
4. **Hapus Background & Simpan WebP**: Gunakan background remover otomatis (mis. rembg) lalu simpan dalam format WebP lossless/lossy terkompresi.

---

## 5. Contoh Prompt AI
> `Full-body photograph of an outdoor hiker standing in a neutral A-pose, wearing a hooded hardshell jacket, mountaineering glacier goggles, a 50L expedition backpack with chest and waist straps, trekking boots, a merino buff, and holding a carbon trekking pole in left hand. Soft studio light from front-left 45 degrees, clean background, camera at chest height, high-contrast black and white, fine film grain, isolated cutout, no logos, no text, 3:4 aspect ratio.`
