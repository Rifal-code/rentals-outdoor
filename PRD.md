# PRD — Landing Page Rental Alat Outdoor

*Versi 2.0 (layout dan gaya mengikuti 3 gambar referensi) · Bahasa Indonesia · Scope: halaman landing saja. Semua detail bisnis yang belum diberikan ditulis sebagai* ***\[ISI NANTI\]*** *dan dikumpulkan di bagian 9.*

## 1. Ringkasan, Tujuan, Target Pengguna, Metrik

**Ringkasan.** Landing page satu halaman untuk layanan rental alat outdoor (tenda, carrier, jaket, sepatu, kompor, dll). Tampilan dan layout mengikuti tiga gambar referensi (hero, spotlight produk, keranjang/checkout) yang diubah menjadi web rental. Halaman ini bertugas satu hal: membuat pengunjung merasa "alat ini siap dipakai naik gunung" lalu masuk ke `/katalog`. Halaman lain (katalog lengkap, detail produk, keranjang/checkout) dikerjakan di fase berikutnya; untuk sekarang `/katalog` hanya route placeholder. Referensi tambahan menyusul berurutan dan dimasukkan sebagai revisi PRD.

**Tujuan.**

- Membangun kepercayaan: terlihat dikelola orang yang benar-benar mendaki.
- Mengarahkan klik ke `/katalog` (dan `/katalog?kategori=...`) lewat dua jalur: label anotasi di Outfit Showcase dan grid cuplikan katalog.
- Menjadi pembeda visual dari situs rental yang berupa daftar produk biasa.

**Target pengguna.**

| Segmen | Kebutuhan | Perilaku |
| --- | --- | --- |
| Pendaki pemula (18–28 th) | Belum mau beli alat mahal, takut salah pilih | Dominan mobile, lihat dari Instagram/TikTok, tanya via WhatsApp |
| Pendaki rutin | Melengkapi alat yang kurang, hemat bagasi | Cari cepat per kategori, bandingkan harga/hari |
| Wisatawan camping santai / keluarga | Paket sederhana sekali pakai | Butuh kepastian kondisi alat dan cara ambil/antar |

**Metrik keberhasilan** (angka target awal, sesuaikan setelah ada data):

| Metrik | Target |
| --- | --- |
| Klik ke `/katalog` dari halaman (CTR gabungan) | ≥ 25% sesi |
| Interaksi dengan Outfit Showcase (scroll sampai akhir rotasi) | ≥ 50% sesi yang mencapai section 2 |
| Klik tombol WhatsApp | ≥ 5% sesi |
| Lighthouse Performance mobile | ≥ 85 |
| LCP mobile | ≤ 2,5 detik |
| Aksesibilitas Lighthouse | ≥ 95 |

## 2. Prinsip Desain & Design Token

### 2.1 Arah: "Poster Ekspedisi Kinetik"

Gaya visual mengikuti gambar referensi dari Anda: **poster ekspedisi kinetik** dengan latar oranye jenuh, subjek hitam-putih terpotong, huruf kecil raksasa yang bertumpuk dengan subjek, dan elemen HUD yang tipis. Gambar itu hanya referensi **gaya**; logo, nama merek, foto, dan teks aslinya tidak boleh disalin.

**Moodboard (teks).**

- Satu bidang warna jenuh (oranye api) memenuhi layar; busur konsentris yang lebih gelap di belakang subjek memberi kedalaman tanpa gradient.
- Subjek dipotong dari latar, hitam-putih kontras tinggi dengan grain, berdiri di tengah. Headline raksasa melintas di belakang dan di depannya sehingga terasa berlapis.
- Headline huruf kecil, sangat tebal, dan rapat; satu atau dua huruf diberi warna cyan sebagai kejutan kecil.
- Elemen HUD (Gambar 1): panel kontrol kecil dengan slider, pill outline berisi angka besar, garis 1 px dengan node kotak putih yang menunjuk ke bagian subjek, strip barcode, foto kecil dalam kotak outline.
- Layout split (Gambar 2): panel informasi oranye di kiri, kolom putih berisi strip foto vertikal di kanan, dan nama produk raksasa dua warna (putih + cyan) yang memotong subjek di tengah.
- Tabel spesifikasi tipis: angka besar berbobot ringan + satuan kecil + label, dipisah garis 1 px; harga besar dengan simbol mata uang kecil.
- Bracket sudut (seperti bidikan kamera) di titik fokus subjek.
- Daftar baris bergaris tipis dengan stepper jumlah dan total (Gambar 3) sebagai bahasa visual untuk "Cara Sewa" dan fase keranjang.
- Goresan hujan diagonal yang tipis dan grain film memberi kesan cuaca nyata.

**Do & Don't.**

| Do | Don't |
| --- | --- |
| Satu bidang warna jenuh per section, ritme `--api` / `--hitam` / `--putih` | Gradient ungu-biru, mesh gradient, neon berlapis |
| Subjek terpotong hitam-putih kontras tinggi + grain | Stock illustration generik, ikon emoji sebagai dekorasi |
| Headline raksasa huruf kecil yang bertumpuk dengan subjek | Judul kecil di tengah dengan subjudul abu-abu seragam |
| Garis penunjuk 1 px + node kotak + pill data pada item yang memang bisa disewa | Barisan 3 kolom fitur dengan ikon yang seragam |
| Panel HUD tipis (isi putih 8%, border 1 px), maksimal satu per section | Kartu glassmorphism tebal di mana-mana, blur besar, glow |
| Radius disengaja: kotak tajam untuk nav dan kartu, pill hanya untuk data dan CTA | Rounded dan shadow yang sama di semua elemen |
| Copy pendek, spesifik, huruf kecil: "carrier udah dicek. tinggal jalan." | "Solusi terbaik", "Revolusioner", "Pengalaman tak terlupakan" |
| Animasi yang menjelaskan (rotasi = melihat alat dari semua sisi, garis tergambar menuju item) | Fade-in-up di setiap elemen |

**Contoh nada copy** (draf, bukan final): "carrier udah dicek. kamu tinggal jalan." · "hujan di sabana 2? flysheet kami diuji sebelum keluar gudang." · "satu orang, lengkap dari kepala ke kaki." Nadanya santai dan lugas; klaim konkret (jumlah unit, kebijakan) memakai **\[ISI NANTI\]**.

### 2.2 Design token

**Warna (palet terbatas).**

| Token | Hex | Peran |
| --- | --- | --- |
| `--api` | `#FF4513` | Warna dominan: latar hero, Outfit Showcase, panel Spotlight, dan CTA penutup |
| `--api-tua` | `#D93A0B` | Busur dan bentuk besar di belakang subjek, hover, outline kartu mini |
| `--hitam` | `#0F0F0F` | Teks kecil di atas oranye, latar Katalog dan footer, item nav aktif |
| `--putih` | `#FFFFFF` | Headline besar, garis penunjuk, label, kotak nav, kolom galeri dan section terang |
| `--abu-terang` | `#D4D7DC` | Latar foto produk di galeri dan kartu mini |
| `--abu` | `#8C8C8C` | Teks sekunder dan garis di latar gelap |
| `--cyan` | `#22C3F5` | Aksen kecil: 1–2 huruf headline, node data aktif; bukan untuk teks badan |

Ritme latar: hero, Outfit Showcase, dan panel kiri Spotlight = `--api`; kolom galeri Spotlight = `--putih` dengan foto di `--abu-terang`; Katalog = `--hitam`; Cara Sewa dan Kenapa Kami = `--putih` bergantian dengan `--api-tua`; FAQ = `--putih`; CTA penutup = `--api`; footer = `--hitam`.

Kontras (perkiraan, diverifikasi ulang dengan alat kontras di Tahap 0): `--putih` di atas `--api` ≈ 3,4:1, jadi hanya untuk teks besar (≥ 24 px, atau ≥ 19 px tebal). Teks kecil di atas `--api` memakai `--hitam` (≈ 5,5:1). `--abu` di atas `--hitam` ≈ 5,7:1 dan `--cyan` di atas `--hitam` ≈ 9:1.

**Tipografi.**

