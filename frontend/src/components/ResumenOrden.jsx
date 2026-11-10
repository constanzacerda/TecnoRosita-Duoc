import { Card, ListGroup, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ResumenOrden = ({ carrito, esCheckout = false, metodoPago = 'transferencia' }) => {
    const total = carrito.reduce((acc, item) => {
        const precio = metodoPago === 'transferencia' 
            ? (item.precioTransferencia || item.precio || 0) 
            : (item.precioNormal || item.precio || 0);
        return acc + (precio * item.qty);
    }, 0);

    return (
        <Card className="bg-dark text-white border-secondary shadow-sm">
            <Card.Header className="border-secondary text-warning fw-bold fs-5 pb-3">
                Resumen del Pedido
            </Card.Header>
            <ListGroup variant="flush">
                <div style={{maxHeight: '260px', overflowY: 'auto'}} className="p-3">
                    {carrito.map(item => {
                        const precioItem = metodoPago === 'transferencia' 
                            ? (item.precioTransferencia || item.precio || 0) 
                            : (item.precioNormal || item.precio || 0);
                        return (
                            <div key={item.id} className="d-flex justify-content-between align-items-center mb-2 border-bottom border-secondary pb-2">
                                <div className="d-flex align-items-center">
                                    <img src={item.imagen} alt={item.nombre} style={{width: '40px', height: '40px', objectFit: 'cover'}} className="rounded me-2" />
                                    <div>
                                        <span className="small d-block text-truncate" style={{maxWidth: '150px'}}>{item.nombre}</span>
                                        <small className="text-muted">Cant: {item.qty}</small>
                                    </div>
                                </div>
                                <span className="small fw-bold text-warning">${(precioItem * item.qty).toLocaleString('es-CL')}</span>
                            </div>
                        );
                    })}
                </div>
                <ListGroup.Item className="bg-black text-white border-secondary d-flex justify-content-between align-items-center p-3">
                    <span className="fw-bold">Total Final:</span>
                    <span className="text-warning fw-bold fs-5">Pagar ${total.toLocaleString('es-CL')}</span>
                </ListGroup.Item>
            </ListGroup>
            
            {!esCheckout && (
                <Card.Body>
                    <Button 
                        as={Link} 
                        to="/checkout" 
                        variant="warning" 
                        className="w-100 fw-bold text-dark"
                        disabled={carrito.length === 0}
                    >
                        Proceder al Pago
                    </Button>
                </Card.Body>
            )}
        </Card>
    );
};

export default ResumenOrden;