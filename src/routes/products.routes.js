import { Router } from 'express';
import ProductManager from '../services/ProductManager.js';

const router = Router();

const productManager = new ProductManager();

router.get('/', async (req, res) => {
    const limit = parseInt(req.query.limit);
    const products =  await productManager.getAllProducts(limit);
    res.send(products);
})

export default router;