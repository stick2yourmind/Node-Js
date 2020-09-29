var express = require('express');
var router = express.Router();
const productController = require("../controllers/productsController");

/* GET all products */
router.get('/', productController.getAll);

/* GET product by model */
router.get('/search/:id', productController.getByModel);

/* GET product by id */
router.get('/:id', productController.getByID);

/* POST a new product */
router.post('/', productController.create);

/* PUT to update a product by id */
router.put('/:id', productController.update);

/* DELETE a product by id */
router.delete('/:id', productController.delete);

module.exports = router;
