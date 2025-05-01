// controllers/libroController.js
const Libro = require('../models/libro');
const Autor = require('../models/autor');

exports.index = async (req, res) => {
  const [libros] = await Libro.findAll();
  res.render('libros/index', { libros });
};

exports.new = async (req, res) => {
  // Traigo lista de autores para el select
  const [autoresList] = await Autor.findAll();
  res.render('libros/form', { libro: {}, autoresList });
};

exports.create = async (req, res) => {
  await Libro.create(req.body);
  res.redirect('/libros');
};

exports.editForm = async (req, res) => {
  // Traigo lista de autores y datos del libro
  const [autoresList] = await Autor.findAll();
  const [rows] = await Libro.findById(req.params.id);
  res.render('libros/form', { libro: rows[0], autoresList });
};

exports.update = async (req, res) => {
  await Libro.update(req.params.id, req.body);
  res.redirect('/libros');
};

exports.delete = async (req, res) => {
  await Libro.delete(req.params.id);
  res.redirect('/libros');
};

exports.detail = async (req, res) => {
  const [rows] = await Libro.findById(req.params.id);
  res.render('libros/detail', { libro: rows[0] });
};
