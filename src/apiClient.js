import axios from 'axios';

const apiClient = axios.create();

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
