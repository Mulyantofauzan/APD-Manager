import api from './api';

export const authService = {
  /**
   * Login with email and password
   */
  async login(email, password) {
    try {
      const response = await api.post('/auth/login', { email, password });
      const { authToken, user } = response.data;

      if (!authToken) {
        throw new Error('No auth token received');
      }

      localStorage.setItem('authToken', authToken);
      return user;
    } catch (error) {
      if (error.response?.status === 401) {
        throw new Error('Email atau password salah');
      }

      if (error.response?.status === 403) {
        throw new Error('Akun Anda tidak aktif');
      }

      throw new Error(error.response?.data?.error || 'Login gagal');
    }
  },

  /**
   * Legacy Google OAuth method (for backward compatibility)
   */
  async loginWithGoogle(googleToken) {
    const response = await api.post('/auth/login', { token: googleToken });
    const { authToken, user } = response.data;
    localStorage.setItem('authToken', authToken);
    return user;
  },

  /**
   * Logout - clear local token
   */
  async logout() {
    try {
      // Call logout endpoint on server (optional)
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Logout request failed:', error);
    } finally {
      // Always clear local token
      localStorage.removeItem('authToken');
    }
  },

  /**
   * Get current user info
   */
  async getCurrentUser() {
    try {
      const response = await api.get('/auth/me');
      return response.data;
    } catch (error) {
      localStorage.removeItem('authToken');
      return null;
    }
  },

  /**
   * Check if email is whitelisted (deprecated - no longer needed)
   */
  async checkWhitelist(email) {
    const response = await api.post('/auth/check-whitelist', { email });
    return response.data.isWhitelisted;
  },
};
