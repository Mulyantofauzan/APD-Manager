# APD Manager - Quick Setup Guide

## 🚀 Development Setup (5 menit)

### 1. Install Dependencies
```bash
npm install
```

### 2. Create Environment File
```bash
cp .env.example .env.local
```

### 3. Start Both Servers

**Terminal 1 - API Backend:**
```bash
node vercel-dev-server.js
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

### 4. Login
- URL: http://localhost:5173
- Email: `admin@apd.com`
- Password: `Admin123!`

## 📚 Documentation

- **[VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md)** - Full deployment guide
- **[IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)** - Project overview

## 🔗 Quick Links

| Link | Purpose |
|------|---------|
| http://localhost:5173 | Frontend (Vite dev) |
| http://localhost:3000/api | Backend API |
| http://localhost:3000/api/auth/login | Login endpoint |
| http://localhost:3000/api/auth/me | Get user info |

## 📝 API Credentials (Development)

```
Email: admin@apd.com
Password: Admin123!
```

## 🔑 Key Features

✅ Custom email/password authentication (no OAuth)
✅ JWT token-based sessions (7 day expiration)
✅ PBKDF2 password hashing
✅ CORS-enabled for local development
✅ Vercel API Routes backend
✅ React + Vite frontend
✅ Zustand state management
✅ TypeScript-ready

## 📦 Build & Deploy

```bash
# Build frontend
npm run build

# Output di dist/ folder
# Auto-deploy ke Vercel saat push ke main branch
git push origin main
```

## 🐛 Troubleshooting

**"Cannot GET /" error**
- Check Vite server running di terminal 2

**"API connection refused" error**
- Check vercel-dev-server.js running di terminal 1

**"Invalid token" error**
- Delete localStorage & login again
- Check JWT_SECRET di .env.local

## 📞 Next Steps

1. ✅ Setup lokal working
2. ⬜ Deploy ke Vercel (see VERCEL_DEPLOYMENT.md)
3. ⬜ Connect Cloudflare D1 database (future)
4. ⬜ Add more API endpoints (APD, Karyawan, Transaksi)

---

**For detailed info, see [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md)**
