import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Routes, Route, Link, useLocation } from 'react-router-dom';

import MenuNavegacion from './components/MenuNavegacion';
import ProductCard from './components/ProductCard';
import Footer from './components/Footer';
import { obtenerProductos } from './services/productoService';
import ProtectedRoute from './components/ProtectedRoute';

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

const FUENTE_APPLE =
  '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Segoe UI", Roboto, sans-serif';

function App() {
  const [productos, setProductos] = useState([]);
  const [loadingProductos, setLoadingProductos] = useState(true);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/productos') {
      const cargarCatalogo = async () => {
        setLoadingProductos(true);
        const data = await obtenerProductos();
        setProductos(data || []);
        setLoadingProductos(false);
      };
      cargarCatalogo();
    }
  }, [location.pathname]);

  return (
    <div
      style={{
        backgroundColor: '#ffffff',
        minHeight: '100vh',
        color: '#1d1d1f',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: FUENTE_APPLE
      }}
    >
      <MenuNavegacion />
      <div style={{ flex: 1, paddingBottom: '50px', backgroundColor: '#ffffff' }}>
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route
            path="/productos"
            element={
              <div
                style={{
                  backgroundColor: '#ffffff',
                  paddingTop: '6.5rem',
                  paddingBottom: '2rem',
                  minHeight: '80vh'
                }}
              >
                <Container style={{ maxWidth: '1200px' }}>
                  <div
                    className="p-4 p-md-5 mb-5 text-start"
                    style={{
                      background:
                        'linear-gradient(125deg, #e0f2fe 0%, #ede9fe 50%, #fef3c7 100%)',
                      borderRadius: '26px',
                      border: '1.5px solid #e2e8f0'
                    }}
                  >
                    <span
                      style={{
                        display: 'inline-block',
                        backgroundColor: '#0071e3',
                        color: '#ffffff',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        padding: '5px 12px',
                        borderRadius: '999px',
                        marginBottom: '10px'
                      }}
                    >
                      Inventario Actualizado
                    </span>
                    <h1
                      style={{
                        fontFamily: FUENTE_APPLE,
                        fontWeight: 800,
                        fontSize: 'clamp(2rem, 4vw, 2.8rem)',
                        color: '#1d1d1f',
                        margin: '0 0 6px'
                      }}
                    >
                      Catálogo TecnoRosita
                    </h1>
                    <p style={{ color: '#424245', margin: 0 }}>
                      Explora todos nuestros equipos, periféricos y accesorios disponibles.
                    </p>
                  </div>

                  {loadingProductos ? (
                    <h5 className="text-center py-5" style={{ color: '#6e6e73' }}>
                      Cargando catálogo desde el servidor...
                    </h5>
                  ) : (
                    <Row className="g-4">
                      {productos.map((producto) => (
                        <Col md={6} lg={3} key={producto.id}>
                          <ProductCard producto={producto} />
                        </Col>
                      ))}
                    </Row>
                  )}
                </Container>
              </div>
            }
          />
          <Route path="/categorias" element={<CategoriasView />} />
          <Route path="/producto/:id" element={<ProductDetailView />} />
          <Route path="/blog" element={<BlogView />} />
          <Route path="/contacto" element={<ContactoView />} />
          <Route path="/login" element={<LoginView />} />
          <Route path="/registro" element={<RegistroView />} />

          <Route element={<ProtectedRoute allowedRoles={['ADMINISTRADOR']} />}>
            <Route path="/admin" element={<AdminDashboardView />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={['ADMINISTRADOR', 'VENDEDOR']} />}>
            <Route path="/admin/productos" element={<AdminView />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={['ADMINISTRADOR', 'VENDEDOR', 'CLIENTE']} />}>
            <Route path="/carrito" element={<CartView />} />
            <Route path="/checkout" element={<CheckoutView />} />
          </Route>

          <Route
            path="*"
            element={
              <Container className="text-center mt-5 pt-5">
                <h1 style={{ fontSize: '5rem', color: '#0071e3', fontWeight: 800 }}>404</h1>
                <h2 style={{ color: '#1d1d1f' }}>¡Oops! Página no encontrada</h2>
                <Link
                  to="/"
                  style={{
                    display: 'inline-block',
                    marginTop: '1.5rem',
                    textDecoration: 'none',
                    backgroundColor: '#0071e3',
                    color: '#ffffff',
                    borderRadius: '999px',
                    padding: '12px 28px',
                    fontWeight: 600
                  }}
                >
                  Volver a la Tienda
                </Link>
              </Container>
            }
          />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;