import fs from 'fs/promises';
import path from 'path';

import productModel from '../models/product.model.js'

const productsFilePath = path.resolve('data', 'products.json');

export default class ProductManager {
    //  Constructor
    constructor() {
    }

    async getAllProducts(limit) {
        return await productModel.find().limit(limit).lean();
    }


    // getProductById
    async getProductById(id) {
        return this.products.find(product => product.id === id);
    }

    // addProduct
    async addProduct(product) {
        const { 
            title,
            description,
            price,
            stock,
            category,
            status,
            thumbnails,
        } = product;

        const newProduct = await productModel.create({
            title,
            description,
            price,
            stock,
            category,
            status,
            thumbnails,
        });

        return newProduct;
    }

    // updateProduct
    async updateProduct(id, updatedFields) {
        const productIndex = this.products.findIndex(product => product.id === id);
        if (productIndex === -1) return null;

        const updatedProduct = {
            ...this.products[productIndex],
            ...updatedFields,
            id: this.products[productIndex].id, // Aseguramos que el ID no se actualice
        };


        this.products[productIndex] = updatedProduct;
        this.saveToFile()
        return updatedProduct;
    }

    // deleteProduct

    async deleteProduct(uid) {
        const result = await productModel.deleteOne({ _id: uid});
        return result;
    }

}