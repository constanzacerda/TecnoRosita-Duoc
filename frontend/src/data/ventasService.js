export const getCart = () => JSON.parse(localStorage.getItem('tecnorosita_cart')) || [];
export const saveCart = (cart) => localStorage.setItem('tecnorosita_cart', JSON.stringify(cart));
export const clearCart = () => localStorage.removeItem('tecnorosita_cart');

export const getOrders = () => JSON.parse(localStorage.getItem('tecnorosita_orders')) || [];

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

export const getUsers = () => JSON.parse(localStorage.getItem('tecnorosita_users')) || [];

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
    crearOrden: saveOrder,
    obtenerOrdenes: getOrders,
    obtenerUsuarios: getUsers,
    guardarUsuario: saveUser
};