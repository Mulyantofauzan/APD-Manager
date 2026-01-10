import api from './api';

export const authService = {
  async loginWithGoogle(googleToken) {
    const response = await api.post('/auth/login', { token: googleToken });
    const { authToken, user } = response.data;
    localStorage.setItem('authToken', authToken);
    return user;
  },

  async logout() {
    localStorage.removeItem('authToken');
  },

  async getCurrentUser() {
    try {
      const response = await api.get('/auth/me');
      return response.data;
    } catch (error) {
      return null;
    }
  },

  async checkWhitelist(email) {
    const response = await api.post('/auth/check-whitelist', { email });
    return response.data.isWhitelisted;
  },
};
