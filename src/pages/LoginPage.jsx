import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { authService } from '../services/authService';
import Button from '../components/Button';
import Card from '../components/Card';
import { Shield, Lock } from 'lucide-react';

const LoginPage = () => {
  const navigate = useNavigate();
  const { setUser, isAuthenticated, setError, error } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleGoogleLogin = async () => {
    try {
      // This is a placeholder - integrate with Google OAuth in production
      const token = 'google_token_here';

      const user = await authService.loginWithGoogle(token);
      setUser(user);
      navigate('/dashboard');
    } catch (err) {
      setError('Login gagal. Silakan coba lagi.');
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

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Login dengan</span>
              </div>
            </div>

            {/* Google Login Button */}
            <Button
              variant="primary"
              size="lg"
              className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
              onClick={handleGoogleLogin}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/>
              </svg>
              Masuk dengan Google
            </Button>

            {/* Helper Text */}
            <p className="text-center text-gray-600 text-sm">
              Gunakan akun email yang sudah terdaftar di sistem
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
