# Plan Tahap 6 — Integrasi Aset Final

## 1. Ringkasan & Tujuan
Tahap ini bertujuan mempersiapkan infrastruktur penggantian aset placeholder dengan aset final **tanpa mengubah logika kode komponen**. Karena aset final (foto subjek hero, 48 frame 360°, cutout spotlight, foto katalog) belum tersedia dari Anda, tahap ini difokuskan pada:

1. **Memperkuat skrip `check-assets.mjs`** agar dapat memvalidasi format, rasio, alpha channel, dan batas ukuran file secara menyeluruh saat aset final dikirim.
2. **Membuat skrip `swap-assets.mjs`** untuk memverifikasi bahwa setiap file pengganti memiliki nama, format, dan dimensi yang tepat sebelum menimpa placeholder.
3. **Mendokumentasikan prosedur penggantian aset** sehingga saat Anda mengirim aset final, proses integrasi tinggal menjalankan skrip tanpa sentuhan kode.
4. **Menghapus `DevTestbed`** dari halaman Landing (sudah tidak diperlukan setelah Tahap 5 selesai).

---

## 2. Daftar Tugas
1. **Perbarui `scripts/check-assets.mjs`**: Tambahkan validasi dimensi (rasio aspek 4:5, 3:4, 1:1), deteksi alpha channel pada file PNG, dan laporan ringkasan ukuran total aset.
2. **Buat `scripts/swap-assets.mjs`**: Skrip yang menerima path folder sumber aset final, mencocokkan nama file dengan daftar yang diharapkan, memvalidasi format/dimensi, lalu menyalin ke `public/assets/` menimpa placeholder.
3. **Bersihkan Landing.tsx**: Hapus import dan penyematan `DevTestbed` sementara dari halaman utama.
4. **Hapus `src/pages/DevTestbed.tsx`**: File smoke test tidak lagi diperlukan dalam build produksi.
5. **Jalankan `npm run build`** dan verifikasi bahwa landing page lengkap berjalan tanpa error.

---

## 3. File yang Dibuat / Diubah
- `scripts/check-assets.mjs` (diperbarui: validasi dimensi & ringkasan ukuran)
- `scripts/swap-assets.mjs` (baru: skrip penggantian aset)
- `src/pages/Landing.tsx` (diperbarui: hapus DevTestbed)
- `src/pages/DevTestbed.tsx` (dihapus)

---

## 4. Kriteria Selesai (Definition of Done Tahap 6)
- [ ] `scripts/check-assets.mjs` memvalidasi format, rasio, alpha, dan ukuran file.
- [ ] `scripts/swap-assets.mjs` tersedia dan terdokumentasi cara penggunaannya.
- [ ] `DevTestbed` telah dihapus dari Landing dan build produksi.
- [ ] `npm run build` sukses tanpa error TypeScript.
- [ ] Landing page berjalan utuh tanpa error konsol.

---

## 5. Catatan Penting: Aset Final Belum Tersedia
Saat Anda telah memproduksi aset final (menggunakan generator AI atau foto sungguhan), Anda cukup:
1. Letakkan file-file ke dalam folder sementara (misalnya `incoming-assets/`).
2. Jalankan `node scripts/swap-assets.mjs ./incoming-assets`.
3. Skrip akan memvalidasi dan menimpa placeholder secara otomatis.
4. Jalankan `node scripts/check-assets.mjs` untuk konfirmasi akhir.
5. Kalibrasi posisi anotasi di `src/data/annotations.json` menggunakan inspeksi visual per frame (flipbook).
