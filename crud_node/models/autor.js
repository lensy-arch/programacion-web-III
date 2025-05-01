// models/autor.js
const db = require('./db');

module.exports = {
  findAll: () => db.query('SELECT * FROM autor'),
  findById: (id) => db.query('SELECT * FROM autor WHERE id_autor = ?', [id]),
  create: ({ nombre, nacionalidad, fecha_nacimiento, biografia }) =>
    db.query('INSERT INTO autor (nombre, nacionalidad, fecha_nacimiento, biografia) VALUES (?, ?, ?, ?)',
      [nombre, nacionalidad, fecha_nacimiento, biografia]),
  update: (id, data) =>
    db.query('UPDATE autor SET nombre=?, nacionalidad=?, fecha_nacimiento=?, biografia=? WHERE id_autor=?',
      [data.nombre, data.nacionalidad, data.fecha_nacimiento, data.biografia, id]),
  delete: (id) => db.query('DELETE FROM autor WHERE id_autor = ?', [id])
};