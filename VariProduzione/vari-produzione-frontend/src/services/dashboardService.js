import api from './api';

export const getDashboardData = async () => {
    const response = await api.get('/produzione/dashboard');
    return response.data;
};

export const getGanttData = async () => {
    const response = await api.get('/produzione/gantt');
    return response.data;
};

export const getStatusOverview = async () => {
    const response = await api.get('/produzione/status-overview');
    return response.data;
};

export const getAlerts = async () => {
    const response = await api.get('/produzione/alerts');
    return response.data;
};


export const getMachineData = async () => {
    const response = await api.get('/dashboard/macchine');
    return response.data;
};

export const getMachineAlerts = async () => {
    const response = await api.get('/dashboard/macchine/alerts');
    return response.data;
};

export const getMachineStatusOverview = async () => {
    const response = await api.get('/dashboard/macchine/status-overview');
    return response.data;
};

export const getMacchineAlerts = async () => {
    const response = await api.get('/dashboard/macchine/alerts');
    return response.data;
};

export const getOrdiniRitardo = async () => {
    const response = await api.get('/dashboard/ordini/ritardo');
    return response.data;
};

export const getOrdiniCritical = async () => {
    const response = await api.get('/dashboard/ordini/ritardo');
    return response.data;
};

export const getOrdiniMedium = async () => {
    const response = await api.get('/dashboard/ordini/ritardo');
    return response.data;
};

export const getOrdiniLow = async () => {
    const response = await api.get('/dashboard/ordini/ritardo');
    return response.data;
};

export const getOrdiniByDate = async () => {
    const response = await api.get('/dashboard/ordini/data');
    return response.data;
};
