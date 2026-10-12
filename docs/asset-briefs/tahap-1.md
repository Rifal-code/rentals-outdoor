# Brief Kebutuhan Aset — Tahap 1 (Hero)

*Catatan: Selama pengembangan Tahap 1, sistem akan menggunakan aset placeholder yang sudah dibuat. Anda dapat menyiapkan aset di bawah ini menggunakan generator AI secara berkala untuk integrasi final di Tahap 6.*

---

## Checklist Aset Hero

### [ ] 1. Subjek Utama Hero
- **Nama File**: `public/assets/hero/hero-subject.webp`
- **Jumlah**: 1 file
- **Rasio Aspek**: 4:5
- **Resolusi**: 1600 × 2000 px
- **Format**: WebP dengan **Alpha Channel (Transparan)**
- **Ukuran Maksimal**: ≤ 220 KB
- **Spesifikasi Visual**:
  - Foto pendaki dari dada ke atas (*waist-up* / *three-quarter view*).
  - Wajah menoleh sedikit ke kiri (posisi 3/4).
  - Mengenakan jaket hardshell berkerudung (*hooded jacket*) dan kacamata gunung (*goggles*).
  - Kepala berada di area sepertiga atas gambar (sisakan ruang di dada/bahu).
  - Tampilan hitam-putih kontras tinggi dengan tekstur butiran film halus (*fine grain*) dan tekstur kain basah terkena hujan.
  - Tepi potongan siluet harus bersih tanpa *halo* atau bayangan putih.
- **Contoh Prompt AI**:
  > `Waist-up black-and-white photograph of a hiker in a hooded hardshell jacket and mountaineering goggles, three-quarter view, face turned slightly left, dramatic soft light, high contrast, fine film grain, rain-wet fabric texture, isolated subject for cutout, transparent background, no logos, no text, 4:5 aspect ratio.`

---

### [ ] 2. Alpha Mask Subjek Hero
- **Nama File**: `public/assets/hero/hero-subject-mask.png`
- **Jumlah**: 1 file
- **Rasio Aspek**: 4:5
- **Resolusi**: 800 × 1000 px
- **Format**: PNG (1-channel / Grayscale mask: putih = subjek, hitam = latar)
- **Ukuran Maksimal**: ≤ 30 KB
- **Fungsi**: Digunakan oleh CSS `mask-image` untuk menyelipkan headline di balik badan subjek dan area tetesan air hujan. *(Bisa diekspor otomatis dari alpha channel aset #1).*

---

### [ ] 3. Foto Kartu Mini Kacamata
- **Nama File**: `public/assets/hero/mini-goggle.webp`
- **Jumlah**: 1 file
- **Rasio Aspek**: 1:1
- **Resolusi**: 600 × 600 px
- **Format**: WebP
- **Ukuran Maksimal**: ≤ 40 KB
- **Spesifikasi Visual**:
  - Foto produk kacamata gunung (*mountaineering snow/glacier goggles*).
  - Latar belakang abu-terang netral (`#D4D7DC`).
  - Gaya hitam-putih kontras tinggi, lensa reflektif gelap.
  - Tanpa teks atau logo merek.
- **Contoh Prompt AI**:
  > `Studio product photograph of black mountaineering snow goggles with reflective dark lens, centered, light gray background (#D4D7DC), high-contrast black and white, minimal studio lighting, no logos, 1:1 aspect ratio.`

---

### [ ] 4. Ornamen Vektor Hero (Opsional — Telah Disediakan Placeholder SVG)
- `public/assets/ornaments/arcs.svg` (Busur konsentris warna `--api-tua`)
- `public/assets/ornaments/rain-streaks.svg` (Goresan hujan diagonal 20°)
- `public/assets/ornaments/barcode.svg` (Strip barcode putih dekoratif)

---

## Petunjuk Pengiriman Aset
- Jika aset di atas sudah Anda buat, Anda dapat langsung menyimpannya di folder `public/assets/hero/` dengan nama file yang sesuai.
- Di Tahap 1 ini, kode akan diuji dan diverifikasi menggunakan placeholder fungsional terlebih dahulu.
