import api from './api';
import { jwtDecode } from "jwt-decode"; 

export const loginUser = async (credenciales) => {
    const response = await api.post('/auth/login', credenciales);
    
    
    if (response.data && response.data.token) {
        
        localStorage.setItem('token', response.data.token);
        
        
        const decoded = jwtDecode(response.data.token);
        
        
        return decoded; 
    }
    
    return response.data; 
};

export const registerUser = async (datosUsuario) => {
    const response = await api.post('/auth/registro', datosUsuario);
    return response.data;
};


export const logoutUser = () => {
    localStorage.removeItem('token');
};


export const getCurrentUser = () => {
    const token = localStorage.getItem('token');
    if (token) {
        try {
            return jwtDecode(token);
        } catch (error) {
            console.error("Error al leer el token", error);
            return null;
        }
    }
    return null;
};

