

# 🛒 TecnoRosita — Plataforma E-Commerce Full-Stack (DSY1104)

**Aplicación web de comercio electrónico especializada en periféricos y hardware gamer**  
Proyecto académico para **Desarrollo Fullstack II (Duoc UC)**  
Desarrollado por **Constanza Camila Cerda Bravo** y **Juan Carlos Alvarado Ortega**


![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![React Bootstrap](https://img.shields.io/badge/React_Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-Auth-111827?style=for-the-badge&logo=jsonwebtokens&logoColor=e8b74d)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-22c55e?style=for-the-badge&logo=springboot&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-tecnorosita__v2-0ea5e9?style=for-the-badge&logo=mysql&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-15%2F15_Aprobadas-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)


---

> [!IMPORTANT]
> El sistema integra un **Frontend SPA en React + Vite** conectado mediante **Axios + JWT** a una **API REST en Spring Boot** (`http://localhost:8080/api/v1`) con persistencia relacional en **MySQL (`tecnorosita_v2`)**.

---

## 🔐 Credenciales de Prueba (`tecnorosita_v2`)

| Perfil | Correo | Contraseña | Permisos y Alcance |
| :--- | :--- | :--- | :--- |
| ![Administrador](https://img.shields.io/badge/ADMINISTRADOR-e8b74d?style=flat-square) | `admin@tecnorosita.cl` | `admin123` | Acceso total a `/admin` y `/admin/productos`, CRUD de productos, métricas y usuarios. |
| ![Vendedor](https://img.shields.io/badge/VENDEDOR-0ea5e9?style=flat-square) | `vendedor@tecnorosita.cl` | `vende123` | Acceso a `/admin/productos` en **modo lectura** (productos y boletas). Bloqueado en `/admin`. |
| ![Cliente](https://img.shields.io/badge/CLIENTE-8b5cf6?style=flat-square) | `cliente@correo.cl` | `cliente123` | Registro desde `/registro`. Compra en catálogo, carrito y generación de boleta. Bloqueado en vistas admin. |

---

## ⚡ Inicio Rápido


> **Resumen para levantar el proyecto:**
> Levantar **MySQL (`tecnorosita_v2`)** y el backend (**`TecnoRosita-Backend`** en el puerto **`8080`**). Luego ejecuta en orden:
> 1. Entrar a `frontend/`
> 2. Instalar dependencias: `npm install`
> 3. Ejecutar pruebas (con Vitest): `npm test`
> 4. Levantar el servidor: `npm run dev`


> **Reinicio rápido de datos locales en el navegador:** `index.html` → `F12` → **Application** → **Local Storage** → **Clear**.

---

## 🏗️ 1. Arquitectura y Stack Tecnológico

| Capa | Tecnologías Utilizadas | Detalle / Punto de Conexión |
| :--- | :--- | :--- |
| **Frontend** | React, Vite, React Router DOM, React Bootstrap, Axios, `jwt-decode` | SPA interactiva en `http://localhost:5173` |
| **Backend** | Java, Spring Boot, Spring Security (JWT), Spring Data JPA / Hibernate | API REST en `http://localhost:8080/api/v1` |
| **Base de Datos** | MySQL | Esquema relacional `tecnorosita_v2` |
| **Pruebas Unitarias** | Vitest + React Testing Library (`jsdom`) | Suite automatizada con `15/15` tests aprobados |

### 📁 Estructura del Proyecto (`frontend/`)

```text
frontend/
├── src/
│   ├── __tests__/                  # Pruebas unitarias automatizadas (Vitest)
│   │   ├── Checkout.test.jsx
│   │   ├── ProductCard.test.jsx
│   │   └── ventasService.test.js
│   ├── components/                 # Componentes reutilizables y seguridad de rutas
│   │   ├── AdminProductRow.jsx
│   │   ├── MenuNavegacion.jsx      # Renderizado condicional por rol y contador de carrito
│   │   ├── ProductCard.jsx
│   │   ├── ProtectedRoute.jsx      # Protección de rutas privadas por rol
│   │   └── ResumenOrden.jsx
│   ├── context/                    # Estado global de autenticación (AuthContext)
│   ├── services/                   # Interceptores JWT y consumo de API REST
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
```

------------------------------------------------------------
------------------------------------------------------------

## 🚀 2. Guía de Instalación y Ejecución (Clonado en Otro Computador)

Para ejecutar el proyecto sin errores en cualquier equipo nuevo, sigue este orden:


### 📋 Requisitos Previos
* **Node.js** (`v18` o superior) y **npm**
* **Java JDK 17+** y **Maven** (para el backend Spring Boot)
* **MySQL Server** activo con la base de datos `tecnorosita_v2`


> [!WARNING]
> Asegúrate de levantar primero **MySQL** y **`TecnoRosita-Backend`** en el puerto `8080`, y ejecutar los comandos de `npm` siempre dentro de la carpeta **`frontend/`**.

### Paso 1: Clonar los repositorios
```bash
git clone [https://github.com/juancajk/TecnoRosita-Duoc.git](https://github.com/juancajk/TecnoRosita-Duoc.git)
git clone [https://github.com/constanzacerda/TecnoRosita-Backend.git](https://github.com/constanzacerda/TecnoRosita-Backend.git)
```

### Paso 2: Levantar el Backend (Spring Boot)
1. Verifica que **MySQL** esté corriendo y que exista la base de datos **`tecnorosita_v2`**.
2. Inicia el proyecto **`TecnoRosita-Backend`** (puerto **`8080`**).

### Paso 3: Instalar dependencias y ejecutar el Frontend
```bash
cd TecnoRosita-Duoc/frontend
npm install
npm run dev
```

La aplicación quedará disponible en **`http://localhost:5173`**.


------------------------------------------------------------
------------------------------------------------------------

## 🧪 3. Ejecución de Pruebas Unitarias (Vitest)

Desde la carpeta `frontend/`:

```bash
npm test
```

### 📊 Cobertura Actual de Pruebas Automatizadas (`15/15` aprobadas)

| Archivo de Prueba | Cantidad | Cobertura Validada |
| :--- | :---: | :--- |
| `ProductCard.test.jsx` | ![5 tests](https://img.shields.io/badge/5_tests-22c55e?style=flat-square) | Renderizado de título, categoría, precio formateado, stock disponible y bloqueo de botón cuando el stock es `0`. |
| `ventasService.test.js` | ![6 tests](https://img.shields.io/badge/6_tests-22c55e?style=flat-square) | Persistencia/limpieza de carrito, generación de órdenes con prefijo `ORD-` y registro de usuarios evitando duplicados por correo. |
| `Checkout.test.jsx` | ![4 tests](https://img.shields.io/badge/4_tests-22c55e?style=flat-square) | Renderizado de formulario, actualización controlada de inputs, validación de campos obligatorios y cálculo de totales en el paso de pago. |



------------------------------------------------------------
------------------------------------------------------------

## ✨ 4. Funcionalidades Implementadas (Cobertura de Rúbrica)

### 🛡️ Control de Acceso y Renderizado Condicional por Rol


> **Autenticación JWT:** Inicio de sesión y registro con almacenamiento seguro de token, decodificación de claims (`sub`, `rol`) e interceptores **Axios** que adjuntan `Authorization: Bearer <token>` y gestionan expiración (`401`) o falta de permisos (`403`).

**Rutas Protegidas (`ProtectedRoute`):**

| Ruta | Roles Permitidos | Comportamiento y Funcionalidades |
| :--- | :--- | :--- |
| **`/admin`** *(Dashboard Admin)* | ![Administrador](https://img.shields.io/badge/ADMINISTRADOR-e8b74d?style=flat-square) | Exclusivo para `ADMINISTRADOR`. Muestra métricas en tiempo real (categorías activas, stock total, órdenes/boletas y cuentas registradas), catálogo en MySQL con CRUD completo y listado de usuarios registrados. |
| **`/admin/productos`** *(Gestión de Tienda)* | ![Administrador](https://img.shields.io/badge/ADMINISTRADOR-e8b74d?style=flat-square) ![Vendedor](https://img.shields.io/badge/VENDEDOR-0ea5e9?style=flat-square) | Compartido entre `ADMINISTRADOR` (control total CRUD) y `VENDEDOR` (**modo lectura**: consulta de inventario y órdenes/boletas sin acciones de creación, edición ni eliminación). |
| **Acceso no autorizado** | ![Cliente](https://img.shields.io/badge/CLIENTE-8b5cf6?style=flat-square) `Sin sesión` | Usuarios con rol `CLIENTE` o no autenticados son bloqueados y redirigidos al intentar acceder manualmente a rutas administrativas. |

---

### 🔍 Sistema Avanzado de Filtros de Inventario

Implementado tanto en **`/admin`** como en **`/admin/productos`** con filtrado en tiempo real y restablecimiento en un clic:

| Tipo de Filtro | Funcionamiento |
| :--- | :--- |
| **ID de producto** | Búsqueda por coincidencia exacta o parcial. |
| **Nombre del producto** | Búsqueda reactiva en tiempo real. |
| **Categoría** | Filtro por categoría dinámica cargada desde MySQL. |
| **Estado de stock** | ![Todos](https://img.shields.io/badge/Todos-64748b?style=flat-square) ![Con Stock](https://img.shields.io/badge/Con_stock_%3E_0-22c55e?style=flat-square) ![Stock Bajo](https://img.shields.io/badge/Stock_bajo_%E2%89%A4_5-f59e0b?style=flat-square) ![Sin Stock](https://img.shields.io/badge/Sin_stock_%3D_0-ef4444?style=flat-square) |
| **Rango de precio (CLP)** | Filtrado combinable por **Precio mínimo** y **Precio máximo**. |

---

### 🧾 Flujo de Compra, Boleta Electrónica y Descuento de Stock

Gestión completa de carrito persistente con actualización reactiva en la barra de navegación y **Checkout en 3 pasos (`/checkout`)**:

| Paso | Etapa del Checkout | Descripción |
| :---: | :--- | :--- |
| **1** | **Datos de Envío** | Validación de datos de envío del cliente. |
| **2** | **Método de Pago** | Selección de método de pago y confirmación de la compra. |
| **3** | **Boleta Electrónica** | Emisión de Boleta Electrónica detallada con folio único, datos del cliente, desglose de productos y registro real en MySQL con descuento automático de stock. |
