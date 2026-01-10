# Deployment Guide

## Development Setup

### Prerequisites
- Node.js 18+ dan npm 9+
- Git
- Code editor (VSCode, WebStorm, etc)

### Quick Start
```bash
cd "APD V3"
npm install
npm run dev
```
Open browser di http://localhost:5173

## Production Build

### Build Process
```bash
npm run build
```

Output folder: `/dist`
File size: ~100-150KB (gzipped)

### Preview Production Build
```bash
npm run preview
```
Berjalan di http://localhost:4173

## Environment Configuration

### Development (.env.local)
```
VITE_API_URL=http://localhost:3001/api
VITE_GOOGLE_CLIENT_ID=your-dev-client-id
```

### Production (.env.production)
```
VITE_API_URL=https://api.production.com/api
VITE_GOOGLE_CLIENT_ID=your-prod-client-id
```

## Hosting Options

### Option 1: Vercel (Recommended)

**Keuntungan:**
- Deployment otomatis dari Git
- CDN global
- PWA support built-in
- Free tier untuk project open source
- Automatic HTTPS

**Steps:**
1. Push code ke GitHub
2. Connect GitHub ke Vercel
3. Set environment variables di Vercel dashboard
4. Auto-deploy on push

**vercel.json:**
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "env": {
    "VITE_API_URL": "@vite_api_url",
    "VITE_GOOGLE_CLIENT_ID": "@vite_google_client_id"
  }
}
```

### Option 2: Netlify

**Steps:**
1. Connect Git repository ke Netlify
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Add environment variables
5. Deploy

**netlify.toml:**
```toml
[build]
command = "npm run build"
publish = "dist"

[build.environment]
NODE_VERSION = "18.0.0"

[[redirects]]
from = "/*"
to = "/index.html"
status = 200
```

### Option 3: Firebase Hosting

**Steps:**
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

**firebase.json:**
```json
{
  "hosting": {
    "public": "dist",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

### Option 4: Docker

**Dockerfile:**
```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:18-alpine
RUN npm install -g serve
WORKDIR /app
COPY --from=builder /app/dist ./dist
EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]
```

**Build & Run:**
```bash
docker build -t apd-manager .
docker run -p 3000:3000 apd-manager
```

### Option 5: Self-Hosted (nginx)

**nginx.conf:**
```nginx
server {
    listen 80;
    server_name api.example.com;

    root /var/www/apd-manager/dist;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css text/javascript application/json;

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|svg|woff|woff2|eot|ttf|otf)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # SPA routing
    location / {
        try_files $uri $uri/ /index.html;
    }

    # API proxy
    location /api/ {
        proxy_pass http://backend-server:3001/api/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # HTTPS redirect
    listen 443 ssl http2;
    ssl_certificate /etc/ssl/certs/cert.pem;
    ssl_certificate_key /etc/ssl/private/key.pem;
}

server {
    listen 80;
    server_name example.com;
    return 301 https://$server_name$request_uri;
}
```

## Performance Optimization

### 1. Enable GZIP Compression
Ensure backend/server compresses responses

### 2. Cache Strategy
- Service Worker caches static assets (js, css, fonts)
- API responses cached with short TTL
- User data never cached (always fresh)

### 3. CDN Configuration
- Serve static assets dari CDN
- Set cache headers untuk immutable files
- Invalidate cache on new deployments

### 4. Image Optimization
```javascript
// Compress images before upload
const compressImage = async (file) => {
  // Use image compression library
  return compressedImage;
};
```

## Security Checklist

- [x] HTTPS enabled (required for PWA)
- [ ] CORS configured correctly
- [ ] CSRF protection enabled
- [ ] XSS protection enabled
- [ ] SQL injection prevention (backend)
- [ ] Rate limiting configured
- [ ] Environment variables secured
- [ ] API keys rotated regularly
- [ ] Database backups scheduled
- [ ] Monitoring & logging setup

## Monitoring & Analytics

### Google Analytics
```javascript
// Add to main.jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Track page views
useEffect(() => {
  // Send page view to Analytics
}, [location]);
```

### Error Tracking (Sentry)
```javascript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://xxx@xxx.ingest.sentry.io/xxx",
  environment: "production",
  tracesSampleRate: 1.0,
});
```

### Performance Monitoring
- Monitor Core Web Vitals
- Track API response times
- Monitor error rates
- Track user engagement

## Backup & Recovery

### Database Backups
- Daily automated backups
- Weekly full backups
- Monthly archival backups
- Test restore procedures monthly

### Code Backups
- All code in Git repository
- Multiple remotes (GitHub, GitLab, Gitea)
- Tag releases in Git

## Scaling Considerations

### Horizontal Scaling
- Load balance between multiple instances
- Use cloud storage for uploads
- Use CDN for assets

### Vertical Scaling
- Upgrade server specs as needed
- Optimize database queries
- Implement caching layers

## Cost Estimation

| Provider | Free Tier | Pro Tier | Notes |
|----------|-----------|----------|-------|
| Vercel | ✓ Included | $20/mo | Recommended |
| Netlify | ✓ Included | $19/mo | Good alternative |
| Firebase | ✓ 5GB | Pay per use | Good for small projects |
| AWS | ✓ 1yr free | ~$10-50/mo | More complex |
| DigitalOcean | $4-6/mo | Good value | Simple VPS |

## Troubleshooting

### Build fails
```bash
# Clear cache
rm -rf node_modules package-lock.json
npm install
npm run build
```

### PWA not installing
- Check manifest.json is valid
- Ensure HTTPS enabled
- Check service worker registration

### API calls failing
- Verify CORS headers on backend
- Check API URL in environment variables
- Test API with curl or Postman

### Performance issues
- Check bundle size: `npm run build -- --report`
- Enable gzip compression
- Optimize images
- Use CDN for assets

## Rollback Procedure

```bash
# If deployment fails
# Option 1: Redeploy previous version
git revert <commit-hash>
git push

# Option 2: Revert deployment directly
# In Vercel/Netlify dashboard, select previous deployment
```

---

**Last Updated**: January 2026
