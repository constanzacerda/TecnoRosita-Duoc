import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCart, saveCart } from '../services/ventasService';
import AlertaStock from './AlertaStock';

const PALETAS_VIVAS = [
  {
    fondo: 'linear-gradient(180deg, #e0f2fe 0%, #ffffff 58%)',
    borde: '#bae6fd',
    chipBg: '#0284c7',
    chipText: '#ffffff'
  },
  {
    fondo: 'linear-gradient(180deg, #ffedd5 0%, #ffffff 58%)',
    borde: '#fed7aa',
    chipBg: '#ea580c',
    chipText: '#ffffff'
  },
  {
    fondo: 'linear-gradient(180deg, #ede9fe 0%, #ffffff 58%)',
    borde: '#ddd6fe',
    chipBg: '#7c3aed',
    chipText: '#ffffff'
  },
  {
    fondo: 'linear-gradient(180deg, #dcfce7 0%, #ffffff 58%)',
    borde: '#bbf7d0',
    chipBg: '#16a34a',
    chipText: '#ffffff'
  },
  {
    fondo: 'linear-gradient(180deg, #fce7f3 0%, #ffffff 58%)',
    borde: '#fbcfe8',
    chipBg: '#db2777',
    chipText: '#ffffff'
  },
  {
    fondo: 'linear-gradient(180deg, #fef3c7 0%, #ffffff 58%)',
    borde: '#fde68a',
    chipBg: '#d97706',
    chipText: '#ffffff'
  }
];

const IMAGENES_HD_POR_CATEGORIA = {
  mouse: [
    'https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=1200&q=90',
    'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=1200&q=90',
    'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=1200&q=90'
  ],
  teclado: [
    'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=1200&q=90',
    'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=1200&q=90',
    'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1200&q=90'
  ],
  audio: [
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=90',
    'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1200&q=90'
  ],
  monitor: [
    'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1200&q=90',
    'https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&w=1200&q=90'
  ],
  general: [
    'https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=1200&q=90',
    'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=90'
  ]
};

const obtenerRespaldoHD = (producto, categoriaTexto) => {
  const texto = `${categoriaTexto || ''} ${producto?.nombre || ''}`.toLowerCase();
  const indice = Math.abs(Number(producto?.id) || 0);

  if (texto.includes('mouse') || texto.includes('ratón')) {
    return IMAGENES_HD_POR_CATEGORIA.mouse[indice % IMAGENES_HD_POR_CATEGORIA.mouse.length];
  }
  if (texto.includes('teclado')) {
    return IMAGENES_HD_POR_CATEGORIA.teclado[indice % IMAGENES_HD_POR_CATEGORIA.teclado.length];
  }
  if (texto.includes('audífono') || texto.includes('audio') || texto.includes('headset')) {
    return IMAGENES_HD_POR_CATEGORIA.audio[indice % IMAGENES_HD_POR_CATEGORIA.audio.length];
  }
  if (texto.includes('monitor')) {
    return IMAGENES_HD_POR_CATEGORIA.monitor[indice % IMAGENES_HD_POR_CATEGORIA.monitor.length];
  }
  return IMAGENES_HD_POR_CATEGORIA.general[indice % IMAGENES_HD_POR_CATEGORIA.general.length];
};

const obtenerDescripcionBreve = (producto, categoriaNombre) => {
  if (producto.descripcion) return producto.descripcion;
  const cat = (categoriaNombre || '').toLowerCase();
  if (cat.includes('teclado')) {
    return 'Respuesta ultrarrápida, tacto preciso e ideal para gaming y escritura diaria.';
  }
  if (cat.includes('mouse') || cat.includes('ratón')) {
    return 'Sensor de alta precisión, diseño ultraligero y control fluido en cada movimiento.';
  }
  if (cat.includes('audio') || cat.includes('audífono')) {
    return 'Sonido envolvente HD con comodidad pensada para largas jornadas.';
  }
  if (cat.includes('monitor')) {
    return 'Imagen nítida, alta fluidez visual y colores vibrantes para tu escritorio.';
  }
  return 'Tecnología seleccionada por TecnoRosita con garantía y despacho disponible.';
};

