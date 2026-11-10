import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
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
    });
});