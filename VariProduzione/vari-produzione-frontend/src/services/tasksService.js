import api from "./api";
import apiEndpoints from "../constants/apiEndpoints";


export const getTasks = async () => {
    const response = await api.get(apiEndpoints.tasks);
    return response.data;
};

export const getTaskById = async (id) => {
    const response = await api.get(apiEndpoints.tasks + `/${id}`);
    return response.data;
}; 

export const getTaskByDate = async (date) => {
    const response = await api.get(apiEndpoints.tasks + `/${date}`);
    return response.data;
};

export const getTaskInProgress = async () => {
    const response = await api.get(apiEndpoints.tasksInProgress);
    return response.data;
};

export const getTaskCompleted = async () => {
    const response = await api.get(apiEndpoints.tasksCompleted);
    return response.data;
};

export const updateTaskStato = async (id, stato) => {
    const response = await api.put(apiEndpoints.tasks + `/${id}/stato`, stato);
    return response.data;
};

export const getTaskRitardo = async () => {
    const response = await api.get(apiEndpoints.tasksRitardo);
    return response.data;
};


export const getTaskCritical = async () => {
    const response = await api.get(apiEndpoints.tasksCritical);
    return response.data;
};

export const getTaskMedium = async () => {
    const response = await api.get(apiEndpoints.tasksMedium);
    return response.data;
};

export const getTaskLow = async () => {
    const response = await api.get(apiEndpoints.tasksLow);
    return response.data;
};
