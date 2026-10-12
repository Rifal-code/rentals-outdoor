# Brief Kebutuhan Aset — Tahap 3 (Spotlight Produk)

*Catatan: Selama pengembangan Tahap 3, sistem menggunakan 16 placeholder aset yang telah disiapkan. Anda dapat memproduksi foto produk ini secara berkala menggunakan generator AI untuk integrasi final di Tahap 6.*

---

## 1. Ringkasan Kebutuhan Aset (16 File)
Terdapat 4 produk unggulan. Setiap produk membutuhkan **1 gambar Cutout Subjek Besar** dan **3 foto Galeri Vertikal**.

### Format & Batasan Teknis:
- **Cutout Produk/Model**:
  - Format: WebP dengan **Alpha Channel (Transparan)**
  - Rasio: 4:5 (Resolusi 1440 × 1800 px)
  - Ukuran Maksimal: ≤ 180 KB
  - Gaya: Hitam-putih kontras tinggi dengan tekstur butiran halus (*fine film grain*), pencahayaan seragam dengan hero.
- **Foto Galeri Produk**:
  - Format: WebP
  - Rasio: 3:4 (Resolusi 900 × 1200 px)
  - Latar Belakang: Abu-terang netral padat (`#D4D7DC` / `--abu-terang`) yang sama persis di semua produk.
  - Urutan: (1) Tampak Depan, (2) Tampak Belakang, (3) Foto Detail / *Close-up* (ritsleting, tali kompresi, jahitan).
  - Ukuran Maksimal: ≤ 80 KB per file.

---

## 2. Checklist per Produk

### Produk 1: Jaket Hardshell Shadow Falcon 750 (`spotlight/jaket-hardshell-shadow/`)
- [ ] `cutout.webp`: Pendaki/jaket hardshell hitam tampak 3/4, kerudung naik, kacamata gunung, transparan.
- [ ] `gallery-1.webp`: Jaket tampak depan penuh di atas latar abu-terang `#D4D7DC`.
- [ ] `gallery-2.webp`: Jaket tampak belakang penuh di atas latar abu-terang `#D4D7DC`.
- [ ] `gallery-3.webp`: Detail close-up ritsleting kedap air (aquaguard) dan jahitan seam-sealed.

### Produk 2: Carrier Alpine Shield 60 (`spotlight/carrier-alpine-60/`)
- [ ] `cutout.webp`: Carrier 60L terisi penuh berdiri tegak / digendong pendaki, tampak profil 3/4 samping, transparan.
- [ ] `gallery-1.webp`: Carrier tampak depan (tutup atas, strap dada, tali depan) di latar `#D4D7DC`.
- [ ] `gallery-2.webp`: Carrier tampak belakang (backsystem ergonomis, bantalan pinggang) di latar `#D4D7DC`.
- [ ] `gallery-3.webp`: Detail buckle aluminium, kantong samping, dan bahan Cordura 500D.

### Produk 3: Tenda Storm Veil 2P (`spotlight/tenda-storm-veil-2p/`)
- [ ] `cutout.webp`: Tenda kubah geodesic 2 orang berdiri kokoh terpasang kencang, transparan.
- [ ] `gallery-1.webp`: Tenda tampak depan dengan pintu vestibul terbuka di latar `#D4D7DC`.
- [ ] `gallery-2.webp`: Tenda tampak samping/belakang dengan tali guyline terpasang di latar `#D4D7DC`.
- [ ] `gallery-3.webp`: Detail tiang aluminium DAC, pasak tenda, dan ventilasi badai atas.

### Produk 4: Sepatu Summit Trek GTX (`spotlight/sepatu-summit-gtx/`)
- [ ] `cutout.webp`: Sepasang sepatu gunung mid-cut kokoh tampak 3/4, sol tebal, transparan.
- [ ] `gallery-1.webp`: Sepatu tampak samping luar di atas latar abu-terang `#D4D7DC`.
- [ ] `gallery-2.webp`: Sepatu tampak atas/belakang (lubang tali, kerah pergelangan) di latar `#D4D7DC`.
- [ ] `gallery-3.webp`: Detail sol Vibram Megagrip berlumpur kering dan membran Gore-Tex.

---

## 3. Contoh Prompt AI Generator

### Cutout Tengah:
> `Studio photograph of a black mountaineering expedition hardshell jacket worn by a hiker, dramatic directional light, high contrast black and white, fine grain film texture, isolated cutout subject with transparent background, no logos, no text, 4:5 aspect ratio.`

### Foto Galeri:
> `Studio product photograph of a black mountaineering hardshell jacket, front view, plain flat light gray background (#D4D7DC), minimalist studio lighting, crisp fabric texture, high-contrast black and white, no logos, 3:4 aspect ratio.`
*(Ganti dengan `back view` atau `macro close-up detail of waterproof zipper and sealed seams` untuk foto 2 & 3).*
