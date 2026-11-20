import React, { useState } from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';

const FUENTE_APPLE =
  '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Segoe UI", Roboto, sans-serif';

// Imágenes HD exclusivas para Contacto (sin repetir ninguna de Inicio, Catálogo ni Blog)
const IMAGEN_PORTADA_SETUP_HD =
  'https://images.unsplash.com/photo-1616588589676-62b3bd4ff6d2?auto=format&fit=crop&w=1400&q=90';

const IMAGEN_SHOWROOM_GAMER_HD =
  'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&w=1400&q=90';

const IMAGEN_RESPALDO_CONTACTO_HD =
  'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=1400&q=90';

const VisualCanal = ({ tipo }) => {
  if (tipo === 'correo') {
    return (
      <div
        style={{
          height: '158px',
          borderRadius: '18px',
          position: 'relative',
          overflow: 'hidden',
          background: 'linear-gradient(135deg, #090c14 0%, #111b2e 58%, #071324 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid rgba(255, 255, 255, 0.08)'
        }}
      >
        <div
          style={{
            position: 'absolute',
            width: '170px',
            height: '170px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(41,151,255,0.34) 0%, transparent 70%)',
            top: '-30px',
            right: '-25px'
          }}
        />
        <div
          style={{
            position: 'absolute',
            width: '130px',
            height: '130px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(242,201,76,0.2) 0%, transparent 70%)',
            bottom: '-35px',
            left: '-15px'
          }}
        />

        <div
          style={{
            position: 'relative',
            zIndex: 2,
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            padding: '14px 18px',
            borderRadius: '16px',
            background: 'rgba(255, 255, 255, 0.06)',
            border: '1px solid rgba(255, 255, 255, 0.14)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 12px 28px rgba(0, 0, 0, 0.35)'
          }}
        >
          <div
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '13px',
              background: 'linear-gradient(135deg, #0071e3 0%, #2997ff 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 6px 18px rgba(0, 113, 227, 0.45)'
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="5" width="18" height="14" rx="3" stroke="#ffffff" strokeWidth="1.8" />
              <path
                d="M4.5 7L12 12.5L19.5 7"
                stroke="#ffffff"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div>
            <div style={{ color: '#ffffff', fontWeight: 700, fontSize: '0.88rem', lineHeight: 1.2 }}>
              Soporte Directo
            </div>
            <div style={{ color: '#7cc4ff', fontSize: '0.75rem', fontWeight: 500, marginTop: '3px' }}>
              Respuesta &lt; 24 hrs
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (tipo === 'whatsapp') {
    return (
      <div
        style={{
          height: '158px',
          borderRadius: '18px',
          position: 'relative',
          overflow: 'hidden',
          background: 'linear-gradient(135deg, #080d12 0%, #0d1f26 58%, #071519 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid rgba(255, 255, 255, 0.08)'
        }}
      >
        <div
          style={{
            position: 'absolute',
            width: '170px',
            height: '170px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(34,211,238,0.28) 0%, transparent 70%)',
            top: '-30px',
            right: '-20px'
          }}
        />
        <div
          style={{
            position: 'absolute',
            width: '140px',
            height: '140px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(37,211,102,0.22) 0%, transparent 70%)',
            bottom: '-35px',
            left: '-20px'
          }}
        />

        <div
          style={{
            position: 'relative',
            zIndex: 2,
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            padding: '14px 18px',
            borderRadius: '16px',
            background: 'rgba(255, 255, 255, 0.06)',
            border: '1px solid rgba(255, 255, 255, 0.14)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 12px 28px rgba(0, 0, 0, 0.35)'
          }}
        >
          <div
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '13px',
              background: 'linear-gradient(135deg, #0ea5e9 0%, #10b981 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 6px 18px rgba(16, 185, 129, 0.4)'
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M4 13V12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12V13"
                stroke="#ffffff"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
              <rect x="3" y="12.5" width="4" height="6.5" rx="2" stroke="#ffffff" strokeWidth="1.8" />
              <rect x="17" y="12.5" width="4" height="6.5" rx="2" stroke="#ffffff" strokeWidth="1.8" />
              <path
                d="M19 19C19 20.4 17.5 21 15 21H12.5"
                stroke="#ffffff"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div>
            <div style={{ color: '#ffffff', fontWeight: 700, fontSize: '0.88rem', lineHeight: 1.2 }}>
              Especialista Gamer
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                color: '#6ee7b7',
                fontSize: '0.75rem',
                fontWeight: 600,
                marginTop: '3px'
              }}
            >
              <span
                style={{
                  width: '7px',
                  height: '7px',
                  borderRadius: '50%',
                  backgroundColor: '#34d399',
                  display: 'inline-block'
                }}
              />
              Asesoría en línea
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        height: '158px',
        borderRadius: '18px',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #0d0a16 0%, #1b1430 58%, #0a1020 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid rgba(255, 255, 255, 0.08)'
      }}
    >
      <div
        style={{
          position: 'absolute',
          width: '175px',
          height: '175px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139,92,246,0.34) 0%, transparent 70%)',
          top: '-35px',
          right: '-25px'
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: '140px',
          height: '140px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(41,151,255,0.26) 0%, transparent 70%)',
          bottom: '-35px',
          left: '-20px'
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          padding: '14px 18px',
          borderRadius: '16px',
          background: 'rgba(255, 255, 255, 0.06)',
          border: '1px solid rgba(255, 255, 255, 0.14)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 12px 28px rgba(0, 0, 0, 0.35)'
        }}
      >
        <div
          style={{
            width: '46px',
            height: '46px',
            borderRadius: '13px',
            background: 'linear-gradient(135deg, #6366f1 0%, #0071e3 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 6px 18px rgba(99, 102, 241, 0.45)'
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 21C12 21 18.5 14.8 18.5 9.8C18.5 6.04446 15.5899 3 12 3C8.41015 3 5.5 6.04446 5.5 9.8C5.5 14.8 12 21 12 21Z"
              stroke="#ffffff"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
            <circle cx="12" cy="9.8" r="2.4" stroke="#ffffff" strokeWidth="1.8" />
          </svg>
        </div>
        <div>
          <div style={{ color: '#ffffff', fontWeight: 700, fontSize: '0.88rem', lineHeight: 1.2 }}>
            Showroom PROLED
          </div>
          <div style={{ color: '#c4b5fd', fontSize: '0.75rem', fontWeight: 500, marginTop: '3px' }}>
            Retiro Express · Providencia
          </div>
        </div>
      </div>
    </div>
  );
};

const CANALES_CONTACTO = [
  {
    tipo: 'correo',
    etiqueta: 'SOPORTE Y PEDIDOS',
    titulo: 'Correo Electrónico',
    dato: 'contacto@tecnorosita.cl',
    detalle: 'Respuesta promedio en menos de 24 horas hábiles.',
    paleta: {
      fondo: 'linear-gradient(180deg, #f0f7ff 0%, #ffffff 55%)',
      borde: '#dbeafe',
      chipBg: '#0071e3'
    }
  },
  {
    tipo: 'whatsapp',
    etiqueta: 'ASESORÍA GAMER',
    titulo: 'Teléfono y WhatsApp',
    dato: '+56 9 1234 5678',
    detalle: 'Ayuda directa para cotizar periféricos, PCs y stock.',
    paleta: {
      fondo: 'linear-gradient(180deg, #ecfeff 0%, #ffffff 55%)',
      borde: '#cffafe',
      chipBg: '#0891b2'
    }
  },
  {
    tipo: 'tienda',
    etiqueta: 'PUNTO DE RETIRO',
    titulo: 'Tienda Providencia',
    dato: 'Padre Mariano N° 356, Providencia, Santiago',
    detalle: 'Retiro rápido de compras online y demostración de equipos.',
    paleta: {
      fondo: 'linear-gradient(180deg, #f5f3ff 0%, #ffffff 55%)',
      borde: '#e9d5ff',
      chipBg: '#6d28d9'
    }
  }
];

const MOTIVOS_RAPIDOS = [
  'Consulta de producto',
  'Estado de pedido',
  'Garantía y soporte',
  'Cotización de setup'
];

const ContactoView = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    motivo: 'Consulta de producto',
    mensaje: ''
  });
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nombre.trim() || !formData.correo.trim() || !formData.mensaje.trim()) {
      setError('Por favor completa todos los campos obligatorios.');
      return;
    }
    setError('');
    setEnviado(true);
    setFormData({
      nombre: '',
      correo: '',
      motivo: 'Consulta de producto',
      mensaje: ''
    });
  };

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
      <Container style={{ maxWidth: '1160px' }}>
        {/* Encabezado colorido con imagen gamer HD exclusiva */}
        <div
          className="p-4 p-md-5 mb-5 overflow-hidden"
          style={{
            background:
              'linear-gradient(125deg, #e0f2fe 0%, #ede9fe 48%, #fce7f3 100%)',
            borderRadius: '28px',
            border: '1.5px solid #e2e8f0',
            boxShadow: '0 14px 34px rgba(0, 113, 227, 0.08)'
          }}
        >
          <Row className="align-items-center g-4 text-start">
            <Col lg={7}>
              <span
                style={{
                  display: 'inline-block',
                  backgroundColor: '#0071e3',
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: '0.75rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  padding: '6px 14px',
                  borderRadius: '999px',
                  marginBottom: '14px'
                }}
              >
                Centro de Ayuda TecnoRosita
              </span>

              <h1
                style={{
                  fontFamily: FUENTE_APPLE,
                  fontWeight: 800,
                  fontSize: 'clamp(2rem, 4vw, 3rem)',
                  color: '#1d1d1f',
                  letterSpacing: '-0.03em',
                  lineHeight: 1.1,
                  marginBottom: '12px'
                }}
              >
                Hablemos sobre tu próximo setup
              </h1>

              <p
                style={{
                  color: '#3a3a3c',
                  fontSize: '1.05rem',
                  lineHeight: 1.6,
                  maxWidth: '560px',
                  marginBottom: 0
                }}
              >
                ¿Tienes dudas sobre algún producto, stock o pedido? Escríbenos o visítanos en nuestra tienda en Providencia y te ayudaremos en minutos.
              </p>
            </Col>

            <Col lg={5}>
              <div
                style={{
                  position: 'relative',
                  height: '240px',
                  borderRadius: '22px',
                  overflow: 'hidden',
                  boxShadow: '0 18px 36px rgba(0, 113, 227, 0.22)',
                  border: '3px solid #ffffff',
                  backgroundColor: '#090c14'
                }}
              >
                <img
                  src={IMAGEN_PORTADA_SETUP_HD}
                  alt="Setup gamer colorido iluminado TecnoRosita"
                  onError={(e) => {
                    if (e.currentTarget.dataset.fallbackApplied) return;
                    e.currentTarget.dataset.fallbackApplied = 'true';
                    e.currentTarget.src = IMAGEN_RESPALDO_CONTACTO_HD;
                  }}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'linear-gradient(180deg, rgba(9,12,20,0.06) 35%, rgba(9,12,20,0.84) 100%)',
                    display: 'flex',
                    alignItems: 'flex-end',
                    padding: '16px 18px'
                  }}
                >
                  <div>
                    <span
                      style={{
                        background:
                          'linear-gradient(90deg, #f2c94c 0%, #ffffff 48%, #66b8ff 100%)',
                        WebkitBackgroundClip: 'text',
                        backgroundClip: 'text',
                        color: 'transparent',
                        fontWeight: 800,
                        fontSize: '0.7rem',
                        letterSpacing: '0.1em',
                        display: 'block'
                      }}
                    >
                      SETUP STUDIO · PROLED
                    </span>
                    <span style={{ color: '#ffffff', fontWeight: 700, fontSize: '0.95rem' }}>
                      Asesoría gamer personalizada
                    </span>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>

        {/* 3 tarjetas elegantes estilo Apple + Gamer PROLED */}
        <Row className="g-4 mb-5">
          {CANALES_CONTACTO.map((canal, idx) => (
            <Col md={4} key={idx}>
              <div
                className="h-100 d-flex flex-column overflow-hidden text-start"
                style={{
                  background: canal.paleta.fondo,
                  border: `1.5px solid ${canal.paleta.borde}`,
                  borderRadius: '24px',
                  boxShadow: '0 10px 24px rgba(0, 0, 0, 0.05)'
                }}
              >
                <div style={{ padding: '14px 14px 0', position: 'relative' }}>
                  <VisualCanal tipo={canal.tipo} />
                  <span
                    style={{
                      position: 'absolute',
                      top: '24px',
                      left: '24px',
                      zIndex: 3,
                      backgroundColor: canal.paleta.chipBg,
                      color: '#ffffff',
                      fontSize: '0.66rem',
                      fontWeight: 700,
                      padding: '4px 10px',
                      borderRadius: '999px',
                      letterSpacing: '0.06em',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.25)'
                    }}
                  >
                    {canal.etiqueta}
                  </span>
                </div>

                <div style={{ padding: '16px 20px 20px' }}>
                  <h4
                    style={{
                      fontFamily: FUENTE_APPLE,
                      fontWeight: 700,
                      fontSize: '1.15rem',
                      color: '#1d1d1f',
                      marginBottom: '6px'
                    }}
                  >
                    {canal.titulo}
                  </h4>
                  <div
                    style={{
                      fontWeight: 700,
                      color: '#0071e3',
                      fontSize: '0.96rem',
                      marginBottom: '6px'
                    }}
                  >
                    {canal.dato}
                  </div>
                  <p style={{ fontSize: '0.86rem', color: '#424245', lineHeight: 1.45, margin: 0 }}>
                    {canal.detalle}
                  </p>
                </div>
              </div>
            </Col>
          ))}
        </Row>

        {/* Bloque principal: Formulario luminoso + Showroom y Horarios */}
        <Row className="g-4 align-items-stretch text-start">
          <Col lg={7}>
            <div
              className="h-100 p-4 p-md-5"
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '26px',
                border: '1.5px solid #d2d2d7',
                boxShadow: '0 14px 36px rgba(0, 0, 0, 0.06)'
              }}
            >
              <h2
                style={{
                  fontFamily: FUENTE_APPLE,
                  fontWeight: 800,
                  fontSize: '1.85rem',
                  color: '#1d1d1f',
                  marginBottom: '6px'
                }}
              >
                Envíanos un mensaje
              </h2>
              <p style={{ color: '#6e6e73', fontSize: '0.95rem', marginBottom: '22px' }}>
                Completa el formulario y un especialista de TecnoRosita te responderá a la brevedad.
              </p>

              {enviado && (
                <Alert
                  variant="success"
                  onClose={() => setEnviado(false)}
                  dismissible
                  style={{ borderRadius: '14px' }}
                >
                  ¡Mensaje enviado con éxito! Te responderemos muy pronto a tu correo electrónico.
                </Alert>
              )}

              {error && (
                <Alert variant="danger" style={{ borderRadius: '14px' }}>
                  {error}
                </Alert>
              )}

              <div className="mb-4">
                <div
                  style={{
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    color: '#1d1d1f',
                    marginBottom: '8px'
                  }}
                >
                  Motivo de tu consulta
                </div>
                <div className="d-flex flex-wrap gap-2">
                  {MOTIVOS_RAPIDOS.map((motivo) => {
                    const activo = formData.motivo === motivo;
                    return (
                      <button
                        key={motivo}
                        type="button"
                        onClick={() => setFormData((prev) => ({ ...prev, motivo }))}
                        style={{
                          backgroundColor: activo ? '#1d1d1f' : '#f5f5f7',
                          color: activo ? '#ffffff' : '#1d1d1f',
                          border: activo ? '1px solid #1d1d1f' : '1px solid #d2d2d7',
                          borderRadius: '999px',
                          padding: '6px 14px',
                          fontSize: '0.82rem',
                          fontWeight: activo ? 600 : 500,
                          cursor: 'pointer'
                        }}
                      >
                        {motivo}
                      </button>
                    );
                  })}
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label
                    htmlFor="contacto-nombre"
                    style={{
                      display: 'block',
                      fontWeight: 600,
                      fontSize: '0.9rem',
                      color: '#1d1d1f',
                      marginBottom: '6px'
                    }}
                  >
                    Nombre completo *
                  </label>
                  <input
                    id="contacto-nombre"
                    name="nombre"
                    type="text"
                    required
                    value={formData.nombre}
                    onChange={handleChange}
                    placeholder="Ej. Juan Pérez"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '14px',
                      border: '1.5px solid #d2d2d7',
                      backgroundColor: '#f5f5f7',
                      color: '#1d1d1f',
                      fontSize: '0.95rem',
                      outline: 'none'
                    }}
                  />
                </div>

                <div className="mb-3">
                  <label
                    htmlFor="contacto-correo"
                    style={{
                      display: 'block',
                      fontWeight: 600,
                      fontSize: '0.9rem',
                      color: '#1d1d1f',
                      marginBottom: '6px'
                    }}
                  >
                    Correo electrónico *
                  </label>
                  <input
                    id="contacto-correo"
                    name="correo"
                    type="email"
                    required
                    value={formData.correo}
                    onChange={handleChange}
                    placeholder="ejemplo@duoc.cl"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '14px',
                      border: '1.5px solid #d2d2d7',
                      backgroundColor: '#f5f5f7',
                      color: '#1d1d1f',
                      fontSize: '0.95rem',
                      outline: 'none'
                    }}
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="contacto-mensaje"
                    style={{
                      display: 'block',
                      fontWeight: 600,
                      fontSize: '0.9rem',
                      color: '#1d1d1f',
                      marginBottom: '6px'
                    }}
                  >
                    Mensaje *
                  </label>
                  <textarea
                    id="contacto-mensaje"
                    name="mensaje"
                    rows={4}
                    required
                    value={formData.mensaje}
                    onChange={handleChange}
                    placeholder="¿En qué te podemos ayudar?"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '14px',
                      border: '1.5px solid #d2d2d7',
                      backgroundColor: '#f5f5f7',
                      color: '#1d1d1f',
                      fontSize: '0.95rem',
                      outline: 'none',
                      resize: 'vertical'
                    }}
                  />
                </div>

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
                    boxShadow: '0 8px 20px rgba(0, 113, 227, 0.25)'
                  }}
                >
                  Enviar mensaje
                </button>
              </form>
            </div>
          </Col>

          <Col lg={5} className="d-flex flex-column gap-4">
            <div
              className="p-4 flex-grow-1 d-flex flex-column justify-content-between"
              style={{
                background: 'linear-gradient(180deg, #dcfce7 0%, #f0fdf4 100%)',
                borderRadius: '26px',
                border: '1.5px solid #bbf7d0'
              }}
            >
              <div>
                <span
                  style={{
                    display: 'inline-block',
                    backgroundColor: '#16a34a',
                    color: '#ffffff',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    padding: '4px 12px',
                    borderRadius: '999px',
                    marginBottom: '12px'
                  }}
                >
                  HORARIO DE ATENCIÓN
                </span>

                <h3
                  style={{
                    fontFamily: FUENTE_APPLE,
                    fontWeight: 800,
                    fontSize: '1.45rem',
                    color: '#1d1d1f',
                    marginBottom: '10px'
                  }}
                >
                  Visítanos en Providencia
                </h3>

                <p style={{ color: '#2c2c2e', fontSize: '0.92rem', lineHeight: 1.55, marginBottom: '16px' }}>
                  Prueba periféricos, retira tus compras web sin esperas y recibe asesoría para armar o actualizar tu equipo.
                </p>

                <div
                  className="p-3 mb-3"
                  style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '16px',
                    border: '1px solid #bbf7d0'
                  }}
                >
                  <div className="d-flex justify-content-between py-1" style={{ fontSize: '0.88rem' }}>
                    <span style={{ color: '#6e6e73', fontWeight: 500 }}>Lunes a Jueves</span>
                    <span style={{ color: '#1d1d1f', fontWeight: 700 }}>09:00 a 18:30</span>
                  </div>
                  <div
                    className="d-flex justify-content-between py-1"
                    style={{ fontSize: '0.88rem', borderTop: '1px solid #ecfdf5' }}
                  >
                    <span style={{ color: '#6e6e73', fontWeight: 500 }}>Viernes</span>
                    <span style={{ color: '#1d1d1f', fontWeight: 700 }}>09:00 a 18:00</span>
                  </div>
                  <div
                    className="d-flex justify-content-between pt-1"
                    style={{ fontSize: '0.88rem', borderTop: '1px solid #ecfdf5' }}
                  >
                    <span style={{ color: '#6e6e73', fontWeight: 500 }}>Dirección</span>
                    <span style={{ color: '#0071e3', fontWeight: 700 }}>Padre Mariano N° 356</span>
                  </div>
                </div>
              </div>

              <div
                style={{
                  position: 'relative',
                  height: '195px',
                  borderRadius: '18px',
                  overflow: 'hidden',
                  boxShadow: '0 10px 24px rgba(0, 0, 0, 0.14)',
                  border: '2px solid #ffffff',
                  backgroundColor: '#090c14'
                }}
              >
                <img
                  src={IMAGEN_SHOWROOM_GAMER_HD}
                  alt="Showroom gamer colorido TecnoRosita Providencia"
                  onError={(e) => {
                    if (e.currentTarget.dataset.fallbackApplied) return;
                    e.currentTarget.dataset.fallbackApplied = 'true';
                    e.currentTarget.src = IMAGEN_RESPALDO_CONTACTO_HD;
                  }}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'linear-gradient(180deg, transparent 45%, rgba(9,12,20,0.78) 100%)',
                    display: 'flex',
                    alignItems: 'flex-end',
                    padding: '12px 14px'
                  }}
                >
                  <span style={{ color: '#ffffff', fontWeight: 600, fontSize: '0.85rem' }}>
                    Zona de pruebas & Retiro Express
                  </span>
                </div>
              </div>
            </div>

            <div
              className="p-4"
              style={{
                background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
                borderRadius: '24px',
                border: '1.5px solid #fcd34d'
              }}
            >
              <h4
                style={{
                  fontFamily: FUENTE_APPLE,
                  fontWeight: 800,
                  fontSize: '1.1rem',
                  color: '#1d1d1f',
                  marginBottom: '6px'
                }}
              >
                Garantía Care y Compras Seguras
              </h4>
              <p style={{ color: '#3a3a3c', fontSize: '0.88rem', lineHeight: 1.5, margin: 0 }}>
                Todas tus compras en línea emiten boleta electrónica y cuentan con soporte técnico directo de TecnoRosita.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ContactoView;