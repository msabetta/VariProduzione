import api from './api';

export const getAllMacchine = async () => {
    const response = await api.get('/macchine');
    return response.data;
};

export const updateStatoMacchina = async (id, stato) => {
    const response = await api.put(`/macchine/${id}/stato`, stato);
    return response.data;
};

export const getMacchineAlerts = async () => {
    const response = await api.get('/macchine/alerts');
    return response.data;
};

export const getMacchineStatusOverview = async () => {
    const response = await api.get('/macchine/status-overview');
    return response.data;
};

export const getMacchineRitardo = async () => {
    const response = await api.get('/macchine/ritardo');
    return response.data;
};

export const getMacchineCritico = async () => {
    const response = await api.get('/macchine/critico');
    return response.data;
};

export const getMacchineMedium = async () => {
    const response = await api.get('/macchine/medium');
    return response.data;
};

export const getMacchineLow = async () => {
    const response = await api.get('/macchine/low');
    return response.data;
};

export const getMacchineByDate = async () => {
    const response = await api.get('/macchine/data');
    return response.data;
};
