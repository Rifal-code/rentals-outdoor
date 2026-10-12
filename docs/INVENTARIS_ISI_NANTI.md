# Inventarisasi Data Bisnis `[ISI NANTI]` — Panduan Peluncuran

Dokumen ini memuat seluruh data placeholder bertanda **`[ISI NANTI]`** yang ada dalam kode sumber landing page. Sebelum website diluncurkan ke domain produksi, ganti nilai-nilai di bawah ini dengan data bisnis resmi.

---

## 1. Identitas Brand & Kontak Utama
| Item | Lokasi Kode / File | Contoh / Rekomendasi Nilai | Status |
|---|---|---|---|
| **Nama Brand** | `index.html`, `Header.tsx`, `Footer.tsx` | "SUMMIT RENTAL", "ALPEN GEAR" | Menunggu data |
| **Nomor WhatsApp Bisnis** | `Header.tsx`, `ClosingCta.tsx`, `Footer.tsx` | `https://wa.me/6281234567890?text=Halo%20saya%20mau%20sewa` | Menunggu nomor |
| **Email Resmi** | `Footer.tsx`, `index.html` | `halo@namabrand.com` | Menunggu email |
| **Alamat Toko Fisik** | `Footer.tsx`, `index.html` (JSON-LD) | Jl. Kaliurang KM 9, Sleman, Yogyakarta | Menunggu alamat |
| **Jam Operasional** | `Footer.tsx`, `index.html` (JSON-LD) | Setiap Hari: 08:00 – 21:00 WIB | Menunggu jadwal |
| **Akun Media Sosial** | `Footer.tsx` | Instagram: `@namabrand`, TikTok: `@namabrand` | Menunggu handle |

---

## 2. Domain & SEO
| Item | Lokasi Kode / File | Keterangan |
|---|---|---|
| **Domain Resmi** | `index.html`, `public/robots.txt`, `public/sitemap.xml` | Ganti `https://[ISI NANTI: domain]/` dengan domain asli (contoh: `https://summitgear.id/`) |
| **Google Analytics / Tracking** | `index.html` | Pasang tag GA4 atau Meta Pixel jika analitik sudah disiapkan |

---

## 3. Tarif Sewa Produk (Spotlight & Katalog)

### A. Produk Unggulan Spotlight (`src/data/spotlight.json`)
| ID Produk | Nama Produk | Slug | Tarif Default di Kode | Tarif Resmi / Hari |
|---|---|---|---|---|
| `prod-jaket` | Shadow Falcon 750 | `jaket-hardshell-shadow` | `[ISI NANTI]` | Rp ... / hari |
| `prod-carrier` | Alpine Shield 60 | `carrier-alpine-60` | `[ISI NANTI]` | Rp ... / hari |
| `prod-tenda` | Storm Veil 2P | `tenda-storm-veil-2p` | `[ISI NANTI]` | Rp ... / hari |
| `prod-sepatu` | Summit Trek GTX | `sepatu-summit-gtx` | `[ISI NANTI]` | Rp ... / hari |

### B. Produk Marquee Katalog (`src/data/catalog.json`)
Seluruh 16 produk katalog di `src/data/catalog.json` saat ini sudah dilengkapi estimasi harga sewa wajar (mulai dari Rp 25.000 hingga Rp 85.000 per hari). Sesuaikan angka-angka tersebut jika tarif sewa di toko Anda berbeda.

---

## 4. Alur & Ketentuan Sewa (`src/data/faq.json` & `HowToRent.tsx`)
- Pastikan ketentuan deposit jaminan (KTP/SIM asli) dan denda keterlambatan di `src/data/faq.json` sudah sesuai dengan SOP operasional toko Anda.
- Jika ada nomor rekening atau payment gateway resmi, cantumkan saat konfirmasi booking via WhatsApp.

---

## 5. Integrasi Aset Gambar Final
Gunakan skrip otomatis yang telah disediakan:
```bash
# Salin aset final ke folder staging
mkdir incoming-assets

# Jalankan skrip swap otomatis
npm run swap:assets ./incoming-assets

# Verifikasi integritas aset
npm run check:assets
```
