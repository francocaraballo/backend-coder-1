import { Router } from 'express';
import ProductManager from '../services/ProductManager.js';

const router = Router();

const productManager = new ProductManager();

router.get('/', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10;
        const { page = 1, query, sort } = req.query;

        const data =  await productManager.getAll(limit , page, query, sort);
        const { docs : products } = data;
        res.render('home', { products });

        const resData = {
            status: 'success',
            payload
        }

        return res.send(data)
    } catch (error) {
        console.log(error)
    }
})

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const productById = await productManager.getById(id);

    if (!productById) return res.status(404).send('The product does not exist');
    return res.send(productById);
});

router.post('/', (req, res) => {
    const {
        title,
        description, 
        code, 
        price, 
        status, 
        stock, 
        category, 
        thumbnails 
    } = req.body;

    // VALIDAR QUE TODAS LAS PROPS SON ENVIADAS


    const newProduct = {
        title,
        description, 
        code, 
        price, 
        status, 
        stock, 
        category, 
        thumbnails 
    };

    productManager.addProduct(newProduct);

    return res.status(201).send(newProduct);
})

router.put('/:id', async (req, res) => {
    try {
        const productId = parseInt(req.params.id);

        const updatedProduct = await productManager.updateProduct(productId, req.body);
        if (updatedProduct) {
            res.json(updatedProduct);
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        console.log(error);
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const productId = parseInt(req.params.id);
        const deletedProduct = await productManager.deleteProduct(productId);
        if (deletedProduct) {
            res.json(deletedProduct);
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        console.log(error);
    }
})
export default router;