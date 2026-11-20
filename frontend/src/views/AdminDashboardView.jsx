import React, { useState, useEffect, useMemo } from 'react';
import { Container, Table, Row, Col, Modal, Form, Alert } from 'react-bootstrap';
import {
  obtenerProductos,
  obtenerCategorias,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
  obtenerBoletas
} from '../services/productoService';
import { obtenerUsuariosApi } from '../services/ventasService';

const FUENTE_APPLE =
  '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Segoe UI", Roboto, sans-serif';

const IMAGEN_RESPALDO_HD =
  'https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=800&q=90';

const ESTILO_CAMPO = {
  padding: '11px 14px',
  borderRadius: '12px',
  backgroundColor: '#f5f5f7',
  color: '#1d1d1f',
  border: '1.5px solid #d2d2d7'
};

const ESTILO_FILTRO = {
  height: '40px',
  padding: '8px 12px',
  borderRadius: '12px',
  backgroundColor: '#ffffff',
  color: '#1d1d1f',
  border: '1.5px solid #cbd5e1',
  fontSize: '0.88rem'
};

const ESTILO_LABEL_FILTRO = {
  fontSize: '0.76rem',
  fontWeight: 700,
  color: '#1d1d1f',
  marginBottom: '6px',
  whiteSpace: 'nowrap'
};

const obtenerNombreCategoria = (producto) => {
  if (!producto || !producto.categoria) return 'Sin categoría';
  return typeof producto.categoria === 'object'
    ? producto.categoria.nombre || 'Sin categoría'
    : producto.categoria;
};

const obtenerPrecioSeguro = (producto) =>
  producto.precio !== undefined
    ? Number(producto.precio)
    : Number(producto.precioTransferencia || 0);

const obtenerStockSeguro = (producto) =>
  producto.stock !== undefined ? Number(producto.stock) : Number(producto.stockOnline || 0);

