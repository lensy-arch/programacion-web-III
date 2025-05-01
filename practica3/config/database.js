const mysql = require('mysql2');
const dotenv = require('dotenv');

// Cargar las variables de entorno
dotenv.config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,    // localhost si estás usando XAMPP
    user: process.env.DB_USER,    // root
    password: process.env.DB_PASS, // Contraseña vacía o la que hayas configurado
    database: process.env.DB_NAME // Nombre de tu base de datos
});

connection.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos:', err);
        return;
    }
    console.log('Conectado a la base de datos');
});

module.exports = connection;
