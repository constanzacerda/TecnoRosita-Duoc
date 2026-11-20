# TecnoRosita — Plataforma E-Commerce Full-Stack (DSY1104)

Aplicación web de comercio electrónico especializada en periféricos y hardware gamer, desarrollada como proyecto académico 
para **Desarrollo Fullstack II (Duoc UC)** por **Constanza Camila Cerda Bravo** y **Juan Carlos Alvarado Ortega**.

El sistema integra un **Frontend SPA en React + Vite** conectado mediante **Axios + JWT** a una **API REST en Spring Boot** y 
persistencia relacional en **MySQL (`tecnorosita_v2`)**.


## Credenciales de Prueba (tecnorosita_v2)
| Perfil | Correo | Contraseña | |---|---|---|
| Administrador | admin@tecnorosita | admin123 |   Acceso total a /admin y /admin/productos, CRUD de productos, métricas y usuarios.
| Vendedor | vendedor@tecnorosita.cl | vende123 |  Acceso a /admin/productos en modo lectura (productos y boletas). Bloqueado en /admin.
| Cliente | cliente@correo.cl| cliente1 |  Registro desde /registroDefinida al registrarCompra en catálogo, carrito y generación de boleta. Bloqueado en vistas admin


## Cómo ejecutar
Abrir `index.html` en el navegador. Para reiniciar datos: F12 → Application → Local Storage → Clear.


## Instrucciones paso a paso para levantar el proyecto:

Levantar MySQL (tecnorosita_v2) y el backend (TecnoRosita-Backend en puerto 8080).

1.- Entrar a frontend/
2.- Instalar dependencias:  npm install
3.- Ejecutar pruebas:   npm test (con Vitest) y 
4.- Levantar el servidor:  npm run dev


---

## 1. Arquitectura y Stack Tecnológico

* **Frontend:** React, Vite, React Router DOM, React Bootstrap, Axios, `jwt-decode`.
* **Backend:** Java, Spring Boot, Spring Security (JWT), Spring Data JPA / Hibernate (`http://localhost:8080/api/v1`).
* **Base de Datos:** MySQL (`tecnorosita_v2`).
* **Pruebas Unitarias:** Vitest + React Testing Library (`jsdom`).

### Estructura del Proyecto (`frontend/`)

```text
frontend/
├── src/
│   ├── __tests__/              # Pruebas unitarias automatizadas (Vitest)
│   │   ├── Checkout.test.jsx
│   │   ├── ProductCard.test.jsx
│   │   └── ventasService.test.js
│   ├── components/             # Componentes reutilizables y seguridad de rutas
│   │   ├── AdminProductRow.jsx
│   │   ├── MenuNavegacion.jsx  # Renderizado condicional por rol y contador de carrito
│   │   ├── ProductCard.jsx
│   │   ├── ProtectedRoute.jsx  # Protección de rutas privadas por rol
│   │   └── ResumenOrden.jsx
│   ├── context/                # Estado global de autenticación (AuthContext)
│   ├── services/               # Interceptores JWT y consumo de API REST
│   │   ├── api.js
│   │   ├── authService.js
│   │   ├── productoService.js
│   │   └── ventasService.js
│   └── views/                      # Vistas principales de la aplicación
│       ├── AdminDashboardView.jsx  # /admin (Exclusivo ADMINISTRADOR)
│       ├── AdminView.jsx           # /admin/productos (ADMINISTRADOR y VENDEDOR)
│       ├── BlogView.jsx
│       ├── CartView.jsx
│       ├── CategoriasView.jsx
│       ├── CheckoutView.jsx        # Flujo de compra en 3 pasos + Boleta electrónica
│       ├── ContactoView.jsx
│       ├── HomeView.jsx
│       ├── LoginView.jsx
│       ├── ProductDetailView.jsx
│       └── RegistroView.jsx
├── package.json
└── vite.config.js




## 2. Funcionalidades Implementadas (Cobertura de Rúbrica)

Control de Acceso y Renderizado Condicional por Rol

>>  Autenticación JWT: 
Inicio de sesión y registro con almacenamiento seguro de token, decodificación de claims (sub, rol) e interceptores Axios que adjuntan Authorization: Bearer <token> y gestionan expiración (401) o falta de permisos (403).

>> Rutas Protegidas ProtectedRoute:
1-  /admin (Dashboard Admin): 
Exclusivo para ADMINISTRADOR. Muestra métricas en tiempo real (categorías activas, stock total, órdenes/boletas y cuentas registradas), catálogo en MySQL con CRUD completo y listado de usuarios registrados.

2.-  /admin/productos (Gestión de Tienda): Compartido entre ADMINISTRADOR (control total CRUD) y VENDEDOR (modo lectura: consulta de inventario y órdenes/boletas sin acciones de creación, edición ni eliminación).

3.-  Usuarios con rol CLIENTE o no autenticados son bloqueados/redirigidos al intentar acceder manualmente a rutas administrativas.



Sistema Avanzado de Filtros de Inventario

Implementado tanto en /admin como en /admin/productos con filtrado en tiempo real y restablecimiento en un clic:

Búsqueda por ID de producto (coincidencia exacta o parcial).
Búsqueda por Nombre del producto.
Filtro por Categoría dinámica desde MySQL. 
Filtro por Estado de stock (Todos, Con stock > 0, Stock bajo ≤ 5, Sin stock = 0). 
Filtro por Rango de precio (CLP) (Precio mínimo y Precio máximo).


Flujo de Compra, Boleta Electrónica y Descuento de Stock

Gestión completa de carrito persistente con actualización reactiva en la barra de navegación.

Checkout en 3 pasos (/checkout):
1.- Validación de datos de envío del cliente. 
2.- Selección de método de pago y confirmación. 
3.- Emisión de Boleta Electrónica detallada con folio único, datos del cliente, desglose de productos y registro real en MySQL con descuento automático de stock.


## 3 Guía de Instalación y Ejecución (Clonado en Otro Computador)

Para ejecutar el proyecto sin errores en cualquier equipo nuevo, sigue este orden:

Requisitos Previos
- Node.js (v18 o superior) y npm
- Java JDK 17+ y Maven (para el backend Spring Boot)
- MySQL Server activo con la base de datos tecnorosita_v2


>>  Paso 1: Clonar los repositoriosBash
git clone  https://github.com/juancajk/TecnoRosita-Duoc.git
git clone https://github.com/constanzacerda/TecnoRosita-Backend.git


>>  Paso 2: Levantar el Backend (Spring Boot)
- Verifica que MySQL esté corriendo y que exista la base de datos tecnorosita_v2.
- Inicia el proyecto TecnoRosita-Backend (puerto 8080).


>>  Paso 3: Instalar dependencias y ejecutar el Frontend
cd TecnoRosita-Duoc/frontend
npm install
npm run dev
La aplicación quedará disponible en http://localhost:5173.5. 



## 4 Ejecución de Pruebas Unitarias (Vitest)

Desde la carpeta frontend/:
npm test
Cobertura actual de pruebas automatizadas (15/15 aprobadas):

- ProductCard.test.jsx (5 tests): Renderizado de título, categoría, precio formateado, stock disponible y bloqueo de botón cuando el stock es 0.
- ventasService.test.js (6 tests): Persistencia/limpieza de carrito, generación de órdenes con prefijo ORD- y registro de usuarios evitando duplicados por correo.

- Checkout.test.jsx (4 tests): Renderizado de formulario, actualización controlada de inputs, validación de campos obligatorios y cálculo de totales en el paso de pago.