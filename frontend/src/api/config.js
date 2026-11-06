import axios from 'axios';

const rawBaseUrl = import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL || 'https://smarthire-backend-ysya.onrender.com/api';

// Normalize API_BASE_URL so it always ends with /api and has no trailing slashes
export const API_BASE_URL = rawBaseUrl.replace(/\/+$/, '').endsWith('/api')
  ? rawBaseUrl.replace(/\/+$/, '')
  : `${rawBaseUrl.replace(/\/+$/, '')}/api`;

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
});

// Interceptor to strip redundant leading /api if a component calls api.post('/api/upload')
api.interceptors.request.use((config) => {
  if (config.url && config.url.startsWith('/api/')) {
    config.url = config.url.substring(4);
  }
  return config;
});

export default api;
