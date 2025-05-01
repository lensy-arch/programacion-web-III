const express = require('express');
const router = express.Router();
const Libro = require('../models/libroModel');

// Listar libros
router.get('/', (req, res) => {
  Libro.obtenerTodos((err, resultados) => {
    if (err) throw err;
    res.render('index', { libros: resultados });
  });
});

// Formulario para agregar un libro
router.get('/crear', (req, res) => {
  res.render('crear');
});

// Agregar un nuevo libro
router.post('/crear', (req, res) => {
  const { titulo, autor, genero, año } = req.body;
  Libro.agregar({ titulo, autor, genero, año }, err => {
    if (err) throw err;
    res.redirect('/');
  });
});

// Formulario para editar un libro
router.get('/editar/:id', (req, res) => {
  Libro.obtenerPorId(req.params.id, (err, resultados) => {
    if (err) throw err;
    res.render('editar', { libro: resultados[0] });
  });
});

// Editar un libro
router.post('/editar/:id', (req, res) => {
  const { titulo, autor, genero, año } = req.body;
  Libro.actualizar(req.params.id, { titulo, autor, genero, año }, err => {
    if (err) throw err;
    res.redirect('/');
  });
});

// Confirmar eliminación
router.get('/eliminar/:id', (req, res) => {
  Libro.obtenerPorId(req.params.id, (err, resultados) => {
    if (err) throw err;
    res.render('eliminar', { libro: resultados[0] });
  });
});

// Eliminar un libro
router.post('/eliminar/:id', (req, res) => {
  Libro.eliminar(req.params.id, err => {
    if (err) throw err;
    res.redirect('/');
  });
});

module.exports = router;
