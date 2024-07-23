const express = require('express');
const router = express.Router();
const BodegaPrimaria = require('../controllers/bodegaPrimaria.controller');

router.post('/CreateBodega', BodegaPrimaria.createProduct);
router.get('/ReadBodega', BodegaPrimaria.readAllProducts);
router.put('/UpdateBodega/:id', BodegaPrimaria.updateProduct);
router.delete('/DeleteBodega/:id', BodegaPrimaria.deleteProduct);
router.get('/Search', BodegaPrimaria.searchBodega);

module.exports = router;
