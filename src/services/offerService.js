import api from './api.js';

export const offerService = {
  // Récupérer toutes les offres
  getOffers: async (filters = {}) => {
    try {
      const params = new URLSearchParams();
      if (filters.type) params.append('type', filters.type);
      if (filters.categorie) params.append('categorie', filters.categorie);
      if (filters.populaire) params.append('populaire', filters.populaire);
      if (filters.miseEnAvant) params.append('miseEnAvant', filters.miseEnAvant);
      
      const response = await api.get(`/offers?${params.toString()}`);
      return response.data;
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || 'Erreur réseau'
      };
    }
  },

  // Récupérer une offre par ID
  getOfferById: async (id) => {
    try {
      const response = await api.get(`/offers/${id}`);
      return response.data;
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || 'Erreur réseau'
      };
    }
  }
};