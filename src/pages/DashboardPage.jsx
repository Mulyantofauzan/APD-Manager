import React, { useState, useEffect } from 'react';
import MainLayout from '../layouts/MainLayout';
import Card from '../components/Card';
import Badge from '../components/Badge';
import { AlertCircle, Package, Users, TrendingUp, Clock } from 'lucide-react';

const DashboardPage = () => {
  const [stats, setStats] = useState({
    totalApd: 0,
    lowStockApd: 0,
    totalKaryawan: 0,
    hariIniTransaksi: 0,
  });

  useEffect(() => {
    // Fetch stats dari API
    setStats({
      totalApd: 245,
      lowStockApd: 12,
      totalKaryawan: 156,
      hariIniTransaksi: 8,
    });
  }, []);

  const StatCard = ({ icon: Icon, label, value, color, bgColor }) => (
    <Card className="bg-white">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-600 text-sm">{label}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
        </div>
        <div className={`p-3 rounded-lg ${bgColor}`}>
          <Icon size={24} className={color} />
        </div>
      </div>
    </Card>
  );

  return (
    <MainLayout>
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600 mb-8">Selamat datang di APD Manager</p>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            icon={Package}
            label="Total APD"
            value={stats.totalApd}
            color="text-cyan-600"
            bgColor="bg-cyan-100"
          />
          <StatCard
            icon={AlertCircle}
            label="Stok Menipis"
            value={stats.lowStockApd}
            color="text-red-600"
            bgColor="bg-red-100"
          />
          <StatCard
            icon={Users}
            label="Total Karyawan"
            value={stats.totalKaryawan}
            color="text-green-600"
            bgColor="bg-green-100"
          />
          <StatCard
            icon={Clock}
            label="Transaksi Hari Ini"
            value={stats.hariIniTransaksi}
            color="text-blue-600"
            bgColor="bg-blue-100"
          />
        </div>

        {/* Recent Activities */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Transaksi Terbaru</h2>
                <a href="/transaksi" className="text-cyan-600 hover:text-cyan-700 text-sm font-medium">
                  Lihat Semua
                </a>
              </div>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between py-3 border-b border-gray-200 last:border-0">
                    <div>
                      <p className="font-medium text-gray-900">Karyawan {i}</p>
                      <p className="text-sm text-gray-600">Pengambilan APD</p>
                    </div>
                    <Badge variant="success">Berhasil</Badge>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div>
            <Card>
              <h2 className="text-xl font-bold text-gray-900 mb-6">Notifikasi Penting</h2>
              <div className="space-y-4">
                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <p className="text-sm text-yellow-800">
                    <span className="font-medium">Safety Helmet</span> stok tinggal 3 unit
                  </p>
                </div>
                <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                  <p className="text-sm text-red-800">
                    APD rusak perlu pemusnahan: 5 item
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default DashboardPage;
