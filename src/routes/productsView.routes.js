import { Router } from 'express';
import ProductManager from '../services/ProductManager.js';

const router = Router();

const productManager = new ProductManager();

router.get('/', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10;
        const { page = 1, query, sort } = req.query;

        const data =  await productManager.getAll(limit , page, query, sort);
        const { docs, ...rest } = data;

        const result = {
            status: 'success',
            payload: docs,
            ...rest
        }

        result.prevLink = result.hasPrevPage ? `http://localhost:9090/products?page=${result.prevPage}&limit=${limit}` : ''
        result.nextLink = result.hasNextPage ? `http://localhost:9090/products?page=${result.nextPage}&limit=${limit}` : ''

        res.render('products', { result });

        
    } catch (error) {
        console.log(error)
        res.status(500).send({status: "error", error: error.menssage})
    }
})

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const productById = await productManager.getById(id);

        if (!productById) return res.status(404).send('The product does not exist');
        return res.send(productById);
    } catch (error) {
        console.log(error)
        res.status(500).send({status: "error", error: error.menssage})
    }
});

export default router;