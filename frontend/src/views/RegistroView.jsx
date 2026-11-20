import React, { useState, useContext } from 'react';
import { Container, Row, Col, Form, Alert } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { registerUser } from '../services/authService';

const FUENTE_APPLE =
  '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Segoe UI", Roboto, sans-serif';

const IMAGEN_REGISTRO_HD =
  'https://images.unsplash.com/photo-1560253023-3ec5d502959f?auto=format&fit=crop&w=1400&q=90';

const IMAGEN_REGISTRO_RESPALDO =
  'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1400&q=90';

const VENTAJAS_CUENTA = [
  {
    id: 'carrito',
    titulo: 'Checkout rápido',
    texto: 'Compra periféricos gamer en segundos y genera tu boleta electrónica al instante.'
  },
  {
    id: 'garantia',
    titulo: 'Garantía Care',
    texto: '12 meses de respaldo en tus compras registradas con atención directa en Providencia.'
  },
  {
    id: 'ofertas',
    titulo: 'Comunidad PROLED',
    texto: 'Accede primero a nuevos ingresos de teclados, monitores, audio y hardware.'
  }
];

const evaluarSeguridadPassword = (password) => {
  if (!password) return { nivel: 0, texto: '', color: '#d2d2d7' };
  let puntos = 1;
  if (password.length >= 6) puntos += 1;
  if (password.length >= 8 && /[A-Z0-9]/i.test(password)) puntos += 1;
  if (password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password)) puntos += 1;

  if (puntos <= 1) return { nivel: 25, texto: 'Básica', color: '#f59e0b' };
  if (puntos === 2) return { nivel: 55, texto: 'Aceptable', color: '#0ea5e9' };
  if (puntos === 3) return { nivel: 80, texto: 'Buena', color: '#0071e3' };
  return { nivel: 100, texto: 'Fuerte', color: '#16a34a' };
};

