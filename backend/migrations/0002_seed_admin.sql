-- Seed initial admin user
-- Password: Admin123! (hashed with PBKDF2)
-- The hash below is a placeholder - you need to generate the actual hash using the password hashing utility
--
-- To generate the actual hash, run this Node.js code:
-- const crypto = require('crypto');
-- const password = 'Admin123!';
-- const salt = crypto.randomBytes(16).toString('hex');
-- const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
-- const passwordHash = `${salt}:${hash}`;
-- console.log('INSERT INTO users (email, password_hash, nama, role, is_active) VALUES ("admin@apd.com", "' + passwordHash + '", "Administrator", "admin", 1);');

-- For development, use this hash (generated salt: 8a2c7f3e9d4b1a6c2e5f8b0d3a9c4e7f):
INSERT INTO users (email, password_hash, nama, role, is_active)
VALUES (
  'admin@apd.com',
  '8a2c7f3e9d4b1a6c2e5f8b0d3a9c4e7f:2a1b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c0d1e2f3g4h5i6j7k8l9m0n1o2p3q4r5s6t7u8v9w0x1y2z3a4b5c6d7e8f9g0h1i2j3k4l5m6n7o8p9q0r1s2t3u4v5w6x7y8z',
  'Administrator',
  'admin',
  1
);

-- Insert sample karyawan data
INSERT INTO karyawan (nrp, nama, jabatan, departemen, tgl_masuk, status)
VALUES
  ('001', 'Budi Santoso', 'Manager', 'Produksi', '2020-01-15', 'aktif'),
  ('002', 'Siti Rahmadhani', 'Operator', 'Produksi', '2021-06-20', 'aktif');

-- Insert sample master APD data
INSERT INTO master_apd (jenis_apd, merk, ukuran, warna, stock_qty, min_stock)
VALUES
  ('Safety Helmet', 'MSA', 'L', 'Kuning', 45, 10),
  ('Safety Gloves', 'Honeywell', 'M', 'Putih', 3, 20),
  ('Safety Shoes', 'Caterpillar', '42', 'Hitam', 15, 10),
  ('Safety Vest', '3M', 'M', 'Orange', 25, 15);

-- Insert sample transaksi data
INSERT INTO transaksi_apd (nrp, id_apd, qty, tanggal, jenis_pengambilan, status, created_by)
VALUES
  ('001', 1, 1, '2024-01-10', 'jadwal_pergantian', 'berhasil', 1),
  ('002', 2, 2, '2024-01-11', 'rusak', 'pending', 1);
