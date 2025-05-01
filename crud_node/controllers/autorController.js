const Autor = require('../models/autor');
const Libro = require('../models/libro');

exports.index = async (req, res) => {
  const [autores] = await Autor.findAll();
  const librosPorAutor = {};
  for (let a of autores) {
    const [libros] = await Libro.findByAutor(a.id_autor);
    librosPorAutor[a.id_autor] = libros;
  }
  res.render('autores/index', { autores, librosPorAutor });
};

// Mostrar formulario de nuevo autor
exports.showForm = (req, res) => {
  res.render('autores/form', { autor: {} });
};

exports.create = async (req, res) => {
  await Autor.create(req.body);
  res.redirect('/autores');
};

exports.editForm = async (req, res) => {
  const [rows] = await Autor.findById(req.params.id);
  res.render('autores/form', { autor: rows[0] });
};

exports.update = async (req, res) => {
  await Autor.update(req.params.id, req.body);
  res.redirect('/autores');
};

exports.delete = async (req, res) => {
  await Autor.delete(req.params.id);
  res.redirect('/autores');
};

exports.detail = async (req, res) => {
  const [rows] = await Autor.findById(req.params.id);
  res.render('autores/detail', { autor: rows[0] });
};
