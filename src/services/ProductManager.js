import productModel from '../models/product.model.js'

export default class ProductManager {
    //  Constructor
    constructor() {
    }

    async getAll(limit, page, filter, sort) {
        let sortOption = {};

        // Determina el criterio de ordenación si sort está definido
        if (sort === 'asc') {
            sortOption = { price: 1 }; // Orden ascendente
        } else if (sort === 'desc') {
            sortOption = { price: -1 }; // Orden descendente
        }

        if(filter) {
            if(filter === 'true' || filter === 'false'){
                const filterByStatus = await productModel.paginate({ status: filter }, { limit, page, lean: true, sort: sortOption });
                return filterByStatus;
            } else{
                const filterByCategory = await productModel.paginate({ category: filter }, { limit, page, lean: true, sort: sortOption });
                return filterByCategory;
            }
            
        }
        const result = await productModel.paginate({}, { limit, page, lean: true, sort: sortOption });
        return result;

    }

    async getById(id) {
        return await productModel.findById(id).lean();
    }
    async add(product) {
        try {
            if (!product.title || !product.price || !product.stock) {
                throw new Error("Title, price, and stock are required fields.");
            }            
            const newProduct = await productModel.create({ ...product });
            return newProduct;
        } catch (error) {
            throw new Error(`Error adding product: ${error.message}`);
        }
    }

    // updateProduct
    async update(uid, updatedProduct) {
        return await productModel.updateOne({_id: uid}, updatedProduct)
    }

    // deleteProduct

    async delete(uid) {
        return await productModel.deleteOne({ _id: uid});
    }

}