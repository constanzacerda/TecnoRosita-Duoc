import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { getCart, saveCart } from '../services/ventasService';

const FUENTE_APPLE =
  '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Segoe UI", Roboto, sans-serif';

const IMAGEN_RESPALDO_HD =
  'https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=800&q=90';

export default function CartView() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setCart(getCart());
  }, []);

  const updateQuantity = (id, delta) => {
    const updatedCart = cart.map((item) => {
      if (item.id === id) {
        const stockMaximo =
          item.stockOnline !== undefined ? item.stockOnline : item.stock;
        const newQty = item.qty + delta;

        if (delta > 0 && stockMaximo !== undefined && newQty > stockMaximo) {
          alert(`Solo hay ${stockMaximo} unidades disponibles de este producto.`);
          return item;
        }

        return { ...item, qty: newQty > 0 ? newQty : 1 };
      }
      return item;
    });
    setCart(updatedCart);
    saveCart(updatedCart);
  };

  const removeItem = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    saveCart(updatedCart);
  };

  const subtotal = cart.reduce((acc, item) => {
    const precioBase =
      item.precioNormal || item.precioTransferencia || item.precio || 0;
    return acc + precioBase * item.qty;
  }, 0);

  const descuentoTransferencia = cart.reduce((acc, item) => {
    const precioNormal = item.precioNormal || item.precio || 0;
    const precioTransf = item.precioTransferencia || item.precio || 0;
    const diferencia = precioNormal > precioTransf ? precioNormal - precioTransf : 0;
    return acc + diferencia * item.qty;
  }, 0);

  const total = subtotal - descuentoTransferencia;
  const totalArticulos = cart.reduce((a, c) => a + c.qty, 0);

  if (cart.length === 0) {
    return (
      <div
        style={{
          backgroundColor: '#ffffff',
          color: '#1d1d1f',
          minHeight: '100vh',
          width: '100%',
          paddingTop: '7.5rem',
          paddingBottom: '4.5rem',
          fontFamily: FUENTE_APPLE
        }}
      >
        <Container style={{ maxWidth: '680px' }}>
          <div
            className="text-center p-5"
            style={{
              background:
                'linear-gradient(135deg, #f0f7ff 0%, #f5f3ff 52%, #fef9c3 100%)',
              borderRadius: '28px',
              border: '1.5px solid #e2e8f0',
              boxShadow: '0 16px 38px rgba(0, 0, 0, 0.06)'
            }}
          >
            <div style={{ fontSize: '4rem', marginBottom: '12px' }}>🛒</div>
            <h2
              style={{
                fontFamily: FUENTE_APPLE,
                fontWeight: 800,
                color: '#1d1d1f',
                marginBottom: '10px'
              }}
            >
              Tu carrito está vacío
            </h2>
            <p style={{ color: '#424245', marginBottom: '26px', fontSize: '1rem' }}>
              Parece que aún no has añadido ningún producto gamer de élite a tu orden.
            </p>
            <Link
              to="/productos"
              style={{
                display: 'inline-block',
                textDecoration: 'none',
                backgroundColor: '#0071e3',
                color: '#ffffff',
                borderRadius: '999px',
                padding: '12px 30px',
                fontWeight: 600,
                fontSize: '1rem',
                boxShadow: '0 10px 22px rgba(0, 113, 227, 0.25)'
              }}
            >
              Explorar Catálogo
            </Link>
          </div>
        </Container>
      </div>
    );
  }

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
      <Container style={{ maxWidth: '1180px' }}>
        {/* Encabezado colorido con espacio superior para que nunca se corte */}
        <div
          className="p-4 p-md-5 mb-4 d-flex flex-wrap justify-content-between align-items-center gap-3 text-start"
          style={{
            background:
              'linear-gradient(125deg, #e0f2fe 0%, #ede9fe 52%, #fef3c7 100%)',
            borderRadius: '26px',
            border: '1.5px solid #e2e8f0',
            boxShadow: '0 12px 30px rgba(0, 113, 227, 0.08)'
          }}
        >
          <div>
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
              Compra Segura · Stock Real
            </span>
            <h1
              style={{
                fontFamily: FUENTE_APPLE,
                fontWeight: 800,
                fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
                color: '#1d1d1f',
                margin: 0,
                letterSpacing: '-0.03em'
              }}
            >
              Mi Carrito de Compras
            </h1>
          </div>

          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '18px',
              padding: '12px 18px',
              border: '1px solid #d2d2d7',
              boxShadow: '0 6px 16px rgba(0, 0, 0, 0.05)'
            }}
          >
            <div style={{ fontSize: '0.78rem', color: '#6e6e73', fontWeight: 600 }}>
              Artículos en tu bolsa
            </div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0071e3' }}>
              {totalArticulos} {totalArticulos === 1 ? 'producto' : 'productos'} · Envío GRATIS
            </div>
          </div>
        </div>

        <Row className="g-4 align-items-start">
          {/* Lista de productos */}
          <Col lg={8}>
            <div
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '24px',
                border: '1.5px solid #e5e5ea',
                boxShadow: '0 12px 30px rgba(0, 0, 0, 0.05)',
                overflow: 'hidden'
              }}
            >
              {/* Cabecera de columnas */}
              <div
                className="d-none d-md-grid px-4 py-3 text-uppercase"
                style={{
                  gridTemplateColumns: '2.3fr 1fr 1.1fr 1fr',
                  backgroundColor: '#f5f5f7',
                  borderBottom: '1px solid #e5e5ea',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: '#6e6e73',
                  letterSpacing: '0.06em'
                }}
              >
                <div>Producto</div>
                <div className="text-center">Precio Unit.</div>
                <div className="text-center">Cantidad</div>
                <div className="text-end">Total</div>
              </div>

              {/* Filas de productos */}
              {cart.map((item, idx) => {
                const precioBase =
                  item.precioNormal || item.precioTransferencia || item.precio || 0;
                const imagenSrc = item.imagenUrl || item.imagen || IMAGEN_RESPALDO_HD;
                const categoriaNombre =
                  item.categoria && typeof item.categoria === 'object'
                    ? item.categoria.nombre || 'Catálogo'
                    : item.categoria || 'Catálogo';
                const stockMaximo =
                  item.stockOnline !== undefined ? item.stockOnline : item.stock;

                return (
                  <div
                    key={item.id}
                    className="p-4"
                    style={{
                      borderBottom:
                        idx !== cart.length - 1 ? '1px solid #e5e5ea' : 'none'
                    }}
                  >
                    <Row className="align-items-center g-3 text-start">
                      <Col md={5}>
                        <div className="d-flex align-items-center gap-3">
                          <img
                            src={imagenSrc}
                            alt={item.nombre}
                            onError={(e) => {
                              e.currentTarget.src = IMAGEN_RESPALDO_HD;
                            }}
                            style={{
                              width: '74px',
                              height: '74px',
                              objectFit: 'cover',
                              borderRadius: '14px',
                              border: '1px solid #e5e5ea',
                              backgroundColor: '#f5f5f7',
                              flexShrink: 0
                            }}
                          />
                          <div style={{ minWidth: 0 }}>
                            <span
                              style={{
                                display: 'inline-block',
                                backgroundColor: '#e0f2fe',
                                color: '#0369a1',
                                fontSize: '0.7rem',
                                fontWeight: 700,
                                padding: '2px 9px',
                                borderRadius: '999px',
                                marginBottom: '4px'
                              }}
                            >
                              {categoriaNombre}
                            </span>
                            <h6
                              style={{
                                fontFamily: FUENTE_APPLE,
                                fontWeight: 700,
                                color: '#1d1d1f',
                                margin: '0 0 6px',
                                lineHeight: 1.3
                              }}
                            >
                              {item.nombre}
                            </h6>
                            <button
                              type="button"
                              onClick={() => removeItem(item.id)}
                              style={{
                                background: 'transparent',
                                border: 'none',
                                padding: 0,
                                color: '#dc2626',
                                fontSize: '0.82rem',
                                fontWeight: 600,
                                cursor: 'pointer'
                              }}
                            >
                              Eliminar
                            </button>
                          </div>
                        </div>
                      </Col>

                      <Col xs={4} md={2} className="text-md-center">
                        <div className="d-md-none small" style={{ color: '#6e6e73' }}>
                          Precio Unit.
                        </div>
                        <span style={{ fontWeight: 700, color: '#1d1d1f' }}>
                          ${precioBase.toLocaleString('es-CL')}
                        </span>
                      </Col>

                      <Col xs={4} md={3} className="text-center">
                        {/* Selector de cantidad 100% legible */}
                        <div
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            backgroundColor: '#f5f5f7',
                            border: '1.5px solid #d2d2d7',
                            borderRadius: '999px',
                            padding: '4px 6px',
                            gap: '8px'
                          }}
                        >
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, -1)}
                            disabled={item.qty <= 1}
                            style={{
                              width: '28px',
                              height: '28px',
                              borderRadius: '50%',
                              border: 'none',
                              backgroundColor: item.qty <= 1 ? '#e5e5ea' : '#ffffff',
                              color: item.qty <= 1 ? '#9ca3af' : '#1d1d1f',
                              fontWeight: 700,
                              cursor: item.qty <= 1 ? 'not-allowed' : 'pointer'
                            }}
                          >
                            -
                          </button>

                          <span
                            style={{
                              minWidth: '24px',
                              textAlign: 'center',
                              fontWeight: 800,
                              color: '#1d1d1f',
                              fontSize: '0.95rem'
                            }}
                          >
                            {item.qty}
                          </span>

                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, 1)}
                            disabled={
                              stockMaximo !== undefined && item.qty >= stockMaximo
                            }
                            style={{
                              width: '28px',
                              height: '28px',
                              borderRadius: '50%',
                              border: 'none',
                              backgroundColor:
                                stockMaximo !== undefined && item.qty >= stockMaximo
                                  ? '#e5e5ea'
                                  : '#0071e3',
                              color:
                                stockMaximo !== undefined && item.qty >= stockMaximo
                                  ? '#9ca3af'
                                  : '#ffffff',
                              fontWeight: 700,
                              cursor:
                                stockMaximo !== undefined && item.qty >= stockMaximo
                                  ? 'not-allowed'
                                  : 'pointer'
                            }}
                          >
                            +
                          </button>
                        </div>
                      </Col>

                      <Col xs={4} md={2} className="text-end">
                        <div className="d-md-none small" style={{ color: '#6e6e73' }}>
                          Total
                        </div>
                        <span
                          style={{
                            fontWeight: 800,
                            fontSize: '1.15rem',
                            color: '#0071e3'
                          }}
                        >
                          ${(precioBase * item.qty).toLocaleString('es-CL')}
                        </span>
                      </Col>
                    </Row>
                  </div>
                );
              })}
            </div>
          </Col>

          {/* Resumen de compra 100% legible */}
          <Col lg={4}>
            <div
              className="p-4 sticky-top text-start"
              style={{
                top: '105px',
                background: 'linear-gradient(180deg, #f8fbff 0%, #ffffff 45%)',
                borderRadius: '24px',
                border: '1.5px solid #dbeafe',
                boxShadow: '0 14px 34px rgba(0, 113, 227, 0.08)'
              }}
            >
              <h4
                style={{
                  fontFamily: FUENTE_APPLE,
                  fontWeight: 800,
                  fontSize: '1.25rem',
                  color: '#1d1d1f',
                  paddingBottom: '14px',
                  marginBottom: '18px',
                  borderBottom: '1px solid #e5e5ea'
                }}
              >
                Resumen de Compra
              </h4>

              <div
                className="d-flex justify-content-between mb-3"
                style={{ color: '#424245', fontSize: '0.95rem' }}
              >
                <span>Subtotal ({totalArticulos} artículos):</span>
                <strong style={{ color: '#1d1d1f' }}>
                  ${subtotal.toLocaleString('es-CL')}
                </strong>
              </div>

              <div
                className="d-flex justify-content-between mb-3"
                style={{ color: '#16a34a', fontSize: '0.95rem', fontWeight: 600 }}
              >
                <span>Dcto. Transferencia:</span>
                <span>- ${descuentoTransferencia.toLocaleString('es-CL')}</span>
              </div>

              <div
                className="d-flex justify-content-between align-items-center mb-4"
                style={{ color: '#424245', fontSize: '0.95rem' }}
              >
                <span>Costo de Envío:</span>
                <span
                  style={{
                    backgroundColor: '#dcfce7',
                    color: '#15803d',
                    fontWeight: 800,
                    fontSize: '0.78rem',
                    padding: '4px 12px',
                    borderRadius: '999px'
                  }}
                >
                  GRATIS
                </span>
              </div>

              {/* Caja Total estilo PROLED oscuro elegante y legible */}
              <div
                className="d-flex justify-content-between align-items-center mb-4 p-3"
                style={{
                  backgroundColor: '#000000',
                  borderRadius: '18px',
                  color: '#ffffff'
                }}
              >
                <span style={{ fontWeight: 600, fontSize: '1rem', color: '#e5e7eb' }}>
                  Total a Pagar:
                </span>
                <span
                  style={{
                    fontWeight: 800,
                    fontSize: '1.55rem',
                    background:
                      'linear-gradient(90deg, #f2c94c 0%, #ffffff 45%, #73c0ff 100%)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    color: 'transparent'
                  }}
                >
                  ${total.toLocaleString('es-CL')}
                </span>
              </div>

              <button
                type="button"
                onClick={() => navigate('/checkout')}
                style={{
                  width: '100%',
                  padding: '13px 20px',
                  borderRadius: '999px',
                  border: 'none',
                  backgroundColor: '#0071e3',
                  color: '#ffffff',
                  fontWeight: 600,
                  fontSize: '1rem',
                  cursor: 'pointer',
                  marginBottom: '12px',
                  boxShadow: '0 10px 22px rgba(0, 113, 227, 0.28)'
                }}
              >
                Ir a Pagar 🔒
              </button>

              <Link
                to="/productos"
                style={{
                  display: 'block',
                  width: '100%',
                  textAlign: 'center',
                  textDecoration: 'none',
                  padding: '11px 20px',
                  borderRadius: '999px',
                  border: '1.5px solid #0071e3',
                  backgroundColor: '#ffffff',
                  color: '#0071e3',
                  fontWeight: 600,
                  fontSize: '0.95rem'
                }}
              >
                Seguir Comprando
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}