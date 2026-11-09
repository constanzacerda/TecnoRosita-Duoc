import api from './api'; 

export const loginUser = async (credenciales) => {
    
    const response = await api.post('/auth/login', credenciales);
    return response.data; 
};


export const registerUser = async (datosUsuario) => {
    const response = await api.post('/auth/registro', datosUsuario);
    return response.data;
};