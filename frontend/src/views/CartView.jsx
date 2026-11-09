import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge, Table } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { getCart, saveCart } from '../services/ventasService';

export default function CartView() {
    const [cart, setCart] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        setCart(getCart());
    }, []);

    const updateQuantity = (id, delta) => {
        const updatedCart = cart.map(item => {
            if (item.id === id) {
                const newQty = item.qty + delta;
                return { ...item, qty: newQty > 0 ? newQty : 1 }; 
            }
            return item;
        });
        setCart(updatedCart);
        saveCart(updatedCart);
    };

    const removeItem = (id) => {
        const updatedCart = cart.filter(item => item.id !== id);
        setCart(updatedCart);
        saveCart(updatedCart);
    };

    const subtotal = cart.reduce((acc, item) => {
        const precioBase = item.precioNormal || item.precioTransferencia || item.precio || 0;
        return acc + (precioBase * item.qty);
    }, 0);

    const descuentoTransferencia = cart.reduce((acc, item) => {
        const precioNormal = item.precioNormal || item.precio || 0;
        const precioTransf = item.precioTransferencia || item.precio || 0;
        const diferencia = precioNormal > precioTransf ? (precioNormal - precioTransf) : 0;
        return acc + (diferencia * item.qty);
    }, 0);

    const total = subtotal - descuentoTransferencia;

    if (cart.length === 0) {
        return (
            <Container className="mt-5 text-center text-white mb-5" style={{ paddingTop: '50px' }}>
                <h1 style={{ fontSize: '4rem' }}>🛒</h1>
                <h2 className="fw-bold mt-4" style={{ color: '#e8b74d' }}>Tu carrito está vacío</h2>
                <p className="text-muted mb-4">Parece que aún no has añadido ningún producto gamer de élite.</p>
                <Link to="/productos">
                    <Button variant="warning" size="lg" className="fw-bold text-dark">
                        Explorar Catálogo
                    </Button>
                </Link>
            </Container>
        );
    }

    return (
        <Container className="mt-5 text-white mb-5">
            <h2 className="fw-bold mb-4" style={{ color: '#e8b74d', fontFamily: 'Orbitron, sans-serif' }}>
                Mi Carrito de Compras
            </h2>

            <Row>
                <Col lg={8} className="mb-4">
                    <Card className="bg-dark text-white border-secondary shadow-sm">
                        <Card.Body className="p-0">
                            <Table variant="dark" responsive className="align-middle mb-0 text-white border-secondary">
                                <thead className="bg-black text-muted text-uppercase fs-7 border-bottom border-secondary">
                                    <tr>
                                        <th className="ps-4 py-3">Producto</th>
                                        <th className="py-3 text-center">Precio Unit.</th>
                                        <th className="py-3 text-center">Cantidad</th>
                                        <th className="py-3 text-end pe-4">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cart.map(item => {
                                        const precioBase = item.precioNormal || item.precioTransferencia || item.precio || 0;
                                        return (
                                            <tr key={item.id} className="border-bottom border-secondary">
                                                <td className="ps-4 py-4">
                                                    <div className="d-flex align-items-center">
                                                        <img src={item.imagen} alt={item.nombre} style={{ width: '60px', height: '60px', objectFit: 'cover' }} className="rounded me-3 border border-secondary" />
                                                        <div>
                                                            <h6 className="fw-bold mb-1 text-truncate" style={{ maxWidth: '250px' }}>{item.nombre}</h6>
                                                            <small className="text-muted">{item.categoria}</small>
                                                            <br />
                                                            <Button variant="link" className="text-danger p-0 text-decoration-none small mt-1" onClick={() => removeItem(item.id)}>
                                                                Eliminar
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="py-4 text-center text-light fw-bold">
                                                    ${precioBase.toLocaleString('es-CL')}
                                                </td>
                                                <td className="py-4 text-center">
                                                    <div className="d-inline-flex align-items-center bg-black rounded border border-secondary p-1">
                                                        <Button variant="outline-secondary" size="sm" className="border-0 text-white" onClick={() => updateQuantity(item.id, -1)} disabled={item.qty <= 1}>
                                                            -
                                                        </Button>
                                                        <span className="mx-3 fw-bold">{item.qty}</span>
                                                        <Button variant="outline-secondary" size="sm" className="border-0 text-white" onClick={() => updateQuantity(item.id, 1)}>
                                                            +
                                                        </Button>
                                                    </div>
                                                </td>
                                                <td className="py-4 text-end pe-4 text-warning fw-bold fs-5">
                                                    ${(precioBase * item.qty).toLocaleString('es-CL')}
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>

                <Col lg={4}>
                    <Card className="bg-dark text-white border-secondary shadow-sm p-4 sticky-top" style={{ top: '110px' }}>
                        <h4 className="border-bottom border-secondary pb-3 mb-4 fs-5 fw-bold text-warning">
                            Resumen de Compra
                        </h4>

                        <div className="d-flex justify-content-between mb-3 text-light">
                            <span>Subtotal ({cart.reduce((a, c) => a + c.qty, 0)} artículos):</span>
                            <span>${subtotal.toLocaleString('es-CL')}</span>
                        </div>

                        <div className="d-flex justify-content-between mb-3 text-success">
                            <span>Dcto. Transferencia:</span>
                            <span>- ${descuentoTransferencia.toLocaleString('es-CL')}</span>
                        </div>

                        <div className="d-flex justify-content-between mb-4 text-light">
                            <span>Costo de Envío:</span>
                            <Badge bg="success" className="px-2 py-1">GRATIS</Badge>
                        </div>

                        <hr className="border-secondary my-4" />

                        <div className="d-flex justify-content-between align-items-center mb-4 bg-black p-3 rounded border border-secondary">
                            <span className="fw-bold fs-5">Total a Pagar:</span>
                            <h3 className="mb-0 text-warning fw-bold">${total.toLocaleString('es-CL')}</h3>
                        </div>

                        <Button 
                            variant="warning" 
                            size="lg" 
                            className="w-100 text-dark fw-bold mb-3 py-3" 
                            onClick={() => navigate('/checkout')}
                        >
                            Ir a Pagar 🔒
                        </Button>
                        
                        <Link to="/productos">
                            <Button variant="outline-light" className="w-100 border-secondary">
                                Seguir Comprando
                            </Button>
                        </Link>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}