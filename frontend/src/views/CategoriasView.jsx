import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ProductCard from '../components/ProductCard';
import { obtenerProductos } from '../services/productoService';

const FUENTE_APPLE =
  '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Segoe UI", Roboto, sans-serif';

const IMAGEN_RESPALDO_HD =
  'https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=1000&q=90';

const PALETAS_APPLE = [
  { fondo: 'linear-gradient(180deg, #fce7f3 0%, #f9a8d4 100%)', texto: '#1d1d1f', acento: '#9d174d' },
  { fondo: 'linear-gradient(180deg, #dbeafe 0%, #93c5fd 100%)', texto: '#1d1d1f', acento: '#1d4ed8' },
  { fondo: 'linear-gradient(180deg, #ede9fe 0%, #c4b5fd 100%)', texto: '#1d1d1f', acento: '#5b21b6' },
  { fondo: 'linear-gradient(180deg, #fef3c7 0%, #fde047 100%)', texto: '#1d1d1f', acento: '#92400e' },
  { fondo: 'linear-gradient(180deg, #ffedd5 0%, #fdba74 100%)', texto: '#1d1d1f', acento: '#9a3412' },
  { fondo: 'linear-gradient(180deg, #dcfce7 0%, #86efac 100%)', texto: '#1d1d1f', acento: '#166534' }
];

const INFO_VISUAL_CATEGORIA = {
  todos: {
    subtitulo: 'Todo el catálogo disponible en tienda.',
    imagen: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=900&q=90'
  },
  teclados: {
    subtitulo: 'Mecánicos, ópticos y formatos 60% o TKL.',
    imagen: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=900&q=90'
  },
  mouse: {
    subtitulo: 'Precisión milimétrica y diseño ultraligero.',
    imagen: 'https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=900&q=90'
  },
  audifonos: {
    subtitulo: 'Sonido envolvente y máxima comodidad.',
    imagen: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=90'
  },
  monitores: {
    subtitulo: 'Alta fluidez y colores definidos en HD.',
    imagen: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=900&q=90'
  },
  sillas: {
    subtitulo: 'Ergonomía diseñada para largas sesiones.',
    imagen: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=900&q=90'
  },
  laptops: {
    subtitulo: 'Potencia portátil para estudiar y jugar.',
    imagen: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=90'
  },
  audio: {
    subtitulo: 'Parlantes y monitores con claridad pro.',
    imagen: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=900&q=90'
  },
  componentes: {
    subtitulo: 'Hardware clave para potenciar tu PC.',
    imagen: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=900&q=90'
  },
  hogar: {
    subtitulo: 'Iluminación y control inteligente diario.',
    imagen: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=900&q=90'
  },
  streaming: {
    subtitulo: 'Equipos listos para transmitir en vivo.',
    imagen: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=900&q=90'
  },
  accesorios: {
    subtitulo: 'Detalles que completan tu escritorio.',
    imagen: 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&w=900&q=90'
  }
};

const obtenerNombreCategoria = (producto) => {
  if (!producto || !producto.categoria) return null;
  return typeof producto.categoria === 'object'
    ? producto.categoria.nombre
    : producto.categoria;
};

const normalizarClave = (texto = '') =>
  texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

const obtenerVisualCategoria = (nombreCat, productosDeCategoria) => {
  const clave = normalizarClave(nombreCat);

  const matchKey = Object.keys(INFO_VISUAL_CATEGORIA).find((k) => clave.includes(k));
  const preset = matchKey ? INFO_VISUAL_CATEGORIA[matchKey] : null;

  const primerProductoConFoto = productosDeCategoria.find(
    (p) => p && (p.imagenUrl || p.imagen)
  );
  const imagenProducto = primerProductoConFoto
    ? primerProductoConFoto.imagenUrl || primerProductoConFoto.imagen
    : null;

  return {
    subtitulo: preset
      ? preset.subtitulo
      : 'Selección verificada de hardware TecnoRosita.',
    imagen: preset ? preset.imagen : imagenProducto || IMAGEN_RESPALDO_HD,
    respaldo: imagenProducto || IMAGEN_RESPALDO_HD
  };
};

