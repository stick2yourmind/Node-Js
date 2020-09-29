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
        required: true},
    item_sku: {
        type: String,
        required: true,
        unique:true},
    item_available: {
        type: Number,
        required: true}

})

module.exports = mongoose.model('products', productsSchema);