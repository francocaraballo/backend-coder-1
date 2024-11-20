import { Router } from 'express';
import { uid } from 'uid';
import CartManager from '../services/CartManager.js';

const router = Router();

const cartManager = new CartManager();

router.get('/:id', (req, res) => {
    // buscar carrito por id
    const id = req.params.id;
    const cartById = cartManager.getCartById(id);

    if(!cartById) return res.status(404).json({ error: "Product not found"});
    
    return res.json(cartById);
})

router.post('/', (req, res) => {
    // metodo para crear un carrito, id, products(ARRAY de objetos)
    try {
        const newCart = cartManager.createCart();
        res.json(newCart);
    } catch (error) {
        console.log(error)
    }
});

router.post('/:cid/product/:pid', (req, res) => {
    try {
        const { cid, pid } = req.params;
        const { quantity } = req.body;

        const itemUpdated = cartManager.addProductCart(cid, pid, quantity);
        return res.json(itemUpdated);
    } catch (error) {
        console.log(error);
    }
})

export default router;