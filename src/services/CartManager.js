import cartModel from '../models/cart.model.js';

export default class CartManager {
    constructor() {
    }

    async create(products = []) {
        return await cartModel.create({ products })
    }
    
    async getById(id) {
        const result = await cartModel.findOne({ _id: id}).lean();
        console.log(result)
        return result;
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
        try {
            const cart = await cartModel.findOne({ _id: idCart }).lean();

            if (!cart) {
                throw new Error("Cart not found");
            }

            const productToAdd = cart.products.find(({ product: id }) => id === idProduct);

            if (!productToAdd) {
              const newProduct = {
                product: idProduct,
                quantity: qty,
              };
              cart.products.push(newProduct);
            } else {
              productToAdd.quantity += qty;
            }
            
            return await cartModel.updateOne(
              { _id: idCart },
              { products: cart.products }
            );
        } catch (error) {
            console.error(error.message);
            throw error;
        }
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
                      product: idProduct,
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