| Peran | Rekomendasi | Alasan |
| --- | --- | --- |
| Display dan body | **Manrope** (variable, 400–800) | Grotesk geometris yang bulat; ExtraBold huruf kecil dengan tracking −0,04em menghasilkan headline tebal-rapat seperti referensi, dan tetap terbaca di mobile |
| HUD, label, harga, kode | **Saira Semi Condensed** (400, 600), uppercase, tracking +0,06em | Semi-condensed yang teknis, seperti label spesifikasi; jelas berbeda dari font body |

Alternatif bila Manrope kurang cocok: Plus Jakarta Sans ExtraBold atau Sora.

Skala: H1 `clamp(3.5rem, 12vw, 12rem)`, weight 800, huruf kecil, line-height 0,85 · H2 `clamp(2.25rem, 6vw, 5rem)` · H3 1,25 → 1,75 rem, weight 700 · body 1 rem/1,6, weight 500 · label 0,6875 rem uppercase · angka besar di pill (Saira 600) 2 → 3 rem. Font self-host, subset Latin, `font-display: swap`, maksimal 3 file.

**Spacing.** Basis 4 px; skala 4/8/12/16/24/32/48/64/96/128. Padding section vertikal: 72 px mobile, 128 px desktop. Kontainer maksimum 1280 px; headline boleh melewati kontainer (full-bleed).

**Radius.** `--r-box: 0` (kotak nav, tag, kartu produk, foto), `--r-pill: 999px` (pill data dan tombol CTA), `--r-input: 2px`. Tidak ada rounded besar yang seragam.

**Elevasi.** Tanpa shadow. Pemisah berupa garis 1 px (putih 40% di latar jenuh, `--abu` di latar gelap). Panel HUD: isi putih 8%, border 1 px putih 40%, blur maksimal 4 px, satu panel per section.

**Gerak (durasi & easing).**

| Token | Nilai | Pemakaian |
| --- | --- | --- |
| `--dur-fast` | 150 ms | hover, fokus |
| `--dur-base` | 300 ms | anotasi masuk/keluar |
| `--dur-draw` | 500 ms | garis penunjuk "tergambar" menuju item |
| `--dur-slow` | 700 ms | transisi section; headline naik per baris (mask reveal) |
| `--ease-out` | `cubic-bezier(0.22, 1, 0.36, 1)` | masuk elemen |
| `--ease-inout` | `cubic-bezier(0.65, 0, 0.35, 1)` | transisi posisi |
| Scrub | linear (mengikuti scroll, tanpa easing) | rotasi 360° |
| Marquee | linear, 60–90 detik per putaran | kolom katalog |

**Tekstur & detail.** Grain film 4–6% (blend overlay) di atas bidang `--api`; goresan hujan diagonal (garis putih tipis, opacity 30%, miring ±20°) hanya di hero dan showcase; busur konsentris `--api-tua` di belakang subjek; strip barcode SVG dan node kotak putih 6×6 px di ujung garis penunjuk. Hindari blur berlebih dan glow.

**Pola layout & komponen (dari gambar referensi).**

- **Kotak nav:** kotak `--putih` berteks `--hitam`, item aktif terbalik; tanpa radius.
- **Panel HUD:** judul kecil uppercase, slider tipis dengan thumb kotak putih, nilai persen di kanan, tombol jeda kotak kecil.
- **Pill data:** outline putih 1 px, angka (Saira 600) + satuan kecil, disambung garis penunjuk ke objek.
- **Kartu mini:** foto di kotak outline `--api-tua`, strip barcode di bawahnya, caption kecil rata kanan.
- **Tabel spesifikasi:** baris dipisah garis 1 px putih 40%; angka Manrope 300 (±3 rem) + satuan Saira 0,75 rem + label Manrope 500.
- **Harga besar:** "Rp" kecil + angka Manrope 300 (4–5 rem) + "/hari" kecil.
- **Tombol:** persegi `--putih` berteks `--hitam` uppercase dengan ikon panah garis (↗), atau pill untuk CTA besar. Ikon memakai set garis (mis. Lucide, stroke 1,5 px), bukan emoji.
- **Bracket sudut:** empat sudut putih 2 px, panjang 24 px, di titik fokus subjek.
- **Baris daftar:** label kolom uppercase kecil, garis 1 px, stepper berbentuk kotak (dipakai di Cara Sewa dan fase keranjang).

## 3. Keputusan Teknis

### 3.1 Stack

- **Vite + React + TypeScript** (SPA; React Router hanya untuk `/` dan `/katalog` placeholder).
- **TailwindCSS** untuk semua styling; token di `tailwind.config` dan CSS variables.
- Tidak memakai UI kit bawaan agar tampilan tidak generik.

### 3.2 Library animasi — rekomendasi minimal: **GSAP + ScrollTrigger + Lenis**

| Library | Keputusan | Alasan |
| --- | --- | --- |
| **GSAP + ScrollTrigger** | **Dipakai** | Pin section dan scrub berbasis progres scroll adalah kekuatan utamanya; presisi untuk menyinkronkan frame, anotasi, dan marquee. Gratis untuk penggunaan umum (cek lisensi untuk komersial: **\[ISI NANTI\]** bila perlu) |
| **Lenis** | **Dipakai** | Smooth scroll yang terintegrasi rapi dengan ScrollTrigger; membuat scrub terasa halus di desktop. Dimatikan pada `prefers-reduced-motion` dan dibatasi di perangkat sentuh bila mengganggu momentum native |
| Framer Motion | Tidak dipakai | Kebutuhan transisi komponen sederhana; cukup CSS transition + GSAP. Menghindari dua mesin animasi |
| three.js / R3F | Tidak dipakai (lihat 3.3) | Menambah ±150–200 KB gzip dan kompleksitas, tidak sebanding hasilnya |

Marquee vertikal diimplementasikan dengan **CSS animation (translateY loop dengan konten diduplikasi)**, bukan GSAP, agar ringan dan mudah dijeda saat hover/reduced motion.

### 3.3 Pendekatan rotasi 360°

| Kriteria | (a) Image sequence (48 frame, canvas) | (b) Model 3D `.glb` + react-three-fiber |
| --- | --- | --- |
| Konsistensi hasil dari AI generator | **Sedang**: tiap frame perlu konsisten; bisa dibantu dengan video turntable lalu ekstrak frame | **Rendah–sedang**: image-to-3D sering menghasilkan kain/kacamata/tali cacat, tekstur buram dari belakang |
| Ukuran file | 48 frame WebP \~40–60 KB (desktop 1200 px) ≈ 2–3 MB; varian mobile 720 px ≈ 1–1,5 MB | `.glb` terkompresi 3–8 MB + library 3D |
| Performa di HP | **Baik**: hanya menggambar gambar di canvas | Berisiko di HP kelas menengah ke bawah (GPU, memori, jank) |
| Penempatan anotasi | Perlu **kalibrasi per frame** (keyframe posisi x,y per item), tetapi hasilnya pasti sesuai tampilan | Mudah: anchor 3D diproyeksikan otomatis, tetapi bergantung pada kualitas model |
| Kesulitan bagi Anda sebagai pembuat aset | Sedang: butuh 1 karakter konsisten, 48 sudut | Tinggi: butuh model bersih; jika model rusak sulit diperbaiki tanpa software 3D |
| Fleksibilitas | Sudut kamera tetap | Bebas |

**Rekomendasi: (a) Image sequence.** Alasan: tampilan bisa dikontrol penuh (yang Anda lihat adalah yang pengunjung lihat), performa mobile aman, tidak butuh keahlian 3D, dan anotasi bisa dikalibrasi lewat file JSON. Opsi (b) menjadi fase lanjutan hanya jika nanti ada model 3D berkualitas dari desainer.

**Detail teknis (a).** Preload bertahap (frame depan dulu, sisanya di idle); render ke `<canvas>` memakai `requestAnimationFrame`; indeks frame = `round(progress × (N−1))`; resolusi desktop vs mobile dipilih lewat `matchMedia`; fallback bila gambar gagal: tampilkan frame 0 dan daftar item sebagai teks.

### 3.4 Efek hujan hero dan langkah Spotlight

**Efek hujan (hero).** Canvas 2D murni tanpa library tambahan. Partikel maksimal 220 di desktop dan 80 di mobile, digerakkan `requestAnimationFrame`, berhenti saat hero keluar viewport (IntersectionObserver) atau tab tidak aktif. Tetes yang menempel di jaket dibatasi oleh mask alpha dari gambar subjek. Tiga slider (intensitas, kecepatan, ukuran) hanya mengubah parameter partikel, bukan merender ulang halaman.

