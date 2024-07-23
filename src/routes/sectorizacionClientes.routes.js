const express = require('express');
const router = express.Router();
const sectorizacionClientController = require('../controllers/sectorizacionClientes.controller');

router.post('/CreateClientes', sectorizacionClientController.createCliente);
router.get('/ReadClientes', sectorizacionClientController.readAllClientes);
router.post('/UpdateClientes/:id', sectorizacionClientController.updateCliente);
router.delete('/DeleteClientes/:id', sectorizacionClientController.deleteCliente);
router.get('/Search', sectorizacionClientController.searchClientes);

module.exports = router;
