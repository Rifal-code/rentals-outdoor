# Spesifikasi Aset Model 3D Pendaki (`hiker.glb`)

Dokumen ini memuat panduan teknis bagi perancang model 3D saat menyiapkan model akhir `hiker.glb` yang akan diletakkan di `public/assets/model/hiker.glb`.

---

## 1. Format & Kompresi File
- **Format**: GLB (Binary glTF 2.0).
- **Target Ukuran Berkas**: **≤ 5 MB** (disarankan < 3 MB untuk performa web optimal).
- **Kompresi Geometri**: Wajib menggunakan **Draco Compression** (quantization position: 14 bit, normal: 10 bit, texcoord: 12 bit).
- **Kompresi Tekstur**: Disarankan menggunakan format WebP atau KTX2/Basis Universal untuk tekstur resolusi tinggi (maks 2048x2048).

---

## 2. Skala, Orientasi, & Pivot (Origin)
- **Satuan Skala**: Meter (1 unit = 1 meter).
- **Tinggi Karakter**: **1,8 meter** (dari telapak kaki di `y = 0` hingga puncak kerudung di `y = 1.8`).
- **Pivot (Origin `0, 0, 0`)**: Berada tepat di antara kedua kaki karakter di lantai dasar (`y = 0`).
- **Orientasi Awal (Rest Pose)**:
  - Karakter menghadap ke arah sumbu **+Z** (Front View).
  - Sumbu **+Y** mengarah ke atas (Up Vector).
  - Tangan kiri memegang trekking pole mengarah ke samping kiri (+X).

---

## 3. Siluet & Elemen Anatomi Karakter
Siluet harus terbaca kontras dari semua sudut 360° (gaya outdoor technical apparel / street-tech):
1. **Kerudung Hardshell**: Bervolume besar, membingkai wajah tanpa memperlihatkan fitur wajah spesifik (sosok misterius/anonim).
2. **Kacamata Gunung (Glacier / Technical Eyewear)**: Lensa melengkung lebar dengan material reflektif mengilap.
3. **Buff / Masker Leher**: Menutupi bagian bawah wajah hingga hidung.
4. **Jaket Outdoor**: Kerah tinggi tahan badai, aksen lipatan technical shell.
5. **Carrier / Backpack**: Tas gunung berkapasitas 50–60L di punggung dengan kontur tegas dan tali dada/pinggang.
6. **Trekking Pole**: Di tangan kiri, vertikal atau sedikit miring ke depan.
7. **Celana & Sepatu Hiking**: Celana kargo teknikal dengan sepatu bot sol vibram tebal.

---

## 4. Material & Shading
- **Tipe Material**: PBR Standard / Physical Material (kompatibel `MeshStandardMaterial`).
- **Karakteristik Permukaan**:
  - Pakaian (Jaket, Celana, Carrier): Hitam matte / charcoal gelap, `roughness: 0.7 - 0.9`, `metalness: 0.0 - 0.1`.
  - Kacamata: `roughness: 0.1`, `metalness: 0.8 - 1.0` (efek pantulan kaca mengilap).
  - Trekking Pole: Aksen carbon / aluminium gelap (`metalness: 0.5`, `roughness: 0.3`).
- **Tekstur**:
  - Gunakan tekstur ORM (Occlusion, Roughness, Metallic) yang dipadatkan dalam satu channel texture.
  - Normal map halus untuk lipatan kain sintetis.

---

## 5. Tata Nama Titik Jangkar / Mesh (Opsional untuk Anotasi Presisi)
Jika model memiliki Empty / Dummy / Node khusus untuk jangkar anotasi, gunakan penamaan berikut:
- `Anchor_Eyewear`: Titik lensa kacamata gunung (`~ [0, 1.58, 0.16]`)
- `Anchor_Jacket`: Titik dada jaket hardshell (`~ [0.12, 1.35, 0.15]`)
- `Anchor_Carrier`: Titik tas carrier di punggung (`~ [-0.08, 1.25, -0.28]`)
- `Anchor_Pole`: Titik pegangan trekking pole di tangan kiri (`~ [-0.42, 0.98, 0.18]`)
- `Anchor_Boots`: Titik sepatu hiking kaki kanan (`~ [0.16, 0.12, 0.06]`)
- `Anchor_Buff`: Titik pelindung leher/buff (`~ [0, 1.48, 0.12]`)