**Langkah Spotlight.** Satu pin ScrollTrigger dengan snap per produk dan satu timeline GSAP per transisi. Tombol prev/next dan swipe di mobile menjadi alternatif scroll sehingga bisa dioperasikan keyboard. Tidak ada library baru.

## 4. Spesifikasi per Section

### 4.0 Navigasi

Header berupa deretan kotak nav seperti referensi: kotak `--putih` berteks `--hitam`, item aktif terbalik (`--hitam` berteks putih), berisi Katalog, Cara Sewa, FAQ, Kontak. Logo **\[ISI NANTI\]** dan tombol WhatsApp di sisi lain. Di atas hero, nav mengikuti Gambar 1; setelahnya tetap tipis dan menempel di atas. Menu mobile berupa panel penuh `--hitam` dengan tautan besar huruf kecil, bisa ditutup dengan Esc atau tombol.

### 4.1 Section 1 — Hero (berdasarkan Gambar 1)

Layout mengikuti Gambar 1 dan diubah menjadi hero rental outdoor. Merek, logo, foto, dan teks dari gambar referensi tidak dipakai.

**Tata letak (desktop ≥ 1024 px, tinggi 100 vh).**

| Elemen | Posisi | Isi |
| --- | --- | --- |
| Latar | Seluruh layar | `--api`, busur konsentris `--api-tua` di kiri dan di belakang subjek, goresan hujan diagonal, grain |
| Subjek | Tengah, ±40–45% lebar, dada ke atas | Pendaki berkerudung jaket hardshell dan kacamata gunung, hitam-putih, cutout alpha |
| Headline | Tengah, 3 baris, bertumpuk dengan subjek | Huruf kecil raksasa; 2 huruf terakhir baris 1 dan baris 3 berwarna `--cyan` |
| Panel "Uji Cuaca" | Kiri atas | Judul, 3 slider (Intensitas hujan, Kecepatan tetes, Ukuran tetes), tombol jeda |
| Nav | Kanan atas | Kotak: Beranda (aktif), Katalog, Cara Sewa, Kontak |
| Pill data | Kanan atas-tengah | Angka persen + garis penunjuk ke jaket + label "kebasahan permukaan jaket (simulasi)" |
| Blok brand | Kiri bawah | Wordmark **\[ISI NANTI\]**, tagline uppercase tebal, paragraf kecil |
| Kartu mini | Kanan bawah | Foto kacamata dalam kotak outline, strip barcode, caption; klik → `/katalog?kategori=kacamata` |
| Indikator scroll | Tengah bawah | Teks "gulir" + garis vertikal |

**Copy (draf, bukan final).** Headline pilihan A (rekomendasi): "naik dulu / belinya / nanti". Pilihan B: "alatnya / kami yang / siapkan". Tagline: "KAMI SIAPKAN ALAT UNTUK SETIAP PUNCAK DAN JALUR". Paragraf kecil dan klaim layanan (pengecekan alat, dll.) **\[ISI NANTI\]** sesuai fakta bisnis.

**Animasi hero (diperjelas).**

1. **Intro (±1,4 s):** busur tergambar (stroke draw, 600 ms); subjek naik 40 px + fade + scale 1,04 → 1 (900 ms, `--ease-out`); tiap baris headline naik dengan mask reveal (700 ms, jeda 120 ms antar baris); lalu elemen HUD (panel, nav, pill, kartu mini) masuk bergantian 300 ms dengan jeda 80 ms, dan garis penunjuk tergambar 500 ms.
2. **Headline berlapis:** headline dirender dua kali. Lapisan belakang berada di bawah subjek; lapisan depan di atas subjek dan di-mask dengan alpha subjek agar sebagian huruf terselip di balik badan.
3. **Parallax pointer (desktop):** subjek ±10 px, headline ±16 px, busur ±24 px, masing-masing dengan lag berbeda. Nonaktif di layar sentuh dan saat reduced motion.
4. **Efek hujan interaktif:** canvas di atas bidang oranye. Goresan hujan jatuh diagonal; tetes yang mengenai area jaket (dibatasi mask alpha) menempel sebagai titik kecil lalu meluncur pelan. Slider: Intensitas (default 35%, 0–220 partikel desktop, 0–80 mobile), Kecepatan (default 80%), Ukuran (default 24%).
5. **Pill data:** angka dihitung dari intensitas hujan dan sengaja tetap kecil (0–3%) agar pesannya "jaket tahan basah". Angka ini simulasi ilustratif, bukan klaim produk, dan diberi label "simulasi".
6. **Tombol jeda:** menghentikan loop hujan (`aria-pressed`). Hujan otomatis berhenti saat hero keluar viewport atau tab tidak aktif.
7. **Keluar dari hero (scrub):** subjek mengecil ±8% dan memudar, headline naik lebih cepat dari scroll, HUD memudar lebih dulu; bidang `--api` berlanjut ke Section 2 tanpa sambungan.
8. **Hover dan fokus:** kotak nav terbalik warna (150 ms); kartu mini bergeser 4 px dan outline berubah ke `--putih`; thumb slider membesar saat fokus.

**State dan edge case.**

- `loading`: latar solid `--api` dengan headline teks langsung (tanpa menunggu gambar subjek).
- Gambar subjek gagal dimuat: headline dan HUD tetap tampil, subjek diganti siluet `--api-tua`.
- `reduced-motion`: tanpa intro bergerak, tanpa parallax, hujan mati dan bisa dinyalakan manual lewat tombol; slider tetap berfungsi.
- Layar sangat pendek (landscape HP): HUD paling bawah disembunyikan agar tidak menabrak headline.

**Responsif.**

- **Tablet (768–1023):** panel Uji Cuaca mengecil; pill data dan kartu mini tetap tampil.
- **Mobile (< 768):** nav menjadi menu hamburger; headline di atas subjek dengan ukuran ±20 vw; subjek di tengah-bawah; panel Uji Cuaca menjadi tombol "uji cuaca" yang membuka bottom sheet berisi slider (thumb 44 px); pill data pindah ke atas kartu mini; semua area sentuh ≥ 44 px.

### 4.2 Section 2 — Outfit Showcase (interaksi utama)

**Tata letak.** Latar `--api` dengan busur konsentris `--api-tua`; tinggi section = 100 vh yang di-pin; panjang scroll ≈ 400–500 vh (desktop), 350 vh (mobile). Pendaki (hitam-putih, terpotong) di tengah; headline raksasa huruf kecil statis di belakangnya (draf: "satu orang. lengkap dari kepala ke kaki."); penunjuk derajat 0°–360° berfont HUD di sudut.

**Perilaku inti.**

1. **Masuk viewport:** headline raksasa di belakang model dan judul kecil masuk 700 ms; busur `--api-tua` berputar sangat pelan sebagai latar hidup.
2. **Pin:** ScrollTrigger menahan section; progres scroll 0 → 1 dihaluskan (scrub 0,6) dan dipetakan ke frame 0 → 47.
3. **Putaran:** pendaki berputar 0° → 360° mengikuti scroll, mundur saat scroll ke atas (scrub murni, bukan autoplay). Angka derajat HUD mengikuti, dan elips tipis di lantai memiliki titik penanda sudut yang ikut berputar.
4. **Anotasi:** tiap item muncul pada jendela sudutnya (tabel di 6.3): garis tergambar 500 ms lalu pill masuk 300 ms; keluar 200 ms saat sudut lewat.
5. **Akhir putaran (100%):** pendaki kembali menghadap depan, label utama tampil bersamaan sebentar, pill CTA "lihat semua perlengkapan" muncul (→ `/katalog`), lalu pin dilepas.
6. **Scroll balik:** semua langkah berjalan terbalik tanpa glitch.

**Anotasi.** Data di `annotations.json`:

```
{ id, nama, kategori, hargaPerHari, href: "/katalog?kategori=jaket",
  keyframes: [{ frame, x, y, labelSide }], visibleRange: [frameMulai, frameAkhir] }
```

