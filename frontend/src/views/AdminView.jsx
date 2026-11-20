import React, { useContext, useState, useEffect, useMemo } from 'react';
import { Container, Table, Modal, Form, Alert, Row, Col } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';
import {
  obtenerProductos,
  obtenerCategorias,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
  obtenerBoletas
} from '../services/productoService';
import AdminProductRow from '../components/AdminProductRow';

const FUENTE_APPLE =
  '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Segoe UI", Roboto, sans-serif';

const ESTILO_CAMPO = {
  padding: '11px 14px',
  borderRadius: '12px',
  backgroundColor: '#f5f5f7',
  color: '#1d1d1f',
  border: '1.5px solid #d2d2d7'
};

const ESTILO_FILTRO = {
  padding: '9px 13px',
  borderRadius: '12px',
  backgroundColor: '#ffffff',
  color: '#1d1d1f',
  border: '1.5px solid #cbd5e1',
  fontSize: '0.88rem'
};

const obtenerNombreCategoria = (producto) => {
  if (!producto || !producto.categoria) return '';
  return typeof producto.categoria === 'object'
    ? producto.categoria.nombre || ''
    : producto.categoria;
};

const obtenerPrecioProducto = (producto) =>
  producto.precio !== undefined ? Number(producto.precio) : Number(producto.precioTransferencia || 0);

const obtenerStockProducto = (producto) =>
  producto.stock !== undefined ? Number(producto.stock) : Number(producto.stockOnline || 0);

