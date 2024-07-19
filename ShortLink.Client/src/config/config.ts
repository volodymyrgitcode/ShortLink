
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const API_ENDPOINTS = {
    URLS: {
        FETCH: import.meta.env.VITE_API_URL_GET || '/api/Url',
        CREATE: import.meta.env.VITE_API_URL_POST || '/api/Url',
        DELETE: import.meta.env.VITE_API_URL_DELETE || '/api/Url'
    },
};

export const AUTH_ENDPOINTS = {
    LOGIN: '/api/Auth/login',
    REGISTER: '/api/Auth/register',
    LOGOUT: '/api/Auth/logout',
};