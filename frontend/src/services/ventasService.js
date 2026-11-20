import api from './api';

const notificarCambioCarrito = () => {
    if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('cartUpdated'));
    }
};

// 1. Carrito temporal en navegador con actualización automática del contador
export const getCart = () => {
    try {
        const cart = localStorage.getItem('tecnorosita_cart');
        return cart ? JSON.parse(cart) : [];
    } catch (error) {
        console.error('Error al leer el carrito:', error);
        return [];
    }
};

export const saveCart = (cart) => {
    localStorage.setItem('tecnorosita_cart', JSON.stringify(cart));
    notificarCambioCarrito();
};

export const clearCart = () => {
    localStorage.removeItem('tecnorosita_cart');
    notificarCambioCarrito();
};

// 2. Conexión real con el Backend Spring Boot (JWT + MySQL)
export const crearBoletaApi = async (nuevaOrden) => {
    const response = await api.post('/boletas', nuevaOrden);
    return response.data;
};

export const obtenerBoletasApi = async () => {
    try {
        const response = await api.get('/boletas');
        return response.data;
    } catch (error) {
        console.error('Error al obtener boletas desde el backend:', error);
        return [];
    }
};

export const obtenerUsuariosApi = async () => {
    try {
        const response = await api.get('/usuarios');
        return response.data;
    } catch (error) {
        console.error('Error al obtener usuarios desde el backend:', error);
        return [];
    }
};

// 3. Compatibilidad con pruebas unitarias de Vitest
export const getOrders = () => {
    try {
        return JSON.parse(localStorage.getItem('tecnorosita_orders')) || [];
    } catch {
        return [];
    }
};

export const saveOrder = (order) => {
    const orders = getOrders();
    const newOrder = {
        ...order,
        id: `ORD-${Date.now()}`,
        fecha: new Date().toLocaleDateString('es-CL')
    };
    orders.push(newOrder);
    localStorage.setItem('tecnorosita_orders', JSON.stringify(orders));
    return newOrder;
};

export const getUsers = () => {
    try {
        return JSON.parse(localStorage.getItem('tecnorosita_users')) || [];
    } catch {
        return [];
    }
};

export const saveUser = (user) => {
    const users = getUsers();
    const existeUsuario = users.find(u => u.email === user.email);

    if (!existeUsuario) {
        users.push({
            ...user,
            id: `USR-${Date.now()}`,
            fechaRegistro: new Date().toLocaleDateString('es-CL')
        });
        localStorage.setItem('tecnorosita_users', JSON.stringify(users));
    }
};

export const ventasService = {
    crearBoleta: crearBoletaApi,
    obtenerBoletas: obtenerBoletasApi,
    obtenerUsuarios: obtenerUsuariosApi,
    crearOrden: saveOrder,
    obtenerOrdenes: getOrders,
    guardarUsuario: saveUser
};