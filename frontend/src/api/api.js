// import axios from "axios";

// const BASE_URL = "http://localhost:5000/api/templates";

// const apiService = {
//   // STANDARD TEMPLATE
//   getStandardTemplates: async () => {
//     const res = await axios.get(`${BASE_URL}/standard`);
//     return res.data;
//   },
//   createStandardTemplate: async (data) => {
//     const res = await axios.post(`${BASE_URL}/standard`, data);
//     return res.data;
//   },
//   getStandardById: async (id) => {
//     const res = await axios.get(`${BASE_URL}/standard/${id}`);
//     return res.data;
//   },

//   // EU TEMPLATE
//   getEUTemplates: async () => {
//     const res = await axios.get(`${BASE_URL}/eu`);
//     return res.data;
//   },
//   createEUTemplate: async (data) => {
//     const res = await axios.post(`${BASE_URL}/eu`, data);
//     return res.data;
//   },
//   getEUById: async (id) => {
//     const res = await axios.get(`${BASE_URL}/eu/${id}`);
//     return res.data;
//   },

//   // SPREADSHEET TEMPLATE
//   getSpreadsheetTemplates: async () => {
//     const res = await axios.get(`${BASE_URL}/spreadsheet`);
//     return res.data;
//   },
//   createSpreadsheetTemplate: async (data) => {
//     const res = await axios.post(`${BASE_URL}/spreadsheet`, data);
//     return res.data;
//   },
//   getSpreadsheetById: async (id) => {
//     const res = await axios.get(`${BASE_URL}/spreadsheet/${id}`);
//     return res.data;
//   },
// };

// export default apiService;

import axios from "axios";

const API_BASE = "http://localhost:5000/api/templates"; // ✅ backend base URL

// Helper function for blob (PDF download)
const getBlob = async (url) => {
  const res = await axios.get(url, { responseType: "blob" });
  return res.data;
};

const apiService = {
  /** ---------------- STANDARD TEMPLATE ---------------- */
  getStandardTemplates: async () => {
    const res = await axios.get(`${API_BASE}/standard`);
    return res.data;
  },

  getStandardById: async (id) => {
    const res = await axios.get(`${API_BASE}/standard/${id}`);
    return res.data;
  },

  createStandard: async (data) => {
    const res = await axios.post(`${API_BASE}/standard`, data);
    return res.data;
  },

  updateStandard: async (id, data) => {
    const res = await axios.put(`${API_BASE}/standard/${id}`, data);
    return res.data;
  },

  deleteStandard: async (id) => {
    const res = await axios.delete(`${API_BASE}/standard/${id}`);
    return res.data;
  },

  downloadStandardPDF: async (id) => {
    return getBlob(`${API_BASE}/standard/pdf/download/${id}`);
  },

  /** ---------------- EU QUOTE TEMPLATE ---------------- */
  getEUTemplates: async () => {
    const res = await axios.get(`${API_BASE}/eu`);
    return res.data;
  },

  getEUById: async (id) => {
    const res = await axios.get(`${API_BASE}/eu/${id}`);
    return res.data;
  },

  createEU: async (data) => {
    const res = await axios.post(`${API_BASE}/eu`, data);
    return res.data;
  },

  updateEU: async (id, data) => {
    const res = await axios.put(`${API_BASE}/eu/${id}`, data);
    return res.data;
  },

  deleteEU: async (id) => {
    const res = await axios.delete(`${API_BASE}/eu/${id}`);
    return res.data;
  },

  downloadEUPDF: async (id) => {
    return getBlob(`${API_BASE}/eu/pdf/download/${id}`);
  },

  /** ---------------- SPREADSHEET TEMPLATE ---------------- */
  getSpreadsheetTemplates: async () => {
    const res = await axios.get(`${API_BASE}/spreadsheet`);
    return res.data;
  },

  getSpreadsheetById: async (id) => {
    const res = await axios.get(`${API_BASE}/spreadsheet/${id}`);
    return res.data;
  },

  createSpreadsheet: async (data) => {
    const res = await axios.post(`${API_BASE}/spreadsheet`, data);
    return res.data;
  },

  updateSpreadsheet: async (id, data) => {
    const res = await axios.put(`${API_BASE}/spreadsheet/${id}`, data);
    return res.data;
  },

  deleteSpreadsheet: async (id) => {
    const res = await axios.delete(`${API_BASE}/spreadsheet/${id}`);
    return res.data;
  },

  downloadSpreadsheetPDF: async (id) => {
    return getBlob(`${API_BASE}/spreadsheet/pdf/download/${id}`);
  },
};

export default apiService;

