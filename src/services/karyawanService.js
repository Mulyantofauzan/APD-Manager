import api from './api';

export const karyawanService = {
  async getAll(filters = {}) {
    const response = await api.get('/karyawan', { params: filters });
    return response.data;
  },

  async getById(nrp) {
    const response = await api.get(`/karyawan/${nrp}`);
    return response.data;
  },

  async create(data) {
    const response = await api.post('/karyawan', data);
    return response.data;
  },

  async update(nrp, data) {
    const response = await api.put(`/karyawan/${nrp}`, data);
    return response.data;
  },

  async delete(nrp) {
    const response = await api.delete(`/karyawan/${nrp}`);
    return response.data;
  },

  async getHistory(nrp) {
    const response = await api.get(`/karyawan/${nrp}/history`);
    return response.data;
  },
};
