# Cloudflare Deployment Guide - APD Manager

Panduan lengkap untuk setup dan deployment APD Manager ke Cloudflare dengan custom authentication.

## Prerequisites

Sebelum mulai, pastikan Anda sudah punya:
- Node.js 18+ terinstall
- Cloudflare account
- Git repository (sudah ada)

## 1. Install Wrangler CLI

```bash
# Install Wrangler globally
npm install -g @cloudflare/wrangler

# Verify installation
wrangler --version
```

## 2. Login ke Cloudflare

```bash
wrangler login
# This will open browser to authorize Wrangler
```

## 3. Setup Backend - Cloudflare D1 Database

### Step 3.1: Create D1 Database

```bash
# Navigate to backend folder
cd backend

# Create D1 database
wrangler d1 create apd-manager-db

# Copy the database_id from output and update in wrangler.toml:
# [[d1_databases]]
# binding = "DB"
# database_name = "apd-manager-db"
# database_id = "PASTE_YOUR_ID_HERE"
```

### Step 3.2: Run Migrations

```bash
# Run initial schema migration
wrangler d1 execute apd-manager-db --file=migrations/0001_initial_schema.sql

# Run seed migration (adds sample data and admin user)
wrangler d1 execute apd-manager-db --file=migrations/0002_seed_admin.sql
```

### Step 3.3: Verify Database Setup

```bash
# Query users table
wrangler d1 execute apd-manager-db --command="SELECT id, email, nama, role FROM users"

# Should return the admin user created by seed migration
```

## 4. Setup Backend Environment Variables

### Step 4.1: Create `.dev.vars` for Local Development

```bash
# In backend/ folder, create .dev.vars file
cat > .dev.vars << 'EOF'
JWT_SECRET=your-super-secret-jwt-key-must-be-at-least-32-characters-long!!!
ENVIRONMENT=development
EOF
```

### Step 4.2: Setup Production Secrets

```bash
# For production, use Wrangler secrets
wrangler secret put JWT_SECRET --env production
# Then paste your secure JWT secret and press Enter twice

# Verify secret is set
wrangler secret list
```

## 5. Test Backend Locally

```bash
# From backend folder
npm install  # Install dependencies first time

# Start local development server
npm run dev
# Should output: ➜  Local:   http://localhost:8787/

# Test API endpoints:
# - Health check: curl http://localhost:8787/health
# - Login endpoint: curl -X POST http://localhost:8787/api/auth/login -H "Content-Type: application/json" -d '{"email":"admin@apd.com","password":"Admin123!"}'
```

## 6. Deploy Backend to Cloudflare Workers

```bash
# From backend folder
wrangler deploy

# This will:
# - Build your Hono app
# - Deploy to Cloudflare Workers
# - Show deployment URL like: https://apd-manager-api.xxx.workers.dev
```

## 7. Setup Frontend - Cloudflare Pages

### Step 7.1: Update Frontend Environment Variables

```bash
# In root folder, create .env.production file
cat > .env.production << 'EOF'
VITE_API_URL=https://apd-manager-api.YOUR_SUBDOMAIN.workers.dev/api
EOF
```

### Step 7.2: Connect Git Repository to Cloudflare Pages

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Navigate to Pages
3. Click "Create a project"
4. Select "Connect to Git"
5. Authorize and select your Git repository
6. Configure build settings:
   - **Framework preset**: Vite
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
7. Add Environment variable:
   - **Variable name**: `VITE_API_URL`
   - **Value**: `https://apd-manager-api.YOUR_SUBDOMAIN.workers.dev/api`

### Step 7.3: Deploy

- Push to your Git repository's main branch
- Cloudflare Pages will automatically build and deploy

## 8. Test Complete Integration

### Test Login Flow

1. Visit your Cloudflare Pages URL
2. Login with credentials:
   - Email: `admin@apd.com`
   - Password: `Admin123!`
3. Should redirect to dashboard
4. Check browser console for JWT token in localStorage

### Test API Integration

```bash
# After logging in, get the token from localStorage and test:

TOKEN="your_jwt_token_from_localStorage"

# Get current user
curl -H "Authorization: Bearer $TOKEN" \
  https://apd-manager-api.YOUR_SUBDOMAIN.workers.dev/api/auth/me
```

## 9. Custom Domain Setup (Optional)

### Add Custom Domain to Pages

1. Go to Cloudflare Pages project settings
2. Click "Custom domains"
3. Add your custom domain (e.g., apd.example.com)
4. Update DNS to point to Cloudflare
5. SSL certificate auto-provisioned

### Update Environment Variable

```bash
# Update VITE_API_URL to use custom domain
# In Cloudflare Pages → Settings → Environment Variables
VITE_API_URL=https://apd-manager-api.YOUR_CUSTOM_DOMAIN.com/api
```

## 10. Database Backups & Management

### Export Database

```bash
# Export D1 database as SQL
wrangler d1 execute apd-manager-db --command=".dump" > backup.sql
```

### Query Database from Command Line

```bash
# List all users
wrangler d1 execute apd-manager-db --command="SELECT * FROM users"

# List all APD
wrangler d1 execute apd-manager-db --command="SELECT * FROM master_apd"

# Count transactions
wrangler d1 execute apd-manager-db --command="SELECT COUNT(*) FROM transaksi_apd"
```

## 11. Troubleshooting

### Login Not Working

1. Check backend is running: `curl http://localhost:8787/health`
2. Verify D1 database has admin user: `wrangler d1 execute apd-manager-db --command="SELECT * FROM users"`
3. Check API_BASE_URL in frontend config
4. Check browser console for error messages

### CORS Errors

- Make sure `ALLOWED_ORIGINS` in `backend/src/middleware/cors.ts` includes your frontend URL
- Redeploy backend after changes

### Database Connection Errors

- Verify database_id in `wrangler.toml` matches the created database
- Check JWT_SECRET environment variable is set

## 12. Next Steps

### Implement CRUD Routes

Create routes for:
- `GET/POST/PUT/DELETE /api/apd` - Master APD management
- `GET/POST/PUT/DELETE /api/karyawan` - Employee management
- `GET/POST/PUT /api/transaksi` - Transaction management
- `GET/POST /api/pemusnahan` - APD disposal management

### Add Frontend Service Layer

Create service files to call these APIs:
- `src/services/apdService.js`
- `src/services/karyawanService.js`
- `src/services/transaksiService.js`
- `src/services/pemusnahanService.js`

### Connect Forms to API

Update form handlers in pages to use services instead of local state.

## 13. Production Checklist

- [ ] Change admin password after first login
- [ ] Setup JWT_SECRET in production environment
- [ ] Update ALLOWED_ORIGINS to include production domain
- [ ] Enable HTTPS (auto with Cloudflare)
- [ ] Setup database backups
- [ ] Configure rate limiting on auth endpoints
- [ ] Setup monitoring and logging
- [ ] Create user management UI for admins

## Useful Commands

```bash
# Backend development
cd backend && npm run dev

# Frontend development
npm run dev

# Build frontend
npm run build

# Deploy backend
cd backend && npm run deploy

# View Wrangler logs
wrangler tail

# View D1 database info
wrangler d1 info apd-manager-db
```

## Support

Untuk dokumentasi lebih lanjut:
- [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/)
- [Cloudflare D1 Docs](https://developers.cloudflare.com/d1/)
- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [Hono Framework Docs](https://hono.dev/)
