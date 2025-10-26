const API_BASE_URL = 'http://localhost:5000/api';

export const apiService = {
  // Get all templates from backend
  getTemplates: async () => {
    const response = await fetch(`${API_BASE_URL}/templates`);
    const data = await response.json();
    return data;
  },

  // Download PDF
  downloadPDF: async (templateId, quoteId) => {
    const response = await fetch(
      `${API_BASE_URL}/templates/pdf/download/${templateId}/${quoteId}`
    );
    return response.blob();
  },

  // Generate PDF for print
  generatePDF: async (templateId, quoteId) => {
    const response = await fetch(
      `${API_BASE_URL}/templates/pdf/generate/${templateId}/${quoteId}`
    );
    return response.blob();
  },

  // Seed sample data
  seedData: async () => {
    const response = await fetch(`${API_BASE_URL}/seed`, {
      method: 'POST'
    });
    return response.json();
  },

  // Health check
  healthCheck: async () => {
    const response = await fetch(`${API_BASE_URL}/health`);
    return response.json();
  }
};

export default apiService;