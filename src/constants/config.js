// API Configuration
// For local development, API runs on localhost:3000 (Node/Vercel dev)
// For production, update VITE_API_URL in environment variables
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// User Roles
export const USER_ROLES = {
  ADMIN: 'admin',
  MANAGEMENT: 'management',
  USER: 'user',
};

// Transaction Types
export const TRANSACTION_TYPES = {
  PENGAMBILAN: 'pengambilan',
  PENGEMBALIAN: 'pengembalian',
  PERBAIKAN: 'perbaikan',
};

// Status APD
export const APD_STATUS = {
  BAIK: 'baik',
  RUSAK: 'rusak',
  HILANG: 'hilang',
  DIPERBAIKI: 'diperbaiki',
};

// Jenis Pengambilan
export const JENIS_PENGAMBILAN = {
  JADWAL_PERGANTIAN: 'jadwal_pergantian',
  RUSAK: 'rusak',
  HILANG: 'hilang',
};

// Routes
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  MASTER_APD: '/master-apd',
  KARYAWAN: '/karyawan',
  TRANSAKSI: '/transaksi',
  PEMUSNAHAN: '/pemusnahan',
  SETTINGS: '/settings',
  PROFILE: '/profile',
};

// Limits
export const APP_LIMITS = {
  MIN_STOCK_ALERT: 5,
  APD_REPLACEMENT_DAYS: 60,
  MAX_UPLOAD_SIZE: 5 * 1024 * 1024, // 5MB
};
