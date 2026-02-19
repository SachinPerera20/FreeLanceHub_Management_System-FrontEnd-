import axios from 'axios';
import { STORAGE_KEYS, readStore } from './storage';

const api = axios.create({
    baseURL: "https://freelance-backend-development.onrender.com/api",
});

api.interceptors.request.use((config) => {
    const token = readStore<string>(STORAGE_KEYS.TOKEN, '');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Try to get the backend's message first, then fall back to generic
        const message =
            error.response?.data?.message ||
            error.response?.data?.error ||
            error.message;
        const path = error.response?.data?.path || '';
        console.error(`API Error [${error.response?.status}] ${path}: ${message}`);
        return Promise.reject(new Error(message));
    }
);

export { api };