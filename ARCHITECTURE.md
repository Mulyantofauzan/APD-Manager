# Arsitektur APD Manager V3

## Struktur Folder

```
APD V3/
├── public/                          # Static assets
│
├── src/
│   ├── assets/
│   │   ├── icons/                  # Icon custom
│   │   └── images/                 # Image dan logo
│   │
│   ├── components/                 # Reusable components
│   │   ├── Button.jsx              # Button dengan variants
│   │   ├── Input.jsx               # Input field dengan validation
│   │   ├── Card.jsx                # Card wrapper
│   │   ├── Badge.jsx               # Badge untuk status
│   │   ├── Sidebar.jsx             # Navigation sidebar
│   │   └── index.js                # Component exports
│   │
│   ├── constants/
│   │   └── config.js               # App configuration, routes, roles, types
│   │
│   ├── hooks/
│   │   └── useApi.js               # Custom hook untuk API calls
│   │
│   ├── layouts/
│   │   └── MainLayout.jsx          # Main layout dengan sidebar
│   │
│   ├── pages/                      # Page components
│   │   ├── LoginPage.jsx           # Login dengan Google
│   │   ├── DashboardPage.jsx       # Dashboard dengan statistik
│   │   ├── MasterApdPage.jsx       # Kelola master APD
│   │   ├── KaryawanPage.jsx        # Kelola data karyawan
│   │   ├── TransaksiPage.jsx       # Transaksi APD
│   │   ├── PemusnahanPage.jsx      # Pemusnahan APD
│   │   └── index.js                # Page exports
│   │
│   ├── services/                   # API services
│   │   ├── api.js                  # Axios instance dengan interceptors
│   │   ├── authService.js          # Auth API calls
│   │   ├── apdService.js           # APD & stock API calls
│   │   └── karyawanService.js      # Karyawan API calls
│   │
│   ├── store/                      # Zustand stores
│   │   ├── authStore.js            # Auth state management
│   │   └── appStore.js             # App global state
│   │
│   ├── styles/
│   │   └── globals.css             # Global styles dengan Tailwind
│   │
│   ├── utils/
│   │   └── helpers.js              # Helper functions
│   │
│   ├── App.jsx                     # Root component dengan routing
│   └── main.jsx                    # App entry point
│
├── .env.example                    # Environment variables template
├── .gitignore                      # Git ignore rules
├── vite.config.js                  # Vite configuration (PWA)
├── tailwind.config.js              # Tailwind CSS configuration
├── postcss.config.js               # PostCSS configuration
├── package.json                    # Dependencies
├── README.md                       # Project documentation
└── ARCHITECTURE.md                 # This file
```

## State Management (Zustand)

### authStore
```javascript
{
  user: null,                    // Current user object
  isAuthenticated: false,        // Auth status
  loading: true,                 // Loading state
  error: null,                   // Error message
  setUser(user),                 // Set user
  logout(),                      // Clear auth
  setLoading(bool),              // Set loading
  setError(msg),                 // Set error
  clearError()                   // Clear error
}
```

### appStore
```javascript
{
  theme: 'light',                // App theme
  sidebarOpen: true,             // Sidebar toggle
  notifications: [],             // Notification list
  setTheme(theme),               // Change theme
  toggleSidebar(),               // Toggle sidebar
  addNotification(obj),          // Add notification
  removeNotification(id)         // Remove notification
}
```

## API Service Pattern

Semua API calls menggunakan axios instance dengan:
- Base URL configuration
- Automatic token injection di headers
- 401 handling (redirect ke login)
- Error handling & retry logic

```javascript
// Contoh usage
import { apdService } from '@/services/apdService';

const apds = await apdService.getAll();
const newApd = await apdService.create({ jenis_apd: 'Helmet', ... });
```

## Routing Structure

```
/ → /dashboard (redirect)
/login → LoginPage
/dashboard → DashboardPage (protected)
/master-apd → MasterApdPage (protected, admin/management)
/karyawan → KaryawanPage (protected, admin/management)
/transaksi → TransaksiPage (protected)
/pemusnahan → PemusnahanPage (protected, admin/management)
/settings → SettingsPage (protected, admin)
```

## Component Structure

### Button Component
Props:
- `variant`: 'primary' | 'secondary' | 'danger' | 'success' | 'ghost'
- `size`: 'sm' | 'md' | 'lg'
- `disabled`: boolean

### Input Component
Props:
- `label`: string
- `error`: string
- `helperText`: string
- `type`: 'text' | 'email' | 'password' | 'date' | 'number'

### Card Component
Props:
- `className`: string (additional Tailwind classes)

## Styling Approach

1. **Global Styles** → `src/styles/globals.css`
2. **Utility Classes** → Defined via Tailwind layers
3. **Component Styles** → Inline Tailwind classes
4. **Theme Colors** → Cyan/Blue palette (customizable)

## PWA Features

- **Service Worker** → Automatic caching & offline support
- **Web App Manifest** → Installable on home screen
- **Responsive** → Mobile-first design
- **Icons** → Multiple sizes (192x192, 512x512)

## Authentication Flow

1. User opens app
2. Check if token exists in localStorage
3. If exists, verify with backend
4. If invalid, redirect to login
5. Login page shows Google OAuth button
6. On success, save token & user data
7. Redirect to dashboard

## Database Integration

Backend should provide REST API endpoints:

```
POST /api/auth/login
GET /api/auth/me
GET /api/master-apd
GET /api/karyawan
GET /api/transaksi
POST /api/transaksi
GET /api/pemusnahan
POST /api/pemusnahan
```

## Build & Deploy

### Development
```bash
npm run dev  # Runs on http://localhost:5173
```

### Production
```bash
npm run build      # Build to /dist
npm run preview    # Preview production build
```

### Environment Variables
```
VITE_API_URL=http://backend-url/api
VITE_GOOGLE_CLIENT_ID=your-google-client-id
```

## Performance Optimization

1. **Code Splitting** → React Router lazy loading
2. **Image Optimization** → Compress & use modern formats
3. **Caching** → Service worker + workbox
4. **Tree Shaking** → Vite automatically removes unused code
5. **Minification** → Automatic in production build

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS 12+, Android 5+)

## Future Enhancements

- [ ] Detailed analytics dashboard
- [ ] Export to Excel/CSV
- [ ] Advanced filtering & search
- [ ] Real-time notifications
- [ ] Multi-language support
- [ ] Dark mode
- [ ] Print-friendly templates
- [ ] Mobile app (React Native)

---

**Last Updated**: January 2026
