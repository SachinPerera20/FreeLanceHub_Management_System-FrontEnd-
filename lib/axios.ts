import axios from 'axios';
import { STORAGE_KEYS, readStore } from './storage';

const API_BASE_URL =
import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' }
});

api.interceptors.request.use((config) => {
  const token = readStore<string | null>(STORAGE_KEYS.TOKEN, null);
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export { api };