const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const app = express();

// Configurar el motor de vistas EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware para procesar datos de formularios
app.use(express.urlencoded({ extended: true }));

// Conexión a la base de datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'tienda_electrodomesticos'
});

db.connect(err => {
    if (err) throw err;
    console.log('Conectado a la base de datos');
});

// Ruta principal para listar libros
app.get('/', (req, res) => {
    db.query('SELECT * FROM libros', (err, resultados) => {
        if (err) throw err;
        res.render('index', { libros: resultados });
    });
});

// Ruta para mostrar el formulario de agregar un libro
app.get('/crear', (req, res) => {
    res.render('crear');
});

// Ruta para procesar la creación de un nuevo libro
app.post('/crear', (req, res) => {
    const { titulo, autor, genero, anio } = req.body;
    db.query('INSERT INTO libros (titulo, autor, genero, anio) VALUES (?, ?, ?, ?)',
        [titulo, autor, genero, anio],
        (err) => {
            if (err) throw err;
            res.redirect('/');
        });
});

// Ruta para mostrar el formulario de edición
app.get('/editar/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM libros WHERE id = ?', [id], (err, resultado) => {
        if (err) throw err;
        res.render('editar', { libro: resultado[0] });
    });
});

// Ruta para procesar la edición de un libro
app.post('/editar/:id', (req, res) => {
    const { id } = req.params;
    const { titulo, autor, genero, anio } = req.body;
    db.query('UPDATE libros SET titulo=?, autor=?, genero=?, anio=? WHERE id=?',
        [titulo, autor, genero, anio, id],
        (err) => {
            if (err) throw err;
            res.redirect('/');
        });
});

// Ruta para eliminar un libro
app.get('/eliminar/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM libros WHERE id = ?', [id], (err) => {
        if (err) throw err;
        res.redirect('/');
    });
});

// Iniciar el servidor
app.listen(3000, () => {
    console.log('Servidor en http://localhost:3000');
});