const AdminView = () => {
  const { user } = useContext(AuthContext);
  const esAdmin = user?.rol === 'ADMINISTRADOR';
  const esVendedor = !esAdmin;

  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [boletas, setBoletas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mensaje, setMensaje] = useState({ tipo: '', texto: '' });

  // Estados del sistema de filtros de inventario
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
    const [listaProductos, listaCategorias, listaBoletas] = await Promise.all([
      obtenerProductos(),
      obtenerCategorias(),
      obtenerBoletas()
    ]);
    setProductos(listaProductos || []);
    setCategorias(listaCategorias || []);
    setBoletas(listaBoletas || []);
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

      const stockVal = obtenerStockProducto(prod);
      if (filtroStock === 'CON_STOCK' && stockVal <= 0) return false;
      if (filtroStock === 'STOCK_BAJO' && (stockVal <= 0 || stockVal > 5)) return false;
      if (filtroStock === 'SIN_STOCK' && stockVal > 0) return false;

      const precioVal = obtenerPrecioProducto(prod);
      if (minVal !== null && !Number.isNaN(minVal) && precioVal < minVal) return false;
      if (maxVal !== null && !Number.isNaN(maxVal) && precioVal > maxVal) return false;

      return true;
    });
  }, [productos, filtroId, filtroNombre, filtroCategoria, filtroStock, precioMin, precioMax]);

  const abrirModalCrear = () => {
    if (!esAdmin) return;
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

  const abrirModalEditar = (producto) => {
    if (!esAdmin) return;
    setEditandoId(producto.id);
    const catId =
      producto.categoria && typeof producto.categoria === 'object'
        ? String(producto.categoria.id)
        : categorias.length > 0
        ? String(categorias[0].id)
        : '';

    setFormData({
      nombre: producto.nombre || '',
      precio: producto.precio ?? '',
      stock: producto.stock ?? 0,
      imagenUrl: producto.imagenUrl || producto.imagen || '',
      categoriaId: catId
    });
    setMensaje({ tipo: '', texto: '' });
    setShowModal(true);
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGuardarProducto = async (e) => {
    e.preventDefault();
    if (!esAdmin) return;

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
          'No se pudo guardar el producto. Verifica los datos y tus permisos de ADMINISTRADOR.'
      });
    } finally {
      setGuardando(false);
    }
  };

  const handleEliminarProducto = async (id) => {
    if (!esAdmin) return;
    const confirmar = window.confirm(
      `¿Estás seguro de eliminar el producto #${id} de la base de datos?`
    );
    if (!confirmar) return;

    const eliminado = await eliminarProducto(id);
    if (eliminado) {
      setMensaje({
        tipo: 'success',
        texto: `Producto #${id} eliminado correctamente.`
      });
      await cargarDatos();
    } else {
      setMensaje({
        tipo: 'danger',
        texto:
          'No se pudo eliminar el producto (puede estar asociado a una boleta registrada o faltan permisos).'
      });
    }
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
      <Container style={{ maxWidth: '1220px' }} className="text-start">
        {/* Banner superior ordenado con degradado amarillo -> blanco -> celeste */}
        <div
          className="p-4 p-md-5 mb-4 text-center"
          style={{
            backgroundColor: '#090c14',
            borderRadius: '26px',
            border: '1.5px solid #1e293b',
            boxShadow: '0 16px 36px rgba(0, 0, 0, 0.12)'
          }}
        >
          <span
            style={{
              display: 'inline-block',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              color: '#f7d774',
              border: '1px solid rgba(247, 215, 116, 0.35)',
              fontSize: '0.72rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              padding: '5px 12px',
              borderRadius: '999px',
              marginBottom: '10px'
            }}
          >
            {esVendedor ? 'Modo Lectura · Vendedor' : 'Control Total · Administrador'}
          </span>

          <h1
            style={{
              fontFamily: FUENTE_APPLE,
              fontWeight: 800,
              fontSize: 'clamp(1.9rem, 4vw, 2.8rem)',
              margin: '0 0 8px',
              background:
                'linear-gradient(90deg, #f2c94c 0%, #ffffff 48%, #73c0ff 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent'
            }}
          >
            Panel de Administración
          </h1>

          <p
            style={{
              color: '#7cc4ff',
              fontSize: '1.02rem',
              fontWeight: 600,
              margin: 0
            }}
          >
            Módulo de Gestión de Inventario{' '}
            {esVendedor
              ? '(Modo Lectura - Vendedor)'
              : '(Control Total - Administrador)'}
          </p>
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

        {/* Encabezado Listado de Productos */}
        <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
          <div className="d-flex flex-wrap align-items-center gap-2">
            <h4
              style={{
                fontWeight: 800,
                color: '#1d1d1f',
                margin: 0
              }}
            >
              Listado de Productos
            </h4>
            <span
              style={{
                backgroundColor: '#e0f2fe',
                color: '#0369a1',
                fontWeight: 800,
                fontSize: '0.82rem',
                padding: '4px 12px',
                borderRadius: '999px'
              }}
            >
              {hayFiltrosActivos
                ? `${productosFiltrados.length} de ${productos.length}`
                : productos.length}
            </span>
          </div>

          {!esVendedor && (
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
                boxShadow: '0 8px 20px rgba(0, 113, 227, 0.28)'
              }}
            >
              + Nuevo Producto
            </button>
          )}
        </div>

        {/* Sistema de filtros: ID producto, nombre, categoría, stock y rango de precio */}
        <div
          className="p-3 p-md-4 mb-4"
          style={{
            background: 'linear-gradient(180deg, #f8fbff 0%, #f5f5f7 100%)',
            borderRadius: '22px',
            border: '1.5px solid #dbeafe',
            boxShadow: '0 8px 22px rgba(0, 113, 227, 0.05)'
          }}
        >
          <Row className="g-3 align-items-end">
            <Col xs={6} md={2}>
              <Form.Label
                htmlFor="filtro-id-producto"
                style={{ fontSize: '0.78rem', fontWeight: 700, color: '#1d1d1f', marginBottom: '5px' }}
              >
                ID Producto
              </Form.Label>
              <Form.Control
                id="filtro-id-producto"
                type="text"
                placeholder="Ej. 1 o #4"
                value={filtroId}
                onChange={(e) => setFiltroId(e.target.value)}
                style={ESTILO_FILTRO}
              />
            </Col>

            <Col xs={6} md={3}>
              <Form.Label
                htmlFor="filtro-nombre-producto"
                style={{ fontSize: '0.78rem', fontWeight: 700, color: '#1d1d1f', marginBottom: '5px' }}
              >
                Nombre del Producto
              </Form.Label>
              <Form.Control
                id="filtro-nombre-producto"
                type="text"
                placeholder="Buscar por nombre..."
                value={filtroNombre}
                onChange={(e) => setFiltroNombre(e.target.value)}
                style={ESTILO_FILTRO}
              />
            </Col>

            <Col xs={6} md={2}>
              <Form.Label
                htmlFor="filtro-categoria-producto"
                style={{ fontSize: '0.78rem', fontWeight: 700, color: '#1d1d1f', marginBottom: '5px' }}
              >
                Categoría
              </Form.Label>
              <Form.Select
                id="filtro-categoria-producto"
                value={filtroCategoria}
                onChange={(e) => setFiltroCategoria(e.target.value)}
                style={ESTILO_FILTRO}
              >
                <option value="TODAS">Todas</option>
                {categorias.map((cat) => (
                  <option key={cat.id || cat.nombre} value={cat.nombre}>
                    {cat.nombre}
                  </option>
                ))}
              </Form.Select>
            </Col>

            <Col xs={6} md={2}>
              <Form.Label
                htmlFor="filtro-stock-producto"
                style={{ fontSize: '0.78rem', fontWeight: 700, color: '#1d1d1f', marginBottom: '5px' }}
              >
                Stock
              </Form.Label>
              <Form.Select
                id="filtro-stock-producto"
                value={filtroStock}
                onChange={(e) => setFiltroStock(e.target.value)}
                style={ESTILO_FILTRO}
              >
                <option value="TODOS">Todos</option>
                <option value="CON_STOCK">Con stock (&gt; 0)</option>
                <option value="STOCK_BAJO">Stock bajo (≤ 5)</option>
                <option value="SIN_STOCK">Sin stock (0)</option>
              </Form.Select>
            </Col>

            <Col xs={6} md={1} style={{ minWidth: '105px' }}>
              <Form.Label
                htmlFor="filtro-precio-min"
                style={{ fontSize: '0.78rem', fontWeight: 700, color: '#1d1d1f', marginBottom: '5px' }}
              >
                Precio mín.
              </Form.Label>
              <Form.Control
                id="filtro-precio-min"
                type="number"
                min="0"
                placeholder="$0"
                value={precioMin}
                onChange={(e) => setPrecioMin(e.target.value)}
                style={ESTILO_FILTRO}
              />
            </Col>

            <Col xs={6} md={2}>
              <Form.Label
                htmlFor="filtro-precio-max"
                style={{ fontSize: '0.78rem', fontWeight: 700, color: '#1d1d1f', marginBottom: '5px' }}
              >
                Precio máx.
              </Form.Label>
              <Form.Control
                id="filtro-precio-max"
                type="number"
                min="0"
                placeholder="Sin tope"
                value={precioMax}
                onChange={(e) => setPrecioMax(e.target.value)}
                style={ESTILO_FILTRO}
              />
            </Col>
          </Row>

          {hayFiltrosActivos && (
            <div className="d-flex justify-content-between align-items-center mt-3 pt-2" style={{ borderTop: '1px solid #e2e8f0' }}>
              <span style={{ fontSize: '0.84rem', color: '#424245', fontWeight: 500 }}>
                Resultados filtrados: <strong style={{ color: '#0071e3' }}>{productosFiltrados.length}</strong> productos
              </span>
              <button
                type="button"
                onClick={limpiarFiltros}
                style={{
                  padding: '5px 14px',
                  borderRadius: '999px',
                  border: '1.5px solid #0071e3',
                  backgroundColor: '#ffffff',
                  color: '#0071e3',
                  fontWeight: 600,
                  fontSize: '0.8rem',
                  cursor: 'pointer'
                }}
              >
                Limpiar filtros
              </button>
            </div>
          )}
        </div>

        {/* Tabla clara y uniforme */}
        <div
          className="mb-5 overflow-hidden"
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '24px',
            border: '1.5px solid #e5e5ea',
            boxShadow: '0 12px 30px rgba(0, 0, 0, 0.05)'
          }}
        >
          {loading ? (
            <p className="text-center py-4 m-0" style={{ color: '#6e6e73' }}>
              Cargando datos desde el servidor...
            </p>
          ) : productosFiltrados.length === 0 ? (
            <div className="text-center py-5">
              <p className="mb-3" style={{ color: '#6e6e73', fontWeight: 500 }}>
                No se encontraron productos con los filtros seleccionados.
              </p>
              {hayFiltrosActivos && (
                <button
                  type="button"
                  onClick={limpiarFiltros}
                  style={{
                    padding: '8px 18px',
                    borderRadius: '999px',
                    border: 'none',
                    backgroundColor: '#0071e3',
                    color: '#ffffff',
                    fontWeight: 600,
                    fontSize: '0.88rem',
                    cursor: 'pointer'
                  }}
                >
                  Restablecer filtros
                </button>
              )}
            </div>
          ) : (
            <Table hover responsive className="align-middle mb-0" style={{ color: '#1d1d1f' }}>
              <thead
                style={{
                  backgroundColor: '#f5f5f7',
                  borderBottom: '1px solid #e5e5ea',
                  fontSize: '0.78rem',
                  color: '#424245',
                  textTransform: 'uppercase'
                }}
              >
                <tr>
                  <th className="py-3 text-center">ID</th>
                  <th className="py-3">Nombre</th>
                  <th className="py-3">Precio</th>
                  <th className="py-3 text-center">Stock</th>
                  {!esVendedor && <th className="py-3 text-center">Acciones</th>}
                </tr>
              </thead>
              <tbody>
                {productosFiltrados.map((prod) => (
                  <AdminProductRow
                    key={prod.id}
                    producto={prod}
                    esVendedor={esVendedor}
                    onEditar={abrirModalEditar}
                    onEliminar={handleEliminarProducto}
                  />
                ))}
              </tbody>
            </Table>
          )}
        </div>

        {/* Órdenes de Compra Registradas */}
        <div className="d-flex align-items-center gap-2 mb-3">
          <h4
            style={{
              fontWeight: 800,
              color: '#1d1d1f',
              margin: 0
            }}
          >
            Órdenes de Compra Registradas
          </h4>
          <span
            style={{
              backgroundColor: '#fef3c7',
              color: '#b45309',
              fontWeight: 800,
              fontSize: '0.82rem',
              padding: '4px 12px',
              borderRadius: '999px'
            }}
          >
            {boletas.length}
          </span>
        </div>

        <div
          className="overflow-hidden"
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '24px',
            border: '1.5px solid #e5e5ea',
            boxShadow: '0 12px 30px rgba(0, 0, 0, 0.05)'
          }}
        >
          <Table hover responsive className="align-middle mb-0" style={{ color: '#1d1d1f' }}>
            <thead
              style={{
                backgroundColor: '#f5f5f7',
                borderBottom: '1px solid #e5e5ea',
                fontSize: '0.78rem',
                color: '#424245',
                textTransform: 'uppercase'
              }}
            >
              <tr>
                <th className="py-3 text-center">N° Boleta</th>
                <th className="py-3">Fecha</th>
                <th className="py-3">Cliente</th>
                <th className="py-3">Correo</th>
                <th className="py-3 text-end pe-4">Total</th>
              </tr>
            </thead>
            <tbody>
              {boletas.length > 0 ? (
                boletas.map((boleta) => (
                  <tr key={boleta.id} style={{ backgroundColor: '#ffffff' }}>
                    <td className="text-center fw-bold" style={{ color: '#0071e3' }}>
                      #{boleta.id}
                    </td>
                    <td>
                      {boleta.fecha
                        ? new Date(boleta.fecha).toLocaleString('es-CL')
                        : '—'}
                    </td>
                    <td className="fw-semibold">{boleta.clienteNombre || '—'}</td>
                    <td style={{ color: '#424245' }}>{boleta.clienteEmail || '—'}</td>
                    <td className="text-end pe-4 fw-bold" style={{ color: '#0071e3' }}>
                      ${(boleta.total || 0).toLocaleString('es-CL')}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-3" style={{ color: '#6e6e73' }}>
                    Aún no hay boletas registradas en la base de datos.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>

        {/* Modal Crear / Editar Producto (exclusivo ADMINISTRADOR) */}
        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton style={{ borderBottom: '1px solid #e5e5ea' }}>
            <Modal.Title style={{ fontWeight: 800, color: '#1d1d1f' }}>
              {editandoId ? `Editar Producto #${editandoId}` : 'Nuevo Producto'}
            </Modal.Title>
          </Modal.Header>
          <Form onSubmit={handleGuardarProducto}>
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
                  placeholder="Ej. Teclado Mecánico RGB"
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
                  placeholder="Ej. 89990"
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
};

export default AdminView;