import React, { useState } from 'react';
import { Container, Row, Col, Modal } from 'react-bootstrap';

const FUENTE_APPLE =
  '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Segoe UI", Roboto, sans-serif';

const IMAGEN_RESPALDO_HD =
  'https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=1200&q=90';

const ARTICULOS_BLOG = [
  {
    id: 1,
    categoria: 'Smartphones',
    titulo: 'Análisis a fondo: iPhone 18 Pro Max',
    fecha: '07 Noviembre, 2026',
    lectura: '5 min de lectura',
    resumen:
      'Revisamos todas las novedades, diseño y potencia del nuevo buque insignia de Apple, desde su pantalla hasta el rendimiento en fotografía nocturna.',
    contenido: [
      'El nuevo iPhone 18 Pro Max da un salto importante en eficiencia energética y brillo sostenido, permitiendo grabar video en alta definición sin sobrecalentamiento incluso en sesiones prolongadas.',
      'Su sistema de cámaras mejora notablemente el detalle en bajas condiciones de luz y suma controles más rápidos para creadores de contenido, manteniendo un diseño sólido y cómodo en la mano.'
    ],
    imagen:
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=90',
    paleta: {
      fondo: 'linear-gradient(180deg, #e0f2fe 0%, #ffffff 55%)',
      borde: '#bae6fd',
      chipBg: '#0284c7'
    }
  },
  {
    id: 2,
    categoria: 'Notebooks',
    titulo: 'Los mejores notebook calidad precio del 2026',
    fecha: '02 Noviembre, 2026',
    lectura: '6 min de lectura',
    resumen:
      'Analizamos a fondo los equipos con mejor rendimiento y costo del mercado actual para estudiar, programar y jugar sin gastar de más.',
    contenido: [
      'Al elegir un notebook en 2026, el equilibrio clave está en contar con al menos 16 GB de memoria RAM, almacenamiento SSD NVMe rápido y una pantalla de buena fidelidad de color.',
      'Comparamos modelos ultraportátiles y opciones gamer de entrada que ofrecen excelente autonomía, refrigeración silenciosa y conectividad USB-C completa para escritorios modernos.'
    ],
    imagen:
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=90',
    paleta: {
      fondo: 'linear-gradient(180deg, #ede9fe 0%, #ffffff 55%)',
      borde: '#ddd6fe',
      chipBg: '#7c3aed'
    }
  },
  {
    id: 3,
    categoria: 'Consolas',
    titulo: 'Batalla de Consolas Gamer: ¿Cuál elegir?',
    fecha: '28 Octubre, 2026',
    lectura: '7 min de lectura',
    resumen:
      'Una comparativa detallada para saber qué consola se adapta mejor a tu estilo de juego, catálogo exclusivo y presupuesto.',
    contenido: [
      'Elegir consola hoy depende tanto del catálogo de exclusivos como de los servicios de suscripción y el tipo de pantalla que usas en casa.',
      'Evaluamos tiempos de carga, rendimiento real en 4K a 60 y 120 FPS, comodidad de los controles y compatibilidad con accesorios gamer para ayudarte a tomar la mejor decisión.'
    ],
    imagen:
      'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&w=1200&q=90',
    paleta: {
      fondo: 'linear-gradient(180deg, #dcfce7 0%, #ffffff 55%)',
      borde: '#bbf7d0',
      chipBg: '#16a34a'
    }
  },
  {
    id: 4,
    categoria: 'Periféricos',
    titulo: 'Switches ópticos vs. mecánicos: guía para tu teclado',
    fecha: '15 Noviembre, 2026',
    lectura: '4 min de lectura',
    resumen:
      'Descubre las diferencias reales en velocidad de respuesta, sonido y durabilidad para acertar con tu próximo teclado 60%, TKL o completo.',
    contenido: [
      'Los switches ópticos activan la pulsación mediante un haz de luz, eliminando el retardo mecánico y ofreciendo una vida útil superior en juegos competitivos de reacción rápida.',
      'Por otro lado, los switches mecánicos tradicionales siguen destacando por su enorme variedad de sensaciones táctiles y opciones de personalización para quienes combinan gaming con largas horas de escritura.'
    ],
    imagen:
      'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=1200&q=90',
    paleta: {
      fondo: 'linear-gradient(180deg, #ffedd5 0%, #ffffff 55%)',
      borde: '#fed7aa',
      chipBg: '#ea580c'
    }
  },
  {
    id: 5,
    categoria: 'Monitores',
    titulo: 'Monitores de alta frecuencia: ¿144Hz o 240Hz?',
    fecha: '11 Noviembre, 2026',
    lectura: '5 min de lectura',
    resumen:
      'Te explicamos cuándo se nota realmente el salto de fluidez y qué panel conviene más según tus juegos, diseño o programación.',
    contenido: [
      'Pasar de 60Hz a 144Hz transforma por completo la suavidad de imagen tanto en videojuegos competitivos como al desplazarse por código y ventanas de trabajo.',
      'Los paneles de 240Hz brillan especialmente en shooters y esports cuando tu tarjeta gráfica sostiene tasas altas de cuadros por segundo con baja latencia.'
    ],
    imagen:
      'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1200&q=90',
    paleta: {
      fondo: 'linear-gradient(180deg, #fce7f3 0%, #ffffff 55%)',
      borde: '#fbcfe8',
      chipBg: '#db2777'
    }
  },
  {
    id: 6,
    categoria: 'Setups Gamer',
    titulo: 'Cómo armar un setup RGB limpio y sin cables a la vista',
    fecha: '05 Noviembre, 2026',
    lectura: '6 min de lectura',
    resumen:
      'Consejos prácticos de iluminación, ergonomía y orden de escritorio para lograr una estación de juego y estudio digna de vitrina.',
    contenido: [
      'Un escritorio ordenado empieza por elegir periféricos inalámbricos de baja latencia, canaletas bajo la cubierta y una iluminación ambiental equilibrada que no fatigue la vista.',
      'Combinar un brazo articulado para el monitor con un mousepad amplio libera espacio real y hace que cada sesión frente al computador sea mucho más cómoda y productiva.'
    ],
    imagen:
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=90',
    paleta: {
      fondo: 'linear-gradient(180deg, #fef3c7 0%, #ffffff 55%)',
      borde: '#fde68a',
      chipBg: '#d97706'
    }
  }
];

