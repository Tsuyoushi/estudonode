//Config Global
const express = require('express');
const mustache = require('mustache-express');

//Config Arquivos para execução no app
const router = require('./routes/index');
const helpers = require('./helpers');

// Middleware



// Configurations
const app = express(); // Construct Express

//Helpers variaveis/modelos globais
app.use((req, res, next) => {
    res.locals.h = helpers;
    next();
}); 

//Config Json for Project
app.use(express.json()); 

//Sempre executar de ultimo
app.use('/', router); 


//Config MST View for Engine
app.engine('mst', mustache(__dirname + '/views/partials', '.mst'));
app.set('view engine', 'mst');
app.set('views', __dirname + '/views');

//Exportação
module.exports = app;