const CategoriasView = () => {
  const [productos, setProductos] = useState([]);
  const [categoriaActiva, setCategoriaActiva] = useState('Todos');
  const [loading, setLoading] = useState(true);
  const carruselRef = useRef(null);
  const resultadosRef = useRef(null);

  useEffect(() => {
    const fetchCategorias = async () => {
      const data = await obtenerProductos();
      setProductos(data || []);
      setLoading(false);
    };
    fetchCategorias();
  }, []);

  const categoriasUnicas = [
    'Todos',
    ...new Set(productos.map(obtenerNombreCategoria).filter(Boolean))
  ];

  const productosFiltrados =
    categoriaActiva === 'Todos'
      ? productos
      : productos.filter((p) => obtenerNombreCategoria(p) === categoriaActiva);

  const contarEnCategoria = (cat) => {
    if (cat === 'Todos') return productos.length;
    return productos.filter((p) => obtenerNombreCategoria(p) === cat).length;
  };

  const seleccionarCategoria = (cat, hacerScroll = false) => {
    setCategoriaActiva(cat);
    if (hacerScroll && resultadosRef.current) {
      resultadosRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const moverCarrusel = (direccion) => {
    if (!carruselRef.current) return;
    carruselRef.current.scrollBy({
      left: direccion * 310,
      behavior: 'smooth'
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
      <Container style={{ maxWidth: '1240px' }}>
        {/* Encabezado limpio estilo Apple Store */}
        <div className="d-flex flex-wrap justify-content-between align-items-end gap-3 mb-4 text-start">
          <div>
            <span
              style={{
                display: 'inline-block',
                color: '#0071e3',
                fontWeight: 700,
                fontSize: '0.78rem',
                letterSpacing: '0.09em',
                textTransform: 'uppercase',
                marginBottom: '6px'
              }}
            >
              Catálogo TecnoRosita
            </span>
            <h1
              style={{
                fontFamily: FUENTE_APPLE,
                fontWeight: 800,
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                color: '#1d1d1f',
                letterSpacing: '-0.03em',
                margin: 0,
                lineHeight: 1.08
              }}
            >
              Explorar Categorías
            </h1>
          </div>

          <p
            style={{
              color: '#6e6e73',
              fontSize: '1rem',
              maxWidth: '420px',
              margin: 0,
              lineHeight: 1.45
            }}
          >
            Selecciona una categoría visual para filtrar el inventario actualizado en tiempo real.
          </p>
        </div>

        {/* NIVEL 1: Tira superior de miniaturas con imagen real + nombre (estilo Apple Store) */}
        <div
          className="mb-5 pb-2"
          style={{
            display: 'flex',
            gap: '14px',
            overflowX: 'auto',
            paddingTop: '6px',
            paddingBottom: '12px',
            scrollbarWidth: 'thin'
          }}
        >
          {categoriasUnicas.map((cat) => {
            const esActiva = categoriaActiva === cat;
            const prodsCat =
              cat === 'Todos'
                ? productos
                : productos.filter((p) => obtenerNombreCategoria(p) === cat);
            const visual = obtenerVisualCategoria(cat, prodsCat);

            return (
              <button
                key={cat}
                type="button"
                onClick={() => seleccionarCategoria(cat, false)}
                style={{
                  flex: '0 0 auto',
                  width: '106px',
                  background: 'transparent',
                  border: 'none',
                  padding: '4px',
                  cursor: 'pointer',
                  textAlign: 'center',
                  transition: 'transform 0.2s ease'
                }}
              >
                <div
                  style={{
                    width: '96px',
                    height: '68px',
                    margin: '0 auto 8px',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    backgroundColor: '#f5f5f7',
                    border: esActiva ? '2.5px solid #1d1d1f' : '1.5px solid #e5e5ea',
                    boxShadow: esActiva
                      ? '0 8px 18px rgba(0, 0, 0, 0.14)'
                      : '0 2px 8px rgba(0, 0, 0, 0.04)',
                    transform: esActiva ? 'translateY(-2px)' : 'none',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <img
                    src={visual.imagen}
                    alt={cat}
                    loading="lazy"
                    onError={(e) => {
                      if (e.currentTarget.dataset.fallbackApplied) return;
                      e.currentTarget.dataset.fallbackApplied = 'true';
                      e.currentTarget.src = visual.respaldo;
                    }}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                </div>
                <div
                  style={{
                    fontSize: '0.8rem',
                    fontWeight: esActiva ? 700 : 500,
                    color: esActiva ? '#1d1d1f' : '#515154',
                    lineHeight: 1.25
                  }}
                >
                  {cat}
                </div>
                {esActiva && (
                  <div
                    style={{
                      width: '18px',
                      height: '3px',
                      borderRadius: '99px',
                      backgroundColor: '#1d1d1f',
                      margin: '5px auto 0'
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* NIVEL 2: Carrusel colorido de tarjetas de categoría (estilo Apple Store) */}
        <div className="mb-5">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3 text-start">
            <h2
              style={{
                fontFamily: FUENTE_APPLE,
                fontWeight: 700,
                fontSize: 'clamp(1.3rem, 2.3vw, 1.75rem)',
                color: '#1d1d1f',
                margin: 0
              }}
            >
              Lo más destacado por sección.{' '}
              <span style={{ color: '#6e6e73', fontWeight: 500 }}>
                Elige tu colección ideal.
              </span>
            </h2>

            {/* Flechas circulares neutras estilo Apple */}
            <div className="d-flex gap-2">
              <button
                type="button"
                aria-label="Desplazar categorías a la izquierda"
                onClick={() => moverCarrusel(-1)}
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  border: '1px solid #d2d2d7',
                  backgroundColor: '#f5f5f7',
                  color: '#1d1d1f',
                  fontSize: '1.1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                ‹
              </button>
              <button
                type="button"
                aria-label="Desplazar categorías a la derecha"
                onClick={() => moverCarrusel(1)}
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  border: '1px solid #d2d2d7',
                  backgroundColor: '#f5f5f7',
                  color: '#1d1d1f',
                  fontSize: '1.1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                ›
              </button>
            </div>
          </div>

          <div
            ref={carruselRef}
            style={{
              display: 'flex',
              gap: '18px',
              overflowX: 'auto',
              paddingTop: '4px',
              paddingBottom: '14px',
              scrollSnapType: 'x mandatory'
            }}
          >
            {categoriasUnicas
              .filter((c) => c !== 'Todos')
              .map((cat, idx) => {
                const esActiva = categoriaActiva === cat;
                const paleta = PALETAS_APPLE[idx % PALETAS_APPLE.length];
                const prodsCat = productos.filter(
                  (p) => obtenerNombreCategoria(p) === cat
                );
                const visual = obtenerVisualCategoria(cat, prodsCat);

                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => seleccionarCategoria(cat, true)}
                    style={{
                      flex: '0 0 250px',
                      scrollSnapAlign: 'start',
                      textAlign: 'left',
                      borderRadius: '24px',
                      background: paleta.fondo,
                      border: esActiva ? '2.5px solid #1d1d1f' : '1px solid rgba(0,0,0,0.06)',
                      padding: '20px 18px 16px',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      minHeight: '285px',
                      position: 'relative',
                      boxShadow: esActiva
                        ? '0 14px 30px rgba(0, 0, 0, 0.14)'
                        : '0 8px 20px rgba(0, 0, 0, 0.06)',
                      transition: 'transform 0.25s ease, box-shadow 0.25s ease'
                    }}
                  >
                    <div>
                      <span
                        style={{
                          fontSize: '0.68rem',
                          fontWeight: 800,
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                          color: paleta.acento,
                          display: 'block',
                          marginBottom: '4px'
                        }}
                      >
                        {contarEnCategoria(cat)} productos
                      </span>
                      <h3
                        style={{
                          fontFamily: FUENTE_APPLE,
                          fontWeight: 800,
                          fontSize: '1.25rem',
                          color: paleta.texto,
                          margin: '0 0 4px'
                        }}
                      >
                        {cat}
                      </h3>
                      <p
                        style={{
                          fontSize: '0.82rem',
                          color: '#2c2c2e',
                          lineHeight: 1.38,
                          margin: '0 0 14px'
                        }}
                      >
                        {visual.subtitulo}
                      </p>
                    </div>

                    <div style={{ position: 'relative' }}>
                      <div
                        style={{
                          height: '132px',
                          borderRadius: '16px',
                          overflow: 'hidden',
                          backgroundColor: 'rgba(255,255,255,0.45)',
                          boxShadow: '0 8px 18px rgba(0, 0, 0, 0.12)'
                        }}
                      >
                        <img
                          src={visual.imagen}
                          alt={cat}
                          loading="lazy"
                          onError={(e) => {
                            if (e.currentTarget.dataset.fallbackApplied) return;
                            e.currentTarget.dataset.fallbackApplied = 'true';
                            e.currentTarget.src = visual.respaldo;
                          }}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                          }}
                        />
                      </div>

                      {/* Botón circular blanco ">" idéntico a Apple Store */}
                      <span
                        style={{
                          position: 'absolute',
                          right: '10px',
                          bottom: '10px',
                          width: '30px',
                          height: '30px',
                          borderRadius: '50%',
                          backgroundColor: esActiva ? '#1d1d1f' : '#ffffff',
                          color: esActiva ? '#ffffff' : '#1d1d1f',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 700,
                          fontSize: '1rem',
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.18)'
                        }}
                      >
                        ›
                      </span>
                    </div>
                  </button>
                );
              })}
          </div>
        </div>

        {/* Cabecera de resultados filtrados */}
        <div
          ref={resultadosRef}
          className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-4 pb-3"
          style={{ borderBottom: '1px solid #e5e5ea', scrollMarginTop: '100px' }}
        >
          <div className="d-flex align-items-center gap-3 flex-wrap">
            <h3
              style={{
                fontFamily: FUENTE_APPLE,
                fontWeight: 800,
                color: '#1d1d1f',
                margin: 0,
                fontSize: '1.5rem'
              }}
            >
              {categoriaActiva === 'Todos' ? 'Todos los productos' : categoriaActiva}
            </h3>

            {categoriaActiva !== 'Todos' && (
              <button
                type="button"
                onClick={() => setCategoriaActiva('Todos')}
                style={{
                  backgroundColor: '#f5f5f7',
                  color: '#1d1d1f',
                  border: '1px solid #d2d2d7',
                  borderRadius: '999px',
                  padding: '4px 14px',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Ver todo el catálogo ×
              </button>
            )}
          </div>

          <span
            style={{
              backgroundColor: '#f5f5f7',
              color: '#1d1d1f',
              border: '1px solid #d2d2d7',
              borderRadius: '999px',
              padding: '6px 14px',
              fontSize: '0.84rem',
              fontWeight: 600
            }}
          >
            {productosFiltrados.length}{' '}
            {productosFiltrados.length === 1 ? 'producto' : 'productos'}
          </span>
        </div>

        {/* Grilla de productos reales de MySQL */}
        {loading ? (
          <h4 className="text-center py-5" style={{ color: '#6e6e73' }}>
            Cargando inventario...
          </h4>
        ) : (
          <Row className="g-4">
            {productosFiltrados.length > 0 ? (
              productosFiltrados.map((producto) => (
                <Col md={6} lg={3} key={producto.id}>
                  <ProductCard producto={producto} />
                </Col>
              ))
            ) : (
              <Col className="text-center py-5">
                <h4 style={{ color: '#6e6e73' }}>
                  No hay productos disponibles en esta categoría.
                </h4>
              </Col>
            )}
          </Row>
        )}
      </Container>
    </div>
  );
};

export default CategoriasView;