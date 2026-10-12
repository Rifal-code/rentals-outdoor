# Plan Tahap 5 — Section Pendukung dan Footer

## 1. Ringkasan & Tujuan
Tahap ini bertujuan melengkapi alur pengalaman pengguna landing page dari setelah Section 4 (Katalog) hingga ke akhir halaman (Footer). Section pendukung dirancang mengikuti prinsip anti-slop PRD (ritme warna bergantian, kolom editorial editorial-first, angka bernomor raksasa, dan tanpa barisan 3 kolom kartu ikon sejajar). Seluruh data bisnis yang belum final menggunakan placeholder standar `[ISI NANTI]`.

---

## 2. Struktur Section & Keputusan Lingkup (PRD 4.5 & 4.6)

1. **Cara Sewa (`HowToRent.tsx`)**:
   - **Latar**: `--putih` (`#FFFFFF`), teks `--hitam`.
   - **Pola Anti-slop**: 4 baris besar bernomor raksasa (`01` s/d `04`) dengan garis penunjuk 1px dan tipografi editorial, bukan barisan kartu ikon 4 kolom seragam.
   - **4 Langkah**: (01) Pilih alat di katalog $\rightarrow$ (02) Booking tanggal & durasi $\rightarrow$ (03) Ambil di gudang atau antar $\rightarrow$ (04) Kembalikan & lepas jaminan.
2. **Kenapa Kami (`WhyUs.tsx`)**:
   - **Latar**: `--api-tua` (`#D93A0B`), teks `--putih`.
   - **Pola Anti-slop**: Kolom editorial tunggal dengan pill data outline dan label HUD teknis, bebas dari template kartu fitur generik.
   - **Poin Utama**: Protokol inspeksi kebersihan alat, kebijakan penggantian darurat, dan jaminan kesiapan alat outdoor.
3. **Testimoni**:
   - *Status*: **Ditunda** sesuai panduan PRD 4.5 ("tidak memakai testimoni rekaan; bila belum ada data pendaki nyata, bagian ditunda") untuk menjaga integritas data tanpa manipulasi AI.
4. **FAQ Accordion Aksesibel (`Faq.tsx`)**:
   - **Latar**: `--putih` (`#FFFFFF`), teks `--hitam`.
   - **Pola Desain**: Baris kotak bergaris 1px tajam dengan toggle keyboard (`Enter` / `Space`, atribut `aria-expanded`).
   - **Data**: 6 pertanyaan seputar jaminan KTP, kebersihan/cuci alat, denda kerusakan, pengantaran, durasi sewa, dan pembatalan cuaca ekstrem (dari `src/data/faq.json`).
5. **CTA Penutup (`ClosingCta.tsx`)**:
   - **Latar**: Bidang penuh `--api` (`#FF4513`), teks `--putih`.
   - **Pola Desain**: Satu headline raksasa huruf kecil (*"gunung sudah menunggu. alatnya biar kami yang siapkan."*), dilengkapi 2 tombol aksi utama: tombol pill ke `/katalog` dan tombol WhatsApp.
6. **Footer Lengkap (`Footer.tsx`)**:
   - **Latar**: `--hitam` (`#0F0F0F`), teks `--putih` dengan aksen `--api`.
   - **Pola Desain**: Layout 4 kolom tidak seragam di desktop dan 1 kolom di mobile.
   - **Konten**: Wordmark brand raksasa huruf kecil penutup halaman, navigasi internal, data operasional/kontak `[ISI NANTI]`, tautan sosial media `[ISI NANTI]`, serta hak cipta dinamis.

---

## 3. Daftar File yang Dibuat / Diubah

### File Baru:
- `src/components/sections/HowToRent.tsx`: Komponen Cara Sewa (4 baris bernomor besar bergaris penunjuk).
- `src/components/sections/WhyUs.tsx`: Komponen Kenapa Kami (editorial teknis berlatar `--api-tua`).
- `src/components/sections/Faq.tsx`: Komponen FAQ accordion aksesibel.
- `src/components/sections/ClosingCta.tsx`: Komponen Call-To-Action penutup halaman.
- `src/components/layout/Footer.tsx`: Komponen Footer utama.
- `docs/plans/tahap-5.md`: Dokumen rencana kerja Tahap 5.

### File yang Dimodifikasi:
- `src/pages/Landing.tsx`: Menyematkan seluruh section pendukung dan menggantikan `DevTestbed` sementara.

---

## 4. Urutan Kerja Eksekusi
1. Buat komponen `HowToRent.tsx` (baris editorial bernomor 01–04 berlatar `--putih`).
2. Buat komponen `WhyUs.tsx` (poin keunggulan faktual berlatar `--api-tua`).
3. Buat komponen `Faq.tsx` (accordion berbasis data `faq.json` dengan aksesibilitas keyboard WAI-ARIA).
4. Buat komponen `ClosingCta.tsx` (headline raksasa di latar `--api` + tombol ganda).
5. Buat komponen `Footer.tsx` (tata letak 4 kolom tidak seragam berlatar `--hitam`).
6. Perbarui `src/pages/Landing.tsx` untuk menyatukan seluruh rangkaian landing page dari awal hingga akhir.
7. Jalankan kompilasi `npm run build` dan verifikasi visual di browser lokal.

---

## 5. Kriteria Selesai (Definition of Done Tahap 5)
- [ ] Rangkaian alur landing page tersambung utuh: Header $\rightarrow$ Hero $\rightarrow$ Showcase 360° $\rightarrow$ Spotlight $\rightarrow$ Katalog Marquee $\rightarrow$ Cara Sewa $\rightarrow$ Kenapa Kami $\rightarrow$ FAQ $\rightarrow$ Closing CTA $\rightarrow$ Footer.
- [ ] Ritme warna latar selaras dengan PRD (`--api` $\rightarrow$ `--hitam` $\rightarrow$ `--putih` $\rightarrow$ `--api-tua` $\rightarrow$ `--putih` $\rightarrow$ `--api` $\rightarrow$ `--hitam`).
- [ ] FAQ accordion dapat dibuka/ditutup secara mulus serta dapat dioperasikan via keyboard (`Tab`, `Enter`, `Space`).
- [ ] Tidak ada kartu ikon 3 kolom generik atau AI slop; data bisnis yang belum final tertulis jelas sebagai `[ISI NANTI]`.
- [ ] Responsif di semua breakpoint (mobile, tablet, desktop).
- [ ] `npm run build` sukses tanpa error TypeScript.
