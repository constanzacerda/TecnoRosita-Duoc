import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer-container text-white pt-5 pb-4 mt-5">
      <Container>
        
        <Row className="mb-4 border-bottom border-secondary pb-4">
          <Col md={6} className="mb-3 mb-md-0">
            <h5 className="fw-bold text-warning">¡Únete a nuestra comunidad!</h5>
            <p className="small mb-0">Déjanos tu correo para recibir ofertas exclusivas y novedades de TecnoRosita.</p>
          </Col>
          <Col md={6} className="d-flex align-items-center">
            <Form className="d-flex w-100">
              <Form.Control type="email" placeholder="Tu correo electrónico" className="me-2 rounded-0 border-0" required />
              <Button variant="warning" className="fw-bold rounded-0">Suscribirse</Button>
            </Form>
          </Col>
        </Row>

        
        <Row className="align-items-center mb-4">
          <Col lg={7} className="mb-4 mb-lg-0">
            <h6 className="fw-bold text-info mb-3 border-start border-info border-3 ps-2">Medios de pago</h6>
            <div className="d-flex flex-wrap gap-3 align-items-center payment-icons">
              <span className="fw-bold">webpay<small>.cl</small></span>
              <span>Mercado Pago</span>
              <span>Santander</span>
              <span>BancoEstado</span>
              <span><i className="bi bi-bank"></i> Transferencia Bancaria</span>
            </div>
          </Col>
          <Col lg={5}>
             <div className="d-flex flex-column gap-3 justify-content-lg-end">
                <div className="d-flex align-items-center gap-2">
                    <i className="bi bi-shield-check fs-2 text-info"></i>
                    <div>
                        <p className="mb-0 small">TecnoRosita protege toda tu información con</p>
                        <p className="mb-0 fw-bold small">Secure Sockets Layer (SSL)</p>
                    </div>
                </div>
                <div className="d-flex align-items-center gap-2">
                    <div className="border border-white p-1 fw-bold fs-5">ChileCompra</div>
                </div>
             </div>
          </Col>
        </Row>

        
        <Row className="border-top border-secondary pt-4 text-end">
          <Col md={12}>
            <div className="social-icons mb-3">
              <a href="#" className="text-white me-3 fs-4"><i className="bi bi-instagram"></i></a>
              <a href="#" className="text-white me-3 fs-4"><i className="bi bi-facebook"></i></a>
              <a href="#" className="text-white me-3 fs-4"><i className="bi bi-linkedin"></i></a>
              <a href="#" className="text-white me-3 fs-4"><i className="bi bi-twitch"></i></a>
              <a href="#" className="text-white me-3 fs-4"><i className="bi bi-twitter-x"></i></a>
              <a href="#" className="text-white fs-4"><i className="bi bi-youtube"></i></a>
            </div>
            <p className="mb-1 small">Padre Mariano N° 356, Providencia, Santiago de Chile</p>
            <p className="mb-0 fw-bold small">Horario Atención Tienda y Punto de Retiro:</p>
            <p className="mb-0 small">Lunes a Jueves - 09:00 a 18:30</p>
            <p className="mb-0 small">Viernes - 09:00 a 18:00</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}