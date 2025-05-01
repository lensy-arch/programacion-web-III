const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Ruta para obtener todos los usuarios
router.get('/', userController.listUsers);

// Ruta para crear un usuario (formulario)
router.get('/create', userController.createUserForm);

// Ruta para agregar un usuario
router.post('/create', userController.createUser);

// Ruta para editar un usuario (formulario)
router.get('/edit/:id', userController.editUserForm);

// Ruta para actualizar un usuario
router.post('/edit/:id', userController.updateUser);

// Ruta para eliminar un usuario
router.get('/delete/:id', userController.deleteUser);

module.exports = router;
