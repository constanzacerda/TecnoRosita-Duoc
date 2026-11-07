import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
<<<<<<< HEAD
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import CheckoutView from '../views/CheckoutView';

describe('Pruebas Unitarias - Módulo Checkout', () => {
    
    beforeEach(() => {
        window.localStorage.clear();
        window.alert = vi.fn(); 
    });

    it('Debe renderizar el formulario de Checkout correctamente', () => {
        render(
            <MemoryRouter>
                <CheckoutView />
            </MemoryRouter>
        );
        expect(screen.getByText('Finalizar Compra')).toBeInTheDocument();
        expect(screen.getByText('Información de Envío')).toBeInTheDocument();
    });

    it('El estado del input "Nombre" debe actualizarse al escribir', () => {
        render(
            <MemoryRouter>
                <CheckoutView />
            </MemoryRouter>
        );
        const inputNombre = screen.getByLabelText('Nombre Completo');
        fireEvent.change(inputNombre, { target: { value: 'Juan Carlos Alvarado Ortega' } });
        expect(inputNombre.value).toBe('Juan Carlos Alvarado Ortega');
    });

    it('El estado del input "Dirección" debe actualizarse al escribir', () => {
        render(
            <MemoryRouter>
                <CheckoutView />
            </MemoryRouter>
        );
        const inputDireccion = screen.getByLabelText('Dirección de Envío');
        fireEvent.change(inputDireccion, { target: { value: 'La Florida' } });
        expect(inputDireccion.value).toBe('La Florida');
    });

    it('Debe prevenir el envío si los campos están vacíos y mostrar alerta', () => {
        render(
            <MemoryRouter>
                <CheckoutView />
            </MemoryRouter>
        );
        
        const botonSiguiente = screen.getByRole('button', { name: /Siguiente paso/i });
        
        
        fireEvent.submit(botonSiguiente);
        
        expect(window.alert).toHaveBeenCalledWith('Por favor completa los campos obligatorios de envío.');
        expect(screen.getByText('Información de Envío')).toBeInTheDocument();
    });

    it('Debe calcular el total y mostrar el paso de pago tras completar el formulario', () => {
        const mockCart = [{ id: 1, nombre: 'Monitor', precioTransferencia: 100000, qty: 2 }];
        window.localStorage.setItem('tecnorosita_cart', JSON.stringify(mockCart));

        render(
            <MemoryRouter>
                <CheckoutView />
            </MemoryRouter>
        );

        const inputNombre = screen.getByLabelText('Nombre Completo');
        const inputEmail = screen.getByLabelText('Correo Electrónico *');
        const inputDireccion = screen.getByLabelText('Dirección de Envío');

        fireEvent.change(inputNombre, { target: { value: 'Juan Carlos Alvarado Ortega' } });
        fireEvent.change(inputEmail, { target: { value: 'juan@test.com' } });
        fireEvent.change(inputDireccion, { target: { value: 'La Florida 123' } });

        const botonSiguiente = screen.getByRole('button', { name: /Siguiente paso/i });
        fireEvent.submit(botonSiguiente);

        expect(screen.getByText('2. Método de Pago y Confirmación')).toBeInTheDocument();
        
        
        const totalesEsperados = screen.getAllByText((content) => content.includes('200'));
        
        expect(totalesEsperados.length).toBeGreaterThan(0);
        expect(totalesEsperados[0]).toBeInTheDocument();
=======
import { BrowserRouter } from 'react-router-dom';
import CheckoutView from '../views/CheckoutView';

const renderWithRouter = (component) => render(<BrowserRouter>{component}</BrowserRouter>);

describe('Pruebas Unitarias - Módulo Ventas y Usuarios', () => {
    
    beforeEach(() => {
        localStorage.clear(); 
    });

    it('1. Debe renderizar el formulario de Checkout correctamente', () => {
        renderWithRouter(<CheckoutView />);
        expect(screen.getByText('Finalizar Compra')).toBeInTheDocument();
    });

    it('2. El estado del input "Nombre" debe actualizarse al escribir', () => {
        renderWithRouter(<CheckoutView />);
        const inputNombre = screen.getByLabelText('Nombre Completo');
        
        fireEvent.change(inputNombre, { target: { value: 'Juan Carlos' } });
        expect(inputNombre.value).toBe('Juan Carlos');
    });

    it('3. El estado del input "Dirección" debe actualizarse al escribir', () => {
        renderWithRouter(<CheckoutView />);
        const inputDireccion = screen.getByLabelText('Dirección de Envío');
        
        fireEvent.change(inputDireccion, { target: { value: 'La Granja' } });
        expect(inputDireccion.value).toBe('La Granja');
    });

    it('4. Debe calcular el total leyendo el estado del localStorage (Mock)', () => {
        const mockCart = [{ id: 1, nombre: 'Monitor', precio: 100000, qty: 2 }];
        localStorage.setItem('tecnorosita_cart', JSON.stringify(mockCart));

        renderWithRouter(<CheckoutView />);
        expect(screen.getByText('Pagar $200.000')).toBeInTheDocument();
    });

    it('5. Debe prevenir el envío si los campos están vacíos', () => {
        renderWithRouter(<CheckoutView />);
        const botonPagar = screen.getByText(/Pagar/i);
        
        fireEvent.click(botonPagar);
        expect(screen.getByTestId('checkout-form')).toBeInTheDocument();
>>>>>>> b6f33c2b6a56b8cb0e288b8632ccb4753ec4a813
    });
});