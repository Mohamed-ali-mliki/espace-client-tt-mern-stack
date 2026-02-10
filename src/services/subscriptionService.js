import api from './api.js';

export const subscriptionService = {
  // Récupérer tous les abonnements
  getSubscriptions: async (filters = {}) => {
    try {
      const params = new URLSearchParams();
      if (filters.type) params.append('type', filters.type);
      if (filters.statut) params.append('statut', filters.statut);
      
      const response = await api.get(`/subscriptions?${params.toString()}`);
      return response.data;
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || 'Erreur réseau'
      };
    }
  },

  // Récupérer un abonnement par ID
  getSubscriptionById: async (id) => {
    try {
      const response = await api.get(`/subscriptions/${id}`);
      return response.data;
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || 'Erreur réseau'
      };
    }
  },

  // Créer un nouvel abonnement
  createSubscription: async (subscriptionData) => {
    try {
      const response = await api.post('/subscriptions', subscriptionData);
      return response.data;
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || 'Erreur lors de la création'
      };
    }
  },

  // Mettre à jour un abonnement
  updateSubscription: async (id, updateData) => {
    try {
      const response = await api.put(`/subscriptions/${id}`, updateData);
      return response.data;
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || 'Erreur lors de la mise à jour'
      };
    }
  },

  // Résilier un abonnement
  cancelSubscription: async (id) => {
    try {
      const response = await api.put(`/subscriptions/${id}/cancel`);
      return response.data;
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || 'Erreur lors de la résiliation'
      };
    }
  }
};