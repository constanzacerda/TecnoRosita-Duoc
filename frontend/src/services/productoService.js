import api from './api';

export const obtenerProductos = async () => {
    try {
        const response = await api.get('/productos');
        return response.data;
    } catch (error) {
        console.error("Error al obtener productos desde el backend", error);
        return []; 
    }
};

export const eliminarProducto = async (id) => {
    try {
        await api.delete(`/productos/${id}`);
        return true;
    } catch (error) {
        console.error("Error al eliminar el producto", error);
        return false;
    }
};

export const obtenerProductoPorId = async (id) => {
    try {
        const response = await api.get(`/productos/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener el producto", error);
        return null;
    }
};
