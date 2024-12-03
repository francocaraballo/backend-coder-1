import express from 'express';
import handlebars from 'express-handlebars';
import productsRoutes from './routes/products.routes.js';
import cartRoutes from './routes/cart.routes.js';
import realTimeProductsRoutes from './routes/realTimeProducts.routes.js'

import { Server } from 'socket.io'

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
app.use("/realTimeProducts", realTimeProductsRoutes);

// socket

const httpServer = app.listen(PORT, () => {
    console.log(`Server corriendo en el puerto ${PORT}`);
})

const socketServer = new Server(httpServer);

socketServer.on('connection', socket => {
    console.log("Nueva conexion")

    socket.on("mensaje", data => {
        console.log("Recibido: ", data);
    })
})
