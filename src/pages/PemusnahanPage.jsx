import React, { useState, useEffect } from 'react';
import MainLayout from '../layouts/MainLayout';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import Badge from '../components/Badge';
import { Plus, FileText, Trash2 } from 'lucide-react';

const PemusnahanPage = () => {
  const [pemusnahanList, setPemusnahanList] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    jenis_apd: '',
    qty: '',
    alasan: '',
    keterangan: '',
  });

  useEffect(() => {
    // Fetch pemusnahan dari API
    setPemusnahanList([
      {
        id: 1,
        jenis_apd: 'Safety Helmet',
        qty: 3,
        alasan: 'Rusak',
        tanggal: '2024-01-05',
        status: 'selesai',
      },
      {
        id: 2,
        jenis_apd: 'Safety Gloves',
        qty: 5,
        alasan: 'Rusak',
        tanggal: '2024-01-08',
        status: 'selesai',
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

  const handleAddPemusnahan = () => {
    // TODO: Submit ke API
    setShowForm(false);
    setFormData({
      jenis_apd: '',
      qty: '',
      alasan: '',
      keterangan: '',
    });
  };

  return (
    <MainLayout>
      <div>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Pemusnahan APD</h1>
            <p className="text-gray-600 mt-1">Catat APD yang dimusnahkan</p>
          </div>
          <Button
            variant="primary"
            className="gap-2 w-full md:w-auto"
            onClick={() => setShowForm(true)}
          >
            <Plus size={20} />
            Tambah Pemusnahan
          </Button>
        </div>

        {/* Pemusnahan List */}
        <div className="space-y-4">
          {pemusnahanList.map((p) => (
            <Card key={p.id} className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-bold text-gray-900">{p.jenis_apd}</h3>
                  <Badge variant="success">Selesai</Badge>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                  <div>
                    <p className="text-xs font-medium text-gray-500">Jumlah</p>
                    <p>{p.qty} unit</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500">Alasan</p>
                    <p>{p.alasan}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500">Tanggal</p>
                    <p>{new Date(p.tanggal).toLocaleDateString('id-ID')}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500">Status</p>
                    <p className="font-medium text-green-600">Selesai</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 w-full md:w-auto">
                <Button variant="secondary" size="sm" className="gap-2 flex-1 md:flex-none">
                  <FileText size={16} />
                  <span className="hidden md:inline">BA/Dokumen</span>
                </Button>
                <Button variant="danger" size="sm">
                  <Trash2 size={16} />
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Catat Pemusnahan APD</h2>
              <div className="space-y-4 mb-6">
                <Input
                  label="Jenis APD"
                  name="jenis_apd"
                  value={formData.jenis_apd}
                  onChange={handleInputChange}
                  placeholder="Safety Helmet"
                />
                <Input
                  label="Jumlah Unit"
                  name="qty"
                  type="number"
                  value={formData.qty}
                  onChange={handleInputChange}
                  placeholder="0"
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Alasan Pemusnahan
                  </label>
                  <select
                    name="alasan"
                    value={formData.alasan}
                    onChange={handleInputChange}
                    className="input-base"
                  >
                    <option value="">Pilih alasan</option>
                    <option value="Rusak">Rusak</option>
                    <option value="Hilang">Hilang</option>
                    <option value="Kadaluarsa">Kadaluarsa</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                </div>
                <Input
                  label="Keterangan"
                  name="keterangan"
                  value={formData.keterangan}
                  onChange={handleInputChange}
                  placeholder="Masukkan catatan tambahan"
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Foto Bukti (opsional)
                  </label>
                  <input type="file" accept="image/*" className="input-base" />
                </div>
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
                  onClick={handleAddPemusnahan}
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

export default PemusnahanPage;
