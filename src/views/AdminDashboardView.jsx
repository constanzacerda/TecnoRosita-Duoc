import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Card, Badge, Row, Col } from 'react-bootstrap';
import { getProductos, eliminarProducto } from '../data/productos'; 

export default function AdminDashboardView() {
    const [productos, setProductos] = useState([]);

    
    useEffect(() => {
        setProductos(getProductos());
    }, []);

    
    const handleDelete = (id) => {
        if(window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
            eliminarProducto(id);
            setProductos(getProductos()); 
        }
    };

    return (
        <Container className="mt-5 text-white mb-5">
            <div className="d-flex justify-content-between align-items-center mb-4 border-bottom border-secondary pb-3">
                <div>
                    <h2 className="fw-bold mb-1">Panel de Administración</h2>
                    <p className="text-muted small mb-0">Gestión de inventario y catálogo de productos — TecnoRosita</p>
                </div>
                <Badge bg="warning" className="text-dark fs-6 px-3 py-2 fw-bold">
                    Total Productos: {productos.length}
                </Badge>
            </div>

            
            <Row className="mb-4">
                <Col md={4}>
                    <Card className="bg-dark text-white border-secondary p-3 shadow-sm">
                        <small className="text-muted text-uppercase">Categorías Activas</small>
                        <h3 className="text-warning fw-bold mt-1">11 Categorías</h3>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="bg-dark text-white border-secondary p-3 shadow-sm">
                        <small className="text-muted text-uppercase">Stock Online Total</small>
                        <h3 className="text-success fw-bold mt-1">
                            {productos.reduce((acc, p) => acc + (p.stockOnline || 0), 0)} Unidades
                        </h3>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="bg-dark text-white border-secondary p-3 shadow-sm">
                        <small className="text-muted text-uppercase">Estado del Sistema</small>
                        <h3 className="text-info fw-bold mt-1">Operativo 🟢</h3>
                    </Card>
                </Col>
            </Row>

            
            <Card className="bg-dark text-white border-secondary shadow-sm">
                <Card.Body className="p-0">
                    <Table variant="dark" responsive align="middle" className="mb-0 text-white">
                        <thead className="bg-black text-uppercase fs-7 text-muted border-bottom border-secondary">
                            <tr>
                                <th className="py-3 ps-3">ID / SKU</th>
                                <th className="py-3">Producto</th>
                                <th className="py-3">Categoría</th>
                                <th className="py-3">Precio Transferencia</th>
                                <th className="py-3 text-center">Stock Online</th>
                                <th className="py-3 text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productos.map(item => {
                                const precioSeguro = item.precioTransferencia || item.precio || 0;
                                const stockSeguro = item.stockOnline !== undefined ? item.stockOnline : 0;

                                return (
                                    <tr key={item.id} className="border-bottom border-secondary">
                                        <td className="ps-3 py-3">
                                            <span className="fw-bold text-warning">#{item.id}</span>
                                            <br />
                                            <small className="text-muted">{item.sku || 'N/A'}</small>
                                        </td>
                                        <td className="py-3">
                                            <div className="d-flex align-items-center">
                                                <img 
                                                    src={item.imagen} 
                                                    alt={item.nombre} 
                                                    style={{ width: '45px', height: '45px', objectFit: 'cover' }} 
                                                    className="rounded border border-secondary me-3" 
                                                />
                                                <div>
                                                    <h6 className="mb-0 fw-bold fs-6 text-truncate" style={{ maxWidth: '280px' }}>{item.nombre}</h6>
                                                    <small className="text-muted">{item.marca || 'Genérica'}</small>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-3">
                                            <Badge bg="secondary" className="text-white">{item.categoria}</Badge>
                                        </td>
                                        <td className="py-3 fw-bold text-light">
                                            ${precioSeguro.toLocaleString('es-CL')}
                                        </td>
                                        <td className="py-3 text-center">
                                            <Badge bg={stockSeguro > 5 ? 'success' : 'danger'}>
                                                {stockSeguro} un.
                                            </Badge>
                                        </td>
                                        <td className="py-3 text-center">
                                            <Button variant="outline-warning" size="sm" className="me-2 text-dark bg-warning border-warning fw-bold">
                                                Editar
                                            </Button>
                                            <Button variant="outline-danger" size="sm" onClick={() => handleDelete(item.id)}>
                                                Eliminar
                                            </Button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </Container>
    );
}