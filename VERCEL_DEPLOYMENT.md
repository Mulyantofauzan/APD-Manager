# Vercel Deployment Guide - APD Manager

Panduan lengkap untuk deploy APD Manager ke Vercel dengan Vercel API Routes untuk backend.

## 📋 Arsitektur

```
┌─────────────────────────────────────────────────────────────┐
│                     Vercel Platform                          │
├─────────────────────────────────────────────────────────────┤
│  Frontend (React + Vite)  │  Backend (Vercel API Routes)    │
│  - Pages auto-deploy       │  - JavaScript serverless funcs  │
│  - dist/ folder            │  - /api/auth/login              │
│                            │  - /api/auth/me                 │
└─────────────────────────────────────────────────────────────┘
         │                              │
         │ CORS-enabled                 │
         │ HTTP/HTTPS                   │ JWT Auth
         │                              │
┌─────────────────────────────────────────────────────────────┐
│              External Services                              │
├─────────────────────────────────────────────────────────────┤
│  - Cloudflare D1 Database (future integration)              │
│  - Environment Variables (JWT_SECRET)                        │
└─────────────────────────────────────────────────────────────┘
```

## 🚀 Quick Start - Development

### 1. Setup Environment

```bash
# Create .env.local file (already created)
cp .env.example .env.local
```

**Konten .env.local:**
```
VITE_API_URL=http://localhost:3000/api
JWT_SECRET=dev-secret-key-minimum-32-characters-long-for-testing!!!
NODE_ENV=development
```

### 2. Run Dev Servers (2 Terminal)

**Terminal 1 - API Server:**
```bash
node vercel-dev-server.js
```

Output:
```
✅ Dev server running on http://localhost:3000
📝 API endpoints:
   POST   http://localhost:3000/api/auth/login
   GET    http://localhost:3000/api/auth/me

💡 Test credentials:
   Email: admin@apd.com
   Password: Admin123!
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

Output akan menampilkan localhost URL untuk Vite dev server (biasanya http://localhost:5173)

### 3. Test Login Flow

**Via curl:**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@apd.com","password":"Admin123!"}'
```

**Response (Success):**
```json
{
  "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "admin@apd.com",
    "nama": "Administrator",
    "role": "admin"
  }
}
```

**Via Browser:**
1. Open http://localhost:5173 (Frontend)
2. Enter credentials:
   - Email: admin@apd.com
   - Password: Admin123!
3. Click "Masuk"
4. Should redirect to /dashboard

## 🔧 API Routes Structure

```
api/
├── auth/
│   ├── login.js        # POST /api/auth/login
│   └── me.js           # GET /api/auth/me
├── middleware/
│   ├── auth.js         # JWT verification
│   └── cors.js         # CORS handling
└── utils/
    ├── jwt.js          # Token generation/verification
    └── password.js     # Password hashing (PBKDF2)
```

### API Endpoints

#### POST /api/auth/login
Login dengan email dan password.

**Request:**
```json
{
  "email": "admin@apd.com",
  "password": "Admin123!"
}
```

**Response (200):**
```json
{
  "authToken": "JWT_TOKEN_HERE",
  "user": {
    "id": 1,
    "email": "admin@apd.com",
    "nama": "Administrator",
    "role": "admin"
  }
}
```

**Errors:**
- `400` - Email atau password kosong
- `401` - Email atau password salah
- `403` - Akun tidak aktif
- `500` - Server error

#### GET /api/auth/me
Get info user yang sedang login. Memerlukan Authorization header.

**Headers:**
```
Authorization: Bearer <JWT_TOKEN>
```

**Response (200):**
```json
{
  "id": 1,
  "email": "admin@apd.com",
  "role": "admin"
}
```

**Errors:**
- `401` - Token tidak valid atau kadaluarsa

## 🔐 Security Features

### 1. Password Hashing
- **Algorithm**: PBKDF2 dengan SHA-256
- **Iterations**: 100,000
- **Salt**: 32 bytes random
- **Format**: `salt:hash`

### 2. JWT Token
- **Secret**: Dari environment variable `JWT_SECRET`
- **Expiration**: 7 hari
- **Algorithm**: HS256
- **Headers**: `Authorization: Bearer <token>`

### 3. CORS Configuration
```javascript
Allowed Origins:
  - http://localhost:3000
  - http://localhost:5173
  - http://localhost:5174
  - https://apd-manager.vercel.app
  - https://<VERCEL_URL>
```

### 4. Password Requirements
- Minimal 8 karakter
- Harus mengandung minimal 1 huruf besar (A-Z)
- Harus mengandung minimal 1 huruf kecil (a-z)
- Harus mengandung minimal 1 angka (0-9)

## 📦 Deployment ke Vercel

### 1. Prerequisites
- GitHub account dengan repo APD-Manager
- Vercel account (gratis)
- Akses git push ke GitHub

### 2. Connect GitHub ke Vercel

