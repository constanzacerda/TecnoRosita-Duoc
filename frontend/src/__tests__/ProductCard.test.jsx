import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import ProductCard from '../components/ProductCard';
import { AuthContext } from '../context/AuthContext'; 

const productoPrueba = {
  id: 1,
  nombre: 'Teclado Mecánico RGB Gamer',
  categoria: 'Teclados',
  precioTransferencia: 120000, 
  stockOnline: 15, 
  imagen: 'https://images.pexels.com/photos/1309766/pexels-photo-1309766.jpeg'
};

const productoAgotado = {
  id: 2,
  nombre: 'Mouse Agotado',
  categoria: 'Mouse',
  precioTransferencia: 29990,
  stockOnline: 0,
  imagen: 'https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg'
};


const renderWithContext = (ui) => {
    return render(
        <AuthContext.Provider value={{ user: { rol: 'CLIENTE' } }}>
            <MemoryRouter>
                {ui}
            </MemoryRouter>
        </AuthContext.Provider>
    );
};

describe('Pruebas Unitarias del Componente ProductCard', () => {

  it('Debe renderizar correctamente el nombre del producto', () => {
    renderWithContext(<ProductCard producto={productoPrueba} />);
    expect(screen.getByText('Teclado Mecánico RGB Gamer')).toBeInTheDocument();
  });

  it('Debe mostrar la categoría del producto', () => {
    renderWithContext(<ProductCard producto={productoPrueba} />);
    expect(screen.getByText('Teclados')).toBeInTheDocument();
  });

  it('Debe mostrar el precio formateado', () => {
    renderWithContext(<ProductCard producto={productoPrueba} />);
    const precio = screen.getByText((content) => content.includes('120'));
    expect(precio).toBeInTheDocument();
  });

  it('Debe mostrar la insignia de stock disponible', () => {
    renderWithContext(<ProductCard producto={productoPrueba} />);
    expect(screen.getByText(/Stock disponible: 15/i)).toBeInTheDocument();
  });

  it('Debe deshabilitar el botón y mostrar "Sin Stock" cuando el stock es 0', () => {
    renderWithContext(<ProductCard producto={productoAgotado} />);
    const boton = screen.getByRole('button', { name: /Sin Stock/i });
    expect(boton).toBeInTheDocument();
    expect(boton).toBeDisabled();
  });
});