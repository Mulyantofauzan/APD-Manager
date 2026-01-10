import React, { useState, useEffect } from 'react';
import MainLayout from '../layouts/MainLayout';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import Badge from '../components/Badge';
import { Plus, FileText, Filter, Search } from 'lucide-react';

const TransaksiPage = () => {
  const [transaksiList, setTransaksiList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('semua');
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    // Fetch transaksi dari API
    setTransaksiList([
      {
        id: 1,
        nrp: '001',
        nama_karyawan: 'Budi Santoso',
        jenis_apd: 'Safety Helmet',
        qty: 1,
        tanggal: '2024-01-10',
        jenis_pengambilan: 'jadwal_pergantian',
        status: 'berhasil',
      },
      {
        id: 2,
        nrp: '002',
        nama_karyawan: 'Siti Rahmadhani',
        jenis_apd: 'Safety Gloves',
        qty: 2,
        tanggal: '2024-01-11',
        jenis_pengambilan: 'rusak',
        status: 'pending',
      },
    ]);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'berhasil':
        return 'success';
      case 'pending':
        return 'warning';
      case 'ditolak':
        return 'danger';
      default:
        return 'primary';
    }
  };

  const getJenisPengambilanLabel = (jenis) => {
    const labels = {
      jadwal_pergantian: 'Jadwal Pergantian',
      rusak: 'APD Rusak',
      hilang: 'APD Hilang',
    };
    return labels[jenis] || jenis;
  };

  const filteredTransaksi = transaksiList.filter((t) => {
    const matchSearch = t.nama_karyawan.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.jenis_apd.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = filterStatus === 'semua' || t.status === filterStatus;
    return matchSearch && matchStatus;
  });

  return (
    <MainLayout>
      <div>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Transaksi APD</h1>
            <p className="text-gray-600 mt-1">Kelola pengambilan dan pengembalian APD</p>
          </div>
          <Button
            variant="primary"
            className="gap-2 w-full md:w-auto"
            onClick={() => setShowForm(true)}
          >
            <Plus size={20} />
            Transaksi Baru
          </Button>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                placeholder="Cari karyawan atau APD..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="input-base flex-1"
              >
                <option value="semua">Semua Status</option>
                <option value="berhasil">Berhasil</option>
                <option value="pending">Pending</option>
                <option value="ditolak">Ditolak</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Transaksi List */}
        <div className="space-y-4">
          {filteredTransaksi.map((t) => (
            <Card key={t.id} className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-bold text-gray-900">{t.nama_karyawan}</h3>
                  <Badge variant={getStatusColor(t.status)}>
                    {t.status.charAt(0).toUpperCase() + t.status.slice(1)}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                  <div>
                    <p className="text-xs font-medium text-gray-500">APD</p>
                    <p>{t.jenis_apd}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500">Qty</p>
                    <p>{t.qty} unit</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500">Jenis Pengambilan</p>
                    <p>{getJenisPengambilanLabel(t.jenis_pengambilan)}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500">Tanggal</p>
                    <p>{new Date(t.tanggal).toLocaleDateString('id-ID')}</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 w-full md:w-auto">
                <Button variant="secondary" size="sm" className="gap-2 flex-1 md:flex-none">
                  <FileText size={16} />
                  <span className="hidden md:inline">Detail</span>
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Transaksi Pengambilan APD</h2>
              <div className="space-y-4 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input label="NRP Karyawan" placeholder="001" />
                  <Input label="Nama Karyawan" placeholder="Masukkan nama" disabled />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input label="Jenis APD" placeholder="Safety Helmet" />
                  <Input label="Jumlah" type="number" placeholder="1" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Jenis Pengambilan
                  </label>
                  <select className="input-base">
                    <option value="">Pilih jenis pengambilan</option>
                    <option value="jadwal_pergantian">Jadwal Pergantian</option>
                    <option value="rusak">APD Rusak</option>
                    <option value="hilang">APD Hilang</option>
                  </select>
                </div>
                <Input label="Keterangan (opsional)" placeholder="Masukkan catatan" />
              </div>
              <div className="flex gap-2">
                <Button variant="secondary" className="flex-1" onClick={() => setShowForm(false)}>
                  Batal
                </Button>
                <Button variant="primary" className="flex-1">
                  Simpan Transaksi
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default TransaksiPage;
