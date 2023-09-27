// IMPORTS

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser'); // * Importamos Body Parser para poder leer los datos del "body" de los request que lleguen a las rutas definidas.
const mongoose = require('mongoose'); // * Importamos Mongoose

// ROUTE SCRIPTS

const indexRouter = require('./routes/index');
const tempRouter = require('./routes/temp')

// EXPRESS SERVER INSTANCE

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// MIDDLEWARE

app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.json()); // * Llamamos al middleware Body Parser
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// * MONGOOSE CONNECTION

const dev_db_url = 'mongodb://127.0.0.1:27017/test';

const mongoDB = process.env.MONGODB_URI || dev_db_url; // Indicamos que para conectarnos a MongoDB, podemos usar la variable de entorno que queramos (no hemos visto aún variables de entorno, pero lo dejo para testar la aplicación) o, la variable dev_db_url previamente definida.

mongoose.connect(mongoDB); // Hacemos la llamada a MongoDB con la ruta facilitada en la variable mongoDB

// mongoose.Promise = global.Promise; // ? Hacemos que la instancia de mongoose se ejecute como una promesa ?? Deprecado ??

const db = mongoose.connection; // ? Cargamos el objeto connection de moongose en una variable para poder escuchar los estados de la conexion ??

db.on('error', console.error.bind(console, 'MongoDB connection error')); // ? Listener del estado de la conexión para cuando se lanza un error y manejar dicho error ?


// ROUTING

app.use('/', indexRouter); // * Ruta por defecto, sin funcionalidad ninguna
app.use('/temp', tempRouter); // * Ruta de trabajo para la práctica

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;