import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

export default function ContactoView() {
  const [formData, setFormData] = useState({ nombre: '', correo: '', mensaje: '' });
  const [enviado, setEnviado] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.correo.endsWith('@duoc.cl') && !formData.correo.endsWith('@profesor.duoc.cl') && !formData.correo.endsWith('@gmail.com')) {
      alert('Solo se aceptan correos de dominio @duoc.cl, @profesor.duoc.cl o @gmail.com.');
      return;
    }
    setEnviado(true);
  };

  if (enviado) {
    return (
      <Container className="py-5 text-center min-vh-100 d-flex flex-column justify-content-center align-items-center">
        <div className="bg-secondary p-5 rounded border border-warning" style={{ maxWidth: '500px' }}>
          <i className="bi bi-check-circle text-success" style={{ fontSize: '4rem' }}></i>
          <h2 className="text-white mt-3">¡Mensaje enviado!</h2>
          <p className="text-white">Gracias por escribirnos. Nuestro equipo te responderá dentro de las próximas 24 horas hábiles.</p>
          <Button variant="warning" onClick={() => setEnviado(false)}>Enviar otro mensaje</Button>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <div className="bg-secondary p-4 p-md-5 rounded shadow">
            <h2 className="text-warning fw-bold text-center mb-2">Hablemos</h2>
            <p className="text-center text-white mb-4">¿Tienes dudas sobre algún producto o pedido? Completa el formulario.</p>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label className="text-white fw-bold">Nombre completo *</Form.Label>
                <Form.Control type="text" name="nombre" value={formData.nombre} onChange={handleChange} maxLength={100} required className="bg-dark text-white border-secondary" placeholder="Ej. Juan Pérez" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="text-white fw-bold">Correo electrónico *</Form.Label>
                <Form.Control type="email" name="correo" value={formData.correo} onChange={handleChange} maxLength={100} required className="bg-dark text-white border-secondary" placeholder="ejemplo@duoc.cl" />
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Label className="text-white fw-bold">Mensaje *</Form.Label>
                <Form.Control as="textarea" rows={4} name="mensaje" value={formData.mensaje} onChange={handleChange} maxLength={500} required className="bg-dark text-white border-secondary" placeholder="¿En qué te podemos ayudar?" />
              </Form.Group>
              <Button variant="warning" type="submit" className="w-100 fw-bold">Enviar mensaje</Button>
            </Form>
          </div>
        </Col>
        <Col md={4} className="mt-5 mt-md-0 d-flex flex-column justify-content-center">
            <h4 className="text-warning fw-bold mb-3">Información</h4>
            <p className="text-white mb-1"><i className="bi bi-envelope-fill text-info me-2"></i> contacto@tecnorosita.cl</p>
            <p className="text-white mb-1"><i className="bi bi-telephone-fill text-info me-2"></i> +56 9 1234 5678</p>
            <p className="text-white mb-4"><i className="bi bi-geo-alt-fill text-info me-2"></i> Padre Mariano N° 356, Providencia, Santiago</p>
        </Col>
      </Row>
    </Container>
  );
}