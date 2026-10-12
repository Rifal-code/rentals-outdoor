# Plan Tahap 4 — Cuplikan Katalog Grid (Marquee 4 Kolom)

## 1. Ringkasan & Tujuan
Tahap ini bertujuan mengimplementasikan Section 4 (**Cuplikan Katalog**) dengan tampilan grid bergerak (*vertical marquee*) 4 kolom berlawanan arah yang ringan dan halus di atas latar `--hitam` (`#0F0F0F`). Marquee dibangun menggunakan CSS animasi murni (`translateY loop` dengan duplikasi konten) untuk efisiensi CPU/GPU, batas atas dan bawah bergradien pudar (*gradient mask*), efek melambat saat kolom di-hover, serta tombol CTA besar pill `--api` menuju `/katalog`.

---

## 2. Daftar Komponen & File yang Dibuat / Diubah

### File Baru:
- `src/components/catalog/ProductCard.tsx`: Komponen kartu produk kotak tanpa radius dengan garis tepi 1px `--abu`, foto produk 4:5 di latar gelap netral, nama produk huruf kecil (`Manrope 700`), badge kategori & harga sewa `--api` (`Saira HUD`), tautan fokus keyboard aktif dengan outline hover `--api`.
- `src/components/catalog/MarqueeColumn.tsx`: Kolom vertikal independen dengan durasi putaran unik (60s, 72s, 66s, 80s) dan arah gerak bergantian (atas $\rightarrow$ bawah vs bawah $\rightarrow$ atas), duplikasi daftar kartu untuk infinite loop mulus, serta penanganan jeda hover & fokus keyboard.
- `src/components/catalog/CatalogMarquee.tsx`: Kontainer utama Section 4 (tinggi ±90vh, latar `--hitam`, mask gradien atas & bawah, responsif 4 kolom desktop / 3 kolom tablet / 2 kolom mobile, tombol CTA besar *"LIHAT SEMUA KATALOG"*).
- `docs/plans/tahap-4.md`: Dokumen rencana kerja Tahap 4.
- `docs/asset-briefs/tahap-4.md`: Dokumen brief kebutuhan aset Tahap 4.

### File yang Dimodifikasi:
- `src/pages/Landing.tsx`: Menyematkan `CatalogMarquee` setelah `Spotlight`.

---

## 3. Urutan Kerja Eksekusi
1. **Komponen Kartu Produk (`ProductCard.tsx`)**:
   - Format: Rasio foto 4:5, tanpa border radius (`--r-box: 0`), border 1px `--abu` (`#8C8C8C`).
   - Tipografi: Nama produk (Manrope 700, lowercase), kategori & tarif harian (Saira HUD uppercase, nominal harga `--api`).
   - Aksesibilitas: Tautan aktif ke `/katalog?kategori=<slug>`, fokus keyboard terlihat jelas (`outline: 2px solid var(--cyan)`).
2. **Kolom Marquee Vertikal (`MarqueeColumn.tsx`)**:
   - Implementasi CSS keyframe animation murni (`translateY` 0% $\rightarrow$ -50% atau -50% $\rightarrow$ 0%).
   - Pembagian arah gerak: Kolom 1 (atas $\rightarrow$ bawah), Kolom 2 (bawah $\rightarrow$ atas), Kolom 3 (atas $\rightarrow$ bawah), Kolom 4 (bawah $\rightarrow$ atas).
   - Variasi kecepatan organik: 60s, 72s, 66s, 80s agar ritme visual terasa alami dan tidak monoton.
   - Efek hover: `animation-play-state: paused` (atau melambat perlahan) saat kolom disentuh kursor di desktop.
3. **Kontainer Utama Katalog & Gradient Mask (`CatalogMarquee.tsx`)**:
   - Latar belakang penuh `--hitam` (`#0F0F0F`).
   - Header editorial: headline kecil uppercase *"KATALOG PERLENGKAPAN"* dan judul huruf kecil raksasa *"semua alat yang kamu butuhkan ada di sini."*
   - Masking gradien atas dan bawah menggunakan CSS `mask-image: linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)` sehingga kartu masuk dan keluar secara pudar tanpa garis terpotong tajam.
   - Tombol CTA besar di bawah grid: pill `--api` berteks `--hitam`, hover berubah ke `--putih` menuju `/katalog`.
4. **Optimasi Performa & Aksesibilitas**:
   - Integrasi event `visibilitychange`: otomatis menjeda loop animasi saat tab browser tidak aktif.
   - Pada `prefers-reduced-motion`: seluruh kolom marquee berhenti total; konten disajikan sebagai grid statis yang dapat di-scroll normal.
   - Responsivitas layout: 4 kolom (desktop ≥1024px), 3 kolom (tablet 768–1023px), 2 kolom (mobile <768px).

---

## 4. Risiko & Mitigasi
- **Risiko Beban Layout Reflow pada Animasi Marquee**:
  - *Mitigasi*: Animasi HANYA menggunakan properti `transform: translateY(...)` dan `will-change: transform` pada layer terisolasi untuk memastikan compositing berjalan langsung di GPU tanpa layout shift (CLS = 0).
- **Risiko Tabrakan Loop (*Jumping / Glitch*)**:
  - *Mitigasi*: Duplikasi array data produk secara presisi (2 set data identik) sehingga pergeseran -50% menyambung mulus 100% tanpa lompatan frame.
- **Risiko Aksesibilitas Keyboard**:
  - *Mitigasi*: Saat tombol Tab keyboard memfokus salah satu kartu, kolom tersebut otomatis menghentikan animasi (`:focus-within { animation-play-state: paused; }`) agar pengguna dapat membaca dan memilih kartu dengan nyaman.

---

## 5. Kriteria Selesai (Definition of Done Tahap 4)
- [ ] 4 kolom marquee vertikal berjalan mulus dengan arah bergantian di latar `--hitam`.
- [ ] Batas atas dan bawah grid memudar secara halus menggunakan gradien masker ke `--hitam`.
- [ ] Kolom berhenti/melambat saat di-hover kursor atau saat kartu di dalamnya difokus via keyboard.
- [ ] Ke-16 produk dari `products.json` terdistribusi rapi ke dalam kolom-kolom marquee.
- [ ] Tombol CTA besar *"LIHAT SEMUA KATALOG"* bernavigasi ke rute `/katalog`.
- [ ] Pada `prefers-reduced-motion`, seluruh animasi berhenti dan grid tampil statis.
- [ ] `npm run build` sukses tanpa error TypeScript.
