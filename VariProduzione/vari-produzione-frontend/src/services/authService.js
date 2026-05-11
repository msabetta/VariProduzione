import api from './api';
import apiEndpoints from '../constants/apiEndpoints';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS, PATCH',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With, Content-Length, Accept, Origin, X-CSRF-TOKEN',
        'Access-Control-Allow-Credentials': 'true',
        'X-Requested-With': 'XMLHttpRequest'
    },
});

export const login = async (username, password) => {
    try {
        const response = await api.post(`${apiEndpoints.auth}/login`, { username, password });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const register = async (username, password) => {
    try {
        const response = await api.post(`${apiEndpoints.auth}/register`, { username, password });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const logout = async () => {
    try {
        const response = await api.post(`${apiEndpoints.auth}/logout`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getUser = async () => {
    try {
        const response = await api.get(`${apiEndpoints.auth}/user`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updatePassword = async (oldPassword, newPassword) => {
    try {
        const response = await api.put(`${apiEndpoints.auth}/update-password`, { oldPassword, newPassword });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const resetPassword = async (email) => {
    try {
        const response = await api.post(`${apiEndpoints.auth}/reset-password`, { email });
        return response.data;
    } catch (error) {
        throw error;
    }
};
