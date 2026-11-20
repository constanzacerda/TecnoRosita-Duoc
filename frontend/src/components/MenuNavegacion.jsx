import { useContext, useState, useEffect } from 'react';
import { Navbar, Nav, Container, Badge, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { getCart } from '../services/ventasService';

const FUENTE_APPLE =
  '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Segoe UI", Roboto, sans-serif';

const MenuNavegacion = () => {
  const { user, logout } = useContext(AuthContext);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const actualizarContador = () => {
      const items = getCart();
      const total = items.reduce((acc, item) => acc + (item.qty || 1), 0);
      setCartCount(total);
    };

    actualizarContador();
    window.addEventListener('cartUpdated', actualizarContador);
    window.addEventListener('storage', actualizarContador);

    return () => {
      window.removeEventListener('cartUpdated', actualizarContador);
      window.removeEventListener('storage', actualizarContador);
    };
  }, []);

  const handleLogout = () => {
    logout();
  };

  return (
    <Navbar
      bg="black"
      variant="dark"
      expand="lg"
      className="border-bottom border-secondary py-2 sticky-top"
      style={{
        top: 0,
        zIndex: 1050,
        boxShadow: '0 4px 10px rgba(0,0,0,0.5)',
        background: '#000000 !important',
        fontFamily: FUENTE_APPLE
      }}
    >
      <Container className="d-flex justify-content-between align-items-center">
        <Navbar.Brand
          as={Link}
          to="/"
          className="text-warning fw-bold fs-4 d-flex align-items-center m-0"
          style={{ whiteSpace: 'nowrap' }}
        >
          TecnoRosita
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" className="border-secondary" />

        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
          <Nav className="me-auto my-2 my-lg-0 gap-lg-2 align-items-lg-center">
            <Nav.Link as={Link} to="/" className="text-light-hover" style={{ whiteSpace: 'nowrap' }}>
              Inicio
            </Nav.Link>
            <Nav.Link as={Link} to="/categorias" className="text-light-hover" style={{ whiteSpace: 'nowrap' }}>
              Catálogo
            </Nav.Link>
            <Nav.Link as={Link} to="/blog" className="text-light-hover" style={{ whiteSpace: 'nowrap' }}>
              Blog
            </Nav.Link>
            <Nav.Link as={Link} to="/contacto" className="text-light-hover" style={{ whiteSpace: 'nowrap' }}>
              Contacto
            </Nav.Link>

            {/* IE3.3.3: Renderizado Condicional - Solo visible para ADMINISTRADOR */}
            {user && user.rol === 'ADMINISTRADOR' && (
              <Nav.Link
                as={Link}
                to="/admin"
                className="text-info fw-bold"
                style={{ whiteSpace: 'nowrap' }}
              >
                Dashboard Admin
              </Nav.Link>
            )}

            {/* IE3.3.3: Renderizado Condicional - Visible para ADMINISTRADOR y VENDEDOR */}
            {user && (user.rol === 'ADMINISTRADOR' || user.rol === 'VENDEDOR') && (
              <Nav.Link
                as={Link}
                to="/admin/productos"
                className="text-info fw-bold"
                style={{ whiteSpace: 'nowrap' }}
              >
                Gestión de Tienda
              </Nav.Link>
            )}
          </Nav>

          <Nav className="align-items-center gap-3 mt-3 mt-lg-0">
            <Nav.Link
              as={Link}
              to="/carrito"
              className="text-warning d-flex align-items-center gap-1 p-0 m-0"
              style={{ whiteSpace: 'nowrap' }}
            >
              🛒 Carrito{' '}
              <Badge
                bg="warning"
                text="dark"
                className="rounded-pill fw-bold ms-1"
                style={{ fontSize: '0.75rem' }}
              >
                {cartCount}
              </Badge>
            </Nav.Link>

            <div className="d-flex flex-wrap align-items-center gap-2 justify-content-center justify-content-lg-end mt-2 mt-lg-0">
              {user ? (
                <>
                  <span
                    className="text-light small text-center text-lg-start me-lg-2"
                    style={{ whiteSpace: 'nowrap' }}
                  >
                    Hola, <b>{user.nombre || user.email}</b>{' '}
                    <span className="text-warning">({user.rol})</span>
                  </span>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    className="fw-bold"
                    style={{ whiteSpace: 'nowrap' }}
                    onClick={handleLogout}
                  >
                    Cerrar Sesión
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    as={Link}
                    to="/login"
                    variant="outline-warning"
                    size="sm"
                    className="fw-bold px-3 py-1"
                    style={{ borderRadius: '20px', whiteSpace: 'nowrap' }}
                  >
                    Ingresar
                  </Button>
                  <Button
                    as={Link}
                    to="/registro"
                    variant="warning"
                    size="sm"
                    className="fw-bold text-dark px-3 py-1"
                    style={{ borderRadius: '20px', whiteSpace: 'nowrap' }}
                  >
                    Registrarse
                  </Button>
                </>
              )}
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MenuNavegacion;