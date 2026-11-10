import { createContext, useState, useEffect } from 'react';

import { loginUser, logoutUser, getCurrentUser } from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    
    useEffect(() => {
        const storedUser = getCurrentUser(); 
        if (storedUser) {
            setUser(storedUser);
        }
        setLoading(false);
    }, []);

    
    const login = async (credenciales) => {
        try {
            
            const userData = await loginUser(credenciales); 
            
            if (userData) {
                setUser(userData); 
                return true;
            }
        } catch (error) {
            console.error("Error en el login", error);
            return false;
        }
    };

    
    const logout = () => {
        setUser(null);
        logoutUser(); 
    };

    if (loading) return <div>Cargando sesión...</div>;

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

