# Next.js Product Catalog & Sandbox Checkout

Aplikasi e-commerce sederhana berbasis **Next.js (App Router)** dengan database **MongoDB Atlas** dan simulasi pembayaran nyata menggunakan **Payment Gateway Sandbox**. Proyek ini dibangun sebagai latihan *full-stack* mulai dari katalog produk, pencarian, detail produk, hingga alur transaksi dan *webhook* pembayaran.

## Fitur Utama
- **Katalog Produk Real-Time:** Mengambil daftar produk langsung dari MongoDB.
- **Pencarian & Filter Kategori:** Pencarian produk berbasis URL query params (`?q=...&category=...`).
- **Halaman Detail Produk:** Menampilkan spesifikasi, sisa stok, dan pemilih jumlah pembelian.
- **Guest Checkout & Payment Gateway Sandbox:** Pembuatan pesanan dengan validasi harga di sisi server serta pembaruan status transaksi otomatis melalui *webhook*.

## Tech Stack
- **Framework:** Next.js (App Router), TypeScript, Tailwind CSS
- **Database:** MongoDB Atlas & Mongoose
- **Payment Gateway:** Midtrans Sandbox
- **Workflow:** Git, GitHub CLI (`gh`), Pull Request per fitur

## Cara Menjalankan di Lokal

1. **Clone repository:**
   ```bash
   git clone [https://github.com/](https://github.com/)fengliuz/next-web-app1.git
   cd next-web-app1