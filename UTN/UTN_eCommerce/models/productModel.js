const mongoose = require('../bin/mongodb');

const productsSchema =  new mongoose.Schema({
    item_img: {
        type: String,
        required: true},
    item_mark: {
        type: String,
        required: true},
    item_model: {
        type: String,
        required: true},
    item_price: {
        type: Number,
        required: true,
        get: function(price){
            return `$ ${price}`
        }},
    item_sku: {
        type: String,
        required: true,
        unique:true},
    item_available: {
        type: Number,
        required: true},
    item_description: {
        type: String,
        required: true},
    item_category: {
        type: mongoose.Schema.ObjectId,
        ref:"categories"
    }

})
productsSchema.set("toJSON", {getters: true})
module.exports = mongoose.model('products', productsSchema);