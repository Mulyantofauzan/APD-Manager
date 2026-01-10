# APD Manager V3

Aplikasi pengelolaan Alat Pelindung Diri (APD) modern yang responsif dan dapat diakses offline.

## Fitur Utama

✅ **SPA & PWA** - Single Page Application dengan dukungan Progressive Web App
✅ **Responsive Design** - Optimal untuk desktop, tablet, dan mobile
✅ **Modern UI** - Antarmuka yang eye-catching dengan Tailwind CSS
✅ **Authentication** - Login dengan Google OAuth + Whitelist
✅ **Role-Based Access** - Admin, Management, User
✅ **Dashboard Statistik** - Visualisasi data APD dan transaksi
✅ **Master APD & Stock** - Kelola data APD dan inventory
✅ **Data Karyawan** - Manajemen data karyawan
✅ **Transaksi APD** - Multi-APD transaction management
✅ **Tracking** - Tanggal produksi, serial number, batch number
✅ **Pemusnahan** - Kelola APD yang rusak atau hilang
✅ **BA & PDF** - Generate laporan untuk rusak/hilang
✅ **Email Reminder** - Notifikasi APD < 60 hari
✅ **Mobile Offline** - Berfungsi offline dengan service worker

## Tech Stack

- **Frontend Framework**: React 19 + Vite
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **PWA**: Vite Plugin PWA
- **Icons**: Lucide React
- **Charts**: Recharts
- **Date Utility**: date-fns

## Quick Start

```bash
npm install
npm run dev
```

Server berjalan di http://localhost:5173

## Build

```bash
npm run build
npm run preview
```

## Struktur Project

```
src/
├── components/   # Reusable components (Button, Input, Card, etc)
├── pages/        # Page components (Dashboard, Login, etc)
├── layouts/      # Layout components (MainLayout, etc)
├── services/     # API services
├── store/        # Zustand state management
├── constants/    # Configuration
├── styles/       # Global styles
└── utils/        # Utility functions
```

## Key Features

- Google OAuth authentication dengan whitelist
- Role-based access control (Admin, Management, User)
- Responsive mobile-first design
- PWA support (offline, installable)
- Real-time notifications
- PDF generation
- Stock tracking
- Employee management
- APD transaction history
- Destruction records

## Environment Setup

Buat file `.env.local`:

```
VITE_API_URL=http://localhost:3001/api
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

## Dokumentasi API

Lihat dokumentasi API di backend untuk endpoint yang tersedia.

---

**Aplikasi Pengelolaan APD Modern & Responsive**
