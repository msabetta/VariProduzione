import { fetchDashboard, fetchOrdiniRitardo, fetchGanttData } from './api.js';

export const getDashboardData = async () => {
  return await fetchDashboard();
};

export const getOrdiniRitardo = async () => {
  return await fetchOrdiniRitardo();
};

export const getGanttData = async () => {
  return await fetchGanttData();
};
