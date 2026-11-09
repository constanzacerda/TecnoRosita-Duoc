import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    
    useEffect(() => {
        const storedUser = localStorage.getItem('tecnorosita_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    
    const login = (token, userData = { username: 'Usuario Prueba', rol: 'ADMIN' }) => {
        setUser(userData);
        localStorage.setItem('tecnorosita_user', JSON.stringify(userData));
        localStorage.setItem('token', token);
    };

    
    const logout = () => {
        setUser(null);
        localStorage.removeItem('tecnorosita_user');
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};