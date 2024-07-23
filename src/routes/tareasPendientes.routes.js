const express = require('express');
const router = express.Router();
const pendientesHistorial = require('../controllers/tareasPendientesHistorial.controller');

router.post('/CreateTareasPendiente', pendientesHistorial.createTareas);
router.get('/ReadTareasPendiente', pendientesHistorial.readTareas);
router.post('/UpdateTareasPendiente', pendientesHistorial.updateTareas);
router.delete('/DeleteTareaPendiente', pendientesHistorial.deleteTareas);

module.exports = router;