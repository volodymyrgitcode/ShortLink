import axios from 'axios';
import { API_BASE_URL } from '../config/config';
import { storage } from '@/utils/storage';

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use(
    (config) => {

        const token = storage.getToken();
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // redirect to login 
        }
        return Promise.reject(error);
    }
);

export default apiClient;