const BlogView = () => {
  const [articuloActivo, setArticuloActivo] = useState(null);

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
        {/* Encabezado limpio y con espacio suficiente para no cortarse */}
        <div className="text-center mb-5">
          <span
            style={{
              display: 'inline-block',
              color: '#0071e3',
              fontWeight: 700,
              fontSize: '0.8rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: '8px'
            }}
          >
            Blog TecnoRosita
          </span>
          <h1
            style={{
              fontFamily: FUENTE_APPLE,
              fontWeight: 800,
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              color: '#1d1d1f',
              letterSpacing: '-0.03em',
              marginBottom: '12px'
            }}
          >
            Noticias y Novedades
          </h1>
          <p
            style={{
              color: '#6e6e73',
              maxWidth: '640px',
              margin: '0 auto',
              fontSize: '1.05rem',
              lineHeight: 1.55
            }}
          >
            Guías prácticas, comparativas de hardware y tendencias en tecnología para sacar el máximo provecho a tu setup.
          </p>
        </div>

        {/* Grilla de 6 artículos con fotos reales HD y colores vivos */}
        <Row className="g-4">
          {ARTICULOS_BLOG.map((art) => (
            <Col md={6} lg={4} key={art.id}>
              <article
                className="h-100 d-flex flex-column overflow-hidden"
                style={{
                  background: art.paleta.fondo,
                  border: `1.5px solid ${art.paleta.borde}`,
                  borderRadius: '24px',
                  boxShadow: '0 10px 26px rgba(0, 0, 0, 0.06)',
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease'
                }}
              >
                {/* Imagen real HD */}
                <div style={{ padding: '14px 14px 0', position: 'relative' }}>
                  <div
                    style={{
                      height: '215px',
                      borderRadius: '18px',
                      overflow: 'hidden',
                      backgroundColor: '#f5f5f7'
                    }}
                  >
                    <img
                      src={art.imagen}
                      alt={art.titulo}
                      loading="lazy"
                      onError={(e) => {
                        if (e.currentTarget.dataset.fallbackApplied) return;
                        e.currentTarget.dataset.fallbackApplied = 'true';
                        e.currentTarget.src = IMAGEN_RESPALDO_HD;
                      }}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  </div>
                  <span
                    style={{
                      position: 'absolute',
                      top: '26px',
                      left: '26px',
                      backgroundColor: art.paleta.chipBg,
                      color: '#ffffff',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      padding: '5px 12px',
                      borderRadius: '999px',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.18)'
                    }}
                  >
                    {art.categoria}
                  </span>
                </div>

                {/* Contenido textual */}
                <div
                  className="d-flex flex-column flex-grow-1 text-start"
                  style={{ padding: '18px 20px 22px' }}
                >
                  <div
                    style={{
                      fontSize: '0.8rem',
                      color: '#6e6e73',
                      fontWeight: 500,
                      marginBottom: '8px'
                    }}
                  >
                    {art.fecha} · {art.lectura}
                  </div>

                  <h3
                    style={{
                      fontFamily: FUENTE_APPLE,
                      fontWeight: 700,
                      fontSize: '1.18rem',
                      color: '#1d1d1f',
                      lineHeight: 1.3,
                      marginBottom: '10px'
                    }}
                  >
                    {art.titulo}
                  </h3>

                  <p
                    style={{
                      fontSize: '0.92rem',
                      color: '#424245',
                      lineHeight: 1.55,
                      marginBottom: '20px'
                    }}
                  >
                    {art.resumen}
                  </p>

                  <div className="mt-auto">
                    <button
                      type="button"
                      onClick={() => setArticuloActivo(art)}
                      style={{
                        width: '100%',
                        padding: '10px 18px',
                        borderRadius: '999px',
                        border: '1.5px solid #0071e3',
                        backgroundColor: '#ffffff',
                        color: '#0071e3',
                        fontWeight: 600,
                        fontSize: '0.92rem',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      Leer más
                    </button>
                  </div>
                </div>
              </article>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Modal de lectura completa */}
      <Modal
        show={Boolean(articuloActivo)}
        onHide={() => setArticuloActivo(null)}
        centered
        size="lg"
      >
        {articuloActivo && (
          <div style={{ backgroundColor: '#ffffff', color: '#1d1d1f', borderRadius: '18px', overflow: 'hidden' }}>
            <div style={{ position: 'relative', height: '280px' }}>
              <img
                src={articuloActivo.imagen}
                alt={articuloActivo.titulo}
                onError={(e) => {
                  e.currentTarget.src = IMAGEN_RESPALDO_HD;
                }}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <span
                style={{
                  position: 'absolute',
                  top: '18px',
                  left: '18px',
                  backgroundColor: articuloActivo.paleta.chipBg,
                  color: '#ffffff',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  padding: '6px 14px',
                  borderRadius: '999px'
                }}
              >
                {articuloActivo.categoria}
              </span>
            </div>

            <div className="p-4 text-start">
              <div style={{ fontSize: '0.85rem', color: '#6e6e73', marginBottom: '6px' }}>
                {articuloActivo.fecha} · {articuloActivo.lectura}
              </div>
              <h2
                style={{
                  fontFamily: FUENTE_APPLE,
                  fontWeight: 800,
                  fontSize: '1.65rem',
                  color: '#1d1d1f',
                  marginBottom: '16px'
                }}
              >
                {articuloActivo.titulo}
              </h2>

              {articuloActivo.contenido.map((parrafo, idx) => (
                <p
                  key={idx}
                  style={{
                    color: '#3a3a3c',
                    fontSize: '1rem',
                    lineHeight: 1.68,
                    marginBottom: '14px'
                  }}
                >
                  {parrafo}
                </p>
              ))}

              <div className="text-end mt-4">
                <button
                  type="button"
                  onClick={() => setArticuloActivo(null)}
                  style={{
                    backgroundColor: '#0071e3',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '999px',
                    padding: '10px 24px',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Cerrar artículo
                </button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default BlogView;