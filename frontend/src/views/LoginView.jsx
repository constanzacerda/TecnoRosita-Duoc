import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col, Form, Alert } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';

const FUENTE_APPLE =
  '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Segoe UI", Roboto, sans-serif';

const IMAGEN_LOGIN_HD =
  'https://images.unsplash.com/photo-1600861194942-f883de0dfe96?auto=format&fit=crop&w=1400&q=90';

const IMAGEN_LOGIN_RESPALDO =
  'https://images.unsplash.com/photo-1598550476439-6847785fcea6?auto=format&fit=crop&w=1400&q=90';

const BENEFICIOS_LOGIN = [
  {
    id: 'boleta',
    titulo: 'Boleta en línea',
    descripcion: 'Todas tus compras quedan registradas con respaldo inmediato y actualización real de stock.'
  },
  {
    id: 'roles',
    titulo: 'Acceso por rol',
    descripcion: 'Ingresa como Cliente, Vendedor o Administrador con permisos personalizados en tiempo real.'
  },
  {
    id: 'despacho',
    titulo: 'Envío y retiro',
    descripcion: 'Gestiona tu carrito sin perder productos y elige despacho o retiro en Providencia.'
  }
];

const LoginView = () => {
  const [credenciales, setCredenciales] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [campoActivo, setCampoActivo] = useState('');
  const [beneficioActivo, setBeneficioActivo] = useState(BENEFICIOS_LOGIN[0]);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredenciales({ ...credenciales, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const exito = await login(credenciales);

      if (exito) {
        navigate('/');
      } else {
        setError('Credenciales inválidas. Verifica tu correo o contraseña.');
      }
    } catch (err) {
      setError('Error de conexión con el servidor de TecnoRosita.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        backgroundColor: '#ffffff',
        color: '#1d1d1f',
        minHeight: '100vh',
        width: '100%',
        paddingTop: '6.5rem',
        paddingBottom: '4rem',
        display: 'flex',
        alignItems: 'center',
        fontFamily: FUENTE_APPLE
      }}
    >
      <Container style={{ maxWidth: '1020px' }}>
        <div
          style={{
            borderRadius: '28px',
            overflow: 'hidden',
            backgroundColor: '#ffffff',
            border: '1.5px solid #e5e5ea',
            boxShadow: '0 22px 55px rgba(0, 0, 0, 0.08)'
          }}
        >
          <Row className="g-0">
            {/* Panel Izquierdo: Showcase Gamer PROLED interactivo */}
            <Col
              lg={5}
              style={{
                backgroundColor: '#000000',
                color: '#ffffff',
                position: 'relative',
                overflow: 'hidden',
                padding: '34px 28px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                textAlign: 'left'
              }}
            >
              {/* Luces ambientales PROLED */}
              <div
                style={{
                  position: 'absolute',
                  width: '240px',
                  height: '240px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(0,113,227,0.34) 0%, transparent 70%)',
                  top: '-60px',
                  right: '-60px',
                  pointerEvents: 'none'
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  width: '220px',
                  height: '220px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(242,201,76,0.22) 0%, transparent 70%)',
                  bottom: '-60px',
                  left: '-50px',
                  pointerEvents: 'none'
                }}
              />

              <div style={{ position: 'relative', zIndex: 2 }}>
                <span
                  style={{
                    display: 'inline-block',
                    padding: '5px 12px',
                    borderRadius: '999px',
                    backgroundColor: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.16)',
                    color: '#7cc4ff',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    letterSpacing: '0.09em',
                    textTransform: 'uppercase',
                    marginBottom: '14px'
                  }}
                >
                  Acceso Seguro · TecnoRosita
                </span>

                <h2
                  style={{
                    fontFamily: FUENTE_APPLE,
                    fontWeight: 800,
                    fontSize: '1.9rem',
                    color: '#ffffff',
                    lineHeight: 1.12,
                    marginBottom: '8px'
                  }}
                >
                  Bienvenido de vuelta
                </h2>

                <div
                  style={{
                    fontWeight: 600,
                    fontSize: '1rem',
                    background:
                      'linear-gradient(90deg, #f2c94c 0%, #ffffff 45%, #73c0ff 80%, #1a73e8 100%)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    color: 'transparent',
                    marginBottom: '18px'
                  }}
                >
                  Tu universo PROLED en un solo lugar
                </div>

                {/* Imagen Gamer HD exclusiva */}
                <div
                  style={{
                    height: '185px',
                    borderRadius: '18px',
                    overflow: 'hidden',
                    border: '1px solid rgba(255,255,255,0.14)',
                    boxShadow: '0 14px 30px rgba(0, 0, 0, 0.45)',
                    marginBottom: '18px'
                  }}
                >
                  <img
                    src={IMAGEN_LOGIN_HD}
                    alt="Estación gamer iluminada TecnoRosita"
                    onError={(e) => {
                      if (e.currentTarget.dataset.fallbackApplied) return;
                      e.currentTarget.dataset.fallbackApplied = 'true';
                      e.currentTarget.src = IMAGEN_LOGIN_RESPALDO;
                    }}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              </div>

              {/* Selector interactivo de beneficios */}
              <div style={{ position: 'relative', zIndex: 2 }}>
                <div className="d-flex flex-wrap gap-2 mb-3">
                  {BENEFICIOS_LOGIN.map((item) => {
                    const activo = beneficioActivo.id === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setBeneficioActivo(item)}
                        style={{
                          padding: '5px 12px',
                          borderRadius: '999px',
                          border: activo
                            ? '1px solid #2997ff'
                            : '1px solid rgba(255,255,255,0.18)',
                          backgroundColor: activo ? '#0071e3' : 'rgba(255,255,255,0.06)',
                          color: '#ffffff',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        {item.titulo}
                      </button>
                    );
                  })}
                </div>

                <div
                  style={{
                    padding: '12px 14px',
                    borderRadius: '14px',
                    backgroundColor: 'rgba(255,255,255,0.07)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    color: '#d1d5db',
                    fontSize: '0.84rem',
                    lineHeight: 1.5
                  }}
                >
                  {beneficioActivo.descripcion}
                </div>
              </div>
            </Col>

            {/* Panel Derecho: Formulario limpio estilo Apple */}
            <Col
              lg={7}
              style={{
                background: 'linear-gradient(180deg, #f8fbff 0%, #ffffff 42%)',
                padding: '38px 36px',
                textAlign: 'left',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}
            >
              {/* Navegación rápida tipo píldora entre Ingresar / Crear Cuenta */}
              <div
                style={{
                  display: 'inline-flex',
                  backgroundColor: '#f5f5f7',
                  padding: '4px',
                  borderRadius: '999px',
                  border: '1px solid #e5e5ea',
                  marginBottom: '24px',
                  alignSelf: 'flex-start'
                }}
              >
                <span
                  style={{
                    padding: '6px 18px',
                    borderRadius: '999px',
                    backgroundColor: '#1d1d1f',
                    color: '#ffffff',
                    fontSize: '0.82rem',
                    fontWeight: 600
                  }}
                >
                  Iniciar Sesión
                </span>
                <Link
                  to="/registro"
                  style={{
                    padding: '6px 18px',
                    borderRadius: '999px',
                    color: '#515154',
                    textDecoration: 'none',
                    fontSize: '0.82rem',
                    fontWeight: 600
                  }}
                >
                  Crear Cuenta
                </Link>
              </div>

              <h3
                style={{
                  fontFamily: FUENTE_APPLE,
                  fontWeight: 800,
                  fontSize: '2rem',
                  color: '#1d1d1f',
                  letterSpacing: '-0.025em',
                  marginBottom: '6px'
                }}
              >
                Iniciar Sesión
              </h3>
              <p style={{ color: '#6e6e73', fontSize: '0.94rem', marginBottom: '24px' }}>
                Ingresa tus credenciales para acceder a tu cuenta y continuar comprando.
              </p>

              {error && (
                <Alert variant="danger" style={{ borderRadius: '14px', fontSize: '0.9rem' }}>
                  {error}
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="login-email">
                  <Form.Label
                    style={{
                      fontSize: '0.86rem',
                      fontWeight: 600,
                      color: '#1d1d1f',
                      marginBottom: '6px'
                    }}
                  >
                    Correo Electrónico
                  </Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Ej. admin@tecnorosita.cl"
                    value={credenciales.email}
                    onChange={handleChange}
                    onFocus={() => setCampoActivo('email')}
                    onBlur={() => setCampoActivo('')}
                    required
                    style={{
                      padding: '12px 16px',
                      borderRadius: '14px',
                      backgroundColor: campoActivo === 'email' ? '#ffffff' : '#f5f5f7',
                      color: '#1d1d1f',
                      border:
                        campoActivo === 'email'
                          ? '1.5px solid #0071e3'
                          : '1.5px solid #d2d2d7',
                      boxShadow:
                        campoActivo === 'email'
                          ? '0 0 0 4px rgba(0, 113, 227, 0.12)'
                          : 'none',
                      transition: 'all 0.2s ease'
                    }}
                  />
                </Form.Group>

                <Form.Group className="mb-4" controlId="login-password">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <Form.Label
                      style={{
                        fontSize: '0.86rem',
                        fontWeight: 600,
                        color: '#1d1d1f',
                        marginBottom: 0
                      }}
                    >
                      Contraseña
                    </Form.Label>
                    <button
                      type="button"
                      onClick={() => setMostrarPassword((prev) => !prev)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#0071e3',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        padding: 0
                      }}
                    >
                      {mostrarPassword ? 'Ocultar' : 'Mostrar'}
                    </button>
                  </div>

                  <Form.Control
                    type={mostrarPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="******"
                    value={credenciales.password}
                    onChange={handleChange}
                    onFocus={() => setCampoActivo('password')}
                    onBlur={() => setCampoActivo('')}
                    required
                    style={{
                      padding: '12px 16px',
                      borderRadius: '14px',
                      backgroundColor: campoActivo === 'password' ? '#ffffff' : '#f5f5f7',
                      color: '#1d1d1f',
                      border:
                        campoActivo === 'password'
                          ? '1.5px solid #0071e3'
                          : '1.5px solid #d2d2d7',
                      boxShadow:
                        campoActivo === 'password'
                          ? '0 0 0 4px rgba(0, 113, 227, 0.12)'
                          : 'none',
                      transition: 'all 0.2s ease'
                    }}
                  />
                </Form.Group>

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    width: '100%',
                    padding: '13px 22px',
                    borderRadius: '999px',
                    border: 'none',
                    backgroundColor: loading ? '#6ea8fe' : '#0071e3',
                    color: '#ffffff',
                    fontWeight: 600,
                    fontSize: '1rem',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    boxShadow: '0 10px 22px rgba(0, 113, 227, 0.26)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {loading ? 'Ingresando...' : 'Entrar a TecnoRosita'}
                </button>
              </Form>

              <div
                className="text-center mt-4 pt-3"
                style={{ borderTop: '1px solid #e5e5ea', color: '#6e6e73', fontSize: '0.9rem' }}
              >
                ¿No tienes cuenta?{' '}
                <Link
                  to="/registro"
                  style={{ color: '#0071e3', fontWeight: 700, textDecoration: 'none' }}
                >
                  Regístrate aquí
                </Link>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default LoginView;