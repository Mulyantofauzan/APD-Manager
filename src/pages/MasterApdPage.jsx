import React, { useState, useEffect } from 'react';
import MainLayout from '../layouts/MainLayout';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import Badge from '../components/Badge';
import { Plus, Edit2, Trash2, Search } from 'lucide-react';

const MasterApdPage = () => {
  const [apdList, setApdList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    jenis_apd: '',
    merk: '',
    ukuran: '',
    warna: '',
    stock_qty: '',
    min_stock: '',
    keterangan: '',
  });

  useEffect(() => {
    // Fetch master APD dari API
    setApdList([
      {
        id_apd: 1,
        jenis_apd: 'Safety Helmet',
        merk: 'MSA',
        ukuran: 'L',
        warna: 'Kuning',
        stock_qty: 45,
        min_stock: 10,
      },
      {
        id_apd: 2,
        jenis_apd: 'Safety Gloves',
        merk: 'Honeywell',
        ukuran: 'M',
        warna: 'Putih',
        stock_qty: 3,
        min_stock: 20,
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

  const handleAddApd = async () => {
    try {
      // Validate form data
      if (!formData.jenis_apd || !formData.merk || !formData.ukuran || !formData.warna) {
        alert('Mohon isi semua field yang diperlukan');
        return;
      }

      // TODO: Submit ke API
      // const response = await apdService.addApd(formData);

      // Add to local list for now
      const newId = Math.max(...apdList.map((a) => a.id_apd), 0) + 1;
      setApdList((prev) => [
        ...prev,
        {
          id_apd: newId,
          ...formData,
          stock_qty: parseInt(formData.stock_qty) || 0,
          min_stock: parseInt(formData.min_stock) || 0,
        },
      ]);

      setShowForm(false);
      setFormData({
        jenis_apd: '',
        merk: '',
        ukuran: '',
        warna: '',
        stock_qty: '',
        min_stock: '',
        keterangan: '',
      });
    } catch (error) {
      console.error('Failed to add APD:', error);
      alert('Gagal menambah APD. Silakan coba lagi.');
    }
  };

  const filteredApd = apdList.filter((apd) =>
    apd.jenis_apd.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <MainLayout>
      <div>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Master APD</h1>
            <p className="text-gray-600 mt-1">Kelola data APD dan stok</p>
          </div>
          <Button
            variant="primary"
            className="gap-2 w-full md:w-auto"
            onClick={() => setShowForm(true)}
          >
            <Plus size={20} />
            Tambah APD
          </Button>
        </div>

        {/* Search Bar */}
        <Card className="mb-6">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                placeholder="Cari jenis APD..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </Card>

        {/* APD List */}
        <div className="grid grid-cols-1 gap-4">
          {filteredApd.map((apd) => (
            <Card key={apd.id_apd} className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-bold text-gray-900">{apd.jenis_apd}</h3>
                  <Badge variant={apd.stock_qty < apd.min_stock ? 'danger' : 'success'}>
                    Stok: {apd.stock_qty}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                  <div>
                    <p className="text-xs font-medium text-gray-500">Merk</p>
                    <p>{apd.merk}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500">Ukuran</p>
                    <p>{apd.ukuran}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500">Warna</p>
                    <p>{apd.warna}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500">Min. Stok</p>
                    <p>{apd.min_stock}</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="secondary" size="sm">
                  <Edit2 size={16} />
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
            <Card className="w-full max-w-md">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Tambah APD Baru</h2>
              <div className="space-y-4 mb-6">
                <Input
                  label="Jenis APD"
                  name="jenis_apd"
                  value={formData.jenis_apd}
                  onChange={handleInputChange}
                  placeholder="Contoh: Safety Helmet"
                />
                <Input
                  label="Merk"
                  name="merk"
                  value={formData.merk}
                  onChange={handleInputChange}
                  placeholder="Contoh: MSA"
                />
                <Input
                  label="Ukuran"
                  name="ukuran"
                  value={formData.ukuran}
                  onChange={handleInputChange}
                  placeholder="Contoh: L"
                />
                <Input
                  label="Warna"
                  name="warna"
                  value={formData.warna}
                  onChange={handleInputChange}
                  placeholder="Contoh: Kuning"
                />
                <Input
                  label="Jumlah Stok"
                  name="stock_qty"
                  type="number"
                  value={formData.stock_qty}
                  onChange={handleInputChange}
                  placeholder="0"
                />
                <Input
                  label="Minimum Stok"
                  name="min_stock"
                  type="number"
                  value={formData.min_stock}
                  onChange={handleInputChange}
                  placeholder="0"
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
                  onClick={handleAddApd}
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

export default MasterApdPage;
