import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

export default function BlogView() {
  const articulos = [
    {
      id: 1,
      titulo: 'Análisis a fondo: iPhone 18 Pro Max',
      extracto: 'Revisamos todas las novedades, diseño y potencia del nuevo buque insignia de Apple.',
      imagen: '/img/blog/blog-iphone.svg',
      fecha: '07 Noviembre, 2026'
    },
    {
      id: 2,
      titulo: 'Los mejores notebook calidad precio del 2026',
      extracto: 'Analizamos a fondo los equipos con mejor rendimiento y costo del mercado actual.',
      imagen: '/img/blog/blog-notebooks.svg',
      fecha: '02 Noviembre, 2026'
    },
    {
      id: 3,
      titulo: 'Batalla de Consolas Gamer: ¿Cuál elegir?',
      extracto: 'Una comparativa detallada para saber qué consola se adapta mejor a tu estilo de juego.',
      imagen: '/img/blog/blog-consolas.svg',
      fecha: '28 Octubre, 2026'
    }
  ];

  return (
    <Container className="py-5">
      <h2 className="text-center text-warning fw-bold mb-5 section-title">Noticias y Novedades</h2>
      <Row className="g-4">
        {articulos.map((articulo) => (
          <Col md={4} key={articulo.id}>
            <Card className="h-100 bg-secondary text-white border-0 shadow-sm" style={{ backgroundColor: 'var(--black-3)' }}>
              <Card.Img variant="top" src={articulo.imagen} alt={articulo.titulo} />
              <Card.Body className="d-flex flex-column">
                <Card.Title className="fw-bold">{articulo.titulo}</Card.Title>
                <Card.Text className="text-muted small mb-3">{articulo.fecha}</Card.Text>
                <Card.Text className="flex-grow-1">{articulo.extracto}</Card.Text>
                <Button variant="outline-warning" className="w-100 fw-bold mt-auto">Leer más</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

