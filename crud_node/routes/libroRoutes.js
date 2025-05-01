const express = require('express');
const router = express.Router();
const libroCtrl = require('../controllers/libroController');

// Mostrar listado de libros
router.get('/', libroCtrl.index);

// Mostrar formulario “Nuevo Libro”
router.get('/new', libroCtrl.new);

// Crear libro
router.post('/', libroCtrl.create);

// Mostrar formulario “Editar Libro”
router.get('/:id/edit', libroCtrl.editForm);

// Actualizar libro
router.put('/:id', libroCtrl.update);

// Eliminar libro
router.delete('/:id', libroCtrl.delete);

// Ver detalle de libro
router.get('/:id', libroCtrl.detail);

module.exports = router;
