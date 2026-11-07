import React, { useContext, useState, useEffect } from 'react';
import { Container, Button, Table, Card } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';
import { getProductos } from '../data/productos';

const AdminView = () => {
    const { user } = useContext(AuthContext); 
    const esVendedor = user?.rol === 'VENDEDOR';
    
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        setProductos(getProductos());
    }, []);

    return (
        <Container className="mt-5 mb-5 text-white">
            <Card className="bg-dark border-secondary shadow-lg mb-4 p-3">
                <Card.Body className="text-center">
                    <h1 className="text-warning fw-bold" style={{ fontFamily: 'Orbitron, sans-serif', textShadow: '2px 2px 5px rgba(0,0,0,0.8)', fontSize: '2.8rem' }}>
                        ⚙️ Panel de Administración
                    </h1>
                    <p className="text-info fs-5 mb-0 fw-bold">
                        Módulo de Gestión de Inventario
                    </p>
                </Card.Body>
            </Card>

            <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="text-light mb-0">Listado de Productos</h4>
                {!esVendedor && (
                    <Button variant="success" className="fw-bold text-dark shadow-sm">
                        + Nuevo Producto
                    </Button>
                )}
            </div>

            <Table striped bordered hover variant="dark" className="border-secondary shadow-lg">
                <thead>
                    <tr>
                        <th className="text-warning text-center">ID</th>
                        <th className="text-warning">Nombre</th>
                        <th className="text-warning">Categoría</th>
                        <th className="text-warning">Precio</th>
                        <th className="text-warning text-center">Stock</th>
                        {!esVendedor && <th className="text-warning text-center">Acciones</th>}
                    </tr>
                </thead>
                <tbody>
                    {productos.map((prod) => (
                        <tr key={prod.id}>
                            <td className="align-middle text-center fw-bold">{prod.id}</td>
                            <td className="align-middle">{prod.nombre}</td>
                            <td className="align-middle">{prod.categoria || 'Sin categoría'}</td>
                            <td className="align-middle">${(prod.precioTransferencia || prod.precio || 0).toLocaleString('es-CL')}</td>
                            <td className="align-middle text-center">
                                <span className={prod.stockOnline <= 5 ? "badge bg-danger fs-6" : "badge bg-success fs-6 text-dark"}>
                                    {prod.stockOnline !== undefined ? prod.stockOnline : (prod.stock || 0)}
                                </span>
                            </td>
                            
                            {!esVendedor && (
                                <td className="text-center">
                                    <Button variant="warning" size="sm" className="me-2 fw-bold text-dark">Editar</Button>
                                    <Button variant="outline-danger" size="sm">Eliminar</Button>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default AdminView;