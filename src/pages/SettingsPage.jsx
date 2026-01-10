import React, { useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import Badge from '../components/Badge';
import { Settings, Bell, Shield, Database } from 'lucide-react';

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    minStockAlert: 5,
    apdReplacementDays: 60,
    maxUploadSize: 5,
    notifications: true,
    emailNotifications: true,
  });

  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSettingChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSaveSettings = async () => {
    try {
      // TODO: Submit settings ke API
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error('Failed to save settings:', error);
    }
  };

  return (
    <MainLayout>
      <div>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Pengaturan Aplikasi</h1>
          <p className="text-gray-600 mt-1">Kelola preferensi dan konfigurasi sistem</p>
        </div>

        {saveSuccess && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm font-medium">
            ✓ Pengaturan berhasil disimpan
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Settings */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stock Alert Settings */}
            <Card>
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-cyan-100 rounded-lg">
                  <Bell size={24} className="text-cyan-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Notifikasi Stok</h2>
                  <p className="text-sm text-gray-600">Pengaturan peringatan stok APD</p>
                </div>
              </div>
              <div className="space-y-4">
                <Input
                  label="Minimum Stok Alert"
                  name="minStockAlert"
                  type="number"
                  value={settings.minStockAlert}
                  onChange={handleSettingChange}
                  helperText="Jumlah minimal stok sebelum menampilkan peringatan"
                />
                <div>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="notifications"
                      checked={settings.notifications}
                      onChange={handleSettingChange}
                      className="w-4 h-4 rounded border-gray-300"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      Aktifkan notifikasi desktop
                    </span>
                  </label>
                </div>
              </div>
            </Card>

            {/* APD Management Settings */}
            <Card>
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Shield size={24} className="text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Manajemen APD</h2>
                  <p className="text-sm text-gray-600">Pengaturan pergantian dan pengelolaan APD</p>
                </div>
              </div>
              <div className="space-y-4">
                <Input
                  label="Hari Pergantian APD"
                  name="apdReplacementDays"
                  type="number"
                  value={settings.apdReplacementDays}
                  onChange={handleSettingChange}
                  helperText="Jumlah hari sebelum APD perlu diganti"
                />
                <Input
                  label="Ukuran Upload Maksimal (MB)"
                  name="maxUploadSize"
                  type="number"
                  value={settings.maxUploadSize}
                  onChange={handleSettingChange}
                  helperText="Ukuran file maksimal untuk upload dokumen"
                />
              </div>
            </Card>

            {/* Communication Settings */}
            <Card>
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Database size={24} className="text-purple-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Komunikasi</h2>
                  <p className="text-sm text-gray-600">Preferensi notifikasi dan komunikasi</p>
                </div>
              </div>
              <div className="space-y-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="emailNotifications"
                    checked={settings.emailNotifications}
                    onChange={handleSettingChange}
                    className="w-4 h-4 rounded border-gray-300"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Terima notifikasi via email
                  </span>
                </label>
              </div>
            </Card>

            {/* Save Button */}
            <div className="flex gap-3">
              <Button
                variant="primary"
                size="lg"
                className="flex-1"
                onClick={handleSaveSettings}
              >
                Simpan Pengaturan
              </Button>
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6">
            <Card>
              <div className="flex items-center gap-3 mb-4">
                <Settings size={24} className="text-gray-600" />
                <h3 className="font-bold text-gray-900">Informasi Sistem</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-medium text-gray-500">Versi Aplikasi</p>
                  <p className="text-sm font-semibold text-gray-900 mt-1">1.0.0</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500">Status</p>
                  <div className="mt-1">
                    <Badge variant="success">Aktif</Badge>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500">Tipe Aplikasi</p>
                  <p className="text-sm font-semibold text-gray-900 mt-1">SPA & PWA</p>
                </div>
              </div>
            </Card>

            <Card>
              <h3 className="font-bold text-gray-900 mb-4">Bantuan</h3>
              <div className="space-y-3">
                <a
                  href="#"
                  className="block text-sm text-cyan-600 hover:text-cyan-700 font-medium"
                >
                  Dokumentasi
                </a>
                <a
                  href="#"
                  className="block text-sm text-cyan-600 hover:text-cyan-700 font-medium"
                >
                  Hubungi Support
                </a>
                <a
                  href="#"
                  className="block text-sm text-cyan-600 hover:text-cyan-700 font-medium"
                >
                  Laporan Bug
                </a>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default SettingsPage;
