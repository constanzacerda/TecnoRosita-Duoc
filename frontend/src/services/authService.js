import api from './api';
import { jwtDecode } from 'jwt-decode';

export const loginUser = async (credenciales) => {
    const response = await api.post('/auth/login', credenciales);

    if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token);
        if (response.data.nombre) {
            localStorage.setItem('user_nombre', response.data.nombre);
        }

        const decoded = jwtDecode(response.data.token);
        const nombreVisible = response.data.nombre || decoded.sub;

        return {
            id: decoded.sub,
            sub: decoded.sub,
            email: decoded.sub,
            nombre: nombreVisible,
            username: nombreVisible,
            rol: decoded.rol
        };
    }

    return null;
};

export const registerUser = async (datosUsuario) => {
    const response = await api.post('/auth/registro', datosUsuario);
    return response.data;
};

export const logoutUser = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user_nombre');
};

export const getCurrentUser = () => {
    const token = localStorage.getItem('token');
    if (token) {
        try {
            const decoded = jwtDecode(token);
            if (decoded.exp && decoded.exp * 1000 < Date.now()) {
                logoutUser();
                return null;
            }

            const nombreGuardado = localStorage.getItem('user_nombre') || decoded.sub;
            return {
                id: decoded.sub,
                sub: decoded.sub,
                email: decoded.sub,
                nombre: nombreGuardado,
                username: nombreGuardado,
                rol: decoded.rol
            };
        } catch (error) {
            console.error("Error al leer el token", error);
            logoutUser();
            return null;
        }
    }
    return null;
};