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

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0891b2 0%, #0284c7 50%, #1e3a8a 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px',
      position: 'relative',
      overflow: 'hidden'
    },
    bgBlob1: {
      position: 'absolute',
      top: '40px',
      left: '40px',
      width: '384px',
      height: '384px',
      background: 'rgba(34, 211, 238, 0.2)',
      borderRadius: '50%',
      filter: 'blur(64px)',
      animation: 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite'
    },
    bgBlob2: {
      position: 'absolute',
      bottom: '-128px',
      right: '40px',
      width: '384px',
      height: '384px',
      background: 'rgba(96, 165, 250, 0.2)',
      borderRadius: '50%',
      filter: 'blur(64px)',
      animation: 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite'
    },
    content: {
      position: 'relative',
      zIndex: 10,
      width: '100%',
      maxWidth: '448px'
    },
    header: {
      textAlign: 'center',
      marginBottom: '32px'
    },
    iconCircle: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '80px',
      height: '80px',
      background: 'white',
      borderRadius: '50%',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
      marginBottom: '24px'
    },
    title: {
      fontSize: '48px',
      fontWeight: 'bold',
      color: 'white',
      marginBottom: '8px',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    },
    subtitle: {
      fontSize: '18px',
      color: 'rgba(165, 243, 252, 1)',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    },
    card: {
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
      borderRadius: '12px',
      padding: '32px',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      marginBottom: '24px'
    },
    errorBox: {
      padding: '16px',
      background: 'rgba(254, 242, 242, 1)',
      border: '2px solid rgba(248, 113, 113, 1)',
      borderRadius: '8px',
      color: 'rgba(220, 38, 38, 1)',
      fontSize: '14px',
      fontWeight: '500',
      display: 'flex',
      alignItems: 'flex-start',
      gap: '12px',
      marginBottom: '20px'
    },
    featureItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      color: 'rgba(55, 65, 81, 1)',
      marginBottom: '16px'
    },
    featureIcon: {
      width: '32px',
      height: '32px',
      borderRadius: '50%',
      background: 'rgba(207, 250, 254, 1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    },
    formGroup: {
      marginBottom: '16px'
    },
    label: {
      display: 'block',
      fontSize: '14px',
      fontWeight: '600',
      color: 'rgba(17, 24, 39, 1)',
      marginBottom: '6px'
    },
    input: {
      width: '100%',
      padding: '12px 16px',
      fontSize: '14px',
      border: '1px solid rgba(229, 231, 235, 1)',
      borderRadius: '8px',
      boxSizing: 'border-box',
      fontFamily: 'inherit',
      transition: 'all 0.3s ease'
    },
    inputFocus: {
      outline: 'none',
      borderColor: 'rgba(8, 145, 178, 1)',
      boxShadow: '0 0 0 3px rgba(8, 145, 178, 0.1)'
    },
    button: {
      width: '100%',
      padding: '12px 16px',
      marginTop: '8px',
      fontSize: '16px',
      fontWeight: '600',
      color: 'white',
      background: 'linear-gradient(to right, rgba(6, 182, 212, 1), rgba(37, 99, 235, 1))',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      fontFamily: 'inherit'
    },
    buttonHover: {
      background: 'linear-gradient(to right, rgba(8, 180, 210, 1), rgba(30, 58, 138, 1))',
      boxShadow: '0 10px 25px -5px rgba(8, 145, 178, 0.3)'
    },
    buttonDisabled: {
      opacity: 0.6,
      cursor: 'not-allowed'
    },
    helperText: {
      textAlign: 'center',
      color: 'rgba(75, 85, 99, 1)',
      fontSize: '12px',
      marginTop: '12px'
    },
    footer: {
      marginTop: '32px',
      textAlign: 'center',
      color: 'rgba(165, 243, 252, 1)'
    },
    footerText: {
      fontSize: '14px',
      marginBottom: '8px'
    },
    footerSmall: {
      fontSize: '12px',
      color: 'rgba(186, 230, 253, 1)'
    }
  };

  return (
    <div style={styles.container}>
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.3; }
        }
        input:focus {
          outline: none !important;
          border-color: #0891b2 !important;
          box-shadow: 0 0 0 3px rgba(8, 145, 178, 0.1) !important;
        }
        button:hover:not(:disabled) {
          background: linear-gradient(to right, #0ab8d2, #1e3a8a) !important;
          box-shadow: 0 10px 25px -5px rgba(8, 145, 178, 0.3) !important;
        }
      `}</style>

      {/* Background blobs */}
      <div style={styles.bgBlob1}></div>
      <div style={styles.bgBlob2}></div>

      {/* Content */}
      <div style={styles.content}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.iconCircle}>
            <Shield size={40} style={{ color: '#0891b2' }} />
          </div>
          <h1 style={styles.title}>APD Manager</h1>
          <p style={styles.subtitle}>Sistem Pengelolaan Alat Pelindung Diri</p>
        </div>

        {/* Card */}
        <div style={styles.card}>
          {/* Error */}
          {error && (
            <div style={styles.errorBox}>
              <span style={{ fontSize: '18px' }}>⚠️</span>
              <div>{error}</div>
            </div>
          )}

          {/* Features */}
          <div style={{ marginBottom: '24px', paddingBottom: '16px' }}>
            <div style={styles.featureItem}>
              <div style={styles.featureIcon}>
                <Lock size={16} style={{ color: '#0891b2' }} />
              </div>
              <span style={{ fontSize: '14px', fontWeight: '500' }}>Keamanan terjamin dengan enkripsi</span>
            </div>
            <div style={styles.featureItem}>
              <div style={styles.featureIcon}>
                <Shield size={16} style={{ color: '#0891b2' }} />
              </div>
              <span style={{ fontSize: '14px', fontWeight: '500' }}>Manajemen APD yang komprehensif</span>
            </div>
            <div style={styles.featureItem}>
              <div style={styles.featureIcon}>
                <Lock size={16} style={{ color: '#0891b2' }} />
              </div>
              <span style={{ fontSize: '14px', fontWeight: '500' }}>Akses real-time ke data penting</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Email</label>
              <input
                style={styles.input}
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="nama@example.com"
                disabled={isLoading}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Password</label>
              <input
                style={styles.input}
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Masukkan password"
                disabled={isLoading}
              />
            </div>

            <button
              style={{
                ...styles.button,
                ...(isLoading ? styles.buttonDisabled : {})
              }}
              disabled={isLoading}
              type="submit"
              onMouseEnter={(e) => {
                if (!isLoading) {
                  e.target.style.background = styles.buttonHover.background;
                  e.target.style.boxShadow = styles.buttonHover.boxShadow;
                }
              }}
              onMouseLeave={(e) => {
                e.target.style.background = styles.button.background;
                e.target.style.boxShadow = 'none';
              }}
            >
              {isLoading ? 'Sedang login...' : 'Masuk'}
            </button>
          </form>

          {/* Helper */}
          <p style={styles.helperText}>
            Gunakan email dan password yang sudah terdaftar di sistem
          </p>
        </div>

        {/* Footer */}
        <div style={styles.footer}>
          <p style={styles.footerText}>© 2026 APD Manager. Semua hak dilindungi.</p>
          <p style={styles.footerSmall}>Versi 1.0.0 | SPA & PWA Ready</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
