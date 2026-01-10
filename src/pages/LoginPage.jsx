import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { authService } from '../services/authService';
import Button from '../components/Button';
import Card from '../components/Card';
import Input from '../components/Input';
import { Shield, Lock } from 'lucide-react';

const LoginPage = () => {
  const navigate = useNavigate();
  const { setUser, setLoading, isAuthenticated, setError, error, clearError } = useAuthStore();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) clearError();
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError('Email dan password harus diisi');
      return;
    }

    try {
      setIsLoading(true);
      const user = await authService.login(formData.email, formData.password);
      setUser(user);
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login gagal. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-600 via-blue-600 to-blue-800 flex items-center justify-center px-4 py-12">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-96 h-96 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-32 right-10 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Header Icon */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full shadow-lg mb-6">
            <Shield size={40} className="text-cyan-600" />
          </div>
          <h1 className="text-5xl font-bold text-white mb-2">APD Manager</h1>
          <p className="text-cyan-100 text-lg">Sistem Pengelolaan Alat Pelindung Diri</p>
        </div>

        {/* Main Card */}
        <Card className="bg-white/95 backdrop-blur shadow-2xl">
          <div className="space-y-6">
            {/* Error Message */}
            {error && (
              <div className="p-4 bg-red-50 border-2 border-red-200 rounded-lg text-red-700 text-sm font-medium flex items-start gap-3">
                <span className="text-lg">⚠️</span>
                <div>{error}</div>
              </div>
            )}

            {/* Features List */}
            <div className="space-y-3 py-4">
              <div className="flex items-center gap-3 text-gray-700">
                <div className="w-8 h-8 rounded-full bg-cyan-100 flex items-center justify-center flex-shrink-0">
                  <Lock size={16} className="text-cyan-600" />
                </div>
                <span className="text-sm font-medium">Keamanan terjamin dengan enkripsi</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <div className="w-8 h-8 rounded-full bg-cyan-100 flex items-center justify-center flex-shrink-0">
                  <Shield size={16} className="text-cyan-600" />
                </div>
                <span className="text-sm font-medium">Manajemen APD yang komprehensif</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <div className="w-8 h-8 rounded-full bg-cyan-100 flex items-center justify-center flex-shrink-0">
                  <Lock size={16} className="text-cyan-600" />
                </div>
                <span className="text-sm font-medium">Akses real-time ke data penting</span>
              </div>
            </div>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="nama@example.com"
                disabled={isLoading}
              />

              <Input
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Masukkan password"
                disabled={isLoading}
              />

              <Button
                variant="primary"
                size="lg"
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
                disabled={isLoading}
                type="submit"
              >
                {isLoading ? 'Sedang login...' : 'Masuk'}
              </Button>
            </form>

            {/* Helper Text */}
            <p className="text-center text-gray-600 text-xs">
              Gunakan email dan password yang sudah terdaftar di sistem
            </p>
          </div>
        </Card>

        {/* Footer */}
        <div className="mt-8 text-center text-cyan-100">
          <p className="text-sm">© 2026 APD Manager. Semua hak dilindungi.</p>
          <p className="text-xs mt-2 text-cyan-200">Versi 1.0.0 | SPA & PWA Ready</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
