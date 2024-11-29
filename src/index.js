import express from 'express';
import handlebars from 'express-handlebars';
import productsRoutes from './routes/products.routes.js';
import cartRoutes from './routes/cart.routes.js';
// import homeRoutes from './routes/home.routes.js';
// import realTimeProductsRoutes from './routes/realTimeProducts.routes.js';

import __dirname from './utils.js';
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

const PORT = 8080;

// Configuracion de handlebars
app.engine("handlebars", handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

// seteo la carpeta public
app.use(express.static(__dirname + '/public'));

// ROUTER
app.use("/api/products", productsRoutes);
app.use("/api/carts", cartRoutes);
app.use("/home", productsRoutes);
// app.use("/realTimeProducts", realTimeProductsRoutes);

app.listen(PORT, () => {
    console.log(`Server corriendo en el puerto ${PORT}`);
})
