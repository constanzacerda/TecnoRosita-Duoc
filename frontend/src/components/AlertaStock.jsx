import { Badge } from 'react-bootstrap';

const AlertaStock = ({ stock }) => {
    if (stock <= 0) {
        return <Badge bg="danger" className="p-2">Agotado - Sin Stock</Badge>;
    }
    
    if (stock > 0 && stock <= 5) {
        return <Badge bg="warning" text="dark" className="p-2">¡Últimas {stock} unidades!</Badge>;
    }

    return <Badge bg="success" className="p-2">Stock disponible: {stock}</Badge>;
};

export default AlertaStock;