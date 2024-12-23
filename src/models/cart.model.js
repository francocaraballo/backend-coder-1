import mongoose from 'mongoose';

const collectionName = 'cart';

const cartSchema = new mongoose.Schema({
    products: {
        type: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'products'
                },
                quantity: {
                    type: Number,
                    required: true
                }
            }
        ]
    }
})

cartSchema.pre('find', function() {
    this.populate('products.product');
})
const cartModel = mongoose.model(collectionName, cartSchema);
export default cartModel;