import api from './api';

export const savingsService = {
  getCategories: async () => {
    return await api.get('/savings/categories');
  },

  createCategory: async (data) => {
    return await api.post('/savings/categories', data);
  },

  updateCategory: async (id, data) => {
    return await api.put(`/savings/categories/${id}`, data);
  },

  deleteCategory: async (id) => {
    return await api.delete(`/savings/categories/${id}`);
  },

  allocateSavings: async (allocations) => {
    return await api.post('/savings/allocate', { allocations });
  },

  depositSavings: async (amount, transactionId) => {
    return await api.post('/savings/deposit', { amount, transactionId });
  },
};