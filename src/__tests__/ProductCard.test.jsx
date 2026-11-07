import React from 'react';
import { render, screen } from '@testing-library/react';
<<<<<<< HEAD
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import ProductCard from '../components/ProductCard';
=======
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import ProductCard from '../components/ProductCard.jsx';

>>>>>>> b6f33c2b6a56b8cb0e288b8632ccb4753ec4a813

const productoPrueba = {
  id: 1,
  nombre: 'Teclado Mecánico RGB Gamer',
  categoria: 'Teclados',
  precioTransferencia: 120000, 
  stockOnline: 15, 
<<<<<<< HEAD
  imagen: 'https://images.pexels.com/photos/1309766/pexels-photo-1309766.jpeg'
=======
  imagen: 'https://images.pexels.com/photos/1309766/pexels-photo-1309766.jpeg?auto=compress&cs=tinysrgb&w=800'
>>>>>>> b6f33c2b6a56b8cb0e288b8632ccb4753ec4a813
};

const productoAgotado = {
  id: 2,
  nombre: 'Mouse Agotado',
  categoria: 'Mouse',
  precioTransferencia: 29990,
  stockOnline: 0,
<<<<<<< HEAD
  imagen: 'https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg'
};

describe('Pruebas Unitarias del Componente ProductCard', () => {

  it('Debe renderizar correctamente el nombre del producto', () => {
    render(
      <MemoryRouter>
        <ProductCard producto={productoPrueba} />
      </MemoryRouter>
=======
  imagen: 'https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg?auto=compress&cs=tinysrgb&w=800'
};

describe('Pruebas Unitarias del Componente ProductCard - Módulo Products & Catalog', () => {

  test('Debe renderizar correctamente el nombre del producto', () => {
    render(
      <BrowserRouter>
        <ProductCard producto={productoPrueba} />
      </BrowserRouter>
>>>>>>> b6f33c2b6a56b8cb0e288b8632ccb4753ec4a813
    );
    expect(screen.getByText('Teclado Mecánico RGB Gamer')).toBeInTheDocument();
  });

<<<<<<< HEAD
  it('Debe mostrar la categoría del producto', () => {
    render(
      <MemoryRouter>
        <ProductCard producto={productoPrueba} />
      </MemoryRouter>
=======
  test('Debe mostrar la categoría del producto', () => {
    render(
      <BrowserRouter>
        <ProductCard producto={productoPrueba} />
      </BrowserRouter>
>>>>>>> b6f33c2b6a56b8cb0e288b8632ccb4753ec4a813
    );
    expect(screen.getByText('Teclados')).toBeInTheDocument();
  });

<<<<<<< HEAD
  it('Debe mostrar el precio formateado', () => {
    render(
      <MemoryRouter>
        <ProductCard producto={productoPrueba} />
      </MemoryRouter>
    );
    const precio = screen.getByText((content) => content.includes('120'));
    expect(precio).toBeInTheDocument();
  });

  it('Debe mostrar la insignia de stock disponible', () => {
    render(
      <MemoryRouter>
        <ProductCard producto={productoPrueba} />
      </MemoryRouter>
=======
  test('Debe mostrar el precio formateado en pesos chilenos', () => {
    render(
      <BrowserRouter>
        <ProductCard producto={productoPrueba} />
      </BrowserRouter>
    );
    expect(screen.getByText(/\$120\.000/)).toBeInTheDocument();
  });

  test('Debe mostrar la insignia de stock disponible cuando hay unidades', () => {
    render(
      <BrowserRouter>
        <ProductCard producto={productoPrueba} />
      </BrowserRouter>
>>>>>>> b6f33c2b6a56b8cb0e288b8632ccb4753ec4a813
    );
    expect(screen.getByText(/Stock disponible: 15/i)).toBeInTheDocument();
  });

<<<<<<< HEAD
  it('Debe deshabilitar el botón y mostrar "Sin Stock" cuando el stock es 0', () => {
    render(
      <MemoryRouter>
        <ProductCard producto={productoAgotado} />
      </MemoryRouter>
=======
  test('Debe deshabilitar el botón y mostrar "Sin Stock" cuando el stock es igual a 0', () => {
    render(
      <BrowserRouter>
        <ProductCard producto={productoAgotado} />
      </BrowserRouter>
>>>>>>> b6f33c2b6a56b8cb0e288b8632ccb4753ec4a813
    );
    const boton = screen.getByRole('button', { name: /Sin Stock/i });
    expect(boton).toBeInTheDocument();
    expect(boton).toBeDisabled();
  });
});