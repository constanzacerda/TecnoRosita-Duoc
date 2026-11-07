import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Routes, Route, Link, useLocation } from 'react-router-dom';

import MenuNavegacion from './components/MenuNavegacion';
import ProductCard from './components/ProductCard';
import Footer from './components/Footer';
import { getProductos } from './data/productos';

import HomeView from './views/HomeView'; 
import CategoriasView from './views/CategoriasView';
import AdminView from './views/AdminView';
import ProductDetailView from './views/ProductDetailView';
import CartView from './views/CartView';
import CheckoutView from './views/CheckoutView';
import AdminDashboardView from './views/AdminDashboardView';
import BlogView from './views/BlogView';
import ContactoView from './views/ContactoView';
import LoginView from './views/LoginView';
import RegistroView from './views/RegistroView';

function App() {
  const [productos, setProductos] = useState([]);
  const location = useLocation();

  useEffect(() => {
    setProductos(getProductos());
  }, [location]);

  return (
    <div style={{ background: 'linear-gradient(135deg, #2b2b2b 0%, #000000 50%, #3b0059 100%)', minHeight: '100vh', color: 'white', display: 'flex', flexDirection: 'column' }}>
      <MenuNavegacion />
      <div style={{ flex: 1, paddingBottom: '50px' }}>
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/productos" element={
            <Container className="pt-4">
              <h1 className="text-center mb-5" style={{ fontFamily: 'Orbitron, sans-serif', color: '#e8b74d', textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>Catálogo TecnoRosita</h1>
              <Row className="g-4">
                {productos.map((producto) => (
                  <Col md={4} key={producto.id}><ProductCard producto={producto} /></Col>
                ))}
              </Row>
            </Container>
          } />
          <Route path="/categorias" element={<CategoriasView />} />
          <Route path="/producto/:id" element={<ProductDetailView />} />
          <Route path="/blog" element={<BlogView />} />
          <Route path="/contacto" element={<ContactoView />} />
          <Route path="/admin" element={<AdminDashboardView />} />
          <Route path="/admin/productos" element={<AdminView />} />
          <Route path="/login" element={<LoginView />} />
          <Route path="/registro" element={<RegistroView />} />
          <Route path="/carrito" element={<CartView />} /> 
          <Route path="/checkout" element={<CheckoutView />} />
          <Route path="*" element={
            <Container className="text-center mt-5">
              <h1 style={{ fontSize: '5rem', color: '#e8b74d', fontFamily: 'Orbitron, sans-serif' }}>404</h1>
              <h2>¡Oops! Página no encontrada</h2>
              <Link to="/"><Button variant="warning" size="lg" className="mt-4 fw-bold text-dark">Volver a la Tienda</Button></Link>
            </Container>
          } />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;