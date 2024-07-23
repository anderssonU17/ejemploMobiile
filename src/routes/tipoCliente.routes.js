const express = require('express');
const router = express.Router();
const tipoClienteController = require('../controllers/tipoCliente.controller')

router.post('/CreateTipoCliente', tipoClienteController.createTipoClientes);
router.get('/ReadTipoCliente', tipoClienteController.readTipoClientes);
router.put('/UpdateTipoCliente/:id', tipoClienteController.updateTipoCliente);
router.delete('/DeleteTipoCliente/:id', tipoClienteController.deleteTipoCliente);

module.exports = router;