1. Go to https://vercel.com/dashboard
2. Click "New Project"
3. Select "Import Git Repository"
4. Search dan select "Mulyantofauzan/APD-Manager"
5. Click "Import"

### 3. Configure Project

**Build Settings:**
- Framework: Vite
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

**Environment Variables:**
Tambahkan di Project Settings > Environment Variables:

```
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters-long!!!
VITE_API_URL=https://apd-manager.vercel.app/api
```

### 4. Deploy

1. Click "Deploy"
2. Tunggu build selesai (~2-3 menit)
3. Vercel akan otomatis deploy setiap push ke main branch

**Vercel URLs:**
- Frontend: `https://apd-manager.vercel.app`
- API: `https://apd-manager.vercel.app/api/auth/login`

### 5. Auto-Deployment

Setiap kali push ke main branch:
```bash
git add .
git commit -m "Your message"
git push origin main
```

Vercel akan otomatis:
1. Build project (`npm run build`)
2. Upload ke CDN
3. Deploy dalam hitungan detik

## 🔗 Integration dengan Cloudflare D1 (Future)

Saat ini, user data disimpan hardcoded di `api/auth/login.js`. Untuk production dengan database:

1. Setup Cloudflare D1 database
2. Update `api/auth/login.js` untuk query database
3. Set `D1_DATABASE_ID` di environment variables
4. Deploy ulang

```javascript
// Contoh future implementation
import { sql } from '@cloudflare/d1';

const user = await env.DB.prepare(
  'SELECT * FROM users WHERE email = ?'
).bind(email).first();
```

## 📊 Frontend Configuration

File: `src/constants/config.js`

```javascript
export const API_BASE_URL = import.meta.env.VITE_API_URL
  || 'http://localhost:3000/api';
```

Frontend otomatis menggunakan:
- **Development**: `http://localhost:3000/api`
- **Production**: `https://apd-manager.vercel.app/api`

## 🧪 Testing Checklist

- [ ] Login form bisa diakses di `/`
- [ ] Login dengan admin@apd.com / Admin123! berhasil
- [ ] JWT token tersimpan di localStorage
- [ ] Redirect ke /dashboard setelah login
- [ ] GET /api/auth/me mengembalikan user info
- [ ] Logout menghapus token dan redirect ke login
- [ ] CORS error tidak muncul
- [ ] Password validation berfungsi

## 🐛 Troubleshooting

### "Internal server error" saat login
1. Check `vercel-dev-server.js` berjalan
2. Check `.env.local` memiliki `JWT_SECRET`
3. Check request body JSON valid

### "Cannot find module" error
1. Run `npm install`
2. Pastikan semua `.js` files menggunakan `import/export`

### CORS error di frontend
1. Check `api/middleware/cors.js` origin list
2. Add localhost URL ke allowed origins
3. Restart dev server

### Token expired
- JWT expire dalam 7 hari
- User harus login lagi

## 📝 File Structure

```
APD-Manager/
├── api/                          # Vercel API Routes
│   ├── auth/
│   │   ├── login.js              # Login endpoint
│   │   └── me.js                 # Get current user
│   ├── middleware/
│   │   ├── auth.js               # JWT verification
│   │   └── cors.js               # CORS setup
│   └── utils/
│       ├── jwt.js                # Token generation
│       └── password.js           # Password hashing
├── src/
│   ├── pages/
│   │   ├── LoginPage.jsx         # Login UI
│   │   └── DashboardPage.jsx
│   ├── services/
│   │   └── authService.js        # API calls
│   ├── store/
│   │   └── authStore.js          # Auth state (Zustand)
│   └── constants/
│       └── config.js             # API config
├── .env.local                    # Development env (gitignored)
├── .env.example                  # Template
├── vercel.json                   # Vercel config
├── vercel-dev-server.js          # Dev server untuk test lokal
└── package.json
```

## 🔄 Development Workflow

1. **Setup lokal:**
   ```bash
   npm install
   cp .env.example .env.local
   ```

2. **Start dev servers:**
   ```bash
   # Terminal 1
   node vercel-dev-server.js

   # Terminal 2
   npm run dev
   ```

3. **Develop & Test:**
   - Edit code di `src/` atau `api/`
   - Dev server auto-reload
   - Test di browser

4. **Commit & Push:**
   ```bash
   git add .
   git commit -m "Feature/fix description"
   git push origin main
   ```

5. **Vercel Deploy:**
   - Automatic setelah push
   - Check https://vercel.com/dashboard untuk status
   - Live di https://apd-manager.vercel.app

## 📚 Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel API Routes](https://vercel.com/docs/concepts/functions/serverless-functions)
- [JWT.io](https://jwt.io)
- [Vite Guide](https://vitejs.dev/guide/)
- [React Documentation](https://react.dev)

## 🤝 Support

Untuk questions atau issues:
1. Check error logs di Vercel dashboard
2. Check console browser (F12)
3. Check server logs (`node vercel-dev-server.js`)

---

**Last Updated**: 2026-01-12
**Version**: 1.0.0
**Status**: Ready for Production Deployment
