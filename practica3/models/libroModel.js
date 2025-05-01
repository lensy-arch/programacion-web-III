const db = require('./db');

class Libro {
  static obtenerTodos(callback) {
    db.query('SELECT * FROM libros', callback);
  }

  static obtenerPorId(id, callback) {
    db.query('SELECT * FROM libros WHERE id = ?', [id], callback);
  }

  static agregar(datos, callback) {
    db.query('INSERT INTO libros SET ?', datos, callback);
  }

  static actualizar(id, datos, callback) {
    db.query('UPDATE libros SET ? WHERE id = ?', [datos, id], callback);
  }

  static eliminar(id, callback) {
    db.query('DELETE FROM libros WHERE id = ?', [id], callback);
  }
}

module.exports = Libro;
