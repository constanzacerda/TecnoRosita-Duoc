import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import ProductCard from '../components/ProductCard';
import { obtenerProductos } from '../services/productoService';

const FUENTE_APPLE =
  '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Segoe UI", Roboto, sans-serif';

const IMAGEN_RESPALDO_HD =
  'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=1400&q=90';

const VITRINA_VIVA = [
  {
    etiqueta: 'EDICIÓN PROLED',
    titulo: 'Setup Gaming Pro',
    subtitulo: 'Potencia extrema, iluminación RGB y fluidez competitiva.',
    fondo: 'linear-gradient(135deg, #09090b 0%, #18181b 100%)',
    oscura: true,
    imagen:
      'https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=1200&q=90'
  },
  {
    etiqueta: 'COLOR Y VELOCIDAD',
    titulo: 'Teclados Mecánicos',
    subtitulo: 'Switches ópticos rápidos y respuesta inmediata en cada tecla.',
    fondo: 'linear-gradient(180deg, #ffedd5 0%, #fdba74 100%)',
    oscura: false,
    imagen:
      'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=1200&q=90'
  },
  {
    etiqueta: 'ALTA DEFINICIÓN',
    titulo: 'Monitores Gamer HD',
    subtitulo: 'Colores vibrantes y alta tasa de refresco para no perder detalle.',
    fondo: 'linear-gradient(180deg, #e0f2fe 0%, #7dd3fc 100%)',
    oscura: false,
    imagen:
      'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1200&q=90'
  },
  {
    etiqueta: 'SONIDO CRISTALINO',
    titulo: 'Audio & Headsets',
    subtitulo: 'Audio envolvente y máxima comodidad para jugar o estudiar.',
    fondo: 'linear-gradient(180deg, #fce7f3 0%, #f9a8d4 100%)',
    oscura: false,
    imagen:
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1200&q=90'
  },
  {
    etiqueta: 'ULTRALIGEROS',
    titulo: 'Mouse Inalámbricos',
    subtitulo: 'Precisión milimétrica sin cables para partidas exigentes.',
    fondo: 'linear-gradient(180deg, #fef08a 0%, #fde047 100%)',
    oscura: false,
    imagen:
      'https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=1200&q=90'
  },
  {
    etiqueta: 'POTENCIA PORTÁTIL',
    titulo: 'Notebooks Gamer',
    subtitulo: 'Diseñados para programar, crear contenido y competir.',
    fondo: 'linear-gradient(180deg, #dcfce7 0%, #86efac 100%)',
    oscura: false,
    imagen:
      'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=1200&q=90'
  }
];

const manejarErrorImagen = (e) => {
  if (e.currentTarget.dataset.fallbackApplied) return;
  e.currentTarget.dataset.fallbackApplied = 'true';
  e.currentTarget.src = IMAGEN_RESPALDO_HD;
};

