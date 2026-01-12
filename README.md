# APD Manager v1

Aplikasi pengelolaan Alat Pelindung Diri (APD) dengan custom email/password authentication dan Vercel deployment.

## 🌟 Fitur Utama

✅ **Custom Authentication** - Email/Password login (no OAuth)
✅ **JWT Token Sessions** - 7-day token expiration
✅ **Secure Password** - PBKDF2 hashing dengan 100k iterations
✅ **SPA & PWA** - Single Page App dengan Progressive Web App support
✅ **Responsive Design** - Mobile, tablet, dan desktop optimized
✅ **Modern UI** - Beautiful login page dengan gradient backgrounds
✅ **Role-Based Access** - Admin, Management, User roles
✅ **Vercel Deployment** - Auto-deploy dari Git push
✅ **API Routes** - Serverless functions di Vercel
✅ **Development Ready** - Local dev server included

## 🏗️ Architecture

```
Frontend (React + Vite)        Backend (Vercel API Routes)
├── SPA deployment             ├── /api/auth/login
├── Auto-deploy dari Git       ├── /api/auth/me
└── Vercel CDN                 └── Express-like middleware
```

## 📦 Tech Stack

- **Frontend**: React 19 + Vite
- **Backend**: Node.js + Vercel Serverless Functions
- **Auth**: JWT (jsonwebtoken) + PBKDF2
- **State**: Zustand
- **HTTP**: Axios
- **Styling**: Inline CSS (no Tailwind dependency)
- **Icons**: Lucide React
- **Deployment**: Vercel

## 🚀 Quick Start (5 menit)

**1. Setup:**
```bash
npm install
cp .env.example .env.local
```

**2. Terminal 1 - API Server:**
```bash
node vercel-dev-server.js
```

**3. Terminal 2 - Frontend:**
```bash
npm run dev
```

**4. Open:** http://localhost:5173

**5. Login:**
- Email: `admin@apd.com`
- Password: `Admin123!`

## 📚 Documentation

| Doc | Purpose |
|-----|---------|
| [SETUP.md](./SETUP.md) | 5-minute quick start guide |
| [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) | Complete production deployment guide |
| [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md) | Technical implementation details |

## 📁 Project Structure

```
apd-manager/
├── api/                          # Vercel API Routes
│   ├── auth/
│   │   ├── login.js              # POST /api/auth/login
│   │   └── me.js                 # GET /api/auth/me
│   ├── middleware/
│   │   ├── auth.js               # JWT verification
│   │   └── cors.js               # CORS handling
│   └── utils/
│       ├── jwt.js                # Token generation
│       └── password.js           # Password hashing
│
├── src/                          # Frontend React app
│   ├── components/               # Reusable components
│   ├── pages/                    # Page components
│   ├── services/                 # API client services
│   ├── store/                    # Zustand state management
│   ├── constants/                # Configuration
│   └── styles/                   # Global styles
│
├── vercel-dev-server.js          # Local dev server
├── vercel.json                   # Vercel configuration
├── .env.local                    # Development env vars
└── package.json
```

## 🔐 API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/login` | Login dengan email & password |
| `GET` | `/api/auth/me` | Get current user info (requires JWT) |

### Login Request
```json
{
  "email": "admin@apd.com",
  "password": "Admin123!"
}
```

### Login Response
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

## 🔑 Default Credentials

```
Email: admin@apd.com
Password: Admin123!
```

⚠️ **Change these credentials in production!**

## 🛠️ Build & Deploy

### Build Frontend
```bash
npm run build
# Output: dist/ folder
```

### Deploy to Vercel
```bash
git push origin main
# Vercel auto-deploys automatically!
```

**Frontend Live**: https://apd-manager.vercel.app
**API Live**: https://apd-manager.vercel.app/api

## 🌐 Environment Variables

### Development (.env.local)
```
VITE_API_URL=http://localhost:3000/api
JWT_SECRET=dev-secret-key-minimum-32-characters-long-for-testing!!!
```

### Production (Vercel)
Set in Vercel Dashboard > Settings > Environment Variables:
```
JWT_SECRET=your-production-secret-key-32-chars-min
VITE_API_URL=https://apd-manager.vercel.app/api
```

## 🚨 Security

- ✅ **Password**: PBKDF2 hashed dengan 100,000 iterations
- ✅ **JWT**: 7-day expiration dengan HS256 algorithm
- ✅ **CORS**: Whitelist origins untuk production
- ✅ **Password Rules**: Min 8 chars, uppercase, lowercase, number required

## 📝 Git Workflow

```bash
# 1. Setup
npm install
cp .env.example .env.local

# 2. Development
node vercel-dev-server.js &  # Terminal 1
npm run dev                   # Terminal 2

# 3. Commit & Push
git add .
git commit -m "Feature/fix: Description"
git push origin main

# 4. Vercel deploys automatically!
```

## 📞 Troubleshooting

**Q: "Cannot GET /" on http://localhost:5173**
A: Make sure `npm run dev` is running in Terminal 2

**Q: "Cannot POST /api/auth/login"**
A: Make sure `node vercel-dev-server.js` is running in Terminal 1

**Q: "Invalid token" error**
A: Clear localStorage and login again. Check `JWT_SECRET` in .env.local

**Q: "CORS error" in console**
A: Check CORS origins in `api/middleware/cors.js` include localhost:5173

See [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) untuk lebih banyak troubleshooting.

## 📄 License

MIT

## 👤 Author

Mulyanto Fauzan

---

**Status**: ✅ Ready for production deployment to Vercel

Last updated: 2026-01-12

---

**Aplikasi Pengelolaan APD Modern & Responsive**
