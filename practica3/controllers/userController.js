const connection = require('../config/database');

// Función para listar usuarios
exports.listUsers = (req, res) => {
    connection.query('SELECT * FROM users', (err, results) => {
        if (err) {
            return res.status(500).send('Error en la base de datos');
        }
        res.render('index', { users: results });
    });
};

// Función para mostrar el formulario de creación de usuario
exports.createUserForm = (req, res) => {
    res.render('create');
};

// Función para agregar un nuevo usuario
exports.createUser = (req, res) => {
    const { name, email, password } = req.body;
    connection.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, password], (err, result) => {
        if (err) {
            return res.status(500).send('Error al agregar el usuario');
        }
        res.redirect('/');
    });
};

// Función para editar un usuario
exports.editUserForm = (req, res) => {
    const { id } = req.params;
    connection.query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {
        if (err) {
            return res.status(500).send('Error en la base de datos');
        }
        res.render('edit', { user: results[0] });
    });
};

// Función para actualizar un usuario
exports.updateUser = (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body;
    connection.query('UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?', [name, email, password, id], (err, result) => {
        if (err) {
            return res.status(500).send('Error al actualizar el usuario');
        }
        res.redirect('/');
    });
};

// Función para eliminar un usuario
exports.deleteUser = (req, res) => {
    const { id } = req.params;
    connection.query('DELETE FROM users WHERE id = ?', [id], (err, result) => {
        if (err) {
            return res.status(500).send('Error al eliminar el usuario');
        }
        res.redirect('/');
    });
};
