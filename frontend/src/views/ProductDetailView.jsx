import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { obtenerProductoPorId } from '../services/productoService';
import { Container, Row, Col, Button, Badge } from 'react-bootstrap';

const ProductDetailView = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducto = async () => {
        const data = await obtenerProductoPorId(id);
        setProducto(data);
        setLoading(false);
    };
    fetchProducto();
  }, [id]);

  if (loading) return <h2 className="text-center mt-5 text-white">Cargando producto...</h2>;
  if (!producto) return <h2 className="text-center mt-5 text-white">Producto no encontrado</h2>;

  return (
    <Container className="pt-4 text-white">
      <div className="mb-4">
        <Link to="/" className="text-warning text-decoration-none">Home</Link> / 
        <Link to="/categorias" className="text-warning text-decoration-none mx-2">Productos</Link> / 
        <span className="text-secondary mx-2">{producto.categoria}</span> / 
        <span className="text-light mx-2">{producto.nombre}</span>
      </div>

      <Row className="page-section page-section--tight align-items-center">
        <Col md={6}>
          <img 
            src={producto.imagen} 
            alt={producto.nombre} 
            className="img-fluid rounded shadow-lg" 
            style={{ border: '1px solid #d4af37' }} 
          />
        </Col>
        <Col md={6} className="p-4">
          <Badge bg="warning" text="dark" className="mb-2 fs-6">{producto.marca}</Badge>
          <h1 style={{ fontFamily: 'Orbitron, sans-serif' }}>{producto.nombre}</h1>
          <p className="text-secondary mb-4">SKU: {producto.sku || 'N/A'} | Part Number: {producto.partNumber || 'N/A'}</p>
          
          <h2 className="text-success fw-bold mb-4">
            ${(producto.precioTransferencia || producto.precio || 0).toLocaleString('es-CL')} <small className="text-light fs-6">Precio Transferencia</small>
          </h2>
          
          <p className="fs-5">{producto.descripcion}</p>
          <p><strong>Stock Online:</strong> {producto.stockOnline !== undefined ? producto.stockOnline : producto.stock} unidades</p>
          
          <Button variant="warning" size="lg" className="mt-3 w-100 fw-bold">
            Añadir al carrito
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetailView;