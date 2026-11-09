import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCart, clearCart, ventasService } from '../services/ventasService';
import { Container, Row, Col, Card, Form, Button, Badge, Alert } from 'react-bootstrap';
import ResumenOrden from '../components/ResumenOrden';

export default function CheckoutView() {
    const [cart, setCart] = useState([]);
    const [step, setStep] = useState(1); 
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        telefono: '',
        direccion: '',
        comuna: 'Santiago',
        metodoPago: 'transferencia'
    });
    const [orderId, setOrderId] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const currentCart = getCart();
        setCart(currentCart);
        if (currentCart.length === 0 && step !== 3) {
            navigate('/');
        }
    }, [navigate, step]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleNextStep = (e) => {
        e.preventDefault();
        if (!formData.nombre || !formData.email || !formData.direccion) {
            alert('Por favor completa los campos obligatorios de envío.');
            return;
        }
        setStep(2);
    };

    const handleFinalizeOrder = () => {
        const subtotal = cart.reduce((acc, item) => {
            const precio = formData.metodoPago === 'transferencia' 
                ? (item.precioTransferencia || item.precio || 0) 
                : (item.precioNormal || item.precio || 0);
            return acc + (precio * item.qty);
        }, 0);

        const nuevaOrden = {
            usuario: { nombre: formData.nombre, email: formData.email },
            direccion: `${formData.direccion}, ${formData.comuna}`,
            metodoPago: formData.metodoPago,
            productos: cart,
            total: subtotal
        };

        const ordenGuardada = ventasService.crearOrden(nuevaOrden);
        setOrderId(ordenGuardada.id);
        clearCart(); 
        setStep(3); 
    };

    return (
        <Container className="mt-5 text-white mb-5" data-testid="checkout-form">
            <div className="text-center mb-5">
                <h2 className="fw-bold">Finalizar Compra</h2>
                <p className="text-muted">Completa los datos de tu orden para procesar tu compra de forma segura</p>
            </div>

            {step === 3 ? (
                <Row className="justify-content-center">
                  <Col md={8}>
                    <Card className="bg-dark text-white border-secondary text-center p-5 shadow-sm">
                        <div className="mb-4"><span style={{ fontSize: '4rem' }}>🎉</span></div>
                        <h3 className="text-warning fw-bold mb-3">¡Compra Realizada con Éxito!</h3>
                        <p className="text-muted mb-4">
                            Muchas gracias por tu compra, <strong className="text-white">{formData.nombre}</strong>. Hemos registrado tu transacción.
                        </p>
                        
                        <div className="bg-black p-3 rounded border border-secondary mb-4 text-start d-inline-block mx-auto" style={{minWidth: '300px'}}>
                            <div className="d-flex justify-content-between mb-2">
                                <span className="text-muted">Número de Orden:</span>
                                <span className="fw-bold text-warning">{orderId}</span>
                            </div>
                            <div className="d-flex justify-content-between mb-2">
                                <span className="text-muted">Correo de contacto:</span>
                                <span>{formData.email}</span>
                            </div>
                            <div className="d-flex justify-content-between mb-2">
                                <span className="text-muted">Método de Pago:</span>
                                <span className="text-uppercase">{formData.metodoPago}</span>
                            </div>
                            <div className="d-flex justify-content-between">
                                <span className="text-muted">Envío a:</span>
                                <span>{formData.direccion}, {formData.comuna}</span>
                            </div>
                        </div>

                        <div className="d-grid gap-2 col-md-6 mx-auto">
                            <Button variant="warning" className="text-dark fw-bold py-2" onClick={() => navigate('/')}>
                                Volver al Inicio
                            </Button>
                        </div>
                    </Card>
                  </Col>
                </Row>
            ) : (
                <Row>
                    <Col lg={7} className="mb-4 mb-lg-0">
                        <Card className="bg-dark text-white border-secondary shadow-sm p-4">
                            <div className="d-flex justify-content-between align-items-center mb-4 border-bottom border-secondary pb-3">
                                <h4 className="mb-0 fs-5 fw-bold text-warning">
                                    {step === 1 ? 'Información de Envío' : '2. Método de Pago y Confirmación'}
                                </h4>
                                <Badge bg={step === 1 ? 'warning' : 'success'} className="text-dark fw-bold">
                                    Paso {step} de 2
                                </Badge>
                            </div>

                            {step === 1 ? (
                                <Form onSubmit={handleNextStep}>
                                    <Form.Group className="mb-3">
                                        <Form.Label htmlFor="input-nombre" className="small text-muted">Nombre Completo</Form.Label>
                                        <Form.Control 
                                            id="input-nombre"
                                            type="text" 
                                            name="nombre" 
                                            value={formData.nombre} 
                                            onChange={handleChange} 
                                            placeholder="Ej. Juan Pérez" 
                                            required 
                                            className="bg-secondary text-white border-0"
                                        />
                                    </Form.Group>

                                    <Row className="mb-3">
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label htmlFor="input-email" className="small text-muted">Correo Electrónico *</Form.Label>
                                                <Form.Control 
                                                    id="input-email"
                                                    type="email" 
                                                    name="email" 
                                                    value={formData.email} 
                                                    onChange={handleChange} 
                                                    placeholder="juan@correo.com" 
                                                    required 
                                                    className="bg-secondary text-white border-0"
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label htmlFor="input-telefono" className="small text-muted">Teléfono de Contacto</Form.Label>
                                                <Form.Control 
                                                    id="input-telefono"
                                                    type="text" 
                                                    name="telefono" 
                                                    value={formData.telefono} 
                                                    onChange={handleChange} 
                                                    placeholder="+56 9 1234 5678" 
                                                    className="bg-secondary text-white border-0"
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Form.Group className="mb-3">
                                        <Form.Label htmlFor="input-direccion" className="small text-muted">Dirección de Envío</Form.Label>
                                        <Form.Control 
                                            id="input-direccion"
                                            type="text" 
                                            name="direccion" 
                                            value={formData.direccion} 
                                            onChange={handleChange} 
                                            placeholder="Av. Libertador 1234" 
                                            required 
                                            className="bg-secondary text-white border-0"
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-4">
                                        <Form.Label htmlFor="input-comuna" className="small text-muted">Comuna / Ciudad</Form.Label>
                                        <Form.Control 
                                            id="input-comuna"
                                            type="text" 
                                            name="comuna" 
                                            value={formData.comuna} 
                                            onChange={handleChange} 
                                            className="bg-secondary text-white border-0"
                                        />
                                    </Form.Group>

                                    <div className="d-grid">
                                        <Button type="submit" variant="warning" size="lg" className="text-dark fw-bold">
                                            Siguiente paso ➔
                                        </Button>
                                    </div>
                                </Form>
                            ) : (
                                <div>
                                    <Alert variant="secondary" className="bg-secondary text-white border-0 mb-4">
                                        <small>📍 Envío registrado para: <strong>{formData.direccion}, {formData.comuna}</strong></small>
                                    </Alert>

                                    <Form.Group className="mb-4">
                                        <Form.Label htmlFor="select-pago" className="small text-muted fw-bold text-uppercase mb-2">Selecciona Plataforma de Pago:</Form.Label>
                                        <Form.Select 
                                            id="select-pago"
                                            name="metodoPago"
                                            className="bg-secondary text-white border-secondary py-2 mb-3" 
                                            value={formData.metodoPago} 
                                            onChange={handleChange}
                                        >
                                            <option value="transferencia">Transferencia Bancaria Directa</option>
                                            <option value="webpay">Webpay Plus</option>
                                        </Form.Select>
                                    </Form.Group>

                                    <div className="d-flex gap-2">
                                        <Button variant="outline-light" className="w-50 border-secondary" onClick={() => setStep(1)}>
                                            ← Volver a Envío
                                        </Button>
                                        <Button variant="warning" className="w-50 text-dark fw-bold" onClick={handleFinalizeOrder}>
                                            Confirmar y Pagar 🔒
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </Card>
                    </Col>

                    <Col lg={5}>
                        <ResumenOrden carrito={cart} esCheckout={true} metodoPago={formData.metodoPago} />
                    </Col>
                </Row>
            )}
        </Container>
    );
}