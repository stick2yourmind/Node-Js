const productsModel = require("../models/productModel");
const categoryModel = require("../models/categoryModel");

module.exports = {
    getAll: async (request, response, next) => {
        try{ 
            const products = await productsModel.find({}).populate("item_category")
            response.json(products);
        } catch (e){
            next(e);
        }
    },
    getByID: async (request, response, next) => {
        try{ 
            const products = await productsModel.findById(request.params.id);
            response.json(products);
        } catch (e){
            next(e);
        }
    },
    getByModel: async (request, response, next) => {
        try{console.log("request.params.id: ", request.params.id);
            const product = await productsModel.find({ item_model: { $regex: '.*' + request.params.id + '.*' } })
            response.json(product);  
        } catch (e){
            next(e);
        }
    },
    create:  async (request, response, next) => {
        try{
            const product = new productsModel({
                                item_img: request.body.item_img,
                                item_mark: request.body.item_mark,
                                item_model: request.body.item_model,
                                item_price: request.body.item_price,
                                item_sku: request.body.item_sku,
                                item_available: request.body.item_available,
                                item_description: request.body.item_description,
                                item_category: request.body.item_category  
                            });
            const prod = await product.save();
            response.json(prod);
        } catch (e){
            next(e);
        }
    },
    update: async (request, response, next) => {
        try{
            const product = await productsModel.update({_id: request.params.id}, request.body, {multi: false})
            response.json(product); 
        } catch (e){
            next(e);
        }
    },
    delete: async (request, response, next) => {
        try{
            const product = await productsModel.deleteOne({_id: request.params.id})
            response.json(product);  
        } catch (e){
            next(e);
        }
    }
}  