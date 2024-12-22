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
        // res.render('home', { products });

        const resData = {
            status: 'success',
            payload: data.docs,
            ...data
        }

        return res.send(resData);
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

router.post('/', async (req, res) => {
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

    if (!newProduct.title ||!newProduct.price ||!newProduct.stock || !newProduct.description|| !newProduct.code 
        || !newProduct.status|| !newProduct.category|| !newProduct.thumbnails){
        return res.status(400).send({ status: "error", error: "Incompleted values"});
    }

    try {
        await productManager.add(newProduct);
        return res.status(201).send(newProduct);
    } catch (error) {
        console.log(error)
        res.status(500).send({status: "error", error: error.message})
    }
})

router.put('/:id', async (req, res) => {
    try {
        const productId = req.params.id;

        const updatedProduct = await productManager.update(productId, req.body);
        if (updatedProduct) {
            res.send(updatedProduct);
        } else {
            res.status(404).send({status: "error", error: 'Product not found' });
        }
    } catch (error) {
        console.log(error);
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const productId = req.params.id;
        const deletedProduct = await productManager.delete(productId);
        if (deletedProduct) {
            return res.send(deletedProduct);
        } else {
            return res.status(404).send({status: "error", error: 'Product not found' });
        }
    } catch (error) {
        console.log(error);
        return res.status(500),send({status: "error", error: error.message})
    }
})
export default router;