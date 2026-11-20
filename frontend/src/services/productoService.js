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

export const obtenerProductoPorId = async (id) => {
    try {
        const response = await api.get(`/productos/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener el producto", error);
        return null;
    }
};

export const crearProducto = async (producto) => {
    const response = await api.post('/productos', producto);
    return response.data;
};

export const actualizarProducto = async (id, producto) => {
    const response = await api.put(`/productos/${id}`, producto);
    return response.data;
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

export const obtenerCategorias = async () => {
    try {
        const response = await api.get('/categorias');
        return response.data;
    } catch (error) {
        console.error("Error al obtener categorías desde el backend", error);
        return [];
    }
};

export const obtenerBoletas = async () => {
    try {
        const response = await api.get('/boletas');
        return response.data;
    } catch (error) {
        console.error("Error al obtener boletas desde el backend", error);
        return [];
    }
};