- Item: kacamata, jaket, carrier, sepatu, serta item lain sesuai aset (mis. topi/buff, trekking pole).
- Gaya HUD: garis 1 px `--putih` (lurus dengan satu tekuk), node kotak putih 6×6 px di titik item, dan di ujungnya label berupa pill outline putih berisi nama + harga/hari dalam font HUD (mis. "JAKET · RP \[ISI NANTI\]/HARI"). Item utama boleh memakai kotak outline berisi foto kecil produk dan strip barcode.
- Tampil hanya di `visibleRange` (sudut di mana item terlihat jelas); transisi masuk/keluar 300 ms (`--ease-out`), garis "tergambar" dengan `stroke-dashoffset` (`--dur-draw`); posisi diinterpolasi antar keyframe sehingga mengikuti putaran.
- Maksimal **2–3 label tampil bersamaan** agar tidak ramai.
- Klik/tap label → navigasi ke `/katalog?kategori=<slug>`; label dapat difokus keyboard, tampil fokus jelas (outline `--cyan` 2 px), `Enter` untuk membuka.
- Harga memakai **\[ISI NANTI\]** sampai data final.

Rentang sudut awal tiap item ada di tabel 6.3 dan dikalibrasi ulang setelah aset final tiba (Tahap 6).

**Mobile.**

- Model ±75% lebar layar, dipusatkan sedikit di atas tengah agar ada ruang label di bawah.
- Label dibagi dua jalur (kiri/kanan model), garis lebih pendek, ukuran teks ≥ 12 px, area sentuh minimal **44×44 px**.
- Bila dua label bertabrakan, yang kedua digeser ke jalur lain atau ditunda sampai yang pertama keluar.
- Scroll native tetap dipakai (Lenis tidak mengambil alih sentuhan); panjang pin dipendekkan.

**State & edge case.**

- `loading`: frame pertama + progres kecil; interaksi baru aktif setelah ≥ 40% frame siap (sisa dimuat belakangan, frame yang belum ada memakai frame terdekat).
- `reduced-motion`: tanpa pin dan tanpa scrub; tampilkan satu frame depan + daftar item (nama, harga, tautan) sebagai kartu statis.
- Resize/rotasi layar: hitung ulang posisi anotasi dan pin (`ScrollTrigger.refresh`).
- Pengguna meloncat via tautan anchor/lompat scroll cepat: frame menyesuaikan tanpa glitch.
- Tanpa JavaScript: tampilkan konten statis (gambar + daftar item).

### 4.3 Section 3 — Spotlight Produk (berdasarkan Gambar 2)

Menampilkan 4–5 produk unggulan satu per satu (usulan: jaket, carrier, tenda, sepatu; daftar final **\[ISI NANTI\]**). Section ini di-pin dan berganti produk mengikuti scroll.

**Tata letak (desktop).**

- **Kiri (±30%), panel `--api`:** tagline kecil produk, deskripsi 2 paragraf pendek, tabel spesifikasi 5 baris (angka besar berbobot ringan + satuan + label; isi sesuai produk, **\[ISI NANTI\]**), harga sewa besar "Rp \[ISI NANTI\] /hari", dan tombol `--putih` "Sewa \[nama produk\] ↗" menuju `/katalog?produk=<slug>`.
- **Tengah:** cutout produk/pendaki berukuran besar, hitam-putih. Nama produk raksasa huruf kecil memotong subjek: sebagian huruf `--cyan`, sebagian `--putih`, sebagian di belakang subjek dan sebagian di depan. Bracket sudut di titik fokus.
- **Kanan (±28%), kolom `--putih`:** strip foto vertikal 3–4 foto di latar `--abu-terang` (depan, belakang, detail), berjalan pelan.

**Animasi (diperjelas).**

1. **Pin dan snap:** ScrollTrigger menahan section; panjang scroll = jumlah produk × 100 vh, dengan snap per produk (durasi 0,6 s).
2. **Transisi antar produk (±800 ms):** huruf headline lama keluar ke atas satu per satu (jeda 20 ms), headline baru masuk dari bawah; cutout lama bergeser ke kiri dan memudar (400 ms), cutout baru masuk dari kanan dengan scale 1,06 → 1; angka spesifikasi dan harga menghitung naik (600 ms); strip galeri bergeser vertikal ke foto produk baru; bracket "mengunci" (scale 1,3 → 1, 300 ms).
3. **Galeri:** berjalan pelan (loop vertikal ±40 s), melambat saat hover (desktop), berhenti saat reduced motion.
4. **Navigasi:** penanda "01 / 04" dalam pill outline serta tombol prev/next (keyboard dan sentuh) sebagai alternatif scroll.

**Mobile.** Nama produk raksasa di atas, cutout di tengah, panel info di bawah (3 spesifikasi teratas, harga, tombol); galeri menjadi strip horizontal kecil; ganti produk lewat swipe horizontal, tombol, atau scroll (snap lebih longgar).

**State dan edge case.** `reduced-motion`: tanpa pin, tiap produk tampil sebagai blok statis berurutan. Gambar gagal: blok `--abu-terang` + nama produk. Produk < 2: tanpa pin. Data di `src/data/spotlight.json` (slug, nama, tagline, deskripsi, spesifikasi\[5\], hargaPerHari, kategori, cutout, galeri\[\], alt).

### 4.4 Section 4 — Cuplikan Katalog (grid bergerak)

- **Grid:** latar `--hitam`; 4 kolom (≥ 1024 px), 3 kolom (tablet 768–1023), 2 kolom (mobile). Tinggi section ±90 vh dengan batas atas/bawah memudar (mask gradien ke `--hitam`).
- **Arah:** kolom 1 atas→bawah, 2 bawah→atas, 3 atas→bawah, 4 bawah→atas (pada 3/2 kolom pola bergantian tetap berlanjut).
- **Kecepatan:** durasi per kolom 60 s, 72 s, 66 s, 80 s (variasi organik), linear, loop mulus lewat duplikasi daftar kartu (translate −50%).
- **Hover (desktop):** kolom yang di-hover melambat ke 0 (transisi 300 ms); kartu mendapat outline 1 px `--api`. Pada layar sentuh tidak ada hover; marquee tetap berjalan pelan.
- **Reduced motion:** semua kolom berhenti total; kolom bisa di-scroll manual atau tampil sebagai grid statis.
- **Kartu produk:** kotak tanpa radius dengan garis 1 px `--abu`; foto 4:5 (produk terpotong di atas latar gelap), nama (Manrope 700, huruf kecil), kategori dan harga sewa/hari (font HUD uppercase, harga `--api`), tautan ke `/katalog?kategori=...` atau `/katalog`. Seluruh kartu dapat difokus; saat fokus keyboard marquee berhenti pada kolom itu.
- **Data:** `src/data/products.json` (mock; id, nama, kategori, hargaPerHari, foto, alt, slug). Minimal 12 produk agar loop tidak terlihat berulang cepat. Harga mock = **\[ISI NANTI\]** / angka contoh bertanda jelas.
- **CTA:** tombol "Lihat Semua Katalog" (→ `/katalog`) di bawah grid: pill `--api` berteks `--hitam`, ukuran besar; hover berubah ke `--putih`.
- **Edge case:** gambar gagal → blok `--abu` + nama; data < 8 produk → marquee dinonaktifkan dan grid statis; tab tidak aktif → animasi dijeda (CSS `animation-play-state` via `visibilitychange`).

### 4.5 Section Tambahan (usulan ringkas)

| Section | Isi | Catatan anti-slop |
| --- | --- | --- |
| **Cara Sewa** | 4 langkah: pilih alat → booking → ambil/antar → kembalikan | Empat baris besar bernomor (01–04) dengan angka raksasa dan garis penunjuk, bukan 4 kartu ikon sejajar |
| **Kenapa Kami** | 3–4 poin konkret: pengecekan alat sebelum keluar, kebijakan kondisi alat, opsi paket (isi sesuai fakta bisnis **\[ISI NANTI\]**) | Satu kolom editorial; angka dalam pill outline dan label HUD, tanpa grid ikon |
| **Testimoni** | 3–5 kutipan pendaki nyata dengan nama panggilan & gunung yang didaki **\[ISI NANTI\]** | Kutipan besar huruf kecil di latar `--hitam`; tidak memakai testimoni rekaan; bila belum ada, bagian ditunda |
| **FAQ** | 6–8 pertanyaan (jaminan, denda, durasi, pembatalan, cuaca) dengan accordion aksesibel | Baris kotak bergaris 1 px; jawaban spesifik **\[ISI NANTI\]** |
| **CTA Penutup** | Satu ajakan + tombol ke `/katalog` dan WhatsApp | Bidang `--api` penuh dengan satu headline raksasa, tanpa banner tambahan |