const HomeView = () => {
  const [destacados, setDestacados] = useState([]);
  const [ofertas, setOfertas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductos = async () => {
      const todosProductos = await obtenerProductos();
      if (todosProductos && todosProductos.length > 0) {
        setDestacados(todosProductos.slice(0, 4));
        setOfertas(todosProductos.slice(4, 8));
      }
      setLoading(false);
    };
    fetchProductos();
  }, []);

  return (
    <main style={{ backgroundColor: '#ffffff', color: '#1d1d1f', fontFamily: FUENTE_APPLE }}>
      {/* BANNER NEGRO EXACTO COMO REFERENCIA MACBOOK PRO */}
      <section
        aria-label="Banner principal"
        style={{
          backgroundColor: '#000000',
          color: '#ffffff',
          paddingTop: '5.5rem',
          paddingBottom: '4rem',
          textAlign: 'center'
        }}
      >
        <div className="container" style={{ maxWidth: '1120px' }}>
          <h1
            style={{
              fontFamily: FUENTE_APPLE,
              fontWeight: 700,
              color: '#ffffff',
              fontSize: 'clamp(2.6rem, 5.5vw, 4.5rem)',
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              marginBottom: '12px'
            }}
          >
            TecnoRosita Pro
          </h1>

          <div
            style={{
              fontFamily: FUENTE_APPLE,
              fontWeight: 500,
              fontSize: 'clamp(1.45rem, 3vw, 2.35rem)',
              letterSpacing: '-0.015em',
              background:
                'linear-gradient(90deg, #f2c94c 0%, #f7e6a1 26%, #eef6ff 48%, #73c0ff 74%, #1a73e8 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              display: 'inline-block',
              marginBottom: '24px'
            }}
          >
            Hardware PROLED · Colección Gamer 2026
          </div>

          <div className="d-flex justify-content-center gap-3 flex-wrap mb-5">
            <Link
              to="/categorias"
              style={{
                display: 'inline-block',
                textDecoration: 'none',
                backgroundColor: '#0071e3',
                border: '1.5px solid #0071e3',
                color: '#ffffff',
                borderRadius: '999px',
                padding: '11px 28px',
                fontSize: '1.05rem',
                fontWeight: 500,
                fontFamily: FUENTE_APPLE
              }}
            >
              Más información
            </Link>

            <Link
              to="/productos"
              style={{
                display: 'inline-block',
                textDecoration: 'none',
                backgroundColor: 'transparent',
                border: '1.5px solid #2997ff',
                color: '#2997ff',
                borderRadius: '999px',
                padding: '11px 28px',
                fontSize: '1.05rem',
                fontWeight: 500,
                fontFamily: FUENTE_APPLE
              }}
            >
              Comprar
            </Link>
          </div>

          {/* Galería Gamer HD dentro del banner */}
          <Row className="g-3 text-start">
            <Col lg={8}>
              <div
                style={{
                  padding: '1.5px',
                  borderRadius: '24px',
                  background:
                    'linear-gradient(135deg, rgba(242,201,76,0.55) 0%, rgba(115,192,255,0.55) 50%, rgba(168,85,247,0.55) 100%)'
                }}
              >
                <div
                  style={{
                    position: 'relative',
                    borderRadius: '22.5px',
                    overflow: 'hidden',
                    backgroundColor: '#09090d',
                    height: '360px'
                  }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1598550476439-6847785fcea6?auto=format&fit=crop&w=1600&q=90"
                    alt="Estación Gaming RGB de Alta Definición"
                    onError={manejarErrorImagen}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background:
                        'linear-gradient(180deg, transparent 42%, rgba(0,0,0,0.86) 100%)',
                      display: 'flex',
                      alignItems: 'flex-end',
                      padding: '24px'
                    }}
                  >
                    <div>
                      <span
                        style={{
                          background:
                            'linear-gradient(90deg, #f2c94c 0%, #ffffff 45%, #2997ff 100%)',
                          WebkitBackgroundClip: 'text',
                          backgroundClip: 'text',
                          color: 'transparent',
                          fontWeight: 800,
                          fontSize: '0.78rem',
                          letterSpacing: '0.1em',
                          display: 'block',
                          marginBottom: '4px'
                        }}
                      >
                        ESPORTS & SETUP PROLED
                      </span>
                      <h3
                        style={{
                          color: '#ffffff',
                          fontWeight: 700,
                          margin: 0,
                          fontSize: '1.45rem'
                        }}
                      >
                        Rendimiento de élite a todo color
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </Col>

            <Col lg={4} className="d-flex flex-column gap-3">
              {/* Tarjeta superior derecha: Hardware & PCs RGB */}
              <div
                style={{
                  padding: '1.5px',
                  borderRadius: '22px',
                  background:
                    'linear-gradient(135deg, rgba(41,151,255,0.55) 0%, rgba(168,85,247,0.55) 100%)'
                }}
              >
                <div
                  style={{
                    position: 'relative',
                    borderRadius: '20.5px',
                    overflow: 'hidden',
                    backgroundColor: '#09090d',
                    height: '171px'
                  }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=1200&q=90"
                    alt="Hardware Gamer con Iluminación RGB"
                    onError={manejarErrorImagen}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background:
                        'linear-gradient(180deg, transparent 35%, rgba(0,0,0,0.84) 100%)',
                      display: 'flex',
                      alignItems: 'flex-end',
                      padding: '14px 16px'
                    }}
                  >
                    <div>
                      <span
                        style={{
                          color: '#73c0ff',
                          fontWeight: 700,
                          fontSize: '0.68rem',
                          letterSpacing: '0.09em',
                          display: 'block'
                        }}
                      >
                        ALTO RENDIMIENTO
                      </span>
                      <span style={{ color: '#ffffff', fontWeight: 600, fontSize: '0.96rem' }}>
                        Hardware & PCs RGB
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tarjeta inferior derecha: Estación y accesorios vibrantes */}
              <div
                style={{
                  padding: '1.5px',
                  borderRadius: '22px',
                  background:
                    'linear-gradient(135deg, rgba(242,201,76,0.5) 0%, rgba(236,72,153,0.5) 55%, rgba(41,151,255,0.5) 100%)'
                }}
              >
                <div
                  style={{
                    position: 'relative',
                    borderRadius: '20.5px',
                    overflow: 'hidden',
                    backgroundColor: '#09090d',
                    height: '171px'
                  }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=90"
                    alt="Estación Gamer Neón y Accesorios Pro"
                    onError={manejarErrorImagen}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background:
                        'linear-gradient(180deg, transparent 35%, rgba(0,0,0,0.84) 100%)',
                      display: 'flex',
                      alignItems: 'flex-end',
                      padding: '14px 16px'
                    }}
                  >
                    <div>
                      <span
                        style={{
                          color: '#f7d774',
                          fontWeight: 700,
                          fontSize: '0.68rem',
                          letterSpacing: '0.09em',
                          display: 'block'
                        }}
                      >
                        ILUMINACIÓN & ESTILO
                      </span>
                      <span style={{ color: '#ffffff', fontWeight: 600, fontSize: '0.96rem' }}>
                        Estaciones & Periféricos Pro
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </section>

      {/* BLOQUE COLORIDO VIVO ESTILO COLLAGE APPLE */}
      <section className="py-5" style={{ backgroundColor: '#ffffff' }}>
        <div className="container">
          <div
            className="p-4 p-md-5 mb-5 text-center"
            style={{
              background:
                'linear-gradient(120deg, #ff9a76 0%, #ffd166 38%, #6ec1ff 75%, #0071e3 100%)',
              borderRadius: '28px',
              color: '#ffffff',
              boxShadow: '0 16px 36px rgba(0, 113, 227, 0.16)'
            }}
          >
            <h2
              style={{
                fontFamily: FUENTE_APPLE,
                fontWeight: 800,
                color: '#ffffff',
                fontSize: 'clamp(1.8rem, 3.5vw, 2.7rem)',
                marginBottom: '10px',
                textShadow: '0 2px 14px rgba(0, 0, 0, 0.16)'
              }}
            >
              Setups soñados llenos de color
            </h2>
            <p
              style={{
                color: '#ffffff',
                fontSize: '1.05rem',
                maxWidth: '640px',
                margin: '0 auto 20px',
                fontWeight: 500
              }}
            >
              Encuentra el periférico, teclado, mouse o monitor ideal para transformar tu escritorio con stock real y entrega rápida.
            </p>
            <Link
              to="/categorias"
              style={{
                display: 'inline-block',
                textDecoration: 'none',
                backgroundColor: '#0071e3',
                color: '#ffffff',
                borderRadius: '999px',
                padding: '10px 26px',
                fontWeight: 600,
                boxShadow: '0 8px 20px rgba(0, 0, 0, 0.18)'
              }}
            >
              Explorar regalos y setups
            </Link>
          </div>

          {/* VITRINA DE TARJETAS CON COLORES VIVOS */}
          <div className="mb-4 text-start">
            <h2
              style={{
                color: '#1d1d1f',
                fontWeight: 700,
                fontSize: 'clamp(1.6rem, 2.8vw, 2.2rem)'
              }}
            >
              Lo más nuevo.{' '}
              <span style={{ color: '#6e6e73', fontWeight: 500 }}>
                Opciones vibrantes para tu escritorio.
              </span>
            </h2>
          </div>

          <Row className="g-4">
            {VITRINA_VIVA.map((item, idx) => (
              <Col md={6} lg={4} key={idx}>
                <Link
                  to="/categorias"
                  className="text-decoration-none d-flex flex-column justify-content-between h-100 p-4"
                  style={{
                    background: item.fondo,
                    borderRadius: '24px',
                    color: item.oscura ? '#ffffff' : '#1d1d1f',
                    boxShadow: '0 10px 26px rgba(0, 0, 0, 0.08)'
                  }}
                >
                  <div className="text-start mb-3">
                    <span
                      style={{
                        fontSize: '0.72rem',
                        fontWeight: 800,
                        letterSpacing: '0.08em',
                        color: item.oscura ? '#73c0ff' : '#0071e3',
                        display: 'block',
                        marginBottom: '6px'
                      }}
                    >
                      {item.etiqueta}
                    </span>
                    <h4
                      style={{
                        fontFamily: FUENTE_APPLE,
                        fontWeight: 700,
                        fontSize: '1.4rem',
                        color: item.oscura ? '#ffffff' : '#1d1d1f',
                        marginBottom: '6px'
                      }}
                    >
                      {item.titulo}
                    </h4>
                    <p
                      style={{
                        fontSize: '0.92rem',
                        color: item.oscura ? '#d1d5db' : '#2c2c2e',
                        lineHeight: 1.45,
                        marginBottom: 0
                      }}
                    >
                      {item.subtitulo}
                    </p>
                  </div>

                  <img
                    src={item.imagen}
                    alt={item.titulo}
                    loading="lazy"
                    onError={manejarErrorImagen}
                    style={{
                      width: '100%',
                      height: '190px',
                      objectFit: 'cover',
                      borderRadius: '16px',
                      boxShadow: '0 8px 20px rgba(0, 0, 0, 0.14)'
                    }}
                  />
                </Link>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* PRODUCTOS DESTACADOS REALES DE MYSQL */}
      <section className="py-5" style={{ backgroundColor: '#ffffff' }}>
        <div className="container">
          <div className="mb-4 text-start">
            <span
              style={{
                color: '#0071e3',
                fontWeight: 700,
                fontSize: '0.8rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase'
              }}
            >
              Catálogo TecnoRosita
            </span>
            <h2 style={{ color: '#1d1d1f', fontWeight: 700, marginTop: '4px' }}>
              Productos Destacados
            </h2>
          </div>

          {loading ? (
            <h5 style={{ color: '#6e6e73' }}>Cargando productos desde el servidor...</h5>
          ) : (
            <Row className="g-4">
              {destacados.map((producto) => (
                <Col md={6} lg={3} key={producto.id}>
                  <ProductCard producto={producto} />
                </Col>
              ))}
            </Row>
          )}
        </div>
      </section>

      {/* LO MÁS VENDIDO REAL DE MYSQL */}
      <section className="py-5 pb-5" style={{ backgroundColor: '#ffffff' }}>
        <div className="container">
          <div className="mb-4 text-start">
            <span
              style={{
                color: '#0071e3',
                fontWeight: 700,
                fontSize: '0.8rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase'
              }}
            >
              Ofertas Especiales
            </span>
            <h2 style={{ color: '#1d1d1f', fontWeight: 700, marginTop: '4px' }}>
              Lo más vendido
            </h2>
          </div>

          {loading ? (
            <h5 style={{ color: '#6e6e73' }}>Cargando ofertas desde el servidor...</h5>
          ) : (
            <Row className="g-4">
              {ofertas.map((producto) => (
                <Col md={6} lg={3} key={producto.id}>
                  <ProductCard producto={producto} />
                </Col>
              ))}
            </Row>
          )}
        </div>
      </section>
    </main>
  );
};

export default HomeView;