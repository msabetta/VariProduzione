import axios from 'axios';
import { getBaseUrl } from '../services/configurationService';


const getOrdiniRitardo = async () => {
    try {
        const response = await axios.get(`${getBaseUrl()}/ordini-ritardo`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

const getOrdiniByDate = async (date) => {
    try {
        const response = await axios.get(`${getBaseUrl()}/ordini-ritardo/${date}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

const getOrdiniCritical = async () => {
    try {
        const response = await axios.get(`${getBaseUrl()}/ordini-ritardo-critical`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

const getOrdiniMedium = async () => {
    try {
        const response = await axios.get(`${getBaseUrl()}/ordini-ritardo-medium`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

const getOrdiniLow = async () => {
    try {
        const response = await axios.get(`${getBaseUrl()}/ordini-ritardo-low`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export {
    getOrdiniRitardo,
    getOrdiniByDate,
    getOrdiniCritical,
    getOrdiniMedium,
    getOrdiniLow
};