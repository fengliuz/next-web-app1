# AGENTS.md — Panduan Workspace & Workflow Git

## 1. Gambaran Proyek
Aplikasi katalog produk, pencarian, detail produk, dan guest checkout menggunakan **Next.js (App Router, TypeScript, Tailwind CSS)**, **MongoDB Atlas (Mongoose)**, dan **Payment Gateway Sandbox**.

## 2. Aturan Arsitektur & Kode
- **Database Asli:** Jangan pernah menggunakan data produk hardcode/mock di frontend. Seluruh data produk dan pesanan harus diambil dari atau disimpan ke MongoDB.
- **Keamanan Server-Side:** Koneksi database (`MONGODB_URI`) dan secret key payment gateway hanya boleh berjalan di server (Server Components, Route Handlers, atau Server Actions).
- **Validasi Harga:** Hitung ulang subtotal dan `totalAmount` di server berdasarkan harga produk di MongoDB saat proses checkout.
- **Tanpa Login Dulu:** Gunakan alur Guest Checkout untuk versi awal; jangan menambahkan sistem autentikasi kecuali diminta secara eksplisit.
- **Hemat Konteks:** Fokus hanya pada file yang relevan dengan tugas saat ini. Jangan melakukan refactor besar di luar cakupan fitur yang diminta.

## 3. Aturan Wajib Git & Pull Request (GitHub CLI)
Setiap kali diminta mengerjakan fitur atau perbaikan baru, ikuti urutan Git berikut secara ketat:
1. **Jangan commit langsung ke branch `main`.**
2. Pastikan berada di branch `main` terbaru (`git checkout main && git pull origin main`), lalu buat branch baru sesuai jenis tugas:
   - Fitur baru: `git checkout -b feat/<nama-fitur-singkat>`
   - Perbaikan bug: `git checkout -b fix/<nama-fix-singkat>`
3. Kerjakan kode dan pastikan tidak ada error TypeScript/build (`bun run lint` atau `bun run build` jika relevan).
4. Lakukan stage dan commit dengan pesan yang jelas (*Conventional Commits*):
   - Contoh: `git add . && git commit -m "feat: add product catalog and search filter"`
5. Push branch ke remote repository:
   - `git push -u origin <nama-branch>`
6. Buat Pull Request otomatis ke `main` menggunakan GitHub CLI (`gh`):
   ```bash
   gh pr create --base main --head <nama-branch> --title "<judul-pr>" --body "## Ringkasan Perubahan\n- ...\n\n## Cara Uji\n- ..."