### 4.6 Footer

Nama brand/logo **\[ISI NANTI\]** dan deskripsi singkat; navigasi (Beranda, Katalog, Cara Sewa, FAQ, Kontak); kontak (WhatsApp, email, alamat, jam operasional — semua **\[ISI NANTI\]**); tautan media sosial **\[ISI NANTI\]**; Syarat & Ketentuan Sewa; hak cipta `© [TAHUN] [NAMA BRAND]`. Latar `--hitam`, teks `--putih`, aksen `--api`; nama brand dipasang besar huruf kecil sebagai penutup halaman; tautan dengan fokus jelas; responsif 1 kolom (mobile) → 4 kolom tidak seragam (desktop).

## 5. Kebutuhan Non-Fungsional

**Performa**

- Lighthouse mobile ≥ 85; LCP ≤ 2,5 s; CLS ≤ 0,1; TBT rendah.
- Hero: gambar subjek (elemen LCP) berformat WebP dengan `fetchpriority="high"` dan preload; gambar di bawah fold `loading="lazy"` dengan dimensi eksplisit.
- Efek hujan hero: anggaran ≤ 2 ms per frame, jumlah partikel dibatasi (220 desktop, 80 mobile), berhenti saat di luar viewport.
- Frame showcase dan galeri Spotlight dimuat bertahap (lihat 3.3 dan 3.4); total transfer awal di atas fold ≤ 500 KB.
- Code-splitting: GSAP/ScrollTrigger dimuat setelah hero tampil.
- Animasi hanya memakai `transform` dan `opacity`; hindari animasi `top/left/width`.

**Aksesibilitas**

- `prefers-reduced-motion` dihormati di semua gerak (Lenis off, tanpa pin/scrub, marquee berhenti).
- Semua gambar punya alt text deskriptif (pendaki: deskripsikan outfit; foto produk: nama + jenis); dekoratif diberi `alt=""`.
- Seluruh interaksi dapat dioperasikan keyboard; urutan fokus logis; fokus terlihat; skip link "Lewati ke konten".
- Showcase memiliki padanan teks (daftar item) bagi pembaca layar.
- Kontras teks memenuhi WCAG AA; area sentuh ≥ 44 px.

**SEO dasar**

- `<title>`, meta description, heading hierarki (satu H1), URL kanonik, `lang="id"`.
- Open Graph + Twitter Card, favicon, `robots.txt`, `sitemap.xml`.
- Data terstruktur `LocalBusiness` (isi data bisnis **\[ISI NANTI\]**).
- Catatan: SPA Vite punya keterbatasan SEO; dipertimbangkan prerender statis (mis. `vite-plugin-ssr`/prerender) di Tahap 6 bila diperlukan.

**Browser:** dua versi terakhir Chrome, Safari (termasuk iOS), Firefox, Edge; Android Chrome pada HP menengah.

## 6. Kebutuhan Aset

Anda yang membuat aset lewat AI generator; bagian ini adalah brief lengkapnya. **Aturan penyampaian:** sebelum setiap tahap yang butuh aset, agent wajib menjelaskan ke Anda aset apa yang harus dibuat (nama file, jumlah, rasio, ukuran, sudut, contoh prompt) dalam bahasa sederhana, lalu menyediakan placeholder agar development tidak menunggu (lihat 6.8).

### 6.1 Ringkasan aset per section

| Section | Aset | Jumlah | Final dibutuhkan di |
| --- | --- | --- | --- |
| Hero | Subjek hero, mask alpha, foto kartu mini kacamata, ornamen (busur, hujan, barcode) | 1 + 1 + 1 + 3 | Tahap 6 (placeholder sejak Tahap 1) |
| Outfit Showcase | Pendaki 360°: 48 frame desktop + 24 frame mobile | 48 + 24 | Tahap 6 (placeholder sejak Tahap 2) |
| Spotlight Produk | Per produk: 1 cutout + 3 foto galeri; 4 produk | 16 | Tahap 6 (placeholder sejak Tahap 3) |
| Katalog Grid | Foto produk seragam | 16 | Tahap 6 (placeholder sejak Tahap 4) |
| Pendukung dan footer | Grain, logo, set ikon garis (dari library, tidak perlu dibuat) | 2 | Tahap 6 |
| Global | Favicon, apple-touch-icon, OG image | 3 | Tahap 6 |

### 6.2 Spesifikasi tiap aset

| Nama file | Fungsi | Spesifikasi teknis | Target ukuran |
| --- | --- | --- | --- |
| `hero/hero-subject.webp` | Subjek hero | Rasio 4:5, 1600×2000, WebP **alpha**, hitam-putih kontras tinggi + grain; pendaki dada ke atas, pose 3/4 (wajah menoleh sedikit ke kiri), kerudung jaket hardshell + kacamata gunung; kepala di sepertiga atas | ≤ 220 KB |
| `hero/hero-subject-mask.png` | Mask headline berlapis dan area tetes hujan | Diturunkan otomatis dari alpha subjek lewat skrip; 1 kanal, 800×1000 | ≤ 30 KB |
| `hero/mini-goggle.webp` | Foto kartu mini kanan bawah | Rasio 1:1, 600×600, kacamata gunung, latar `--abu-terang`, hitam-putih | ≤ 40 KB |
| `ornaments/arcs.svg` | Busur konsentris di belakang subjek | SVG, stroke tebal, warna `--api-tua` | ≤ 15 KB |
| `ornaments/rain-streaks.svg` | Goresan hujan statis (fallback reduced motion) | SVG, garis putih 1 px, miring ±20°, bisa di-tile | ≤ 20 KB |
| `ornaments/barcode.svg` | Strip barcode dekoratif (bukan kode nyata) | SVG, putih | ≤ 5 KB |
| `showcase/frame-000.webp … frame-047.webp` | Putaran 360° (desktop) | Rasio 3:4, 1200×1600, WebP **alpha**, hitam-putih kontras tinggi (detail di 6.3) | ≤ 60 KB/frame |
| `showcase/m/frame-000.webp … frame-023.webp` | Putaran 360° (mobile, tiap 15°) | 720×960, diturunkan dari frame genap desktop (000, 002, …, 046) | ≤ 30 KB/frame |
| `spotlight/<slug>/cutout.webp` | Produk/pendaki besar di tengah Spotlight | Rasio 4:5, 1440×1800, WebP alpha, hitam-putih; 4 produk | ≤ 180 KB |
| `spotlight/<slug>/gallery-1.webp … gallery-3.webp` | Strip galeri kanan | Rasio 3:4, 900×1200, latar `--abu-terang`; urutan: depan, belakang, detail | ≤ 80 KB |
| `products/p-01.webp … p-16.webp` | Foto grid Katalog | Rasio 4:5, 800×1000, WebP; produk dipotong (alpha) di atas latar gelap netral; grading seragam (kontras tinggi, saturasi rendah) | ≤ 70 KB |
| `textures/grain.png` | Grain film | 512×512, tile, opacity 4–6% saat dipakai | ≤ 40 KB |
| `brand/logo.svg` | Wordmark | SVG, versi putih dan hitam; **\[ISI NANTI\]** | ≤ 10 KB |
| `favicon.svg`, `favicon-32.png`, `apple-touch-icon.png` (180×180) | Identitas tab/ikon | Berdasarkan logo, warna `--api` dan `--hitam` | ≤ 10 KB |
| `og-image.jpg` | Pratinjau tautan | 1200×630 JPG, latar `--api`, headline + cutout | ≤ 150 KB |

### 6.3 Model pendaki 360° (Outfit Showcase)

**Konvensi sudut.** 48 frame, tiap 7,5° (frame = sudut ÷ 7,5). **0° = pendaki menghadap kamera**; 90° = sisi **kanan** pendaki menghadap kamera; 180° = membelakangi kamera; 270° = sisi **kiri** pendaki menghadap kamera. Frame 047 (352,5°) harus menyambung mulus ke frame 000; jangan membuat frame ke-49 untuk 360°.

