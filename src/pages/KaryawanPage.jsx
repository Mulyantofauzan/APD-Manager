import React, { useState, useEffect } from 'react';
import MainLayout from '../layouts/MainLayout';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import Badge from '../components/Badge';
import { Plus, Edit2, Trash2, Search, Users } from 'lucide-react';

const KaryawanPage = () => {
  const [karyawanList, setKaryawanList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    nrp: '',
    nama: '',
    jabatan: '',
    departemen: '',
    tgl_masuk: '',
    akhir_kontrak: '',
  });

  useEffect(() => {
    // Fetch karyawan dari API
    setKaryawanList([
      {
        nrp: '001',
        nama: 'Budi Santoso',
        jabatan: 'Manager',
        departemen: 'Produksi',
        tgl_masuk: '2020-01-15',
        status: 'aktif',
      },
      {
        nrp: '002',
        nama: 'Siti Rahmadhani',
        jabatan: 'Operator',
        departemen: 'Produksi',
        tgl_masuk: '2021-06-20',
        status: 'aktif',
      },
    ]);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddKaryawan = async () => {
    try {
      // Validate form data
      if (!formData.nrp || !formData.nama || !formData.jabatan || !formData.departemen) {
        alert('Mohon isi semua field yang diperlukan');
        return;
      }

      // TODO: Submit ke API
      // const response = await karyawanService.addKaryawan(formData);

      // Add to local list for now
      setKaryawanList((prev) => [
        ...prev,
        {
          ...formData,
          status: 'aktif',
        },
      ]);

      setShowForm(false);
      setFormData({
        nrp: '',
        nama: '',
        jabatan: '',
        departemen: '',
        tgl_masuk: '',
        akhir_kontrak: '',
      });
    } catch (error) {
      console.error('Failed to add karyawan:', error);
      alert('Gagal menambah karyawan. Silakan coba lagi.');
    }
  };

  const filteredKaryawan = karyawanList.filter((k) =>
    k.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
    k.nrp.includes(searchQuery)
  );

  return (
    <MainLayout>
      <div>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Data Karyawan</h1>
            <p className="text-gray-600 mt-1">Kelola informasi karyawan</p>
          </div>
          <Button
            variant="primary"
            className="gap-2 w-full md:w-auto"
            onClick={() => setShowForm(true)}
          >
            <Plus size={20} />
            Tambah Karyawan
          </Button>
        </div>

        {/* Search Bar */}
        <Card className="mb-6">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                placeholder="Cari nama atau NRP..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </Card>

        {/* Table View */}
        <Card className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-4 px-4 font-semibold text-gray-700">NRP</th>
                <th className="text-left py-4 px-4 font-semibold text-gray-700">Nama</th>
                <th className="text-left py-4 px-4 font-semibold text-gray-700">Jabatan</th>
                <th className="text-left py-4 px-4 font-semibold text-gray-700">Departemen</th>
                <th className="text-left py-4 px-4 font-semibold text-gray-700">Status</th>
                <th className="text-center py-4 px-4 font-semibold text-gray-700">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredKaryawan.map((k) => (
                <tr key={k.nrp} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4 text-gray-900">{k.nrp}</td>
                  <td className="py-4 px-4 text-gray-900 font-medium">{k.nama}</td>
                  <td className="py-4 px-4 text-gray-600">{k.jabatan}</td>
                  <td className="py-4 px-4 text-gray-600">{k.departemen}</td>
                  <td className="py-4 px-4">
                    <Badge variant={k.status === 'aktif' ? 'success' : 'warning'}>
                      {k.status === 'aktif' ? 'Aktif' : 'Non-Aktif'}
                    </Badge>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <div className="flex justify-center gap-2">
                      <Button variant="secondary" size="sm">
                        <Edit2 size={16} />
                      </Button>
                      <Button variant="danger" size="sm">
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Tambah Karyawan Baru</h2>
              <div className="space-y-4 mb-6">
                <Input
                  label="NRP"
                  name="nrp"
                  value={formData.nrp}
                  onChange={handleInputChange}
                  placeholder="001"
                />
                <Input
                  label="Nama Lengkap"
                  name="nama"
                  value={formData.nama}
                  onChange={handleInputChange}
                  placeholder="Masukkan nama lengkap"
                />
                <Input
                  label="Jabatan"
                  name="jabatan"
                  value={formData.jabatan}
                  onChange={handleInputChange}
                  placeholder="Contoh: Manager"
                />
                <Input
                  label="Departemen"
                  name="departemen"
                  value={formData.departemen}
                  onChange={handleInputChange}
                  placeholder="Contoh: Produksi"
                />
                <Input
                  label="Tanggal Masuk"
                  name="tgl_masuk"
                  type="date"
                  value={formData.tgl_masuk}
                  onChange={handleInputChange}
                />
                <Input
                  label="Akhir Kontrak"
                  name="akhir_kontrak"
                  type="date"
                  value={formData.akhir_kontrak}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  className="flex-1"
                  onClick={() => setShowForm(false)}
                >
                  Batal
                </Button>
                <Button
                  variant="primary"
                  className="flex-1"
                  onClick={handleAddKaryawan}
                >
                  Simpan
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default KaryawanPage;
