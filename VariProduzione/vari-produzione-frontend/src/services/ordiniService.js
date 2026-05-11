import api from "./api";
import apiEndpoints from "../constants/apiEndpoints";
import { getBaseUrl } from "./configurationService";

const apiUrl = getBaseUrl();

export const getOrdiniRitardo = async () => {
    const response = await api.get(apiEndpoints.ordiniRitardo);
    return response.data;
};

export const getOrdiniByDate = async (date) => {
    const response = await api.get(apiEndpoints.ordiniByDate + `/${date}`);
    return response.data;
};

export const getOrdiniCritical = async () => {
    const response = await api.get(apiEndpoints.ordiniCritical);
    return response.data;
};

export const getOrdiniMedium = async () => {
    const response = await api.get(apiEndpoints.ordiniMedium);
    return response.data;
};

export const getOrdiniLow = async () => {
    const response = await api.get(apiEndpoints.ordiniLow);
    return response.data;
}; 

export const getAllOrdini = async () => {
    const response = await api.get(apiEndpoints.ordini);
    return response.data;
};

export const getOrdiniInProgress = async () => {
    const response = await api.get(apiEndpoints.ordiniInProgress);
    return response.data;
};  

export const getOrdiniPending = async () => {
    const response = await api.get(apiEndpoints.ordiniPending);
    return response.data;
}; 

export const getOrdiniCompleted = async () => {
    const response = await api.get(apiEndpoints.ordiniCompleted);
    return response.data;
}; 

export const updateOrderStato = async (id, stato) => {
    const response = await api.put(apiEndpoints.ordini + `/${id}/stato`, stato);
    return response.data;
};
