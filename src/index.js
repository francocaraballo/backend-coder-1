import express from 'express';
import productsRoutes from './routes/products.routes.js';
import cartRoutes from './routes/cart.routes.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))


const PORT = 8080;

// enpoint de telemetria
app.get('/ping', (req, res) => {
    res.send('pong');
})

// ROUTER

app.use("/api/products", productsRoutes);

app.listen(PORT, () => {
    console.log(`Server corriendo en el puerto ${PORT}`);
})
