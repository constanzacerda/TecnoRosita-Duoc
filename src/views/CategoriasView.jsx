import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Badge } from 'react-bootstrap';
import ProductCard from '../components/ProductCard';
import { getProductos } from '../data/productos';

const CategoriasView = () => {
  const [productos, setProductos] = useState([]);
  const [categoriaActiva, setCategoriaActiva] = useState('Todos');

  
  useEffect(() => {
    setProductos(getProductos());
  }, []);

 
  const categoriasUnicas = ['Todos', ...new Set(productos.map(p => p.categoria))];

  
  const productosFiltrados = categoriaActiva === 'Todos' 
    ? productos 
    : productos.filter(p => p.categoria === categoriaActiva);

  return (
    <Container className="text-white mt-4 mb-5">
      <div className="text-center mb-5">
        <h2 style={{ fontFamily: 'Orbitron, sans-serif', color: '#e8b74d' }}>Explorar Categorías</h2>
        <p className="text-muted">Filtra nuestro catálogo interactivo para encontrar exactamente lo que buscas.</p>
      </div>

      
      <div className="d-flex flex-wrap justify-content-center gap-2 mb-5">
        {categoriasUnicas.map(cat => (
          <Button 
            key={cat}
            variant={categoriaActiva === cat ? 'warning' : 'outline-secondary'}
            className={categoriaActiva === cat ? 'text-dark fw-bold' : 'text-light'}
            onClick={() => setCategoriaActiva(cat)}
          >
            {cat}
          </Button>
        ))}
      </div>

      
      <div className="d-flex justify-content-between align-items-center mb-3 border-bottom border-secondary pb-2">
        <h4 className="text-warning mb-0">{categoriaActiva}</h4>
        <Badge bg="secondary" className="fs-6">{productosFiltrados.length} productos</Badge>
      </div>

      <Row className="g-4">
        {productosFiltrados.length > 0 ? (
          productosFiltrados.map(producto => (
            <Col md={4} lg={3} key={producto.id}>
              <ProductCard producto={producto} />
            </Col>
          ))
        ) : (
          <Col className="text-center py-5">
            <h4 className="text-muted">No hay productos disponibles en esta categoría.</h4>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default CategoriasView;