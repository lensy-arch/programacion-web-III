const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const app = express();

// 1) Configurar EJS como motor de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// 2) Servir estáticos (CSS, JS, imágenes)
app.use(express.static(path.join(__dirname, 'public')));

// 3) Parsear formularios y _method
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// 4) Montar rutas
const indexRoutes = require('./routes/indexRoutes');
const autorRoutes = require('./routes/autorRoutes');
const libroRoutes = require('./routes/libroRoutes');
app.use('/', indexRoutes);
app.use('/autores', autorRoutes);
app.use('/libros', libroRoutes);

// 5) Ruta raíz
app.get('/', (req, res) => res.redirect('/autores'));

// 6) Arrancar servidor
const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor iniciado en http://localhost:${PORT}`));
