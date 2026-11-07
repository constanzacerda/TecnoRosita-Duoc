import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';
import { ventasService } from '../services/ventasService';
// import { loginUser } from '../services/authService';

const LoginView = () => {
    const [credenciales, setCredenciales] = useState({ username: '', password: '' });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredenciales({ ...credenciales, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        // --- SIMULACIÓN TEMPORAL (Borrar cuando conectemos Spring Boot) ---
        setTimeout(() => {
            // 1. Verificamos los roles fijos de administración
            if (credenciales.username === 'admin' && credenciales.password === 'admin123') {
                login('token-falso-admin', { username: 'Juan Carlos', rol: 'ADMIN', email: 'admin@tecnorosita.cl' });
                navigate('/admin'); 
                setLoading(false);
                return;
            } 
            
            if (credenciales.username === 'vendedor' && credenciales.password === 'vend123') {
                login('token-falso-vendedor', { username: 'Constanza', rol: 'VENDEDOR', email: 'vendedor@tecnorosita.cl' });
                navigate('/admin'); 
                setLoading(false);
                return;
            }

           
            const usuariosGuardados = ventasService.obtenerUsuarios();
            const usuarioEncontrado = usuariosGuardados.find(
                u => (u.email === credenciales.username || u.username === credenciales.username) && u.password === credenciales.password
            );

            if (usuarioEncontrado) {
                login(`token-falso-${usuarioEncontrado.id}`, usuarioEncontrado);
                navigate('/'); 
            } else {
                setError('Credenciales inválidas. Verifica tu correo o contraseña.');
            }
            
            setLoading(false);
        }, 800);
        // -------------------------------------------------------------------

        /* --- LÓGICA REAL (Descomentar cuando Spring Boot esté listo) ---
        try {
            const data = await loginUser(credenciales);
            login(data.token, data.usuario); 
            navigate('/'); 
        } catch (err) {
            setError('Credenciales inválidas o error de conexión con el servidor.');
        } finally {
            setLoading(false);
        }
        ------------------------------------------------------------------- */
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
            <Card className="p-4 bg-dark text-white border-secondary shadow-lg" style={{ width: '100%', maxWidth: '400px' }}>
                <h3 className="text-center mb-4 text-warning fw-bold">Iniciar Sesión</h3>
                
                {error && <Alert variant="danger">{error}</Alert>}
                
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label className="small text-muted">Usuario o Correo</Form.Label>
                        <Form.Control 
                            type="text" 
                            name="username"
                            placeholder="Ej. admin o tu@correo.com" 
                            value={credenciales.username}
                            onChange={handleChange}
                            required 
                            className="bg-secondary text-white border-0"
                        />
                    </Form.Group>

                    <Form.Group className="mb-4">
                        <Form.Label className="small text-muted">Contraseña</Form.Label>
                        <Form.Control 
                            type="password" 
                            name="password"
                            placeholder="******" 
                            value={credenciales.password}
                            onChange={handleChange}
                            required 
                            className="bg-secondary text-white border-0"
                        />
                    </Form.Group>

                    <Button variant="warning" type="submit" className="w-100 fw-bold text-dark" disabled={loading}>
                        {loading ? 'Ingresando...' : 'Entrar a TecnoRosita'}
                    </Button>
                </Form>
                <div className="text-center mt-4 border-top border-secondary pt-3">
                    <small className="text-muted">¿No tienes cuenta? <Link to="/registro" className="text-warning fw-bold text-decoration-none">Regístrate aquí</Link></small>
                </div>
            </Card>
        </Container>
    );
};

export default LoginView;
