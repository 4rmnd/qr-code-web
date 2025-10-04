# Generator Kode QR Modern

Aplikasi web yang elegan dan ramah pengguna untuk membuat kode QR yang dapat disesuaikan untuk berbagai keperluan. Dibangun dengan React, TypeScript, dan Tailwind CSS.

## ✨ Fitur

- **Beragam Tipe QR**: Buat kode QR untuk URL, jaringan WiFi, lokasi, pesan WhatsApp, email, dan file
- **Kustomisasi Menarik**: Personalisasi kode QR Anda dengan warna, gradien, dan logo
- **Integrasi Logo**: Tambahkan logo media sosial populer atau unggah logo kustom Anda sendiri
- **Unduhan Berkualitas Tinggi**: Ekspor kode QR Anda dalam format PNG, SVG, PDF, atau JPEG dengan berbagai ukuran
- **Pratinjau Langsung**: Lihat kode QR Anda diperbarui secara instan saat Anda membuat perubahan
- **Responsif Mobile**: Berfungsi sempurna di semua perangkat

## 🛠️ Struktur Proyek

```
qr-code-web/
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── postcss.config.js
├── src/
│   ├── App.tsx                  # Komponen aplikasi utama
│   ├── components/              # Komponen UI
│   │   ├── QRCodePreview.tsx    # Tampilan pratinjau kode QR
│   │   ├── QRDataInput.tsx      # Kolom input untuk data QR
│   │   ├── QRDownload.tsx       # Opsi unduhan untuk kode QR
│   │   ├── QRStyleCustomizer.tsx # Kustomisasi gaya QR
│   │   └── QRTypeSelector.tsx   # Pemilihan tipe QR
│   ├── index.css                # Gaya global
│   ├── main.tsx                 # Titik masuk
│   ├── styles/                  # Gaya tambahan
│   ├── types/                   # Definisi tipe TypeScript
│   │   └── qr.ts               # Tipe terkait kode QR
│   ├── utils/                   # Fungsi utilitas
│   │   ├── countryCodes.ts      # Kode negara untuk nomor telepon
│   │   ├── qrGenerator.ts       # Logika pembuatan kode QR
│   │   └── validation.ts        # Validasi input
│   └── vite-env.d.ts           # Tipe lingkungan Vite
├── tailwind.config.js          # Konfigurasi Tailwind CSS
├── tsconfig.app.json           # Konfigurasi TypeScript untuk aplikasi
├── tsconfig.json               # Konfigurasi TypeScript utama
├── tsconfig.node.json          # Konfigurasi TypeScript untuk Node
└── vite.config.ts              # Konfigurasi Vite
```

## 🔧 Memulai

### Prasyarat

- Node.js (v14 atau lebih tinggi)
- npm atau yarn

### Instalasi

1. Klon repositori
   ```bash
   git clone https://github.com/4rmnd/qr-code-web.git
   cd qr-code-web
   ```

2. Instal dependensi
   ```bash
   npm install
   # atau
   yarn
   ```

3. Mulai server pengembangan
   ```bash
   npm run dev
   # atau
   yarn dev
   ```

4. Buka browser Anda dan navigasikan ke `http://localhost:5173`

## 🎨 Penggunaan

1. Pilih jenis kode QR yang ingin Anda buat
2. Isi informasi yang diperlukan
3. Sesuaikan tampilan kode QR Anda
4. Unduh kode QR Anda dalam format yang Anda inginkan

## 🧑‍💻 Tech Stack

- **React**: Pustaka UI
- **TypeScript**: Keamanan tipe
- **Tailwind CSS**: Styling
- **Vite**: Build tool
- **qrcode.react**: Pembuatan kode QR
- **Framer Motion**: Animasi

## 👤 Penulis

- GitHub: [@4rmnd](https://github.com/4rmnd)

## 🤝 Kontribusi

Kontribusi, masalah, dan permintaan fitur sangat disambut!

1. Fork proyek
2. Buat branch fitur Anda (`git checkout -b feature/fitur-keren`)
3. Commit perubahan Anda (`git commit -m 'Menambahkan fitur keren'`)
4. Push ke branch (`git push origin feature/fitur-keren`)
5. Buka Pull Request

## 🙏 Terima Kasih

Terima kasih telah menggunakan atau berkontribusi pada proyek ini. Semoga bermanfaat!