import axios from 'axios';

const apiClient = axios.create({
    baseURL: process.env.NODE_ENV === 'production'
        ? 'https://api.keypractica.com'
        : 'http://localhost:38707'
});

// Add an interceptor to attach the token and language header to every request
apiClient.interceptors.request.use((config) => {
    // Retrieve token if it exists
    const token = localStorage.getItem('jwt');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    // Retrieve the selected language from localStorage and add it to the headers
    const selectedLanguage = localStorage.getItem('selectedLanguage');
    if (selectedLanguage) {
        //TODO the language code shall be sent here instead
        config.headers['Accept-Language'] = selectedLanguage;
    }

    return config;
}, (error) => {
    return Promise.reject(error);
});

export default apiClient;
