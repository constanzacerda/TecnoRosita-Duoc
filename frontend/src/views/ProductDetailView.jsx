import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { obtenerProductoPorId, obtenerProductos } from '../services/productoService';
import { getCart, saveCart } from '../services/ventasService';
import AlertaStock from '../components/AlertaStock';
import { Container, Row, Col, Button } from 'react-bootstrap';

const IMAGEN_HD_RESPALDO =
  'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1400&q=90';

const construirContenidoVisual = (nombreProducto, categoriaNombre) => {
  const cat = (categoriaNombre || '').toLowerCase();
  const prod = nombreProducto || 'este producto';

  if (cat.includes('teclado')) {
    return {
      marca: 'TecnoRosita Select',
      taglineDegradado: 'Precisión Óptica · Respuesta Inmediata',
      subtitulo: `Diseñado para velocidad competitiva y escritura cómoda en ${categoriaNombre || 'tu setup'}.`,
      galeriaExtra: [
        'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=1400&q=90',
        'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=1400&q=90',
        'https://images.unsplash.com/photo-1547394765-185e1e68f34e?auto=format&fit=crop&w=1400&q=90'
      ],
      seccionesVisuales: [
        {
          titulo: 'Diseñado para ir un paso por delante',
          texto: `${prod} combina pulsaciones rápidas, activación precisa y respuesta uniforme para que cada comando se ejecute al instante, tanto en partidas intensas como en jornadas de programación o estudio.`,
          imagen: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=1600&q=90',
          fondo: '#f5f7fc'
        },
        {
          titulo: 'Formato compacto, escritorio despejado',
          texto: 'Su perfil optimizado libera espacio vital para el movimiento del mouse y mantiene una postura natural en tus muñecas durante largas horas frente a la pantalla.',
          imagen: 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=1600&q=90',
          fondo: '#ffffff'
        },
        {
          titulo: 'Construcción sólida pensada para durar',
          texto: 'Teclas de tacto firme, iluminación limpia y estructura resistente preparada para acompañarte todos los días con un acabado moderno en tu estación de trabajo o setup gamer.',
          imagen: 'https://images.unsplash.com/photo-1547394765-185e1e68f34e?auto=format&fit=crop&w=1600&q=90',
          fondo: '#f2f6ff'
        }
      ],
      especificaciones: [
        { campo: 'Categoría', valor: categoriaNombre || 'Teclados' },
        { campo: 'Uso recomendado', valor: 'Gaming competitivo, desarrollo y productividad diaria' },
        { campo: 'Diseño', valor: 'Ergonómico compacto con alta respuesta táctil' },
        { campo: 'Compatibilidad', valor: 'Windows, macOS y Linux vía USB' },
        { campo: 'Disponibilidad', valor: 'Stock sincronizado en tiempo real con inventario' }
      ],
      garantia: 'Garantía legal y respaldo directo de TecnoRosita con emisión de boleta electrónica y control de inventario en línea.'
    };
  }

  if (cat.includes('mouse') || cat.includes('ratón')) {
    return {
      marca: 'TecnoRosita Select',
      taglineDegradado: 'Control Preciso · Ergonomía Total',
      subtitulo: `Seguimiento exacto y deslizamiento fluido para ${categoriaNombre || 'tu escritorio'}.`,
      galeriaExtra: [
        'https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=1400&q=90',
        'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=1400&q=90',
        'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=1400&q=90'
      ],
      seccionesVisuales: [
        {
          titulo: 'Seguimiento exacto en cada movimiento',
          texto: `${prod} responde con precisión milimétrica tanto en giros rápidos como en edición detallada, manteniendo estabilidad constante en cualquier superficie.`,
          imagen: 'https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=1600&q=90',
          fondo: '#f5f7fc'
        },
        {
          titulo: 'Ergonomía creada para largas jornadas',
          texto: 'Su curvatura se adapta de forma natural a la palma para reducir la fatiga y ofrecer un agarre firme sin esfuerzo.',
          imagen: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=1600&q=90',
          fondo: '#ffffff'
        },
        {
          titulo: 'Integración impecable con tu setup',
          texto: 'Conecta y trabaja al instante con acabados modernos que elevan visualmente tu escritorio.',
          imagen: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=1600&q=90',
          fondo: '#f2f6ff'
        }
      ],
      especificaciones: [
        { campo: 'Categoría', valor: categoriaNombre || 'Mouse' },
        { campo: 'Uso recomendado', valor: 'Gaming, diseño gráfico y productividad' },
        { campo: 'Ergonomía', valor: 'Agarre cómodo de baja fatiga' },
        { campo: 'Compatibilidad', valor: 'PC y notebooks Windows / macOS' }
      ],
      garantia: 'Garantía oficial TecnoRosita con respaldo de boleta y atención postventa.'
    };
  }

  if (cat.includes('audio') || cat.includes('audífono') || cat.includes('headset')) {
    return {
      marca: 'TecnoRosita Audio',
      taglineDegradado: 'Sonido Envolvente · Claridad HD',
      subtitulo: `Audio nítido y confort prolongado para partidas, música y reuniones.`,
      galeriaExtra: [
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1400&q=90',
        'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1400&q=90',
        'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=1400&q=90'
      ],
      seccionesVisuales: [
        {
          titulo: 'Escucha cada detalle con total claridad',
          texto: `${prod} proyecta graves profundos y agudos definidos para que disfrutes música, películas, clases y partidas competitivas con gran nitidez.`,
          imagen: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1600&q=90',
          fondo: '#f5f7fc'
        },
        {
          titulo: 'Comodidad ligera durante todo el día',
          texto: 'Almohadillas suaves y diadema adaptable pensadas para sesiones largas sin presión molesta.',
          imagen: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1600&q=90',
          fondo: '#ffffff'
        },
        {
          titulo: 'Diseño limpio para estudio y entretenimiento',
          texto: 'Estética moderna y construcción duradera lista para acompañarte en casa o en movimiento.',
          imagen: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=1600&q=90',
          fondo: '#f2f6ff'
        }
      ],
      especificaciones: [
        { campo: 'Categoría', valor: categoriaNombre || 'Audio' },
        { campo: 'Experiencia sonora', valor: 'Alta definición y aislamiento cómodo' },
        { campo: 'Uso recomendado', valor: 'Gaming, streaming, música y videollamadas' },
        { campo: 'Estado', valor: 'Producto nuevo verificado en catálogo' }
      ],
      garantia: 'Garantía TecnoRosita con respaldo de compra registrada en el sistema.'
    };
  }

  return {
    marca: 'TecnoRosita Store',
    taglineDegradado: 'Alto Rendimiento · Diseño de Nueva Generación',
    subtitulo: `Tecnología seleccionada para potenciar tu experiencia en ${categoriaNombre || 'tu setup'}.`,
    galeriaExtra: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1400&q=90',
      'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=1400&q=90',
      'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1400&q=90'
    ],
    seccionesVisuales: [
      {
        titulo: 'Diseñado para pensar en el futuro',
        texto: `${prod} entrega fluidez, estabilidad y diseño contemporáneo para estudiar, trabajar o disfrutar de tus proyectos tecnológicos sin límites.`,
        imagen: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1600&q=90',
        fondo: '#f5f7fc'
      },
      {
        titulo: 'Vistas más nítidas, experiencia más fluida',
        texto: 'Cada componente está pensado para integrarse con naturalidad en tu escritorio y ofrecer un desempeño consistente desde el primer uso.',
        imagen: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=1600&q=90',
        fondo: '#ffffff'
      },
      {
        titulo: 'Compra respaldada con inventario en tiempo real',
        texto: 'Verifica stock disponible al instante, genera tu boleta en el checkout y disfruta el respaldo directo de TecnoRosita.',
        imagen: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1600&q=90',
        fondo: '#f2f6ff'
      }
    ],
    especificaciones: [
      { campo: 'Categoría', valor: categoriaNombre || 'Catálogo TecnoRosita' },
      { campo: 'Tipo de producto', valor: 'Tecnología y equipamiento seleccionado' },
      { campo: 'Disponibilidad', valor: 'Stock verificado en tiempo real' },
      { campo: 'Respaldo', valor: 'Emisión de boleta y garantía TecnoRosita' }
    ],
    garantia: 'Garantía de respaldo TecnoRosita conforme a condiciones de la tienda y boleta emitida en plataforma.'
  };
};

