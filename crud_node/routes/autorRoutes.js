const express = require('express');
const router = express.Router();
const autorCtrl = require('../controllers/autorController');

// GET /autores          → listado
router.get('/', autorCtrl.index);

// GET /autores/new      → formulario de creación
router.get('/new', autorCtrl.showForm);

// POST /autores         → crear
router.post('/', autorCtrl.create);

// GET /autores/:id      → detalle
router.get('/:id', autorCtrl.detail);

// GET /autores/:id/edit → formulario de edición
router.get('/:id/edit', autorCtrl.editForm);

// PUT /autores/:id      → actualizar
router.put('/:id', autorCtrl.update);

// DELETE /autores/:id   → eliminar
router.delete('/:id', autorCtrl.delete);

module.exports = router;
