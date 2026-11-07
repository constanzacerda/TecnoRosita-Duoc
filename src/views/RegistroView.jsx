import React, { useState, useContext } from 'react';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ventasService } from '../services/ventasService';
// import { registerUser } from '../services/authService'; // Comentado hasta tener Spring Boot

export default function RegistroView() {
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // --- SIMULACIÓN TEMPORAL (Borrar cuando conectemos Spring Boot) ---
        setTimeout(() => {
            const usuariosGuardados = ventasService.obtenerUsuarios();
            const existe = usuariosGuardados.find(u => u.email === formData.email);

            if (existe) {
                setError('Error al registrar el usuario. El correo ya está en uso.');
                setLoading(false);
                return;
            }

            // Crear nuevo usuario con rol CLIENTE por defecto
            const nuevoUsuario = {
                username: formData.nombre,
                email: formData.email,
                password: formData.password,
                rol: 'CLIENTE'
            };

            ventasService.guardarUsuario(nuevoUsuario);
            
            // Auto-login después del registro
            login('token-falso-cliente', nuevoUsuario);
            navigate('/'); // Redirige al inicio
            setLoading(false);
        }, 800);
        // -------------------------------------------------------------------

        /* --- LÓGICA REAL (Descomentar cuando Spring Boot esté listo) ---
        try {
            await registerUser(formData);
            // Si el registro es exitoso, podrías loguearlo directo o mandarlo al login
            navigate('/login'); 
        } catch (err) {
            setError('Error al registrar el usuario. El correo podría estar en uso.');
        } finally {
            setLoading(false);
        }
        ------------------------------------------------------------------- */
    };

    return (
        <Container className="d-flex justify-content-center align-items-center mt-5 mb-5" style={{ minHeight: '75vh' }}>
            <Card className="bg-dark text-white border-secondary shadow-lg p-4" style={{ width: '400px' }}>
                <h3 className="text-warning fw-bold text-center mb-4">Crear Cuenta</h3>
                
                {error && <Alert variant="danger" className="p-2 text-center">{error}</Alert>}
                
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label className="small text-white">Nombre Completo</Form.Label>
                        <Form.Control 
                            type="text" 
                            name="nombre"
                            placeholder="Ej. Juan Carlos Alvarado" 
                            value={formData.nombre}
                            onChange={handleChange}
                            required
                            className="bg-light text-dark border-0"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label className="small text-white">Correo Electrónico</Form.Label>
                        <Form.Control 
                            type="email" 
                            name="email"
                            placeholder="tu@correo.com" 
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="bg-secondary text-white border-0"
                        />
                    </Form.Group>

                    <Form.Group className="mb-4">
                        <Form.Label className="small text-white">Contraseña</Form.Label>
                        <Form.Control 
                            type="password" 
                            name="password"
                            placeholder="******" 
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="bg-secondary text-white border-0"
                        />
                    </Form.Group>

                    <Button variant="warning" type="submit" className="w-100 fw-bold text-dark mb-3" disabled={loading}>
                        {loading ? 'Registrando...' : 'Registrarse'}
                    </Button>
                </Form>

                <div className="text-center mt-2">
                    <small className="text-white">¿Ya tienes cuenta? <Link to="/login" className="text-info text-decoration-none">Inicia sesión aquí</Link></small>
                </div>
            </Card>
        </Container>
    );
}