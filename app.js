//Config Global
const express = require('express');
const mustache = require('mustache-express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('express-flash');


//Config Arquivos para execução no app
const router = require('./routes/index');
const helpers = require('./helpers');
const errorHandler = require('./handlers/errorHandlers');

// Middleware



// Configurations
const app = express(); // Construct Express

//Config Json for Project
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

app.use(express.static(__dirname + '/public'));


//Habilitação Cookie
app.use(cookieParser(process.env.SECRET));
//Habilitação Session
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}));
//Habilitação Flash
app.use(flash());

//Helpers variaveis/modelos globais
app.use((req, res, next) => {
    res.locals.h = helpers;
    res.locals.flashes = req.flash();
    next();
}); 


//Sempre executar de ultimo
app.use('/', router); 

//Executar caso não encontrar uma página
app.use(errorHandler.notFound);


//Config MST View for Engine
app.engine('mst', mustache(__dirname + '/views/partials', '.mst'));
app.set('view engine', 'mst');
app.set('views', __dirname + '/views');

//Exportação
module.exports = app;