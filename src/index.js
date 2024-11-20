import express from 'express';
import productsRoutes from './routes/products.routes.js';
import cartRoutes from './routes/cart.routes.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

const PORT = 8080;

// ROUTER
app.use("/api/products", productsRoutes);
app.use("/api/carts", cartRoutes);

app.listen(PORT, () => {
    console.log(`Server corriendo en el puerto ${PORT}`);
})
