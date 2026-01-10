# Quick Start Guide

## 📦 Installation

```bash
cd "/Users/mulyanto/Desktop/APD V3"
npm install
```

## 🚀 Running Development Server

```bash
npm run dev
```

Open http://localhost:5173 di browser Anda.

## 📝 Environment Setup

Create `.env.local` file:

```
VITE_API_URL=http://localhost:3001/api
VITE_GOOGLE_CLIENT_ID=your-google-client-id
```

## 🏗️ Project Structure

```
src/
├── components/      # Reusable UI components
├── pages/          # Page components
├── services/       # API calls
├── store/          # State management
├── layouts/        # Layout wrappers
├── constants/      # Configuration
├── utils/          # Helper functions
├── hooks/          # Custom hooks
└── styles/         # Global styles
```

## 📱 Main Pages

1. **Login Page** (`/login`)
   - Google OAuth login
   - Email whitelist check

2. **Dashboard** (`/dashboard`)
   - Statistics overview
   - Recent activities
   - Notifications

3. **Master APD** (`/master-apd`)
   - View all APD
   - Create/Edit/Delete APD
   - Search functionality

4. **Karyawan** (`/karyawan`)
   - Employee list
   - CRUD operations
   - Department filter

5. **Transaksi** (`/transaksi`)
   - Transaction history
   - Create transaction
   - Status tracking

6. **Pemusnahan** (`/pemusnahan`)
   - Destruction records
   - Upload evidence
   - Batch management

## 🔧 Key Components

### Button
```jsx
<Button variant="primary" size="md" onClick={handleClick}>
  Click Me
</Button>
```

Variants: `primary`, `secondary`, `danger`, `success`, `ghost`
Sizes: `sm`, `md`, `lg`

### Input
```jsx
<Input
  label="Name"
  placeholder="Enter name"
  error="Field required"
  helperText="Enter your full name"
/>
```

### Card
```jsx
<Card className="p-6">
  Content here
</Card>
```

### Badge
```jsx
<Badge variant="success">Status: Active</Badge>
```

Variants: `primary`, `success`, `danger`, `warning`

## 📊 State Management (Zustand)

### Auth Store
```javascript
import { useAuthStore } from '@/store/authStore';

const { user, isAuthenticated, setUser, logout } = useAuthStore();
```

### App Store
```javascript
import { useAppStore } from '@/store/appStore';

const { theme, sidebarOpen, toggleSidebar } = useAppStore();
```

## 🌐 API Calls

### Using APD Service
```javascript
import { apdService } from '@/services/apdService';

const apds = await apdService.getAll();
const apd = await apdService.getById(1);
await apdService.create({ jenis_apd: 'Helmet', ... });
```

### Using Karyawan Service
```javascript
import { karyawanService } from '@/services/karyawanService';

const karyawans = await karyawanService.getAll();
const karyawan = await karyawanService.getById('001');
```

## 🎨 Styling

Using Tailwind CSS utilities:

```jsx
<div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
  <span className="text-sm font-medium text-gray-700">Total APD</span>
  <span className="text-2xl font-bold text-gray-900">245</span>
</div>
```

### Custom Classes (in globals.css)

- `.btn` - Base button styles
- `.btn-primary`, `.btn-secondary`, etc
- `.card` - Card wrapper
- `.badge` - Badge styles
- `.badge-primary`, `.badge-success`, etc
- `.input-base` - Base input styles

## 📱 Making Pages

1. Create file in `src/pages/`
2. Import MainLayout for sidebar pages
3. Use reusable components

Example:
```jsx
import MainLayout from '@/layouts/MainLayout';
import Card from '@/components/Card';
import Button from '@/components/Button';

export default function MyPage() {
  return (
    <MainLayout>
      <h1>My Page</h1>
      <Card>
        <Button variant="primary">Action</Button>
      </Card>
    </MainLayout>
  );
}
```

4. Add route in `App.jsx`

## 🔑 Adding New Routes

1. Create page component in `src/pages/`
2. Import in `App.jsx`
3. Add to ROUTES in `src/constants/config.js`
4. Add Route in App component

```jsx
// In App.jsx
<Route
  path={ROUTES.YOUR_PAGE}
  element={isAuthenticated ? <YourPage /> : <Navigate to={ROUTES.LOGIN} />}
/>
```

## 🛠️ Building for Production

```bash
npm run build    # Build to /dist
npm run preview  # Preview build
```

## 📚 Documentation Files

- **README.md** - Project overview
- **ARCHITECTURE.md** - Technical architecture
- **API_INTEGRATION.md** - API documentation
- **DEPLOYMENT.md** - Deployment guide
- **FEATURES.md** - Feature list
- **QUICK_START.md** - This file

## 🐛 Common Issues

### Port already in use
```bash
npm run dev -- --port 3000
```

### Node modules error
```bash
rm -rf node_modules package-lock.json
npm install
```

### Build error
```bash
npm run build -- --debug
```

## 📦 Dependencies

Core:
- React 19
- Vite
- React Router DOM
- Zustand

Styling:
- Tailwind CSS
- Lucide React (icons)

Data:
- Axios
- date-fns

PWA:
- Vite Plugin PWA

## 🚀 Next Steps

1. Setup backend API
2. Configure Google OAuth
3. Setup database
4. Run integration tests
5. Deploy to production

## 📞 Support

For issues, check:
1. FEATURES.md - Feature status
2. API_INTEGRATION.md - API endpoints
3. DEPLOYMENT.md - Deployment help
4. Browser console for errors

---

**Happy coding! 🎉**
