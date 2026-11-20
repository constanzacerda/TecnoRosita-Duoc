import { Button } from 'react-bootstrap';

const AdminProductRow = ({ producto, esVendedor, onEditar, onEliminar }) => {
  const stockActual =
    producto.stock !== undefined
      ? producto.stock
      : producto.stockOnline !== undefined
      ? producto.stockOnline
      : 0;

  const precioActual =
    producto.precio !== undefined
      ? producto.precio
      : producto.precioTransferencia || 0;

  const getStockEstilo = () => {
    if (stockActual <= 0) {
      return { backgroundColor: '#fee2e2', color: '#b91c1c' };
    }
    if (stockActual <= 5) {
      return { backgroundColor: '#fef3c7', color: '#b45309' };
    }
    return { backgroundColor: '#dcfce7', color: '#15803d' };
  };

  const estiloStock = getStockEstilo();

  return (
    <tr style={{ backgroundColor: '#ffffff' }}>
      <td className="text-center fw-bold py-3" style={{ color: '#0071e3' }}>
        {producto.id}
      </td>
      <td className="py-3 fw-semibold" style={{ color: '#1d1d1f' }}>
        {producto.nombre}
      </td>
      <td className="py-3 fw-bold" style={{ color: '#1d1d1f' }}>
        ${precioActual.toLocaleString('es-CL')}
      </td>
      <td className="text-center py-3">
        <span
          style={{
            display: 'inline-block',
            backgroundColor: estiloStock.backgroundColor,
            color: estiloStock.color,
            fontWeight: 700,
            fontSize: '0.82rem',
            padding: '4px 12px',
            borderRadius: '999px'
          }}
        >
          {stockActual}
        </span>
      </td>

      {!esVendedor && (
        <td className="text-center py-3">
          <button
            type="button"
            onClick={() => onEditar && onEditar(producto)}
            style={{
              padding: '6px 14px',
              borderRadius: '999px',
              border: '1.5px solid #0071e3',
              backgroundColor: '#eff6ff',
              color: '#0071e3',
              fontWeight: 600,
              fontSize: '0.82rem',
              cursor: 'pointer',
              marginRight: '8px'
            }}
          >
            Editar
          </button>

          <button
            type="button"
            onClick={() => onEliminar && onEliminar(producto.id)}
            style={{
              padding: '6px 14px',
              borderRadius: '999px',
              border: '1.5px solid #fecaca',
              backgroundColor: '#fef2f2',
              color: '#dc2626',
              fontWeight: 600,
              fontSize: '0.82rem',
              cursor: 'pointer'
            }}
          >
            Eliminar
          </button>
        </td>
      )}
    </tr>
  );
};

export default AdminProductRow;