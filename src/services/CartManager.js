import fs from 'fs/promises';
import path from 'path';
import { uid } from 'uid';

const cartsFilePath = path.resolve('data', 'carts.json');

export default class CartManager {
    constructor() {
        this.carts = [];
        this.init();
    }

    async init() {
        try {
            const data = await fs.readFile(cartsFilePath, 'utf-8');
            this.carts = JSON.parse(data);
        } catch (error) {
            this.carts = [];
        }
    }

    async saveToFile() {
        const jsonData = JSON.stringify(this.carts, null, 2);
        await fs.writeFile(cartsFilePath, jsonData);
    }

    createCart() {
        const cart = {
            id: uid(),
            products: []
        }

        this.carts.push(cart);
        this.saveToFile();

        return cart;
    }

    getCartById(id) {
        return this.carts.find(cart => cart.id == id );
    }

    addProductCart(idCart, idProduct, quantity) {
        const cart = this.getCartById(idCart);
        const product = {
            idProduct,
            quantity,
        }
        cart.products.push(product);
        this.saveToFile();
        return product;
    }

}