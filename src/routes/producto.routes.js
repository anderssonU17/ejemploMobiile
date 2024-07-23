const express = require('express');
const router = express.Router();
const productoController = require('../controllers/producto.controller');

router.post('/CreateProducto', productoController.createProduct);
router.get('/ReadProducto', productoController.readAllProducts);
router.post('/UpdateProducto/:id', productoController.updateProduct);
router.delete('/DeleteProducto/:id', productoController.deleteProduct);

module.exports = router;
