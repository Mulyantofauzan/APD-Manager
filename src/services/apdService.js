import api from './api';

export const apdService = {
  // Master APD
  async getAll() {
    const response = await api.get('/master-apd');
    return response.data;
  },

  async getById(id) {
    const response = await api.get(`/master-apd/${id}`);
    return response.data;
  },

  async create(data) {
    const response = await api.post('/master-apd', data);
    return response.data;
  },

  async update(id, data) {
    const response = await api.put(`/master-apd/${id}`, data);
    return response.data;
  },

  async delete(id) {
    const response = await api.delete(`/master-apd/${id}`);
    return response.data;
  },

  // Stock Movement
  async getStockMovement(filters = {}) {
    const response = await api.get('/stock-movement', { params: filters });
    return response.data;
  },

  async recordMovement(data) {
    const response = await api.post('/stock-movement', data);
    return response.data;
  },

  // Transaksi
  async getTransactions(filters = {}) {
    const response = await api.get('/transaksi', { params: filters });
    return response.data;
  },

  async createTransaction(data) {
    const response = await api.post('/transaksi', data);
    return response.data;
  },

  // Pemusnahan
  async getPemusnahan(filters = {}) {
    const response = await api.get('/pemusnahan', { params: filters });
    return response.data;
  },

  async createPemusnahan(data) {
    const response = await api.post('/pemusnahan', data);
    return response.data;
  },
};
