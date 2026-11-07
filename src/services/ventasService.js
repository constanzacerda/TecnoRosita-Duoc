export const getCart = () => {
    const cart = localStorage.getItem('tecnorosita_cart');
    return cart ? JSON.parse(cart) : [];
};

export const saveCart = (cart) => {
    localStorage.setItem('tecnorosita_cart', JSON.stringify(cart));
};

export const clearCart = () => {
    localStorage.removeItem('tecnorosita_cart');
};

export const getOrders = () => {
    const orders = localStorage.getItem('tecnorosita_orders');
    return orders ? JSON.parse(orders) : [];
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
    const users = localStorage.getItem('tecnorosita_users');
    return users ? JSON.parse(users) : [];
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
    crearOrden: saveOrder,
    obtenerOrdenes: getOrders,
    obtenerUsuarios: getUsers,
    guardarUsuario: saveUser
};

