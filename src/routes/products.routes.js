import { Router } from 'express';
import ProductManager from '../services/ProductManager.js';

const router = Router();

const productManager = new ProductManager();

router.get('/', async (req, res) => {
    const limit = parseInt(req.query.limit);
    const products =  await productManager.getAllProducts(limit || 10);
    return res.render('home', { products });
})

router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const productById = productManager.products.find(product => product.id === id);

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