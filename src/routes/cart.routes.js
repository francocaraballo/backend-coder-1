import { Router } from 'express';
import CartManager from '../services/CartManager.js';

const router = Router();

const cartManager = new CartManager();

router.get('/:id', async (req, res) => {
    // buscar carrito por id
    const id = req.params.id;
    try {
        const cartById = await cartManager.getById(id);
        if(!cartById) return res.status(404).json({ error: "Product not found"});
    return res.json(cartById);  
    } catch (error) {
        console.log(error)
        return res.status(404).json({ error: "Product not found"});
    }
})

router.post('/', async (req, res) => {
    const products = req.body.products;
    // metodo para crear un carrito, id, products(ARRAY de objetos)
    console.log(products)
    try {
        const newCart = await cartManager.create(products);
        res.status(201).send({ status: "success", message: "Cart created successfully", result: newCart});
    } catch (error) {
        console.log(error)
        res.status(500).send({ status: "error", error: "Error creating cart" });
    }
});

router.post('/:cid/product/:pid', (req, res) => {
    try {
        const { cid, pid } = req.params;
        const { quantity } = req.body;

        const itemUpdated = cartManager.addProduct(cid, pid, quantity);
        return res.json(itemUpdated);
    } catch (error) {
        console.log(error);
    }
});

router.delete('/:cid', async (req, res) => {
    const { cid } = req.params;
    try {
        const result = await cartManager.delete(cid);
        return res.status(200).send({ status: "success", message: `Cart id ${cid} deleted`});
    } catch (error) {
        console.log(error);
        return res.status(500).send({ status: "error", error: "Error deleting cart" });
    }
})

router.put('/:cid', async (req, res) => {
    if(!Array.isArray(req.body.products)) return res.status(400).send({ status: "error", message: "Incompleted values"})
    try {
        const { cid } = req.params;
        const updatedCart = await cartManager.update(cid, req.body.products);
        return res.json(updatedCart);
    } catch (error) {
        console.log(error);
    }
 });

 router.put('/:cid/products/:pid', async (req, res) => {
    const { cid, pid } = req.params;
    const quantity = parseInt(req.body.quantity);

    try {
        await cartManager.updateProductQty(cid, pid, quantity)
        return res.send({ status: "success", message: "Quantity updated successfully"});
    } catch (error) {
        console.log(error);
        return res.status(500).send({ status: "error", error: "error updating product quantity" });
        
    }
 })


router.delete('/:cid/products/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const itemDeleted = await cartManager.deleteProduct(cid, pid);
        if(itemDeleted) return res.send({ status: "success", message: `Product id: ${pid} deleted successfully`});
    } catch (error) {
        console.log(error);
        return res.status(500).send({ status: "error", error: "Error deleting product from cart" });
    }
})

export default router;