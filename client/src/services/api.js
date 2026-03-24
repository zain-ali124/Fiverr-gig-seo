import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth APIs
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  logout: () => api.post('/auth/logout'),
  getMe: () => api.get('/auth/me'),
  updateDetails: (userData) => api.patch('/auth/updatedetails', userData),
  updatePassword: (passwordData) => api.patch('/auth/updatepassword', passwordData),
  forgotPassword: (email) => api.post('/auth/forgotpassword', { email }),
  resetPassword: (token, password) => api.patch(`/auth/resetpassword/${token}`, { password })
};

// Analysis APIs
export const analysisAPI = {
  analyzeGig: (gigUrl) => api.post('/analysis/analyze', { gigUrl }),
  getAnalysis: (id) => api.get(`/analysis/${id}`),
  getUserAnalyses: () => api.get('/analysis/user/all'),
  deleteAnalysis: (id) => api.delete(`/analysis/${id}`)
};

export default api;