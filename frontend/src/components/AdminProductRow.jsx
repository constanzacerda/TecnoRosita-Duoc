import { Button } from 'react-bootstrap';

const AdminProductRow = ({ producto, esVendedor }) => {
    return (
        <tr>
            <td className="text-white">{producto.id}</td>
            <td className="text-white">{producto.nombre}</td>
            <td className="text-white">${producto.precio.toLocaleString('es-CL')}</td>
            <td className="text-white">
                <span className={producto.stock === 0 ? "text-danger fw-bold" : "text-success"}>
                    {producto.stock}
                </span>
            </td>
            
           
            {!esVendedor && (
                <td>
                    <Button variant="outline-warning" size="sm" className="me-2">Editar</Button>
                    <Button variant="outline-danger" size="sm">Eliminar</Button>
                </td>
            )}
        </tr>
    );
};

export default AdminProductRow;