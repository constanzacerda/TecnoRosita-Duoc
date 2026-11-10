import { describe, it, expect, beforeEach } from 'vitest';
import { getCart, saveCart, clearCart, ventasService } from '../data/ventasService';


const localStorageMock = (function() {
    let store = {};
    return {
        getItem: (key) => store[key] || null,
        setItem: (key, value) => { store[key] = value.toString(); },
        removeItem: (key) => { delete store[key]; },
        clear: () => { store = {}; }
    };
})();
Object.defineProperty(global, 'localStorage', { value: localStorageMock });

describe('Pruebas Unitarias - Módulo ventasService', () => {
    
    beforeEach(() => {
        localStorage.clear();
    });

    
    it('1. Debe guardar, obtener y limpiar el carrito correctamente', () => {
        const mockCart = [{ id: 1, nombre: 'Monitor', precio: 150000, qty: 1 }];
        
        saveCart(mockCart);
        expect(getCart()).toEqual(mockCart);
        expect(getCart().length).toBe(1);

        clearCart();
        expect(getCart()).toEqual([]);
    });

    it('2. Debe crear una orden asignándole un ID único (ORD-) y la fecha actual', () => {
        const nuevaOrden = {
            usuario: { nombre: 'Juan', email: 'juan@test.com' },
            productos: [],
            total: 250000
        };

        const ordenGuardada = ventasService.crearOrden(nuevaOrden);
        const ordenesEnMemoria = ventasService.obtenerOrdenes();

        expect(ordenGuardada.id).toMatch(/^ORD-/); 
        expect(ordenGuardada.fecha).toBeDefined();
        expect(ordenesEnMemoria.length).toBe(1);
        expect(ordenesEnMemoria[0].total).toBe(250000);
    });

    it('3. Debe registrar un usuario nuevo y evitar duplicados por email', () => {
        const usuario1 = { nombre: 'Constanza', email: 'conty@test.com' };
        const usuario2 = { nombre: 'Constanza Modificada', email: 'conty@test.com' }; 

        ventasService.guardarUsuario(usuario1);
        ventasService.guardarUsuario(usuario2); 

        const usuariosEnMemoria = ventasService.obtenerUsuarios();

        expect(usuariosEnMemoria.length).toBe(1); 
        expect(usuariosEnMemoria[0].nombre).toBe('Constanza');
        expect(usuariosEnMemoria[0].id).toMatch(/^USR-/);
    });
});