**8 sudut kunci.** Buat dan setujui dulu 8 gambar ini sebelum memproduksi 48 frame:

| Sudut | Frame | Yang harus terlihat jelas |
| --- | --- | --- |
| 0° (depan) | 000 | Wajah dan kacamata, ritsleting jaket, strap dada, ujung sepatu |
| 45° (depan-kanan) | 006 | Jaket, bahu kanan, strap dada, sisi kanan carrier mulai tampak |
| 90° (kanan) | 012 | Profil carrier (ketebalan), kantong samping, sepatu kanan |
| 135° (belakang-kanan) | 018 | Punggung carrier, strap pinggang |
| 180° (belakang) | 024 | Punggung penuh, tutup atas dan tali kompresi carrier, tumit sepatu |
| 225° (belakang-kiri) | 030 | Sisi kiri carrier, trekking pole di tangan kiri |
| 270° (kiri) | 036 | Profil kiri, trekking pole, buff/topi |
| 315° (depan-kiri) | 042 | Dada dan bahu kiri, kacamata dari samping |

**Aturan produksi (semua frame).**

- Kamera diam setinggi dada; jarak dan skala sama di semua frame; sumbu putar tepat di tengah badan agar tidak "goyang".
- Telapak kaki selalu di garis dasar yang sama (posisi y tetap).
- Pose A-pose netral, lengan menjauh ±15° dari badan, tidak berubah antar frame; ekspresi netral.
- Cahaya lembut dari kiri-depan 45° dan tetap (tidak ikut berputar), sehingga bayangan pada kain berubah wajar saat badan berputar.
- Latar transparan (alpha), tanpa bayangan jatuh (bayangan lantai dibuat dengan CSS).
- Grading hitam-putih kontras tinggi + grain yang sama untuk semua frame; tanpa logo dan teks.
- Outfit: kacamata, jaket, carrier 40–60 L, sepatu gunung, buff/topi, trekking pole (daftar final **\[ISI NANTI\]**).

**Jendela anotasi awal** (dikalibrasi ulang di Tahap 6 setelah frame final ada):

| Item | Jendela sudut | Frame | Titik anchor |
| --- | --- | --- | --- |
| Kacamata | 315° → 45° | 042–047 dan 000–006 | Wajah |
| Jaket | 330° → 75° | 044–047 dan 000–010 | Dada / bahu |
| Sepatu | 45° → 135° | 006–018 | Sepatu kanan |
| Carrier | 120° → 240° | 016–032 | Punggung carrier |
| Trekking pole | 225° → 315° | 030–042 | Tangan kiri |
| Buff/topi | 255° → 330° | 034–044 | Kepala / leher sisi kiri |

### 6.4 Brief aset lain

- **Subjek hero:** satu gambar pendaki dada ke atas, 3/4, hitam-putih kontras tinggi dengan tekstur kain basah; ruang kosong di sisi kiri-kanan untuk HUD; potongan alpha harus bersih di tepi kerudung dan tali (hindari halo putih).
- **Cutout Spotlight:** satu gambar besar per produk, tampak depan/3/4, pencahayaan sama dengan hero agar terlihat satu keluarga; produk non-pakaian (tenda, carrier) difoto tanpa orang atau dengan model.
- **Galeri Spotlight:** 3 foto per produk dengan latar `--abu-terang` yang sama persis di semua produk: depan, belakang, detail (ritsleting, strap, jahitan).
- **Foto Katalog:** 16 produk dengan gaya seragam (jarak, sudut, cahaya, latar), kategori campuran (tenda, carrier, jaket, sepatu, kompor, dll.).

### 6.5 Alur kerja yang realistis

| Alur | Langkah singkat | Kelebihan / risiko |
| --- | --- | --- |
| **A. Video turntable → ekstrak frame (disarankan)** | 1) Buat gambar pendaki depan yang final. 2) Dengan generator image-to-video, minta kamera mengorbit 360° mengelilingi pendaki yang diam, cahaya tetap. 3) Ekstrak 48 frame seragam (ffmpeg), hapus latar, grading hitam-putih. 4) Cocokkan dengan 8 sudut kunci. | Konsisten alami (satu video); risiko: detail belakang berubah dan putaran tidak penuh. Coba beberapa kali dan pilih yang terbaik |
| **B. Foto sungguhan + AI cleanup** | Foto model asli di atas turntable 48 sudut, rapikan latar dan grading dengan AI | Paling konsisten dan realistis; butuh model dan alat |
| **C. Gambar per sudut dengan referensi** | Generate tiap sudut dengan gambar referensi karakter | Rawan inkonsisten (jaket/carrier berubah); pakai hanya bila A/B gagal |
| **D. Image-to-3D lalu render turntable** | Buat model 3D dari gambar, render 48 frame (mis. Blender) | Konsisten antar frame; kualitas bergantung model dan butuh sedikit kemampuan 3D |

**Tips konsistensi:** kunci seed bila tersedia; pakai satu gambar acuan yang sama; deskripsi outfit identik di tiap prompt; satukan hasil dengan grading yang sama; putar frame cepat (flipbook) untuk mengecek lompatan sebelum diserahkan; mulai dari 24 frame untuk uji lalu naikkan ke 48.

### 6.6 Contoh prompt

- **Subjek hero:** *Waist-up black-and-white photograph of a hiker in a hooded hardshell jacket and mountaineering goggles, three-quarter view, face turned slightly left, dramatic soft light, high contrast, fine film grain, rain-wet fabric texture, isolated subject for cutout, no logos, no text, 4:5.*
- **Pendaki 360° (dasar):** *Full-body photo of a hiker in a neutral A-pose wearing a hardshell jacket, tinted sport glasses, a 50L backpack with chest strap, mountaineering boots, a buff and a trekking pole. Soft light from front-left, plain background, camera at chest height, high-contrast black and white, fine film grain, no logos, 3:4.* Untuk sudut: tambahkan *"same person and outfit, rotated 45 degrees, same lighting and camera distance"*.
- **Cutout/galeri produk:** *Studio product photo of a \[nama produk\], three-quarter view, high-contrast black and white, fine grain, isolated for cutout, no logo.* Galeri: ganti dengan *"front view"*, *"back view"*, *"close-up detail"* di atas latar abu terang `#D4D7DC`, rasio 3:4.

### 6.7 Placeholder development

- Hero: siluet `--api-tua` + mask dummy, kartu mini abu, ornamen SVG sederhana buatan skrip.
- Showcase: 48 frame placeholder berupa siluet `--abu` di atas latar `--api`, bernomor frame dan sudut (dibuat skrip), plus 4 titik anotasi contoh pada `annotations.json`.
- Spotlight: 4 produk contoh (cutout abu + 3 foto galeri abu) dengan spesifikasi mock.
- Katalog: 16 gambar abu gelap bertuliskan kategori dan kode (TND-01, JKT-02, dst.).
- Nama file dan rasio **sama persis** dengan aset final agar penggantian di Tahap 6 hanya menimpa file.

### 6.8 Cara agent menyampaikan kebutuhan aset

- Di awal setiap tahap yang butuh aset (Tahap 1, 2, 3, 4), setelah plan disetujui, agent mengirim ringkasan aset tahap itu: nama file, jumlah, rasio, ukuran, sudut (untuk pendaki 360°), dan contoh prompt dari 6.6.
- Bahasanya sederhana dan berbentuk checklist, tanpa istilah teknis yang tidak perlu.
- Agent lanjut dengan placeholder dan tidak menunggu aset final; aset final dikumpulkan di Tahap 6.
- Agent tidak membuat sendiri aset gambar; ia hanya menyiapkan placeholder dan skrip pengecekan (ukuran, rasio, alpha, jumlah frame).

## 7. Struktur Folder Proyek yang Diusulkan

