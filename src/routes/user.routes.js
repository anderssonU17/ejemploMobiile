const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

router.post('/CreateUsers', userController.createUsers);
router.get('/ReadUsers', userController.readAllUsers);
router.post('/UpdateUsers/:id', userController.updateUsers);
router.delete('/DeleteUsers/:id', userController.deleteUsers);
router.post('/LoginUser', userController.loginUser);

module.exports = router;