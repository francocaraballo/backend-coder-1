import mongoose from "mongoose";

const collectionName = 'products';

const stringRequired = {
    type: String,
    required: true,
}

const productSchema = new mongoose.Schema({
    title: stringRequired,
    description: stringRequired,
    code: stringRequired,
    price: {
        type: Number,
        required: true,
    },
    status: {
        type: Boolean,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    },
    category: stringRequired,
    thumbnails: [ String ],
})

const productModel = new mongoose.model( collectionName, productSchema )

export default productModel;