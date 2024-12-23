import cartModel from '../models/cart.model.js';
import mongoose from 'mongoose';


export default class CartManager {
    constructor() {
    }

    async create(products = []) {
        return await cartModel.create({ products })
    }
    
    async getById(id) {
        return await cartModel.find({ _id: id} ).lean();
    }
    
    async update (idCart, products) {
        try {
            const result = await cartModel.updateOne(
                { _id: idCart },
                {
                  $set: {
                    products
                  },
                }
              );
            return result;
          } catch (error) {
            console.error(error.message);
            throw error;
          }

    }

    async updateProductQty(idCart, idProduct, qty) {
        try {
          const result = await cartModel.updateOne(
            { _id: idCart, 'products.product': idProduct }, // Busca el carrito y el producto
            {
              $set: {
                'products.$.quantity': qty, // Actualiza la propiedad quantity del producto
              },
            }
          );
          if (result.matchedCount === 0) {
            throw new Error('Failed to update product quantity with id: ' + idProduct);
          }
          return result;
        } catch (error) {
          console.error('Fail to update:', error.message);
          throw error;
        }
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

    async delete(idCart){
        return await cartModel.deleteOne({_id: idCart});
    }


    async deleteProduct(idCart, idProduct) {
        try {
            const result = await cartModel.updateOne(
                { _id: idCart },
                {
                  $pull: {
                    products: {
                      product: idProduct, // Verifica que sea un ObjectId
                    },
                  },
                }
              );
            return result;
          } catch (error) {
            console.error(error.message);
            throw error;
          }
    }

}