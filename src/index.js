import express from 'express';
import handlebars from 'express-handlebars';

import { connectDB } from './utils/db.js';
import { config } from './utils/config.js';

import productsRoutes from './routes/products.routes.js';
import cartRoutes from './routes/cart.routes.js';
import realTimeProductsRoutes from './routes/realTimeProducts.routes.js';
import viewsRoutes from './routes/views.routes.js';

import { Server } from 'socket.io'

import __dirname from './utils.js';

const app = express();
const PORT = config().PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

connectDB();



// Configuracion de handlebars
app.engine("handlebars", handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

// seteo la carpeta public
app.use(express.static(__dirname + '/public'));

// ROUTER
app.use("/api/products", productsRoutes);
app.use("/api/cart", cartRoutes);
app.use("/realTimeProducts", realTimeProductsRoutes);
app.use("/", viewsRoutes);

const httpServer = app.listen(PORT, () => {
    console.log(`Server run on port: ${PORT}`);
})

// estaria bueno refactorizar este codigo y ubicarlo en otro archivo
const socketServer = new Server(httpServer);
const productsCreated = []
socketServer.on('connection', socket => {
    console.log('conectado')

    socket.on('product', data => {
        productsCreated.push(data);
        console.log(data)

        socket.emit('products', productsCreated);
    })

})
