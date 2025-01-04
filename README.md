# E-Commerce Backend

Este es un proyecto backend desarrollado con Express y MongoDB, que implementa funcionalidades de un e-commerce, como la gestión de productos, carritos y más. 

## Características
- CRUD de productos.
- CRUD de carritos de compras.
- Integración con MongoDB utilizando Mongoose.
- Gestión de rutas utilizando Express Router.

## Requisitos previos
Asegúrate de tener instalado lo siguiente:
- Node.js (versión 16 o superior)
- npm (gestor de paquetes de Node.js)
- MongoDB (instancia local o en la nube)

## Instalación
1. Clona este repositorio:
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   ```

2. Navega al directorio del proyecto:
   ```bash
   cd <NOMBRE_DEL_PROYECTO>
   ```

3. Instala las dependencias:
   ```bash
   npm install
   ```

4. Configura las variables de entorno. Crea un archivo `.env` en la raíz del proyecto con la siguiente estructura:
   ```env
   PORT=3000
   DB_URL=mongodb+srv://<usuario>:<contraseña>@<cluster>.mongodb.net/<nombre_base_de_datos>?retryWrites=true&w=majority
   ```

5. Inicia el servidor:
   ```bash
   npm start
   ```

El servidor estará disponible en `http://localhost:<PORT>`.

## Endpoints
Aquí se describirán los endpoints disponibles en la API:

### Products
- [ ] **GET** `/api/products` - Obtiene todos los productos.
- [ ] **GET** `/api/products/:id` - Obtiene un producto por su ID.
- [ ] **POST** `/api/products` - Crea un nuevo producto.
- [ ] **PUT** `/api/products/:id` - Actualiza un producto por su ID.
- [ ] **DELETE** `/api/products/:id` - Elimina un producto por su ID.

### Carrito
- [ ] **GET** `/api/cart/:id` - Obtiene un carrito por su ID.
- [ ] **POST** `/api/cart` - Crea un nuevo carrito.
- [ ] **PUT** `/api/cart/:id` - Actualiza un carrito por su ID.
- [ ] **DELETE** `/api/cart/:id` - Elimina un carrito por su ID.

### Vistas
- [ ] **GET** `/products` - Muestra todos los productos
- [ ] **GET** `/cart/:id` - Muestra la vista correspondiente al carrito

## Tecnologías utilizadas
- Node.js
- Express
- MongoDB
- Mongoose


---
**Desarrollado por:** Franco Caraballo

