const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const fetchDashboard = async () => {
  const response = await fetch(`${API_URL}/produzione/dashboard`);
  if (!response.ok) throw new Error('Errore API: ' + response.status);
  return response.json();
};

export const fetchOrdiniRitardo = async () => {
  const response = await fetch(`${API_URL}/produzione/ordini-ritardo`);
  if (!response.ok) throw new Error('Errore API: ' + response.status);
  return response.json();
};

export const fetchGanttData = async () => {
  const response = await fetch(`${API_URL}/produzione/gantt`);
  if (!response.ok) throw new Error('Errore API: ' + response.status);
  return response.json();
};

// CORREZIONE: Aggiunto default export
export default {
  fetchDashboard,
  fetchOrdiniRitardo,
  fetchGanttData
};