```
/
├─ public/
│  ├─ assets/{hero,showcase,spotlight,products,textures,ornaments,brand,og}
│  │  └─ showcase/m/            // 24 frame mobile
│  ├─ favicon.svg  robots.txt  sitemap.xml
├─ src/
│  ├─ main.tsx  App.tsx  routes.tsx
│  ├─ styles/{index.css, tokens.css}
│  ├─ components/
│  │  ├─ layout/{Header,Footer}.tsx
│  │  ├─ hero/{Hero,WeatherPanel,RainCanvas,StatPill,MiniCard}.tsx
│  │  ├─ showcase/{OutfitShowcase,FrameCanvas,AnnotationLayer,AnnotationLabel}.tsx
│  │  ├─ spotlight/{Spotlight,SpotlightInfo,SpotlightGallery,SpecTable}.tsx
│  │  ├─ catalog/{CatalogMarquee,MarqueeColumn,ProductCard}.tsx
│  │  ├─ sections/{HowToRent,WhyUs,Testimonials,Faq,ClosingCta}.tsx
│  │  └─ ui/{Button,NavBox,Pill,Tag,Accordion,Bracket}.tsx
│  ├─ data/{products.json, spotlight.json, annotations.json, faq.json, site.ts}
│  ├─ hooks/{useReducedMotion,useMediaQuery,useFramePreload}.ts
│  ├─ lib/{gsap.ts, lenis.ts, interpolate.ts, rain.ts}
│  └─ pages/{Landing,CatalogPlaceholder}.tsx
├─ docs/{PRD.md, plans/, asset-briefs/}   // plan dan brief aset tiap tahap
├─ scripts/{make-placeholders, check-assets}
├─ tailwind.config.ts  vite.config.ts  tsconfig.json
```

## 8. Tahapan Pengembangan

**Aturan untuk semua tahap (wajib bagi agent pelaksana):** *"Sebelum menulis kode, buat plan terlebih dahulu berisi daftar tugas, file yang akan dibuat/diubah, urutan kerja, risiko, dan kriteria selesai. Minta persetujuan saya atas plan, baru eksekusi."* Plan disimpan di `docs/plans/tahap-N.md`. Untuk tahap yang butuh aset, agent juga mengirim brief aset sesuai 6.8 dan menyimpannya di `docs/asset-briefs/tahap-N.md`.

### Tahap 0 — Setup Proyek

- **Instruksi agent:** buat plan lebih dulu (tugas, file, urutan, risiko, kriteria selesai) dan minta persetujuan sebelum eksekusi.
- **Tujuan:** fondasi proyek siap dipakai semua tahap berikutnya.
- **Deliverable:** proyek Vite + React + TS, Tailwind dengan design token (bagian 2), font self-host (Manrope, Saira Semi Condensed), struktur folder (bagian 7), React Router (`/`, `/katalog` placeholder), GSAP + ScrollTrigger + Lenis terintegrasi dan sinkron, hook `useReducedMotion`, skrip `make-placeholders` dan `check-assets`, ESLint/Prettier.
- **Definition of Done:** `npm run dev` dan `npm run build` sukses tanpa error; token terlihat di halaman uji; smooth scroll jalan dan mati saat reduced motion; font termuat.
- **Verifikasi:** build lokal, uji manual Chrome dan Safari, emulasi reduced motion, cek kontras token dengan alat kontras.

### Tahap 1 — Hero (Gambar 1)

- **Instruksi agent:** plan dulu (komponen, struktur layer headline berlapis, strategi canvas hujan, kebutuhan aset, risiko, kriteria selesai), kirim brief aset hero (6.2 dan 6.4), minta persetujuan, baru eksekusi dengan placeholder.
- **Tujuan:** hero yang meniru layout dan nuansa Gambar 1 sebagai hero rental outdoor.
- **Deliverable:** Header (kotak nav + menu mobile), `Hero`, `WeatherPanel` (3 slider + jeda), `RainCanvas`, `StatPill`, `MiniCard`, headline berlapis dengan mask, intro dan parallax, indikator scroll, transisi keluar ke Section 2.
- **Definition of Done:** layout setara Gambar 1 di 375/768/1280/1440 px; hujan berjalan mulus (≥ 55 fps desktop, ≥ 45 fps HP kelas menengah); slider mengubah hujan secara langsung; tombol jeda berfungsi; reduced motion mematikan hujan dan parallax; LCP ≤ 2,5 s di emulasi mobile.
- **Verifikasi:** perbandingan berdampingan dengan Gambar 1, Lighthouse mobile, panel Performance (tanpa long task), tes keyboard, tes di HP nyata bila ada.

### Tahap 2 — Outfit Showcase

- **Instruksi agent:** plan dulu dengan urutan: (1) pin + scrub canvas, (2) sistem anotasi, (3) klik ke katalog, (4) penyesuaian mobile; kirim brief aset pendaki 360° (6.3 dan 6.5), minta persetujuan, lalu eksekusi dengan placeholder.
- **Tujuan:** mekanisme interaksi utama berfungsi dengan aset placeholder.
- **Deliverable:** `OutfitShowcase`, `FrameCanvas`, `AnnotationLayer`, `annotations.json` (jendela sudut dari 6.3), preload bertahap, indikator derajat dan elips lantai, varian reduced-motion, perilaku mobile (24 frame).
- **Definition of Done:** rotasi maju-mundur mengikuti scroll tanpa patah; anotasi muncul/hilang pada jendela sudut yang benar; klik label ke `/katalog?kategori=...`; tidak ada tabrakan label di 375 px; area sentuh ≥ 44 px.
- **Verifikasi:** scroll cepat/lambat, loncat anchor, rotasi layar, emulasi reduced motion, uji di HP nyata minimal 1 Android dan 1 iOS bila ada.

### Tahap 3 — Spotlight Produk (Gambar 2)

- **Instruksi agent:** plan dulu (komponen, timeline transisi, snap, data `spotlight.json`, risiko, kriteria selesai), kirim brief aset Spotlight (6.2 dan 6.4), minta persetujuan, baru eksekusi dengan placeholder.
- **Tujuan:** section produk unggulan bergaya split layout dengan transisi antar produk.
- **Deliverable:** `Spotlight`, `SpotlightInfo`, `SpecTable`, `SpotlightGallery`, tombol prev/next dan penanda "01 / 04", varian mobile dan reduced-motion.
- **Definition of Done:** pin + snap per produk berjalan; transisi headline, cutout, angka, dan galeri sesuai 4.3; dapat dioperasikan dengan keyboard; mobile memakai swipe dan tombol; tanpa layout shift.
- **Verifikasi:** scroll cepat (snap tidak macet), tes keyboard, emulasi reduced motion, DevTools Performance.

### Tahap 4 — Katalog Grid

- **Instruksi agent:** plan dulu (komponen, mock data, strategi loop, risiko performa, kriteria selesai), kirim brief aset Katalog (6.2), minta persetujuan, lalu eksekusi.
- **Tujuan:** grid marquee 4 kolom berlawanan arah yang halus dan ringan.
- **Deliverable:** `ProductCard`, `MarqueeColumn`, `CatalogMarquee`, `products.json`, CTA "Lihat Semua Katalog", perilaku responsif 4/3/2 kolom.
- **Definition of Done:** loop tanpa lompatan; arah kolom sesuai spesifikasi; hover melambatkan di desktop; reduced motion = berhenti total; tidak ada layout shift.
- **Verifikasi:** amati 3 siklus loop, DevTools Performance (tanpa long task), tes keyboard, emulasi reduced motion.

### Tahap 5 — Section Pendukung dan Footer

- **Instruksi agent:** plan dulu; konfirmasi bagian mana dari usulan 4.5 yang dipakai berdasarkan data bisnis yang tersedia; minta persetujuan, lalu eksekusi.
- **Tujuan:** melengkapi alur halaman dari hero hingga footer.
- **Deliverable:** Cara Sewa, Kenapa Kami, Testimoni (bila data ada), FAQ aksesibel, CTA Penutup, Footer lengkap.
- **Definition of Done:** semua copy memakai data nyata atau **\[ISI NANTI\]**; responsif; sesuai token; tidak ada pola "grid ikon seragam".
- **Verifikasi:** pemeriksaan visual semua breakpoint, tes keyboard accordion, cek tautan.

### Tahap 6 — Integrasi Aset Final

