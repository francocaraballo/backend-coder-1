import mongoose from 'mongoose';

const collectionName = 'cart';

const cartSchema = new mongoose.Schema({
    products: {
        type: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'products'
                }
            }
        ]
    }
})

const cartModel = mongoose.model(collectionName, cartSchema);
export default cartModel;