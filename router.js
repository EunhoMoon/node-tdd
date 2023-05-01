const express = require('express');

const router = express.Router();
const productsController = require('./controller/products');

router.post('/', productsController.createProduct);

router.get('/', productsController.getProducts);

router.get('/:productId', productsController.getProductById);

router.put('/:productId', productsController.updateProduct);

module.exports = router;