const ProductCard = ({ producto }) => {
  const categoriaNombre =
    producto.categoria && typeof producto.categoria === 'object'
      ? producto.categoria.nombre || 'Catálogo'
      : producto.categoria || 'Catálogo';

  const paleta = PALETAS_VIVAS[Math.abs(Number(producto.id) || 0) % PALETAS_VIVAS.length];
  const respaldoHD = obtenerRespaldoHD(producto, categoriaNombre);
  const urlInicial = producto.imagenUrl || producto.imagen || respaldoHD;
  const [imgSrc, setImgSrc] = useState(urlInicial);

  useEffect(() => {
    setImgSrc(producto.imagenUrl || producto.imagen || respaldoHD);
  }, [producto.id, producto.imagenUrl, producto.imagen, respaldoHD]);

  const stockActual =
    producto.stockOnline !== undefined ? producto.stockOnline : producto.stock || 0;
  const sinStock = stockActual <= 0;
  const precioFinal = producto.precioTransferencia || producto.precio || 0;
  const descripcionBreve = obtenerDescripcionBreve(producto, categoriaNombre);

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
    <div
      className="h-100 d-flex flex-column overflow-hidden"
      style={{
        background: paleta.fondo,
        border: `1.5px solid ${paleta.borde}`,
        borderRadius: '22px',
        boxShadow: '0 10px 26px rgba(0, 0, 0, 0.06)',
        transition: 'transform 0.25s ease, box-shadow 0.25s ease'
      }}
    >
      {/* Foto HD del producto */}
      <div
        style={{
          height: '205px',
          padding: '12px',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <img
          src={imgSrc}
          alt={producto.nombre}
          loading="lazy"
          onError={(e) => {
            if (e.currentTarget.dataset.fallbackApplied) return;
            e.currentTarget.dataset.fallbackApplied = 'true';
            setImgSrc(respaldoHD);
          }}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: '16px',
            boxShadow: '0 6px 16px rgba(0, 0, 0, 0.08)'
          }}
        />
        <span
          style={{
            position: 'absolute',
            top: '20px',
            left: '20px',
            backgroundColor: paleta.chipBg,
            color: paleta.chipText,
            fontSize: '0.7rem',
            fontWeight: 700,
            padding: '4px 10px',
            borderRadius: '999px',
            letterSpacing: '0.03em'
          }}
        >
          {categoriaNombre}
        </span>
      </div>

      {/* Cuerpo 100% legible con nombre, descripción, precio, stock y botones */}
      <div
        className="d-flex flex-column text-start flex-grow-1"
        style={{ padding: '10px 18px 18px', color: '#1d1d1f' }}
      >
        <h5
          style={{
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            fontSize: '1.03rem',
            fontWeight: 700,
            color: '#1d1d1f',
            lineHeight: 1.3,
            marginBottom: '6px'
          }}
        >
          {producto.nombre}
        </h5>

        <p
          style={{
            fontSize: '0.84rem',
            color: '#424245',
            lineHeight: 1.45,
            marginBottom: '12px'
          }}
        >
          {descripcionBreve}
        </p>

        <div
          style={{
            fontSize: '1.45rem',
            fontWeight: 800,
            color: '#0071e3',
            marginBottom: '8px'
          }}
        >
          ${precioFinal.toLocaleString('es-CL')}
        </div>

        <div className="mb-3">
          <AlertaStock stock={stockActual} />
        </div>

        <div className="mt-auto d-grid gap-2">
          <Link
            to={`/producto/${producto.id}`}
            style={{
              display: 'block',
              textAlign: 'center',
              textDecoration: 'none',
              padding: '9px 16px',
              borderRadius: '999px',
              border: '1.5px solid #0071e3',
              color: '#0071e3',
              backgroundColor: '#ffffff',
              fontWeight: 600,
              fontSize: '0.9rem'
            }}
          >
            Ver Detalle
          </Link>

          <button
            type="button"
            onClick={handleAddToCart}
            disabled={sinStock}
            style={{
              width: '100%',
              padding: '10px 16px',
              borderRadius: '999px',
              border: 'none',
              backgroundColor: sinStock ? '#9ca3af' : '#0071e3',
              color: '#ffffff',
              fontWeight: 600,
              fontSize: '0.9rem',
              cursor: sinStock ? 'not-allowed' : 'pointer'
            }}
          >
            {sinStock ? 'Sin Stock' : 'Añadir al carrito'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;