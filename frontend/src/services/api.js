import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api/v1',
});

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

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            const enLogin = window.location.pathname === '/login';
            if (!enLogin) {
                console.warn("Sesión expirada o no autorizada. Redirigiendo al login...");
                localStorage.removeItem('token');
                localStorage.removeItem('user_nombre');
                window.location.href = '/login';
            }
        } else if (error.response && error.response.status === 403) {
            console.warn("Acceso denegado (403): tu rol no tiene permisos para esta operación.");
        }
        return Promise.reject(error);
    }
);

export default api;