- **Instruksi agent:** plan dulu (daftar aset, urutan penggantian, metode kalibrasi, risiko ukuran file), jalankan `check-assets` pada aset yang saya kirim, minta persetujuan, lalu eksekusi.
- **Tujuan:** menggantikan placeholder dengan aset final tanpa mengubah logika kode.
- **Deliverable:** frame final (desktop + mobile), subjek hero + mask, cutout dan galeri Spotlight, foto Katalog, OG image, favicon; `annotations.json` terkalibrasi per frame; laporan ukuran file.
- **Definition of Done:** anotasi menempel pada item di semua jendela sudut; headline berlapis di hero rapi di tepi subjek; total transfer sesuai target; tidak ada frame hilang atau duplikat.
- **Verifikasi:** flipbook cepat semua frame, uji tiap anotasi di 0°–360°, Lighthouse ulang.

### Tahap 7 — Polish dan QA

- **Instruksi agent:** plan dulu (daftar uji, matriks perangkat, risiko, kriteria selesai), minta persetujuan, lalu eksekusi.
- **Tujuan:** siap rilis dan lolos pemeriksaan "anti AI slop".
- **Deliverable:** perbaikan bug, penyetelan durasi/easing, SEO dasar (meta, OG, sitemap, data terstruktur), laporan Lighthouse, daftar uji perangkat/browser.
- **Definition of Done:** target performa dan aksesibilitas bagian 5 tercapai; tidak ada error konsol; seluruh checklist "Siap Rilis" tercentang.
- **Verifikasi:** Lighthouse mobile dan desktop, axe/WAVE, uji manual keyboard dan pembaca layar dasar, daftar periksa anti-slop (di bawah).

**Daftar periksa anti-slop:** tidak ada gradient ungu-biru atau mesh gradient; tidak ada ikon emoji dekoratif; tidak ada barisan 3 kartu seragam; copy tidak klise; warna sesuai token (`--api` dominan, `--cyan` hanya aksen kecil); panel HUD tidak lebih dari satu per section dan tanpa blur besar; tanpa shadow tebal; tidak ada logo, nama merek, foto, atau teks dari gambar referensi; setiap animasi punya fungsi; ada detail "buatan manusia" (garis penunjuk, node kotak, barcode, goresan hujan, grain).

### Checklist Siap Rilis

- [ ] Semua teks **\[ISI NANTI\]** telah diganti data final
- [ ] Lighthouse mobile Performance ≥ 85, Accessibility ≥ 95
- [ ] `prefers-reduced-motion` teruji di hero, showcase, spotlight, dan katalog
- [ ] Efek hujan berhenti di luar viewport dan saat tab tidak aktif
- [ ] Semua gambar beralt; tautan `/katalog` berfungsi
- [ ] Uji Chrome, Safari, Firefox, Edge, Android, iOS
- [ ] Meta, OG image, favicon, sitemap, robots terpasang
- [ ] Lisensi font, library, dan aset AI telah diperiksa
- [ ] Analitik dasar terpasang (klik katalog, klik WhatsApp) **\[ISI NANTI: alat\]**
- [ ] Domain dan hosting siap **\[ISI NANTI\]**

### Fase Berikutnya

1. Halaman Katalog (filter kategori, pencarian, ketersediaan tanggal)
2. Halaman detail produk (memakai pola Spotlight: spesifikasi, galeri, harga sewa)
3. Halaman Tas Perlengkapan (keranjang) dan checkout, mengikuti Gambar 3 (lihat Lampiran A)
4. Panel admin sederhana untuk produk dan stok
5. Halaman S&K, kebijakan privasi, blog/panduan pendakian
6. Pengembangan opsional: model 3D interaktif, bundel paket sewa

## 9. Risiko & Pertanyaan Terbuka

### Risiko

| Risiko | Dampak | Mitigasi |
| --- | --- | --- |
| Karakter tidak konsisten antar frame | Rotasi terlihat "melompat" | Alur video turntable/foto nyata; setujui 8 sudut kunci dulu; flipbook QA; mulai dari 24 frame |
| Total ukuran frame terlalu besar | Performa mobile turun | Varian 24 frame untuk mobile, WebP alpha, preload bertahap |
| Tepi cutout kotor (halo putih) di atas oranye | Hero dan showcase tampak murahan | Cek semua cutout di latar `--api`; bersihkan tepi; verifikasi di Tahap 6 |
| Hero berat (hujan canvas + parallax + headline berlapis) | Jank di HP kelas menengah | Partikel dibatasi, berhenti di luar viewport, anggaran 2 ms/frame, fallback statis |
| Dua section pin berurutan (Showcase dan Spotlight) di iOS Safari | Scroll patah | Uji perangkat nyata sejak Tahap 2; Lenis nonaktif di layar sentuh; snap lebih longgar di mobile |
| Label anotasi bertabrakan di layar kecil | UX buruk | Jalur kiri/kanan, batas 2–3 label, penundaan tampil |
| Putih di atas oranye jenuh berkontras rendah | Teks kecil gagal WCAG AA | Putih hanya untuk teks besar; teks kecil memakai `--hitam`; ritme latar bergantian dengan `--hitam` dan `--putih` |
| Meniru gambar referensi terlalu persis | Masalah hak cipta dan merek | Hanya mengambil gaya; logo, foto, dan teks referensi tidak dipakai |
| Gambar referensi masih bertambah | Struktur section bisa berubah | PRD direvisi tiap gambar baru; tiap section dibuat modular |
| SEO SPA terbatas | Kurang terindeks | Prerender di Tahap 7 bila perlu |
| Lisensi GSAP, font, dan aset AI | Masalah hukum/komersial | Periksa lisensi sebelum rilis |

### Pertanyaan Terbuka (semua **\[ISI NANTI\]**)

1. Nama brand, logo, dan tagline
2. Daftar kategori final dan slug katalog (jaket, tenda, carrier, sepatu, kompor, dll.)
3. Harga sewa/hari tiap produk (untuk label, kartu, dan Spotlight)
4. Daftar item outfit final pada pendaki 360° dan 4–5 produk Spotlight beserta 5 spesifikasi tiap produk
5. Nomor WhatsApp, email, alamat, jam operasional, akun media sosial
6. Mekanisme sewa nyata: ambil di tempat/antar, jaminan, denda, pembatalan
7. Testimoni dan klaim keunggulan yang dapat dibuktikan
8. Teks Syarat dan Ketentuan Sewa
9. Alat analitik, domain, dan hosting
10. Generator AI yang akan dipakai (menentukan alur 6.5)
11. Pilihan headline hero (A atau B) dan copy final
12. Apakah efek "Uji Cuaca" (hujan interaktif) di hero dipertahankan (rekomendasi: ya) dan teks label simulasinya
13. Apakah halaman Tas Perlengkapan dan checkout (Gambar 3) masuk scope sekarang (default: tidak, fase berikutnya)
14. Gambar referensi berikutnya: section apa lagi yang akan ditambahkan dan urutannya

## Lampiran A — Referensi Halaman Tas Perlengkapan dan Checkout (Gambar 3, fase berikutnya)

Halaman ini **tidak dibangun sekarang**. Layout dicatat agar token dan komponen tahap ini sudah siap dipakai nanti.

- **Dua kolom:** kiri `--api` (±62%) berisi daftar tas, kanan `--putih` (±38%) berisi form checkout.
- **Kolom kiri:** judul "tas perlengkapan" dengan penanda jumlah, kalimat pembuka singkat, header kolom uppercase kecil (Perlengkapan, Jumlah, Total), lalu baris item bergaris 1 px: thumbnail cutout, nama, varian/ukuran, harga per hari, stepper jumlah berbentuk kotak, total baris, dan tombol hapus. Di bawahnya ringkasan subtotal, biaya antar, dan total besar.
- **Kolom kanan:** judul "checkout" dengan ikon gembok, field (nama lengkap, nomor telepon, email, metode pembayaran berupa dropdown), pilihan metode pengambilan berupa kartu radio (ambil di toko / antar ke alamat), dan tombol checkout `--api` selebar kolom berisi total dan panah.
- **Penyesuaian untuk rental:** tanggal mulai dan selesai sewa, durasi (hari) per item, jaminan/deposit **\[ISI NANTI\]**, alamat bila diantar, metode pembayaran **\[ISI NANTI\]**, harga dalam Rupiah.
- **Animasi:** baris item masuk bergantian (300 ms, jeda 80 ms), total menghitung naik saat jumlah atau durasi berubah, kartu radio terpilih memakai outline `--api`.
