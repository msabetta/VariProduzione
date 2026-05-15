const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';
console.log('🔧 API_BASE:', API_BASE);  // Debug

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || `HTTP ${response.status}`);
  }
  return response.status === 204 ? null : response.json();
};

const api = {
  get: (url) => {
    const fullUrl = `${API_BASE}${url}`;
    console.log('🔧 GET:', fullUrl);  // Debug
    return fetch(fullUrl).then(handleResponse);
  },
  post: (url, data) => {
    const fullUrl = `${API_BASE}${url}`;
    console.log('🔧 POST:', fullUrl);  // Debug
    return fetch(fullUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(handleResponse);
  },
  put: (url, data) => {
    const fullUrl = `${API_BASE}${url}`;
    console.log('🔧 PUT:', fullUrl);  // Debug
    return fetch(fullUrl, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(handleResponse);
  },
  patch: (url, data) => {
    const fullUrl = `${API_BASE}${url}`;
    console.log('🔧 PATCH:', fullUrl);  // Debug
    return fetch(fullUrl, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(handleResponse);
  },
  delete: (url) => {
    const fullUrl = `${API_BASE}${url}`;
    console.log('🔧 DELETE:', fullUrl);  // Debug
    return fetch(fullUrl, { method: 'DELETE' }).then(handleResponse);
  }
};

// ==================== ORDINI ====================
export const getOrdini = () => api.get('/api/ordini');
export const getOrdine = (id) => api.get(`/api/ordini/${id}`);
export const createOrdine = (data) => api.post('/api/ordini', data);
export const updateOrdine = (id, data) => api.put(`/api/ordini/${id}`, data);
export const deleteOrdine = (id) => api.delete(`/api/ordini/${id}`);
export const updateProgressoOrdine = (id, progresso) => api.put(`/api/ordini/${id}/progresso`, { progresso });

// ==================== MACCHINE ====================
export const getMacchine = () => api.get('/api/macchine');
export const getMacchina = (id) => api.get(`/api/macchine/${id}`);
export const createMacchina = (data) => api.post('/api/macchine', data);
export const updateMacchina = (id, data) => api.put(`/api/macchine/${id}`, data);
export const deleteMacchina = (id) => api.delete(`/api/macchine/${id}`);
export const cambiaStatoMacchina = (id, stato) => api.patch(`/api/macchine/${id}/stato`, { stato });

// ==================== TASKS ====================
export const getTasks = () => api.get('/api/tasks');
export const getTask = (id) => api.get(`/api/tasks/${id}`);
export const createTask = (data) => api.post('/api/tasks', data);
export const updateTask = (id, data) => api.put(`/api/tasks/${id}`, data);
export const deleteTask = (id) => api.delete(`/api/tasks/${id}`);
export const assegnaTask = (id, data) => api.patch(`/api/tasks/${id}/assegna`, data);

// ==================== DASHBOARD / PRODUZIONE ====================
export const getDashboard = () => api.get('/api/produzione/dashboard');
export const getOrdiniRitardo = () => api.get('/api/produzione/ordini-ritardo');
export const getGanttData = () => api.get('/api/produzione/gantt');

// ==================== GESTIONE ====================
export const getOperatori = () => api.get('/api/gestione/operatori');