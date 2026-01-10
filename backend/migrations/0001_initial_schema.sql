-- Users table
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  nama TEXT NOT NULL,
  role TEXT NOT NULL CHECK(role IN ('admin', 'management', 'user')),
  is_active BOOLEAN DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Master APD table
CREATE TABLE IF NOT EXISTS master_apd (
  id_apd INTEGER PRIMARY KEY AUTOINCREMENT,
  jenis_apd TEXT NOT NULL,
  merk TEXT NOT NULL,
  ukuran TEXT NOT NULL,
  warna TEXT NOT NULL,
  stock_qty INTEGER DEFAULT 0,
  min_stock INTEGER DEFAULT 5,
  keterangan TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Karyawan table
CREATE TABLE IF NOT EXISTS karyawan (
  nrp TEXT PRIMARY KEY,
  nama TEXT NOT NULL,
  jabatan TEXT NOT NULL,
  departemen TEXT NOT NULL,
  tgl_masuk DATE NOT NULL,
  akhir_kontrak DATE,
  status TEXT DEFAULT 'aktif' CHECK(status IN ('aktif', 'non-aktif')),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Transaksi APD table
CREATE TABLE IF NOT EXISTS transaksi_apd (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nrp TEXT NOT NULL,
  id_apd INTEGER NOT NULL,
  qty INTEGER NOT NULL,
  tanggal DATE NOT NULL,
  jenis_pengambilan TEXT NOT NULL CHECK(jenis_pengambilan IN ('jadwal_pergantian', 'rusak', 'hilang')),
  status TEXT DEFAULT 'pending' CHECK(status IN ('pending', 'berhasil', 'ditolak')),
  keterangan TEXT,
  created_by INTEGER,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (nrp) REFERENCES karyawan(nrp),
  FOREIGN KEY (id_apd) REFERENCES master_apd(id_apd),
  FOREIGN KEY (created_by) REFERENCES users(id)
);

-- Pemusnahan APD table
CREATE TABLE IF NOT EXISTS pemusnahan_apd (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  id_apd INTEGER NOT NULL,
  qty INTEGER NOT NULL,
  tanggal DATE NOT NULL,
  alasan TEXT NOT NULL,
  penanggung_jawab TEXT NOT NULL,
  created_by INTEGER,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_apd) REFERENCES master_apd(id_apd),
  FOREIGN KEY (created_by) REFERENCES users(id)
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_master_apd_jenis ON master_apd(jenis_apd);
CREATE INDEX IF NOT EXISTS idx_karyawan_nama ON karyawan(nama);
CREATE INDEX IF NOT EXISTS idx_transaksi_nrp ON transaksi_apd(nrp);
CREATE INDEX IF NOT EXISTS idx_transaksi_id_apd ON transaksi_apd(id_apd);
CREATE INDEX IF NOT EXISTS idx_transaksi_tanggal ON transaksi_apd(tanggal);
CREATE INDEX IF NOT EXISTS idx_pemusnahan_id_apd ON pemusnahan_apd(id_apd);