const ProductDetailView = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [recomendados, setRecomendados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tabActiva, setTabActiva] = useState('sobre');
  const [imagenActiva, setImagenActiva] = useState('');

  useEffect(() => {
    let active = true;
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const cargarDatos = async () => {
      setLoading(true);
      const [dataProducto, todosProductos] = await Promise.all([
        obtenerProductoPorId(id),
        obtenerProductos()
      ]);

      if (!active) return;
      setProducto(dataProducto);

      const urlPrincipal =
        (dataProducto && (dataProducto.imagenUrl || dataProducto.imagen)) ||
        IMAGEN_HD_RESPALDO;
      setImagenActiva(urlPrincipal);

      if (Array.isArray(todosProductos) && dataProducto) {
        const otros = todosProductos
          .filter((item) => String(item.id) !== String(dataProducto.id))
          .slice(0, 4);
        setRecomendados(otros);
      } else {
        setRecomendados([]);
      }
      setLoading(false);
    };

    cargarDatos();
    return () => {
      active = false;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="text-center py-5" style={{ backgroundColor: '#ffffff', color: '#1d1d1f' }}>
        <h2>Cargando producto...</h2>
      </div>
    );
  }

  if (!producto) {
    return (
      <div className="text-center py-5" style={{ backgroundColor: '#ffffff', color: '#1d1d1f' }}>
        <h2>Producto no encontrado</h2>
      </div>
    );
  }

  const categoriaNombre =
    producto.categoria && typeof producto.categoria === 'object'
      ? producto.categoria.nombre || 'Catálogo'
      : producto.categoria || 'Catálogo';
  const stockActual =
    producto.stockOnline !== undefined ? producto.stockOnline : producto.stock || 0;
  const sinStock = stockActual <= 0;
  const precioFinal = producto.precioTransferencia || producto.precio || 0;
  const imagenPrincipalBD = producto.imagenUrl || producto.imagen || IMAGEN_HD_RESPALDO;
  const contenido = construirContenidoVisual(producto.nombre, categoriaNombre);

  const miniaturas = [imagenPrincipalBD, ...contenido.galeriaExtra].filter(
    (url, index, arr) => url && arr.indexOf(url) === index
  );

  const handleAddToCart = () => {
    if (sinStock) return;
    const cart = getCart();
    const existing = cart.find((item) => item.id === producto.id);

    if (existing) {
      if (existing.qty >= stockActual) {
        alert(`Solo hay ${stockActual} unidades disponibles de este producto.`);
        return;
      }
      existing.qty += 1;
    } else {
      cart.push({ ...producto, qty: 1 });
    }

    saveCart(cart);
    alert('Producto añadido al carrito con éxito');
  };

  return (
    <div style={{ backgroundColor: '#ffffff', color: '#1d1d1f' }}>
      <Container className="py-4 pb-5 text-start" style={{ maxWidth: '1160px' }}>
        {/* Breadcrumb */}
        <div className="mb-4 small" style={{ color: '#6e6e73' }}>
          <Link to="/" className="text-decoration-none" style={{ color: '#0071e3' }}>
            Inicio
          </Link>
          <span className="mx-2">/</span>
          <Link to="/categorias" className="text-decoration-none" style={{ color: '#0071e3' }}>
            Catálogo
          </Link>
          <span className="mx-2">/</span>
          <span>{categoriaNombre}</span>
          <span className="mx-2">/</span>
          <span className="fw-semibold" style={{ color: '#1d1d1f' }}>
            {producto.nombre}
          </span>
        </div>

        {/* Bloque superior: Galería HD con miniaturas + Panel de compra */}
        <Row className="g-4 align-items-start mb-5">
          <Col lg={6}>
            <div
              className="p-4 d-flex align-items-center justify-content-center"
              style={{
                backgroundColor: '#f5f5f7',
                borderRadius: '22px',
                border: '1px solid #e5e5ea',
                minHeight: '420px'
              }}
            >
              <img
                src={imagenActiva || imagenPrincipalBD}
                alt={producto.nombre}
                onError={(e) => {
                  e.currentTarget.src = IMAGEN_HD_RESPALDO;
                }}
                style={{
                  maxHeight: '390px',
                  width: '100%',
                  objectFit: 'contain',
                  borderRadius: '14px'
                }}
              />
            </div>

            {/* Fila de miniaturas interactivas HD */}
            <div className="d-flex gap-2 mt-3 flex-wrap">
              {miniaturas.map((thumbUrl, idx) => {
                const seleccionada = (imagenActiva || imagenPrincipalBD) === thumbUrl;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setImagenActiva(thumbUrl)}
                    style={{
                      width: '78px',
                      height: '64px',
                      padding: '4px',
                      borderRadius: '12px',
                      backgroundColor: '#f5f5f7',
                      border: seleccionada ? '2px solid #0071e3' : '1px solid #d2d2d7',
                      cursor: 'pointer',
                      overflow: 'hidden'
                    }}
                  >
                    <img
                      src={thumbUrl}
                      alt={`${producto.nombre} vista ${idx + 1}`}
                      onError={(e) => {
                        e.currentTarget.src = imagenPrincipalBD;
                      }}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: '8px'
                      }}
                    />
                  </button>
                );
              })}
            </div>
          </Col>

          <Col lg={6}>
            <div className="d-flex align-items-center gap-2 mb-2 flex-wrap">
              <span
                className="px-3 py-1 small fw-semibold"
                style={{
                  backgroundColor: '#f5f5f7',
                  color: '#1d1d1f',
                  borderRadius: '980px',
                  border: '1px solid #d2d2d7'
                }}
              >
                {contenido.marca}
              </span>
              <span className="small" style={{ color: '#6e6e73' }}>
                ID #{producto.id} · SKU TR-{producto.id}
              </span>
            </div>

            <h1
              className="fw-bold mb-2"
              style={{ color: '#1d1d1f', fontSize: '2rem', lineHeight: 1.15 }}
            >
              {producto.nombre}
            </h1>
            <p className="mb-3" style={{ color: '#6e6e73' }}>
              {contenido.subtitulo}
            </p>

            {/* Caja de precio y stock */}
            <div
              className="p-3 mb-4"
              style={{
                backgroundColor: '#f5f5f7',
                borderRadius: '18px',
                border: '1px solid #e5e5ea'
              }}
            >
              <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
                <div>
                  <div className="small" style={{ color: '#6e6e73' }}>
                    Transferencia / Débito
                  </div>
                  <div className="fw-bold" style={{ fontSize: '2.1rem', color: '#1d1d1f' }}>
                    ${precioFinal.toLocaleString('es-CL')}
                  </div>
                </div>
                <AlertaStock stock={stockActual} />
              </div>
            </div>

            {/* Botones píldora principales */}
            <div className="d-flex flex-wrap gap-3 mb-4">
              <Button
                className="btn-apple-primary flex-fill py-2 fs-6"
                onClick={handleAddToCart}
                disabled={sinStock}
              >
                {sinStock ? 'Sin Stock Disponible' : 'Agregar al carrito'}
              </Button>
              <Link
                to="/carrito"
                className="btn btn-apple-outline flex-fill py-2 fs-6 text-center text-decoration-none"
              >
                Ir al carrito
              </Link>
            </div>

            {/* Métodos de entrega (fondo blanco limpio) */}
            <div
              className="p-3"
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '18px',
                border: '1px solid #d2d2d7'
              }}
            >
              <div className="fw-bold mb-2" style={{ color: '#1d1d1f' }}>
                Métodos de entrega
              </div>

              <div
                className="d-flex justify-content-between align-items-center py-2"
                style={{ borderBottom: '1px solid #e5e5ea' }}
              >
                <div>
                  <div className="fw-semibold small" style={{ color: '#1d1d1f' }}>
                    Despacho a domicilio
                  </div>
                  <div style={{ fontSize: '0.82rem', color: '#6e6e73' }}>
                    Confirmación inmediata al generar boleta online
                  </div>
                </div>
                <span
                  className="px-2 py-1 small fw-semibold"
                  style={{
                    backgroundColor: '#e8f7ee',
                    color: '#146c43',
                    borderRadius: '8px'
                  }}
                >
                  Disponible
                </span>
              </div>

              <div className="d-flex justify-content-between align-items-center pt-2">
                <div>
                  <div className="fw-semibold small" style={{ color: '#1d1d1f' }}>
                    Retiro en tienda TecnoRosita
                  </div>
                  <div style={{ fontSize: '0.82rem', color: '#6e6e73' }}>
                    {sinStock ? 'Sin unidades en bodega' : `${stockActual} unidades disponibles hoy`}
                  </div>
                </div>
                <span
                  className="px-2 py-1 small fw-semibold"
                  style={{
                    backgroundColor: sinStock ? '#ececef' : '#e7f1ff',
                    color: sinStock ? '#495057' : '#0071e3',
                    borderRadius: '8px'
                  }}
                >
                  {sinStock ? 'Agotado' : 'Disponible'}
                </span>
              </div>
            </div>
          </Col>
        </Row>

        {/* Pestañas estilo ficha profesional */}
        <div
          className="d-flex gap-4 mb-4 flex-wrap"
          style={{ borderBottom: '1px solid #d2d2d7' }}
        >
          {[
            { id: 'sobre', label: 'Sobre este producto' },
            { id: 'especificaciones', label: 'Especificaciones' },
            { id: 'garantia', label: 'Garantía y envío' }
          ].map((tab) => {
            const activa = tabActiva === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setTabActiva(tab.id)}
                className="pb-2 px-1 bg-transparent border-0 fw-semibold"
                style={{
                  color: activa ? '#0071e3' : '#6e6e73',
                  borderBottom: activa ? '3px solid #0071e3' : '3px solid transparent',
                  cursor: 'pointer',
                  marginBottom: '-1px'
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* TAB 1: SOBRE ESTE PRODUCTO (Banner negro degradado + Secciones HD) */}
        {tabActiva === 'sobre' && (
          <div className="mb-5">
            {/* Banner Negro estilo MacBook Pro (letras degradado amarillo-blanco-celeste y botones píldora) */}
            <div
              className="tr-black-banner text-center px-4 py-5 mb-4"
              style={{
                backgroundColor: '#000000',
                borderRadius: '26px',
                overflow: 'hidden'
              }}
            >
              <h2
                className="fw-bold mb-2 tr-keep-white"
                style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', color: '#ffffff' }}
              >
                {producto.nombre}
              </h2>

              <div
                className="tr-proled-gradient fw-semibold mb-4"
                style={{ fontSize: 'clamp(1.15rem, 2.2vw, 1.65rem)' }}
              >
                {contenido.taglineDegradado}
              </div>

              <div className="d-flex justify-content-center gap-3 flex-wrap mb-4">
                <Button
                  className="btn-apple-primary px-4 py-2"
                  onClick={() => setTabActiva('especificaciones')}
                >
                  Más información
                </Button>
                <Button
                  className="btn-apple-outline-dark px-4 py-2"
                  onClick={handleAddToCart}
                  disabled={sinStock}
                >
                  {sinStock ? 'Agotado' : 'Comprar'}
                </Button>
              </div>

              <div className="mx-auto" style={{ maxWidth: '820px' }}>
                <img
                  src={imagenPrincipalBD}
                  alt={producto.nombre}
                  onError={(e) => {
                    e.currentTarget.src = IMAGEN_HD_RESPALDO;
                  }}
                  style={{
                    width: '100%',
                    maxHeight: '380px',
                    objectFit: 'contain',
                    borderRadius: '16px'
                  }}
                />
              </div>
            </div>

            {/* Bloques visuales editoriales en HD (estilo ficha Lenovo / PC Factory) */}
            <div className="d-flex flex-column gap-4">
              {contenido.seccionesVisuales.map((bloque, idx) => (
                <div
                  key={idx}
                  className="text-center p-4 p-md-5"
                  style={{
                    backgroundColor: bloque.fondo,
                    borderRadius: '24px',
                    border: '1px solid #e5e5ea'
                  }}
                >
                  <h3
                    className="fw-bold mb-3"
                    style={{ color: '#1d1d1f', fontSize: 'clamp(1.4rem, 2.5vw, 2rem)' }}
                  >
                    {bloque.titulo}
                  </h3>
                  <p
                    className="mx-auto mb-4"
                    style={{
                      maxWidth: '720px',
                      color: '#424245',
                      fontSize: '1rem',
                      lineHeight: 1.65
                    }}
                  >
                    {bloque.texto}
                  </p>
                  <div className="mx-auto" style={{ maxWidth: '880px' }}>
                    <img
                      src={bloque.imagen}
                      alt={bloque.titulo}
                      onError={(e) => {
                        e.currentTarget.src = imagenPrincipalBD;
                      }}
                      style={{
                        width: '100%',
                        maxHeight: '460px',
                        objectFit: 'cover',
                        borderRadius: '18px',
                        boxShadow: '0 14px 32px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: ESPECIFICACIONES */}
        {tabActiva === 'especificaciones' && (
          <div className="mb-5">
            <h3 className="fw-bold mb-3" style={{ color: '#1d1d1f' }}>
              Especificaciones técnicas
            </h3>
            <div
              style={{
                border: '1px solid #d2d2d7',
                borderRadius: '18px',
                overflow: 'hidden',
                backgroundColor: '#ffffff'
              }}
            >
              {contenido.especificaciones.map((esp, idx) => (
                <Row
                  key={idx}
                  className="m-0 py-3 px-4"
                  style={{
                    backgroundColor: idx % 2 === 0 ? '#ffffff' : '#f5f5f7',
                    borderBottom:
                      idx !== contenido.especificaciones.length - 1
                        ? '1px solid #e5e5ea'
                        : 'none'
                  }}
                >
                  <Col sm={4} className="fw-semibold" style={{ color: '#6e6e73' }}>
                    {esp.campo}
                  </Col>
                  <Col sm={8} style={{ color: '#1d1d1f' }}>
                    {esp.valor}
                  </Col>
                </Row>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: GARANTÍA Y ENVÍO */}
        {tabActiva === 'garantia' && (
          <div
            className="p-4 p-md-5 mb-5"
            style={{
              backgroundColor: '#f5f5f7',
              borderRadius: '22px',
              border: '1px solid #d2d2d7'
            }}
          >
            <h3 className="fw-bold mb-3" style={{ color: '#1d1d1f' }}>
              Garantía, despacho y boleta
            </h3>
            <Row className="g-4">
              <Col md={6}>
                <h5 className="fw-bold mb-2" style={{ color: '#1d1d1f' }}>
                  Envío y retiro
                </h5>
                <p style={{ color: '#424245', lineHeight: 1.65 }}>
                  Una vez confirmada tu orden en el checkout, el sistema registra automáticamente
                  la boleta en base de datos y actualiza el stock disponible para preparar tu
                  despacho o retiro en tienda.
                </p>
              </Col>
              <Col md={6}>
                <h5 className="fw-bold mb-2" style={{ color: '#1d1d1f' }}>
                  Respaldo TecnoRosita
                </h5>
                <p style={{ color: '#424245', lineHeight: 1.65 }}>
                  {contenido.garantia}
                </p>
              </Col>
            </Row>
          </div>
        )}

        {/* Recomendados reales del catálogo */}
        {recomendados.length > 0 && (
          <div className="apple-section-divider">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h3 className="fw-bold m-0" style={{ color: '#1d1d1f' }}>
                Otras recomendaciones para ti
              </h3>
              <Link
                to="/categorias"
                className="text-decoration-none small fw-semibold"
                style={{ color: '#0071e3' }}
              >
                Ver todo el catálogo →
              </Link>
            </div>

            <Row className="g-3">
              {recomendados.map((rec) => {
                const recImg = rec.imagenUrl || rec.imagen || IMAGEN_HD_RESPALDO;
                const recPrecio = rec.precioTransferencia || rec.precio || 0;
                return (
                  <Col key={rec.id} xs={6} md={3}>
                    <div
                      className="h-100 d-flex flex-column justify-content-between overflow-hidden"
                      style={{
                        backgroundColor: '#ffffff',
                        borderRadius: '18px',
                        border: '1px solid #e5e5ea'
                      }}
                    >
                      <div>
                        <div
                          className="p-3 d-flex align-items-center justify-content-center"
                          style={{ backgroundColor: '#f5f5f7', height: '165px' }}
                        >
                          <img
                            src={recImg}
                            alt={rec.nombre}
                            onError={(e) => {
                              e.currentTarget.src = IMAGEN_HD_RESPALDO;
                            }}
                            style={{
                              maxHeight: '135px',
                              maxWidth: '100%',
                              objectFit: 'contain'
                            }}
                          />
                        </div>
                        <div className="p-3 pb-1">
                          <div
                            className="fw-semibold small mb-1"
                            style={{ lineHeight: 1.35, color: '#1d1d1f' }}
                          >
                            {rec.nombre}
                          </div>
                          <div className="fw-bold" style={{ color: '#1d1d1f' }}>
                            ${recPrecio.toLocaleString('es-CL')}
                          </div>
                        </div>
                      </div>
                      <div className="p-3 pt-2">
                        <Link
                          to={`/producto/${rec.id}`}
                          className="btn btn-apple-outline btn-sm w-100"
                        >
                          Ver detalle
                        </Link>
                      </div>
                    </div>
                  </Col>
                );
              })}
            </Row>
          </div>
        )}
      </Container>
    </div>
  );
};

export default ProductDetailView;