export default function RegistroView() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [campoActivo, setCampoActivo] = useState('');
  const [ventajaActiva, setVentajaActiva] = useState(VENTAJAS_CUENTA[0]);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await registerUser(formData);

      const loginExitoso = await login({
        email: formData.email,
        password: formData.password
      });

      if (loginExitoso) {
        navigate('/');
      } else {
        navigate('/login');
      }
    } catch (err) {
      const msg =
        typeof err.response?.data === 'string'
          ? err.response.data
          : 'Error al registrar. El correo podría estar en uso o el servidor está inactivo.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const seguridad = evaluarSeguridadPassword(formData.password);

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
      <Container style={{ maxWidth: '1040px' }}>
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
            {/* Panel Izquierdo: Formulario limpio estilo Apple */}
            <Col
              lg={7}
              style={{
                background: 'linear-gradient(180deg, #faf8ff 0%, #ffffff 42%)',
                padding: '38px 36px',
                textAlign: 'left',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}
            >
              {/* Selector tipo píldora entre Iniciar Sesión / Crear Cuenta */}
              <div
                style={{
                  display: 'inline-flex',
                  backgroundColor: '#f5f5f7',
                  padding: '4px',
                  borderRadius: '999px',
                  border: '1px solid #e5e5ea',
                  marginBottom: '22px',
                  alignSelf: 'flex-start'
                }}
              >
                <Link
                  to="/login"
                  style={{
                    padding: '6px 18px',
                    borderRadius: '999px',
                    color: '#515154',
                    textDecoration: 'none',
                    fontSize: '0.82rem',
                    fontWeight: 600
                  }}
                >
                  Iniciar Sesión
                </Link>
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
                  Crear Cuenta
                </span>
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
                Crear Cuenta
              </h3>
              <p style={{ color: '#6e6e73', fontSize: '0.94rem', marginBottom: '22px' }}>
                Únete a TecnoRosita para comprar hardware con stock real y emisión de boleta.
              </p>

              {error && (
                <Alert variant="danger" className="p-2 text-center" style={{ borderRadius: '14px', fontSize: '0.9rem' }}>
                  {error}
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="registro-nombre">
                  <Form.Label
                    style={{
                      fontSize: '0.86rem',
                      fontWeight: 600,
                      color: '#1d1d1f',
                      marginBottom: '6px'
                    }}
                  >
                    Nombre Completo
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="nombre"
                    placeholder="Ej. Constanza Cerda"
                    value={formData.nombre}
                    onChange={handleChange}
                    onFocus={() => setCampoActivo('nombre')}
                    onBlur={() => setCampoActivo('')}
                    required
                    style={{
                      padding: '12px 16px',
                      borderRadius: '14px',
                      backgroundColor: campoActivo === 'nombre' ? '#ffffff' : '#f5f5f7',
                      color: '#1d1d1f',
                      border:
                        campoActivo === 'nombre'
                          ? '1.5px solid #0071e3'
                          : '1.5px solid #d2d2d7',
                      boxShadow:
                        campoActivo === 'nombre'
                          ? '0 0 0 4px rgba(0, 113, 227, 0.12)'
                          : 'none',
                      transition: 'all 0.2s ease'
                    }}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="registro-email">
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
                    placeholder="tu@correo.com"
                    value={formData.email}
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

                <Form.Group className="mb-4" controlId="registro-password">
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
                    value={formData.password}
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

                  {/* Barra visual de fortaleza (informativa, no bloquea el registro) */}
                  {formData.password && (
                    <div className="mt-2">
                      <div
                        style={{
                          height: '5px',
                          width: '100%',
                          backgroundColor: '#e5e5ea',
                          borderRadius: '99px',
                          overflow: 'hidden'
                        }}
                      >
                        <div
                          style={{
                            height: '100%',
                            width: `${seguridad.nivel}%`,
                            backgroundColor: seguridad.color,
                            transition: 'width 0.25s ease, background-color 0.25s ease'
                          }}
                        />
                      </div>
                      <div
                        className="d-flex justify-content-between mt-1"
                        style={{ fontSize: '0.76rem', color: '#6e6e73' }}
                      >
                        <span>Nivel de seguridad</span>
                        <span style={{ color: seguridad.color, fontWeight: 700 }}>
                          {seguridad.texto}
                        </span>
                      </div>
                    </div>
                  )}
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
                  {loading ? 'Registrando...' : 'Registrarse'}
                </button>
              </Form>

              <div
                className="text-center mt-4 pt-3"
                style={{ borderTop: '1px solid #e5e5ea', color: '#6e6e73', fontSize: '0.9rem' }}
              >
                ¿Ya tienes cuenta?{' '}
                <Link
                  to="/login"
                  style={{ color: '#0071e3', fontWeight: 700, textDecoration: 'none' }}
                >
                  Inicia sesión aquí
                </Link>
              </div>
            </Col>

            {/* Panel Derecho: Showcase Gamer colorido PROLED */}
            <Col
              lg={5}
              style={{
                background: 'linear-gradient(155deg, #06080f 0%, #0f172a 55%, #1e1b4b 100%)',
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
              <div
                style={{
                  position: 'absolute',
                  width: '230px',
                  height: '230px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(236,72,153,0.28) 0%, transparent 70%)',
                  top: '-50px',
                  left: '-50px',
                  pointerEvents: 'none'
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  width: '230px',
                  height: '230px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(41,151,255,0.32) 0%, transparent 70%)',
                  bottom: '-60px',
                  right: '-50px',
                  pointerEvents: 'none'
                }}
              />

              <div style={{ position: 'relative', zIndex: 2 }}>
                <span
                  style={{
                    display: 'inline-block',
                    padding: '5px 12px',
                    borderRadius: '999px',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    border: '1px solid rgba(255,255,255,0.18)',
                    color: '#f7d774',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    letterSpacing: '0.09em',
                    textTransform: 'uppercase',
                    marginBottom: '14px'
                  }}
                >
                  Membresía Gratuita · 2026
                </span>

                <h2
                  style={{
                    fontFamily: FUENTE_APPLE,
                    fontWeight: 800,
                    fontSize: '1.85rem',
                    color: '#ffffff',
                    lineHeight: 1.12,
                    marginBottom: '8px'
                  }}
                >
                  Arma tu setup ideal
                </h2>

                <div
                  style={{
                    fontWeight: 600,
                    fontSize: '0.98rem',
                    background:
                      'linear-gradient(90deg, #f2c94c 0%, #ffffff 42%, #73c0ff 78%, #38bdf8 100%)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    color: 'transparent',
                    marginBottom: '18px'
                  }}
                >
                  Tecnología PROLED con stock en tiempo real
                </div>

                {/* Imagen Gamer HD exclusiva de Registro */}
                <div
                  style={{
                    height: '190px',
                    borderRadius: '18px',
                    overflow: 'hidden',
                    border: '1px solid rgba(255,255,255,0.16)',
                    boxShadow: '0 14px 30px rgba(0, 0, 0, 0.45)',
                    marginBottom: '18px'
                  }}
                >
                  <img
                    src={IMAGEN_REGISTRO_HD}
                    alt="Experiencia gamer vibrante TecnoRosita"
                    onError={(e) => {
                      if (e.currentTarget.dataset.fallbackApplied) return;
                      e.currentTarget.dataset.fallbackApplied = 'true';
                      e.currentTarget.src = IMAGEN_REGISTRO_RESPALDO;
                    }}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              </div>

              {/* Pestañas interactivas de ventajas */}
              <div style={{ position: 'relative', zIndex: 2 }}>
                <div className="d-flex flex-wrap gap-2 mb-3">
                  {VENTAJAS_CUENTA.map((v) => {
                    const activa = ventajaActiva.id === v.id;
                    return (
                      <button
                        key={v.id}
                        type="button"
                        onClick={() => setVentajaActiva(v)}
                        style={{
                          padding: '5px 12px',
                          borderRadius: '999px',
                          border: activa
                            ? '1px solid #38bdf8'
                            : '1px solid rgba(255,255,255,0.18)',
                          backgroundColor: activa ? '#0071e3' : 'rgba(255,255,255,0.07)',
                          color: '#ffffff',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        {v.titulo}
                      </button>
                    );
                  })}
                </div>

                <div
                  style={{
                    padding: '12px 14px',
                    borderRadius: '14px',
                    backgroundColor: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.14)',
                    color: '#e2e8f0',
                    fontSize: '0.84rem',
                    lineHeight: 1.5
                  }}
                >
                  {ventajaActiva.texto}
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
}