export default function AdminDashboardView() {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [boletas, setBoletas] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mensaje, setMensaje] = useState({ tipo: '', texto: '' });

  // Estados del sistema de filtros ordenado
  const [filtroId, setFiltroId] = useState('');
  const [filtroNombre, setFiltroNombre] = useState('');
  const [filtroCategoria, setFiltroCategoria] = useState('TODAS');
  const [filtroStock, setFiltroStock] = useState('TODOS');
  const [precioMin, setPrecioMin] = useState('');
  const [precioMax, setPrecioMax] = useState('');

  const [showModal, setShowModal] = useState(false);
  const [editandoId, setEditandoId] = useState(null);
  const [guardando, setGuardando] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    precio: '',
    stock: 15,
    imagenUrl: '',
    categoriaId: ''
  });

  const cargarDatos = async () => {
    setLoading(true);
    const [listaProductos, listaCategorias, listaBoletas, listaUsuarios] =
      await Promise.all([
        obtenerProductos(),
        obtenerCategorias(),
        obtenerBoletas(),
        obtenerUsuariosApi()
      ]);
    setProductos(listaProductos || []);
    setCategorias(listaCategorias || []);
    setBoletas(listaBoletas || []);
    setUsuarios(listaUsuarios || []);
    setLoading(false);
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const limpiarFiltros = () => {
    setFiltroId('');
    setFiltroNombre('');
    setFiltroCategoria('TODAS');
    setFiltroStock('TODOS');
    setPrecioMin('');
    setPrecioMax('');
  };

  const hayFiltrosActivos =
    filtroId.trim() !== '' ||
    filtroNombre.trim() !== '' ||
    filtroCategoria !== 'TODAS' ||
    filtroStock !== 'TODOS' ||
    precioMin !== '' ||
    precioMax !== '';

  const productosFiltrados = useMemo(() => {
    const idBuscado = filtroId.replace('#', '').trim().toLowerCase();
    const nombreBuscado = filtroNombre.trim().toLowerCase();
    const minVal = precioMin !== '' ? Number(precioMin) : null;
    const maxVal = precioMax !== '' ? Number(precioMax) : null;

    return productos.filter((prod) => {
      const idStr = String(prod.id ?? '').toLowerCase();
      if (idBuscado && !idStr.includes(idBuscado)) return false;

      const nombreStr = String(prod.nombre ?? '').toLowerCase();
      if (nombreBuscado && !nombreStr.includes(nombreBuscado)) return false;

      if (filtroCategoria !== 'TODAS') {
        const catNombre = obtenerNombreCategoria(prod).toLowerCase();
        if (catNombre !== filtroCategoria.toLowerCase()) return false;
      }

      const stockVal = obtenerStockSeguro(prod);
      if (filtroStock === 'CON_STOCK' && stockVal <= 0) return false;
      if (filtroStock === 'STOCK_BAJO' && (stockVal <= 0 || stockVal > 5)) return false;
      if (filtroStock === 'SIN_STOCK' && stockVal > 0) return false;

      const precioVal = obtenerPrecioSeguro(prod);
      if (minVal !== null && !Number.isNaN(minVal) && precioVal < minVal) return false;
      if (maxVal !== null && !Number.isNaN(maxVal) && precioVal > maxVal) return false;

      return true;
    });
  }, [productos, filtroId, filtroNombre, filtroCategoria, filtroStock, precioMin, precioMax]);

  const abrirModalCrear = () => {
    setEditandoId(null);
    setFormData({
      nombre: '',
      precio: '',
      stock: 15,
      imagenUrl: '',
      categoriaId: categorias.length > 0 ? String(categorias[0].id) : ''
    });
    setMensaje({ tipo: '', texto: '' });
    setShowModal(true);
  };

  const abrirModalEditar = (item) => {
    setEditandoId(item.id);
    const catId =
      item.categoria && typeof item.categoria === 'object'
        ? String(item.categoria.id)
        : categorias.length > 0
        ? String(categorias[0].id)
        : '';

    setFormData({
      nombre: item.nombre || '',
      precio: item.precio ?? item.precioTransferencia ?? '',
      stock: item.stock !== undefined ? item.stock : item.stockOnline ?? 0,
      imagenUrl: item.imagenUrl || item.imagen || '',
      categoriaId: catId
    });
    setMensaje({ tipo: '', texto: '' });
    setShowModal(true);
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGuardar = async (e) => {
    e.preventDefault();
    setGuardando(true);
    setMensaje({ tipo: '', texto: '' });

    const payload = {
      nombre: formData.nombre.trim(),
      precio: Number(formData.precio),
      stock: Number(formData.stock),
      imagenUrl: formData.imagenUrl.trim(),
      categoria: { id: Number(formData.categoriaId) }
    };

    try {
      if (editandoId) {
        await actualizarProducto(editandoId, payload);
        setMensaje({
          tipo: 'success',
          texto: `Producto #${editandoId} actualizado correctamente en MySQL.`
        });
      } else {
        await crearProducto(payload);
        setMensaje({
          tipo: 'success',
          texto: 'Nuevo producto creado correctamente en MySQL.'
        });
      }
      setShowModal(false);
      await cargarDatos();
    } catch (error) {
      console.error('Error al guardar producto:', error);
      setMensaje({
        tipo: 'danger',
        texto:
          'Error al guardar el producto. Verifica los datos y tus permisos.'
      });
    } finally {
      setGuardando(false);
    }
  };

  const handleDelete = async (id) => {
    if (
      window.confirm(
        '¿Estás seguro de que deseas eliminar este producto permanentemente de la base de datos?'
      )
    ) {
      const exito = await eliminarProducto(id);
      if (exito) {
        setProductos(productos.filter((p) => p.id !== id));
        setMensaje({
          tipo: 'success',
          texto: `Producto #${id} eliminado de la base de datos.`
        });
      } else {
        setMensaje({
          tipo: 'danger',
          texto:
            'Error al eliminar el producto. Puede estar asociado a una boleta o faltan permisos.'
        });
      }
    }
  };

  const categoriasActivas =
    categorias.length > 0
      ? categorias.length
      : new Set(
          productos
            .map(obtenerNombreCategoria)
            .filter((c) => c !== 'Sin categoría')
        ).size;

  const stockTotal = productos.reduce((acc, p) => {
    const st = p.stock !== undefined ? p.stock : p.stockOnline || 0;
    return acc + st;
  }, 0);

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
      <Container style={{ maxWidth: '1220px' }} className="text-start">
        {/* Banner superior ordenado con degradado amarillo -> blanco -> celeste */}
        <div
          className="p-4 p-md-5 mb-4"
          style={{
            backgroundColor: '#090c14',
            borderRadius: '26px',
            border: '1.5px solid #1e293b',
            boxShadow: '0 16px 36px rgba(0, 0, 0, 0.12)'
          }}
        >
          <Row className="align-items-center g-3">
            <Col lg={7}>
              <span
                style={{
                  display: 'inline-block',
                  backgroundColor: 'rgba(41, 151, 255, 0.18)',
                  color: '#7cc4ff',
                  border: '1px solid rgba(124, 196, 255, 0.35)',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  padding: '5px 12px',
                  borderRadius: '999px',
                  marginBottom: '10px'
                }}
              >
                Centro de Control · Administrador
              </span>

              <h2
                style={{
                  fontFamily: FUENTE_APPLE,
                  fontWeight: 800,
                  fontSize: 'clamp(1.75rem, 3.2vw, 2.4rem)',
                  margin: '0 0 6px',
                  background:
                    'linear-gradient(90deg, #f2c94c 0%, #ffffff 48%, #73c0ff 100%)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent'
                }}
              >
                Dashboard de Administración
              </h2>

              <p style={{ color: '#cbd5e1', fontSize: '0.96rem', margin: 0 }}>
                Control total de inventario, usuarios y órdenes — TecnoRosita.
              </p>
            </Col>

            <Col
              lg={5}
              className="d-flex flex-wrap justify-content-lg-end align-items-center gap-2"
            >
              <span
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: '#ffffff',
                  border: '1px solid rgba(255, 255, 255, 0.18)',
                  borderRadius: '999px',
                  padding: '9px 16px',
                  fontSize: '0.88rem',
                  fontWeight: 700
                }}
              >
                Total Productos: {productos.length}
              </span>

              <button
                type="button"
                onClick={abrirModalCrear}
                style={{
                  padding: '10px 20px',
                  borderRadius: '999px',
                  border: 'none',
                  backgroundColor: '#0071e3',
                  color: '#ffffff',
                  fontWeight: 600,
                  fontSize: '0.92rem',
                  cursor: 'pointer',
                  boxShadow: '0 8px 20px rgba(0, 113, 227, 0.35)'
                }}
              >
                + Nuevo Producto
              </button>
            </Col>
          </Row>
        </div>

        {mensaje.texto && (
          <Alert
            variant={mensaje.tipo}
            dismissible
            onClose={() => setMensaje({ tipo: '', texto: '' })}
            style={{ borderRadius: '16px' }}
          >
            {mensaje.texto}
          </Alert>
        )}

        {/* 4 Tarjetas coloridas de métricas */}
        <Row className="mb-4 g-3">
          <Col sm={6} lg={3}>
            <div
              className="p-4 h-100"
              style={{
                background: 'linear-gradient(180deg, #fffbeb 0%, #ffffff 100%)',
                borderRadius: '22px',
                border: '1.5px solid #fde68a',
                boxShadow: '0 8px 22px rgba(0, 0, 0, 0.04)'
              }}
            >
              <div
                style={{
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  color: '#b45309',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em'
                }}
              >
                Categorías Activas
              </div>
              <div
                style={{
                  fontSize: '1.85rem',
                  fontWeight: 800,
                  color: '#1d1d1f',
                  marginTop: '6px'
                }}
              >
                {categoriasActivas} Categorías
              </div>
            </div>
          </Col>

          <Col sm={6} lg={3}>
            <div
              className="p-4 h-100"
              style={{
                background: 'linear-gradient(180deg, #f0fdf4 0%, #ffffff 100%)',
                borderRadius: '22px',
                border: '1.5px solid #bbf7d0',
                boxShadow: '0 8px 22px rgba(0, 0, 0, 0.04)'
              }}
            >
              <div
                style={{
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  color: '#15803d',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em'
                }}
              >
                Stock Online Total
              </div>
              <div
                style={{
                  fontSize: '1.85rem',
                  fontWeight: 800,
                  color: '#1d1d1f',
                  marginTop: '6px'
                }}
              >
                {stockTotal} Unidades
              </div>
            </div>
          </Col>

          <Col sm={6} lg={3}>
            <div
              className="p-4 h-100"
              style={{
                background: 'linear-gradient(180deg, #f0f9ff 0%, #ffffff 100%)',
                borderRadius: '22px',
                border: '1.5px solid #bae6fd',
                boxShadow: '0 8px 22px rgba(0, 0, 0, 0.04)'
              }}
            >
              <div
                style={{
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  color: '#0369a1',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em'
                }}
              >
                Órdenes / Boletas
              </div>
              <div
                style={{
                  fontSize: '1.85rem',
                  fontWeight: 800,
                  color: '#1d1d1f',
                  marginTop: '6px'
                }}
              >
                {boletas.length} Órdenes
              </div>
            </div>
          </Col>

          <Col sm={6} lg={3}>
            <div
              className="p-4 h-100"
              style={{
                background: 'linear-gradient(180deg, #f5f3ff 0%, #ffffff 100%)',
                borderRadius: '22px',
                border: '1.5px solid #ddd6fe',
                boxShadow: '0 8px 22px rgba(0, 0, 0, 0.04)'
              }}
            >
              <div
                style={{
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  color: '#6d28d9',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em'
                }}
              >
                Usuarios Registrados
              </div>
              <div
                style={{
                  fontSize: '1.85rem',
                  fontWeight: 800,
                  color: '#1d1d1f',
                  marginTop: '6px'
                }}
              >
                {usuarios.length} Cuentas
              </div>
            </div>
          </Col>
        </Row>

        {/* Tabla de Productos con barra de filtros ordenada */}
        <div
          className="mb-5 overflow-hidden"
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '24px',
            border: '1.5px solid #e5e5ea',
            boxShadow: '0 12px 30px rgba(0, 0, 0, 0.05)'
          }}
        >
          <div
            className="px-4 py-3 d-flex flex-wrap justify-content-between align-items-center gap-2"
            style={{
              background: 'linear-gradient(90deg, #f8fafc 0%, #f1f5f9 100%)',
              borderBottom: '1px solid #e2e8f0'
            }}
          >
            <span style={{ fontWeight: 800, color: '#1d1d1f', fontSize: '1rem' }}>
              Catálogo de Productos en MySQL
            </span>
            <span
              style={{
                backgroundColor: '#e0f2fe',
                color: '#0369a1',
                fontWeight: 700,
                fontSize: '0.78rem',
                padding: '4px 12px',
                borderRadius: '999px'
              }}
            >
              {hayFiltrosActivos
                ? `${productosFiltrados.length} de ${productos.length} visibles`
                : `${productos.length} productos`}
            </span>
          </div>

          {/* Barra de filtros en 2 filas simétricas */}
          <div
            className="p-3 p-md-4"
            style={{
              background: 'linear-gradient(180deg, #f8fbff 0%, #ffffff 100%)',
              borderBottom: '1px solid #e5e5ea'
            }}
          >
            <Row className="g-3">
              <Col xs={12} sm={6} lg={2}>
                <Form.Label htmlFor="dash-filtro-id" style={ESTILO_LABEL_FILTRO}>
                  ID Producto
                </Form.Label>
                <Form.Control
                  id="dash-filtro-id"
                  type="text"
                  placeholder="Ej. 1 o #6"
                  value={filtroId}
                  onChange={(e) => setFiltroId(e.target.value)}
                  style={ESTILO_FILTRO}
                />
              </Col>

              <Col xs={12} sm={6} lg={4}>
                <Form.Label htmlFor="dash-filtro-nombre" style={ESTILO_LABEL_FILTRO}>
                  Nombre del Producto
                </Form.Label>
                <Form.Control
                  id="dash-filtro-nombre"
                  type="text"
                  placeholder="Buscar por nombre..."
                  value={filtroNombre}
                  onChange={(e) => setFiltroNombre(e.target.value)}
                  style={ESTILO_FILTRO}
                />
              </Col>

              <Col xs={12} sm={6} lg={3}>
                <Form.Label htmlFor="dash-filtro-categoria" style={ESTILO_LABEL_FILTRO}>
                  Categoría
                </Form.Label>
                <Form.Select
                  id="dash-filtro-categoria"
                  value={filtroCategoria}
                  onChange={(e) => setFiltroCategoria(e.target.value)}
                  style={ESTILO_FILTRO}
                >
                  <option value="TODAS">Todas las categorías</option>
                  {categorias.map((cat) => (
                    <option key={cat.id || cat.nombre} value={cat.nombre}>
                      {cat.nombre}
                    </option>
                  ))}
                </Form.Select>
              </Col>

              <Col xs={12} sm={6} lg={3}>
                <Form.Label htmlFor="dash-filtro-stock" style={ESTILO_LABEL_FILTRO}>
                  Estado de Stock
                </Form.Label>
                <Form.Select
                  id="dash-filtro-stock"
                  value={filtroStock}
                  onChange={(e) => setFiltroStock(e.target.value)}
                  style={ESTILO_FILTRO}
                >
                  <option value="TODOS">Todos los estados</option>
                  <option value="CON_STOCK">Con stock (&gt; 0)</option>
                  <option value="STOCK_BAJO">Stock bajo (≤ 5)</option>
                  <option value="SIN_STOCK">Sin stock (0)</option>
                </Form.Select>
              </Col>

              <Col xs={6} sm={4} lg={3}>
                <Form.Label htmlFor="dash-precio-min" style={ESTILO_LABEL_FILTRO}>
                  Precio Mínimo (CLP)
                </Form.Label>
                <Form.Control
                  id="dash-precio-min"
                  type="number"
                  min="0"
                  placeholder="Ej. 50000"
                  value={precioMin}
                  onChange={(e) => setPrecioMin(e.target.value)}
                  style={ESTILO_FILTRO}
                />
              </Col>

              <Col xs={6} sm={4} lg={3}>
                <Form.Label htmlFor="dash-precio-max" style={ESTILO_LABEL_FILTRO}>
                  Precio Máximo (CLP)
                </Form.Label>
                <Form.Control
                  id="dash-precio-max"
                  type="number"
                  min="0"
                  placeholder="Ej. 250000"
                  value={precioMax}
                  onChange={(e) => setPrecioMax(e.target.value)}
                  style={ESTILO_FILTRO}
                />
              </Col>

              <Col
                xs={12}
                sm={4}
                lg={6}
                className="d-flex align-items-end justify-content-sm-end gap-2"
              >
                {hayFiltrosActivos && (
                  <button
                    type="button"
                    onClick={limpiarFiltros}
                    style={{
                      height: '40px',
                      padding: '0 18px',
                      borderRadius: '999px',
                      border: '1.5px solid #0071e3',
                      backgroundColor: '#ffffff',
                      color: '#0071e3',
                      fontWeight: 600,
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    Limpiar filtros
                  </button>
                )}
              </Col>
            </Row>
          </div>

          <Table responsive hover className="align-middle mb-0" style={{ color: '#1d1d1f' }}>
            <thead
              style={{
                backgroundColor: '#f5f5f7',
                borderBottom: '1px solid #e5e5ea',
                fontSize: '0.75rem',
                color: '#6e6e73',
                textTransform: 'uppercase'
              }}
            >
              <tr>
                <th className="py-3 ps-4">ID</th>
                <th className="py-3">Producto</th>
                <th className="py-3">Categoría</th>
                <th className="py-3">Precio</th>
                <th className="py-3 text-center">Stock</th>
                <th className="py-3 text-center pe-4">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center py-4" style={{ color: '#6e6e73' }}>
                    Cargando base de datos...
                  </td>
                </tr>
              ) : productosFiltrados.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-5" style={{ color: '#6e6e73' }}>
                    <div className="mb-2">
                      No hay productos que coincidan con los filtros aplicados.
                    </div>
                    {hayFiltrosActivos && (
                      <button
                        type="button"
                        onClick={limpiarFiltros}
                        style={{
                          padding: '7px 16px',
                          borderRadius: '999px',
                          border: 'none',
                          backgroundColor: '#0071e3',
                          color: '#ffffff',
                          fontWeight: 600,
                          fontSize: '0.84rem',
                          cursor: 'pointer'
                        }}
                      >
                        Restablecer filtros
                      </button>
                    )}
                  </td>
                </tr>
              ) : (
                productosFiltrados.map((item) => {
                  const precioSeguro = obtenerPrecioSeguro(item);
                  const stockSeguro = obtenerStockSeguro(item);
                  const imagenSrc = item.imagenUrl || item.imagen || IMAGEN_RESPALDO_HD;
                  const categoriaNombre = obtenerNombreCategoria(item);

                  const estiloStock =
                    stockSeguro <= 0
                      ? { bg: '#fee2e2', color: '#b91c1c' }
                      : stockSeguro <= 5
                      ? { bg: '#fef3c7', color: '#b45309' }
                      : { bg: '#dcfce7', color: '#15803d' };

                  return (
                    <tr key={item.id} style={{ backgroundColor: '#ffffff' }}>
                      <td className="ps-4 py-3 fw-bold" style={{ color: '#0071e3' }}>
                        #{item.id}
                      </td>
                      <td className="py-3">
                        <div className="d-flex align-items-center">
                          <img
                            src={imagenSrc}
                            alt={item.nombre}
                            onError={(e) => {
                              e.currentTarget.src = IMAGEN_RESPALDO_HD;
                            }}
                            style={{
                              width: '48px',
                              height: '48px',
                              objectFit: 'cover',
                              borderRadius: '12px',
                              border: '1px solid #e5e5ea',
                              marginRight: '12px',
                              flexShrink: 0
                            }}
                          />
                          <div style={{ minWidth: 0 }}>
                            <div
                              className="fw-bold text-truncate"
                              style={{ maxWidth: '280px', color: '#1d1d1f' }}
                            >
                              {item.nombre}
                            </div>
                            <small style={{ color: '#6e6e73' }}>{categoriaNombre}</small>
                          </div>
                        </div>
                      </td>
                      <td className="py-3">
                        <span
                          style={{
                            backgroundColor: '#f1f5f9',
                            color: '#334155',
                            fontWeight: 700,
                            fontSize: '0.75rem',
                            padding: '4px 10px',
                            borderRadius: '999px'
                          }}
                        >
                          {categoriaNombre}
                        </span>
                      </td>
                      <td className="py-3 fw-bold" style={{ color: '#1d1d1f' }}>
                        ${precioSeguro.toLocaleString('es-CL')}
                      </td>
                      <td className="py-3 text-center">
                        <span
                          style={{
                            backgroundColor: estiloStock.bg,
                            color: estiloStock.color,
                            fontWeight: 700,
                            fontSize: '0.78rem',
                            padding: '4px 11px',
                            borderRadius: '999px'
                          }}
                        >
                          {stockSeguro} un.
                        </span>
                      </td>
                      <td className="py-3 text-center pe-4">
                        <button
                          type="button"
                          onClick={() => abrirModalEditar(item)}
                          style={{
                            padding: '6px 14px',
                            borderRadius: '999px',
                            border: '1.5px solid #0071e3',
                            backgroundColor: '#eff6ff',
                            color: '#0071e3',
                            fontWeight: 600,
                            fontSize: '0.82rem',
                            cursor: 'pointer',
                            marginRight: '8px'
                          }}
                        >
                          Editar
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(item.id)}
                          style={{
                            padding: '6px 14px',
                            borderRadius: '999px',
                            border: '1.5px solid #fecaca',
                            backgroundColor: '#fef2f2',
                            color: '#dc2626',
                            fontWeight: 600,
                            fontSize: '0.82rem',
                            cursor: 'pointer'
                          }}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </Table>
        </div>

        {/* Tabla de Usuarios */}
        <div
          className="overflow-hidden"
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '24px',
            border: '1.5px solid #e5e5ea',
            boxShadow: '0 12px 30px rgba(0, 0, 0, 0.05)'
          }}
        >
          <div
            className="px-4 py-3"
            style={{
              background: 'linear-gradient(90deg, #f8fafc 0%, #f1f5f9 100%)',
              borderBottom: '1px solid #e2e8f0',
              fontWeight: 800,
              color: '#1d1d1f',
              fontSize: '1rem'
            }}
          >
            Usuarios Registrados en el Sistema (Exclusivo Administrador)
          </div>

          <Table responsive hover className="align-middle mb-0" style={{ color: '#1d1d1f' }}>
            <thead
              style={{
                backgroundColor: '#f5f5f7',
                borderBottom: '1px solid #e5e5ea',
                fontSize: '0.75rem',
                color: '#6e6e73',
                textTransform: 'uppercase'
              }}
            >
              <tr>
                <th className="py-3 ps-4">ID</th>
                <th className="py-3">Nombre</th>
                <th className="py-3">Correo Electrónico</th>
                <th className="py-3 text-center pe-4">Rol</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.length > 0 ? (
                usuarios.map((u) => {
                  const rolStyle =
                    u.rol === 'ADMINISTRADOR'
                      ? { bg: '#fee2e2', color: '#b91c1c' }
                      : u.rol === 'VENDEDOR'
                      ? { bg: '#e0f2fe', color: '#0369a1' }
                      : { bg: '#f1f5f9', color: '#475569' };

                  return (
                    <tr key={u.id} style={{ backgroundColor: '#ffffff' }}>
                      <td className="ps-4 py-3 fw-bold" style={{ color: '#0071e3' }}>
                        #{u.id}
                      </td>
                      <td className="py-3 fw-semibold" style={{ color: '#1d1d1f' }}>
                        {u.nombre}
                      </td>
                      <td className="py-3" style={{ color: '#424245' }}>
                        {u.email}
                      </td>
                      <td className="py-3 text-center pe-4">
                        <span
                          style={{
                            backgroundColor: rolStyle.bg,
                            color: rolStyle.color,
                            fontWeight: 700,
                            fontSize: '0.75rem',
                            padding: '4px 12px',
                            borderRadius: '999px'
                          }}
                        >
                          {u.rol}
                        </span>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-3" style={{ color: '#6e6e73' }}>
                    No hay usuarios cargados.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>

        {/* Modal Crear / Editar Producto */}
        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton style={{ borderBottom: '1px solid #e5e5ea' }}>
            <Modal.Title style={{ fontWeight: 800, color: '#1d1d1f' }}>
              {editandoId ? `Editar Producto #${editandoId}` : 'Nuevo Producto'}
            </Modal.Title>
          </Modal.Header>
          <Form onSubmit={handleGuardar}>
            <Modal.Body style={{ color: '#1d1d1f' }}>
              <Form.Group className="mb-3">
                <Form.Label style={{ fontWeight: 600, fontSize: '0.86rem' }}>
                  Nombre del Producto
                </Form.Label>
                <Form.Control
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleFormChange}
                  placeholder="Ej. Mouse Gamer Inalámbrico"
                  required
                  style={ESTILO_CAMPO}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label style={{ fontWeight: 600, fontSize: '0.86rem' }}>
                  Categoría
                </Form.Label>
                <Form.Select
                  name="categoriaId"
                  value={formData.categoriaId}
                  onChange={handleFormChange}
                  required
                  style={ESTILO_CAMPO}
                >
                  {categorias.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.nombre}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label style={{ fontWeight: 600, fontSize: '0.86rem' }}>
                  Precio (CLP)
                </Form.Label>
                <Form.Control
                  type="number"
                  name="precio"
                  min="1"
                  value={formData.precio}
                  onChange={handleFormChange}
                  required
                  style={ESTILO_CAMPO}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label style={{ fontWeight: 600, fontSize: '0.86rem' }}>
                  Stock Disponible
                </Form.Label>
                <Form.Control
                  type="number"
                  name="stock"
                  min="0"
                  value={formData.stock}
                  onChange={handleFormChange}
                  required
                  style={ESTILO_CAMPO}
                />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label style={{ fontWeight: 600, fontSize: '0.86rem' }}>
                  URL de Imagen
                </Form.Label>
                <Form.Control
                  type="url"
                  name="imagenUrl"
                  value={formData.imagenUrl}
                  onChange={handleFormChange}
                  placeholder="https://images.unsplash.com/..."
                  required
                  style={ESTILO_CAMPO}
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer style={{ borderTop: '1px solid #e5e5ea' }}>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                style={{
                  padding: '9px 18px',
                  borderRadius: '999px',
                  border: '1.5px solid #d2d2d7',
                  backgroundColor: '#ffffff',
                  color: '#1d1d1f',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={guardando}
                style={{
                  padding: '9px 22px',
                  borderRadius: '999px',
                  border: 'none',
                  backgroundColor: '#0071e3',
                  color: '#ffffff',
                  fontWeight: 600,
                  cursor: guardando ? 'not-allowed' : 'pointer'
                }}
              >
                {guardando
                  ? 'Guardando...'
                  : editandoId
                  ? 'Guardar Cambios'
                  : 'Crear Producto'}
              </button>
            </Modal.Footer>
          </Form>
        </Modal>
      </Container>
    </div>
  );
}