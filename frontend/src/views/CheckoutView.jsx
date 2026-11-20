import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCart, clearCart } from '../services/ventasService';
import api from '../services/api';
import { Container, Row, Col, Form } from 'react-bootstrap';
import ResumenOrden from '../components/ResumenOrden';

const FUENTE_APPLE =
  '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Segoe UI", Roboto, sans-serif';

const ESTILO_INPUT = {
  padding: '12px 16px',
  borderRadius: '14px',
  backgroundColor: '#f5f5f7',
  color: '#1d1d1f',
  border: '1.5px solid #d2d2d7',
  fontSize: '0.95rem'
};

export default function CheckoutView() {
  const [cart, setCart] = useState([]);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    direccion: '',
    comuna: 'Santiago',
    metodoPago: 'transferencia'
  });
  const [orderId, setOrderId] = useState('');
  const [boletaDetalle, setBoletaDetalle] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const currentCart = getCart();
    setCart(currentCart);
    if (currentCart.length === 0 && step !== 3) {
      navigate('/');
    }
  }, [navigate, step]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    if (!formData.nombre || !formData.email || !formData.direccion) {
      alert('Por favor completa los campos obligatorios de envío.');
      return;
    }
    setStep(2);
  };

  const handleFinalizeOrder = async () => {
    setLoading(true);
    const subtotal = cart.reduce((acc, item) => {
      const precio =
        formData.metodoPago === 'transferencia'
          ? item.precioTransferencia || item.precio || 0
          : item.precioNormal || item.precio || 0;
      return acc + precio * item.qty;
    }, 0);

    const detallesItems = cart.map((item) => {
      const precioUnitario =
        formData.metodoPago === 'transferencia'
          ? item.precioTransferencia || item.precio || 0
          : item.precioNormal || item.precio || 0;
      return {
        productoId: item.id,
        nombre: item.nombre,
        cantidad: item.qty,
        precioUnitario
      };
    });

    const nuevaOrden = {
      nombreCliente: formData.nombre,
      emailCliente: formData.email,
      direccion: `${formData.direccion}, ${formData.comuna}`,
      metodoPago: formData.metodoPago,
      total: subtotal,
      detalles: detallesItems.map(({ productoId, cantidad, precioUnitario }) => ({
        productoId,
        cantidad,
        precioUnitario
      }))
    };

    try {
      const response = await api.post('/boletas', nuevaOrden);
      const idGenerado = response.data?.id || Math.floor(Math.random() * 1000000);

      setOrderId(idGenerado);
      setBoletaDetalle({
        fecha: new Date().toLocaleString('es-CL'),
        total: response.data?.total ?? subtotal,
        items: detallesItems
      });
      clearCart();
      setStep(3);
    } catch (error) {
      console.error('Error procesando compra', error);
      alert(
        'No se pudo procesar la compra. Verifica tu conexión o intenta iniciar sesión nuevamente.'
      );
    } finally {
      setLoading(false);
    }
  };

  const pasos = [
    { numero: 1, titulo: 'Envío' },
    { numero: 2, titulo: 'Pago' },
    { numero: 3, titulo: 'Boleta' }
  ];

  return (
    <div
      style={{
        backgroundColor: '#ffffff',
        color: '#1d1d1f',
        minHeight: '100vh',
        width: '100%',
        paddingTop: '6.5rem',
        paddingBottom: '4.5rem',
        fontFamily: FUENTE_APPLE
      }}
    >
      <Container style={{ maxWidth: '1140px' }} data-testid="checkout-form">
        {/* Encabezado limpio con indicador visual de pasos */}
        <div
          className="text-center p-4 mb-5"
          style={{
            background:
              'linear-gradient(125deg, #e0f2fe 0%, #ede9fe 52%, #fef3c7 100%)',
            borderRadius: '26px',
            border: '1.5px solid #e2e8f0'
          }}
        >
          <h2
            style={{
              fontFamily: FUENTE_APPLE,
              fontWeight: 800,
              fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)',
              color: '#1d1d1f',
              marginBottom: '6px'
            }}
          >
            Finalizar Compra
          </h2>
          <p style={{ color: '#424245', marginBottom: '20px', fontSize: '0.98rem' }}>
            Completa los datos de tu orden para procesar tu compra de forma segura.
          </p>

          {/* Barra de progreso interactiva de 3 pasos */}
          <div className="d-flex justify-content-center align-items-center gap-2 flex-wrap">
            {pasos.map((p, idx) => {
              const completado = step > p.numero;
              const activo = step === p.numero;
              return (
                <div key={p.numero} className="d-flex align-items-center gap-2">
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '6px 16px',
                      borderRadius: '999px',
                      backgroundColor: activo
                        ? '#0071e3'
                        : completado
                        ? '#16a34a'
                        : '#ffffff',
                      color: activo || completado ? '#ffffff' : '#515154',
                      border:
                        activo || completado ? 'none' : '1px solid #d2d2d7',
                      fontWeight: 700,
                      fontSize: '0.84rem'
                    }}
                  >
                    <span>{completado ? '✓' : p.numero}</span>
                    <span>{p.titulo}</span>
                  </div>
                  {idx < pasos.length - 1 && (
                    <span style={{ color: '#94a3b8', fontWeight: 700 }}>→</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {step === 3 ? (
          <Row className="justify-content-center">
            <Col md={10} lg={8}>
              <div
                className="p-4 p-md-5"
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '28px',
                  border: '1.5px solid #dbeafe',
                  boxShadow: '0 20px 50px rgba(0, 113, 227, 0.1)'
                }}
              >
                <div className="text-center mb-4">
                  <div
                    style={{
                      width: '78px',
                      height: '78px',
                      borderRadius: '50%',
                      margin: '0 auto 16px',
                      background:
                        'linear-gradient(135deg, #dcfce7 0%, #bae6fd 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '2.4rem'
                    }}
                  >
                    🎉
                  </div>

                  <h3
                    style={{
                      fontFamily: FUENTE_APPLE,
                      fontWeight: 800,
                      fontSize: '2rem',
                      color: '#1d1d1f',
                      marginBottom: '8px'
                    }}
                  >
                    ¡Compra Realizada con Éxito!
                  </h3>

                  <p
                    style={{
                      color: '#424245',
                      fontSize: '1.02rem',
                      margin: 0
                    }}
                  >
                    Muchas gracias por tu compra,{' '}
                    <strong style={{ color: '#0071e3' }}>{formData.nombre}</strong>. Tu
                    boleta ha sido registrada en el sistema.
                  </p>
                </div>

                {/* Comprobante / Boleta clara y 100% legible */}
                <div
                  className="p-4 mb-4 text-start"
                  style={{
                    background:
                      'linear-gradient(180deg, #f8fbff 0%, #f5f5f7 100%)',
                    borderRadius: '22px',
                    border: '1.5px solid #cbd5e1'
                  }}
                >
                  <div
                    className="d-flex flex-wrap justify-content-between align-items-center gap-2 pb-3 mb-3"
                    style={{ borderBottom: '1.5px dashed #cbd5e1' }}
                  >
                    <div>
                      <span
                        style={{
                          fontSize: '0.72rem',
                          fontWeight: 800,
                          letterSpacing: '0.08em',
                          color: '#0071e3',
                          textTransform: 'uppercase',
                          display: 'block'
                        }}
                      >
                        Boleta Electrónica TecnoRosita
                      </span>
                      <span
                        style={{
                          fontWeight: 800,
                          fontSize: '1.25rem',
                          color: '#1d1d1f'
                        }}
                      >
                        Orden #{orderId}
                      </span>
                    </div>
                    <div
                      style={{
                        fontSize: '0.84rem',
                        color: '#6e6e73',
                        textAlign: 'right'
                      }}
                    >
                      <div>
                        Emitida: {boletaDetalle?.fecha || new Date().toLocaleString('es-CL')}
                      </div>
                      <strong
                        className="text-uppercase"
                        style={{ color: '#16a34a' }}
                      >
                        {formData.metodoPago}
                      </strong>
                    </div>
                  </div>

                  <Row className="g-2 mb-3" style={{ fontSize: '0.9rem' }}>
                    <Col sm={6}>
                      <span style={{ color: '#6e6e73' }}>Cliente: </span>
                      <strong style={{ color: '#1d1d1f' }}>{formData.nombre}</strong>
                    </Col>
                    <Col sm={6}>
                      <span style={{ color: '#6e6e73' }}>Correo: </span>
                      <strong style={{ color: '#1d1d1f' }}>{formData.email}</strong>
                    </Col>
                    <Col xs={12}>
                      <span style={{ color: '#6e6e73' }}>Envío a: </span>
                      <strong style={{ color: '#1d1d1f' }}>
                        {formData.direccion}, {formData.comuna}
                      </strong>
                    </Col>
                  </Row>

                  {boletaDetalle?.items && boletaDetalle.items.length > 0 && (
                    <div
                      className="p-3 mb-3"
                      style={{
                        backgroundColor: '#ffffff',
                        borderRadius: '14px',
                        border: '1px solid #e2e8f0'
                      }}
                    >
                      <div
                        style={{
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          color: '#6e6e73',
                          textTransform: 'uppercase',
                          marginBottom: '8px'
                        }}
                      >
                        Detalle de Productos
                      </div>
                      {boletaDetalle.items.map((prod, index) => (
                        <div
                          key={index}
                          className="d-flex justify-content-between align-items-center py-1"
                          style={{
                            fontSize: '0.9rem',
                            borderBottom:
                              index !== boletaDetalle.items.length - 1
                                ? '1px solid #f1f5f9'
                                : 'none'
                          }}
                        >
                          <span style={{ color: '#1d1d1f', fontWeight: 500 }}>
                            {prod.nombre} × {prod.cantidad}
                          </span>
                          <strong style={{ color: '#1d1d1f' }}>
                            ${(prod.precioUnitario * prod.cantidad).toLocaleString('es-CL')}
                          </strong>
                        </div>
                      ))}
                    </div>
                  )}

                  <div
                    className="d-flex justify-content-between align-items-center pt-2"
                    style={{ borderTop: '1.5px solid #e2e8f0' }}
                  >
                    <span
                      style={{
                        fontWeight: 700,
                        fontSize: '1.05rem',
                        color: '#1d1d1f'
                      }}
                    >
                      Total Pagado:
                    </span>
                    <span
                      style={{
                        fontWeight: 800,
                        fontSize: '1.45rem',
                        color: '#0071e3'
                      }}
                    >
                      ${(boletaDetalle?.total ?? 0).toLocaleString('es-CL')}
                    </span>
                  </div>
                </div>

                <div className="d-flex justify-content-center gap-3 flex-wrap">
                  <button
                    type="button"
                    onClick={() => window.print()}
                    style={{
                      padding: '12px 24px',
                      borderRadius: '999px',
                      border: '1.5px solid #0071e3',
                      backgroundColor: '#ffffff',
                      color: '#0071e3',
                      fontWeight: 600,
                      fontSize: '0.95rem',
                      cursor: 'pointer'
                    }}
                  >
                    Imprimir Boleta
                  </button>

                  <button
                    type="button"
                    onClick={() => navigate('/')}
                    style={{
                      padding: '12px 28px',
                      borderRadius: '999px',
                      border: 'none',
                      backgroundColor: '#0071e3',
                      color: '#ffffff',
                      fontWeight: 600,
                      fontSize: '0.95rem',
                      cursor: 'pointer',
                      boxShadow: '0 10px 22px rgba(0, 113, 227, 0.25)'
                    }}
                  >
                    Volver al Inicio
                  </button>
                </div>
              </div>
            </Col>
          </Row>
        ) : (
          <Row className="g-4 align-items-start text-start">
            <Col lg={7}>
              <div
                className="p-4 p-md-5"
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '26px',
                  border: '1.5px solid #e5e5ea',
                  boxShadow: '0 14px 36px rgba(0, 0, 0, 0.06)'
                }}
              >
                <div
                  className="d-flex justify-content-between align-items-center mb-4 pb-3"
                  style={{ borderBottom: '1px solid #e5e5ea' }}
                >
                  <h4
                    style={{
                      fontFamily: FUENTE_APPLE,
                      fontWeight: 800,
                      fontSize: '1.35rem',
                      color: '#1d1d1f',
                      margin: 0
                    }}
                  >
                    {step === 1
                      ? '1. Información de Envío'
                      : '2. Método de Pago y Confirmación'}
                  </h4>
                  <span
                    style={{
                      backgroundColor: step === 1 ? '#e0f2fe' : '#dcfce7',
                      color: step === 1 ? '#0369a1' : '#15803d',
                      fontWeight: 700,
                      fontSize: '0.78rem',
                      padding: '5px 12px',
                      borderRadius: '999px'
                    }}
                  >
                    Paso {step} de 2
                  </span>
                </div>

                {step === 1 ? (
                  <Form onSubmit={handleNextStep}>
                    <Form.Group className="mb-3">
                      <Form.Label
                        htmlFor="input-nombre"
                        style={{
                          fontSize: '0.86rem',
                          fontWeight: 600,
                          color: '#1d1d1f'
                        }}
                      >
                        Nombre Completo
                      </Form.Label>
                      <Form.Control
                        id="input-nombre"
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        placeholder="Ej. Juan Pérez"
                        required
                        style={ESTILO_INPUT}
                      />
                    </Form.Group>

                    <Row className="mb-1">
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label
                            htmlFor="input-email"
                            style={{
                              fontSize: '0.86rem',
                              fontWeight: 600,
                              color: '#1d1d1f'
                            }}
                          >
                            Correo Electrónico *
                          </Form.Label>
                          <Form.Control
                            id="input-email"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="juan@correo.com"
                            required
                            style={ESTILO_INPUT}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label
                            htmlFor="input-telefono"
                            style={{
                              fontSize: '0.86rem',
                              fontWeight: 600,
                              color: '#1d1d1f'
                            }}
                          >
                            Teléfono de Contacto
                          </Form.Label>
                          <Form.Control
                            id="input-telefono"
                            type="text"
                            name="telefono"
                            value={formData.telefono}
                            onChange={handleChange}
                            placeholder="+56 9 1234 5678"
                            style={ESTILO_INPUT}
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Form.Group className="mb-3">
                      <Form.Label
                        htmlFor="input-direccion"
                        style={{
                          fontSize: '0.86rem',
                          fontWeight: 600,
                          color: '#1d1d1f'
                        }}
                      >
                        Dirección de Envío
                      </Form.Label>
                      <Form.Control
                        id="input-direccion"
                        type="text"
                        name="direccion"
                        value={formData.direccion}
                        onChange={handleChange}
                        placeholder="Av. Libertador 1234"
                        required
                        style={ESTILO_INPUT}
                      />
                    </Form.Group>

                    <Form.Group className="mb-4">
                      <Form.Label
                        htmlFor="input-comuna"
                        style={{
                          fontSize: '0.86rem',
                          fontWeight: 600,
                          color: '#1d1d1f'
                        }}
                      >
                        Comuna / Ciudad
                      </Form.Label>
                      <Form.Control
                        id="input-comuna"
                        type="text"
                        name="comuna"
                        value={formData.comuna}
                        onChange={handleChange}
                        style={ESTILO_INPUT}
                      />
                    </Form.Group>

                    <button
                      type="submit"
                      style={{
                        width: '100%',
                        padding: '13px 24px',
                        borderRadius: '999px',
                        border: 'none',
                        backgroundColor: '#0071e3',
                        color: '#ffffff',
                        fontWeight: 600,
                        fontSize: '1rem',
                        cursor: 'pointer',
                        boxShadow: '0 10px 22px rgba(0, 113, 227, 0.25)'
                      }}
                    >
                      Siguiente paso ➔
                    </button>
                  </Form>
                ) : (
                  <div>
                    <div
                      className="p-3 mb-4"
                      style={{
                        backgroundColor: '#f0f7ff',
                        border: '1px solid #bae6fd',
                        borderRadius: '16px',
                        color: '#1d1d1f',
                        fontSize: '0.92rem'
                      }}
                    >
                      📍 Envío registrado para:{' '}
                      <strong>
                        {formData.direccion}, {formData.comuna}
                      </strong>
                    </div>

                    <Form.Group className="mb-4">
                      <Form.Label
                        htmlFor="select-pago"
                        style={{
                          fontSize: '0.8rem',
                          fontWeight: 700,
                          color: '#6e6e73',
                          textTransform: 'uppercase',
                          letterSpacing: '0.06em',
                          marginBottom: '8px'
                        }}
                      >
                        Selecciona Plataforma de Pago:
                      </Form.Label>
                      <Form.Select
                        id="select-pago"
                        name="metodoPago"
                        value={formData.metodoPago}
                        onChange={handleChange}
                        style={ESTILO_INPUT}
                      >
                        <option value="transferencia">
                          Transferencia Bancaria Directa
                        </option>
                        <option value="webpay">Webpay Plus</option>
                      </Form.Select>
                    </Form.Group>

                    <div className="d-flex gap-3 flex-wrap">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        disabled={loading}
                        style={{
                          flex: 1,
                          padding: '12px 18px',
                          borderRadius: '999px',
                          border: '1.5px solid #0071e3',
                          backgroundColor: '#ffffff',
                          color: '#0071e3',
                          fontWeight: 600,
                          fontSize: '0.95rem',
                          cursor: loading ? 'not-allowed' : 'pointer'
                        }}
                      >
                        ← Volver a Envío
                      </button>

                      <button
                        type="button"
                        onClick={handleFinalizeOrder}
                        disabled={loading}
                        style={{
                          flex: 1,
                          padding: '12px 18px',
                          borderRadius: '999px',
                          border: 'none',
                          backgroundColor: loading ? '#6ea8fe' : '#0071e3',
                          color: '#ffffff',
                          fontWeight: 600,
                          fontSize: '0.95rem',
                          cursor: loading ? 'not-allowed' : 'pointer',
                          boxShadow: '0 10px 22px rgba(0, 113, 227, 0.25)'
                        }}
                      >
                        {loading ? 'Procesando...' : 'Confirmar y Pagar 🔒'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </Col>

            <Col lg={5}>
              <ResumenOrden
                carrito={cart}
                esCheckout={true}
                metodoPago={formData.metodoPago}
              />
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
}