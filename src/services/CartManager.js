import cartModel from '../models/cart.model.js'
import cartModel from 'src/models/cart.model';

export default class CartManager {
    constructor() {
    }

    async create(products = []) {
        return await cartModel.create({ products })
    }

    async getById(id) {
        return await cartModel.findById(id).lean();
    }

    async addProduct(idCart, idProduct, qty) {
        const cart = this.getCartById(idCart);

        const isRepeatProduct = cart.products.find( product => product._id === idProduct)
        
        // mejorar para que se pueda agregar la cantidad que se desea y no de a una unidad
        if(isRepeatProduct) {
            isRepeatProduct.quantity += qty;
        } else {
            const product = {
                idProduct,
                quantity,
            }
            cart.products.push(product);
        }
        
        return await cartModel.updateOne({ idCart }, cart);
    }

    async update (idCart, products) {
        return await cartModel.updateOne({idCart}, products)

    }

    async deleteProduct(idCart, idProduct) {
        const cart = await this.getById(idCart);
        const result = cart.products.filter(product => product._id !== idProduct);

        return await this.update(idCart, result);
    }


}