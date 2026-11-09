import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card } from 'react-bootstrap';
import ProductCard from '../components/ProductCard';
import { getProductos } from '../data/productos';

const HomeView = () => {
  const [destacados, setDestacados] = useState([]);
  const [ofertas, setOfertas] = useState([]);

  useEffect(() => {
    const todosProductos = getProductos();
    setDestacados(todosProductos.slice(0, 4)); 
    setOfertas(todosProductos.slice(4, 8)); 
  }, []);

  return (
    <main>
      
      <section className="hero" aria-label="Banner principal" style={{ overflow: 'hidden', position: 'relative' }}>
        <div className="hero__slide hero__slide--a is-active" style={{ opacity: 1, position: 'relative', display: 'block' }}>
          <img src="https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=1600&h=800&fit=crop&auto=format&q=80" alt="" className="hero__bg-img" loading="eager" />
          <div className="hero__overlay"></div>
          <div className="container hero__content">
            <span className="hero__tag" style={{ color: '#e8b74d' }}>✦ Colección Elite 2026</span>
            <h1 className="hero__title">Donde cada partida se siente <span>legendaria</span></h1>
            <p className="hero__desc">Hardware de élite que responde antes de que lo pienses. Periféricos gamer con acabados premium en negro, dorado y turquesa — para quienes no juegan: compiten.</p>
            <div className="hero__cta">
              <Link to="/productos" className="btn btn--gold btn--lg">Explorar catálogo</Link>
            </div>
          </div>
        </div>
      </section>

      
      <div className="container mt-4">
        <div className="value-strip">
          <div className="value-item">
            <div className="value-item__icon" style={{ color: '#e8b74d' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M3 12l7-9 11 9-11 9-7-9z" stroke="#e8b74d" strokeWidth="1.6"/></svg>
            </div>
            <div><h4 className="text-white">Envío Premium</h4><p className="text-muted">Gratis sobre $60.000</p></div>
          </div>
          <div className="value-item">
            <div className="value-item__icon" style={{ color: '#e8b74d' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 3l7 3v6c0 5-3.5 8-7 9-3.5-1-7-4-7-9V6l7-3z" stroke="#e8b74d" strokeWidth="1.6"/></svg>
            </div>
            <div><h4 className="text-white">Garantía Care</h4><p className="text-muted">12 meses en todo</p></div>
          </div>
          <div className="value-item">
            <div className="value-item__icon" style={{ color: '#e8b74d' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="3" y="6" width="18" height="13" rx="2" stroke="#e8b74d" strokeWidth="1.6"/><path d="M3 10h18" stroke="#e8b74d" strokeWidth="1.6"/></svg>
            </div>
            <div><h4 className="text-white">Pago 100% Seguro</h4><p className="text-muted">WebPay, Visa, Master</p></div>
          </div>
          <div className="value-item">
            <div className="value-item__icon" style={{ color: '#e8b74d' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#e8b74d" strokeWidth="1.6"/><path d="M12 7v5l3 3" stroke="#e8b74d" strokeWidth="1.6"/></svg>
            </div>
            <div><h4 className="text-white">Soporte 24/7</h4><p className="text-muted">Asesoría especializada</p></div>
          </div>
        </div>
      </div>

      
      <section className="page-section page-section--tight mt-5">
        <div className="container">
          <div className="section-header text-center mb-4">
            <span className="section-eyebrow" style={{ color: '#e8b74d' }}>Explora por categoría</span>
            <h2 className="section-title text-white">Descubre Nuestras Categorías</h2>
          </div>
          
          <Row className="g-4">
            <Col md={3}>
              <Card as={Link} to="/categorias" className="bg-dark text-white border-secondary p-3 text-decoration-none h-100 shadow-sm" style={{ borderLeft: '4px solid #e8b74d' }}>
                <Card.Body>
                  <svg width="35" height="35" viewBox="0 0 64 64" fill="none" className="mb-3"><path d="M10 28L32 10l22 18" stroke="#e8b74d" strokeWidth="2"/><path d="M16 26v26h32V26" stroke="#e8b74d" strokeWidth="2"/><circle cx="32" cy="40" r="6" stroke="#e8b74d" strokeWidth="2"/></svg>
                  <span className="text-warning small d-block mb-1 text-uppercase fw-bold">Hogar</span>
                  <h4 className="text-white fw-bold fs-5">Conectado</h4>
                  <p className="text-muted small mb-0">Un hogar más inteligente</p>
                </Card.Body>
              </Card>
            </Col>

            <Col md={3}>
              <Card as={Link} to="/categorias" className="bg-dark text-white border-secondary p-3 text-decoration-none h-100 shadow-sm" style={{ borderLeft: '4px solid #e8b74d' }}>
                <Card.Body>
                  <svg width="35" height="35" viewBox="0 0 64 64" fill="none" className="mb-3"><rect x="6" y="10" width="52" height="34" rx="3" stroke="#e8b74d" strokeWidth="2"/><line x1="32" y1="44" x2="32" y2="52" stroke="#e8b74d" strokeWidth="2"/><line x1="20" y1="56" x2="44" y2="56" stroke="#e8b74d" strokeWidth="2"/></svg>
                  <span className="text-warning small d-block mb-1 text-uppercase fw-bold">Monitores</span>
                  <h4 className="text-white fw-bold fs-5">Monitores</h4>
                  <p className="text-muted small mb-0">Eleva tu experiencia visual</p>
                </Card.Body>
              </Card>
            </Col>

            <Col md={3}>
              <Card as={Link} to="/categorias" className="bg-dark text-white border-secondary p-3 text-decoration-none h-100 shadow-sm" style={{ borderLeft: '4px solid #e8b74d' }}>
                <Card.Body>
                  <svg width="35" height="35" viewBox="0 0 64 64" fill="none" className="mb-3"><rect x="12" y="12" width="40" height="26" rx="2" stroke="#e8b74d" strokeWidth="2"/><path d="M6 48h52l-4 6H10z" stroke="#e8b74d" strokeWidth="2"/></svg>
                  <span className="text-warning small d-block mb-1 text-uppercase fw-bold">Productividad</span>
                  <h4 className="text-white fw-bold fs-5">Productividad</h4>
                  <p className="text-muted small mb-0">PC's y Notebooks</p>
                </Card.Body>
              </Card>
            </Col>

            <Col md={3}>
              <Card as={Link} to="/categorias" className="bg-dark text-white border-secondary p-3 text-decoration-none h-100 shadow-sm" style={{ borderLeft: '4px solid #e8b74d' }}>
                <Card.Body>
                  <svg width="35" height="35" viewBox="0 0 64 64" fill="none" className="mb-3"><rect x="6" y="18" width="52" height="30" rx="4" stroke="#e8b74d" strokeWidth="2"/><rect x="12" y="24" width="6" height="6" fill="#e8b74d"/><rect x="21" y="24" width="6" height="6" fill="#e8b74d"/><rect x="30" y="33" width="18" height="6" fill="#e8b74d"/></svg>
                  <span className="text-warning small d-block mb-1 text-uppercase fw-bold">Gaming</span>
                  <h4 className="text-white fw-bold fs-5">Gaming</h4>
                  <p className="text-muted small mb-0">Máximo rendimiento</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      </section>

      
      <section className="page-section page-section--tight mt-5 mb-5">
        <div className="container">
          <div className="section-header" style={{ textAlign: 'left', marginBottom: '2rem' }}>
            <span className="section-eyebrow" style={{ color: '#e8b74d' }}>Catálogo TecnoRosita</span>
            <h2 className="section-title text-white">Productos Destacados</h2>
          </div>
          <Row className="g-4">
            {destacados.map(producto => (
              <Col md={6} lg={3} key={producto.id}>
                <ProductCard producto={producto} />
              </Col>
            ))}
          </Row>
        </div>
      </section>

      
      <section className="page-section page-section--tight mb-5">
        <div className="container">
          <div className="section-header" style={{ textAlign: 'left', marginBottom: '2rem' }}>
            <span className="section-eyebrow" style={{ color: '#e8b74d' }}>Ofertas Especiales</span>
            <h2 className="section-title text-white">Lo más vendido en Mouse</h2>
          </div>
          <Row className="g-4">
            {ofertas.map(producto => (
              <Col md={6} lg={3} key={producto.id}>
                <ProductCard producto={producto} />
              </Col>
            ))}
          </Row>
        </div>
      </section>
    </main>
  );
};

export default HomeView;