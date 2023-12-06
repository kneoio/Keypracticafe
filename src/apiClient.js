import axios from 'axios';

const apiClient = axios.create({
    baseURL: process.env.NODE_ENV === 'production'
        ? 'https://api.keypractica.com'
        : 'http://localhost:38707'
});

apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('jwt');
    console.log(localStorage)
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default apiClient;
