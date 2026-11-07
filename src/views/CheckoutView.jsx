<<<<<<< HEAD
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCart, clearCart, ventasService } from '../services/ventasService';
import { Container, Row, Col, Card, Form, Button, Badge, Alert } from 'react-bootstrap';
import ResumenOrden from '../components/ResumenOrden';
=======
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCart, clearCart } from '../data/ventasService';
import { Container, Row, Col, Card, Form, Button, Badge, Alert } from 'react-bootstrap';
>>>>>>> b6f33c2b6a56b8cb0e288b8632ccb4753ec4a813

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

<<<<<<< HEAD
=======
    const subtotal = cart.reduce((acc, item) => {
        const precio = formData.metodoPago === 'transferencia' 
            ? (item.precioTransferencia || item.precio || 0) 
            : (item.precioNormal || item.precio || 0);
        return acc + (precio * item.qty);
    }, 0);

>>>>>>> b6f33c2b6a56b8cb0e288b8632ccb4753ec4a813
    const handleNextStep = (e) => {
        e.preventDefault();
        if (!formData.nombre || !formData.email || !formData.direccion) {
            alert('Por favor completa los campos obligatorios de envío.');
            return;
        }
        setStep(2);
    };

    const handleFinalizeOrder = () => {
<<<<<<< HEAD
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
=======
        const randomId = 'TR-' + Math.floor(100000 + Math.random() * 900000);
        setOrderId(randomId);
>>>>>>> b6f33c2b6a56b8cb0e288b8632ccb4753ec4a813
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
<<<<<<< HEAD
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
=======
                            Muchas gracias por tu compra, <strong className="text-white">{formData.nombre}</strong>. Hemos registrado tu transacción correctamente.
                        </p>
                        
                        <div className="bg-black p-3 rounded border border-secondary mb-4 text-start d-inline-block mx-auto" style={{minWidth: '300px'}}>
                            <div className="d-flex justify-content-between mb-2"><span className="text-muted">Número de Orden:</span><span className="fw-bold text-warning">{orderId}</span></div>
                            <div className="d-flex justify-content-between mb-2"><span className="text-muted">Correo de contacto:</span><span>{formData.email}</span></div>
                            <div className="d-flex justify-content-between mb-2"><span className="text-muted">Método de Pago:</span><span className="text-uppercase">{formData.metodoPago}</span></div>
                            <div className="d-flex justify-content-between"><span className="text-muted">Envío a:</span><span>{formData.direccion}, {formData.comuna}</span></div>
>>>>>>> b6f33c2b6a56b8cb0e288b8632ccb4753ec4a813
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
<<<<<<< HEAD
                                            placeholder="Ej. Juan Pérez" 
=======
                                            placeholder="Constanza Cerda" 
>>>>>>> b6f33c2b6a56b8cb0e288b8632ccb4753ec4a813
                                            required 
                                            className="bg-secondary text-white border-0"
                                        />
                                    </Form.Group>

                                    <Row className="mb-3">
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
<<<<<<< HEAD
                                                <Form.Label htmlFor="input-email" className="small text-muted">Correo Electrónico *</Form.Label>
                                                <Form.Control 
                                                    id="input-email"
=======
                                                <Form.Label className="small text-muted">Correo Electrónico *</Form.Label>
                                                <Form.Control 
>>>>>>> b6f33c2b6a56b8cb0e288b8632ccb4753ec4a813
                                                    type="email" 
                                                    name="email" 
                                                    value={formData.email} 
                                                    onChange={handleChange} 
<<<<<<< HEAD
                                                    placeholder="juan@correo.com" 
=======
                                                    placeholder="constanza@correo.com" 
>>>>>>> b6f33c2b6a56b8cb0e288b8632ccb4753ec4a813
                                                    required 
                                                    className="bg-secondary text-white border-0"
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
<<<<<<< HEAD
                                                <Form.Label htmlFor="input-telefono" className="small text-muted">Teléfono de Contacto</Form.Label>
                                                <Form.Control 
                                                    id="input-telefono"
=======
                                                <Form.Label className="small text-muted">Teléfono de Contacto</Form.Label>
                                                <Form.Control 
>>>>>>> b6f33c2b6a56b8cb0e288b8632ccb4753ec4a813
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
<<<<<<< HEAD
                                            placeholder="Av. Libertador 1234" 
=======
                                            placeholder="Av. Libertador Bernardo O'Higgins 1234" 
>>>>>>> b6f33c2b6a56b8cb0e288b8632ccb4753ec4a813
                                            required 
                                            className="bg-secondary text-white border-0"
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-4">
<<<<<<< HEAD
                                        <Form.Label htmlFor="input-comuna" className="small text-muted">Comuna / Ciudad</Form.Label>
                                        <Form.Control 
                                            id="input-comuna"
=======
                                        <Form.Label className="small text-muted">Comuna / Ciudad</Form.Label>
                                        <Form.Control 
>>>>>>> b6f33c2b6a56b8cb0e288b8632ccb4753ec4a813
                                            type="text" 
                                            name="comuna" 
                                            value={formData.comuna} 
                                            onChange={handleChange} 
                                            className="bg-secondary text-white border-0"
                                        />
                                    </Form.Group>

                                    <div className="d-grid">
<<<<<<< HEAD
=======
                                        
>>>>>>> b6f33c2b6a56b8cb0e288b8632ccb4753ec4a813
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
<<<<<<< HEAD
                                        <Form.Label htmlFor="select-pago" className="small text-muted fw-bold text-uppercase mb-2">Selecciona Plataforma de Pago:</Form.Label>
                                        <Form.Select 
                                            id="select-pago"
=======
                                        <Form.Label className="small text-muted fw-bold text-uppercase mb-2">Selecciona Plataforma de Pago:</Form.Label>
                                        <Form.Select 
>>>>>>> b6f33c2b6a56b8cb0e288b8632ccb4753ec4a813
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
<<<<<<< HEAD
                                            Confirmar y Pagar 🔒
=======
                                            Pagar ${subtotal.toLocaleString('es-CL')} 🔒
>>>>>>> b6f33c2b6a56b8cb0e288b8632ccb4753ec4a813
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </Card>
                    </Col>

                    <Col lg={5}>
<<<<<<< HEAD
                        <ResumenOrden carrito={cart} esCheckout={true} metodoPago={formData.metodoPago} />
=======
                        <Card className="bg-dark text-white border-secondary shadow-sm p-4">
                            <h4 className="border-bottom border-secondary pb-3 mb-3 fs-5 fw-bold text-warning">
                                Resumen del Pedido
                            </h4>
                            
                            <div className="mb-3" style={{maxHeight: '220px', overflowY: 'auto'}}>
                                {cart.map(item => {
                                    const precio = formData.metodoPago === 'transferencia' 
                                        ? (item.precioTransferencia || item.precio || 0) 
                                        : (item.precioNormal || item.precio || 0);
                                    return (
                                        <div key={item.id} className="d-flex justify-content-between align-items-center mb-2 border-bottom border-secondary pb-2">
                                            <div className="d-flex align-items-center">
                                                <img src={item.imagen} alt={item.nombre} style={{width: '40px', height: '40px', objectFit: 'cover'}} className="rounded me-2" />
                                                <div>
                                                    <span className="small d-block text-truncate" style={{maxWidth: '160px'}}>{item.nombre}</span>
                                                    <small className="text-muted">Cant: {item.qty}</small>
                                                </div>
                                            </div>
                                            <span className="small fw-bold text-warning">${(precio * item.qty).toLocaleString('es-CL')}</span>
                                        </div>
                                    );
                                })}
                            </div>

                            <hr className="border-secondary my-3" />

                            <div className="d-flex justify-content-between align-items-center mb-0 bg-black p-3 rounded border border-secondary">
                                <span className="fw-bold">Total Final:</span>
                                <h4 className="mb-0 text-warning fw-bold">Pagar ${subtotal.toLocaleString('es-CL')}</h4>
                            </div>
                        </Card>
>>>>>>> b6f33c2b6a56b8cb0e288b8632ccb4753ec4a813
                    </Col>
                </Row>
            )}
        </Container>
    );
}