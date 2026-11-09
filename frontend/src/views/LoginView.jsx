import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';

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

        try {
            
            const exito = await login(credenciales);
            
            if (exito) {
                navigate('/'); 
            } else {
                setError('Credenciales inválidas. Verifica tu correo o contraseña.');
            }
        } catch (err) {
            setError('Error de conexión con el servidor de TecnoRosita.');
        } finally {
            setLoading(false);
        }
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