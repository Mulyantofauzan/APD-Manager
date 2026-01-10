# API Integration Guide

## Base Setup

API client sudah dikonfigurasi di `src/services/api.js` dengan:
- Base URL dari `VITE_API_URL` environment variable
- Automatic token injection di header Authorization
- Automatic 401 handling (redirect ke login)

## Services

### authService.js

```javascript
// Login dengan Google token
const user = await authService.loginWithGoogle(googleToken);

// Get current logged-in user
const user = await authService.getCurrentUser();

// Check if email is whitelisted
const isWhitelisted = await authService.checkWhitelist(email);

// Logout
await authService.logout();
```

### apdService.js

```javascript
// Get all APD
const apds = await apdService.getAll();

// Get APD by ID
const apd = await apdService.getById(id);

// Create new APD
const newApd = await apdService.create({
  jenis_apd: 'Safety Helmet',
  merk: 'MSA',
  ukuran: 'L',
  warna: 'Kuning',
  stock_qty: 50,
  min_stock: 10,
  keterangan: 'Helm keselamatan standar'
});

// Update APD
const updated = await apdService.update(id, {
  stock_qty: 45,
  min_stock: 15
});

// Delete APD
await apdService.delete(id);

// Get stock movement history
const movements = await apdService.getStockMovement({
  id_apd: 1,
  startDate: '2024-01-01',
  endDate: '2024-01-31'
});

// Record stock movement
const movement = await apdService.recordMovement({
  id_apd: 1,
  tipe: 'MASUK', // or 'KELUAR', 'OPNAME', 'PEMUSNAHAN'
  qty: 10,
  keterangan: 'Pengiriman dari supplier'
});
```

### karyawanService.js

```javascript
// Get all karyawan with filters
const karyawans = await karyawanService.getAll({
  departemen: 'Produksi',
  status: 'aktif'
});

// Get karyawan by NRP
const karyawan = await karyawanService.getById('001');

// Create new karyawan
const newKaryawan = await karyawanService.create({
  nrp: '003',
  nama: 'Andi Wijaya',
  jabatan: 'Operator',
  departemen: 'Produksi',
  tgl_masuk: '2024-01-15',
  akhir_kontrak: '2025-01-15',
  status: 'aktif'
});

// Update karyawan
const updated = await karyawanService.update('001', {
  jabatan: 'Supervisor',
  departemen: 'QA'
});

// Delete karyawan
await karyawanService.delete('001');

// Get karyawan history (transaksi APD)
const history = await karyawanService.getHistory('001');
```

## Backend API Endpoints

Backend harus menyediakan endpoints berikut:

### Authentication
```
POST /api/auth/login
Request: { token: 'google_token' }
Response: { authToken: 'jwt_token', user: {...} }

GET /api/auth/me
Response: { id, email, nama, role, status, created_at }

POST /api/auth/check-whitelist
Request: { email: 'user@example.com' }
Response: { isWhitelisted: boolean }
```

### Master APD
```
GET /api/master-apd
Query: ?skip=0&limit=10&search=helmet
Response: { data: [{...}], total: 245 }

GET /api/master-apd/:id
Response: { id_apd, jenis_apd, merk, ukuran, warna, stock_qty, min_stock, ... }

POST /api/master-apd
Request: { jenis_apd, merk, ukuran, warna, stock_qty, min_stock, keterangan }
Response: { id_apd, ... }

PUT /api/master-apd/:id
Request: { jenis_apd?, merk?, ... }
Response: { id_apd, ... }

DELETE /api/master-apd/:id
Response: { success: true }
```

### Karyawan
```
GET /api/karyawan
Query: ?skip=0&limit=10&departemen=Produksi&status=aktif
Response: { data: [{...}], total: 156 }

GET /api/karyawan/:nrp
Response: { nrp, nama, jabatan, departemen, tgl_masuk, akhir_kontrak, status, ... }

GET /api/karyawan/:nrp/history
Response: { data: [{...}] } // Transaksi history

POST /api/karyawan
Request: { nrp, nama, jabatan, departemen, tgl_masuk, akhir_kontrak, status }
Response: { nrp, ... }

PUT /api/karyawan/:nrp
Request: { nama?, jabatan?, departemen?, ... }
Response: { nrp, ... }

DELETE /api/karyawan/:nrp
Response: { success: true }
```

