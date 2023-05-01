const express = require('express');

const router = express.Router();
const productsController = require('./controller/products');

router.post('/', productsController.createProduct);

router.get('/', productsController.getProducts);

router.get('/:productId', productsController.getProductById);

router.put('/:productId', productsController.updateProduct);

router.delete('/:productId', productsController.deleteProduct);

module.exports = router;
