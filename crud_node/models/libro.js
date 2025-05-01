// models/libro.js
const db = require('./db');

module.exports = {
  findAll: () => db.query('SELECT libro.*, autor.nombre AS autor_nombre FROM libro LEFT JOIN autor ON libro.id_autor = autor.id_autor'),
  findById: (id) => db.query('SELECT * FROM libro WHERE id_libro = ?', [id]),
  findByAutor: (id_autor) => db.query('SELECT * FROM libro WHERE id_autor = ?', [id_autor]),
  create: ({ titulo, año_publicacion, genero, resumen, id_autor }) =>
    db.query('INSERT INTO libro (titulo, año_publicacion, genero, resumen, id_autor) VALUES (?, ?, ?, ?, ?)',
      [titulo, año_publicacion, genero, resumen, id_autor]),
  update: (id, data) =>
    db.query('UPDATE libro SET titulo=?, año_publicacion=?, genero=?, resumen=?, id_autor=? WHERE id_libro=?',
      [data.titulo, data.año_publicacion, data.genero, data.resumen, data.id_autor, id]),
  delete: (id) => db.query('DELETE FROM libro WHERE id_libro = ?', [id])
};