### Transaksi APD
```
GET /api/transaksi
Query: ?skip=0&limit=10&nrp=001&status=berhasil&startDate=2024-01-01
Response: { data: [{...}], total: 150 }

GET /api/transaksi/:id
Response: { id_transaksi, nrp, id_apd, tanggal_pengambilan, jenis_pengambilan, qty, ... }

POST /api/transaksi
Request: {
  nrp: '001',
  id_apd: 1,
  jenis_pengambilan: 'jadwal_pergantian', // or 'rusak', 'hilang'
  qty: 1,
  ukuran: 'L',
  warna: 'Kuning',
  batch_number: 'BATCH001',
  tanggal_produksi: '2024-01-01',
  serial_number: 'SN123',
  foto_apd: 'base64_image_or_url',
  keterangan: 'Catatan'
}
Response: { id_transaksi, ... }

PUT /api/transaksi/:id
Request: { status?, keterangan? }
Response: { id_transaksi, ... }
```

### Stock Movement
```
GET /api/stock-movement
Query: ?id_apd=1&tipe=MASUK&startDate=2024-01-01
Response: { data: [{...}], total: 50 }

POST /api/stock-movement
Request: {
  id_apd: 1,
  tipe: 'MASUK', // 'KELUAR', 'OPNAME', 'PEMUSNAHAN'
  qty: 10,
  stock_before: 40,
  stock_after: 50,
  keterangan: 'Pengiriman supplier',
  created_by: 'user_id'
}
Response: { id_movement, ... }
```

### Pemusnahan APD
```
GET /api/pemusnahan
Query: ?skip=0&limit=10&alasan=Rusak&startDate=2024-01-01
Response: { data: [{...}], total: 20 }

POST /api/pemusnahan
Request: {
  id_apd: 1,
  qty: 5,
  alasan: 'Rusak', // 'Rusak', 'Hilang', 'Kadaluarsa'
  keterangan: 'Helm pecah, tidak bisa diperbaiki',
  foto_bukti: 'base64_image_or_url',
  created_by: 'user_id'
}
Response: { id_pemusnahan, ... }

DELETE /api/pemusnahan/:id
Response: { success: true }
```

## Error Handling

API client automatically handles:
- 401 Unauthorized → Redirect to login
- Network errors → Return error message
- Timeout → 10 second default timeout

Custom error handling di components:

```javascript
try {
  const result = await apdService.getAll();
} catch (error) {
  if (error.response?.status === 404) {
    console.log('Not found');
  } else if (error.response?.status === 403) {
    console.log('Permission denied');
  } else {
    console.log('Error:', error.message);
  }
}
```

## Adding New Services

1. Create new file di `src/services/`
2. Import api client
3. Define service methods:

```javascript
import api from './api';

export const newService = {
  async getAll(filters = {}) {
    const response = await api.get('/endpoint', { params: filters });
    return response.data;
  },

  async create(data) {
    const response = await api.post('/endpoint', data);
    return response.data;
  },

  // ... more methods
};
```

4. Import dan use di components

## Testing API Integration

### Using Browser Console

```javascript
// Test in browser console after login
import { apdService } from './services/apdService';

// Get all APD
const apds = await apdService.getAll();
console.log(apds);

// Create APD
const newApd = await apdService.create({
  jenis_apd: 'Test APD',
  merk: 'Test',
  ukuran: 'L',
  warna: 'Merah',
  stock_qty: 10,
  min_stock: 5
});
console.log(newApd);
```

### Using Postman

1. Get auth token dari login
2. Add header: `Authorization: Bearer {token}`
3. Test endpoints dengan dummy data

## Rate Limiting

Pastikan backend mengimplementasikan rate limiting untuk:
- Login attempts: max 5 per minute
- API calls: max 100 per minute per user
- File uploads: max 5MB per file

## Token Management

Token disimpan di localStorage dengan key `authToken`.
Token automatically di-include di semua requests via interceptor.
Token di-clear saat logout atau 401 error.

---

**Last Updated**: January 2026
