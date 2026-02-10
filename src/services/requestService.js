import api from './api.js';

export const requestService = {
  // Récupérer toutes les demandes
  getRequests: async (filters = {}) => {
    try {
      const params = new URLSearchParams();
      if (filters.type) params.append('type', filters.type);
      if (filters.statut) params.append('statut', filters.statut);
      if (filters.priorite) params.append('priorite', filters.priorite);
      if (filters.recherche) params.append('recherche', filters.recherche);
      if (filters.page) params.append('page', filters.page);
      if (filters.limit) params.append('limit', filters.limit);
      
      const response = await api.get(`/requests?${params.toString()}`);
      return response.data;
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || 'Erreur réseau'
      };
    }
  },

  // Récupérer une demande par ID
  getRequestById: async (id) => {
    try {
      const response = await api.get(`/requests/${id}`);
      return response.data;
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || 'Erreur réseau'
      };
    }
  },

  // Créer une nouvelle demande
  createRequest: async (requestData) => {
    try {
      const response = await api.post('/requests', requestData);
      return response.data;
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || 'Erreur lors de la création'
      };
    }
  },

  // Ajouter un commentaire
  addComment: async (requestId, comment) => {
    try {
      const response = await api.post(`/requests/${requestId}/comments`, {
        contenu: comment
      });
      return response.data;
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || 'Erreur lors de l\'ajout du commentaire'
      };
    }
  }
};